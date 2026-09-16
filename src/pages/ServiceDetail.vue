<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { openQuote } from '@/composables/useQuote'
import { services, serviceBySlug } from '@/data/services'
import RevealText from '@/components/effects/RevealText.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const props = defineProps({
  slug: { type: String, required: true }
})

const { t, link } = useSite()

const svc = computed(() => serviceBySlug(props.slug))
const index = computed(() => services.findIndex((s) => s.slug === props.slug))
const prev = computed(() => (index.value > 0 ? services[index.value - 1] : null))
const next = computed(() =>
  index.value >= 0 && index.value < services.length - 1 ? services[index.value + 1] : null
)

/** 编号：01 … 10，与索引页同一套编排 */
const num = computed(() => String(index.value + 1).padStart(2, '0'))

/** 优势区的分栏编号在跨列时连续 */
const advNum = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div v-if="svc" class="spec-sheet" :class="`is-${svc.accent}`">
    <!--
      档案头：深色发丝网格 + 右侧规格面板。
      与其他页面的 .page-hero 不同——这里把「规格」当作内容的一部分直接露出，
      而不是先铺一段宣传语再往下滚动才看到事实。
    -->
    <section class="sheet">
      <div class="wrap sheet__inner">
        <div class="sheet__lead">
          <nav class="crumbs rise" aria-label="Breadcrumb">
            <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
            <span aria-hidden="true">/</span>
            <RouterLink :to="link('services')">{{ t('nav.services') }}</RouterLink>
            <span aria-hidden="true">/</span>
            <span>{{ svc.name }}</span>
          </nav>

          <span class="sheet__num rise" :style="{ '--d': '60ms' }" aria-hidden="true">{{ num }}</span>
          <span class="sheet__brand rise" :style="{ '--d': '120ms' }">{{ svc.brand }}</span>
          <h1 class="sheet__title"><RevealText :text="svc.name" :step="46" /></h1>
          <p class="sheet__tagline rise" :style="{ '--d': '220ms' }">{{ svc.tagline }}</p>

          <div class="sheet__actions rise" :style="{ '--d': '300ms' }">
            <button type="button" class="btn btn--primary" @click="openQuote">
              {{ t('common.ctaQuote') }}
              <AppIcon name="arrow" :size="16" />
            </button>
            <RouterLink class="tlink tlink--dark" :to="link('services')">
              {{ t('serviceDetail.allServices') }}
            </RouterLink>
          </div>
        </div>

        <!-- 规格面板 -->
        <aside class="specs rise" :style="{ '--d': '360ms' }">
          <span class="specs__hd">{{ t('serviceDetail.spec') }}</span>
          <dl class="specs__list">
            <div v-for="f in svc.facts" :key="f.k" class="specs__row">
              <dt>{{ f.k }}</dt>
              <dd>{{ f.v }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>

    <!-- 概述：左侧固定编号栏 + 右侧正文 -->
    <section class="section section--tight">
      <div class="wrap sheet__body">
        <span class="sheet__label">{{ t('serviceDetail.overview') }}</span>
        <div class="prose prose--lead">
          <p v-for="(p, i) in svc.intro" :key="i">{{ p }}</p>
        </div>
      </div>
    </section>

    <!-- 服务内容：编号轨道 -->
    <section v-if="svc.features?.length" class="section section--tight">
      <div class="wrap">
        <span class="sheet__label sheet__label--block">{{ t('serviceDetail.features') }}</span>
        <ol class="track">
          <li v-for="(f, i) in svc.features" :key="i" class="track__item" v-reveal="i * 45">
            <span class="track__n">{{ advNum(i) }}</span>
            <h2 class="track__t">{{ f.title }}</h2>
            <p v-if="f.text" class="track__d">{{ f.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 优势：发丝线编辑式清单（不是卡片） -->
    <section class="section section--soft">
      <div class="wrap">
        <span class="sheet__label sheet__label--block">{{ t('serviceDetail.advantages') }}</span>
        <div class="ledger">
          <article v-for="(a, i) in svc.advantages" :key="i" class="ledger__item" v-reveal="(i % 2) * 60">
            <span class="ledger__n">{{ advNum(i) }}</span>
            <div>
              <h3 class="ledger__t">{{ a.title }}</h3>
              <p class="ledger__d">{{ a.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!--
      内容驱动区块：结构随内容变化，不强行套同一模板。
      海运 / 空运 → 标签组；铁路 → 路线表；危品 → 双分组。
    -->
    <section v-if="svc.extra" class="section section--dark">
      <div class="wrap">
        <!-- 标签组 -->
        <template v-if="svc.extra.kind === 'chips'">
          <span class="sheet__label sheet__label--block on-dark">{{ svc.extra.label }}</span>
          <div class="chipwall">
            <span v-for="c in svc.extra.items" :key="c" class="chipwall__i" v-reveal>{{ c }}</span>
          </div>
        </template>

        <!-- 多列清单 -->
        <template v-else-if="svc.extra.kind === 'grid'">
          <span class="sheet__label sheet__label--block on-dark">{{ svc.extra.label }}</span>
          <ul class="capgrid">
            <li v-for="(c, i) in svc.extra.items" :key="i" class="capgrid__i" v-reveal="i * 25">
              <AppIcon name="check" :size="16" />
              <span>{{ c }}</span>
            </li>
          </ul>
        </template>

        <!-- 路线表 -->
        <template v-else-if="svc.extra.kind === 'table'">
          <span class="sheet__label sheet__label--block on-dark">{{ svc.extra.label }}</span>
          <div class="routetable">
            <table>
              <thead>
                <tr>
                  <th v-for="h in svc.extra.head" :key="h" scope="col">{{ h }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, i) in svc.extra.rows" :key="i">
                  <th scope="row">{{ row[0] }}</th>
                  <td>{{ row[1] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- 分组双档 -->
        <template v-else-if="svc.extra.kind === 'groups'">
          <div class="duo">
            <section v-for="(g, gi) in svc.extra.groups" :key="gi" class="duo__col" v-reveal="gi * 80">
              <span class="duo__tag">{{ String(gi + 1).padStart(2, '0') }}</span>
              <h2 class="duo__t">{{ g.title }}</h2>
              <p class="duo__d">{{ g.text }}</p>

              <ul class="duo__feat">
                <li v-for="(f, i) in g.features" :key="i">
                  <AppIcon name="check" :size="16" />
                  <span>{{ f.title }}</span>
                </li>
              </ul>

              <div class="duo__adv">
                <div v-for="(a, i) in g.advantages" :key="i" class="duo__advItem">
                  <h3>{{ a.title }}</h3>
                  <p>{{ a.text }}</p>
                </div>
              </div>
            </section>
          </div>
        </template>
      </div>
    </section>

    <!-- 同级服务：每一项都是一张独立的页 -->
    <section class="section section--tight">
      <div class="wrap">
        <span class="sheet__label sheet__label--block">{{ t('serviceDetail.more') }}</span>
        <div class="siblings">
          <RouterLink
            v-for="s in services.filter((x) => x.slug !== svc.slug)"
            :key="s.slug"
            class="siblings__i"
            :to="link(`service:${s.slug}`)"
          >
            <span>{{ s.name }}</span>
            <AppIcon name="arrow" :size="14" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- 上一条 / 下一条 -->
    <nav class="pager" :aria-label="t('serviceDetail.more')">
      <RouterLink v-if="prev" class="pager__i pager__i--prev" :to="link(`service:${prev.slug}`)">
        <span class="pager__k">{{ t('common.prev') }}</span>
        <span class="pager__v">{{ prev.name }}</span>
      </RouterLink>
      <span v-else class="pager__i pager__i--empty"></span>

      <RouterLink v-if="next" class="pager__i pager__i--next" :to="link(`service:${next.slug}`)">
        <span class="pager__k">{{ t('common.next') }}</span>
        <span class="pager__v">{{ next.name }}</span>
      </RouterLink>
    </nav>

    <SectionCta />
  </div>
</template>

<style scoped>
/* 主色由服务的 accent 决定：deep-sea / air / rail 三种语气 */
.spec-sheet {
  --accent: var(--coral);
  --accent-soft: rgba(250, 89, 89, 0.14);
}
.spec-sheet.is-sand {
  --accent: var(--sand);
  --accent-soft: rgba(240, 180, 90, 0.16);
}
.spec-sheet.is-steel {
  --accent: #6ea0e6;
  --accent-soft: rgba(110, 160, 230, 0.16);
}

/* ---------- 档案头 ---------- */
.sheet {
  position: relative;
  padding: clamp(2.4rem, 1.6rem + 3.4vw, 4.2rem) 0 clamp(2.6rem, 1.8rem + 3.4vw, 4.4rem);
  background: linear-gradient(160deg, var(--navy-950) 0%, var(--navy-800) 62%, #223d68 100%);
  color: #fff;
  overflow: hidden;
}
.sheet::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
  background-size: 46px 46px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 88%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 88%);
  pointer-events: none;
}
.sheet::after {
  content: '';
  position: absolute;
  top: -46%;
  right: -12%;
  width: 44rem;
  height: 44rem;
  background: radial-gradient(circle, var(--accent-soft), transparent 62%);
  pointer-events: none;
}
.sheet__inner {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(2rem, 1.2rem + 3vw, 3.6rem);
  align-items: start;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
}
.sheet__num {
  display: block;
  margin-bottom: -0.4rem;
  font-size: clamp(3.4rem, 2rem + 5vw, 6rem);
  font-weight: 800;
  line-height: 0.86;
  letter-spacing: -0.05em;
  color: rgba(255, 255, 255, 0.09);
  font-variant-numeric: tabular-nums;
}
.sheet__brand {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.sheet__title {
  margin-bottom: 0.6rem;
  color: #fff;
  font-size: var(--fs-h1);
}
.sheet__tagline {
  max-width: 46ch;
  margin-bottom: 1.9rem;
  color: var(--on-dark);
  font-size: var(--fs-lead);
}
.sheet__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.4rem;
}

/* 规格面板 */
.specs {
  padding: 1.5rem 1.5rem 1.2rem;
  border: 1px solid var(--hair-dark);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
}
.specs__hd {
  display: block;
  margin-bottom: 1rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--hair-dark);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}
.specs__list {
  margin: 0;
}
.specs__row {
  display: grid;
  gap: 0.15rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.specs__row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}
.specs__row dt {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
}
.specs__row dd {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 500;
  color: #fff;
  line-height: 1.5;
}

/* ---------- 章节小标签（左栏编号语义） ---------- */
.sheet__body {
  display: grid;
  gap: 1.4rem;
  grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
}
.sheet__label {
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.sheet__label--block {
  display: block;
  margin-bottom: 1.6rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--line);
}
.sheet__label.on-dark {
  color: rgba(255, 255, 255, 0.5);
  border-color: var(--hair-dark);
}
.prose--lead p {
  font-size: var(--fs-lead);
}

/* ---------- 服务内容轨道 ---------- */
.track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.track__item {
  padding: 1.5rem 1.4rem;
  background: var(--surface-solid);
}
.track__n {
  display: block;
  margin-bottom: 0.7rem;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--coral);
  font-variant-numeric: tabular-nums;
}
.track__t {
  margin-bottom: 0.4rem;
  font-size: 1.02rem;
  letter-spacing: -0.012em;
}
.track__d {
  margin: 0;
  font-size: 0.88rem;
  color: var(--body);
}

/* ---------- 优势台账（发丝线，无卡片） ---------- */
.ledger {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
  border-top: 1px solid var(--line);
}
.ledger__item {
  display: grid;
  grid-template-columns: 3.1rem minmax(0, 1fr);
  gap: 0.4rem;
  padding: 1.6rem 1.8rem 1.6rem 0;
  border-bottom: 1px solid var(--line);
}
.ledger__item:nth-child(odd) {
  padding-right: 2.4rem;
  border-right: 1px solid var(--line);
}
.ledger__item:nth-child(even) {
  padding-left: 2.4rem;
}
.ledger__n {
  font-size: 1.02rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--coral);
  font-variant-numeric: tabular-nums;
  line-height: 1.5;
}
.ledger__t {
  margin-bottom: 0.45rem;
  font-size: 1.02rem;
}
.ledger__d {
  margin: 0;
  font-size: 0.9rem;
  color: var(--body);
}
@media (max-width: 860px) {
  .ledger {
    grid-template-columns: 1fr;
  }
  .ledger__item:nth-child(odd) {
    padding-right: 0;
    border-right: 0;
  }
  .ledger__item:nth-child(even) {
    padding-left: 0;
  }
}

/* ---------- 标签墙 ---------- */
.chipwall {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.chipwall__i {
  padding: 0.5rem 0.95rem;
  border: 1px solid var(--hair-dark);
  border-radius: 999px;
  font-size: 0.88rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
}

/* ---------- 能力清单 ---------- */
.capgrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.9rem 2rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.capgrid__i {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: var(--on-dark);
}
.capgrid__i svg {
  flex: 0 0 auto;
  color: var(--coral);
}

/* ---------- 路线表 ---------- */
.routetable {
  overflow-x: auto;
  border: 1px solid var(--hair-dark);
  border-radius: var(--radius);
}
.routetable table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.routetable th,
.routetable td {
  padding: 0.78rem 1.1rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}
.routetable thead th {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
  background: rgba(255, 255, 255, 0.03);
}
.routetable tbody th {
  width: 190px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}
.routetable tbody td {
  color: var(--on-dark);
}
.routetable tbody tr:last-child th,
.routetable tbody tr:last-child td {
  border-bottom: 0;
}
.routetable tbody tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

/* ---------- 双分组 ---------- */
.duo {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(1.6rem, 1rem + 2vw, 3rem);
}
.duo__col {
  padding-top: 1.6rem;
  border-top: 2px solid var(--coral);
}
.duo__tag {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  color: var(--coral-300);
}
.duo__t {
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 1.3rem;
}
.duo__d {
  margin-bottom: 1.4rem;
  font-size: 0.92rem;
  color: var(--on-dark);
}
.duo__feat {
  display: grid;
  gap: 0.5rem;
  margin: 0 0 1.6rem;
  padding: 0;
  list-style: none;
}
.duo__feat li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.9rem;
  color: #fff;
}
.duo__feat svg {
  flex: 0 0 auto;
  margin-top: 0.22rem;
  color: var(--coral);
}
.duo__adv {
  display: grid;
  gap: 0.9rem;
  padding-top: 1.2rem;
  border-top: 1px solid var(--hair-dark);
}
.duo__advItem h3 {
  margin-bottom: 0.2rem;
  font-size: 0.86rem;
  letter-spacing: 0.02em;
  color: var(--coral-300);
  text-transform: uppercase;
}
.duo__advItem p {
  margin: 0;
  font-size: 0.89rem;
  color: var(--on-dark);
}
@media (max-width: 880px) {
  .duo {
    grid-template-columns: 1fr;
  }
}

/* ---------- 同级服务 ---------- */
.siblings {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.siblings__i {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.95rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--ink);
  transition: border-color 0.2s var(--ease), color 0.2s var(--ease), background 0.2s var(--ease);
}
.siblings__i:hover {
  border-color: var(--coral);
  background: var(--coral-soft);
  color: var(--coral);
}

/* ---------- 上一条 / 下一条 ---------- */
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.pager__i {
  display: grid;
  gap: 0.3rem;
  padding: 1.5rem clamp(1.2rem, 0.6rem + 2vw, 2.4rem);
}
.pager__i--prev {
  border-right: 1px solid var(--line);
}
.pager__i--next {
  text-align: right;
}
.pager__i:hover .pager__v {
  color: var(--coral);
}
.pager__k {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.pager__v {
  font-size: 1.06rem;
  font-weight: 700;
  color: var(--ink);
}

/* ---------- 响应式 ---------- */
@media (max-width: 940px) {
  .sheet__inner {
    grid-template-columns: 1fr;
  }
  .sheet__body {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 620px) {
  .pager {
    grid-template-columns: 1fr;
  }
  .pager__i--prev {
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }
  .pager__i--next {
    text-align: left;
  }
  .ledger__item {
    grid-template-columns: 2.4rem minmax(0, 1fr);
  }
}
</style>
