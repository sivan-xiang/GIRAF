<script setup>
import { computed } from 'vue'

/**
 * GlowButton —— 类 Vue Bits <Star Border /> 的按钮。
 * 旋转的锥形渐变描边制造流动光带，内层实底保证文字对比度。
 */
const props = defineProps({
  to: { type: [String, Object], default: null },
  href: { type: String, default: '' },
  variant: { type: String, default: 'primary' }, // primary | ghost | onDark
  size: { type: String, default: 'md' }, // sm | md | lg
  glow: { type: Boolean, default: true },
  block: { type: Boolean, default: false }
})

const tag = computed(() => {
  if (props.to) return 'RouterLink'
  if (props.href) return 'a'
  return 'button'
})

const bindings = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: 'button' }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="bindings"
    class="gbtn"
    :class="[`gbtn--${variant}`, `gbtn--${size}`, { 'gbtn--glow': glow, 'gbtn--block': block }]"
  >
    <span class="gbtn__ring" aria-hidden="true"></span>
    <span class="gbtn__body">
      <slot />
    </span>
  </component>
</template>

<style scoped>
.gbtn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  padding: 1.6px;
  overflow: hidden;
  isolation: isolate;
  font-weight: 600;
  text-align: center;
  transition: transform 0.2s var(--ease), box-shadow 0.24s var(--ease);
}

.gbtn:hover {
  transform: translateY(-2px);
}

/* 流动光带 */
.gbtn__ring {
  position: absolute;
  inset: -60%;
  z-index: 0;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 210deg,
    var(--coral) 268deg,
    #ffb27a 300deg,
    transparent 340deg,
    transparent 360deg
  );
  animation: gbtn-spin 3.4s linear infinite;
  opacity: 0.9;
}

.gbtn__body {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  border-radius: inherit;
  white-space: nowrap;
}

/* —— 变体 —— */
.gbtn--primary .gbtn__body {
  background: var(--coral);
  color: #fff;
}
.gbtn--primary:hover .gbtn__body {
  background: var(--coral-600);
}

.gbtn--ghost .gbtn__body {
  background: #fff;
  color: var(--navy);
}
.gbtn--ghost .gbtn__ring {
  opacity: 0.55;
}

.gbtn--onDark .gbtn__body {
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  backdrop-filter: blur(6px);
}
/* 半透明底会把锥形光带透出来显得发浑，次级按钮改为干净的描边 */
.gbtn--onDark .gbtn__ring {
  opacity: 0;
}
.gbtn--onDark:hover .gbtn__body {
  background: #fff;
  border-color: #fff;
  color: var(--navy);
}

/* —— 尺寸 —— */
.gbtn--sm .gbtn__body {
  padding: 0.58rem 1.05rem;
  font-size: 0.88rem;
}
.gbtn--md .gbtn__body {
  padding: 0.82rem 1.55rem;
  font-size: 0.95rem;
}
.gbtn--lg .gbtn__body {
  padding: 1rem 1.9rem;
  font-size: 1rem;
}

.gbtn--block {
  display: flex;
  width: 100%;
}

.gbtn--glow {
  box-shadow: 0 10px 30px -12px rgba(250, 89, 89, 0.55);
}
.gbtn--onDark.gbtn--glow {
  box-shadow: 0 12px 34px -14px rgba(0, 0, 0, 0.6);
}

@keyframes gbtn-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gbtn__ring {
    animation: none;
    background: linear-gradient(120deg, var(--coral), #ffb27a);
    inset: 0;
  }
  .gbtn:hover {
    transform: none;
  }
}
</style>
