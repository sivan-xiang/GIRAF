/**
 * i18n 键位一致性校验
 * ------------------------------------------------------------------
 * 四门语言（en / de / es / th）的文案树必须严格同构：键路径、数组长度、
 * 数组内对象的字段名全部一致，否则运行时会静默回退到英语或渲染出空内容。
 *
 * 用法：npm run i18n
 * 退出码：0 = 全部对齐；1 = 存在差异（并逐条列出）
 */
import { pathToFileURL } from 'node:url'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

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

const LANGS = ['en', 'de', 'es', 'th']
const trees = {}

for (const lang of LANGS) {
  const url = pathToFileURL(resolve(root, `src/i18n/${lang}.js`)).href
  const mod = await import(url)
  trees[lang] = mod.default
}

const ref = new Set(leaves(trees.en))
let problems = 0

console.log('i18n 键位一致性校验')
console.log('─'.repeat(58))
console.log(`基准语言：en（${ref.size} 条文案）\n`)

for (const lang of LANGS) {
  const mine = new Set(leaves(trees[lang]))
  const missing = [...ref].filter((k) => !mine.has(k))
  const extra = [...mine].filter((k) => !ref.has(k))
  const total = countLeaves(trees[lang])

  const ok = missing.length === 0 && extra.length === 0
  if (!ok) problems++

  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${lang}  (${total} 条)${ok ? '' : `  — 缺失 ${missing.length} / 多余 ${extra.length}`}`)
  if (missing.length) console.log(`      缺失: ${missing.slice(0, 25).join(', ')}${missing.length > 25 ? ` … 共 ${missing.length} 条` : ''}`)
  if (extra.length) console.log(`      多余: ${extra.slice(0, 25).join(', ')}${extra.length > 25 ? ` … 共 ${extra.length} 条` : ''}`)
}

/* 顺带检查元数据自洽：顶层 code/label/short/htmlLang 必须与语言代码匹配 */
console.log('\n语言元数据自洽性')
console.log('─'.repeat(58))
for (const lang of LANGS) {
  const m = trees[lang]
  const ok = m.code === lang && typeof m.label === 'string' && typeof m.short === 'string' && m.htmlLang === lang
  if (!ok) problems++
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${lang}: code=${m.code} label=${m.label} short=${m.short} htmlLang=${m.htmlLang}`)
}

/* 禁止文案里出现中文，避免“翻译遗漏”悄悄上线 */
console.log('\n残留中文字符检查')
console.log('─'.repeat(58))
const CJK = /[\u4e00-\u9fff]/
let cjkHits = 0
for (const lang of LANGS) {
  const walk = (n, p = '') => {
    if (typeof n === 'string') {
      if (CJK.test(n)) {
        cjkHits++
        if (cjkHits <= 12) console.log(`  ${lang}  ${p}  →  ${n.slice(0, 48)}`)
      }
    } else if (Array.isArray(n)) {
      n.forEach((v, i) => walk(v, `${p}[${i}]`))
    } else if (n && typeof n === 'object') {
      for (const k of Object.keys(n)) walk(n[k], p ? `${p}.${k}` : k)
    }
  }
  walk(trees[lang])
}
if (cjkHits === 0) console.log('OK    未发现中文字符')
else problems++

console.log(`\n${problems === 0 ? '全部通过' : `发现 ${problems} 项问题`}`)
process.exit(problems === 0 ? 0 : 1)
