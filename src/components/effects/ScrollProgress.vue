<script setup>
/**
 * ScrollProgress —— 顶部阅读进度条。
 * 用 rAF 节流 + transform: scaleX（不触发布局），成本可忽略。
 * 遵循 prefers-reduced-motion 时整体隐藏。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const pct = ref(0)
let ticking = false

const update = () => {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  pct.value = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0
  ticking = false
}

const onScroll = () => {
  if (ticking) return
  ticking = true
  requestAnimationFrame(update)
}

onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="sprog" aria-hidden="true">
    <div class="sprog__bar" :style="{ transform: `scaleX(${pct})` }"></div>
  </div>
</template>

<style scoped>
.sprog {
  position: fixed;
  inset-inline: 0;
  top: 0;
  z-index: 95;
  height: 2px;
  pointer-events: none;
}
.sprog__bar {
  height: 100%;
  transform: scaleX(0);
  transform-origin: 0 50%;
  background: linear-gradient(90deg, var(--coral), #ffb27a);
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .sprog {
    display: none;
  }
}
</style>
