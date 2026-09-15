<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, mailto, fullAddress } from '@/data/company'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import RevealText from '@/components/effects/RevealText.vue'
import SpotlightCard from '@/components/effects/SpotlightCard.vue'
import GlowButton from '@/components/effects/GlowButton.vue'
import ContactForm from '@/components/ContactForm.vue'
import EntityGrid from '@/components/EntityGrid.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, lang, link } = useSite()

const addressText = computed(() => fullAddress(lang.value))

/** 顶部三张联络卡 */
const cards = computed(() => [
  {
    icon: 'phone',
    label: t('common.phone'),
    value: company.phone,
    href: `tel:${company.phoneHref}`
  },
  {
    icon: 'mail',
    label: t('common.email'),
    value: company.email,
    href: `mailto:${company.email}`
  },
  {
    icon: 'pin',
    label: t('common.address'),
    value: addressText.value,
    href: null
  }
])

/** 工商与税务信息（与 Impressum 同源，避免不一致） */
const legalRows = computed(() => [
  { k: t('contact.details.mgmt'), v: company.managingDirector },
  { k: t('contact.details.register'), v: `${company.registerCourt}, ${company.registerNumber}` },
  { k: t('contact.details.vat'), v: company.vatId },
  { k: t('contact.details.tax'), v: company.taxNumber },
  { k: t('contact.details.web'), v: company.website }
])
</script>

<template>
  <div>
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#fa5959', '#3f6fb5']"
        :speed="0.75"
        :amplitude="0.6"
      />
      <div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('contact.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow">{{ t('contact.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('contact.hero.title')" :step="44" /></h1>
        <p>{{ t('contact.hero.text') }}</p>
      </div>
    </section>

    <!-- 联络卡 -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="grid grid--3">
          <SpotlightCard v-for="(c, i) in cards" :key="i" v-reveal="i * 65">
            <div class="icon-box" :class="i === 1 ? 'icon-box--coral' : ''">
              <AppIcon :name="c.icon" />
            </div>
            <span class="ccard__label">{{ c.label }}</span>
            <a v-if="c.href" class="ccard__value" :href="c.href">{{ c.value }}</a>
            <span v-else class="ccard__value ccard__value--plain">{{ c.value }}</span>
          </SpotlightCard>
        </div>
      </div>
    </section>

    <!-- 表单 + 详情 -->
    <section class="section section--soft">
      <div class="wrap grid--aside">
        <div v-reveal>
          <ContactForm />
        </div>

        <aside class="cdetail" v-reveal="110">
          <h2 class="cdetail__h">{{ t('contact.details.title') }}</h2>

          <div class="info-list">
            <div class="info-list__row">
              <span class="info-list__k">{{ t('contact.details.company') }}</span>
              <span class="info-list__v">{{ company.legalName }}</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__k">{{ t('contact.details.address') }}</span>
              <span class="info-list__v">{{ addressText }}</span>
            </div>
            <div class="info-list__row">
              <span class="info-list__k">{{ t('contact.details.phone') }}</span>
              <span class="info-list__v"><a :href="`tel:${company.phoneHref}`">{{ company.phone }}</a></span>
            </div>
            <div class="info-list__row">
              <span class="info-list__k">{{ t('contact.details.email') }}</span>
              <span class="info-list__v"><a :href="`mailto:${company.email}`">{{ company.email }}</a></span>
            </div>
            <div class="info-list__row">
              <span class="info-list__k">{{ t('contact.details.hours') }}</span>
              <span class="info-list__v">{{ t('common.officeHoursValue') }}</span>
            </div>
            <div v-for="(r, i) in legalRows" :key="i" class="info-list__row">
              <span class="info-list__k">{{ r.k }}</span>
              <span class="info-list__v">{{ r.v }}</span>
            </div>
          </div>

          <p class="cdetail__note">
            <AppIcon name="pin" :size="16" />
            {{ t('contact.mapNote') }}
          </p>

          <div class="cdetail__actions">
            <GlowButton :href="`tel:${company.phoneHref}`" variant="ghost" size="sm" :glow="false">
              <AppIcon name="phone" :size="15" />
              {{ t('common.ctaCall') }}
            </GlowButton>
            <GlowButton :href="mailto()" variant="ghost" size="sm" :glow="false">
              <AppIcon name="mail" :size="15" />
              {{ t('common.ctaMail') }}
            </GlowButton>
          </div>
        </aside>
      </div>
    </section>

    <!-- 区域法定主体：就近联络（数据同网络页，单一来源） -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('offices.contact.eyebrow') }}</span>
          <h2>{{ t('offices.contact.title') }}</h2>
          <p class="lead">{{ t('offices.contact.text') }}</p>
        </div>
        <EntityGrid />
      </div>
    </section>

    <!-- 索赔与货损 -->
    <section class="section section--soft section--tight">
      <div class="wrap">
        <div class="claimband" v-reveal>
          <div class="claimband__icon">
            <AppIcon name="shield" :size="26" />
          </div>
          <div class="claimband__body">
            <h3>{{ t('contact.claims.title') }}</h3>
            <p>{{ t('contact.claims.text') }}</p>
          </div>
          <GlowButton
            :href="mailto(t('contact.claims.title'))"
            variant="primary"
            size="md"
          >
            {{ t('contact.claims.cta') }}
            <AppIcon name="arrow" :size="16" />
          </GlowButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ccard__label {
  display: block;
  margin-bottom: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}
.ccard__value {
  display: block;
  font-size: 1.02rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.45;
  overflow-wrap: anywhere;
}
a.ccard__value:hover {
  color: var(--coral);
}
.ccard__value--plain {
  color: var(--ink);
  font-weight: 600;
}

.cdetail {
  padding: clamp(1.6rem, 1.3rem + 1.4vw, 2.3rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: #fff;
  box-shadow: var(--sh-2);
}
.cdetail__h {
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
}
.cdetail__note {
  display: flex;
  gap: 0.55rem;
  align-items: flex-start;
  margin: 1.5rem 0 0;
  padding-top: 1.4rem;
  border-top: 1px solid var(--line-soft);
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--muted);
}
.cdetail__note svg {
  flex: 0 0 auto;
  margin-top: 0.15rem;
  color: var(--coral);
}
.cdetail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.5rem;
}

.claimband {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  padding: clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem);
  border: 1px solid var(--line);
  border-left: 3px solid var(--coral);
  border-radius: var(--radius);
  background: var(--bg-soft);
}
.claimband__icon {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 54px;
  height: 54px;
  border-radius: 15px;
  background: var(--coral-soft);
  color: var(--coral);
}
.claimband__body {
  flex: 1 1 22rem;
}
.claimband__body h3 {
  margin-bottom: 0.35rem;
  font-size: 1.08rem;
}
.claimband__body p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--body);
}
</style>
