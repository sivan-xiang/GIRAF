<script setup>
/**
 * 联系页 —— 以「全球公司目录」为主体的版式
 *
 * 设计意图：本站是 GIRAF 品牌站，不针对任何一家分公司。
 * 因此本页不设「总部联络卡」，而是把全部自有公司平级并列成一份可扫读的登记式目录：
 *   每行 = 登记名称 + 注册地址 + 直拨电话（有则附邮箱）。
 * 布局语言与网络页（海图 / 航线）、服务页（能力索引）刻意不同——
 * 本页的内容类型是「找对人」，所以用索引条 + 分区登记册，而不是卡片墙。
 *
 * 数据来源：src/data/entities.js（登记原文，不随语言翻译；仅城市/国家标签随语言）
 */
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { mailto } from '@/data/company'
import { entitiesByRegion, entityCity, entityCountry } from '@/data/entities'
import AuroraBackground from '@/components/effects/AuroraBackground.vue'
import RevealText from '@/components/effects/RevealText.vue'
import GlowButton from '@/components/effects/GlowButton.vue'
import ContactForm from '@/components/ContactForm.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, lang, link } = useSite()

/** 按区域分组的公司目录（分组顺序由 entities.js 的 REGIONS 声明顺序决定） */
const groups = computed(() => entitiesByRegion())

/** 区域名走文案树；锚点 id 直接由区域键派生，避免两处维护 */
const regionName = (r) => t(`offices.region.${r}`)
const anchorOf = (r) => `region-${r}`
</script>

<template>
  <div>
    <!-- 刊头：联系页的语义是「选择联系人」，报头保持克制，把注意力让给下方目录 -->
    <section class="page-hero">
      <AuroraBackground
        :color-stops="['#0d1526', '#fa5959', '#3f6fb5']"
        :speed="0.75"
        :amplitude="0.6"
      />
      <div class="wrap">
        <nav class="crumbs rise" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('contact.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow rise" :style="{ '--d': '60ms' }">{{ t('contact.hero.eyebrow') }}</span>
        <h1><RevealText :text="t('contact.hero.title')" :step="44" /></h1>
        <p class="rise" :style="{ '--d': '220ms' }">{{ t('contact.hero.text') }}</p>
      </div>
    </section>

    <!-- 全球公司目录：本页主体 -->
    <section class="section">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('contact.directory.eyebrow') }}</span>
          <h2>{{ t('contact.directory.title') }}</h2>
          <p class="lead">{{ t('contact.directory.text') }}</p>
        </div>

        <!-- 区域索引条：目录较长，先给一个可跳转的入口而不是让人一路滚 -->
        <nav class="jump" aria-label="Region">
          <span class="jump__label">{{ t('contact.directory.jump') }}</span>
          <a
            v-for="g in groups"
            :key="g.region"
            class="jump__link"
            :href="`#${anchorOf(g.region)}`"
          >
            {{ regionName(g.region) }}
            <em>{{ g.items.length }}</em>
          </a>
        </nav>

        <div class="registry">
          <section
            v-for="g in groups"
            :id="anchorOf(g.region)"
            :key="g.region"
            class="regblock"
          >
            <h3 class="regblock__h">
              <span class="regblock__name">{{ regionName(g.region) }}</span>
              <span class="regblock__line" aria-hidden="true"></span>
            </h3>

            <article v-for="(e, i) in g.items" :key="e.key" class="office" v-reveal="i * 45">
              <div class="office__id">
                <h4 class="office__name">{{ e.legalName }}</h4>
                <p class="office__place">
                  <AppIcon name="pin" :size="14" />
                  <span>{{ entityCity(e, lang) }}, {{ entityCountry(e, lang) }}</span>
                </p>
              </div>

              <div class="office__addr">
                <span class="office__label">{{ t('contact.directory.colAddress') }}</span>
                <address>
                  <span v-for="(l, li) in e.addressLines" :key="li">{{ l }}</span>
                </address>
              </div>

              <div class="office__reach">
                <span class="office__label">{{ t('contact.directory.colPhone') }}</span>
                <a v-if="e.phoneHref" class="office__tel" :href="`tel:${e.phoneHref}`">
                  {{ e.phone }}
                </a>
                <span v-else class="office__none">{{ t('contact.directory.noPhone') }}</span>

                <template v-if="e.email">
                  <span class="office__label office__label--gap">
                    {{ t('contact.directory.colEmail') }}
                  </span>
                  <a class="office__mail" :href="`mailto:${e.email}`">{{ e.email }}</a>
                </template>
              </div>
            </article>
          </section>
        </div>
      </div>
    </section>

    <!-- 询价表单：品牌级入口，提交后由系统按市场分派 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="enquiry" v-reveal>
          <ContactForm />
          <p class="routing">
            <AppIcon name="arrow" :size="15" />
            <span>{{ t('contact.routing') }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- 索赔与货损 -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="claimband" v-reveal>
          <div class="claimband__icon">
            <AppIcon name="shield" :size="26" />
          </div>
          <div class="claimband__body">
            <h3>{{ t('contact.claims.title') }}</h3>
            <p>{{ t('contact.claims.text') }}</p>
          </div>
          <GlowButton :href="mailto(t('contact.claims.title'))" variant="primary" size="md">
            {{ t('contact.claims.cta') }}
            <AppIcon name="arrow" :size="16" />
          </GlowButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- 区域索引条 ---------- */
.jump {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem);
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--line-soft);
}
.jump__label {
  margin-right: 0.3rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted-soft);
}
.jump__link {
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.34rem 0.72rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--body);
  transition: color 0.2s var(--ease), border-color 0.2s var(--ease), background 0.2s var(--ease);
}
.jump__link em {
  font-style: normal;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--muted-soft);
}
.jump__link:hover {
  border-color: rgba(250, 89, 89, 0.5);
  background: var(--coral-soft);
  color: var(--ink);
}
.jump__link:hover em {
  color: var(--coral-300);
}

/* ---------- 分区登记册 ---------- */
.regblock {
  /* 锚点跳转时给吸顶导航留出空间 */
  scroll-margin-top: calc(var(--header-h) + 18px);
}
.regblock + .regblock {
  margin-top: clamp(2rem, 1.5rem + 2vw, 3.2rem);
}
.regblock__h {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin: 0 0 0.9rem;
  font-size: inherit;
}
.regblock__name {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--coral-300);
  white-space: nowrap;
}
.regblock__line {
  flex: 1 1 auto;
  height: 1px;
  background: linear-gradient(90deg, var(--line-strong), transparent);
}

/* ---------- 单家公司 ---------- */
.office {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1.1fr) minmax(0, 0.95fr);
  gap: 1.3rem 2rem;
  align-items: start;
  padding: clamp(1.15rem, 1rem + 0.7vw, 1.5rem) clamp(1.1rem, 1rem + 0.7vw, 1.55rem);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  background: var(--surface);
  transition: border-color 0.24s var(--ease), background 0.24s var(--ease),
    box-shadow 0.24s var(--ease);
}
.office + .office {
  margin-top: 0.7rem;
}
.office:hover {
  border-color: rgba(250, 89, 89, 0.34);
  background: var(--surface-2);
  box-shadow: var(--glow-soft);
}
.office__name {
  margin: 0 0 0.42rem;
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--ink);
}
.office__place {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0;
  font-size: 0.88rem;
  color: var(--muted);
}
.office__place svg {
  flex: 0 0 auto;
  color: var(--coral);
}
.office__label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.69rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--muted-soft);
}
.office__label--gap {
  margin-top: 0.85rem;
}
.office__addr address {
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-size: 0.9rem;
  line-height: 1.62;
  color: var(--body);
}
.office__tel,
.office__mail {
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: var(--ink);
  overflow-wrap: anywhere;
  transition: color 0.2s var(--ease);
}
.office__tel {
  font-size: 0.96rem;
}
.office__mail {
  font-size: 0.88rem;
  font-weight: 500;
}
.office__tel:hover,
.office__mail:hover {
  color: var(--coral-300);
}
.office__none {
  display: block;
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--muted);
}

/* ---------- 询价表单区 ---------- */
.enquiry {
  max-width: 780px;
  margin-inline: auto;
}
.routing {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  margin: 1.3rem 0 0;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--muted);
}
.routing svg {
  flex: 0 0 auto;
  margin-top: 0.2rem;
  color: var(--coral);
}

/* ---------- 索赔条 ---------- */
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

/* ---------- 响应式 ---------- */
@media (max-width: 980px) {
  .office {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
  .office__reach {
    grid-column: 1 / -1;
  }
}
@media (max-width: 640px) {
  .office {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.15rem;
  }
  .office__reach {
    grid-column: auto;
  }
  .jump__label {
    display: none;
  }
}
</style>
