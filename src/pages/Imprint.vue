<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, fullAddress } from '@/data/company'
import RevealText from '@/components/effects/RevealText.vue'

const { t, lang, link } = useSite()

const addressText = computed(() => fullAddress(lang.value))
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('imprint.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('imprint.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('imprint.hero.title')" :step="70" /></h1>
        <p>{{ t('imprint.hero.text') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap-narrow prose">
        <h2>{{ t('imprint.sections.provider') }}</h2>
        <p>
          {{ company.legalName }}<br />
          {{ addressText }}
        </p>

        <h2>{{ t('imprint.sections.represented') }}</h2>
        <p>
          {{ company.managingDirector }}<br />
          {{ t('contact.details.mgmt') }}
        </p>

        <h2>{{ t('imprint.sections.contact') }}</h2>
        <p>
          {{ t('common.phone') }}: <a :href="`tel:${company.phoneHref}`">{{ company.phone }}</a><br />
          {{ t('common.email') }}:
          <a :href="`mailto:${company.email}`">{{ company.email }}</a><br />
          {{ t('contact.details.web') }}: {{ company.website }}
        </p>

        <h2>{{ t('imprint.sections.register') }}</h2>
        <p>{{ company.registerCourt }}, {{ company.registerNumber }}</p>

        <h2>{{ t('imprint.sections.vat') }}</h2>
        <p>{{ company.vatId }}</p>

        <h2>{{ t('imprint.sections.tax') }}</h2>
        <p>{{ company.taxNumber }}</p>

        <h2>{{ t('imprint.sections.responsible') }}</h2>
        <p>
          {{ company.managingDirector }}<br />
          {{ addressText }}
        </p>

        <h2>{{ t('imprint.sections.dispute') }}</h2>
        <p>{{ t('imprint.disputeText') }}</p>

        <h2>{{ t('imprint.sections.liability') }}</h2>
        <p>{{ t('imprint.liabilityText') }}</p>

        <h2>{{ t('imprint.sections.links') }}</h2>
        <p>{{ t('imprint.linksText') }}</p>

        <h2>{{ t('imprint.sections.copyright') }}</h2>
        <p>{{ t('imprint.copyrightText') }}</p>

        <hr class="divider" />

        <p class="imprint__foot">
          <RouterLink class="tlink" :to="link('privacy')">{{ t('common.privacy') }}</RouterLink>
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.imprint__foot {
  margin: 0;
}
</style>
