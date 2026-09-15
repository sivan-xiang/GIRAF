<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { germanOffices, chinaOffices, worldOffices, cityLabel } from '@/data/network'

import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import GradientText from '@/components/effects/GradientText.vue'
import ShinyText from '@/components/effects/ShinyText.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import GlowButton from '@/components/effects/GlowButton.vue'
import RevealText from '@/components/effects/RevealText.vue'
import Magnet from '@/components/effects/Magnet.vue'
import TiltCard from '@/components/effects/TiltCard.vue'
import LogoLoop from '@/components/effects/LogoLoop.vue'
import StatsBand from '@/components/StatsBand.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, lang, link } = useSite()

/** 与服务条目一一对应的图标 */
const SERVICE_ICONS = ['ship', 'plane', 'train', 'truck', 'doc', 'warehouse', 'danger', 'cart']
/** 「为什么选我们」四个论点的图标 */
const WHY_ICONS = ['users', 'shield', 'doc', 'eye']

const services = computed(() => {
  const list = tm('home.services.items')
  return Array.isArray(list) ? list : []
})
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

/** 信任带：中国自有网点。城市名随语言变化（泰语提供转写），由 cityLabel 取值 */
const cityItems = computed(() => chinaOffices.map((o) => ({ label: cityLabel(o, lang.value) })))

/** 网络预览：德国实体 + 中国覆盖规模 */
const networkPreview = computed(() => ({
  de: germanOffices.map((o) => cityLabel(o, lang.value)),
  cn: chinaOffices.map((o) => cityLabel(o, lang.value)),
  world: worldOffices.length
}))
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
          <span class="eyebrow"><ShinyText :text="t('home.hero.eyebrow')" :speed="0.85" /></span>

          <h1 class="hero__title">
            <RevealText :text="t('home.hero.titleLead')" :step="55" />
            <br />
            <GradientText class="hero__accent">{{ t('home.hero.titleAccent') }}</GradientText>
          </h1>

          <p class="hero__text">{{ t('home.hero.text') }}</p>

          <div class="hero__actions">
            <Magnet :padding="70" :magnet-strength="6">
              <GlowButton :to="link('contact')" variant="primary" size="lg">
                {{ t('home.hero.primary') }}
                <AppIcon name="arrow" :size="17" />
              </GlowButton>
            </Magnet>
            <GlowButton :to="link('services')" variant="onDark" size="lg" :glow="false">
              {{ t('home.hero.secondary') }}
            </GlowButton>
          </div>

          <div class="hero__badges">
            <span v-for="b in tm('home.hero.badges')" :key="b" class="chip chip--dark">
              <AppIcon name="check" :size="13" />
              {{ b }}
            </span>
          </div>
        </div>
      </div>

      <!-- 数据条：压在 hero 下沿 -->
      <div class="wrap hero__stats">
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
        <RouterLink class="tlink coverage__more" :to="link('network')">
          {{ t('home.networkTeaser.cta') }}
          <AppIcon name="arrow" :size="15" />
        </RouterLink>
      </div>

      <LogoLoop
        class="coverage__loop"
        :items="cityItems"
        :speed="44"
        :logo-height="18"
        :gap="30"
        :aria-label="t('home.trust.aria')"
      />
    </section>

    <!-- ================= 服务矩阵 ================= -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('home.services.eyebrow') }}</span>
          <h2>{{ t('home.services.title') }}</h2>
          <p class="lead">{{ t('home.services.text') }}</p>
        </div>

        <div class="grid grid--4">
          <TiltCard v-for="(s, i) in services" :key="i" v-reveal="i * 45" class="svc">
            <article class="card svc__card">
              <div class="icon-box" :class="i % 3 === 1 ? 'icon-box--coral' : ''">
                <AppIcon :name="SERVICE_ICONS[i % SERVICE_ICONS.length]" />
              </div>
              <h3 class="card__title">{{ s.title }}</h3>
              <p class="card__text">{{ s.text }}</p>
            </article>
          </TiltCard>
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
              {{ t('network.germany.eyebrow') }}
            </span>
            <div class="netpreview__row">
              <span v-for="city in networkPreview.de" :key="city" class="chip chip--coral">{{ city }}</span>
            </div>
          </div>

          <div class="netpreview__block">
            <span class="netpreview__label">
              <AppIcon name="globe" :size="15" />
              {{ t('network.china.eyebrow') }} · {{ networkPreview.cn.length }}
            </span>
            <div class="netpreview__row netpreview__row--wrap">
              <span v-for="city in networkPreview.cn.slice(0, 10)" :key="city" class="tag">{{ city }}</span>
              <span class="tag">+{{ networkPreview.cn.length - 10 }}</span>
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
.hero__accent {
  display: inline-block;
  font-weight: 800;
}

.hero__stats {
  position: relative;
  z-index: 2;
  margin-top: clamp(2.8rem, 2rem + 2.6vw, 4.5rem);
}

/* —— 信任带：背景统一为纯白，LogoLoop 两侧渐隐遮罩才能无缝衔接 —— */
.coverage {
  background: #fff;
}
.coverage__more {
  flex: 0 0 auto;
}
.coverage__loop {
  color: var(--navy-700);
}
/* 城市之间的珊瑚色分隔点 */
.coverage__loop :deep(.lloop__item) {
  position: relative;
}
.coverage__loop :deep(.lloop__item::after) {
  content: '';
  position: absolute;
  top: 50%;
  right: calc(var(--ll-gap) / -2);
  width: 5px;
  height: 5px;
  margin-top: -2.5px;
  border-radius: 50%;
  background: var(--coral);
  opacity: 0.5;
}

/* —— 服务卡：3D 倾斜容器铺满栅格，卡片自身撑满高度 —— */
.svc {
  height: 100%;
}
.svc :deep(.tilt__inner) {
  border-radius: var(--radius);
}
.svc__card {
  display: flex;
  flex-direction: column;
  height: 100%;
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
  background: #fff;
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
