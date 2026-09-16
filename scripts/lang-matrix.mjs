/**
 * 多语言矩阵校验：每个页面 × 每门已启用语言
 * ------------------------------------------------------------------
 * 语言数量由 LOCALES 数组决定（当前仅 en；启用 de/es/th 时同步该数组即可，
 * 其余断言全部由它推导）。
 * 用无头 Edge 真机渲染 dist/，逐页断言「运行时渲染结果 == 源文案」，
 * 而不是断言硬编码字符串——这样任何语言漏译、键位错位、模板回退英语
 * 都会在标题层面立刻暴露。
 *
 * 校验项：
 *   1) document.title 与 src/i18n/<lang>.js 的 meta.<page>.title 完全一致
 *      （同时验证 tm() 取原始文案的链路：标题含「|」、描述含「@」邮箱，
 *        若被当成复数分隔符/链接语法会在此处失败）
 *   2) <html lang> 与注册表 htmlLang 一致
 *   3) 语言切换器已按需求从页眉移除，页眉残留项必须为 0
 *   4) hreflang / og:locale:alternate 覆盖「已启用语言」全集，canonical 指向当前语言版本。
 *      英语单语期间即 en + x-default、alternate 为 0；启用语言后自动扩展。
 *      这些断言并非冗余：不要因为「暂时只有一门语言」就把它们删掉。
 *   5) og:locale 与注册表一致
 *   6) 控制台零报错、页面无横向溢出
 *   7) 网络页 / 联系页的法定主体卡片完整（8 家），
 *      且登记名称在各语言下逐字一致——等价于断言「法定名称没有被翻译」
 *   8) 询价弹框：顶部菜单栏（含移动端抽屉）已按要求移除询价按钮，断言页眉内
 *      不再出现「Request a quote」；正文 CTA 必须原地弹出唯一实例并复用联系页表单，
 *      不得跳转；Esc 可关闭；背景滚动的锁定与解除都正常。
 *      同时断言页脚不再出现工商登记号与 VAT ID（法定披露集中在 Imprint 页）
 *   9) 浅色冲淡守卫：任何页面都不得出现「不透明的近白色」背景。
 *      查的是 background-image 而不只是 background-color —— 浅色主题迁移遗留的写法是
 *      linear-gradient(…, #fff)，这类元素的 backgroundColor 是透明的，
 *      只看背景色会整片漏掉（/solutions/general 的白色篇首正是这样漏过校验的）。
 *  10) 详情页深链（/services/<slug>、/solutions/<slug>）：dist 里必须已有实体
 *      index.html（纯静态托管下缺了就返回 404），且 h1 取自内容源、无键名泄漏。
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

/**
 * 语言注册表（与 src/i18n/locales.js 对齐；此处内联以避开 Vite 的 @ 别名）
 * ⚠️ 站点当前仅启用英语。启用一门语言时，需同步：
 *    1) src/i18n/locales.js 的 locales 数组
 *    2) src/i18n/pending/<code>.js 移回 src/i18n/ 并在 index.js 中 import
 *    3) 本数组追加对应项
 */
const LOCALES = [{ code: 'en', htmlLang: 'en', prefix: '', ogLocale: 'en_US' }]

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
 * 详情页深链（/services/ocean、/solutions/general …）。
 * 必须纳入矩阵：/solutions/general 的浅色篇首残留，正是因为旧版只看 8 个静态页
 * 才一路漏到了线上。路径与条目数从源码取，避免与站点漂移。
 */
const pagePathsSrc = fs.readFileSync(path.resolve(projectRoot, 'src/router/pages.js'), 'utf8')
const baseOf = (key) =>
  (pagePathsSrc.match(new RegExp(`^\\s{2}${key}:\\s*'([^']*)'`, 'm')) || [])[1] || ''
const loadData = (rel) => import(pathToFileURL(path.resolve(projectRoot, rel)).href)
const { services } = await loadData('src/data/services.js')
const { solutions } = await loadData('src/data/solutions.js')

const DETAILS = [
  ...services.map((s) => ({
    path: `${baseOf('services')}/${s.slug}`,
    title: s.name
  })),
  ...solutions.map((s) => ({
    path: `${baseOf('solutions')}/${s.slug}`,
    title: s.name
  }))
]
if (!DETAILS.length || DETAILS.some((d) => !d.path.startsWith('/'))) {
  console.warn(`⚠ 未能解析出详情页路径（${DETAILS.length} 条），请检查 pages.js 结构`)
}

/**
 * 浅色冲淡守卫：任何元素都不得带「不透明的近白色」背景。
 *
 * 为什么必须查 background-image 而不只是 backgroundColor：
 * 浅色主题迁移遗留的写法是 linear-gradient(…, #fff)，这类元素的
 * backgroundColor 是透明的，只看背景色会把整片白渐变完全漏掉——
 * diag-top.mjs 正是因此没能发现 /solutions/general 的白色篇首。
 *
 * 只看 alpha ≥ 0.5 的颜色字面量，所以玻璃面那种 rgba(255,255,255,0.035)
 * 不会误报；也只看近白（min(r,g,b) ≥ 200），珊瑚红 #fa5959 之类的强调色不受影响。
 */
const PALE_GUARD = () => {
  const toRgb = (t) => {
    if (t === 'white') return [255, 255, 255, 1]
    if (t.startsWith('#')) {
      const h = t.slice(1)
      const hex = h.length <= 4 ? [...h].map((c) => c + c).join('') : h
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
        hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
      ]
    }
    const p = t.replace(/^rgba?\(|\)$/g, '').split(',').map((v) => parseFloat(v))
    return [p[0], p[1], p[2], p.length === 4 ? p[3] : 1]
  }
  const pale = (v) => {
    if (!v || v === 'none') return null
    for (const t of v.match(/rgba?\([^)]*\)|#[0-9a-fA-F]{3,8}|\bwhite\b/g) || []) {
      const [r, g, b, a] = toRgb(t)
      if (a >= 0.5 && Math.min(r, g, b) >= 200) return t
    }
    return null
  }
  const desc = (el) =>
    `<${el.tagName.toLowerCase()}${
      el.className && typeof el.className === 'string'
        ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
        : ''
    }>`
  const out = []
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el)
    // 背景被裁到字形时（ShinyText 那类文字高光），白色只勾勒文字本身而不构成底色，
    // 排除掉，否则会把正常的设计效果误判成浅色主题遗留。
    if (cs.backgroundClip === 'text' || cs.webkitBackgroundClip === 'text') continue
    for (const [prop, v] of [
      ['background-color', cs.backgroundColor],
      ['background-image', cs.backgroundImage]
    ]) {
      const hit = pale(v)
      if (hit) out.push(`${desc(el)} ${prop}=${hit}`)
    }
  }
  return [...new Set(out)]
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

/**
 * 全部合法文案键路径（以英语树为基准）。
 * 用途：vue-i18n 在缺键时会**静默**把键路径原样渲染到页面上（如 contact.details.title、
 * network.own），页面其余部分一切正常，肉眼极易漏过——此前已漏过两次，故设此守卫。
 * 以「键路径是否出现在可见文本里」判定，而非用正则猜键名形状，避免把
 * 句末的「Contact.」这类正常文案误报为泄漏。
 */
const enTree = (await import(pathToFileURL(path.resolve(projectRoot, 'src/i18n/en.js')).href))
  .default
const flatKeys = (() => {
  const out = []
  const walk = (o, prefix) => {
    for (const [k, v] of Object.entries(o || {})) {
      const key = prefix ? `${prefix}.${k}` : k
      if (v && typeof v === 'object' && !Array.isArray(v)) walk(v, key)
      // 只收多段键路径。单段键名（如语言描述对象的 short: 'EN'）会与正常英文单词撞车，
      // 把「short lines of communication」判成泄漏——而 vue-i18n 实际泄漏的永远是点分路径。
      else if (key.includes('.')) out.push(key)
    }
  }
  walk(enTree, '')
  return out
})()

/** 键路径匹配：加词边界，避免作为更长标识符的子串被误判 */
const leakPattern = (k) =>
  new RegExp(`(^|[^\\w.])${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w.])`)

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

console.log(`多语言矩阵校验（${PAGES.length} 页 × ${LOCALES.length} 语言）`)
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
        // 页眉语言切换器已移除；此处仅统计残留数量，用于防止误回退
        switchers: document.querySelectorAll('.lang .lang__btn').length,
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
        // 法定主体条目：网络页用卡片网格（.entity），联系页用登记式目录（.office）。
        // 两页版式不同但承载同一份登记原文，故在此归一成同一形状再比对，
        // 这样「法定名称未被翻译」这条断言对两页同时生效。
        entities: [...document.querySelectorAll('.entity, .office')].map((el) => {
          const isOffice = el.classList.contains('office')
          const sel = (o, c) => el.querySelector(isOffice ? o : c)?.textContent.trim() || ''
          return {
            name: sel('.office__name', '.entity__name'),
            place: sel('.office__place', '.entity__place'),
            addrLines: [
              ...el.querySelectorAll(isOffice ? '.office__addr address span' : '.entity__addr address span')
            ].map((s) => s.textContent.trim()),
            tels: [...el.querySelectorAll('a[href^="tel:"]')].map((a) => a.getAttribute('href'))
          }
        }),
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        // 供「键名泄漏守卫」使用：缺键时 vue-i18n 会把键路径原样渲染成可见文本
        text: document.body.innerText
      }
    })

    const tag = `${loc.code}${url}`
    /* 浅色冲淡守卫：深色站里不该出现任何不透明白底 */
    const pale = await p.evaluate(PALE_GUARD)
    check(
      pale.length === 0,
      `${tag} 出现浅色背景（疑似浅色主题遗留）: ${pale.slice(0, 3).join(' | ')}`
    )
    if (resp && resp.status() >= 400) problems.push(`${tag} HTTP ${resp.status()}`)
    check(norm(got.title) === wantTitle, `${tag} title 不符\n      期望: ${wantTitle}\n      实得: ${norm(got.title)}`)
    check(norm(got.desc) === wantDesc, `${tag} description 与源文案不一致`)
    check(got.htmlLang === loc.htmlLang, `${tag} html lang=${got.htmlLang}，期望 ${loc.htmlLang}`)
    check(got.ogLocale === loc.ogLocale, `${tag} og:locale=${got.ogLocale}，期望 ${loc.ogLocale}`)
    // 多语言相关断言全部由 LOCALES 推导：启用新语言时无需改动本文件
    const wantAlternates = LOCALES.length - 1
    check(
      got.ogAlternates === wantAlternates,
      `${tag} og:locale:alternate=${got.ogAlternates}，期望 ${wantAlternates}`
    )
    const wantHreflang = [...LOCALES.map((l) => l.htmlLang), 'x-default']
    check(
      got.hreflangs.length === wantHreflang.length &&
        wantHreflang.every((t) => got.hreflangs.includes(t)),
      `${tag} hreflang=[${got.hreflangs.join(',')}]，期望 ${wantHreflang.join(',')}`
    )
    check(got.canonical.endsWith(url), `${tag} canonical=${got.canonical}，未指向 ${url}`)
    // 页眉已按需求移除语言切换器（站点默认英语），残留即为回退
    check(got.switchers === 0, `${tag} 页眉仍残留 ${got.switchers} 个语言切换项`)
    // 首屏正文必须与「当前语言」的源文案逐字一致，不能退回英语、也不能整段缺失
    const wantH1 = expectedH1(loc.code, page)
    check(got.h1.length > 0, `${tag} h1 为空`)
    check(
      norm(got.h1) === wantH1,
      `${tag} h1 与源文案不符（疑似回退英语）\n      期望: ${wantH1}\n      实得: ${norm(got.h1)}`
    )
    check(got.overflow <= 2, `${tag} 桌面横向溢出 ${got.overflow}px`)
    check(errs.length === 0, `${tag} console: ${errs.slice(0, 2).join(' | ')}`)

    /* 键名泄漏守卫：可见文本里不得出现任何未翻译的点分键路径 */
    const leaked = flatKeys.filter((k) => leakPattern(k).test(got.text))
    check(leaked.length === 0, `${tag} 页面泄漏未翻译的键名: ${leaked.join(', ')}`)

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

/* —— 详情页深链：已实体化 + 标题取自内容源 + 无浅色背景 —— */
console.log('\n[详情页深链]')
for (const d of DETAILS) {
  const p = await ctx.newPage()
  const errs = []
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  p.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))

  /*
    先查磁盘：本地静态服务器对任何路径都回 200（兜底到 index.html），
    所以「响应码 200」在这里证明不了任何事——决定深链成败的是
    构建产物里到底有没有 dist/<route>/index.html 这个实体文件。
  */
  const rel = d.path.replace(/^\//, '')
  check(
    fs.existsSync(path.join(ROOT, rel, 'index.html')),
    `${d.path} 未实体化（dist/${rel}/index.html 缺失，静态托管下该深链会返回 404）`
  )

  await p.goto(`http://127.0.0.1:${PORT}${d.path}`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(180)

  const got = await p.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent.trim() || '',
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    text: document.body.innerText
  }))
  const tag = d.path

  check(norm(got.h1) === norm(d.title), `${tag} h1「${got.h1}」与内容源「${d.title}」不符`)
  check(got.overflow <= 2, `${tag} 桌面横向溢出 ${got.overflow}px`)

  const pale = await p.evaluate(PALE_GUARD)
  check(pale.length === 0, `${tag} 出现浅色背景（疑似浅色主题遗留）: ${pale.slice(0, 3).join(' | ')}`)

  const leaked = flatKeys.filter((k) => leakPattern(k).test(got.text))
  check(leaked.length === 0, `${tag} 页面泄漏未翻译的键名: ${leaked.join(', ')}`)
  check(errs.length === 0, `${tag} console: ${errs.slice(0, 2).join(' | ')}`)

  console.log(
    `  ${tag.padEnd(26)} h1「${got.h1.slice(0, 24)}」 浅色背景 ${pale.length ? '✗ ' + pale[0] : '无 ✓'}`
  )
  await p.close()
}

/* —— 窄屏：各语言在 360px 下顶栏不得溢出 —— */
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
    const r = await p.evaluate(() => {
      // 顶部信息条已整体移除；若元素不存在则溢出记为 0，不能让 null - null 得到 NaN
      // （NaN <= 2 恒为 false，会把「无顶栏」误报成溢出失败）
      const bar = document.querySelector('.topbar__inner')
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        topbarOverflow: bar ? bar.scrollWidth - bar.clientWidth : 0,
        hasTopbar: Boolean(bar)
      }
    })
    check(r.overflow <= 2, `${loc.code}${slug} 360px 横向溢出 ${r.overflow}px`)
    check(r.topbarOverflow <= 2, `${loc.code}${slug} 360px 顶栏溢出 ${r.topbarOverflow}px`)
    check(!r.hasTopbar, `${loc.code}${slug} 顶部信息条应已移除（当前仍存在）`)
    console.log(
      `  ${loc.code}${slug.padEnd(10)} 页面溢出 ${r.overflow}px / 顶栏溢出 ${r.topbarOverflow}px / 顶栏${r.hasTopbar ? '存在 ✗' : '已移除 ✓'}`
    )
    await p.close()
  }
}

/* —— 询价弹框（全站唯一实例）+ 页眉入口 + 页脚法定披露 —— */
console.log('\n[询价弹框 / 页眉入口 / 页脚披露]')

/** 页眉（含移动端抽屉）内是否出现询价按钮文案 */
const headerQuoteText = (page) =>
  page.evaluate(
    ([sel]) => (document.querySelector(sel)?.innerText || '').includes('Request a quote'),
    ['.site-header']
  )

{
  const p = await ctx.newPage()
  const errs = []
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  p.on('pageerror', (e) => errs.push('PAGEERROR: ' + e.message))
  await p.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })

  /* 工商登记号与 VAT ID 已从页脚移除，改由 Imprint 页承担法定披露；
     这两串数字若重新出现在页脚，说明底栏改动被回退了 */
  const foot = await p.evaluate(() => document.querySelector('.footer')?.innerText || '')
  check(!/DE323296008/.test(foot), '页脚仍出现 VAT ID DE323296008')
  check(!/HRB\s*186908/.test(foot), '页脚仍出现工商登记号 HRB 186908')

  /* 顶部菜单栏（含移动端抽屉）按要求移除询价按钮：询价入口统一留在正文 CTA */
  check(!(await headerQuoteText(p)), '顶部菜单栏仍出现「Request a quote」')

  /* 正文 CTA 必须就地打开弹框，而不是把用户送到联系页 */
  const before = p.url()
  await p.click('.hero__actions .gbtn--primary')
  await p.waitForSelector('[role="dialog"]', { state: 'visible', timeout: 3000 }).catch(() => {})
  const opened = await p.evaluate(() => Boolean(document.querySelector('[role="dialog"]')))
  check(opened, '点击正文「Request a quote」未打开弹框')
  check(p.url() === before, `正文「Request a quote」发生了跳转：${p.url()}`)

  if (opened) {
    const inner = await p.evaluate(() => {
      const d = document.querySelector('[role="dialog"]')
      return {
        hasForm: Boolean(d.querySelector('form')),
        fields: d.querySelectorAll('input, select, textarea').length,
        label: d.getAttribute('aria-label') || '',
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        locked: getComputedStyle(document.body).overflow
      }
    })
    check(inner.hasForm, '弹框内没有表单')
    // 与联系页表单同源：漏了任何一段字段都说明弹框没有复用 ContactForm
    check(inner.fields >= 10, `弹框表单控件只有 ${inner.fields} 个，与联系页表单不符`)
    check(
      inner.label === resolvePath(messages.en, 'contact.form.title'),
      `弹框 aria-label=「${inner.label}」，期望「${resolvePath(messages.en, 'contact.form.title')}」`
    )
    check(inner.overflow <= 2, `弹框打开时横向溢出 ${inner.overflow}px`)
    check(inner.locked === 'hidden', `弹框打开时 body.overflow=${inner.locked}，期望 hidden`)
    console.log(
      `  正文 CTA → 弹框 ✓（表单控件 ${inner.fields} 个，aria-label「${inner.label}」，滚动锁 ${inner.locked}）`
    )

    await p.keyboard.press('Escape')
    await p.waitForTimeout(340)
    check(
      await p.evaluate(() => !document.querySelector('[role="dialog"]')),
      'Esc 未能关闭弹框'
    )
    // 关闭后必须解锁背景滚动，否则整站再也滚不动
    check(
      (await p.evaluate(() => getComputedStyle(document.body).overflow)) !== 'hidden',
      '弹框关闭后背景滚动锁未解除'
    )
  }
  check(errs.length === 0, `询价弹框 console: ${errs.slice(0, 2).join(' | ')}`)
  await p.close()

  /* 移动端：抽屉里同样不得有询价按钮，询价入口仍在正文 CTA */
  const mctx2 = await browser.newContext({
    viewport: { width: 390, height: 780 },
    isMobile: true,
    hasTouch: true
  })
  const mp = await mctx2.newPage()
  await mp.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
  await mp.click('.burger')
  await mp.waitForTimeout(300)
  const drawerOpen = await mp.evaluate(() => Boolean(document.querySelector('.drawer')))
  check(drawerOpen, '移动端抽屉未能展开（后续断言无从进行）')
  check(!(await headerQuoteText(mp)), '移动端抽屉仍出现「Request a quote」')

  /* 用 Esc 收起抽屉：抽屉展开时其遮罩会拦截汉堡按钮的点击 */
  await mp.keyboard.press('Escape')
  await mp.waitForTimeout(360)
  await mp.click('.hero__actions .gbtn--primary')
  await mp.waitForTimeout(360)
  const st = await mp.evaluate(() => ({
    dialog: Boolean(document.querySelector('[role="dialog"]')),
    locked: getComputedStyle(document.body).overflow
  }))
  check(st.dialog, '移动端正文询价 CTA 未打开弹框')
  check(st.locked === 'hidden', `移动端弹框打开时 body.overflow=${st.locked}，期望 hidden`)
  console.log(
    `  移动端：抽屉内无询价按钮 ${'✓'} / 正文 CTA → 弹框 ${st.dialog ? '✓' : '✗'} / 滚动锁 ${st.locked}`
  )
  await mctx2.close()
}

await browser.close()
server.close()

console.log('\n==== 问题汇总 ====')
if (!problems.length)
  console.log(
    `全部通过（${PAGES.length * LOCALES.length} 静态页 + ${DETAILS.length} 详情页深链 + 12 项窄屏检查 + 询价弹框 / 页眉入口 / 页脚披露 17 项）`
  )
else {
  problems.forEach((p) => console.log('- ' + p))
  console.log(`\n共 ${problems.length} 项问题`)
}
process.exit(problems.length ? 1 : 0)
