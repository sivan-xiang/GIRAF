/**
 * 多语言矩阵校验：8 个页面 × 4 门语言
 * ------------------------------------------------------------------
 * 用无头 Edge 真机渲染 dist/，逐页断言「运行时渲染结果 == 源文案」，
 * 而不是断言硬编码字符串——这样任何语言漏译、键位错位、模板回退英语
 * 都会在标题层面立刻暴露。
 *
 * 校验项：
 *   1) document.title 与 src/i18n/<lang>.js 的 meta.<page>.title 完全一致
 *      （同时验证 tm() 取原始文案的链路：标题含「|」、描述含「@」邮箱，
 *        若被当成复数分隔符/链接语法会在此处失败）
 *   2) <html lang> 与注册表 htmlLang 一致
 *   3) 语言切换器恰好 4 项，且当前语言处于选中态
 *   4) hreflang 覆盖 4 门语言 + x-default，canonical 指向当前语言版本
 *   5) og:locale 正确、og:locale:alternate 数量为 3
 *   6) 控制台零报错、页面无横向溢出
 *   7) 网络页 / 联系页的法定主体卡片完整（8 家），
 *      且登记名称在四门语言下逐字一致——等价于断言「法定名称没有被翻译」
 *
 * 用法：npm run lang
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..')
const ROOT = path.resolve(projectRoot, 'dist')
const PORT = 4399
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
}

/** 语言注册表（与 src/i18n/locales.js 对齐；此处内联以避开 Vite 的 @ 别名） */
const LOCALES = [
  { code: 'en', htmlLang: 'en', prefix: '', ogLocale: 'en_US' },
  { code: 'de', htmlLang: 'de', prefix: '/de', ogLocale: 'de_DE' },
  { code: 'es', htmlLang: 'es', prefix: '/es', ogLocale: 'es_ES' },
  { code: 'th', htmlLang: 'th', prefix: '/th', ogLocale: 'th_TH' }
]

/** 页面 slug 与路由 meta.page 的对应（slug 为英语路径，其余语言加前缀） */
const PAGES = [
  ['home', '/'],
  ['services', '/services'],
  ['solutions', '/solutions'],
  ['about', '/company'],
  ['network', '/network'],
  ['contact', '/contact'],
  ['imprint', '/imprint'],
  ['privacy', '/privacy']
]

/* 直接从源文案读期望值 */
const messages = {}
for (const loc of LOCALES) {
  const url = pathToFileURL(path.resolve(projectRoot, `src/i18n/${loc.code}.js`)).href
  messages[loc.code] = (await import(url)).default
}

/**
 * 法定主体（分公司 / 子公司）的期望值——直接从源数据文件读取。
 * 登记名称与注册地址**不随语言变化**，因此同一份名称列表要在四门语言下逐字命中，
 * 这等价于断言「法定名称没有被翻译」。DE 主体的名称以 company.js 为单一数据源。
 */
const companySrc = fs.readFileSync(path.resolve(projectRoot, 'src/data/company.js'), 'utf8')
const entitiesSrc = fs.readFileSync(path.resolve(projectRoot, 'src/data/entities.js'), 'utf8')
const hqLegalName = (companySrc.match(/legalName: '([^']+)'/) || [])[1] || ''
const wantLegalNames = [
  hqLegalName,
  ...[...entitiesSrc.matchAll(/^\s+legalName: '([^']+)'/gm)].map((m) => m[1])
].filter(Boolean)
if (wantLegalNames.length < 8) {
  console.warn(`⚠ 未能从源数据解析出全部法定主体（仅 ${wantLegalNames.length} 个），请检查解析规则`)
}

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, url)
  if (!file.startsWith(ROOT)) return res.writeHead(403).end()
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(ROOT, 'index.html')
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})

const norm = (s) => String(s).replace(/\s+/g, '')

/**
 * 各页 h1 在源文案中的组成（与模板一一对应），用于断言首屏正文属于当前语言。
 * 首页由 titleLead + titleAccent 两段拼成，其余页为 <page>.hero.title。
 */
const h1Keys = {
  home: ['home.hero.titleLead', 'home.hero.titleAccent'],
  services: ['services.hero.title'],
  solutions: ['solutions.hero.title'],
  about: ['about.hero.title'],
  network: ['network.hero.title'],
  contact: ['contact.hero.title'],
  imprint: ['imprint.hero.title'],
  privacy: ['privacy.hero.title']
}

const resolvePath = (obj, dotPath) => dotPath.split('.').reduce((acc, k) => acc?.[k], obj)

const expectedH1 = (lang, page) =>
  norm(h1Keys[page].map((k) => resolvePath(messages[lang], k) || '').join(''))

const problems = []
const check = (cond, msg) => {
  if (!cond) problems.push(msg)
}

await new Promise((r) => server.listen(PORT, '127.0.0.1', r))
const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

console.log('多语言矩阵校验（8 页 × 4 语言）')
console.log('─'.repeat(78))

for (const loc of LOCALES) {
  console.log(`\n[${loc.code}] ${messages[loc.code].label}`)
  for (const [page, slug] of PAGES) {
    const url = `${loc.prefix}${slug === '/' ? '/' : slug}`
    const wantTitle = norm(messages[loc.code].meta[page].title)
    const wantDesc = norm(messages[loc.code].meta[page].desc)

    const p = await ctx.newPage()
    const errs = []
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
    p.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))

    const resp = await p.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle' })
    await p.waitForTimeout(220)

    const got = await p.evaluate(() => {
      const meta = (sel) => document.head.querySelector(sel)?.getAttribute('content') || ''
      return {
        title: document.title,
        desc: meta('meta[name="description"]'),
        htmlLang: document.documentElement.lang,
        ogLocale: meta('meta[property="og:locale"]'),
        ogAlternates: document.head.querySelectorAll('meta[property="og:locale:alternate"]').length,
        canonical: document.head.querySelector('link[rel="canonical"]')?.href || '',
        hreflangs: [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) =>
          l.getAttribute('hreflang')
        ),
        switchers: [...document.querySelectorAll('.lang .lang__btn')].map((b) => ({
          text: b.textContent.trim(),
          active: b.classList.contains('is-active')
        })),
        // 页脚第一列即「服务」列（第二个 .footer__col 是公司导航，须排除）
        footerServices: (() => {
          const col = [...document.querySelectorAll('.footer__col')].find(
            (c) => c.querySelector('.footer__list')
          )
          return col
            ? [...col.querySelectorAll('.footer__list a')].map((a) => a.textContent.trim())
            : []
        })(),
        h1: document.querySelector('h1')?.textContent.trim() || '',
        // 法定主体卡片（仅网络页 / 联系页存在）
        entities: [...document.querySelectorAll('.entity')].map((el) => ({
          name: el.querySelector('.entity__name')?.textContent.trim() || '',
          place: el.querySelector('.entity__place')?.textContent.trim() || '',
          addrLines: [...el.querySelectorAll('.entity__addr address span')].map((s) =>
            s.textContent.trim()
          ),
          tels: [...el.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href'))
        })),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
      }
    })

    const tag = `${loc.code}${url}`
    if (resp && resp.status() >= 400) problems.push(`${tag} HTTP ${resp.status()}`)
    check(norm(got.title) === wantTitle, `${tag} title 不符\n      期望: ${wantTitle}\n      实得: ${norm(got.title)}`)
    check(norm(got.desc) === wantDesc, `${tag} description 与源文案不一致`)
    check(got.htmlLang === loc.htmlLang, `${tag} html lang=${got.htmlLang}，期望 ${loc.htmlLang}`)
    check(got.ogLocale === loc.ogLocale, `${tag} og:locale=${got.ogLocale}，期望 ${loc.ogLocale}`)
    check(got.ogAlternates === 3, `${tag} og:locale:alternate=${got.ogAlternates}，期望 3`)
    check(
      got.hreflangs.length === 5 &&
        ['en', 'de', 'es', 'th', 'x-default'].every((t) => got.hreflangs.includes(t)),
      `${tag} hreflang=[${got.hreflangs.join(',')}]，期望 en,de,es,th,x-default`
    )
    check(got.canonical.endsWith(url), `${tag} canonical=${got.canonical}，未指向 ${url}`)
    check(got.switchers.length === 4, `${tag} 语言切换项=${got.switchers.length}，期望 4`)
    check(
      got.switchers.find((s) => s.active)?.active === true &&
        got.switchers.filter((s) => s.active).length === 1,
      `${tag} 选中态异常：${JSON.stringify(got.switchers.filter((s) => s.active))}`
    )
    // 首屏正文必须与「当前语言」的源文案逐字一致，不能退回英语、也不能整段缺失
    const wantH1 = expectedH1(loc.code, page)
    check(got.h1.length > 0, `${tag} h1 为空`)
    check(
      norm(got.h1) === wantH1,
      `${tag} h1 与源文案不符（疑似回退英语）\n      期望: ${wantH1}\n      实得: ${norm(got.h1)}`
    )
    check(got.overflow <= 2, `${tag} 桌面横向溢出 ${got.overflow}px`)
    check(errs.length === 0, `${tag} console: ${errs.slice(0, 2).join(' | ')}`)

    /* 页脚「服务」列必须渲染服务名而非内部 id（曾因用 t() 取对象数组消息而整体退化为
       ocean / air / rail）。只在首页检查一次，避免重复。 */
    if (page === 'home') {
      const want = messages[loc.code].services.items.map((i) => norm(i.title))
      check(
        got.footerServices.length === want.length,
        `${tag} 页脚服务项 ${got.footerServices.length} 个，期望 ${want.length}`
      )
      check(
        got.footerServices.every((tx, i) => norm(tx) === want[i]),
        `${tag} 页脚服务列与源文案不符\n      期望: ${want.join(' / ')}\n      实得: ${got.footerServices.join(' / ')}`
      )
    }

    /* 法定主体：网络页与联系页必须完整渲染，且名称在四门语言下逐字一致（登记原文不翻译） */
    if (page === 'network' || page === 'contact') {
      check(
        got.entities.length === wantLegalNames.length,
        `${tag} 主体卡片 ${got.entities.length} 张，期望 ${wantLegalNames.length} 张`
      )
      const gotNames = got.entities.map((e) => e.name)
      check(
        gotNames.join('¦') === wantLegalNames.join('¦'),
        `${tag} 法定主体名称与登记原文不符（可能被翻译或遗漏）\n      期望: ${wantLegalNames.join(' / ')}\n      实得: ${gotNames.join(' / ')}`
      )
      got.entities.forEach((e, i) => {
        const who = `主体#${i + 1}（${e.name.slice(0, 30) || '名称缺失'}）`
        check(e.place.length > 0, `${tag} ${who} 城市/国家行缺失`)
        check(
          e.addrLines.length >= 2 && e.addrLines.every((l) => l.length > 0),
          `${tag} ${who} 注册地址行不足或为空：${JSON.stringify(e.addrLines)}`
        )
        e.tels.forEach((h) =>
          check(/^tel:\+?\d{6,}$/.test(h), `${tag} ${who} tel 链接不规范：${h}`)
        )
      })
    }

    console.log(`  ${(url + '').padEnd(16)} h1「${got.h1.slice(0, 40)}」`)
    await p.close()
  }
}

/* —— 窄屏：四门语言在 360px 下顶栏不得溢出 —— */
console.log('\n[窄屏 360px 溢出检查]')
const mctx = await browser.newContext({
  viewport: { width: 360, height: 780 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true
})
for (const loc of LOCALES) {
  for (const [, slug] of [
    ['home', '/'],
    ['network', '/network'],
    ['contact', '/contact']
  ]) {
    const p = await mctx.newPage()
    await p.goto(`http://127.0.0.1:${PORT}${loc.prefix}${slug === '/' ? '/' : slug}`, {
      waitUntil: 'networkidle'
    })
    await p.waitForTimeout(200)
    const r = await p.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      topbarOverflow:
        document.querySelector('.topbar__inner')?.scrollWidth -
        document.querySelector('.topbar__inner')?.clientWidth
    }))
    check(r.overflow <= 2, `${loc.code}${slug} 360px 横向溢出 ${r.overflow}px`)
    check(r.topbarOverflow <= 2, `${loc.code}${slug} 360px 顶栏溢出 ${r.topbarOverflow}px`)
    console.log(`  ${loc.code}${slug.padEnd(10)} 页面溢出 ${r.overflow}px / 顶栏溢出 ${r.topbarOverflow}px`)
    await p.close()
  }
}

await browser.close()
server.close()

console.log('\n==== 问题汇总 ====')
if (!problems.length) console.log(`全部通过（${PAGES.length * LOCALES.length} 页 + 12 项窄屏检查）`)
else {
  problems.forEach((p) => console.log('- ' + p))
  console.log(`\n共 ${problems.length} 项问题`)
}
process.exit(problems.length ? 1 : 0)
