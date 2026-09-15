<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, cityName, countryName } from '@/data/company'
import { locales } from '@/i18n/locales'
import AppIcon from './AppIcon.vue'

const { t, route, lang, link, linkIn, page } = useSite()

/** 切到指定语言时，保持当前页面不变 */
const langLink = (code) => linkIn(page.value, code)

const NAV = [
  { page: 'services', key: 'nav.services' },
  { page: 'solutions', key: 'nav.solutions' },
  { page: 'about', key: 'nav.about' },
  { page: 'network', key: 'nav.network' },
  { page: 'contact', key: 'nav.contact' }
]

const open = ref(false)
/** 滚动后收起顶部联络条并给导航栏加投影——欧美 B2B 站的标准行为 */
const scrolled = ref(false)

const lockScroll = (on) => {
  document.body.style.overflow = on ? 'hidden' : ''
}

let ticking = false
const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 8
    ticking = false
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

watch(open, (v) => lockScroll(v))
watch(() => route.fullPath, () => (open.value = false))
onBeforeUnmount(() => {
  lockScroll(false)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <!-- 顶部联络条：只放德国主体的可核实信息 -->
    <div class="topbar">
      <div class="wrap topbar__inner">
        <div class="topbar__left">
          <a
            class="topbar__item"
            :href="`tel:${company.phoneHref}`"
            :aria-label="`${t('common.phone')}: ${company.phone}`"
          >
            <AppIcon name="phone" :size="15" />
            <span>{{ company.phone }}</span>
          </a>
          <a
            class="topbar__item"
            :href="`mailto:${company.email}`"
            :aria-label="`${t('common.email')}: ${company.email}`"
          >
            <AppIcon name="mail" :size="15" />
            <span>{{ company.email }}</span>
          </a>
        </div>

        <div class="topbar__right">
          <span class="topbar__place">
            <AppIcon name="pin" :size="14" />
            <span>{{ company.address.zip }} {{ cityName(lang) }}, {{ countryName(lang) }}</span>
          </span>
          <div class="lang" role="group" :aria-label="t('common.language')">
            <RouterLink
              v-for="opt in locales"
              :key="opt.code"
              class="lang__btn"
              :class="{ 'is-active': lang === opt.code }"
              :to="langLink(opt.code)"
              :aria-current="lang === opt.code ? 'true' : undefined"
              :title="opt.label"
            >
              {{ opt.short }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- 主导航 -->
    <div class="navbar">
      <div class="wrap navbar__inner">
        <RouterLink class="brand" :to="link('home')" :aria-label="company.brand">
          <img class="brand__logo" src="/logo.png" :alt="company.legalName" width="151" height="62" />
        </RouterLink>

        <nav class="mainnav" aria-label="Main">
          <RouterLink
            v-for="item in NAV"
            :key="item.page"
            class="mainnav__link"
            :class="{ 'is-active': route.meta.page === item.page }"
            :to="link(item.page)"
            :aria-current="route.meta.page === item.page ? 'page' : undefined"
          >
            {{ t(item.key) }}
          </RouterLink>
        </nav>

        <div class="navbar__actions">
          <RouterLink class="btn btn--primary btn--sm navbar__cta" :to="link('contact')">
            {{ t('common.ctaQuote') }}
          </RouterLink>
          <button
            class="burger"
            type="button"
            :aria-expanded="open"
            aria-controls="mobile-nav"
            :aria-label="open ? t('common.close') : t('common.menu')"
            @click="open = !open"
          >
            <AppIcon :name="open ? 'close' : 'menu'" :size="22" />
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端抽屉 -->
    <Transition name="drawer">
      <div v-if="open" class="drawer">
        <div id="mobile-nav" class="drawer__panel">
          <RouterLink
            v-for="item in NAV"
            :key="item.page"
            class="drawer__link"
            :class="{ 'is-active': route.meta.page === item.page }"
            :to="link(item.page)"
          >
            <span>{{ t(item.key) }}</span>
            <AppIcon name="chevron" :size="15" />
          </RouterLink>

          <RouterLink class="btn btn--primary drawer__cta" :to="link('contact')">
            {{ t('common.ctaQuote') }}
          </RouterLink>

          <div class="drawer__contact">
            <a :href="`tel:${company.phoneHref}`"
              ><AppIcon name="phone" :size="15" /> {{ company.phone }}</a
            >
            <a :href="`mailto:${company.email}`"
              ><AppIcon name="mail" :size="15" /> {{ company.email }}</a
            >
            <span class="drawer__addr">
              {{ company.address.street }}, {{ company.address.zip }} {{ cityName(lang) }}
            </span>
          </div>

          <div class="drawer__lang">
            <RouterLink
              v-for="opt in locales"
              :key="opt.code"
              class="drawer__langBtn"
              :class="{ 'is-active': lang === opt.code }"
              :to="langLink(opt.code)"
            >
              {{ opt.label }}
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
}

/* ---------- 顶部联络条 ---------- */
.topbar {
  max-height: 48px;
  overflow: hidden;
  background: var(--navy-900);
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.82rem;
  transition: max-height 0.34s var(--ease), opacity 0.28s var(--ease);
}
.site-header.is-scrolled .topbar {
  max-height: 0;
  opacity: 0;
}
.topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 40px;
  padding-block: 0.3rem;
}
.topbar__left,
.topbar__right {
  display: flex;
  align-items: center;
  gap: 1.35rem;
  flex-wrap: wrap;
}
.topbar__item,
.topbar__place {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  color: rgba(255, 255, 255, 0.78);
  white-space: nowrap;
}
.topbar__item:hover {
  color: #fff;
}
.topbar__place {
  color: rgba(255, 255, 255, 0.6);
}

.lang {
  display: inline-flex;
  padding: 2px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
}
.lang__btn {
  padding: 0.16rem 0.62rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.7);
}
.lang__btn:hover {
  color: #fff;
}
.lang__btn.is-active {
  background: var(--coral);
  color: #fff;
}

/* ---------- 主导航 ---------- */
.navbar {
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--line);
  transition: box-shadow 0.3s var(--ease);
}
.site-header.is-scrolled .navbar {
  box-shadow: 0 10px 28px -18px rgba(12, 20, 36, 0.32);
}
.navbar__inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  min-height: var(--header-h);
  transition: min-height 0.3s var(--ease);
}
.site-header.is-scrolled .navbar__inner {
  min-height: 66px;
}
.brand {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
}
.brand__logo {
  height: 46px;
  width: auto;
  transition: height 0.3s var(--ease);
}
.site-header.is-scrolled .brand__logo {
  height: 40px;
}

.mainnav {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: auto;
}
.mainnav__link {
  position: relative;
  padding: 0.5rem 0.72rem;
  border-radius: 8px;
  font-size: 0.93rem;
  font-weight: 600;
  color: var(--navy-700);
}
.mainnav__link:hover {
  color: var(--coral);
  background: var(--bg-soft);
}
.mainnav__link.is-active {
  color: var(--navy);
}
.mainnav__link.is-active::after {
  content: '';
  position: absolute;
  left: 0.72rem;
  right: 0.72rem;
  bottom: 0.18rem;
  height: 2px;
  border-radius: 2px;
  background: var(--coral);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.navbar__cta {
  white-space: nowrap;
}

.burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #fff;
  color: var(--navy);
}

/* ---------- 移动端抽屉 ---------- */
.drawer {
  position: fixed;
  inset: 0;
  background: rgba(16, 26, 46, 0.42);
  z-index: 70;
}
.drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(88vw, 380px);
  padding: 1.4rem 1.3rem 2rem;
  background: #fff;
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: -12px 0 40px rgba(16, 26, 46, 0.22);
}
.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.92rem 0.2rem;
  border-bottom: 1px solid var(--line-soft);
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--navy-700);
}
.drawer__link.is-active {
  color: var(--coral);
}
.drawer__cta {
  width: 100%;
  margin-top: 1.4rem;
}
.drawer__contact {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.6rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line-soft);
  font-size: 0.88rem;
}
.drawer__contact a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--navy);
  overflow-wrap: anywhere;
}
.drawer__addr {
  color: var(--muted);
}
.drawer__lang {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 1.3rem;
}
.drawer__langBtn {
  padding: 0.55rem 0.4rem;
  border: 1px solid var(--line);
  border-radius: 9px;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--navy);
  overflow-wrap: anywhere;
}
.drawer__langBtn.is-active {
  border-color: var(--coral);
  background: var(--coral-soft);
  color: var(--coral-600);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.24s var(--ease);
}
.drawer-enter-active .drawer__panel,
.drawer-leave-active .drawer__panel {
  transition: transform 0.28s var(--ease);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer__panel,
.drawer-leave-to .drawer__panel {
  transform: translateX(100%);
}

/* ---------- 响应式 ---------- */
@media (max-width: 1060px) {
  .mainnav {
    display: none;
  }
  .navbar__actions {
    margin-left: auto;
  }
  .burger {
    display: inline-flex;
  }
}
@media (max-width: 760px) {
  .topbar__place {
    display: none;
  }
  .navbar__cta {
    display: none;
  }
  .topbar__inner {
    gap: 0.6rem;
  }
  .topbar__left {
    gap: 1rem;
  }
}
/* 四语言（EN/DE/ES/TH）后顶栏更宽：窄屏收为「图标 + 紧凑语言胶囊」，
   文案仍可通过 aria-label 与移动端抽屉完整获取，避免出现横向溢出 */
@media (max-width: 640px) {
  .topbar__left {
    gap: 0.85rem;
  }
  .topbar__left .topbar__item span {
    display: none;
  }
  .lang__btn {
    padding: 0.14rem 0.46rem;
    font-size: 0.7rem;
    letter-spacing: 0.01em;
  }
}
</style>
