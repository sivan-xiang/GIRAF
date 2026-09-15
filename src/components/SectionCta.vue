<script setup>
import { useSite } from '@/composables/useSite'
import { company } from '@/data/company'
import GlowButton from './effects/GlowButton.vue'
import Magnet from './effects/Magnet.vue'
import AppIcon from './AppIcon.vue'

/**
 * SectionCta —— 页尾行动区。文案默认取首页 CTA，可按页覆写。
 */
const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  primaryLabel: { type: String, default: '' }
})

const { t, link } = useSite()
</script>

<template>
  <section class="ctaband">
    <div class="wrap ctaband__inner">
      <div>
        <h2>{{ props.title || t('home.cta.title') }}</h2>
        <p>{{ props.text || t('home.cta.text') }}</p>
      </div>
      <div class="ctaband__actions">
        <Magnet :padding="60" :magnet-strength="6">
          <GlowButton :to="link('contact')" variant="primary" size="lg">
            {{ props.primaryLabel || t('home.cta.primary') }}
            <AppIcon name="arrow" :size="17" />
          </GlowButton>
        </Magnet>
        <GlowButton :href="`tel:${company.phoneHref}`" variant="onDark" size="lg" :glow="false">
          <AppIcon name="phone" :size="17" />
          {{ company.phone }}
        </GlowButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ctaband__actions {
  flex: 0 0 auto;
}
</style>
