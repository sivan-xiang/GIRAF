<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import MarqueeStrip from '@/components/effects/MarqueeStrip.vue'
import RevealText from '@/components/effects/RevealText.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, link } = useSite()

const ICONS = {
  ocean: 'ship',
  air: 'plane',
  rail: 'train',
  inland: 'truck',
  customs: 'doc',
  warehouse: 'warehouse',
  dg: 'danger',
  ecommerce: 'cart'
}

const items = computed(() => {
  const list = tm('services.items')
  return Array.isArray(list) ? list : []
})
const steps = computed(() => {
  const list = tm('services.process.steps')
  return Array.isArray(list) ? list : []
})

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div>
    <!-- 内页头 -->
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#fa5959', '#2f6ab0']"
        :speed="0.8"
        :amplitude="0.66"
        :grid="true"
      />
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('services.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('services.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('services.hero.title')" :step="48" /></h1>
        <p>{{ t('services.hero.text') }}</p>
      </div>
    </section>

    <!-- 导语 + 服务清单条 -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="grid--aside">
          <div v-reveal>
            <h2>{{ t('services.intro.title') }}</h2>
          </div>
          <p class="lead" v-reveal="90">{{ t('services.intro.text') }}</p>
        </div>
      </div>
    </section>

    <div class="svcstrip">
      <MarqueeStrip :items="items.map((i) => i.title)" :speed="54" :dots="true" />
    </div>

    <!-- 服务详情 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="svcgrid">
          <article v-for="(s, i) in items" :key="s.id" class="svc" v-reveal="(i % 2) * 60">
            <div class="svc__head">
              <div class="icon-box" :class="i % 3 === 1 ? 'icon-box--coral' : ''">
                <AppIcon :name="ICONS[s.id] || 'box'" />
              </div>
              <span class="svc__idx">{{ pad(i) }}</span>
            </div>
            <h2 class="svc__title">{{ s.title }}</h2>
            <p class="svc__text">{{ s.text }}</p>
            <ul class="checklist">
              <li v-for="(p, j) in s.points" :key="j">
                <AppIcon name="check" :size="18" />
                <span>{{ p }}</span>
              </li>
            </ul>
          </article>
        </div>
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
.svcstrip {
  padding-block: 0.4rem 2.6rem;
  border-bottom: 1px solid var(--line);
}
.svcstrip :deep(.marquee__item) {
  color: var(--navy-700);
}

.svcgrid {
  display: grid;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  /* 固定三列：9 条服务正好排成 3×3，不留空单元格。
     用 auto-fit 会在部分宽度下退化成 3+3+3+... 的残缺行。 */
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* 中等宽度：两列。9 条在偶数栏下必然空出 1 格，让末条跨满整行消除缺口。 */
@media (max-width: 1080px) {
  .svcgrid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .svc:last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }
}

@media (max-width: 700px) {
  .svcgrid {
    grid-template-columns: 1fr;
  }
  .svc:last-child:nth-child(odd) {
    grid-column: auto;
  }
}

.svc {
  padding: clamp(1.7rem, 1.3rem + 1.6vw, 2.5rem);
  background: #fff;
  transition: background 0.24s var(--ease);
}
.svc:hover {
  background: #fdfefe;
}
.svc__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.svc__idx {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--line);
  font-variant-numeric: tabular-nums;
}
.svc__title {
  margin-bottom: 0.55rem;
  font-size: 1.22rem;
}
.svc__text {
  margin-bottom: 1.25rem;
  font-size: 0.94rem;
  color: var(--body);
}

/* 流程：纵向连接线 */
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
</style>
