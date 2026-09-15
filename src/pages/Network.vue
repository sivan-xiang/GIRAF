<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { pick } from '@/i18n/locales'
import {
  germanOffices,
  chinaOffices,
  worldOffices,
  cityLabel,
  countryLabel
} from '@/data/network'
import { entities, entityCity } from '@/data/entities'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import RevealText from '@/components/effects/RevealText.vue'
import MarqueeStrip from '@/components/effects/MarqueeStrip.vue'
import EntityGrid from '@/components/EntityGrid.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, lang, link } = useSite()

const coverage = computed(() => {
  const list = tm('network.coverage.items')
  return Array.isArray(list) ? list : []
})

/**
 * 跑马灯：自有网点（德国 · 中国 · 各海外主体）+ 合作网点
 * 汉堡总部已由 germanOffices 的 primary 项承载，此处跳过主体中的同名项，避免重复。
 * 中国网点与主体城市可能重合，故用 Set 去重。
 */
const allCities = computed(() => {
  const own = [
    ...germanOffices.map((o) =>
      o.primary ? `${cityLabel(o, lang.value)} · HQ` : cityLabel(o, lang.value)
    ),
    ...chinaOffices.map((o) => cityLabel(o, lang.value)),
    ...entities.filter((e) => !e.hq).map((e) => entityCity(e, lang.value))
  ]
  const partners = worldOffices.map((o) => cityLabel(o, lang.value))
  return [...new Set([...own, ...partners])]
})

/** 国家/地区与网点职责文案均为多语言映射，缺失语言自动回退英语 */
const country = (o) => countryLabel(o, lang.value)
const city = (o) => cityLabel(o, lang.value)
const role = (o) => pick(o.role, lang.value)
const note = (o) => pick(o.note, lang.value)
</script>

<template>
  <div>
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#3f6fb5', '#fa5959']"
        :speed="0.7"
        :amplitude="0.6"
      />
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('network.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('network.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('network.hero.title')" :step="42" /></h1>
        <p>{{ t('network.hero.text') }}</p>
      </div>
    </section>

    <!-- 覆盖带 -->
    <section class="section section--dark section--tight">
      <div class="wrap">
        <span class="eyebrow">{{ t('network.coverage.eyebrow') }}</span>
      </div>
      <MarqueeStrip :items="allCities" :speed="70" :muted="true" />
    </section>

    <!-- 德国 -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('network.germany.eyebrow') }}</span>
          <h2>{{ t('network.germany.title') }}</h2>
        </div>

        <div class="grid grid--2">
          <article
            v-for="(o, i) in germanOffices"
            :key="o.key"
            class="office"
            :class="{ 'office--primary': o.primary }"
            v-reveal="i * 70"
          >
            <div class="office__top">
              <div class="icon-box" :class="o.primary ? 'icon-box--coral' : ''">
                <AppIcon name="pin" />
              </div>
              <span v-if="o.primary" class="chip chip--coral">{{ t('common.hq') }}</span>
            </div>
            <h3 class="office__city">{{ city(o) }}</h3>
            <p class="office__country">{{ country(o) }}</p>
            <p class="office__role">{{ role(o) }}</p>
            <p class="office__note">{{ note(o) }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- 中国 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('network.china.eyebrow') }}</span>
          <h2>{{ t('network.china.title') }}</h2>
          <p class="lead">{{ t('network.china.text') }}</p>
        </div>
        <div class="citygrid" v-reveal>
          <span
            v-for="o in chinaOffices"
            :key="o.city.en"
            class="citygrid__cell"
            :class="{ 'citygrid__cell--hq': o.hq }"
          >
            {{ city(o) }}
          </span>
        </div>
      </div>
    </section>

    <!-- 全球法定主体：分公司 / 子公司（名称与地址为登记原文，不翻译） -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('offices.eyebrow') }}</span>
          <h2>{{ t('offices.title') }}</h2>
          <p class="lead">{{ t('offices.text') }}</p>
        </div>
        <EntityGrid />
      </div>
    </section>

    <!-- 世界 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('network.world.eyebrow') }}</span>
          <h2>{{ t('network.world.title') }}</h2>
        </div>
        <div class="citygrid" v-reveal>
          <span v-for="o in worldOffices" :key="o.city.en" class="citygrid__cell">
            {{ city(o) }}<br /><small>{{ country(o) }}</small>
          </span>
        </div>

        <!-- 主体归属说明：避免客户把集团网点当成合同方 -->
        <div class="callout netnote" v-reveal>
          <span class="callout__t">{{ t('network.note.title') }}</span>
          {{ t('network.note.text') }}
        </div>

        <div class="grid grid--3 netcoverage">
          <div v-for="(c, i) in coverage" :key="i" class="card" v-reveal="i * 70">
            <span class="numitem__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="card__title">{{ c.k }}</h3>
            <p class="card__text">{{ c.v }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
.office {
  padding: clamp(1.6rem, 1.3rem + 1.2vw, 2.1rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: var(--sh-1);
  transition: transform 0.24s var(--ease), box-shadow 0.24s var(--ease);
}
.office:hover {
  transform: translateY(-4px);
  box-shadow: var(--sh-3);
}
.office--primary {
  border-color: #f7c9c9;
  background: linear-gradient(150deg, #fffafa, #fff);
}
.office__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.office__city {
  margin-bottom: 0.15rem;
  font-size: 1.35rem;
}
.office__country {
  margin-bottom: 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.office__role {
  margin-bottom: 0.35rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--navy-700);
}
.office__note {
  margin: 0;
  font-size: 0.9rem;
  color: var(--body);
}

.citygrid__cell small {
  font-size: 0.78rem;
  font-weight: 400;
  color: var(--muted);
}
.citygrid__cell:hover small {
  color: rgba(255, 255, 255, 0.75);
}

.netnote {
  margin-top: 2.4rem;
}

.netcoverage {
  margin-top: 2.4rem;
}
</style>
