import { createI18n } from 'vue-i18n'
import { DEFAULT_LANG, SUPPORTED, LANG_STORAGE_KEY } from './locales'
import en from './en'
import de from './de'
import es from './es'
import th from './th'

export { DEFAULT_LANG, SUPPORTED, LANG_STORAGE_KEY }
export const messages = { en, de, es, th }

/**
 * 语言唯一来源：URL（route.meta.lang）。
 * 英语为默认语言（根路径，无前缀），其余语言位于各自前缀下（/de、/es、/th）。
 * 新增语言只需扩展 locales.js 并在此 import，其余环节自动生效。
 */
export function readStoredLang() {
  try {
    const v = localStorage.getItem(LANG_STORAGE_KEY)
    return SUPPORTED.includes(v) ? v : null
  } catch {
    return null
  }
}

export function writeStoredLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang)
  } catch {
    /* localStorage 不可用时静默降级 */
  }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LANG,
  fallbackLocale: 'en',
  messages,
  // 文案中含 ® / „ “ / 「」 等字符与 HTML 实体字样，禁用 HTML 警告噪音
  warnHtmlMessage: false
})

export default i18n
