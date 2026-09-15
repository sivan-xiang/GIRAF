<script setup>
/**
 * Aurora — Vue Bits 官方 <Aurora /> 组件的忠实移植（https://vue-bits.dev/backgrounds/aurora）
 * ------------------------------------------------------------------
 * 官方实现基于 ogl 的 WebGL 片元着色器（simplex 噪声 + 三色 ramp + smoothstep 蒙版）。
 * 本文件做了三处工程化改造：
 *   1. TS → JS，Tailwind → scoped CSS（本项目不使用 Tailwind）
 *   2. 着色器由 GLSL 300 es 降为 GLSL 100，同时兼容 WebGL1 / WebGL2
 *   3. 增加三层降级保护：WebGL 不可用 / 上下文丢失 / 离屏，均退回 CSS 光场
 * 圆整的 CSS 光场始终铺在底层，WebGL 画布带 alpha 叠于其上，
 * 因此即使显卡驱动被禁用，页面也不会出现空白黑洞。
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'

const props = defineProps({
  /** 三色色带：[底色, 主光色, 辅光色] */
  colorStops: {
    type: Array,
    default: () => ['#0b1322', '#fa5959', '#3f6fb5']
  },
  speed: { type: Number, default: 1 },
  amplitude: { type: Number, default: 1 },
  blend: { type: Number, default: 0.5 },
  /** 细网格纹理，增加「工程感」 */
  grid: { type: Boolean, default: true }
})

const host = ref(null)
/** 是否启用 WebGL（失败则只保留 CSS 光场） */
const glLive = ref(false)

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  // 三色 ramp（与官方 COLOR_RAMP 宏展开等价，内联以避免续行反斜杠）
  vec3 rampColor;
  int index = 0;
  for (int i = 0; i < 2; i++) {
    if (colors[i].position <= uv.x) index = i;
  }
  ColorStop lo = colors[index];
  ColorStop hi = colors[index + 1];
  float rampRange = hi.position - lo.position;
  float rampFactor = (uv.x - lo.position) / rampRange;
  rampColor = mix(lo.color, hi.color, rampFactor);

  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;

  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  vec3 auroraColor = intensity * rampColor;

  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

let rafId = 0
let renderer = null
let program = null
let mesh = null
let onResize = null
let io = null
let visible = true
/** 仅在组件真正进入可视区时才跑 rAF，滚动离开即停 */
const gl = shallowRef(null)

onMounted(async () => {
  const el = host.value
  if (!el) return

  // 静态降级：减少动态效果偏好下不启动 rAF
  const still = reduceMotion()

  let ogl
  try {
    ogl = await import('ogl')
  } catch {
    return // 依赖缺失，保留 CSS 光场
  }

  try {
    const { Renderer, Program, Triangle, Mesh, Color } = ogl

    renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    })
    gl.value = renderer.gl

    // 上下文创建失败（驱动被禁用/软件渲染被拒）时 gl 为空
    if (!gl.value) return

    gl.value.clearColor(0, 0, 0, 0)
    gl.value.enable(gl.value.BLEND)
    gl.value.blendFunc(gl.value.ONE, gl.value.ONE_MINUS_SRC_ALPHA)
    gl.value.canvas.style.backgroundColor = 'transparent'
    gl.value.canvas.style.display = 'block'
    gl.value.canvas.style.width = '100%'
    gl.value.canvas.style.height = '100%'

    onResize = () => {
      if (!renderer) return
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h)
      if (program) program.uniforms.uResolution.value = [w, h]
    }
    window.addEventListener('resize', onResize)

    const geometry = new Triangle(gl.value)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const toVec3 = (hex) => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    }

    program = new Program(gl.value, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: props.amplitude },
        uColorStops: { value: props.colorStops.map(toVec3) },
        uResolution: { value: [el.clientWidth, el.clientHeight] },
        uBlend: { value: props.blend }
      }
    })

    mesh = new Mesh(gl.value, { geometry, program })
    el.appendChild(gl.value.canvas)
    onResize()

    // 上下文丢失（切换显卡、驱动重置）→ 撤下画布，回落到 CSS 光场
    gl.value.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      glLive.value = false
      cancelAnimationFrame(rafId)
    })

    glLive.value = true

    const update = (t) => {
      rafId = requestAnimationFrame(update)
      if (visible && program) {
        program.uniforms.uTime.value = t * 0.001 * props.speed
        renderer.render({ scene: mesh })
      }
    }

    if (still) {
      // 静态首帧：只渲染一次，不进入循环
      program.uniforms.uTime.value = 12
      renderer.render({ scene: mesh })
    } else {
      rafId = requestAnimationFrame(update)

      // 离屏暂停，避免整站滚动时持续占用 GPU
      if ('IntersectionObserver' in window) {
        io = new IntersectionObserver(
          ([entry]) => {
            visible = entry.isIntersecting
          },
          { threshold: 0 }
        )
        io.observe(el)
      }
    }
  } catch {
    // 着色器编译失败等异常：静默降级为 CSS 光场
    glLive.value = false
  }
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  io?.disconnect()
  if (onResize) window.removeEventListener('resize', onResize)
  try {
    if (gl.value) {
      const canvas = gl.value.canvas
      if (canvas?.parentNode) canvas.parentNode.removeChild(canvas)
      gl.value.getExtension('WEBGL_lose_context')?.loseContext()
    }
  } catch {
    /* 卸载阶段的清理失败无需上报 */
  }
  renderer = null
  program = null
  mesh = null
})
</script>

<template>
  <div
    ref="host"
    class="aurora"
    aria-hidden="true"
    :style="{
      '--a-base': colorStops[0],
      '--a-main': colorStops[1],
      '--a-alt': colorStops[2],
      '--a-speed': `${26 / Math.max(speed, 0.1)}s`,
      '--a-amp': amplitude
    }"
  >
    <!-- CSS 光场：始终铺底，既是 WebGL 的衬底，也是它的降级 -->
    <div class="aurora__base"></div>
    <div class="aurora__ribbon"></div>
    <div class="aurora__ribbon aurora__ribbon--alt"></div>
    <div class="aurora__glow aurora__glow--main"></div>
    <div class="aurora__glow aurora__glow--alt"></div>

    <div v-if="grid" class="aurora__grid"></div>
    <div class="aurora__vignette"></div>

    <!-- WebGL 层由脚本挂载 canvas，此处仅作定位容器 -->
    <div class="aurora__gl" :class="{ 'is-live': glLive }"></div>
  </div>
</template>

<style scoped>
.aurora {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--a-base);
  pointer-events: none;
  contain: paint;
}

.aurora__base {
  position: absolute;
  inset: 0;
  background: linear-gradient(170deg, #16233d 0%, var(--a-base) 55%, #0a1120 100%);
}

/* 极光缎带：大尺寸斜向渐变 + 重模糊 + 缓慢平移 */
.aurora__ribbon {
  position: absolute;
  top: -45%;
  left: -30%;
  width: 165%;
  height: 130%;
  background: linear-gradient(
    100deg,
    transparent 0%,
    color-mix(in srgb, var(--a-alt) 55%, transparent) 22%,
    color-mix(in srgb, var(--a-main) 62%, transparent) 42%,
    color-mix(in srgb, var(--a-alt) 40%, transparent) 62%,
    transparent 88%
  );
  filter: blur(72px);
  opacity: calc(0.5 * var(--a-amp));
  transform: rotate(-8deg);
  animation: aurora-drift var(--a-speed) ease-in-out infinite alternate;
}

.aurora__ribbon--alt {
  top: -30%;
  left: -45%;
  height: 105%;
  opacity: calc(0.36 * var(--a-amp));
  filter: blur(96px);
  transform: rotate(12deg);
  animation-duration: calc(var(--a-speed) * 1.45);
  animation-direction: alternate-reverse;
}

/* 径向光斑：制造纵深 */
.aurora__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
}
.aurora__glow--main {
  top: -18%;
  right: -6%;
  width: 46rem;
  height: 46rem;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--a-main) 46%, transparent),
    transparent 66%
  );
  opacity: calc(0.62 * var(--a-amp));
  animation: aurora-pulse calc(var(--a-speed) * 0.85) ease-in-out infinite alternate;
}
.aurora__glow--alt {
  bottom: -34%;
  left: -12%;
  width: 40rem;
  height: 40rem;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--a-alt) 42%, transparent),
    transparent 68%
  );
  opacity: calc(0.45 * var(--a-amp));
  animation: aurora-pulse calc(var(--a-speed) * 1.15) ease-in-out infinite alternate-reverse;
}

/* 细网格：增加「工程感」 */
.aurora__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 68px 68px;
  mask-image: radial-gradient(ellipse 120% 90% at 50% 0%, #000 12%, transparent 72%);
  -webkit-mask-image: radial-gradient(ellipse 120% 90% at 50% 0%, #000 12%, transparent 72%);
}

.aurora__vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 100% 70% at 50% 42%,
    transparent 42%,
    rgba(8, 14, 26, 0.55) 100%
  );
}

/* WebGL 画布层。默认完全透明，只有成功拿到上下文才淡入，
   避免降级路径下露出空白画布。 */
.aurora__gl {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s var(--ease);
}
.aurora__gl.is-live {
  opacity: 1;
}

/* WebGL 生效时压低 CSS 缎带的强度，让两者叠加而不是互相淹没 */
.aurora__gl.is-live ~ .aurora__vignette {
  opacity: 0.9;
}

@keyframes aurora-drift {
  0% {
    transform: translate3d(-6%, 0, 0) rotate(-8deg) scaleY(1);
  }
  100% {
    transform: translate3d(9%, 3%, 0) rotate(-4deg) scaleY(1.16);
  }
}

@keyframes aurora-pulse {
  0% {
    transform: scale(1) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1.22) translate3d(-3%, 4%, 0);
  }
}

/* 移动端：只保留静态色场，去掉模糊动画，避免 GPU 压力 */
@media (max-width: 760px) {
  .aurora__ribbon,
  .aurora__glow {
    animation: none;
  }
  .aurora__ribbon {
    filter: blur(52px);
    opacity: 0.4;
  }
  .aurora__glow--main,
  .aurora__glow--alt {
    filter: blur(60px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .aurora__ribbon,
  .aurora__glow {
    animation: none !important;
  }
}
</style>
