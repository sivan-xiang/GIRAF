<script setup>
import { computed } from 'vue'
import CountUp from './effects/CountUp.vue'

/**
 * StatsBand —— 数据条。数值部分交给 CountUp 做入场递增，
 * 非数字后缀（如 "30+" 的 "+"）单独保留。
 */
const props = defineProps({
  stats: { type: Array, required: true },
  light: { type: Boolean, default: false }
})

const parsed = computed(() =>
  props.stats.map((s, i) => {
    const m = String(s.value).match(/^(\d+)(.*)$/)
    return {
      ...s,
      num: m ? Number(m[1]) : null,
      suffix: m ? m[2] : '',
      delay: i * 110
    }
  })
)
</script>

<template>
  <div class="stats" :class="{ 'stats--light': light }">
    <div v-for="(s, i) in parsed" :key="i" class="stat">
      <span class="stat__v">
        <CountUp v-if="s.num !== null" :to="s.num" :suffix="s.suffix" :delay="s.delay" :duration="1700" />
        <template v-else>{{ s.value }}</template>
      </span>
      <span class="stat__l">{{ s.label }}</span>
      <span class="stat__n">{{ s.note }}</span>
    </div>
  </div>
</template>
