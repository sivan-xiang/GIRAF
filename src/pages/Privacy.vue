<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import RevealText from '@/components/effects/RevealText.vue'

const { t, tm, link } = useSite()

const sections = computed(() => {
  const list = tm('privacy.sections')
  return Array.isArray(list) ? list : []
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('privacy.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('privacy.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('privacy.hero.title')" :step="70" /></h1>
        <p>{{ t('privacy.hero.text') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap-narrow">
        <p class="lead" v-reveal>{{ t('privacy.intro') }}</p>

        <div class="prose privacy">
          <section v-for="(s, i) in sections" :key="i" v-reveal="30">
            <h2>{{ s.h }}</h2>
            <p>{{ s.p }}</p>
          </section>
        </div>

        <hr class="divider" />

        <p class="privacy__foot">
          <RouterLink class="tlink" :to="link('imprint')">{{ t('common.imprint') }}</RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.privacy :deep(section) {
  padding-top: 0.4rem;
}
.privacy :deep(h2) {
  font-size: clamp(1.12rem, 1.02rem + 0.5vw, 1.34rem);
}
.privacy :deep(p) {
  color: var(--body);
}
.privacy__foot {
  margin: 0;
}
</style>
