/**
 * 栅格与尺寸精确测量（避免目测误差）。
 * 校验三点：1) 页头与正文容器左右边缘是否对齐同一栅格
 *           2) 移动端顶栏是否存在元素被裁切
 *           3) 页头 logo / 汉堡按钮的渲染尺寸是否合理
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const ROOT = path.resolve('dist')
const PORT = 4391
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' }

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0])
  let file = path.join(ROOT, url)
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) file = path.join(ROOT, 'index.html')
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
  fs.createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] })

const box = (sel) => `(() => {
  const el = document.querySelector(${JSON.stringify(sel)})
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), h: Math.round(r.height) }
})()`

// ---------- 桌面：栅格对齐 ----------
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1500)

  const m = await p.evaluate(() => {
    const g = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) }
    }
    return {
      headerWrap: g('.site-header .wrap, .siteheader .wrap, header .wrap'),
      heroInner: g('.hero__inner'),
      heroEyebrow: g('.hero__inner .eyebrow'),
      homeSectionWrap: g('main .section .wrap'),
      logo: g('.brand__logo, .brand img'),
      navCta: g('.site-header .gbtn, header .gbtn'),
      headerH: g('.site-header, header')
    }
  })
  console.log('=== 桌面 1440px 栅格 ===')
  for (const [k, v] of Object.entries(m)) {
    console.log(' ', k.padEnd(16), v ? `left=${String(v.l).padStart(4)}  right=${String(v.r).padStart(4)}  w=${v.w}` : 'null')
  }
  const align = m.headerWrap && m.heroInner ? Math.abs(m.headerWrap.l - m.heroInner.l) : null
  console.log('  → 页头与 hero 左边缘偏差:', align === null ? '无法判定' : `${align}px ${align <= 2 ? '✓ 对齐' : '✗ 不对齐'}`)
  await ctx.close()
}

// ---------- 移动端：顶栏裁切与页头尺寸 ----------
for (const vw of [390, 360]) {
  const ctx = await browser.newContext({ viewport: { width: vw, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true })
  const p = await ctx.newPage()
  await p.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1500)

  const m = await p.evaluate(() => {
    const out = {}
    const g = (sel) => {
      const el = document.querySelector(sel)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), h: Math.round(r.height) }
    }
    out.topbar = g('.topbar')
    out.topbarInner = g('.topbar .wrap')
    out.brand = g('.brand')
    out.logo = g('.brand__logo, .brand img')
    out.burger = g('.burger, .navtoggle, .menu-btn, .site-header button')
    out.header = g('.site-header, header')
    // 顶栏内所有直接子元素，找出被裁切的
    const bar = document.querySelector('.topbar .wrap')
    if (bar) {
      const br = bar.getBoundingClientRect()
      out.clipped = [...bar.querySelectorAll('*')]
        .filter((el) => {
          const r = el.getBoundingClientRect()
          if (r.width === 0 || r.height === 0) return false
          // 内容实际宽度超过可见宽度，即被 ellipsis / overflow 裁掉
          return el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0
        })
        .map((el) => ({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 40),
          visible: el.clientWidth,
          full: el.scrollWidth,
          text: (el.textContent || '').trim().slice(0, 40)
        }))
      out.barWidth = Math.round(br.width)
    }
    // 顶栏是否换行（高度异常）
    out.topbarH = bar ? Math.round(bar.getBoundingClientRect().height) : null
    return out
  })

  console.log(`\n=== 移动端 ${vw}px ===`)
  for (const [k, v] of Object.entries(m)) {
    if (k === 'clipped') continue
    console.log(' ', k.padEnd(14), v && typeof v === 'object' ? `left=${v.l} right=${v.r} w=${v.w} h=${v.h}` : v)
  }
  console.log('  被裁切元素:', m.clipped?.length ? JSON.stringify(m.clipped, null, 2) : '无 ✓')
  await ctx.close()
}

await browser.close()
server.close()
