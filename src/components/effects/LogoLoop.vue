<script setup>
/**
 * LogoLoop — Vue Bits 官方 <LogoLoop /> 组件的移植（https://vue-bits.dev/animations/logoloop）
 * ------------------------------------------------------------------
 * 改造点：Tailwind 类名 → scoped CSS；TS → JS。
 * 动效算法保留官方实现：rAF 累加位移 + 指数平滑速度（SMOOTH_TAU），
 * 因此悬停暂停/恢复是缓入缓出的，而不是生硬急停。
 * 序列宽度不足容器时自动补足副本数，避免宽屏下出现空档。
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  /** [{ label, href?, src?, alt? }] —— 有 src 渲染图片，否则渲染文字 */
  items: { type: Array, required: true },
  /** 位移速度，px/秒 */
  speed: { type: Number, default: 90 },
  direction: { type: String, default: 'left' }, // left | right
  logoHeight: { type: Number, default: 28 },
  gap: { type: Number, default: 48 },
  /** 两侧渐隐遮罩 */
  fadeOut: { type: Boolean, default: true },
  /** 渐隐遮罩颜色，默认取当前背景 */
  fadeColor: { type: String, default: '' },
  pauseOnHover: { type: Boolean, default: true },
  scaleOnHover: { type: Boolean, default: false },
  ariaLabel: { type: String, default: 'Partner logos' }
})

const SMOOTH_TAU = 0.25
const MIN_COPIES = 2
const COPY_HEADROOM = 2

const root = ref(null)
const track = ref(null)
const seq = ref(null)

const seqWidth = ref(0)
const copyCount = ref(MIN_COPIES)
const hovered = ref(false)

let rafId = null
let lastTs = null
let offset = 0
let velocity = 0
let ro = null
let onWinResize = null

const copies = computed(() => Array.from({ length: copyCount.value }, (_, i) => i))

const directionSign = computed(() => (props.direction === 'left' ? 1 : -1))

const rootStyle = computed(() => ({
  '--ll-gap': `${props.gap}px`,
  '--ll-h': `${props.logoHeight}px`,
  ...(props.fadeColor ? { '--ll-fade': props.fadeColor } : {})
}))

const measure = async () => {
  await nextTick()
  const cw = root.value?.clientWidth ?? 0
  const sw = Math.ceil(seq.value?.getBoundingClientRect?.().width ?? 0)
  if (sw <= 0) return
  seqWidth.value = sw
  copyCount.value = Math.max(MIN_COPIES, Math.ceil(cw / sw) + COPY_HEADROOM)
}

const prefersReduced = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

const stop = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
  lastTs = null
}

const start = () => {
  stop()
  const el = track.value
  if (!el) return

  if (prefersReduced() || seqWidth.value <= 0) {
    el.style.transform = 'translate3d(0,0,0)'
    return
  }

  const tick = (ts) => {
    if (lastTs === null) lastTs = ts
    const dt = Math.max(0, ts - lastTs) / 1000
    lastTs = ts

    const target = hovered.value && props.pauseOnHover ? 0 : props.speed * directionSign.value
    // 指数平滑：速度不会瞬变，悬停时是缓慢停下而非急停
    const ease = 1 - Math.exp(-dt / SMOOTH_TAU)
    velocity += (target - velocity) * ease

    const w = seqWidth.value
    if (w > 0) {
      offset = (((offset + velocity * dt) % w) + w) % w
      el.style.transform = `translate3d(${-offset}px, 0, 0)`
    }
    rafId = requestAnimationFrame(tick)
  }

  rafId = requestAnimationFrame(tick)
}

onMounted(async () => {
  await measure()
  start()
  if ('ResizeObserver' in window) {
    ro = new ResizeObserver(measure)
    if (root.value) ro.observe(root.value)
    if (seq.value) ro.observe(seq.value)
  } else {
    onWinResize = measure
    window.addEventListener('resize', onWinResize)
  }
})

onBeforeUnmount(() => {
  stop()
  ro?.disconnect()
  if (onWinResize) window.removeEventListener('resize', onWinResize)
})

watch(
  () => [props.items, props.gap, props.logoHeight, props.direction],
  async () => {
    await measure()
    start()
  },
  { deep: true }
)

watch(
  () => [props.speed, props.pauseOnHover],
  () => start()
)
</script>

<template>
  <div
    ref="root"
    class="lloop"
    role="region"
    :aria-label="ariaLabel"
    :style="rootStyle"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div v-if="fadeOut" class="lloop__fade lloop__fade--l" aria-hidden="true"></div>
    <div v-if="fadeOut" class="lloop__fade lloop__fade--r" aria-hidden="true"></div>

    <div ref="track" class="lloop__track">
      <ul
        v-for="c in copies"
        :key="c"
        :ref="
          (el) => {
            if (c === 0) seq = el
          }
        "
        class="lloop__seq"
        :aria-hidden="c > 0 ? 'true' : undefined"
      >
        <li v-for="(it, i) in items" :key="`${c}-${i}`" class="lloop__item">
          <a
            v-if="it.href"
            class="lloop__link"
            :href="it.href"
            target="_blank"
            rel="noreferrer noopener"
            :aria-label="it.alt || it.label"
          >
            <img v-if="it.src" :src="it.src" :alt="it.alt || ''" :style="{ height: `${logoHeight}px` }" />
            <span v-else class="lloop__text" :style="{ fontSize: `${logoHeight}px` }">{{ it.label }}</span>
          </a>
          <template v-else>
            <img v-if="it.src" :src="it.src" :alt="it.alt || ''" :style="{ height: `${logoHeight}px` }" />
            <span v-else class="lloop__text" :style="{ fontSize: `${logoHeight}px` }">{{ it.label }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.lloop {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  --ll-fade: var(--bg);
  padding-block: calc(var(--ll-h) * 0.14);
}
.lloop__track {
  display: flex;
  flex-direction: row;
  width: max-content;
  will-change: transform;
  user-select: none;
}
.lloop__seq {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}
.lloop__item {
  flex: none;
  margin-right: var(--ll-gap);
  line-height: 1;
}
.lloop__link {
  display: inline-flex;
  align-items: center;
  color: inherit;
  text-decoration: none;
}
.lloop__text {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
}
.lloop__item img {
  display: block;
  width: auto;
  object-fit: contain;
  -webkit-user-drag: none;
  pointer-events: none;
}

.lloop__fade {
  position: absolute;
  inset-block: 0;
  z-index: 10;
  width: clamp(24px, 8%, 120px);
  pointer-events: none;
}
.lloop__fade--l {
  left: 0;
  background: linear-gradient(to right, var(--ll-fade) 0%, transparent 100%);
}
.lloop__fade--r {
  right: 0;
  background: linear-gradient(to left, var(--ll-fade) 0%, transparent 100%);
}

@media (prefers-reduced-motion: reduce) {
  .lloop__track {
    transform: none !important;
  }
}
</style>
