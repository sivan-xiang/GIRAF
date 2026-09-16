/**
 * 语言注册表（单一来源，Single Source of Truth）
 * ------------------------------------------------------------------
 * GIRAF 海外站以【英语为默认语言】。
 *
 * ⚠️ 2026-09-16 起：按需求暂时【仅启用英语】。德语 / 西班牙语 / 泰语的
 *    语言定义与全部译文均未删除，只是不再注册：
 *      · 语言定义 → 见下方 PENDING_LOCALES
 *      · 全部译文 → 见 src/i18n/pending/{de,es,th}.js
 *    启用一门语言只需两步：
 *      1) 把对应项从 PENDING_LOCALES 剪回 locales 数组
 *      2) 把 src/i18n/pending/<code>.js 移回 src/i18n/ 并在 index.js 中 import
 *    路由、<html lang>、hreflang、og:locale 会自动适配，业务代码零改动。
 *
 * prefix 约定：英语（主语言）为空串，URL 落在根路径；其余语言一律使用
 * 两位小写语言代码作为前缀（/de、/es、/th），便于 hreflang 与 SEO 识别。
 */
export const locales = [
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en', prefix: '', ogLocale: 'en_US' }
]

/** 已停用但完整保留的语言定义（启用时剪回 locales 数组即可） */
export const PENDING_LOCALES = [
  { code: 'de', label: 'Deutsch', short: 'DE', htmlLang: 'de', prefix: '/de', ogLocale: 'de_DE' },
  { code: 'es', label: 'Español', short: 'ES', htmlLang: 'es', prefix: '/es', ogLocale: 'es_ES' },
  { code: 'th', label: 'ไทย', short: 'TH', htmlLang: 'th', prefix: '/th', ogLocale: 'th_TH' }
]

/** 主语言（根路径，无前缀） */
export const DEFAULT_LANG = 'en'

/** 受支持的语言代码列表（自动由 locales 推导） */
export const SUPPORTED = locales.map((l) => l.code)

/** localStorage 中记录用户语言偏好的键 */
export const LANG_STORAGE_KEY = 'giraf.lang'

/** 取某语言对应的 URL 前缀（英语为空串） */
export const prefixOf = (code) =>
  (locales.find((l) => l.code === code) || locales[0]).prefix

/** 取某语言的 <html lang> / BCP-47 代码 */
export const htmlLangOf = (code) =>
  (locales.find((l) => l.code === code) || locales[0]).htmlLang

/** 取某语言的 Open Graph 地区代码（og:locale） */
export const ogLocaleOf = (code) =>
  (locales.find((l) => l.code === code) || locales[0]).ogLocale

/**
 * 从多语言字段里取当前语言的值，缺失时回退英语。
 * 用于「公司地址 / 网点文案」这类不属于 vue-i18n 消息树的结构化数据：
 *   pick({ en: 'Germany', de: 'Deutschland', es: 'Alemania' }, 'es') // → 'Alemania'
 */
export const pick = (map, lang = DEFAULT_LANG) => {
  if (!map) return ''
  if (typeof map === 'string') return map
  return map[lang] ?? map[DEFAULT_LANG] ?? ''
}
