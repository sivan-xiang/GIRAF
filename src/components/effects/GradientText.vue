<script setup>
/**
 * GradientText —— 类 Vue Bits <GradientText />。
 * 多色渐变填充 + 缓慢流动，纯 CSS 实现。
 */
defineProps({
  colors: { type: Array, default: () => ['#fa5959', '#ff9d6f', '#f5c26b', '#fa5959'] },
  speed: { type: Number, default: 1 },
  /** 渐变角度 */
  angle: { type: Number, default: 96 }
})
</script>

<template>
  <span
    class="gradtext"
    :style="{
      '--g-list': colors.join(', '),
      '--g-angle': `${angle}deg`,
      '--g-speed': `${9 / Math.max(speed, 0.1)}s`
    }"
  >
    <slot />
  </span>
</template>

<style scoped>
.gradtext {
  background-image: linear-gradient(var(--g-angle), var(--g-list));
  background-size: 260% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: gradtext-flow var(--g-speed) linear infinite;
}

@keyframes gradtext-flow {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 260% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradtext {
    animation: none;
    background-position: 26% 50%;
  }
}
</style>
