import { createRouter, createWebHistory } from 'vue-router'
import { pageNames, pathFor } from './pages'
import { locales, DEFAULT_LANG, htmlLangOf } from '@/i18n/locales'
import { readStoredLang, writeStoredLang } from '@/i18n'

import Home from '@/pages/Home.vue'
import Services from '@/pages/Services.vue'
import Solutions from '@/pages/Solutions.vue'
import About from '@/pages/About.vue'
import Network from '@/pages/Network.vue'
import Contact from '@/pages/Contact.vue'
import Imprint from '@/pages/Imprint.vue'
import Privacy from '@/pages/Privacy.vue'

const components = {
  home: Home,
  services: Services,
  solutions: Solutions,
  about: About,
  network: Network,
  contact: Contact,
  imprint: Imprint,
  privacy: Privacy
}

const routes = []

// 为每一种语言 × 每一个页面生成路由（语言越多，自动越多路由）
for (const page of pageNames) {
  for (const loc of locales) {
    routes.push({
      path: pathFor(page, loc.code),
      name: `${page}-${loc.code}`,
      component: components[page],
      meta: { lang: loc.code, page }
    })
  }
}

// 兜底：未匹配的地址回到首页（主语言）
routes.push({ path: '/:pathMatch(.*)*', redirect: '/' })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 90 }
    if (to.meta.page === from.meta.page && to.meta.lang !== from.meta.lang) return { top: 0 }
    return { top: 0 }
  }
})

/**
 * 仅在「进入根路径首页且用户此前明确选过非默认语言」时做一次语言引导，
 * 其余情况一律以 URL 为准，行为可预测、可扩展（新增语言自动生效）。
 */
router.beforeEach((to) => {
  const stored = readStoredLang()
  if (!stored || stored === DEFAULT_LANG) return true
  if (stored !== DEFAULT_LANG && to.name === `home-${DEFAULT_LANG}`) {
    return { name: `home-${stored}`, replace: true }
  }
  return true
})

router.afterEach((to) => {
  const lang = to.meta.lang || DEFAULT_LANG
  writeStoredLang(lang)
  document.documentElement.setAttribute('lang', htmlLangOf(lang))
})

export default router
