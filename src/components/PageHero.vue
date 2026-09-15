<script setup>
import { useSite } from '@/composables/useSite'

const props = defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  text: { type: String, default: '' },
  crumb: { type: String, default: '' }
})

const { t, link } = useSite()
</script>

<template>
  <section class="page-hero">
    <div class="wrap">
      <nav class="crumbs" aria-label="Breadcrumb">
        <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
        <span aria-hidden="true">/</span>
        <span>{{ props.crumb || props.title }}</span>
      </nav>
      <span v-if="props.eyebrow" class="eyebrow">{{ props.eyebrow }}</span>
      <h1>{{ props.title }}</h1>
      <p v-if="props.text">{{ props.text }}</p>
    </div>
  </section>
</template>
