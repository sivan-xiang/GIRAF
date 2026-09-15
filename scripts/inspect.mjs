/**
 * 视觉与运行时专项检查。
 * 与 verify.mjs 的分工：verify 负责「多语言 / 溢出 / 错误」的回归断言，
 * insert 负责「WebGL 是否真正存活」+ 关键区块高清截图，供人工目视评审。
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve('dist')
const PORT = 4390
const OUT = path.resolve('_shots')
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2'
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, url)
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(ROOT, 'index.html')
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] })
const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 1 }

/** 触发全页滚动，让所有 reveal 动效与懒加载内容就位 */
const settle = async (page) => {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 55))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 250))
  })
}

/**
 * 揭示动画完整性断言。
 * 慢速滚动到每一段并停留，检查是否仍有 .reveal 未获得 .is-in——
 * 若有，说明内容会永久停留在 opacity:0，属真实缺陷。
 */
const checkReveal = async (page) => {
  return page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.5)
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 160))
    }
    await new Promise((r) => setTimeout(r, 900))
    const all = [...document.querySelectorAll('.reveal, .is-in')]
    const pending = all.filter((e) => !e.classList.contains('is-in'))
    return {
      total: all.length,
      // 元素已滚过但仍未揭示才算缺陷；仍在视口下方属预期
      stuck: pending.filter((e) => e.getBoundingClientRect().top < window.innerHeight - 40).length
    }
  })
}

const errors = []
const report = []

for (const [name, url] of [
  ['en-home', '/'],
  ['en-services', '/services'],
  ['en-solutions', '/solutions'],
  ['en-company', '/company'],
  ['en-network', '/network'],
  ['en-contact', '/contact'],
  ['de-home', '/de'],
  ['de-services', '/de/services']
]) {
  // 每个页面使用独立 context：语言偏好会写入 localStorage，
  // 共用 context 会导致「访问过德语页后，再访问 / 被重定向到德语」。
  const ctx = await browser.newContext({ viewport: VIEWPORT })
  const page = await ctx.newPage()
  const local = []
  page.on('pageerror', (e) => local.push(`PAGEERROR ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') local.push(`CONSOLE ${m.text().slice(0, 160)}`)
  })

  await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)

  // 先做揭示完整性断言（模拟真实用户慢速滚动）
  const reveal = await checkReveal(page)

  const state = await page.evaluate(() => {
    const gl = document.querySelector('.aurora__gl')
    const canvas = document.querySelector('canvas')
    const cs = canvas ? getComputedStyle(canvas) : null
    return {
      lang: document.documentElement.lang,
      title: document.title,
      live: !!document.querySelector('.aurora__gl.is-live'),
      fallback: !!document.querySelector('.aurora__fallback'),
      canvasVisible: !!cs && cs.display !== 'none' && canvas.width > 0,
      canvasSize: canvas ? `${canvas.width}x${canvas.height}` : '-',
      sprog: !!document.querySelector('.sprog'),
      primaryCtas: document.querySelectorAll('.gbtn--primary').length,
      marqueeCount: document.querySelectorAll('.marquee, .logoloop').length,
      overflowX: document.documentElement.scrollWidth - window.innerWidth
    }
  })

  // 全页截图：改用 reduced-motion 采集。
  // 否则 Playwright 展开视口触发过渡、却在 660ms 过渡完成前就截帧，
  // 会把「尚未淡入」误拍成整块空白，掩盖真实版面。
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)
  await page.screenshot({ path: path.join(OUT, `v-${name}.png`), fullPage: true })
  await page.emulateMedia({ reducedMotion: null })

  report.push({ name, url, ...state, reveal, errors: local.length })
  if (local.length) errors.push({ name, list: [...new Set(local)].slice(0, 4) })
  if (reveal.stuck > 0) errors.push({ name, list: [`揭示缺陷：${reveal.stuck} 个元素已滚过仍未淡入`] })

  await ctx.close()
}

// 滚动中途抓一帧：确认进度条与页头收缩状态真的生效
{
  const ctx = await browser.newContext({ viewport: VIEWPORT })
  const p = await ctx.newPage()
  await p.goto(`http://127.0.0.1:${PORT}/services`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1500)
  const scrollState = await p.evaluate(async () => {
    window.scrollTo(0, Math.round((document.body.scrollHeight - window.innerHeight) * 0.45))
    await new Promise((r) => setTimeout(r, 500))
    const bar = document.querySelector('.sprog__bar')
    const head = document.querySelector('.siteheader, header')
    return {
      scaleX: bar ? getComputedStyle(bar).transform : '无',
      headerClass: head ? head.className : '无',
      headerTop: head ? Math.round(head.getBoundingClientRect().top) : null
    }
  })
  console.log('滚动中状态：', JSON.stringify(scrollState))
  await p.screenshot({ path: path.join(OUT, 'v-scrolled.png') })
  await ctx.close()
}

// 首页首屏（非全页）高清图：全新 context，确保渲染的是主语言英语
{
  const ctx = await browser.newContext({ viewport: VIEWPORT })
  const heroPage = await ctx.newPage()
  await heroPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
  await heroPage.waitForTimeout(2200)
  await heroPage.screenshot({ path: path.join(OUT, 'v-hero-crop.png') })
  await heroPage.evaluate(() => {
    const s = [...document.querySelectorAll('.section')].find((x) => x.querySelector('.logoloop, .marquee'))
    if (s) s.scrollIntoView({ block: 'start' })
  })
  await heroPage.waitForTimeout(1400)
  await heroPage.screenshot({ path: path.join(OUT, 'v-home-mid.png') })
  await ctx.close()
}

// 移动端首屏
const mob = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
const mp = await mob.newPage()
await mp.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
await mp.waitForTimeout(1800)
await mp.screenshot({ path: path.join(OUT, 'v-mobile-hero.png') })
await mp.close()
await mob.close()

await browser.close()
server.close()

console.log('=== 运行时状态 ===')
for (const r of report) {
  console.log(
    r.name.padEnd(14),
    String(r.lang).padEnd(3),
    (r.live ? 'WebGL-live' : r.fallback ? 'CSS降级' : '无canvas').padEnd(11),
    `canvas:${r.canvasVisible ? r.canvasSize : '隐藏'}`.padEnd(20),
    `溢出:${r.overflowX}px`.padEnd(11),
    `揭示:${r.reveal.total - r.reveal.stuck}/${r.reveal.total}`.padEnd(13),
    `错误:${r.errors}`
  )
  console.log('              title:', r.title)
}
console.log()
if (errors.length) {
  console.log('=== 运行时错误 ===')
  for (const e of errors) {
    console.log(`# ${e.name}`)
    e.list.forEach((l) => console.log('   ', l))
  }
} else {
  console.log('=== 运行时错误：无 ✓ ===')
}
