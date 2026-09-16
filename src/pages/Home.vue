<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { openQuote } from '@/composables/useQuote'
import { services } from '@/data/services'
import { branchesOf } from '@/data/branches'

import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import GradientText from '@/components/effects/GradientText.vue'
import ShinyText from '@/components/effects/ShinyText.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import GlowButton from '@/components/effects/GlowButton.vue'
import RevealText from '@/components/effects/RevealText.vue'
import Magnet from '@/components/effects/Magnet.vue'
import LogoLoop from '@/components/effects/LogoLoop.vue'
import StatsBand from '@/components/StatsBand.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, link } = useSite()

/** 「为什么选我们」四个论点的图标 */
const WHY_ICONS = ['users', 'shield', 'doc', 'eye']

const why = computed(() => {
  const list = tm('home.why.items')
  return Array.isArray(list) ? list : []
})
const stats = computed(() => {
  const list = tm('home.stats')
  return Array.isArray(list) ? list : []
})
const segments = computed(() => {
  const list = tm('home.segments.items')
  return Array.isArray(list) ? list : []
})

/**
 * 信任带：中国自有网点（与网络页同源）。
 * icon: 'pin' —— 交给 LogoLoop 渲染成「带定位图标的芯片」，
 * 而不是一行只有文字的小字在滑（纯文字滚动在深色底上太单薄）。
 */
const cityItems = computed(() =>
  branchesOf('cn').map((b) => ({ label: b.city, icon: 'pin' }))
)

/**
 * 首页网络预览与网络页同源（branches.js）。
 * 此前首页另有一套 data/network.js 的德国 / 中国 / 海外清单，与网络页数据各说一套
 * （甚至含源站从未出现的城市），是内容互相矛盾的根源，故统一到单一来源。
 */
const networkPreview = computed(() => {
  const cities = (id) => branchesOf(id).map((b) => b.city)
  return {
    eu: cities('eu'),
    cn: cities('cn'),
    intl: [...cities('am'), ...cities('as'), ...cities('me')]
  }
})
</script>

<template>
  <div>
    <!-- ================= HERO ================= -->
    <section class="hero">
      <AuroraBackground
        :color-stops="['#0b1322', '#fa5959', '#3f6fb5']"
        :speed="0.8"
        :amplitude="0.9"
        :blend="0.55"
      />

      <div class="wrap">
        <div class="hero__inner">
          <!--
            首屏入场编排：h1 第一行逐词升起（RevealText），第二行用同一手法的遮罩升起，
            其余元素按 300 / 380 / 470ms 依次落下，最后是数据条。
            用 animation 而非 v-reveal：这段内容永远在首屏，不需要 IntersectionObserver；
            且每次路由回到首页都会重播，与首屏观感一致。
          -->
          <span class="eyebrow hero__in" :style="{ '--d': '0ms' }"
            ><ShinyText :text="t('home.hero.eyebrow')" :speed="0.85"
          /></span>

          <h1 class="hero__title">
            <RevealText :text="t('home.hero.titleLead')" :step="55" />
            <br />
            <span class="hero__accentWrap"
              ><GradientText class="hero__accent">{{
                t('home.hero.titleAccent')
              }}</GradientText></span
            >
          </h1>

          <p class="hero__text hero__in" :style="{ '--d': '300ms' }">{{ t('home.hero.text') }}</p>

          <div class="hero__actions hero__in" :style="{ '--d': '380ms' }">
            <Magnet :padding="70" :magnet-strength="6">
              <GlowButton variant="primary" size="lg" @click="openQuote">
                {{ t('home.hero.primary') }}
                <AppIcon name="arrow" :size="17" />
              </GlowButton>
            </Magnet>
            <GlowButton :to="link('services')" variant="onDark" size="lg" :glow="false">
              {{ t('home.hero.secondary') }}
            </GlowButton>
          </div>

          <div class="hero__badges hero__in" :style="{ '--d': '470ms' }">
            <span v-for="b in tm('home.hero.badges')" :key="b" class="chip chip--dark">
              <AppIcon name="check" :size="13" />
              {{ b }}
            </span>
          </div>
        </div>
      </div>

      <!-- 数据条：压在 hero 下沿 -->
      <div class="wrap hero__stats hero__in" :style="{ '--d': '540ms' }">
        <StatsBand :stats="stats" />
      </div>
    </section>

    <!-- ================= 覆盖能力信任带 ================= -->
    <section class="coverage">
      <div class="wrap coverage__head">
        <span class="coverage__label">
          <span class="coverage__pulse" aria-hidden="true"></span>
          {{ t('home.trust.label') }}
        </span>

        <div class="coverage__side">
          <span class="coverage__count">
            <b>{{ cityItems.length }}</b>{{ t('home.trust.count') }}
          </span>
          <RouterLink class="tlink coverage__more" :to="link('network')">
            {{ t('home.networkTeaser.cta') }}
            <AppIcon name="arrow" :size="15" />
          </RouterLink>
        </div>
      </div>

      <!--
        轨道：城市以「芯片」形式在上面滑过。
        渐隐遮罩色必须等于轨道底色（base.css 里 .coverage__rail 为纯色 --bg-soft），
        否则两端会各留一道灰痕。
      -->
      <div class="coverage__rail">
        <LogoLoop
          class="coverage__loop"
          :items="cityItems"
          :speed="46"
          :logo-height="16"
          :gap="12"
          fade-color="var(--bg-soft)"
          :aria-label="t('home.trust.aria')"
        />
      </div>
    </section>

    <!-- ================= 服务矩阵：10 项服务，每项一个独立页面 ================= -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('home.services.eyebrow') }}</span>
          <h2>{{ t('home.services.title') }}</h2>
          <p class="lead">{{ t('home.services.text') }}</p>
        </div>

        <div class="matrix">
          <RouterLink
            v-for="(s, i) in services"
            :key="s.id"
            class="mtile"
            :class="`mtile--${s.accent}`"
            :to="link(`service:${s.slug}`)"
            v-reveal="i * 30"
          >
            <span class="mtile__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="icon-box">
              <AppIcon :name="s.icon" />
            </span>
            <span class="mtile__name">{{ s.name }}</span>
            <span class="mtile__brand">{{ s.brand }}</span>
            <span class="mtile__go" aria-hidden="true"><AppIcon name="arrow" :size="15" /></span>
          </RouterLink>
        </div>

        <div class="svc__more" v-reveal>
          <RouterLink class="tlink" :to="link('services')">
            {{ t('common.allServices') }}
            <AppIcon name="arrow" :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ================= 为什么选择我们 ================= -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('home.why.eyebrow') }}</span>
          <h2>{{ t('home.why.title') }}</h2>
          <p class="lead">{{ t('home.why.text') }}</p>
        </div>

        <div class="grid whygrid">
          <SpotlightCard v-for="(w, i) in why" :key="i" v-reveal="i * 70" dark>
            <div class="icon-box icon-box--dark">
              <AppIcon :name="WHY_ICONS[i % WHY_ICONS.length]" />
            </div>
            <h3 class="glass__title">{{ w.title }}</h3>
            <p class="glass__text">{{ w.text }}</p>
          </SpotlightCard>
        </div>
      </div>
    </section>

    <!-- ================= 服务行业 ================= -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="section-head section-head--tight" v-reveal>
          <span class="eyebrow">{{ t('home.segments.eyebrow') }}</span>
          <h2>{{ t('home.segments.title') }}</h2>
        </div>

        <div class="chiprow">
          <span v-for="(s, i) in segments" :key="s" class="chip" v-reveal="i * 40">{{ s }}</span>
        </div>
      </div>
    </section>

    <!-- ================= 网络预览 ================= -->
    <section class="section section--soft">
      <div class="wrap grid--aside">
        <div v-reveal>
          <span class="eyebrow">{{ t('home.networkTeaser.eyebrow') }}</span>
          <h2>{{ t('home.networkTeaser.title') }}</h2>
          <p class="lead">{{ t('home.networkTeaser.text') }}</p>
          <RouterLink class="tlink netpreview__link" :to="link('network')">
            {{ t('home.networkTeaser.cta') }}
            <AppIcon name="arrow" :size="16" />
          </RouterLink>
        </div>

        <div class="netpreview" v-reveal="120">
          <div class="netpreview__block">
            <span class="netpreview__label">
              <AppIcon name="pin" :size="15" />
              {{ t('network.region.eu') }}
            </span>
            <div class="netpreview__row">
              <span v-for="city in networkPreview.eu" :key="city" class="chip chip--coral">
                {{ city }}
              </span>
            </div>
          </div>

          <div class="netpreview__block">
            <span class="netpreview__label">
              <AppIcon name="globe" :size="15" />
              {{ t('network.region.cn') }} · {{ networkPreview.cn.length }}
            </span>
            <div class="netpreview__row netpreview__row--wrap">
              <span v-for="city in networkPreview.cn.slice(0, 10)" :key="city" class="tag">{{ city }}</span>
              <span class="tag">+{{ networkPreview.cn.length - 10 }}</span>
            </div>
          </div>

          <div class="netpreview__block">
            <span class="netpreview__label">
              <AppIcon name="pin" :size="15" />
              {{ t('network.region.intl') }} · {{ networkPreview.intl.length }}
            </span>
            <div class="netpreview__row netpreview__row--wrap">
              <span v-for="city in networkPreview.intl" :key="city" class="tag">{{ city }}</span>
            </div>
          </div>

          <div class="netpreview__foot">
            <AppIcon name="checkCircle" :size="17" />
            {{ t('network.note.text') }}
          </div>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* —— 首屏入场编排 ——
   与 h1「逐词升起」共用同一条时间线：0 → 540ms 顺序推进。
   关键帧与延迟接口取自共享基元 riseIn / --d（见 base.css 的 .rise）；
   这里保留独立类名，因为首屏的尺度比内页报头大，0.72s 比内页慢一拍，
   将来要单独调 hero 的节奏不必动全局。 */
.hero__in {
  animation: riseIn 0.72s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--d, 0ms);
}

/* 第二行渐变字：遮罩升起。用 clip-path 而不是 overflow+translate——
   overflow 会在 baseline 处切掉 g / p 的下伸部，而 clip-path 只裁「可见区域」。
   注意：动画挂在包裹层而不挂在 GradientText 上，否则会顶掉它自己的渐变流动 animation。 */
.hero__accentWrap {
  display: inline-block;
  animation: heroReveal 0.82s cubic-bezier(0.22, 1, 0.36, 1) 0.12s both;
}
@keyframes heroReveal {
  from {
    clip-path: inset(105% 0 0 0);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
}
.hero__accent {
  display: inline-block;
  font-weight: 800;
}

@media (prefers-reduced-motion: reduce) {
  .hero__in,
  .hero__accentWrap {
    animation: none;
  }
}

.hero__stats {
  position: relative;
  z-index: 2;
  margin-top: clamp(2.8rem, 2rem + 2.6vw, 4.5rem);
}

/*
  信任带轨道上的城市芯片。
  改写前：城市名之间只有一个 5px 的珊瑚点，整条轨道读起来像「一行小字在滑」，
  在深色底上既没有体积也没有可悬停的对象。现在每座城市是一个玻璃面芯片
  （描边 + 定位图标 + 城市名），滑过的是一串有体积的物件；
  悬停时 LogoLoop 会指数平滑地缓停（pauseOnHover），所以芯片是可以看清、可以点的。
  这里用 :deep() 穿透 LogoLoop 的 scoped 样式——芯片不是本组件的元素。
*/
.coverage__loop :deep(.lloop__text) {
  display: inline-flex;
  align-items: center;
  padding: 0.43rem 0.8rem 0.43rem 0.68rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface-2);
  color: var(--ink);
  font-weight: 700;
  letter-spacing: -0.012em;
  transition: border-color 0.22s var(--ease), background 0.22s var(--ease),
    box-shadow 0.22s var(--ease), transform 0.22s var(--ease);
}
.coverage__loop :deep(.lloop__icon) {
  color: var(--coral);
}
.coverage__loop :deep(.lloop__item:hover .lloop__text) {
  border-color: rgba(250, 89, 89, 0.5);
  background: var(--coral-soft);
  box-shadow: 0 10px 26px -16px rgba(250, 89, 89, 0.9);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .coverage__loop :deep(.lloop__item:hover .lloop__text) {
    transform: none;
  }
}

/* —— 服务矩阵：10 项 = 5×2，因此用固定五列而非 auto-fit（后者会排出残缺行）—— */
.matrix {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.mtile {
  position: relative;
  isolation: isolate; /* 两层装饰伪元素用 z-index:-1 待在卡片内、文字下 */
  display: grid;
  gap: 0.55rem;
  padding: 1.4rem 1.2rem 1.5rem;
  background: var(--surface-solid);
  transition: background 0.22s var(--ease);
}
/*
  悬停反馈不只是换底色：左上角起一片珊瑚柔光，顶边一条细线由左长出。
  十个格子铺满一屏，若只有底色变化，扫过时几乎察觉不到「指针在哪个格子上」。
*/
.mtile::before {
  content: '';
  position: absolute;
  z-index: -1;
  inset: 0;
  background: radial-gradient(130% 95% at 10% 0%, rgba(250, 89, 89, 0.14), transparent 66%);
  opacity: 0;
  transition: opacity 0.3s var(--ease);
  pointer-events: none;
}
.mtile::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--coral), rgba(250, 89, 89, 0.12));
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.34s var(--ease);
  pointer-events: none;
}
.mtile:hover {
  background: var(--bg-soft);
}
.mtile:hover::before {
  opacity: 1;
}
.mtile:hover::after {
  transform: scaleX(1);
}
@media (prefers-reduced-motion: reduce) {
  .mtile::after {
    transition: none;
  }
  .mtile:hover::after {
    transform: scaleX(1);
  }
}
.mtile__n {
  position: absolute;
  top: 0.9rem;
  right: 1rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--line);
  font-variant-numeric: tabular-nums;
  transition: color 0.22s var(--ease);
}
.mtile:hover .mtile__n {
  color: var(--coral);
}
.mtile__name {
  margin-top: 0.2rem;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.32;
  letter-spacing: -0.014em;
  color: var(--ink);
}
.mtile__brand {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.mtile__go {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  color: transparent;
  transition: color 0.22s var(--ease), transform 0.22s var(--ease);
}
.mtile:hover .mtile__go {
  color: var(--coral);
  transform: translateX(3px);
}
/*
  图标色取自各服务**自身**的 accent（`.mtile--*` 早由此数据带上），与该服务详情页主色一致。
  ⚠️ 原先写的是 `i % 3 === 1 ? 'icon-box--coral' : ''`：五列栅格下珊瑚色恰好落在
  Air / E-commerce / Customs 三个**非 coral** 服务上，而 accent 真为 coral 的
  Ocean / Inland / Destination / Bonded 反倒是白图标 —— 看上去就是「莫名其妙有两个格子是红的」。
  现改为数据驱动，并把颜色落到图标本身：静置 = 中性底 + 强调色图标，悬停 = 底色染上该服务的柔光。
  （三种强调色在 --bg-tint 上的对比度：coral 5.5:1 / steel 6.5:1 / sand 9.4:1，均高于图形 3:1。）
*/
.mtile {
  --tile-accent: var(--coral);
  --tile-accent-soft: var(--coral-soft);
}
.mtile--sand {
  --tile-accent: var(--sand);
  --tile-accent-soft: var(--sand-soft);
}
.mtile--steel {
  --tile-accent: var(--steel);
  --tile-accent-soft: var(--steel-soft);
}
.mtile .icon-box {
  color: var(--tile-accent);
}
.mtile:hover .icon-box {
  background: var(--tile-accent-soft);
}/* 中等屏：5 列会挤到换行不整，改用两列 */
@media (max-width: 1080px) {
  .matrix {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 620px) {
  .mtile {
    padding: 1.2rem 1rem 1.3rem;
  }
}

/* 四个论点固定 2×2，避免 auto-fit 在 1240 宽度下排出 3+1 的不均分布 */
.whygrid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 780px) {
  .whygrid {
    grid-template-columns: 1fr;
  }
}

.section-head--tight {
  margin-bottom: 1.8rem;
}

.svc__more {
  margin-top: 2.4rem;
}

.netpreview {
  display: grid;
  gap: 1.6rem;
  padding: clamp(1.5rem, 1.2rem + 1.2vw, 2.1rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-solid);
  box-shadow: var(--sh-2);
}
.netpreview__block {
  display: grid;
  gap: 0.75rem;
}
.netpreview__label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.netpreview__row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.netpreview__row--wrap {
  gap: 0.4rem;
}
.netpreview__link {
  margin-top: 1.6rem;
}
.netpreview__foot {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  padding-top: 1.3rem;
  border-top: 1px solid var(--line-soft);
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--muted);
}
.netpreview__foot svg {
  flex: 0 0 auto;
  margin-top: 0.15rem;
  color: var(--coral);
}

@media (max-width: 900px) {
  .netpreview__link {
    display: inline-flex;
    margin-top: 1.2rem;
  }
}
</style>
