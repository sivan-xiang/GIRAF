<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: null }
})

/**
 * 手写几何图标集（24×24 viewBox）。
 * 仅使用直线、圆弧与二次/三次贝塞尔，不依赖任何图标库。
 */
const ICONS = {
  // —— 业务 ——
  ship: {
    paths: ['M3.5 16.5h17l-2 3.5h-13z', 'M5.5 16.5l1.5-6h10l1.5 6', 'M12 10.5V3.5', 'M8.5 6.5h7']
  },
  plane: {
    solid: true,
    paths: [
      'M12 2.5l1.6 6.1 6.9 3.2v2.2l-6.9-1.7v3.9l2.2 1.9v1.8L12 18.4l-3.8 1.5v-1.8l2.2-1.9v-3.9l-6.9 1.7v-2.2l6.9-3.2z'
    ]
  },
  train: {
    paths: [
      'M6.5 3.5h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z',
      'M7.5 7h9v4h-9z',
      'M7 19l2.5-3.5',
      'M17 19l-2.5-3.5',
      'M5.5 21.5h13'
    ]
  },
  truck: {
    paths: ['M2.5 6.5h11v9.5h-11z', 'M13.5 9.5h4.2l3.3 3.4v3.1h-7.5z', 'M8 19.5h8'],
    circles: [
      { cx: 7, cy: 17.8, r: 1.9 },
      { cx: 17.6, cy: 17.8, r: 1.9 }
    ]
  },
  doc: {
    paths: ['M6.5 2.5h7l4 4v15h-11z', 'M13.5 2.5v4h4', 'M9.2 11.5h5.6', 'M9.2 15h5.6', 'M9.2 18h3.4']
  },
  warehouse: {
    paths: ['M3 20.5V9.6l9-6.1 9 6.1v10.9z', 'M8 20.5v-6.2h8v6.2', 'M6 12.5h2.5', 'M15.5 12.5H18']
  },
  danger: {
    paths: ['M12 3.4l9.6 17.1H2.4z', 'M12 9.6v5.2', 'M12 18.1h.01']
  },
  cart: {
    paths: ['M2.5 3.5h2.6l2.4 11h11.4', 'M6.6 7.5h14.3l-1.9 6.6H8.4'],
    circles: [
      { cx: 9.6, cy: 19.6, r: 1.6 },
      { cx: 17, cy: 19.6, r: 1.6 }
    ]
  },

  // —— 通用 ——
  phone: {
    paths: [
      'M6.7 3.5h2.4a1 1 0 0 1 .96.73l.9 3.1a1 1 0 0 1-.36 1.06l-1.6 1.28a13.2 13.2 0 0 0 5.3 5.3l1.28-1.6a1 1 0 0 1 1.06-.36l3.1.9a1 1 0 0 1 .73.96v2.4a2 2 0 0 1-2.2 2A18.5 18.5 0 0 1 4.7 5.7a2 2 0 0 1 2-2.2z'
    ]
  },
  mobile: {
    paths: ['M7.5 2.5h9v19h-9z', 'M10.5 18.6h3']
  },
  mail: {
    paths: ['M3 6h18v12H3z', 'M3 6.6l9 6.4 9-6.4']
  },
  pin: {
    paths: ['M12 21.5s7-6.2 7-11.2a7 7 0 0 0-14 0c0 5 7 11.2 7 11.2z'],
    circles: [{ cx: 12, cy: 10.1, r: 2.6 }]
  },
  clock: {
    paths: ['M12 7.2v5.2l3.6 2.1'],
    circles: [{ cx: 12, cy: 12, r: 9 }]
  },
  check: { paths: ['M4.6 12.6l5 5 9.8-11'] },
  checkCircle: {
    paths: ['M8.2 12.2l2.6 2.6 5-5.6'],
    circles: [{ cx: 12, cy: 12, r: 9.2 }]
  },
  arrow: { paths: ['M4.5 12h14.5', 'M13 5.8l6.2 6.2-6.2 6.2'] },
  globe: {
    paths: ['M3 12h18', 'M12 3a15 15 0 0 1 0 18', 'M12 3a15 15 0 0 0 0 18'],
    circles: [{ cx: 12, cy: 12, r: 9 }]
  },
  shield: {
    paths: [
      'M12 2.5l7.5 3v6.2c0 4.6-3.1 8.2-7.5 9.8-4.4-1.6-7.5-5.2-7.5-9.8V5.5z',
      'M8.9 12l2.2 2.3 4-4.6'
    ]
  },
  users: {
    paths: ['M2.6 20.2c0-3.9 2.8-6.6 6.4-6.6s6.4 2.7 6.4 6.6', 'M16.6 13.9c2.9.5 4.9 2.8 4.9 6.3'],
    circles: [
      { cx: 9, cy: 8.4, r: 3.6 },
      { cx: 17.4, cy: 9.6, r: 2.7 }
    ]
  },
  eye: {
    paths: ['M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12z'],
    circles: [{ cx: 12, cy: 12, r: 3 }]
  },
  leaf: {
    paths: ['M20 4.5c0 9-6.5 15.5-15.5 15.5C4.5 11 11 4.5 20 4.5z', 'M4.8 20.2L14 10.8']
  },
  box: {
    paths: ['M12 2.8l8.5 4.6v9.2L12 21.2 3.5 16.6V7.4z', 'M3.5 7.4L12 12l8.5-4.6', 'M12 12v9.2']
  },
  layers: {
    paths: ['M12 2.6l9 4.7-9 4.7-9-4.7z', 'M3 12.4l9 4.7 9-4.7', 'M3 16.9l9 4.7 9-4.7']
  },
  factory: {
    paths: ['M2.5 20.5V9.2l6 3.2V9.2l6 3.2V9.2l7 3.8v7.5z', 'M2.5 9.2V3.5h3v3']
  },
  chevron: { paths: ['M8.5 5l7 7-7 7'] },
  close: { paths: ['M5.5 5.5l13 13', 'M18.5 5.5l-13 13'] },
  menu: { paths: ['M3.5 6.5h17', 'M3.5 12h17', 'M3.5 17.5h17'] },
  scale: {
    paths: ['M12 3v18', 'M6.5 21h11', 'M4 8.5h16', 'M4 8.5L1.5 14h5z', 'M20 8.5L17.5 14h5z']
  },
  handshake: {
    paths: [
      'M2.5 12.5l4-4 4 3.4 3-2.6 4 3.2',
      'M6.5 8.5l3.5-3.2h5l3.5 3.2',
      'M2.6 12.5l4.4 5 4.4-3.4',
      'M21.4 12.3l-4.2 5.2'
    ]
  }
}

const icon = computed(() => ICONS[props.name] || ICONS.check)
const dim = computed(() => (props.size ? `${props.size}px` : '1em'))
</script>

<template>
  <svg
    class="icon"
    viewBox="0 0 24 24"
    :width="dim"
    :height="dim"
    :fill="icon.solid ? 'currentColor' : 'none'"
    :stroke="icon.solid ? 'none' : 'currentColor'"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, i) in icon.paths || []" :key="`p${i}`" :d="d" />
    <circle
      v-for="(c, i) in icon.circles || []"
      :key="`c${i}`"
      :cx="c.cx"
      :cy="c.cy"
      :r="c.r"
    />
  </svg>
</template>
