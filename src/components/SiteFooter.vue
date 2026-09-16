<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, cityName, countryName, floorName } from '@/data/company'
import AppIcon from './AppIcon.vue'

const { t, tm, lang, link } = useSite()

const year = computed(() => new Date().getFullYear())

const SERVICES = ['ocean', 'air', 'rail', 'inland', 'customs', 'warehouse', 'dg', 'ecommerce', 'finance']
const COMPANY = ['about', 'network', 'solutions', 'contact']

/**
 * 用 tm() 而非 t()：services.items 是「对象数组」消息，
 * t() 无法解析该结构（会返回原始键或空），页脚会退化显示 ocean / air / rail 这类内部 id。
 * tm() 取原始消息树，才是取数组型文案的正确接口（Services/Home 页同此约定）。
 */
const serviceLabel = (id) => {
  const list = tm('services.items')
  const hit = Array.isArray(list) ? list.find((s) => s.id === id) : null
  return hit ? hit.title : id
}
</script>

<template>
  <footer class="footer">
    <div class="wrap footer__top">
      <div class="footer__brandCol">
        <img
          class="footer__logo"
          src="/logo-light.png"
          :alt="company.brand"
          width="151"
          height="62"
        />
        <p class="footer__about">{{ t('footer.about') }}</p>
        <p class="footer__legalNote">{{ t('footer.legalNote') }}</p>
      </div>

      <div class="footer__col">
        <h3 class="footer__h">{{ t('footer.servicesTitle') }}</h3>
        <ul class="footer__list">
          <li v-for="id in SERVICES" :key="id">
            <RouterLink :to="link('services')">{{ serviceLabel(id) }}</RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer__col">
        <h3 class="footer__h">{{ t('footer.companyTitle') }}</h3>
        <ul class="footer__list">
          <li v-for="p in COMPANY" :key="p">
            <RouterLink :to="link(p)">{{ t(`nav.${p}`) }}</RouterLink>
          </li>
        </ul>
      </div>

      <div class="footer__col footer__col--wide">
        <h3 class="footer__h">{{ t('footer.contactTitle') }}</h3>
        <address class="footer__contact">
          <span class="footer__company">{{ company.legalName }}</span>
          <span>
            {{ company.address.street }}<br />
            {{ floorName(lang) }} · {{ company.address.zip }} {{ cityName(lang) }}<br />
            {{ countryName(lang) }}
          </span>
          <a :href="`tel:${company.phoneHref}`">{{ t('common.phone') }}: {{ company.phone }}</a>
          <a :href="`mailto:${company.email}`">{{ t('common.email') }}: {{ company.email }}</a>
          <span class="footer__hours">{{ t('common.officeHoursValue') }}</span>
        </address>
      </div>
    </div>

    <div class="footer__bar">
      <div class="wrap footer__barInner">
        <!--
          底栏只保留版权行。工商登记号（HRB 186908）与 VAT ID（DE323296008）
          按其法定披露义务集中放在 Imprint 页（那里有完整的注册信息表），
          不在每一屏的页脚重复——页脚不是法定披露的载体。
        -->
        <p class="footer__copy">© {{ year }} {{ company.legalName }}. {{ t('footer.rights') }}</p>
        <nav class="footer__legal" :aria-label="t('common.legal')">
          <RouterLink :to="link('imprint')">{{ t('common.imprint') }}</RouterLink>
          <RouterLink :to="link('privacy')">{{ t('common.privacy') }}</RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  isolation: isolate; /* 两层装饰用 z-index:-1：压在底色之上、内容之下 */
  background: var(--navy-900);
  color: rgba(255, 255, 255, 0.72);
  font-size: 0.9rem;
}
/*
  页脚不是「一块纯色底板」，它是全站的收尾：
  顶部一道品牌色细光 + 右上角一片冷光，和首屏的极光、信任带的网格构成首尾呼应。
*/
.footer::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 50%;
  width: min(76%, 960px);
  height: 1px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent, rgba(250, 89, 89, 0.55), transparent);
}
.footer::after {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background: radial-gradient(52% 64% at 86% 0%, rgba(74, 107, 168, 0.2), transparent 72%);
  pointer-events: none;
}
.footer__top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.35fr;
  gap: 2.4rem;
  padding-block: clamp(2.8rem, 2rem + 2.4vw, 4.2rem) clamp(2.2rem, 1.6rem + 1.6vw, 3rem);
}
.footer__logo {
  height: 42px;
  width: auto;
  margin-bottom: 1.1rem;
}
.footer__about {
  margin-bottom: 0.9rem;
  color: rgba(255, 255, 255, 0.66);
  font-size: 0.885rem;
  line-height: 1.7;
}
.footer__legalNote {
  padding-left: 0.85rem;
  border-left: 2px solid var(--coral);
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  line-height: 1.62;
}

.footer__h {
  margin-bottom: 0.95rem;
  color: #fff;
  font-size: 0.83rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.footer__list a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.885rem;
}
.footer__list a:hover {
  color: var(--coral);
}

.footer__contact {
  display: grid;
  gap: 0.5rem;
  font-style: normal;
  line-height: 1.62;
}
.footer__company {
  color: #fff;
  font-weight: 700;
}
.footer__contact a {
  color: rgba(255, 255, 255, 0.86);
  overflow-wrap: anywhere;
}
.footer__contact a:hover {
  color: var(--coral);
}
.footer__hours {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.83rem;
}

.footer__bar {
  border-top: 1px solid rgba(255, 255, 255, 0.11);
}
.footer__barInner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding-block: 1.15rem;
}
.footer__copy {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.52);
}
.footer__legal {
  display: flex;
  gap: 1.2rem;
}
.footer__legal a {
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.72);
}
.footer__legal a:hover {
  color: var(--coral);
}

@media (max-width: 1040px) {
  .footer__top {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .footer__brandCol {
    grid-column: 1 / -1;
  }
}
@media (max-width: 620px) {
  .footer__top {
    grid-template-columns: 1fr;
  }
  .footer__barInner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
  }
}

/*
  链接下划线由左向右长出（悬停）+ 文字轻微右移。
  色变（--coral）本来就有，但在一片 0.7 透明度的白字里不够醒目；
  加一条 1px 的自身色下划线，扫列表时的「指到哪一条」变得很清楚。
*/
.footer__list a,
.footer__legal a {
  position: relative;
  transition: color 0.18s var(--ease), transform 0.18s var(--ease);
}
.footer__list a::after,
.footer__legal a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.26s var(--ease);
}
.footer__list a:hover::after,
.footer__legal a:hover::after {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .footer__list a::after,
  .footer__legal a::after {
    transition: none;
  }
  .footer__list a:hover::after,
  .footer__legal a:hover::after {
    transform: scaleX(1);
  }
}
</style>
