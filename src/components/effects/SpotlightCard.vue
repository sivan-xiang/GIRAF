<script setup>
import { ref } from 'vue'

/**
 * SpotlightCard —— 类 Vue Bits <SpotlightCard />。
 * 光标位置驱动的径向高光，同时点亮卡片边框。
 * 用 CSS 变量传递坐标，避免每次 mousemove 触发 Vue 重新渲染。
 *
 * 变体：dark —— 用于深色区块，改为玻璃质感深卡（品牌海军蓝面）。
 */
const props = defineProps({
  /** 亮色面上的高光色 */
  color: { type: String, default: 'rgba(250, 89, 89, 0.16)' },
  /** 深色面上的高光色 */
  colorDark: { type: String, default: 'rgba(255, 255, 255, 0.11)' },
  size: { type: Number, default: 300 },
  /** 深色区块变体 */
  dark: { type: Boolean, default: false },
  /** 是否禁用（如触屏设备） */
  disabled: { type: Boolean, default: false }
})

const el = ref(null)

const onMove = (e) => {
  if (props.disabled || !el.value) return
  const r = el.value.getBoundingClientRect()
  el.value.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.value.style.setProperty('--my', `${e.clientY - r.top}px`)
}

const onEnter = () => {
  if (props.disabled || !el.value) return
  el.value.style.setProperty('--spot', '1')
}

const onLeave = () => {
  if (!el.value) return
  el.value.style.setProperty('--spot', '0')
}
</script>

<template>
  <div
    ref="el"
    class="spot"
    :class="{ 'spot--dark': dark }"
    :style="{ '--spot-color': dark ? colorDark : color, '--spot-size': `${size}px` }"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <div class="spot__layer"></div>
    <div class="spot__border"></div>
    <div class="spot__content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spot {
  position: relative;
  isolation: isolate;
  border-radius: var(--radius);
  background: var(--surface-solid);
  border: 1px solid var(--line);
  transition: transform 0.28s var(--ease), box-shadow 0.28s var(--ease),
    border-color 0.28s var(--ease);
}

/* 内部光斑 */
.spot__layer {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: var(--spot, 0);
  transition: opacity 0.32s var(--ease);
  background: radial-gradient(
    var(--spot-size) circle at var(--mx, 50%) var(--my, 50%),
    var(--spot-color),
    transparent 72%
  );
  pointer-events: none;
  z-index: 0;
}

/* 跟随光标的描边高光 */
.spot__border {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  opacity: var(--spot, 0);
  transition: opacity 0.32s var(--ease);
  background: radial-gradient(
    calc(var(--spot-size) * 0.9) circle at var(--mx, 50%) var(--my, 50%),
    var(--border-glow, rgba(250, 89, 89, 0.55)),
    transparent 70%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}

.spot__content {
  position: relative;
  z-index: 1;
  padding: 1.7rem 1.6rem;
  height: 100%;
}

.spot:hover {
  transform: translateY(-4px);
  border-color: #cfdaea;
  box-shadow: var(--sh-3);
}

/* ---------- 深色区块变体 ---------- */
.spot--dark {
  --border-glow: rgba(255, 154, 154, 0.6);
  border-color: var(--hair-dark);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.022));
  backdrop-filter: blur(12px);
}
.spot--dark:hover {
  border-color: rgba(255, 255, 255, 0.24);
}
.spot--dark :deep(h3),
.spot--dark :deep(.card__title),
.spot--dark :deep(.glass__title) {
  color: #fff;
}
.spot--dark :deep(p),
.spot--dark :deep(.glass__text),
.spot--dark :deep(.card__text) {
  color: var(--on-dark);
}

@media (hover: none) {
  .spot__layer,
  .spot__border {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spot:hover {
    transform: none;
  }
}
</style>
