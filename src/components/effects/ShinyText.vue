<script setup>
/**
 * ShinyText —— 类 Vue Bits <ShinyText />。
 * 一道高光扫过文字，用于副标题/标签。
 */
defineProps({
  text: { type: String, default: '' },
  speed: { type: Number, default: 1 },
  /** 高光颜色 */
  shine: { type: String, default: 'rgba(255,255,255,0.95)' },
  base: { type: String, default: 'rgba(255,255,255,0.58)' },
  delay: { type: Number, default: 0 }
})
</script>

<template>
  <span
    class="shiny"
    :style="{
      '--s-shine': shine,
      '--s-base': base,
      '--s-speed': `${5 / Math.max(speed, 0.1)}s`,
      '--s-delay': `${delay}s`
    }"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.shiny {
  display: inline-block;
  color: var(--s-base);
  background-image: linear-gradient(
    100deg,
    transparent 28%,
    var(--s-shine) 46%,
    var(--s-shine) 54%,
    transparent 72%
  );
  background-size: 220% 100%;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shiny-sweep var(--s-speed) linear infinite;
  animation-delay: var(--s-delay);
}

@keyframes shiny-sweep {
  0% {
    background-position: 180% 0;
  }
  100% {
    background-position: -80% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shiny {
    animation: none;
    background: none;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
