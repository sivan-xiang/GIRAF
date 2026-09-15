<script setup>
/**
 * GrainOverlay —— 类 Vue Bits <Noise />。
 * 用 feTurbulence 生成胶片颗粒，叠加在整页之上，削弱大面积渐变的「塑料感」。
 */
const props = defineProps({
  opacity: { type: Number, default: 0.045 },
  frequency: { type: Number, default: 0.82 }
})

const grainOpacity = props.opacity
const grainFrequency = props.frequency
</script>

<template>
  <div class="grain" aria-hidden="true">
    <svg class="grain__svg" xmlns="http://www.w3.org/2000/svg">
      <filter id="girafsail-grain">
        <feTurbulence
          type="fractalNoise"
          :baseFrequency="grainFrequency"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#girafsail-grain)" />
    </svg>
  </div>
</template>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  opacity: v-bind(grainOpacity);
  mix-blend-mode: overlay;
}
.grain__svg {
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
</style>
