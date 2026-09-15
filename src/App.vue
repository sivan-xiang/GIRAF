<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import GrainOverlay from '@/components/effects/GrainOverlay.vue'
import ScrollProgress from '@/components/effects/ScrollProgress.vue'
import { company } from '@/data/company'
import { locales, ogLocaleOf, htmlLangOf, DEFAULT_LANG } from '@/i18n/locales'
import { pathFor } from '@/router/pages'

const route = useRoute()
const { t, tm, locale } = useI18n({ useScope: 'global' })

/**
 * 取未经消息编译的原始文案。
 * meta 文案里含 `|`（标题分隔符）与 `@`（邮箱），若走 t() 会被 vue-i18n 分别
 * 当成复数分隔符和链接语法，导致标题被截断或抛 SyntaxError，因此这里用 tm()。
 */
const raw = (key) => {
  const v = tm(key)
  return typeof v === 'string' ? v : ''
}

/**
 * 标题、描述与规范链接随页面与语言同步。
 *
 * 时机选择：不能依赖 watch(route.fullPath)。
 * 首屏渲染时 currentRoute 仍是 START_LOCATION——它的 path 已经等于 '/'，
 * 但 meta 是空对象。进入根路径首页时 fullPath 自始至终都是 '/'，
 * 路由解析完成后 watcher 不会再次触发，整页会被兜底语言渲染
 * （这就是根路径曾整页显示德语的根因）。
 *
 * 改为「路由解析完成」这一语义时机：afterEach 覆盖首次与后续所有导航，
 * onMounted 作为兜底以防 afterEach 注册晚于首次导航的解析。
 */
const metaKey = computed(() => `${route.meta.lang || ''}|${route.meta.page || ''}`)

const applyMeta = () => {
  const lang = route.meta.lang
  const page = route.meta.page
  if (!lang || !page) return // START_LOCATION：等待路由解析完成

  locale.value = lang
  // 与 router.afterEach 双写：确保 <html lang> 与当前路由语言一致，
  // 泰语等语言的排版特化（:lang(th) 字体/行高）依赖这个属性
  document.documentElement.setAttribute('lang', htmlLangOf(lang))
  document.documentElement.setAttribute('dir', 'ltr')

  const title = raw(`meta.${page}.title`)
  const desc = raw(`meta.${page}.desc`)

  document.title = title
  setMeta('name', 'description', desc)
  setMeta('property', 'og:title', title)
  setMeta('property', 'og:description', desc)
  setMeta('property', 'og:locale', ogLocaleOf(lang))
  setAlternateOgLocales(lang)
  setMeta('property', 'og:url', window.location.href)
  setCanonical(page, lang)
}

/** og:locale:alternate —— 同一页面存在的其他语言版本，供社交平台做语言匹配 */
const setAlternateOgLocales = (lang) => {
  document.head
    .querySelectorAll('meta[property="og:locale:alternate"]')
    .forEach((el) => el.remove())
  for (const loc of locales) {
    if (loc.code === lang) continue
    const el = document.createElement('meta')
    el.setAttribute('property', 'og:locale:alternate')
    el.setAttribute('content', loc.ogLocale)
    document.head.appendChild(el)
  }
}

const setMeta = (attr, key, value) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** 规范链接 + 全语言 hreflang + x-default，便于搜索引擎区分各语言版本 */
const setCanonical = (page, lang) => {
  const base = window.location.origin + (import.meta.env.BASE_URL || '/')
  const abs = (code) => new URL(pathFor(page, code).replace(/^\//, ''), base).href

  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = abs(lang)

  // 每门语言一条 hreflang；x-default 指向主语言（英语）版本
  const alternates = [...locales.map((l) => [l.htmlLang, l.code]), ['x-default', DEFAULT_LANG]]
  for (const [tag, code] of alternates) {
    const sel = `link[rel="alternate"][hreflang="${tag}"]`
    let alt = document.head.querySelector(sel)
    if (!alt) {
      alt = document.createElement('link')
      alt.rel = 'alternate'
      alt.hreflang = tag
      document.head.appendChild(alt)
    }
    alt.href = abs(code)
  }
}

/* 主触发：语言 + 页面组合键变化（首屏由 immediate 覆盖） */
watch(metaKey, applyMeta, { immediate: true })

/* 兜底触发：每次导航解析完成后强制同步一次 */
const router = useRouter()
router.afterEach(() => applyMeta())

/* 末级兜底：组件挂载后若路由已就绪，确保 meta 一定被写入 */
onMounted(applyMeta)
</script>

<template>
  <a class="skip" href="#main">{{ t('common.skipToContent') }}</a>
  <ScrollProgress />
  <GrainOverlay :opacity="0.04" />
  <SiteHeader />
  <main id="main">
    <RouterView />
  </main>
  <SiteFooter />
  <div class="sr-only" aria-hidden="true">{{ company.legalName }}</div>
</template>

<style scoped>
.skip {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.7rem 1.1rem;
  background: var(--coral);
  color: #fff;
  font-weight: 600;
  border-radius: 0 0 10px 0;
}
.skip:focus {
  left: 0;
}
</style>
