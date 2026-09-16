import { ref, readonly } from 'vue'

/**
 * 询价弹框的全局开关。
 * ------------------------------------------------------------------
 * 为什么用模块级 ref 而不是 provide / inject：
 *   弹框只有一份，挂在 App.vue 根部；触发它的按钮却散布在页眉、移动抽屉、
 *   各页页尾 CTA、首页 hero 与详情页正文里。若走 provide/inject，要么在
 *   每个中间组件里透传，要么把 inject 调用重复十几次——两者都没有收益。
 *   表单本身不持有任何共享状态（提交走 mailto:，不落库），因此单一开关足够。
 *
 * 为什么记 opener：
 *   弹框关闭后必须把焦点还给触发它的那个按钮，否则键盘与读屏用户会被丢回页首，
 *   必须重新 Tab 一整页才能回到原处。这是对话框最基本的可达性要求。
 */

const open = ref(false)

/** 触发弹框的元素（用于关闭后归还焦点） */
let opener = null

/**
 * 打开询价弹框。
 * 既支持 `@click="openQuote"`（Vue 会把事件对象传进来），
 * 也支持显式传入元素 `openQuote(el)`。
 */
export function openQuote(from) {
  const el = from && from.currentTarget ? from.currentTarget : from
  opener = el instanceof HTMLElement ? el : null
  open.value = true
}

export function closeQuote() {
  if (!open.value) return
  open.value = false
  const back = opener
  opener = null
  // isConnected 防御：触发按钮所在的路由可能已经卸载（例如弹框内点了隐私链接跳走）
  if (back && back.isConnected) back.focus({ preventScroll: true })
}

/** 只读开关：组件里读它决定渲染，写一律走 openQuote / closeQuote */
export const quoteOpen = readonly(open)
