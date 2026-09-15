<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, mailto, fullAddress } from '@/data/company'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import RevealText from '@/components/effects/RevealText.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import GlowButton from '@/components/effects/GlowButton.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, lang, link } = useSite()

const VALUE_ICONS = ['handshake', 'clock', 'doc', 'users']

const paragraphs = computed(() => {
  const list = tm('about.profile.paragraphs')
  return Array.isArray(list) ? list : []
})
const facts = computed(() => {
  const list = tm('about.facts.rows')
  return Array.isArray(list) ? list : []
})
const values = computed(() => {
  const list = tm('about.values.items')
  return Array.isArray(list) ? list : []
})
const sustainPoints = computed(() => {
  const list = tm('about.sustainability.points')
  return Array.isArray(list) ? list : []
})

const addressText = computed(() => fullAddress(lang.value))
</script>

<template>
  <div>
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#fa5959', '#3f6fb5']"
        :speed="0.7"
        :amplitude="0.58"
      />
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('about.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('about.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('about.hero.title')" :step="44" /></h1>
        <p>{{ t('about.hero.text') }}</p>
      </div>
    </section>

    <!-- 公司简介 + 事实表 -->
    <section class="section">
      <div class="wrap grid--aside">
        <div v-reveal>
          <span class="eyebrow">{{ t('about.profile.eyebrow') }}</span>
          <h2>{{ t('about.profile.title') }}</h2>
          <div class="prose">
            <p
              v-for="(p, i) in paragraphs"
              :key="i"
              :class="{ dropcap: i === 0 }"
            >
              {{ p }}
            </p>
          </div>
        </div>

        <aside class="factspane" v-reveal="120">
          <h3 class="factspane__h">{{ t('about.facts.title') }}</h3>
          <div class="info-list">
            <div v-for="(f, i) in facts" :key="i" class="info-list__row">
              <span class="info-list__k">{{ f.k }}</span>
              <span class="info-list__v">{{ f.v }}</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__k">{{ t('common.address') }}</span>
              <span class="info-list__v">{{ addressText }}</span>
            </div>
          </div>
          <a class="factspane__mail" :href="`mailto:${company.email}`">
            <AppIcon name="mail" :size="17" />
            {{ company.email }}
          </a>
        </aside>
      </div>
    </section>

    <!-- 四条工作原则 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('about.values.eyebrow') }}</span>
          <h2>{{ t('about.values.title') }}</h2>
        </div>
        <div class="grid grid--4">
          <SpotlightCard v-for="(v, i) in values" :key="i" v-reveal="i * 60">
            <span class="vcard__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="icon-box" :class="i % 2 ? '' : 'icon-box--coral'">
              <AppIcon :name="VALUE_ICONS[i % VALUE_ICONS.length]" />
            </div>
            <h3 class="card__title">{{ v.title }}</h3>
            <p class="card__text">{{ v.text }}</p>
          </SpotlightCard>
        </div>
      </div>
    </section>

    <!-- 可持续 -->
    <section class="section section--dark">
      <div class="wrap grid--aside">
        <div v-reveal>
          <span class="eyebrow">{{ t('about.sustainability.eyebrow') }}</span>
          <h2>{{ t('about.sustainability.title') }}</h2>
          <p class="lead">{{ t('about.sustainability.text') }}</p>
        </div>
        <div class="glass" v-reveal="110">
          <div class="icon-box icon-box--dark">
            <AppIcon name="leaf" />
          </div>
          <ul class="checklist">
            <li v-for="(p, i) in sustainPoints" :key="i">
              <AppIcon name="check" :size="18" />
              <span>{{ p }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 招聘 -->
    <section class="section">
      <div class="wrap careers" v-reveal>
        <div class="careers__body">
          <span class="eyebrow">{{ t('about.careers.eyebrow') }}</span>
          <h2>{{ t('about.careers.title') }}</h2>
          <p class="lead">{{ t('about.careers.text') }}</p>
          <p class="careers__note">{{ t('about.careers.note') }}</p>
        </div>
        <div class="careers__action">
          <GlowButton
            :href="mailto(t('about.careers.subject'), '')"
            variant="primary"
            size="lg"
          >
            {{ t('about.careers.cta') }}
            <AppIcon name="arrow" :size="17" />
          </GlowButton>
          <a class="careers__mail" :href="`mailto:${company.email}`">{{ company.email }}</a>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
.factspane {
  padding: clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-soft);
}
.factspane__h {
  margin-bottom: 1.1rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.factspane__mail {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.4rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--line);
  width: 100%;
  font-size: 0.9rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}

/* 浅色卡上的序号 */
.vcard__n {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--coral);
  font-variant-numeric: tabular-nums;
}

.careers {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.4rem;
  padding: clamp(1.8rem, 1.4rem + 1.6vw, 2.8rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: linear-gradient(140deg, var(--bg-soft), #fff);
}
.careers__body {
  max-width: 44rem;
}
.careers__note {
  margin: 0;
  font-size: 0.86rem;
  color: var(--muted);
}
.careers__action {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-start;
}
.careers__mail {
  font-size: 0.86rem;
  font-weight: 600;
  overflow-wrap: anywhere;
}
</style>
