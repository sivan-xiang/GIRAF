/**
 * v-reveal —— 元素进入视口时淡入上移。
 * 使用单个共享 IntersectionObserver，避免为每个元素创建观察器。
 */
let observer = null

const getObserver = () => {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )
  return observer
}

export default {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    el.classList.add('reveal')
    if (binding.value && typeof binding.value === 'number') {
      el.style.transitionDelay = `${binding.value}ms`
    }
    getObserver().observe(el)
  },
  unmounted(el) {
    if (observer) observer.unobserve(el)
  }
}
