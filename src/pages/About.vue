<script setup>
import { computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company, mailto, fullAddress } from '@/data/company'
import { milestones, statements } from '@/data/milestones'
import { qualifications, memberships, rankings } from '@/data/credentials'
import RevealText from '@/components/effects/RevealText.vue'
import CountUp from '@/components/effects/CountUp.vue'
import SectionCta from '@/components/SectionCta.vue'
import AppIcon from '@/components/AppIcon.vue'

const { t, tm, lang, link } = useSite()

const facts = computed(() => {
  const list = tm('about.facts.rows')
  return Array.isArray(list) ? list : []
})

const addressText = computed(() => fullAddress(lang.value))

/** 编年史按年份倒序，与参考站一致 */
const chronicle = [...milestones].sort((a, b) => Number(b.year) - Number(a.year))
</script>

<template>
  <div class="chronicle">
    <!--
      刊头：左标题、右年份。
      其他内页是「一段宣传语 + 一组卡片」，这里把 1997 直接当作版面元素，
      因为对公司页而言，「从哪一年开始」本身就是最有说服力的信息。
    -->
    <section class="masthead">
      <div class="wrap masthead__inner">
        <div>
          <nav class="crumbs rise" aria-label="Breadcrumb">
            <RouterLink :to="link('home')">{{ t('nav.home') }}</RouterLink>
            <span aria-hidden="true">/</span>
            <span>{{ t('about.hero.crumb') }}</span>
          </nav>
          <span class="eyebrow rise" :style="{ '--d': '60ms' }">{{ t('about.hero.eyebrow') }}</span>
          <h1 class="masthead__title"><RevealText :text="t('about.hero.title')" :step="44" /></h1>
          <p class="masthead__text rise" :style="{ '--d': '220ms' }">{{ t('about.hero.text') }}</p>
        </div>

        <aside class="anchor rise" :style="{ '--d': '320ms' }">
          <span class="anchor__label">{{ t('about.anchor.founded') }}</span>
          <span class="anchor__year">1997</span>
          <span class="anchor__place">
            <AppIcon name="pin" :size="15" />
            Shenzhen, China
          </span>
          <span class="anchor__rule" aria-hidden="true"></span>
          <span class="anchor__figs">
            <span class="anchor__fig"><CountUp :to="36" /><small>{{ t('about.anchor.branches') }}</small></span>
            <span class="anchor__fig"><CountUp :to="450" suffix="k" /><small>TEU 2024</small></span>
          </span>
        </aside>
      </div>
    </section>

    <!-- 简介 + 事实栏 -->
    <section class="section">
      <div class="wrap grid--aside">
        <div v-reveal>
          <span class="sheet-label">{{ t('about.profile.eyebrow') }}</span>
          <h2>{{ t('about.profile.title') }}</h2>
          <div class="prose">
            <p v-for="(p, i) in tm('about.profile.paragraphs')" :key="i" :class="{ dropcap: i === 0 }">
              {{ p }}
            </p>
          </div>
        </div>

        <aside class="factspane" v-reveal="120">
          <span class="sheet-label">{{ t('about.facts.title') }}</span>
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

    <!-- ============ 编年史：本页的版面核心 ============ -->
    <section class="section section--dark">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('about.timeline.eyebrow') }}</span>
          <h2>{{ t('about.timeline.title') }}</h2>
          <p class="lead">{{ t('about.timeline.text') }}</p>
        </div>

        <ol class="tl">
          <li v-for="(m, i) in chronicle" :key="m.year" class="tl__i" v-reveal="Math.min(i, 6) * 30">
            <span class="tl__year">{{ m.year }}</span>
            <span class="tl__rail" aria-hidden="true"></span>
            <div class="tl__body">
              <h3 class="tl__kw">{{ m.keyword }}</h3>
              <p class="tl__text">{{ m.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- 使命 / 愿景 / 价值观 -->
    <section class="statements">
      <div class="wrap">
        <div v-for="(s, i) in statements" :key="s.id" class="statement" v-reveal="i * 60">
          <div class="statement__head">
            <span class="statement__kind">{{ s.kind }}</span>
            <h2 class="statement__title">{{ s.title }}</h2>
          </div>
          <ul class="statement__list">
            <li v-for="(p, j) in s.points" :key="j">{{ p }}</li>
          </ul>
          <span class="statement__n" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
      </div>
    </section>

    <!-- 资质与排名 -->
    <section class="section section--soft">
      <div class="wrap">
        <div class="section-head" v-reveal>
          <span class="eyebrow">{{ t('about.credentials.eyebrow') }}</span>
          <h2>{{ t('about.credentials.title') }}</h2>
        </div>

        <div class="creds">
          <div class="creds__col" v-reveal>
            <span class="sheet-label">{{ t('about.credentials.qualifications') }}</span>
            <ul class="awards">
              <li v-for="q in qualifications" :key="q.title" class="awards__i">
                <span class="awards__y">{{ q.year }}</span>
                <span class="awards__t">{{ q.title }}</span>
                <span class="awards__d">{{ q.issuer }}</span>
              </li>
            </ul>
          </div>

          <div class="creds__col" v-reveal="80">
            <span class="sheet-label">{{ t('about.credentials.rankings') }}</span>
            <ol class="ranks">
              <li v-for="(r, i) in rankings" :key="r.title" class="ranks__i">
                <span class="ranks__n">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>
                  <span class="ranks__t">{{ r.title }}</span>
                  <span class="ranks__d">{{ r.note }}</span>
                </span>
              </li>
            </ol>

            <span class="sheet-label sheet-label--mt">{{ t('about.credentials.memberships') }}</span>
            <div class="chiprow">
              <span v-for="m in memberships" :key="m" class="tag">{{ m }}</span>
            </div>
          </div>
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
          <a class="btn btn--primary" :href="mailto(t('about.careers.subject'), '')">
            {{ t('about.careers.cta') }}
            <AppIcon name="arrow" :size="17" />
          </a>
          <a class="careers__mail" :href="`mailto:${company.email}`">{{ company.email }}</a>
        </div>
      </div>
    </section>

    <SectionCta />
  </div>
</template>

<style scoped>
/* 章节小标签（与公司页的印刷语气一致，不用全大写标签块） */
.sheet-label {
  display: block;
  margin-bottom: 1rem;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.sheet-label--mt {
  margin-top: 2rem;
}

/* ---------- 刊头 ---------- */
.masthead {
  padding: clamp(2.6rem, 1.8rem + 3.4vw, 4.4rem) 0 clamp(2.4rem, 1.8rem + 3vw, 3.8rem);
  background: linear-gradient(160deg, var(--navy-950) 0%, var(--navy-800) 68%, #223d68 100%);
  color: #fff;
}
.masthead__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.8fr);
  gap: clamp(2rem, 1.2rem + 3vw, 4rem);
  align-items: center;
}
.masthead__title {
  max-width: 22ch;
  margin-bottom: 0.8rem;
  color: #fff;
  font-size: var(--fs-h1);
}
.masthead__text {
  max-width: 56ch;
  margin-bottom: 0;
  color: var(--on-dark);
  font-size: var(--fs-lead);
}

.anchor {
  display: grid;
  justify-items: start;
  padding: 1.6rem 1.6rem 1.4rem;
  border: 1px solid var(--hair-dark);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.035);
}
.anchor__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--coral-300);
}
.anchor__year {
  display: block;
  margin: 0.2rem 0 0.5rem;
  font-size: clamp(3.2rem, 2rem + 4.4vw, 5rem);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.06em;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.anchor__place {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.86rem;
  color: var(--on-dark);
}
.anchor__rule {
  width: 100%;
  height: 1px;
  margin: 1.2rem 0 0.9rem;
  background: var(--hair-dark);
}
.anchor__figs {
  display: flex;
  gap: 2rem;
}
.anchor__fig {
  display: grid;
  font-size: 1.3rem;
  font-weight: 800;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
.anchor__fig small {
  margin-top: 0.15rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--on-dark-muted);
}

/* ---------- 事实栏 ---------- */
.factspane {
  padding: clamp(1.5rem, 1.2rem + 1.4vw, 2.1rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-soft);
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

/* ---------- 编年史 ---------- */
.tl {
  margin: 0;
  padding: 0;
  list-style: none;
}
.tl__i {
  display: grid;
  grid-template-columns: 6.5rem 1.6rem minmax(0, 1fr);
  gap: 0 clamp(0.6rem, 0.3rem + 1vw, 1.4rem);
  min-height: 5.6rem;
}
.tl__year {
  padding-top: 0.15rem;
  font-size: clamp(1.1rem, 0.98rem + 0.6vw, 1.42rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #fff;
  font-variant-numeric: tabular-nums;
}
/* 竖轴：由每条自绘一段，接起来即成为连续的线，末条自动收尾 */
.tl__rail {
  position: relative;
  display: block;
}
.tl__rail::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0.5rem;
  bottom: 0;
  width: 1px;
  margin-left: -0.5px;
  background: var(--hair-dark);
}
.tl__i:last-child .tl__rail::before {
  bottom: auto;
  height: 1.4rem;
}
.tl__rail::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 0.34rem;
  width: 9px;
  height: 9px;
  margin-left: -4.5px;
  border-radius: 50%;
  background: var(--navy-950);
  border: 2px solid var(--coral);
}
.tl__body {
  padding-bottom: 2.1rem;
}
.tl__kw {
  margin-bottom: 0.3rem;
  font-size: 1.02rem;
  letter-spacing: 0.01em;
  color: var(--coral-300);
  text-transform: uppercase;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.tl__text {
  max-width: 74ch;
  margin: 0;
  font-size: 0.93rem;
  color: var(--on-dark);
}

/* ---------- 使命 / 愿景 / 价值观 ---------- */
.statements {
  padding: clamp(2.6rem, 2rem + 2.6vw, 4rem) 0;
}
.statement {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(1rem, 0.4rem + 2vw, 2.6rem);
  align-items: start;
  padding: clamp(1.6rem, 1.2rem + 1.6vw, 2.4rem) 0;
  border-top: 1px solid var(--line);
}
.statement:last-child {
  border-bottom: 1px solid var(--line);
}
.statement__kind {
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--coral);
}
.statement__title {
  margin: 0;
  font-size: clamp(1.3rem, 1.05rem + 1.1vw, 1.86rem);
  letter-spacing: -0.028em;
}
.statement__list {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.statement__list li {
  padding: 0.42rem 0;
  border-bottom: 1px solid var(--line-soft);
  font-size: 0.96rem;
  color: var(--body);
}
.statement__n {
  position: absolute;
  top: 1.2rem;
  right: 0;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: var(--line-soft);
  font-variant-numeric: tabular-nums;
}

/* ---------- 资质与排名 ---------- */
.creds {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(1.8rem, 1.2rem + 2.4vw, 3.4rem);
}
.awards {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 2px solid var(--ink);
}
.awards__i {
  display: grid;
  grid-template-columns: 3.4rem minmax(0, 1fr);
  gap: 0 0.8rem;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--line);
}
.awards__y {
  grid-row: span 2;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--coral);
  font-variant-numeric: tabular-nums;
  padding-top: 0.1rem;
}
.awards__t {
  font-size: 0.96rem;
  font-weight: 700;
  color: var(--ink);
}
.awards__d {
  font-size: 0.84rem;
  color: var(--muted);
}

.ranks {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 2px solid var(--ink);
}
.ranks__i {
  display: grid;
  grid-template-columns: 2.2rem minmax(0, 1fr);
  gap: 0.8rem;
  padding: 0.78rem 0;
  border-bottom: 1px solid var(--line);
}
.ranks__n {
  font-size: 0.8rem;
  font-weight: 800;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  padding-top: 0.15rem;
}
.ranks__t {
  display: block;
  font-size: 0.94rem;
  font-weight: 600;
  color: var(--ink);
}
.ranks__d {
  display: block;
  font-size: 0.82rem;
  color: var(--muted);
}

/* ---------- 招聘 ---------- */
.careers {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2.4rem;
  padding: clamp(1.8rem, 1.4rem + 1.6vw, 2.8rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  /*
    深色主题下的抬升卡片：玻璃面 + 品牌色光晕 + 左侧竖条，
    而不是原来那块平直的浅色渐变（var(--bg-soft) → #fff，light 主题遗留）。
  */
  background: linear-gradient(135deg, var(--surface-solid-2) 0%, var(--bg-soft) 62%, var(--bg) 100%);
  box-shadow: var(--sh-2);
}
/* 右上角品牌色柔光，避免整块矩形显得平 */
.careers::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -58%;
  right: -12%;
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, var(--coral) 0%, transparent 64%);
  opacity: 0.16;
  pointer-events: none;
}
/* 左侧品牌色竖条：与页脚 legalNote 的同款视觉语言 */
.careers::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  top: 14%;
  bottom: 14%;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: linear-gradient(180deg, var(--coral), rgba(250, 89, 89, 0.08));
  pointer-events: none;
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

/* ---------- 响应式 ---------- */
@media (max-width: 980px) {
  .masthead__inner,
  .creds {
    grid-template-columns: 1fr;
  }
  .statement {
    grid-template-columns: 1fr;
  }
  .statement__n {
    display: none;
  }
}
@media (max-width: 620px) {
  .tl__i {
    grid-template-columns: 4.2rem 1.2rem minmax(0, 1fr);
  }
  .anchor__figs {
    gap: 1.4rem;
  }
}

/*
  名单类行的悬停反馈。About 一页里有三处「表格式名单」（大事记 / 荣誉 / 排名），
  原本一行反馈都没有——扫读时指针落在哪一行完全看不出来。
  统一给一套克制的反馈：行底色极淡地抬起、年份或标题转强调色、标题右移 2px，
  时间轴则把轴点放大并亮起一圈光晕（轴点本身就是这一页的视觉锚）。
*/
.awards__i,
.ranks__i,
.tl__year,
.awards__t,
.ranks__t {
  transition: background 0.22s var(--ease), color 0.22s var(--ease),
    transform 0.22s var(--ease);
}
.awards__i:hover,
.ranks__i:hover {
  background: rgba(255, 255, 255, 0.03);
}
.awards__i:hover .awards__t,
.ranks__i:hover .ranks__t {
  color: var(--coral);
  transform: translateX(2px);
}
.tl__rail::after {
  transition: transform 0.22s var(--ease), box-shadow 0.22s var(--ease);
}
.tl__i:hover .tl__rail::after {
  transform: scale(1.4);
  box-shadow: 0 0 0 5px rgba(250, 89, 89, 0.1);
}
.tl__i:hover .tl__year {
  color: var(--coral);
}
@media (prefers-reduced-motion: reduce) {
  .awards__i:hover .awards__t,
  .ranks__i:hover .ranks__t {
    transform: none;
  }
}
</style>
