/**
 * i18n 键位一致性校验
 * ------------------------------------------------------------------
 * 站点当前仅启用英语（见 src/i18n/locales.js），但本脚本保留完整的同构校验机制：
 * 一旦将来启用 de / es / th，任何键位漂移都会立刻被报出来，而不是在运行时
 * 静默回退英语或渲染成空内容。
 *
 * 同时扫描 src/i18n/pending/ 下已停用但保留的译文，报告其相对英语的键位缺口，
 * 便于后期扩展时清楚还差哪些文案（仅提示，不计为失败）。
 *
 * 用法：npm run i18n
 * 退出码：0 = 全部对齐；1 = 存在差异（并逐条列出）
 */
import { pathToFileURL, fileURLToPath } from 'node:url'
import { resolve, dirname } from 'node:path'
import fs from 'node:fs'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const I18N = resolve(root, 'src/i18n')
const PENDING = resolve(I18N, 'pending')

/** 递归收集叶子节点路径（数组按索引展开，便于定位到具体元素） */
function leaves(node, prefix = '', out = []) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => leaves(v, `${prefix}[${i}]`, out))
  } else if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) leaves(node[k], prefix ? `${prefix}.${k}` : k, out)
  } else {
    out.push(prefix)
  }
  return out
}

/** 统计叶子节点数量（= 界面上的独立文案条数） */
const countLeaves = (node) => leaves(node).length

/** 收集全部中文叶子路径 */
function cjkLeaves(node, prefix = '', out = []) {
  const CJK = /[\u4e00-\u9fff]/
  const walk = (n, p) => {
    if (typeof n === 'string') {
      if (CJK.test(n)) out.push([p, n])
    } else if (Array.isArray(n)) {
      n.forEach((v, i) => walk(v, `${p}[${i}]`))
    } else if (n && typeof n === 'object') {
      for (const k of Object.keys(n)) walk(n[k], p ? `${p}.${k}` : k)
    }
  }
  walk(node, prefix)
  return out
}

const load = async (dir, code) => (await import(pathToFileURL(resolve(dir, `${code}.js`)).href)).default

/* ---------- 读取注册表：已启用语言 / 保留语言 ---------- */
const { locales, PENDING_LOCALES = [] } = await import(pathToFileURL(resolve(I18N, 'locales.js')).href)
const active = locales.map((l) => l.code)

const pendingDirFiles = fs.existsSync(PENDING)
  ? fs.readdirSync(PENDING).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, ''))
  : []

const trees = {}
for (const code of active) trees[code] = await load(I18N, code)

const refCode = active[0]
const ref = new Set(leaves(trees[refCode]))
let problems = 0

console.log('i18n 键位一致性校验')
console.log('─'.repeat(58))
console.log(`已启用语言：${active.join(', ')}`)
console.log(`基准语言：${refCode}（${ref.size} 条文案）\n`)

/* ---------- 1) 已启用语言之间必须严格同构 ---------- */
for (const code of active) {
  const mine = new Set(leaves(trees[code]))
  const missing = [...ref].filter((k) => !mine.has(k))
  const extra = [...mine].filter((k) => !ref.has(k))
  const ok = missing.length === 0 && extra.length === 0
  if (!ok) problems++

  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${code}  (${countLeaves(trees[code])} 条)${ok ? '' : `  — 缺失 ${missing.length} / 多余 ${extra.length}`}`)
  if (missing.length) console.log(`      缺失: ${missing.slice(0, 25).join(', ')}${missing.length > 25 ? ` … 共 ${missing.length} 条` : ''}`)
  if (extra.length) console.log(`      多余: ${extra.slice(0, 25).join(', ')}${extra.length > 25 ? ` … 共 ${extra.length} 条` : ''}`)
}

/* ---------- 2) 保留语言：报告缺口，不计为失败 ---------- */
if (pendingDirFiles.length) {
  console.log('\n保留语言（已停用，译文完整保留；下列缺口仅作提示）')
  console.log('─'.repeat(58))
  for (const code of pendingDirFiles) {
    const tree = await load(PENDING, code)
    const meta = PENDING_LOCALES.find((l) => l.code === code)
    const mine = new Set(leaves(tree))
    const missing = [...ref].filter((k) => !mine.has(k))
    const extra = [...mine].filter((k) => !ref.has(k))
    const inSync = missing.length === 0 && extra.length === 0
    const declared = meta ? '已登记' : '未在 PENDING_LOCALES 登记'
    console.log(
      `·     ${code}  (${countLeaves(tree)} 条)  ${inSync ? '与基准完全同步 ✓' : `待补 ${missing.length} 条 / 多余 ${extra.length} 条`}  ·  ${declared}`
    )
    if (missing.length) console.log(`      待补: ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ` … 共 ${missing.length} 条` : ''}`)
  }
}

/* ---------- 3) 元数据自洽：code/label/short/htmlLang 必须与语言代码匹配 ---------- */
console.log('\n语言元数据自洽性')
console.log('─'.repeat(58))
for (const code of active) {
  const m = trees[code]
  const ok = m.code === code && typeof m.label === 'string' && typeof m.short === 'string' && m.htmlLang === code
  if (!ok) problems++
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${code}: code=${m.code} label=${m.label} short=${m.short} htmlLang=${m.htmlLang}`)
}

/* 注册表自身的自洽：prefix 必须唯一，且默认语言必须无前缀 */
const prefixes = locales.map((l) => l.prefix)
const dupPrefix = prefixes.find((p, i) => prefixes.indexOf(p) !== i)
const defOk = locales.find((l) => l.code === refCode)?.prefix === ''
if (dupPrefix !== undefined || !defOk) problems++
console.log(
  `${dupPrefix === undefined && defOk ? 'OK  ' : 'FAIL'}  注册表：prefix 唯一${dupPrefix !== undefined ? `（重复：${dupPrefix}）` : ''} / 默认语言无前缀${defOk ? '' : '（异常）'}`
)

/* ---------- 4) 中文残留：启用语言出现中文即为翻译遗漏 ---------- */
console.log('\n残留中文字符检查')
console.log('─'.repeat(58))
let cjkHits = 0
for (const code of active) {
  const hits = cjkLeaves(trees[code])
  if (hits.length) {
    cjkHits += hits.length
    for (const [p, v] of hits.slice(0, 12)) console.log(`  ${code}  ${p}  →  ${v.slice(0, 48)}`)
  }
}
if (cjkHits === 0) console.log(`OK    已启用语言未发现中文字符（已检查 ${active.join(', ')}）`)
else problems++

console.log(`\n${problems === 0 ? '全部通过' : `发现 ${problems} 项问题`}`)
process.exit(problems === 0 ? 0 : 1)
