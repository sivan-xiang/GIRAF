<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { branches, branchRegions, telHref } from '@/data/branches'
import { legalEntityCount } from '@/data/entities'
import EntityGrid from '@/components/EntityGrid.vue'
import RevealText from '@/components/effects/RevealText.vue'
import CountUp from '@/components/effects/CountUp.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, lang, link } = useSite()

const coverage = computed(() => {
  const list = tm('network.coverage.items')
  return Array.isArray(list) ? list : []
})

/** 每个区域下的网点 */
const groups = computed(() =>
  branchRegions
    .map((r) => ({ ...r, items: branches.filter((b) => b.region === r.id) }))
    .filter((g) => g.items.length)
)

/**
 * 统计口径：运营网点数、法定主体数、区域数。
 * 「法定主体」按登记名称去重（越南两家 office 同属一个法人），故为 7 而非 8。
 * 刻意不统计「总部」——集团总部在中国深圳，本站是品牌站，
 * 不把任何一家分公司（含汉堡）抬为站点主体。
 */
const totals = computed(() => ({
  branches: branches.length,
  entities: legalEntityCount,
  regions: branchRegions.length
}))

/** 网格上的城市标签：网点城市为登记原文，直接使用 */
const cityOf = (b) => b.city

/** 区域配色：取自品牌色，深色底上均可辨识 */
const SEG_COLORS = ['#fa5959', '#8aa6d8', '#f0b45a', '#4a6ba8', '#ff9a9a']
</script>

<template>
  <div class="atlas">
    <!--
      海图式刊头：经纬网格 + 航线斜线。
      与其他内页的极光 / 平面报头都不同——网络页的内容本身是地理分布，
      因此让背景直接承担「地图」的语义，而不是再加一层装饰。
    -->
    <section class="chart">
      <div class="chart__grid" aria-hidden="true"></div>
      <div class="chart__routes" aria-hidden="true"></div>
      <div class="chart__glow" aria-hidden="true"></div>

      <div class="wrap chart__inner">
        <nav class="crumbs rise" aria-label="Breadcrumb">
          <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span>{{ t('network.hero.crumb') }}</span>
        </nav>
        <span class="eyebrow rise" :style="{ '--d': '60ms' }">{{ t('network.hero.eyebrow') }}</span>
        <h1 class="chart__title"><RevealText :text="t('network.hero.title')" :step="42" /></h1>
        <p class="chart__text rise" :style="{ '--d': '220ms' }">{{ t('network.hero.text') }}</p>

        <dl class="legend rise" :style="{ '--d': '320ms' }">
          <div class="legend__i">
            <dt>{{ t('network.legend.branches') }}</dt>
            <dd><CountUp :to="totals.branches" :duration="1000" /></dd>
          </div>
          <div class="legend__i">
            <dt>{{ t('network.legend.entities') }}</dt>
            <dd><CountUp :to="totals.entities" :duration="1000" :delay="90" /></dd>
          </div>
          <div class="legend__i">
            <dt>{{ t('network.legend.markets') }}</dt>
            <dd><CountUp :to="totals.regions" :duration="1000" :delay="180" /></dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- 区域分栏 -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('network.regions.eyebrow') }}</span>
          <h2>{{ t('network.regions.title') }}</h2>
          <p class="lead">{{ t('network.regions.text') }}</p>
        </div>

        <!--
          区域概览用「分布条 + 名册」，不用等宽卡片列：
          中国有 22 个网点，其余区域各 1–3 个，等宽网格会让中国那一列拖出满屏空白。
          分布条按网点数分配宽度，把这种真实的不均衡直接呈现出来，而不是用留白掩盖。
        -->
        <div class="spread" v-reveal>
          <div class="spread__bar" aria-hidden="true">
            <span
              v-for="(g, i) in groups"
              :key="g.id"
              class="spread__seg"
              :style="{ flexGrow: g.items.length, background: SEG_COLORS[i % SEG_COLORS.length] }"
            ></span>
          </div>

          <ul class="spread__list">
            <li v-for="(g, i) in groups" :key="g.id" class="spread__row">
              <span class="spread__name">
                <i
                  class="spread__dot"
                  :style="{ background: SEG_COLORS[i % SEG_COLORS.length] }"
                ></i>
                {{ t(`network.region.${g.id}`) }}
              </span>
              <span class="spread__cities">
                <span
                  v-for="b in g.items"
                  :key="b.city"
                  class="spread__city"
                  :class="{ 'is-own': b.entity }"
                  :title="b.entity || undefined"
                >
                  {{ cityOf(b) }}
                </span>
              </span>
              <span class="spread__n">{{ String(g.items.length).padStart(2, '0') }}</span>
            </li>
          </ul>

          <p class="spread__legend">
            <span class="spread__city is-own">{{ t('network.own') }}</span>
          </p>
        </div>
      </div>
    </section>

    <!-- 网点名录：地址与电话，表格式 -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('network.directory.eyebrow') }}</span>
          <h2>{{ t('network.directory.title') }}</h2>
          <p class="lead">{{ t('network.directory.text') }}</p>
        </div>

        <div class="directory" v-reveal>
          <table>
            <thead>
              <tr>
                <th scope="col">{{ t('network.directory.colCity') }}</th>
                <th scope="col">{{ t('network.directory.colAddress') }}</th>
                <th scope="col">{{ t('network.directory.colPhone') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="b in branches" :key="b.city">
                <th scope="row">
                  <span class="directory__city">{{ b.city }}</span>
                  <span v-if="b.entity" class="directory__entity">{{ b.entity }}</span>
                </th>
                <td>{{ b.address }}</td>
                <td>
                  <a v-if="b.phone" class="directory__tel" :href="telHref(b.phone)">
                    <AppIcon name="phone" :size="13" />
                    {{ b.phone }}
                  </a>
                  <span v-else class="directory__none">{{ t('network.directory.onRequest') }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 全球法定主体 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('offices.eyebrow') }}</span>
          <h2>{{ t('offices.title') }}</h2>
          <p class="lead">{{ t('offices.text') }}</p>
        </div>
        <EntityGrid />
      </div>
    </section>

    <!-- 主体归属说明 + 覆盖内容 -->
    <section class="section section--tight">
      <div class="wrap">
        <div class="callout netnote" v-reveal>
          <span class="callout__t">{{ t('network.note.title') }}</span>
          {{ t('network.note.text') }}
        </div>

        <div class="coverlist">
          <div v-for="(c, i) in coverage" :key="i" class="coverlist__i" v-reveal="i * 70">
            <span class="coverlist__n">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="coverlist__k">{{ c.k }}</h3>
            <p class="coverlist__v">{{ c.v }}</p>
          </div>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* ---------- 海图刊头 ---------- */
.chart {
  position: relative;
  padding: clamp(2.6rem, 1.8rem + 3.6vw, 4.6rem) 0 clamp(2.2rem, 1.6rem + 2.8vw, 3.4rem);
  background: linear-gradient(165deg, var(--navy-950) 0%, #0a1830 60%, #10233f 100%);
  color: #fff;
  overflow: hidden;
}
/* 经纬网格：两级网格叠加，形成航海图的疏密感 */
.chart__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 132px 132px, 132px 132px, 22px 22px, 22px 22px;
  mask-image: radial-gradient(ellipse 120% 100% at 20% 0%, #000 20%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse 120% 100% at 20% 0%, #000 20%, transparent 78%);
  pointer-events: none;
}
/* 航线：两条虚线斜线，暗示东西向走廊 */
.chart__routes {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
      108deg,
      rgba(250, 89, 89, 0.3) 0 7px,
      transparent 7px 18px
    ),
    repeating-linear-gradient(64deg, rgba(110, 160, 230, 0.22) 0 7px, transparent 7px 20px);
  background-size: 100% 100%, 100% 100%;
  mask-image: linear-gradient(180deg, transparent 12%, #000 55%, transparent 96%);
  -webkit-mask-image: linear-gradient(180deg, transparent 12%, #000 55%, transparent 96%);
  opacity: 0.5;
  pointer-events: none;
}
.chart__glow {
  position: absolute;
  top: -50%;
  right: -14%;
  width: 44rem;
  height: 44rem;
  background: radial-gradient(circle, rgba(63, 111, 181, 0.3), transparent 62%);
  pointer-events: none;
}
.chart__inner {
  position: relative;
  z-index: 1;
}
.chart__title {
  max-width: 24ch;
  margin-bottom: 0.8rem;
  color: #fff;
  font-size: var(--fs-h1);
}
.chart__text {
  max-width: 58ch;
  color: var(--on-dark);
  font-size: var(--fs-lead);
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.4rem, 0.8rem + 2.2vw, 3rem);
  margin: clamp(1.8rem, 1.4rem + 1.6vw, 2.6rem) 0 0;
  padding-top: 1.3rem;
  border-top: 1px solid var(--hair-dark);
}
.legend__i dt {
  margin-bottom: 0.15rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
}
.legend__i dd {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  font-variant-numeric: tabular-nums;
}

/* ---------- 区域分布（分布条 + 名册） ---------- */
.spread__bar {
  display: flex;
  gap: 2px;
  height: 8px;
  margin-bottom: 1.6rem;
}
.spread__seg {
  flex: 1 1 0;
  min-width: 5px;
  border-radius: 2px;
  opacity: 0.88;
}

.spread__list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.spread__row {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr) 46px;
  gap: 0.7rem 1.5rem;
  align-items: baseline;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--hair-dark);
}
.spread__row:last-child {
  border-bottom: 0;
}
.spread__name {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  white-space: nowrap;
}
.spread__dot {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.spread__cities {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.8rem;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--body);
}
/* 自有网点：前置圆点 + 提亮字重，取代原先的「总部」实心徽标 */
.spread__city.is-own {
  color: var(--ink);
  font-weight: 600;
}
.spread__city.is-own::before {
  content: '';
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 0.4rem;
  border-radius: 50%;
  background: var(--coral);
  vertical-align: middle;
}
.spread__n {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--on-dark-muted);
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.spread__legend {
  display: flex;
  align-items: center;
  margin: 1.3rem 0 0;
  font-size: 0.8rem;
  color: var(--on-dark-muted);
}

/* ---------- 网点名录 ---------- */
.directory {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.directory table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.directory th,
.directory td {
  padding: 0.85rem 1.2rem;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--line);
}
.directory thead th {
  position: sticky;
  top: 0;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  background: var(--bg-soft);
  border-bottom: 1px solid var(--line);
}
.directory tbody th {
  width: 200px;
}
.directory__city {
  display: block;
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--ink);
}
.directory__entity {
  display: block;
  margin-top: 0.15rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--coral);
}
.directory tbody td {
  color: var(--body);
}
.directory__tel {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  white-space: nowrap;
}
.directory__none {
  font-size: 0.84rem;
  color: var(--muted);
  font-style: italic;
}
.directory tbody tr:last-child th,
.directory tbody tr:last-child td {
  border-bottom: 0;
}
.directory tbody tr:hover {
  background: var(--bg-soft);
}

/* ---------- 说明与覆盖清单 ---------- */
.netnote {
  margin-bottom: 2.4rem;
}

.coverlist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}
.coverlist__i {
  padding: 1.5rem 1.4rem;
  background: var(--surface-solid);
}
.coverlist__n {
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--coral);
  font-variant-numeric: tabular-nums;
}
.coverlist__k {
  margin-bottom: 0.35rem;
  font-size: 1.02rem;
}
.coverlist__v {
  margin: 0;
  font-size: 0.9rem;
  color: var(--body);
}

/* 窄屏：区域名与计数并排一行，城市名册折到下一行占满宽度 */
@media (max-width: 760px) {
  .spread__row {
    grid-template-columns: minmax(0, 1fr) 40px;
  }
  .spread__name {
    grid-column: 1;
    grid-row: 1;
  }
  .spread__n {
    grid-column: 2;
    grid-row: 1;
  }
  .spread__cities {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
</style>
