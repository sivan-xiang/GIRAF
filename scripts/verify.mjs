/**
 * 本地校验脚本：静态伺服 dist/ 并用无头 Edge 截图各页面。
 * 用法（需 managed node + playwright-core）：
 *   NODE_PATH=<workspace>/node_modules node scripts/verify.mjs
 * 仅用于开发校验，不参与构建产物。
 *
 * 关键回归断言：
 *   1) 语言正确性——根路径必须渲染英文、/de 必须渲染德文。
 *      曾出现「首屏 START_LOCATION 的 meta 为空 → 根路径整页德语」的缺陷，
 *      仅靠 documentElement.lang 无法发现（它由 afterEach 独立写入），
 *      因此这里断言 <html lang> 与实际正文（h1）双重一致。
 *   2) 渐进增强——WebGL 是否启用都要有可看的首屏（降级路径不能开天窗）。
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const PORT = 4321
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const OUT = path.resolve(ROOT, '..', '_shots')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.json': 'application/json'
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, url)
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end()
    return
  }
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(ROOT, 'index.html')
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})

/** [名称, 路径, 期望语言, h1 必含片段（忽略空白与大小写）] */
const PAGES = [
  ['en-home', '/', 'en', 'cross-border trade'],
  ['en-services', '/services', 'en', 'from one source'],
  ['en-solutions', '/solutions', 'en', 'constant attention'],
  ['en-company', '/company', 'en', 'overseas brand'],
  ['en-network', '/network', 'en', 'A Hamburg hub'],
  ['en-contact', '/contact', 'en', 'Hamburg'],
  ['en-imprint', '/imprint', 'en', 'Imprint'],
  ['en-privacy', '/privacy', 'en', 'Privacy policy'],
  ['de-home', '/de', 'de', 'grenzüberschreitenden'],
  ['de-services', '/de/services', 'de', 'auseiner'],
  ['de-contact', '/de/contact', 'de', 'Hamburg'],
  ['es-home', '/es', 'es', 'comercio transfronterizo'],
  ['es-services', '/es/services', 'es', 'aduanas'],
  ['es-company', '/es/company', 'es', 'LONGSAIL'],
  ['es-network', '/es/network', 'es', 'Hamburgo'],
  ['es-contact', '/es/contact', 'es', 'Hamburgo'],
  ['th-home', '/th', 'th', 'ข้ามพรมแดน'],
  ['th-services', '/th/services', 'th', 'ศุลกากร'],
  ['th-network', '/th/network', 'th', 'ฮัมบูร์ก'],
  ['th-contact', '/th/contact', 'th', 'ฮัมบูร์ก']
]

/** 逐屏滚动以触发滚动揭示动画，再回到顶部截图 */
async function primeAnimations(page) {
  const total = await page.evaluate(() => document.body.scrollHeight)
  const vh = await page.evaluate(() => window.innerHeight)
  for (let y = 0; y < total; y += Math.round(vh * 0.7)) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(180)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(600)
}

const norm = (s) => String(s).toLowerCase().replace(/\s+/g, '')

fs.mkdirSync(OUT, { recursive: true })

await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] })
const problems = []

// —— 桌面全页 ——
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
for (const [name, url, wantLang, h1Must] of PAGES) {
  const page = await ctx.newPage()
  const errs = []
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
  const resp = await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle' })
  if (resp && resp.status() >= 400) problems.push(`${name} HTTP ${resp.status()}`)
  await page.waitForTimeout(500)
  await primeAnimations(page)
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true })

  const info = await page.evaluate(() => ({
    htmlLang: document.documentElement.lang,
    title: document.title,
    h1: document.querySelector('h1')?.textContent || '',
    hiddenReveals: document.querySelectorAll('.reveal:not(.is-in)').length,
    height: document.body.scrollHeight,
    canvases: document.querySelectorAll('canvas').length,
    loopItems: document.querySelectorAll('.lloop__item').length
  }))

  // —— 语言回归断言 ——
  if (info.htmlLang !== wantLang) {
    problems.push(`${name} html lang=${info.htmlLang}，期望 ${wantLang}`)
  }
  if (!norm(info.h1).includes(norm(h1Must))) {
    problems.push(`${name} h1 语言/内容不符：应含「${h1Must}」，实得「${info.h1.slice(0, 60)}」`)
  }
  if (info.hiddenReveals) problems.push(`${name} 有 ${info.hiddenReveals} 个区块未揭示`)
  if (!info.title) problems.push(`${name} 缺少 title`)
  if (errs.length) problems.push(`${name} console: ${errs.slice(0, 3).join(' | ')}`)

  const gl = info.canvases > 0 ? `canvas×${info.canvases}` : 'CSS降级'
  const loop = name === 'en-home' || name === 'de-home' ? `  信任带${info.loopItems}项` : ''
  console.log(
    `${name.padEnd(14)} lang=${info.htmlLang}  h=${String(info.height).padStart(5)}  ${gl}${loop}  ${info.title.slice(0, 52)}`
  )
  await page.close()
}

// —— 移动端 ——
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
})
for (const [name, url] of [
  ['m-en-home', '/'],
  ['m-en-services', '/services'],
  ['m-en-contact', '/contact'],
  ['m-de-home', '/de'],
  ['m-es-home', '/es'],
  ['m-th-home', '/th'],
  ['m-th-contact', '/th/contact']
]) {
  const page = await mctx.newPage()
  const errs = []
  page.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
  await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  await primeAnimations(page)
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true })
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  )
  if (overflow > 2) problems.push(`${name} 横向溢出 ${overflow}px`)
  if (errs.length) problems.push(`${name} console: ${errs.join(' | ')}`)
  console.log(`${name.padEnd(14)} overflow=${overflow}px`)
  await page.close()
}

await browser.close()
server.close()

console.log('\n==== 问题汇总 ====')
if (!problems.length) console.log('无')
else problems.forEach((p) => console.log('- ' + p))
