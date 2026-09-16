<script setup>
import { ref, computed, watch, onBeforeUnmount, onMounted } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, cityName } from '@/data/company'
import { services } from '@/data/services'
import { solutions } from '@/data/solutions'
import AppIcon from './AppIcon.vue'

const { t, route, lang, link, isGroup } = useSite()

/**
 * 一级菜单。带 children 的项既可以直接进入概览页（点击文字），
 * 也可以展开子菜单进入各自独立的详情页（点击箭头 / 悬停）。
 * 服务与方案的名称取自内容数据源（英语为主要语言），
 * 界面标签（导航名、按钮）走 i18n。
 */
const NAV = computed(() => [
  {
    key: 'nav.services',
    page: 'services',
    children: services.map((s) => ({
      target: `service:${s.slug}`,
      label: s.name,
      note: s.brand
    }))
  },
  {
    key: 'nav.solutions',
    page: 'solutions',
    children: solutions.map((s) => ({
      target: `solution:${s.slug}`,
      label: s.name
    }))
  },
  { key: 'nav.about', page: 'about' },
  { key: 'nav.network', page: 'network' },
  { key: 'nav.contact', page: 'contact' }
])

const open = ref(false)
/** 桌面端展开的分组（同时只允许一个） */
const menu = ref('')
/** 移动端抽屉中展开的分组 */
const expanded = ref('')
/** 滚动后给导航栏加投影并轻微收缩高度——欧美 B2B 站的标准行为 */
const scrolled = ref(false)

const toggleMenu = (key) => {
  menu.value = menu.value === key ? '' : key
}
const closeMenu = () => {
  menu.value = ''
}

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

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    closeMenu()
    open.value = false
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

watch(open, (v) => lockScroll(v))
watch(
  () => route.fullPath,
  () => {
    open.value = false
    menu.value = ''
    expanded.value = ''
  }
)
onBeforeUnmount(() => {
  lockScroll(false)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled }">
    <!--
      顶部信息条已整体移除：其最后一项内容（注册地）不再展示。
      电话 / 邮箱请见页脚、联系页与 Imprint；站点以英语为默认语言。
      留空的信息条会形成一条无内容的深色横条，故整条删除而非隐藏其中元素。
    -->

    <!-- 主导航 -->
    <div class="navbar">
      <div class="wrap navbar__inner">
        <RouterLink class="brand" :to="link('home')" :aria-label="company.brand">
          <img class="brand__logo" src="/logo-light.png" :alt="company.brand" width="151" height="62" />
        </RouterLink>

        <nav class="mainnav" aria-label="Main">
          <div
            v-for="item in NAV"
            :key="item.page"
            class="mainnav__item"
            :class="{ 'is-open': menu === item.page }"
            @mouseenter="item.children && (menu = item.page)"
            @mouseleave="item.children && closeMenu()"
            @focusin="item.children && (menu = item.page)"
            @focusout="item.children && closeMenu()"
          >
            <RouterLink
              class="mainnav__link"
              :class="{ 'is-active': isGroup(item.page) }"
              :to="link(item.page)"
              :aria-current="isGroup(item.page) ? 'page' : undefined"
            >
              {{ t(item.key) }}
            </RouterLink>

            <button
              v-if="item.children"
              class="mainnav__caret"
              type="button"
              :aria-expanded="menu === item.page"
              :aria-label="`${t(item.key)} — ${t('common.submenu')}`"
              @click="toggleMenu(item.page)"
            >
              <AppIcon name="chevron" :size="13" />
            </button>

            <Transition name="drop">
              <div
                v-if="item.children && menu === item.page"
                class="dropdown"
                :class="{ 'dropdown--wide': item.children.length > 5 }"
              >
                <span class="dropdown__all">
                  <RouterLink :to="link(item.page)">{{ t('common.viewAll') }}</RouterLink>
                </span>
                <div class="dropdown__grid">
                  <RouterLink
                    v-for="(c, i) in item.children"
                    :key="c.target"
                    class="dropdown__link"
                    :class="{ 'is-active': `${route.meta.page}:${route.meta.slug}` === c.target }"
                    :style="{ '--i': i }"
                    :to="link(c.target)"
                  >
                    <span class="dropdown__label">{{ c.label }}</span>
                    <span v-if="c.note" class="dropdown__note">{{ c.note }}</span>
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>
        </nav>

        <div class="navbar__actions">
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
      <div v-if="open" class="drawer" @click.self="open = false">
        <div id="mobile-nav" class="drawer__panel">
          <template v-for="item in NAV" :key="item.page">
            <!-- 无子项：直接一条链接 -->
            <RouterLink
              v-if="!item.children"
              class="drawer__link"
              :class="{ 'is-active': isGroup(item.page) }"
              :to="link(item.page)"
            >
              <span>{{ t(item.key) }}</span>
              <AppIcon name="chevron" :size="15" />
            </RouterLink>

            <!-- 有子项：一级进概览，箭头展开子项 -->
            <div v-else class="drawer__group" :class="{ 'is-open': expanded === item.page }">
              <div class="drawer__row">
                <RouterLink
                  class="drawer__link drawer__link--parent"
                  :class="{ 'is-active': isGroup(item.page) }"
                  :to="link(item.page)"
                >
                  {{ t(item.key) }}
                </RouterLink>
                <button
                  class="drawer__toggle"
                  type="button"
                  :aria-expanded="expanded === item.page"
                  :aria-label="`${t(item.key)} — ${t('common.submenu')}`"
                  @click="expanded = expanded === item.page ? '' : item.page"
                >
                  <AppIcon name="chevron" :size="16" />
                </button>
              </div>

              <div v-show="expanded === item.page" class="drawer__sub">
                <RouterLink
                  v-for="c in item.children"
                  :key="c.target"
                  class="drawer__subLink"
                  :to="link(c.target)"
                >
                  {{ c.label }}
                </RouterLink>
              </div>
            </div>
          </template>

          <!--
            移动端抽屉也刻意不放置「Request a quote」按钮：
            桌面导航栏已按要求移除该按钮，若抽屉里保留，就会形成
            「桌面无入口、移动有入口」的不一致（与语言切换区同一条原则）。
            询价入口保留在正文各处 CTA：首页 hero、各页页尾行动区、服务与方案详情。
          -->
          <!-- 移动端菜单保留联络信息：顶栏已不再承载电话与邮箱 -->
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

/* ---------- 主导航 ---------- */
.navbar {
  background: rgba(8, 14, 27, 0.72);
  backdrop-filter: saturate(160%) blur(14px);
  -webkit-backdrop-filter: saturate(160%) blur(14px);
  border-bottom: 1px solid var(--line);
  transition: background 0.3s var(--ease), box-shadow 0.3s var(--ease);
}
.site-header.is-scrolled .navbar {
  background: rgba(8, 14, 27, 0.92);
  box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.85);
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
.mainnav__item {
  position: relative;
  display: flex;
  align-items: center;
}
.mainnav__link {
  position: relative;
  padding: 0.5rem 0.62rem;
  border-radius: 8px;
  font-size: 0.93rem;
  font-weight: 600;
  color: var(--ink);
  white-space: nowrap;
}
/*
  下划线：同一个元素一条线。当前页常亮，其余链接悬停时由左向右长出。
  原先只给 .is-active 画线，悬停只有变色——顶部导航是用户最先摸到的地方，
  给它一个「有线在长出来」的反馈，比整块底色变化更克制也更清楚。
*/
.mainnav__link::after {
  content: '';
  position: absolute;
  left: 0.62rem;
  right: 0.62rem;
  bottom: 0.18rem;
  height: 2px;
  border-radius: 2px;
  background: var(--coral);
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.28s var(--ease);
}
.mainnav__link:hover {
  color: var(--coral);
  background: var(--bg-soft);
}
.mainnav__link:hover::after,
.mainnav__link.is-active::after {
  transform: scaleX(1);
}
.mainnav__link.is-active {
  color: var(--ink);
}

/* 展开箭头：单独可点（键盘与触屏都能用），不与「进入概览页」的链接冲突 */
.mainnav__caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 26px;
  margin-left: -0.3rem;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  transition: transform 0.24s var(--ease), color 0.2s var(--ease);
}
.mainnav__item:hover .mainnav__caret,
.mainnav__item.is-open .mainnav__caret {
  color: var(--coral);
}
.mainnav__item.is-open .mainnav__caret {
  transform: rotate(180deg);
}

/* ---------- 下拉面板 ---------- */
.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 80;
  width: 288px;
  max-width: calc(100vw - 2rem);
  padding: 0.7rem;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface-solid);
  /* 深色底上要用「更黑」的投影，而不是浅色主题那套淡蓝灰阴影（会在暗底上发灰） */
  box-shadow: 0 30px 70px -28px rgba(0, 0, 0, 0.9), 0 8px 22px -10px rgba(0, 0, 0, 0.55);
}
.dropdown--wide {
  width: 452px;
}
.dropdown__all {
  display: block;
  margin-bottom: 0.55rem;
  padding: 0 0.5rem 0.55rem;
  border-bottom: 1px solid var(--line-soft);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.dropdown__all a {
  color: var(--muted);
}
.dropdown__all a:hover {
  color: var(--coral);
}
.dropdown__grid {
  display: grid;
  gap: 0.1rem;
}
.dropdown--wide .dropdown__grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.dropdown__link {
  display: block;
  padding: 0.44rem 0.5rem;
  border-radius: 8px;
  line-height: 1.35;
}
.dropdown__link:hover {
  background: var(--bg-soft);
}
.dropdown__label {
  display: block;
  font-size: 0.89rem;
  font-weight: 600;
  color: var(--ink);
}
.dropdown__link:hover .dropdown__label,
.dropdown__link.is-active .dropdown__label {
  color: var(--coral);
}
.dropdown__note {
  display: block;
  margin-top: 0.1rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--muted);
}
.dropdown__link.is-active {
  background: var(--coral-soft);
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.16s var(--ease), transform 0.18s var(--ease);
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
/*
  面板内条目错峰入场。服务有 10 条、方案 4 条，整块一起淡入会很平；
  每条推后 var(--i) × 26ms（模板用 :style 把序号写进 --i），才有「列表展开」的观感。
*/
.drop-enter-active .dropdown__grid > * {
  animation: dropItem 0.34s var(--ease) both;
  animation-delay: calc(var(--i, 0) * 26ms);
}
@keyframes dropItem {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .drop-enter-active,
  .drop-leave-active,
  .drop-enter-active .dropdown__grid > * {
    transition: none;
    animation: none;
  }
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.burger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface-solid);
  color: var(--ink);
  transition: border-color 0.2s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease);
}
.burger:hover {
  border-color: rgba(250, 89, 89, 0.5);
  background: var(--coral-soft);
  color: var(--coral);
}

/* ---------- 移动端抽屉 ---------- */
.drawer {
  position: fixed;
  inset: 0;
  z-index: 70;
  /* 深色站上遮罩要真的压得住底下的内容：近乎不透明的黑 + 轻微模糊 */
  background: rgba(4, 8, 16, 0.68);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}
.drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(88vw, 380px);
  padding: 1.4rem 1.3rem 2rem;
  background: var(--surface-solid);
  border-left: 1px solid var(--line);
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: -24px 0 70px -20px rgba(0, 0, 0, 0.85);
}
.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.92rem 0.2rem;
  border-bottom: 1px solid var(--line-soft);
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--ink);
}
.drawer__link.is-active {
  color: var(--coral);
}
.drawer__row {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--line-soft);
}
.drawer__link--parent {
  flex: 1;
  border-bottom: 0;
}
.drawer__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  border: 0;
  border-left: 1px solid var(--line-soft);
  background: transparent;
  color: var(--muted);
  transition: transform 0.24s var(--ease), color 0.2s var(--ease);
}
.drawer__group.is-open .drawer__toggle {
  transform: rotate(180deg);
  color: var(--coral);
}
.drawer__sub {
  display: grid;
  gap: 0.1rem;
  padding: 0.4rem 0 0.7rem 0.2rem;
}
.drawer__subLink {
  padding: 0.42rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--body);
}
.drawer__subLink:hover {
  background: var(--bg-soft);
  color: var(--coral);
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
  color: var(--ink);
  overflow-wrap: anywhere;
}
.drawer__addr {
  color: var(--muted);
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
/* 抽屉内容随后逐条落下：与下拉面板同一套「列表展开」语言 */
.drawer-enter-active .drawer__panel > * {
  animation: drawerItem 0.4s var(--ease) both;
}
.drawer-enter-active .drawer__panel > *:nth-child(1) {
  animation-delay: 60ms;
}
.drawer-enter-active .drawer__panel > *:nth-child(2) {
  animation-delay: 110ms;
}
.drawer-enter-active .drawer__panel > *:nth-child(3) {
  animation-delay: 160ms;
}
.drawer-enter-active .drawer__panel > *:nth-child(4) {
  animation-delay: 210ms;
}
.drawer-enter-active .drawer__panel > *:nth-child(5) {
  animation-delay: 260ms;
}
.drawer-enter-active .drawer__panel > *:nth-child(6) {
  animation-delay: 310ms;
}
@keyframes drawerItem {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .drawer-enter-active,
  .drawer-leave-active,
  .drawer-enter-active .drawer__panel > *,
  .mainnav__link::after {
    transition: none;
    animation: none;
  }
}

/* ---------- 响应式 ---------- */
@media (max-width: 1180px) {
  .mainnav__link {
    padding-inline: 0.5rem;
    font-size: 0.9rem;
  }
}
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
</style>
