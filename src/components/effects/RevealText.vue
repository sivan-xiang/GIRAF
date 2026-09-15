<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

/**
 * RevealText —— 类 Vue Bits <Split Text /> / <Scroll Reveal />。
 * 按词切分，逐词自下方升起；进入视口时触发。
 */
const props = defineProps({
  text: { type: String, required: true },
  as: { type: String, default: 'span' },
  /** 每词延迟步长(ms) */
  step: { type: Number, default: 55 },
  /** 起始延迟(ms) */
  delay: { type: Number, default: 0 },
  /** 单次动画时长(ms) */
  duration: { type: Number, default: 760 }
})

const el = ref(null)
const shown = ref(false)
let observer = null

const words = computed(() => props.text.split(/\s+/).filter(Boolean))

const style = computed(() => ({ '--rt-dur': `${props.duration}ms` }))

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    shown.value = true
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        shown.value = true
        observer.disconnect()
        observer = null
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => observer && observer.disconnect())
</script>

<template>
  <component :is="props.as" ref="el" class="rt" :class="{ 'is-in': shown }" :style="style">
    <span v-for="(w, i) in words" :key="i" class="rt__w">
      <span class="rt__i" :style="{ transitionDelay: `${props.delay + i * props.step}ms` }">{{ w }}</span>
    </span>
  </component>
</template>

<style scoped>
.rt {
  display: inline;
}
.rt__w {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  margin-right: 0.26em;
  padding-bottom: 0.06em;
}
.rt__i {
  display: inline-block;
  transform: translate3d(0, 108%, 0);
  opacity: 0;
  transition: transform var(--rt-dur) cubic-bezier(0.22, 1, 0.36, 1),
    opacity calc(var(--rt-dur) * 0.55) ease-out;
  will-change: transform;
}
.rt.is-in .rt__i {
  transform: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .rt__i {
    transform: none;
    opacity: 1;
    transition: none;
  }
}
</style>
