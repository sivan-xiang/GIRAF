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

/**
 * 详情页基址。菜单每一项都指向自己的页面：
 *   /services/ocean、/services/rail …… 共 10 页
 *   /solutions/general、/solutions/frozen …… 共 4 页
 * 与参考站（giraf-logistics.com 的 Service*.html / SolutionDetail.html）结构对应。
 */
export const serviceBase = pagePaths.services
export const solutionBase = pagePaths.solutions

/** 把「主语言路径」加语言前缀（英语为根路径时原样返回） */
const withLang = (base, lang) =>
  lang === DEFAULT_LANG || !base ? base : `${prefixOf(lang)}${base}`

/** 取某页面在指定语言下的路径（英语为根路径，其余语言加前缀） */
export function pathFor(page, lang = DEFAULT_LANG) {
  return withLang(pagePaths[page] ?? '/', lang)
}

/** 服务详情路径 */
export function pathForService(slug, lang = DEFAULT_LANG) {
  return withLang(`${serviceBase}/${slug}`, lang)
}

/** 方案详情路径 */
export function pathForSolution(slug, lang = DEFAULT_LANG) {
  return withLang(`${solutionBase}/${slug}`, lang)
}

/**
 * 统一入口：静态页传 page 名，详情页传 `service:<slug>` / `solution:<slug>`。
 * 组件里只依赖这一个函数，新增页面类型时不必改所有调用点。
 */
export function pathForAny(target, lang = DEFAULT_LANG) {
  const [kind, slug] = String(target).split(':')
  if (kind === 'service') return pathForService(slug, lang)
  if (kind === 'solution') return pathForSolution(slug, lang)
  return pathFor(kind, lang)
}

/** 当前页面是否属于某个菜单分组（用于导航高亮） */
export function belongsTo(page, group) {
  if (group === 'services') return page === 'services' || page === 'service'
  if (group === 'solutions') return page === 'solutions' || page === 'solution'
  return page === group
}
