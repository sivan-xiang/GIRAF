<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

/**
 * CountUp —— 类 Vue Bits <CountUp />。
 * 进入视口后按缓动曲线从 from 递增到 to；支持前后缀、千分位与小数位。
 */
const props = defineProps({
  to: { type: Number, required: true },
  from: { type: Number, default: 0 },
  duration: { type: Number, default: 1800 },
  decimals: { type: Number, default: 0 },
  separator: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  delay: { type: Number, default: 0 }
})

const el = ref(null)
const current = ref(props.from)
let raf = null
let observer = null
let started = false

const format = (n) => {
  // 兜底：调用方若误传 prop 名（例如写成 :value 而非 :to），props.to 会是 undefined。
  // 不兜底则 undefined.toFixed() 直接抛错并打断整页渲染，故此处退化为起始值。
  const safe = Number.isFinite(Number(n)) ? Number(n) : props.from
  let out = safe.toFixed(props.decimals)
  if (props.separator) {
    const [int, dec] = out.split('.')
    out = int.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator) + (dec ? '.' + dec : '')
  }
  return props.prefix + out + props.suffix
}

const displayed = ref(format(props.from))

// 缓出三次曲线，末段更从容
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

const run = () => {
  if (started) return
  started = true
  // 目标值必须先归一化：props.to 若非法（调用方误传 prop 名）则退化为起始值。
  // ⚠️ 必须在任何提前 return 之前完成——reduce 分支用到 target，
  // 若把定义放在 reduce 判断之后会造成 TDZ（访问未初始化的绑定）并抛错。
  const target = Number.isFinite(Number(props.to)) ? Number(props.to) : props.from
  // 数字动效属于纯装饰，尊重「减少动态效果」偏好
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    displayed.value = format(target)
    return
  }

  const startAt = performance.now() + props.delay
  const span = target - props.from

  const tick = (now) => {
    if (now < startAt) {
      raf = requestAnimationFrame(tick)
      return
    }
    const t = Math.min((now - startAt) / props.duration, 1)
    current.value = props.from + span * easeOutCubic(t)
    displayed.value = format(current.value)
    if (t < 1) raf = requestAnimationFrame(tick)
    else displayed.value = format(target)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    run()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        run()
        observer.disconnect()
        observer = null
      }
    },
    { threshold: 0.35 }
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => {
  if (raf) cancelAnimationFrame(raf)
  if (observer) observer.disconnect()
})

watch(
  () => props.to,
  (v) => {
    if (started) displayed.value = format(v)
  }
)
</script>

<template>
  <span ref="el" class="countup">{{ displayed }}</span>
</template>

<style scoped>
.countup {
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}
</style>
