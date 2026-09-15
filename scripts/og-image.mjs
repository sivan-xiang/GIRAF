/**
 * 生成社交分享图 og:image（1200×630）。
 *
 * 为什么用无头浏览器渲染而不是图片生成模型：
 * 分享图需要精确的品牌色、字号与栅格，且要复用站点 logo。
 * 用浏览器渲染同一套设计令牌，结果可复现、可版本管理，也不会出现模型幻觉出的错误文字。
 *
 * 用法：npm run og   → 产出 public/og-image.png
 */
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const OUT = path.resolve('public/og-image.png')

const dataUri = (file) =>
  `data:image/png;base64,${fs.readFileSync(path.resolve(file)).toString('base64')}`

const logoLight = dataUri('public/logo-light.png')

const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: #0d1526; color: #fff; position: relative;
  }
  /* 品牌光场：与站点 Aurora 同一套色相，但静态化以保证截图稳定 */
  .glow { position: absolute; inset: 0; }
  .glow::before, .glow::after {
    content: ''; position: absolute; border-radius: 50%; filter: blur(90px);
  }
  .glow::before {
    width: 720px; height: 720px; left: -140px; top: -240px;
    background: radial-gradient(circle, rgba(250,89,89,0.55), transparent 68%);
  }
  .glow::after {
    width: 820px; height: 820px; right: -220px; bottom: -380px;
    background: radial-gradient(circle, rgba(47,106,176,0.55), transparent 68%);
  }
  .grid {
    position: absolute; inset: 0; opacity: 0.5;
    background-image:
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: linear-gradient(180deg, rgba(0,0,0,0.9), transparent 88%);
  }
  .inner {
    position: relative; height: 100%; padding: 72px 84px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .brand img { height: 62px; width: auto; display: block; }
  .body { max-width: 900px; }
  .eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 17px; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: rgba(255,255,255,0.72);
    margin-bottom: 26px;
  }
  .eyebrow::before { content: ''; width: 40px; height: 2px; background: #fa5959; }
  h1 {
    font-size: 74px; line-height: 1.04; font-weight: 800; letter-spacing: -0.028em;
    margin-bottom: 26px;
  }
  h1 .accent {
    background: linear-gradient(100deg, #fa5959 12%, #ff9d6c 92%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sub { font-size: 25px; line-height: 1.5; color: rgba(255,255,255,0.76); max-width: 820px; }
  .footer {
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.16);
    font-size: 19px; color: rgba(255,255,255,0.72);
  }
  .footer b { color: #fff; font-weight: 700; letter-spacing: 0.01em; }
  .footer .right { text-align: right; line-height: 1.55; }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="grid"></div>
  <div class="inner">
    <div class="brand"><img src="${logoLight}" alt="GIRAF" /></div>

    <div class="body">
      <span class="eyebrow">GIRAF &middot; The international brand of LONGSAIL</span>
      <h1>Simplify the<br /><span class="accent">cross-border trade.</span></h1>
      <p class="sub">Ocean, air and rail freight, customs clearance and warehousing &mdash; served from our European hub in Hamburg.</p>
    </div>

    <div class="footer">
      <span><b>Hamburg, Germany</b> &nbsp;&middot;&nbsp; 30+ offices across China, Europe &amp; beyond</span>
      <span class="right">www.girafsail-logistics.com<br />info.de@girafsail-logistics.com</span>
    </div>
  </div>
</body>
</html>`

const browser = await chromium.launch({ executablePath: EDGE, args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'load' })
// 等字体与内联 logo 解码完成，避免首帧空白
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(400)
await page.screenshot({ path: OUT })
await browser.close()

const kb = (fs.statSync(OUT).size / 1024).toFixed(1)
console.log(`✓ 已生成 ${path.relative(process.cwd(), OUT)}  (1200×630, ${kb} KB)`)
