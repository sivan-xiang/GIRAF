<script setup>
/**
 * Magnet — Vue Bits 官方 <Magnet /> 组件的移植（https://vue-bits.dev/animations/magnet）
 * ------------------------------------------------------------------
 * 官方版本基于 motion-v；此处改写为直接写 DOM style，
 * 省掉 motion-v（约 40KB）依赖，且绕开每次 mousemove 触发 Vue 重渲染的开销。
 * 行为与官方一致：光标进入 padding 范围内时吸附并偏移，离开后回弹。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /** 触发吸附的额外距离（px） */
  padding: { type: Number, default: 100 },
  disabled: { type: Boolean, default: false },
  /** 数值越大偏移越小 */
  magnetStrength: { type: Number, default: 2 },
  activeTransition: { type: String, default: 'transform 0.3s ease-out' },
  inactiveTransition: { type: String, default: 'transform 0.5s ease-in-out' }
})

const wrap = ref(null)
const inner = ref(null)
let active = false

const apply = (x, y, isActive) => {
  const el = inner.value
  if (!el) return
  // 状态切换时才改 transition，避免每次移动都重写样式
  if (isActive !== active) {
    active = isActive
    el.style.transition = isActive ? props.activeTransition : props.inactiveTransition
  }
  el.style.transform = `translate3d(${x}px, ${y}px, 0)`
}

const onMove = (e) => {
  const el = wrap.value
  if (!el) return
  if (props.disabled) {
    if (active) apply(0, 0, false)
    return
  }

  const { left, top, width, height } = el.getBoundingClientRect()
  const cx = left + width / 2
  const cy = top + height / 2
  const dx = Math.abs(cx - e.clientX)
  const dy = Math.abs(cy - e.clientY)

  if (dx < width / 2 + props.padding && dy < height / 2 + props.padding) {
    apply((e.clientX - cx) / props.magnetStrength, (e.clientY - cy) / props.magnetStrength, true)
  } else {
    apply(0, 0, false)
  }
}

const reset = () => apply(0, 0, false)

onMounted(() => {
  if (window.matchMedia?.('(hover: hover)').matches === false) return
  window.addEventListener('mousemove', onMove, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <div ref="wrap" class="magnet">
    <div ref="inner" class="magnet__inner" @mouseleave="reset">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.magnet {
  position: relative;
  display: inline-block;
}
.magnet__inner {
  display: inline-block;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .magnet__inner {
    transform: none !important;
  }
}
</style>
