<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { services } from '@/data/services'
import { entities } from '@/data/entities'
import { branches } from '@/data/branches'
import RevealText from '@/components/effects/RevealText.vue'
import CountUp from '@/components/effects/CountUp.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, link } = useSite()

const steps = computed(() => {
  const list = tm('services.process.steps')
  return Array.isArray(list) ? list : []
})

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="services">
    <!--
      深色报头 + 一行规模数据。
      与内页通用的 .page-hero（带 WebGL 极光）不同：这里刻意是静态的、近乎印刷品的版面，
      因为服务索引承载的是「目录」，需要的是可扫描性而不是氛围。
    -->
    <section class="masthead">
      <div class="masthead__glow" aria-hidden="true"></div>
      <div class="wrap masthead__inner">
        <nav class="crumbs rise" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('services.hero.crumb') }}</span>
        </nav>

        <span class="eyebrow rise" :style="{ '--d': '60ms' }">{{ t('services.hero.eyebrow') }}</span>
        <h1 class="masthead__title"><RevealText :text="t('services.hero.title')" :step="48" /></h1>
        <p class="masthead__text rise" :style="{ '--d': '220ms' }">{{ t('services.hero.text') }}</p>

        <dl class="tally rise" :style="{ '--d': '320ms' }">
          <div class="tally__i">
            <dt>{{ t('services.tally.services') }}</dt>
            <dd><CountUp :to="services.length" :duration="900" /></dd>
          </div>
          <div class="tally__i">
            <dt>{{ t('services.tally.entities') }}</dt>
            <dd><CountUp :to="entities.length" :duration="900" :delay="90" /></dd>
          </div>
          <div class="tally__i">
            <dt>{{ t('services.tally.locations') }}</dt>
            <dd><CountUp :to="branches.length" :duration="1100" :delay="180" /></dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- 导语 -->
    <section class="section section--tight">
      <div class="wrap grid--aside">
        <div v-reveal>
          <h2>{{ t('services.intro.title') }}</h2>
        </div>
        <p class="lead" v-reveal="90">{{ t('services.intro.text') }}</p>
      </div>
    </section>

    <!--
      服务目录：行式列表，每行指向自己的页面。
      刻意不用卡片网格——10 张卡片会把「选择」变成视觉噪音，
      而目录行能在一屏内被扫完，并且天然容纳每项不同的副标题。
    -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="dirhead">
          <span class="sheet-label">{{ t('services.directory.label') }}</span>
          <span class="dirhead__note">{{ t('services.directory.note') }}</span>
        </div>

        <ol class="directory">
          <li v-for="(s, i) in services" :key="s.id" class="directory__row" v-reveal="i * 30">
            <RouterLink class="entry" :class="`entry--${s.accent}`" :to="link(`service:${s.slug}`)">
              <span class="entry__num">{{ pad(i) }}</span>

              <span class="entry__body">
                <span class="entry__brand">{{ s.brand }}</span>
                <span class="entry__name">{{ s.name }}</span>
                <span class="entry__tag">{{ s.tagline }}</span>
              </span>

              <span class="entry__meta">
                <span class="entry__count">{{ s.features?.length || s.extra?.groups?.length || 0 }}</span>
                <span class="entry__countLabel">{{ t('services.directory.items') }}</span>
              </span>

              <span class="entry__go" aria-hidden="true">
                <AppIcon name="arrow" :size="18" />
              </span>
            </RouterLink>
          </li>
        </ol>
      </div>
    </section>

    <!-- 流程 -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('services.process.eyebrow') }}</span>
          <h2>{{ t('services.process.title') }}</h2>
        </div>
        <ol class="flow">
          <li v-for="(st, i) in steps" :key="i" class="flow__item" v-reveal="i * 80">
            <span class="flow__n">{{ st.n }}</span>
            <h3 class="flow__t">{{ st.title }}</h3>
            <p class="flow__d">{{ st.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* ---------- 报头 ---------- */
.masthead {
  position: relative;
  padding: clamp(2.6rem, 1.8rem + 3.6vw, 4.6rem) 0 clamp(2.4rem, 1.8rem + 3vw, 3.8rem);
  background: var(--navy-950);
  color: #fff;
  overflow: hidden;
}
.masthead__glow {
  position: absolute;
  top: -60%;
  left: -8%;
  width: 46rem;
  height: 46rem;
  background: radial-gradient(circle, rgba(250, 89, 89, 0.2), transparent 62%);
  pointer-events: none;
}
.masthead__inner {
  position: relative;
  z-index: 1;
}
.masthead__title {
  max-width: 26ch;
  margin-bottom: 0.8rem;
  color: #fff;
  font-size: var(--fs-h1);
}
.masthead__text {
  max-width: 60ch;
  color: var(--on-dark);
  font-size: var(--fs-lead);
}

.tally {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.6rem, 1rem + 2.4vw, 3.4rem);
  margin: clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem) 0 0;
  padding-top: 1.4rem;
  border-top: 1px solid var(--hair-dark);
}
.tally__i dt {
  margin-bottom: 0.2rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
}
.tally__i dd {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

/* ---------- 目录 ---------- */
.sheet-label {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.dirhead {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.8rem;
  margin-bottom: 0.4rem;
  padding-bottom: 0.9rem;
  border-bottom: 2px solid var(--ink);
}
.dirhead__note {
  font-size: 0.85rem;
  color: var(--muted);
}

.directory {
  margin: 0;
  padding: 0;
  list-style: none;
}
.directory__row {
  border-bottom: 1px solid var(--line);
}

.entry {
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr) auto 2.4rem;
  align-items: center;
  gap: clamp(1rem, 0.6rem + 1.4vw, 2rem);
  padding: 1.15rem 0.6rem 1.15rem 0;
  transition: background 0.2s var(--ease), padding-left 0.22s var(--ease);
}
.entry:hover {
  padding-left: 0.6rem;
  background: var(--bg-soft);
}
.entry__num {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--line);
  font-variant-numeric: tabular-nums;
  transition: color 0.22s var(--ease);
}
.entry:hover .entry__num {
  color: var(--coral);
}
.entry__body {
  display: grid;
  gap: 0.16rem;
  min-width: 0;
}
.entry__brand {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--coral);
}
/*
  强调色在深色底上必须整体提亮。
  #b8791a（深琥珀）与 #3f6fb5（中蓝）是浅底时代的取值，在 #0e1728 上对比度不足 3:1，
  0.7rem 的大写标签基本读不出来；改用深色主题对应的色阶，同时与方案页四货种配色对齐。
*/
.entry--sand .entry__brand {
  color: var(--sand);
}
.entry--steel .entry__brand {
  color: var(--navy-300);
}
.entry__name {
  font-size: clamp(1.02rem, 0.96rem + 0.28vw, 1.18rem);
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.entry__tag {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--body);
}
.entry__meta {
  display: grid;
  justify-items: end;
  gap: 0.1rem;
  padding-right: 0.4rem;
}
.entry__count {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.entry__countLabel {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  white-space: nowrap;
}
.entry__go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  transition: transform 0.22s var(--ease), color 0.22s var(--ease);
}
.entry:hover .entry__go {
  transform: translateX(5px);
  color: var(--coral);
}

/* ---------- 流程 ---------- */
.flow {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  gap: 2rem;
}
.flow__item {
  position: relative;
  padding-top: 1.5rem;
  border-top: 1px solid var(--hair-dark);
}
.flow__item::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  width: 26px;
  height: 3px;
  background: var(--coral);
  border-radius: 2px;
}
.flow__n {
  display: block;
  margin-bottom: 0.8rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--coral-300);
  font-variant-numeric: tabular-nums;
}
.flow__t {
  margin-bottom: 0.4rem;
  color: #fff;
}
.flow__d {
  margin: 0;
  font-size: 0.9rem;
  color: var(--on-dark);
}

@media (max-width: 880px) {
  .entry {
    grid-template-columns: 2.6rem minmax(0, 1fr) 1.8rem;
    align-items: start;
  }
  .entry__meta {
    display: none;
  }
  .entry__go {
    align-self: center;
  }
}
</style>
