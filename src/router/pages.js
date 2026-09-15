import { DEFAULT_LANG, prefixOf } from '@/i18n/locales'

/**
 * 路由表：每个页面在「主语言（英语）」下拥有干净的本地化 URL（如 /services），
 * 其余语言自动加前缀（如 /de/services）。英语为根路径，利于 SEO 与品牌记忆。
 */
export const pagePaths = {
  home: '/',
  services: '/services',
  solutions: '/solutions',
  about: '/company',
  network: '/network',
  contact: '/contact',
  imprint: '/imprint',
  privacy: '/privacy'
}

export const pageNames = Object.keys(pagePaths)

/** 取某页面在指定语言下的路径（英语为根路径，其余语言加前缀） */
export function pathFor(page, lang = DEFAULT_LANG) {
  const base = pagePaths[page] ?? '/'
  if (lang === DEFAULT_LANG || !base) return base
  return `${prefixOf(lang)}${base}`
}
