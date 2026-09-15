/**
 * 路由实体化：为每个路由生成实体 HTML（纯静态托管专用）
 * ------------------------------------------------------------------
 * 本站是 HTML5 History 路由的 SPA。在纯静态托管（GitHub Pages 等）上，
 * 直接访问 /services、/de/contact 这类深链会返回 **HTTP 404**：
 * 即使 404.html 兜底让页面照常渲染，状态码仍是 404，
 * 搜索引擎与部分社交分享预览会把深链当成死链。
 *
 * 本脚本为「语言前缀 × 页面路径」的每个组合写出
 *   <outDir>/<route>/index.html   （内容 = 构建产物的 index.html）
 * 使所有已知路由都返回 200；未知路径仍由 404.html 兜底，行为不变。
 *
 * 语言表与路由表**从源码解析**（而非硬编码），解析数量不符即报错退出，
 * 避免源文件结构调整后静默漏生成。
 *
 * 用法：node scripts/static-routes.mjs [outDir=dist]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..')
const outDir = path.resolve(projectRoot, process.argv[2] || 'dist')

const read = (rel) => fs.readFileSync(path.join(projectRoot, rel), 'utf8')

/* —— 1. 语言前缀：默认语言的 prefix 为空字符串（英语位于根路径）—— */
const localeSrc = read('src/i18n/locales.js')
const prefixes = [...localeSrc.matchAll(/prefix:\s*'([^']*)'/g)].map((m) => m[1])
if (prefixes.length < 4 || !prefixes.includes('')) {
  console.error(`✗ 语言表解析异常：得到 ${prefixes.length} 个前缀 ${JSON.stringify(prefixes)}`)
  process.exit(1)
}

/* —— 2. 页面路径表 —— */
const pagesSrc = read('src/router/pages.js')
const pagePaths = [...pagesSrc.matchAll(/^\s{2}(\w+):\s*'([^']*)'/gm)].map((m) => m[2])
if (pagePaths.length < 8 || !pagePaths.includes('/')) {
  console.error(`✗ 路由表解析异常：得到 ${pagePaths.length} 个路径 ${JSON.stringify(pagePaths)}`)
  process.exit(1)
}

/* —— 3. 组合出全部路由 —— */
const routes = new Set()
for (const prefix of prefixes) {
  for (const p of pagePaths) {
    routes.add(`${prefix}${p}`.replace(/\/{2,}/g, '/'))
  }
}
const expected = prefixes.length * pagePaths.length
if (routes.size !== expected) {
  console.error(`✗ 路由组合异常：${routes.size} 个，期望 ${expected} 个（前缀 × 页面）`)
  process.exit(1)
}

/* —— 4. 写文件 —— */
const indexPath = path.join(outDir, 'index.html')
if (!fs.existsSync(indexPath)) {
  console.error(`✗ 未找到 ${path.relative(projectRoot, indexPath)}，请先执行构建`)
  process.exit(1)
}
const shell = fs.readFileSync(indexPath)

let written = 0
for (const route of routes) {
  if (route === '/') continue // 根路径的 index.html 已由构建产出
  const rel = route.replace(/^\/|\/$/g, '')
  const dir = path.join(outDir, rel)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), shell)
  written += 1
}

// 未知路径兜底：托管商回以 404.html，浏览器拿到应用外壳后交回前端路由。
// 一并在此生成，避免依赖 shell 的 cp（Windows 的 cmd 下不可用）。
fs.writeFileSync(path.join(outDir, '404.html'), shell)

console.log(
  `路由实体化完成：${prefixes.length} 种语言 × ${pagePaths.length} 个页面 = ${routes.size} 条路由，` +
    `新写入 ${written} 个目录 + 1 个 404.html（根路径复用构建产物）`
)
