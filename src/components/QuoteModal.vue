<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSite } from '@/composables/useSite'
import { closeQuote, quoteOpen } from '@/composables/useQuote'
import ContactForm from './ContactForm.vue'
import AppIcon from './AppIcon.vue'

/**
 * QuoteModal —— 全站唯一的询价弹框。
 * ------------------------------------------------------------------
 * 站内所有「Request a quote」按钮都打开这一个实例，内部复用联系页的
 * ContactForm（variant="modal"），因此四门语言的文案、校验规则与 mailto:
 * 组装逻辑只有一份，不会出现「弹框里和联系页上说法不一致」。
 *
 * 可达性（这是弹框最容易做漏的部分）：
 *   · role="dialog" + aria-modal + aria-label
 *   · Esc 关闭、点击遮罩关闭
 *   · Tab 焦点陷阱：焦点只在面板内循环，不会跑到背后的页面上
 *   · 打开时锁背景滚动，关闭后把焦点还给触发它的那个按钮
 *   · 弹框内发生路由跳转（隐私政策链接）时自动关闭
 */
const { t, route } = useSite()

/**
 * 模板里用本地 computed 而不是直接用导入的 quoteOpen：
 * 导入的绑定在 <script setup> 中运行时类型未知，模板解包依赖编译器的 unref 推断。
 * 多一层 computed 让 v-if 的取值完全确定——弹框若因解包失败而常驻，代价太大。
 */
const isOpen = computed(() => quoteOpen.value)

const panel = ref(null)

/** 可聚焦控件的选择器（与 Tab 的自然顺序一致） */
const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(',')

/** 只取真实可见的控件：隐藏的（如未展开的成功提示里的按钮）不应参与循环 */
const focusables = () =>
  [...(panel.value?.querySelectorAll(FOCUSABLE) || [])].filter(
    (n) => n.offsetWidth > 0 || n.offsetHeight > 0
  )

const onKeydown = (e) => {
  if (!quoteOpen.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    closeQuote()
    return
  }
  if (e.key !== 'Tab') return

  const nodes = focusables()
  if (nodes.length < 2) return
  const first = nodes[0]
  const last = nodes[nodes.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

/**
 * 打开时锁背景滚动并把焦点送进面板；关闭时解锁。
 * 用 watch 而不是 Transition 的 @after-enter：在 prefers-reduced-motion 下
 * 过渡会被跳过，监听过渡钩子会漏掉这一次焦点转移。
 */
watch(quoteOpen, (on) => {
  document.body.style.overflow = on ? 'hidden' : ''
  if (!on) return
  requestAnimationFrame(() => {
    panel.value?.querySelector('input, select, textarea, button')?.focus({ preventScroll: true })
  })
})

/** 弹框内跳转（表单里的隐私政策链接）后必须关闭，否则会盖在新页面上 */
watch(
  () => route.path,
  () => {
    if (quoteOpen.value) closeQuote()
  }
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="qm">
      <!-- @click.self：只有点到遮罩本身才关闭，点面板内部不关 -->
      <div v-if="isOpen" class="qm" @click.self="closeQuote">
        <div
          ref="panel"
          class="qm__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="t('contact.form.title')"
        >
          <button
            type="button"
            class="qm__close"
            :aria-label="t('common.close')"
            @click="closeQuote"
          >
            <AppIcon name="close" :size="17" />
          </button>

          <div class="qm__scroll">
            <ContactForm variant="modal" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.qm {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(0.8rem, 0.4rem + 1.6vw, 2rem);
  background: rgba(4, 8, 16, 0.74);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
}

.qm__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(100%, 700px);
  max-height: min(88vh, 900px);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  background: var(--surface-solid);
  box-shadow: var(--sh-3), var(--glow-soft);
  overflow: hidden;
}

/* 关闭按钮浮在面板右上，不随内容滚动 */
.qm__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 50%;
  background: var(--surface-2);
  color: var(--ink);
  transition: background 0.18s var(--ease), border-color 0.18s var(--ease);
}
.qm__close:hover {
  border-color: var(--coral);
  background: var(--coral-soft);
}

.qm__scroll {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: clamp(1.4rem, 1rem + 1.4vw, 2.2rem);
  /* 顶部留出与关闭按钮同高的空间，标题不会被压住 */
  padding-top: clamp(2.6rem, 2.2rem + 1vw, 3rem);
}

/* —— 进出场 —— */
.qm-enter-active,
.qm-leave-active {
  transition: opacity 0.22s var(--ease);
}
.qm-enter-from,
.qm-leave-to {
  opacity: 0;
}
.qm-enter-active .qm__panel,
.qm-leave-active .qm__panel {
  transition: transform 0.28s var(--ease-out-expo), opacity 0.2s var(--ease);
}
.qm-enter-from .qm__panel,
.qm-leave-to .qm__panel {
  transform: translateY(12px) scale(0.985);
  opacity: 0;
}

/* 窄屏改为底部升起的整幅面板：表单字段多，居中弹框在手机上会挤成一条缝 */
@media (max-width: 640px) {
  .qm {
    align-items: flex-end;
    padding: 0;
  }
  .qm__panel {
    width: 100%;
    max-height: 94dvh;
    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  }
  .qm-enter-from .qm__panel,
  .qm-leave-to .qm__panel {
    transform: translateY(4%);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .qm-enter-active,
  .qm-leave-active,
  .qm-enter-active .qm__panel,
  .qm-leave-active .qm__panel {
    transition: none;
  }
  .qm-enter-from .qm__panel,
  .qm-leave-to .qm__panel {
    transform: none;
  }
}
</style>
