<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import RevealText from '@/components/effects/RevealText.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, link } = useSite()

const ICONS = ['layers', 'handshake', 'scale', 'cart']

const items = computed(() => {
  const list = tm('solutions.items')
  return Array.isArray(list) ? list : []
})
const approach = computed(() => {
  const list = tm('solutions.approach.items')
  return Array.isArray(list) ? list : []
})

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div>
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#f0b45a', '#3f6fb5']"
        :speed="0.75"
        :amplitude="0.6"
      />
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('solutions.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('solutions.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('solutions.hero.title')" :step="46" /></h1>
        <p>{{ t('solutions.hero.text') }}</p>
      </div>
    </section>

    <!-- 四类方案 -->
    <section class="section">
      <div class="wrap">
        <div class="grid solgrid">
          <SpotlightCard
            v-for="(s, i) in items"
            :key="i"
            v-reveal="(i % 2) * 70"
            :color="i % 2 ? 'rgba(63,111,181,0.16)' : 'rgba(250,89,89,0.16)'"
          >
            <div class="sol__top">
              <div class="icon-box" :class="i % 2 ? '' : 'icon-box--coral'">
                <AppIcon :name="ICONS[i % ICONS.length]" />
              </div>
              <span class="sol__idx">{{ pad(i) }}</span>
            </div>
            <h2 class="sol__title">{{ s.title }}</h2>
            <p class="sol__text">{{ s.text }}</p>
            <ul class="checklist">
              <li v-for="(p, j) in s.points" :key="j">
                <AppIcon name="check" :size="18" />
                <span>{{ p }}</span>
              </li>
            </ul>
          </SpotlightCard>
        </div>
      </div>
    </section>

    <!-- 三个前置问题 -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('solutions.approach.eyebrow') }}</span>
          <h2>{{ t('solutions.approach.title') }}</h2>
        </div>

        <div class="grid grid--3">
          <div v-for="(a, i) in approach" :key="i" class="glass qa" v-reveal="i * 80">
            <span class="qa__n">{{ pad(i) }}</span>
            <h3 class="qa__q">{{ a.q }}</h3>
            <p class="qa__a">{{ a.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* 四类方案固定 2×2 */
.solgrid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 820px) {
  .solgrid {
    grid-template-columns: 1fr;
  }
}

.sol__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.sol__idx {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--line);
  font-variant-numeric: tabular-nums;
}
.sol__title {
  margin-bottom: 0.55rem;
  font-size: 1.24rem;
}
.sol__text {
  margin-bottom: 1.3rem;
  font-size: 0.94rem;
  color: var(--body);
}

.qa {
  display: flex;
  flex-direction: column;
}
.qa__n {
  display: block;
  margin-bottom: 0.9rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--coral-300);
  font-variant-numeric: tabular-nums;
}
.qa__q {
  margin-bottom: 0.55rem;
  color: #fff;
  font-size: 1.08rem;
}
.qa__a {
  margin: 0;
  font-size: 0.92rem;
  color: var(--on-dark);
}
</style>
