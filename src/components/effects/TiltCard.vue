<script setup>
/**
 * TiltCard — Vue Bits 官方 <TiltedCard /> 组件的移植（https://vue-bits.dev/components/tiltedcard）
 * ------------------------------------------------------------------
 * 官方版本基于 motion-v 的 spring 动画；此处改用 CSS transition + 直接写 style，
 * 保持同样的倾斜手感但零额外依赖。
 * 与官方差异：振幅刻意调低（默认 7°），适配 B2B 企业站的克制调性，
 * 并叠加一层跟随光标的高光（glare），强化「实体卡片」的材质感。
 */
import { ref } from 'vue'

const props = defineProps({
  /** 最大倾斜角度（度） */
  rotateAmplitude: { type: Number, default: 7 },
  scaleOnHover: { type: Number, default: 1.012 },
  /** 光标高光 */
  glare: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false }
})

const card = ref(null)
const inner = ref(null)
let raf = null

const write = (rx, ry, sc) => {
  const el = inner.value
  if (!el) return
  el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`
}

const onMove = (e) => {
  const el = card.value
  const box = inner.value
  if (!el || !box || props.disabled) return

  const rect = el.getBoundingClientRect()
  const ox = e.clientX - rect.left - rect.width / 2
  const oy = e.clientY - rect.top - rect.height / 2

  const ry = (ox / (rect.width / 2)) * props.rotateAmplitude
  const rx = (oy / (rect.height / 2)) * -props.rotateAmplitude

  // 高光坐标用百分比，写进 CSS 变量交给样式层渲染
  box.style.setProperty('--tx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  box.style.setProperty('--ty', `${((e.clientY - rect.top) / rect.height) * 100}%`)

  if (raf) return
  raf = requestAnimationFrame(() => {
    raf = null
    write(rx, ry, props.scaleOnHover)
  })
}

const onEnter = () => {
  inner.value?.classList.add('is-hover')
}

const onLeave = () => {
  if (raf) {
    cancelAnimationFrame(raf)
    raf = null
  }
  inner.value?.classList.remove('is-hover')
  write(0, 0, 1)
}
</script>

<template>
  <div
    ref="card"
    class="tilt"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div ref="inner" class="tilt__inner">
      <slot />
      <div v-if="glare" class="tilt__glare" aria-hidden="true"></div>
    </div>
  </div>
</template>

<style scoped>
.tilt {
  perspective: 1100px;
  height: 100%;
}
.tilt__inner {
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
  will-change: transform;
}
.tilt__inner.is-hover {
  transition: transform 0.12s ease-out;
}
.tilt__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s var(--ease);
  background: radial-gradient(
    420px circle at var(--tx, 50%) var(--ty, 50%),
    rgba(255, 255, 255, 0.16),
    transparent 62%
  );
}
.tilt__inner.is-hover .tilt__glare {
  opacity: 1;
}

/* 触屏无悬停语义，直接关闭 */
@media (hover: none) {
  .tilt__inner {
    transform: none !important;
  }
  .tilt__glare {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tilt__inner {
    transform: none !important;
    transition: none;
  }
  .tilt__glare {
    display: none;
  }
}
</style>
