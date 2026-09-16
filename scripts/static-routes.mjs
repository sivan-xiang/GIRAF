/**
 * 路由实体化：为每个路由生成实体 HTML（纯静态托管专用）
 * ------------------------------------------------------------------
 * 本站是 HTML5 History 路由的 SPA。在纯静态托管（GitHub Pages 等）上，
 * 直接访问 /services、/services/ocean、/solutions/frozen 这类深链会返回 **HTTP 404**：
 * 即使 404.html 兜底让页面照常渲染，状态码仍是 404，
 * 搜索引擎与部分社交分享预览会把深链当成死链。
 *
 * 本脚本为「语言前缀 × 路由路径」的每个组合写出
 *   <outDir>/<route>/index.html   （内容 = 构建产物的 index.html）
 * 使所有已知路由都返回 200；未知路径仍由 404.html 兜底，行为不变。
 *
 * 数据来源一律取**运行时同一份**：语言表与内容表直接 import，
 * 只有路由表因使用 `@` 别名而必须从源码解析。任何一处解析数量不符即报错退出，
 * 避免源文件结构调整后静默漏生成。
 *
 * ⚠️ 语言前缀必须只取 `locales`（已启用语言），不能连同 PENDING_LOCALES 一起取：
 *    前者才对应 router 真正注册的路由。曾因正则扫到 PENDING_LOCALES 的 prefix，
 *    为 /de /es /th 生成了一批「托管能 200、但前端路由不存在」的空目录。
 *
 * 用法：node scripts/static-routes.mjs [outDir=dist]
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(here, '..')
const outDir = path.resolve(projectRoot, process.argv[2] || 'dist')

const read = (rel) => fs.readFileSync(path.join(projectRoot, rel), 'utf8')
const load = (rel) => import(pathToFileURL(path.join(projectRoot, rel)).href)

const fail = (msg) => {
  console.error(`✗ ${msg}`)
  process.exit(1)
}

/* —— 1. 语言前缀：只取已启用语言；默认语言 prefix 为空串（英语位于根路径）—— */
const { locales } = await load('src/i18n/locales.js')
const prefixes = locales.map((l) => l.prefix)
if (!prefixes.length || !prefixes.includes('')) {
  fail(`语言表解析异常：得到 ${JSON.stringify(prefixes)}，须含默认语言（prefix 为空串）`)
}

/* —— 2. 页面路径表：pages.js 使用 @ 别名，Node 无法直接 import，从源码解析 —— */
const pagePaths = {}
for (const m of read('src/router/pages.js').matchAll(/^\s{2}(\w+):\s*'([^']*)'/gm)) {
  pagePaths[m[1]] = m[2]
}
const pageNames = Object.keys(pagePaths)
if (pageNames.length < 8 || !pagePaths.home?.includes('/')) {
  fail(`路由表解析异常：得到 ${pageNames.length} 个路径 ${JSON.stringify(pagePaths)}`)
}
for (const key of ['services', 'solutions']) {
  if (!pagePaths[key]) fail(`路由表缺少 ${key} 基址，详情页无法实体化`)
}

/* —— 3. 内容表：直接 import 运行时同一份数据 —— */
const { services } = await load('src/data/services.js')
const { solutions } = await load('src/data/solutions.js')
if (!services.length || !solutions.length) {
  fail(`内容表为空：services ${services.length} / solutions ${solutions.length}`)
}

/* —— 4. 组合出全部路由 —— */
const join = (...parts) => parts.join('').replace(/\/{2,}/g, '/')
const routes = new Set()
for (const prefix of prefixes) {
  for (const p of Object.values(pagePaths)) routes.add(join(prefix, p))
  // 详情页：菜单里每一项都有自己的页面，深链同样必须返回 200
  for (const s of services) routes.add(join(prefix, pagePaths.services, '/', s.slug))
  for (const s of solutions) routes.add(join(prefix, pagePaths.solutions, '/', s.slug))
}

const perLang = pageNames.length + services.length + solutions.length
const expected = prefixes.length * perLang
if (routes.size !== expected) {
  fail(`路由组合异常：${routes.size} 个，期望 ${expected} 个（前缀 × 静态页与详情页）`)
}

/* —— 5. 写文件 —— */
const indexPath = path.join(outDir, 'index.html')
if (!fs.existsSync(indexPath)) {
  fail(`未找到 ${path.relative(projectRoot, indexPath)}，请先执行构建`)
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
  `路由实体化完成：${prefixes.length} 种语言 × ${perLang} 条路径` +
    `（${pageNames.length} 静态页 + ${services.length} 服务详情 + ${solutions.length} 方案详情）` +
    ` = ${routes.size} 条路由，新写入 ${written} 个目录 + 1 个 404.html（根路径复用构建产物）`
)
