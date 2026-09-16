<script setup>
/**
 * GIRAF 全球法定主体网格（子公司 / 分公司）
 * 数据源：src/data/entities.js
 * 使用场景：网络页
 *
 * 设计约束：本站是品牌站，**所有主体平级并列**——不设「总部」标签，
 * 也不把任何一家分公司（含汉堡）凸显为站点主体。因此这里只显示区域标签。
 *
 * 说明：法定名称与注册地址为工商登记原文，**不随语言改写**；
 * 只有城市、国家、区域标签走多语言映射。
 */
import { useSite } from '@/composables/useSite'
import { entities, entityCity, entityCountry } from '@/data/entities'
import AppIcon from './AppIcon.vue'

const { t, lang } = useSite()
</script>

<template>
  <div class="entitygrid">
    <article v-for="(e, i) in entities" :key="e.key" class="entity" v-reveal="i * 55">
      <div class="entity__head">
        <span class="chip">{{ t(`offices.region.${e.region}`) }}</span>
      </div>

      <h3 class="entity__name">{{ e.legalName }}</h3>
      <p class="entity__place">{{ entityCity(e, lang) }}, {{ entityCountry(e, lang) }}</p>

      <div class="entity__addr">
        <span class="entity__label">{{ t('offices.registered') }}</span>
        <address>
          <span v-for="(l, li) in e.addressLines" :key="li">{{ l }}</span>
        </address>
      </div>

      <div class="entity__foot">
        <a v-if="e.phoneHref" class="entity__link" :href="`tel:${e.phoneHref}`">
          <AppIcon name="phone" :size="15" />
          <span>{{ e.phone }}</span>
        </a>
        <a v-if="e.email" class="entity__link" :href="`mailto:${e.email}`">
          <AppIcon name="mail" :size="15" />
          <span>{{ e.email }}</span>
        </a>
        <!-- 源站未公布电话的主体：如实说明，不指回任何一地的「总部」 -->
        <span v-if="!e.phoneHref && !e.email" class="entity__none">
          {{ t('offices.phoneOnRequest') }}
        </span>
      </div>
    </article>
  </div>
</template>
