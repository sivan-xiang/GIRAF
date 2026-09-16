<script setup>
import { computed } from 'vue'

/**
 * MarqueeStrip —— 类 Vue Bits <Logo Loop />。
 * 列表复制一份后整体平移 50%，实现无接缝循环；悬停暂停。
 */
const props = defineProps({
  items: { type: Array, required: true },
  /** 完整循环一圈的秒数 */
  speed: { type: Number, default: 42 },
  direction: { type: String, default: 'left' }, // left | right
  /** 是否显示分隔点 */
  dots: { type: Boolean, default: true },
  /** 弱化字重与不透明度 */
  muted: { type: Boolean, default: false },
  /** 置于浅色背景时置为 true，否则白字落在白底上不可见 */
  light: { type: Boolean, default: false }
})

const loop = computed(() => [...props.items, ...props.items])
</script>

<template>
  <div
    class="marquee"
    :class="{ 'marquee--muted': muted, 'marquee--light': light }"
    :style="{ '--m-speed': `${speed}s` }"
  >
    <div class="marquee__track" :class="`marquee__track--${direction}`">
      <span v-for="(item, i) in loop" :key="i" class="marquee__item">
        {{ item }}
        <span v-if="dots" class="marquee__dot" aria-hidden="true"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
}

.marquee__track {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  will-change: transform;
  animation: marquee-left var(--m-speed) linear infinite;
}
.marquee__track--right {
  animation-name: marquee-right;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  padding-inline: 0.35rem;
  font-size: clamp(0.98rem, 0.9rem + 0.4vw, 1.22rem);
  font-weight: 600;
  letter-spacing: -0.005em;
  color: rgba(255, 255, 255, 0.86);
}

.marquee--muted .marquee__item {
  color: rgba(255, 255, 255, 0.55);
  font-weight: 500;
}

.marquee__dot {
  width: 5px;
  height: 5px;
  margin-left: 1.6rem;
  border-radius: 50%;
  background: var(--coral);
  opacity: 0.75;
}

/* 亮底场景（浅色区块） */
.marquee--light .marquee__item {
  color: var(--ink);
  font-weight: 500;
}
.marquee--light .marquee__dot {
  background: var(--coral);
  opacity: 0.85;
}

@keyframes marquee-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}
@keyframes marquee-right {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
  }
  .marquee {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
</style>
