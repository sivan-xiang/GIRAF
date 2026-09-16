<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { openQuote } from '@/composables/useQuote'
import { solutions, solutionBySlug } from '@/data/solutions'
import RevealText from '@/components/effects/RevealText.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  slug: { type: String, required: true }
})

const { t, link } = useSite()

const sol = computed(() => solutionBySlug(props.slug))
const index = computed(() => solutions.findIndex((s) => s.slug === props.slug))
const siblings = computed(() => solutions.filter((s) => s.slug !== props.slug))
const num = computed(() => String(index.value + 1).padStart(2, '0'))

/** 正文章节的序号：与篇首的「01 CARGO TYPE」同一套编号语言 */
const pad = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div v-if="sol" class="longform" :class="`is-${sol.accent}`">
    <!--
      篇首：小幅抬升的暗面、宽留白、一条粗规线。
      与服务详情页的深色规格面板刻意相反——方案是「要被读完」的内容，
      因此版面重心放在阅读节奏上，而不是信息密度。
    -->
    <section class="opening">
      <div class="wrap-narrow">
        <nav class="crumbs crumbs--ink rise" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink :to="link('solutions')">{{ t('nav.solutions') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ sol.name }}</span>
        </nav>

        <div class="opening__meta rise" :style="{ '--d': '60ms' }">
          <span class="opening__num">{{ num }}</span>
          <span class="opening__kind">{{ t('solutionDetail.cargoType') }}</span>
        </div>

        <h1 class="opening__title"><RevealText :text="sol.name" :step="46" /></h1>
        <p class="opening__standfirst rise" :style="{ '--d': '220ms' }">{{ sol.tagline }}</p>
      </div>
    </section>

    <!--
      正文带：从 --bg-soft 起步、向 --bg 收束，与篇首的渐隐无缝相接。
      整页由此形成三段清晰的色区——篇首（强调色光晕）→ 正文带（抬升面）→
      其余货种（软带），而不是从篇首到页尾一个颜色铺到底。
    -->
    <section class="reading">
      <!-- 一栏事实摘要 -->
      <div class="wrap-narrow">
        <dl class="tallies" v-reveal>
          <div v-for="f in sol.facts" :key="f.k" class="tallies__i">
            <dt>{{ f.k }}</dt>
            <dd>{{ f.v }}</dd>
          </div>
        </dl>
      </div>

      <!-- 正文：窄栏长文，首段下沉字 -->
      <article class="wrap-narrow">
        <p class="article__lede" v-reveal>
          <span class="article__dropcap" aria-hidden="true">{{ sol.intro.charAt(0) }}</span
          >{{ sol.intro.slice(1) }}
        </p>

        <section v-for="(b, bi) in sol.blocks" :key="bi" class="block" v-reveal="bi * 60">
          <h2 class="block__t">
            <span class="block__n" aria-hidden="true">{{ pad(bi) }}</span>
            {{ b.title }}
          </h2>

          <p v-if="b.text" class="block__d">{{ b.text }}</p>

          <ul v-if="b.items" class="block__list">
            <li v-for="(it, i) in b.items" :key="i">
              <AppIcon name="check" :size="17" />
              <span>{{ it }}</span>
            </li>
          </ul>

          <div v-if="b.cards" class="block__cards">
            <SpotlightCard v-for="(c, i) in b.cards" :key="i" v-reveal="i * 50">
              <h3 class="block__ct">{{ c.title }}</h3>
              <p class="block__cd">{{ c.text }}</p>
            </SpotlightCard>
          </div>
        </section>

        <!-- 结尾行动 -->
        <div class="article__foot" v-reveal>
          <button type="button" class="btn btn--primary" @click="openQuote">
            {{ t('common.ctaQuote') }}
            <AppIcon name="arrow" :size="16" />
          </button>
          <p class="article__footNote">{{ t('solutionDetail.contactNote') }}</p>
        </div>
      </article>
    </section>

    <!-- 其余货种 -->
    <section class="section section--soft">
      <div class="wrap">
        <h2 class="others__hd">{{ t('solutionDetail.others') }}</h2>
        <div class="others">
          <RouterLink
            v-for="(s, si) in siblings"
            :key="s.slug"
            class="others__i"
            :class="`others__i--${s.accent}`"
            :to="link(`solution:${s.slug}`)"
            v-reveal="si * 70"
          >
            <span class="others__t">{{ s.name }}</span>
            <span class="others__d">{{ s.tagline }}</span>
            <span class="others__go">
              <AppIcon name="arrow" :size="16" />
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/*
  每种货种一套强调色（--accent）与其低透明底色（--accent-soft）。
  四种货种必须两两不同：此前 frozen 与 general 同为 steel，两页看起来一模一样，
  索引页也分不出来。cold 是冷链的冷色，语义上对得上。
*/
.longform {
  --accent: #3f6fb5;
  --accent-soft: rgba(63, 111, 181, 0.16);
}
.longform.is-coral {
  --accent: var(--coral);
  --accent-soft: rgba(250, 89, 89, 0.16);
}
.longform.is-sand {
  --accent: #c98a12;
  --accent-soft: rgba(201, 138, 18, 0.2);
}
.longform.is-steel {
  --accent: #3f6fb5;
  --accent-soft: rgba(63, 111, 181, 0.16);
}
.longform.is-cold {
  --accent: #4d9fb8;
  --accent-soft: rgba(77, 159, 184, 0.2);
}

/* ---------- 篇首 ---------- */
.opening {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: clamp(3rem, 2rem + 4vw, 5.4rem) 0 clamp(1.6rem, 1rem + 2vw, 2.6rem);
  /*
    深色主题下的篇首。
    ⚠️ 原值是 light 主题的 linear-gradient(180deg, var(--bg-soft), #fff)：
       它在深色站里渐变到纯白，而标题用的是近白色的 --ink，白底上几乎不可见。
    改法不是抹成一块平色——那样整屏会显得很死。这里用本页已有的 --accent 重新组织：
       ① 一层柔和的强调色光晕（四种货种各自不同色调）
       ② 极淡的刻度网格，给暗面一点质感
       ③ 底部渐隐，让篇首沉入正文而不是在某个 y 上硬切
  */
  background:
    linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px) 0 0 / 84px 84px,
    linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px) 0 0 / 84px 84px,
    linear-gradient(180deg, var(--bg-tint) 0%, var(--bg) 100%);
}
/* 强调色光晕：把「这一页是哪种货种」的色彩性格提前到篇首。
   光心压到元素边界以内，否则大部分圆被 overflow:hidden 裁掉，只剩一层几乎看不出的薄雾。 */
.opening::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -34%;
  left: -12%;
  width: 64%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent) 0%, transparent 64%);
  opacity: 0.3;
  pointer-events: none;
}
/* 底部渐隐：沉入下方的「正文带」（该带自 --bg-soft 起步），而不是在某个 y 上硬切 */
.opening::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  right: 0;
  bottom: 0;
  height: 38%;
  background: linear-gradient(180deg, transparent, var(--bg-soft));
  pointer-events: none;
}
.crumbs--ink {
  color: var(--muted);
}
.crumbs--ink a {
  color: var(--ink);
}
.opening__meta {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.opening__num {
  font-size: 2.6rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}
.opening__kind {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--muted);
}
.opening__title {
  margin-bottom: 0.9rem;
  font-size: clamp(2.1rem, 1.4rem + 2.6vw, 3.4rem);
  letter-spacing: -0.035em;
}
.opening__standfirst {
  margin-bottom: 0;
  padding-left: 1.1rem;
  border-left: 3px solid var(--accent);
  font-size: var(--fs-lead);
  font-weight: 500;
  color: var(--ink);
}

/*
  正文带：自 --bg-soft 起步，向 --bg 收束。
  它是通往「其余货种」软带之前的过渡，让长文这段不再是篇首同色的无限延伸。
*/
.reading {
  position: relative;
  padding-top: clamp(1.2rem, 0.8rem + 1.4vw, 2.2rem);
  padding-bottom: clamp(0.6rem, 0.4rem + 0.8vw, 1.2rem);
  background: linear-gradient(180deg, var(--bg-soft) 0%, var(--bg) 58%, var(--bg) 100%);
}

/* ---------- 事实摘要：横向分栏，顶部强调色规线 ---------- */
.tallies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0;
  margin: 0 0 clamp(2.4rem, 1.6rem + 2vw, 3.4rem);
  border-top: 2px solid var(--accent);
  border-bottom: 1px solid var(--line);
}
.tallies__i {
  padding: 1.1rem 1.4rem 1.1rem 0;
  border-right: 1px solid var(--line-soft);
  transition: transform 0.24s var(--ease);
}
.tallies__i:last-child {
  border-right: 0;
}
/* 悬停时整格轻抬、标签转成强调色：这是页面上唯一「能用鼠标摸」的摘要 */
.tallies__i:hover {
  transform: translateY(-3px);
}
.tallies__i:hover dt {
  color: var(--accent);
}
.tallies__i dt {
  margin-bottom: 0.28rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  transition: color 0.24s var(--ease);
}
.tallies__i dd {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.45;
}

/* ---------- 长文 ---------- */
.article__lede {
  font-size: var(--fs-lead);
  line-height: 1.75;
  color: var(--ink);
}
.article__dropcap {
  float: left;
  margin: 0.24rem 0.6rem 0 0;
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 0.78;
  color: var(--accent);
  letter-spacing: -0.04em;
}

.block {
  position: relative;
  margin-top: clamp(2.2rem, 1.6rem + 1.8vw, 3.2rem);
  padding-top: clamp(1.6rem, 1.2rem + 1.2vw, 2.2rem);
  border-top: 1px solid var(--line);
}
/*
  每节顶部的一段强调色短规线。带 v-reveal 的节进入视口时由左向右长出，
  把「滚动」这件事在视觉上落下来——原先只有卡片有动效，长文这一段是死的。
*/
.block::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 92px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent), transparent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.7s var(--ease-out-expo) 0.1s;
}
.block.is-in::before {
  transform: scaleX(1);
}
.block__t {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  margin-bottom: 0.9rem;
  font-size: clamp(1.24rem, 1.1rem + 0.5vw, 1.52rem);
  letter-spacing: -0.02em;
}
/* 小号强调色序号：与篇首的「01 CARGO TYPE」同一套编号语言 */
.block__n {
  flex: 0 0 auto;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}
.block__d {
  color: var(--body);
}
.block__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.6rem 1.8rem;
  margin: 1.2rem 0 0;
  padding: 0;
  list-style: none;
}
.block__list li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0;
  border-bottom: 1px solid var(--line-soft);
  font-size: 0.95rem;
  color: var(--ink);
}
.block__list svg {
  flex: 0 0 auto;
  color: var(--accent);
}

.block__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.4rem;
}
.block__ct {
  margin-bottom: 0.4rem;
  font-size: 1rem;
}
.block__cd {
  margin: 0;
  font-size: 0.9rem;
  color: var(--body);
}

.article__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
  margin-top: clamp(2.4rem, 1.8rem + 2vw, 3.4rem);
  padding-top: 1.8rem;
  border-top: 2px solid var(--accent);
}
.article__footNote {
  margin: 0;
  font-size: 0.88rem;
  color: var(--muted);
}

/* ---------- 其余货种 ---------- */
.others__hd {
  margin-bottom: 1.6rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.others {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.others__i {
  position: relative;
  display: grid;
  gap: 0.5rem;
  padding: 1.6rem 1.5rem 1.9rem;
  background: var(--surface-solid);
  transition: background 0.22s var(--ease);
  /* 兜底色：将来若新增 accent 却忘了配色，仍有一条可见的线而不是空白 */
  --card-accent: var(--line-strong);
}
/*
  每张卡片顶上一条「该货种自己」的强调色短规线，悬停时铺满整张卡。
  这里刻意用卡片自身的 accent（而不是当前页的 --accent），
  于是三张卡片一眼可分——这也是整页色彩变化的来源之一。
*/
.others__i::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--card-accent);
  transform: scaleX(0.22);
  transform-origin: left center;
  transition: transform 0.42s var(--ease-out-expo);
}
.others__i:hover::before {
  transform: scaleX(1);
}
.others__i--coral {
  --card-accent: var(--coral);
}
.others__i--sand {
  --card-accent: #e0a13a;
}
.others__i--steel {
  --card-accent: #5b8ad4;
}
.others__i--cold {
  --card-accent: #4d9fb8;
}
.others__i:hover {
  background: var(--bg-soft);
}
/*
  卡片只淡入、不位移：.others 是 overflow:hidden 的网格（靠 1px 间隙画分隔线），
  若沿用 .reveal 的 translateY(20px)，卡片在动画期间会被容器裁掉一截、露出网格底色。
*/
.others__i.reveal {
  transform: none;
}
.others__t {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
}
.others__d {
  font-size: 0.87rem;
  color: var(--body);
}
.others__go {
  position: absolute;
  right: 1.4rem;
  bottom: 1.4rem;
  color: var(--muted);
  transition: transform 0.22s var(--ease), color 0.22s var(--ease);
}
.others__i:hover .others__go {
  transform: translateX(4px);
  color: var(--card-accent);
}

@media (max-width: 820px) {
  .others {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .tallies__i {
    padding-right: 0;
    border-right: 0;
    border-bottom: 1px solid var(--line-soft);
  }
  .tallies__i:last-child {
    border-bottom: 0;
  }
}

/* 降低动效偏好：短规线不再等滚动触发，直接显示出来 */
@media (prefers-reduced-motion: reduce) {
  .tallies__i,
  .block::before,
  .others__i::before {
    transition: none;
  }
  .block::before {
    transform: scaleX(1);
  }
}
</style>
