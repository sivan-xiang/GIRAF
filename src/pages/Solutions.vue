<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { openQuote } from '@/composables/useQuote'
import { solutions } from '@/data/solutions'
import RevealText from '@/components/effects/RevealText.vue'
import GradientText from '@/components/effects/GradientText.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, link } = useSite()

const approach = computed(() => {
  const list = tm('solutions.approach.items')
  return Array.isArray(list) ? list : []
})

const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div class="mag">
    <!--
      抬升面篇首：与服务索引的深色报头刻意区分（用一层略亮的面而非描边）。
      方案是「说服性」内容，因此让标题占据绝对主导，其余元素让位。
    -->
    <section class="opener">
      <div class="wrap">
        <nav class="crumbs crumbs--ink rise" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('solutions.hero.crumb') }}</span>
        </nav>

        <span class="eyebrow rise" :style="{ '--d': '60ms' }">{{ t('solutions.hero.eyebrow') }}</span>
        <h1 class="opener__title">
          <RevealText :text="t('solutions.hero.title')" :step="46" />
        </h1>
        <p class="opener__text rise" :style="{ '--d': '220ms' }">{{ t('solutions.hero.text') }}</p>

        <div class="opener__rule" aria-hidden="true"></div>
      </div>
    </section>

    <!--
      四种货种：横向跨页。
      每一档都是一整行——大号序号、名称与说明左右分置，
      并在悬停时整行切换语气色。与「卡片网格」是两种完全不同的阅读动作。
    -->
    <section class="spreads">
      <div class="wrap">
        <div v-for="(s, i) in solutions" :key="s.slug" class="spread" :class="`spread--${s.accent}`">
          <RouterLink class="spread__link" :to="link(`solution:${s.slug}`)" v-reveal="i * 40">
            <span class="spread__num">{{ pad(i) }}</span>

            <span class="spread__head">
              <span class="spread__kind">{{ t('solutionDetail.cargoType') }}</span>
              <span class="spread__name">{{ s.name }}</span>
            </span>

            <span class="spread__body">
              <span class="spread__tag">{{ s.tagline }}</span>
              <span class="spread__more">
                {{ t('solutions.readMore') }}
                <AppIcon name="arrow" :size="15" />
              </span>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 我们怎么开始：三个问题 -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('solutions.approach.eyebrow') }}</span>
          <h2>{{ t('solutions.approach.title') }}</h2>
        </div>

        <div class="quotes">
          <blockquote v-for="(a, i) in approach" :key="i" class="quotes__i" v-reveal="i * 80">
            <span class="quotes__n">{{ pad(i) }}</span>
            <p class="quotes__q">{{ a.q }}</p>
            <p class="quotes__a">{{ a.a }}</p>
          </blockquote>
        </div>
      </div>
    </section>

    <!-- 承上启下的一条横向过渡 -->
    <section class="bridge">
      <div class="wrap bridge__inner">
        <GradientText class="bridge__t">{{ t('solutions.bridge') }}</GradientText>
        <button type="button" class="tlink" @click="openQuote">
          {{ t('common.ctaQuote') }}
          <AppIcon name="arrow" :size="16" />
        </button>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* ---------- 篇首 ---------- */
.opener {
  padding: clamp(3rem, 2rem + 4vw, 5.6rem) 0 clamp(1.4rem, 1rem + 1.6vw, 2.2rem);
  background: var(--surface-solid);
}
.crumbs--ink {
  color: var(--muted);
}
.crumbs--ink a {
  color: var(--ink);
}
.opener__title {
  max-width: 17ch;
  margin-bottom: 1.1rem;
  font-size: clamp(2.4rem, 1.5rem + 3.6vw, 4.3rem);
  line-height: 1.06;
  letter-spacing: -0.042em;
}
.opener__text {
  max-width: 56ch;
  margin-bottom: 2.6rem;
  color: var(--body);
  font-size: var(--fs-lead);
}
/*
  规线由左长出。篇首是「抬升面 + 大标题」，最后需要一个落点把视线收住；
  静态的一条横线只是分割线，让它跟着标题一起长出来，收尾才有动作。
*/
.opener__rule {
  height: 3px;
  background: linear-gradient(90deg, var(--coral) 0%, var(--coral) 12%, var(--line) 12%, var(--line) 100%);
  transform: scaleX(0);
  transform-origin: 0 50%;
  animation: openerRule 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.34s both;
}
@keyframes openerRule {
  to {
    transform: scaleX(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .opener__rule {
    animation: none;
    transform: none;
  }
}

/* ---------- 货种跨页 ---------- */
.spreads {
  padding-bottom: clamp(1rem, 0.6rem + 1.6vw, 2rem);
}
.spread {
  border-bottom: 1px solid var(--line);
}
.spread__link {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(1rem, 0.4rem + 2vw, 2.6rem);
  align-items: start;
  padding: clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem) 0;
  transition: padding-left 0.24s var(--ease);
}
.spread__link:hover {
  padding-left: 1rem;
}
.spread__num {
  font-size: clamp(2.4rem, 1.6rem + 2.6vw, 3.6rem);
  font-weight: 800;
  line-height: 0.9;
  letter-spacing: -0.06em;
  color: var(--line);
  font-variant-numeric: tabular-nums;
  transition: color 0.24s var(--ease);
}
.spread--coral .spread__link:hover .spread__num {
  color: var(--coral);
}
.spread--sand .spread__link:hover .spread__num {
  color: #e0a13a;
}
.spread--steel .spread__link:hover .spread__num {
  color: #5b8ad4;
}
.spread--cold .spread__link:hover .spread__num {
  color: #4d9fb8;
}
.spread__head {
  display: grid;
  gap: 0.3rem;
}
.spread__kind {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
.spread__name {
  font-size: clamp(1.5rem, 1.15rem + 1.3vw, 2.1rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.032em;
  color: var(--ink);
}
.spread__body {
  display: grid;
  gap: 1rem;
  padding-top: 0.3rem;
}
.spread__tag {
  font-size: 1rem;
  line-height: 1.68;
  color: var(--body);
}
.spread__more {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--ink);
  transition: color 0.2s var(--ease), gap 0.2s var(--ease);
}
.spread__link:hover .spread__more {
  gap: 0.7rem;
  color: var(--coral);
}

/* ---------- 三个问题：引语式 ---------- */
.quotes {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1.4rem, 1rem + 1.6vw, 2.6rem);
}
.quotes__i {
  margin: 0;
  padding-top: 1.4rem;
  border-top: 2px solid var(--coral);
}
.quotes__n {
  display: block;
  margin-bottom: 0.9rem;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--coral-300);
}
.quotes__q {
  margin-bottom: 0.6rem;
  font-size: 1.16rem;
  font-weight: 600;
  line-height: 1.4;
  color: #fff;
  letter-spacing: -0.016em;
}
.quotes__a {
  margin: 0;
  font-size: 0.92rem;
  color: var(--on-dark);
}

/* ---------- 过渡带 ---------- */
.bridge {
  padding: clamp(2.4rem, 1.8rem + 2.6vw, 4rem) 0;
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
}
.bridge__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.4rem;
}
.bridge__t {
  max-width: 30ch;
  font-size: clamp(1.3rem, 1.05rem + 1.2vw, 2rem);
  font-weight: 800;
  line-height: 1.22;
  letter-spacing: -0.03em;
}

@media (max-width: 900px) {
  .quotes {
    grid-template-columns: 1fr;
  }
  .spread__link {
    grid-template-columns: 3.4rem minmax(0, 1fr);
  }
  .spread__body {
    grid-column: 2 / -1;
  }
}
</style>
