import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pathForAny, belongsTo } from '@/router/pages'
import { DEFAULT_LANG } from '@/i18n'

/**
 * 站点上下文：语言、当前页、本地化链接。
 * 语言始终以 URL 为准（route.meta.lang），不做隐式状态。
 *
 * 刻意不提供 isEn / altLink 这类「二元语言」接口：
 * 本站支持 4 门语言且可持续扩展，任何 if (lang === 'en') 的写法都是遗漏隐患。
 * 需要按语言出文案时，一律走 t()/tm() 消息树或 locales.js 的 pick()。
 */
export function useSite() {
  const route = useRoute()
  const { t, tm } = useI18n({ useScope: 'global' })

  const lang = computed(() => route.meta.lang || DEFAULT_LANG)
  const page = computed(() => route.meta.page || 'home')
  /** 详情页的 slug（服务 / 方案），静态页为 undefined */
  const slug = computed(() => route.meta.slug || '')

  /**
   * 取任意目标的当前语言地址。
   * 静态页传页面名（'contact'），详情页传 'service:ocean' / 'solution:frozen'。
   */
  const link = (target) => pathForAny(target, lang.value)

  /** 取任意目标在指定语言下的地址（语言切换器用） */
  const linkIn = (target, code) => pathForAny(target, code)

  /** 当前页是否属于某个导航分组（用于一级菜单高亮） */
  const isGroup = (group) => belongsTo(page.value, group)

  return { t, tm, route, lang, page, slug, link, linkIn, isGroup }
}
