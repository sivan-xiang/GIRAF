<script setup>
import { reactive, ref, computed } from 'vue'
import { useSite } from '@/composables/useSite'
import { company } from '@/data/company'
import AppIcon from './AppIcon.vue'

/**
 * ContactForm —— 无后端依赖的询价表单。
 *
 * 提交时不向任何服务器发送数据：校验通过后用已填内容组装 mailto: 唤起本地邮件客户端，
 * 与 Datenschutz 中「表单不向我们的服务器传输数据」的表述完全一致。
 *
 * 欧美用户常见障碍：不少桌面与企业环境并未配置默认邮件客户端，光靠 mailto: 会静默失败。
 * 因此提交后额外提供「复制询价内容」兜底，并把邮箱与电话直接摆在成功提示里。
 */
const { t, tm, link } = useSite()

/**
 * 呈现形态：
 *   page  —— 联系页内嵌的卡片，自带边框、底色与投影
 *   modal —— 询价弹框内复用。外层 QuoteModal 的面板本身已是卡片，
 *            这里必须去掉重复的边框与投影，否则会看到「卡片套卡片」的双层框。
 */
const props = defineProps({
  variant: { type: String, default: 'page' } // page | modal
})

const form = reactive({
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  subject: '',
  route: '',
  cargo: '',
  weight: '',
  timeline: '',
  message: '',
  consent: false
})

const errors = reactive({})
const sent = ref(false)
const copied = ref(false)
const formEl = ref(null)

const subjectOptions = computed(() => {
  const list = tm('contact.form.subjectOptions')
  return Array.isArray(list) ? list : []
})

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim())

const validate = () => {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.firstName.trim()) errors.firstName = t('contact.form.errors.firstName')
  if (!form.lastName.trim()) errors.lastName = t('contact.form.errors.lastName')
  if (!emailOk(form.email)) errors.email = t('contact.form.errors.email')
  if (!form.message.trim()) errors.message = t('contact.form.errors.message')
  if (!form.consent) errors.consent = t('contact.form.errors.consent')
  return Object.keys(errors).length === 0
}

/** 组装邮件正文：用「标签: 值」的行式结构，方便业务同事直接读取 */
const buildBody = () => {
  const L = (label, value) => (value ? `${label}: ${value}` : null)
  const lines = [
    L(t('contact.form.firstName'), form.firstName),
    L(t('contact.form.lastName'), form.lastName),
    L(t('contact.form.company'), form.company),
    L(t('contact.form.email'), form.email),
    L(t('contact.form.phone'), form.phone),
    L(t('contact.form.route'), form.route),
    L(t('contact.form.cargo'), form.cargo),
    L(t('contact.form.weight'), form.weight),
    L(t('contact.form.timeline'), form.timeline),
    '',
    `${t('contact.form.message')}:`,
    form.message
  ].filter((v) => v !== null)
  return lines.join('\n')
}

/** 校验失败时把焦点送到第一个出错的控件——键盘与读屏用户的关键体验 */
const focusFirstError = () => {
  requestAnimationFrame(() => {
    formEl.value?.querySelector('[aria-invalid="true"]')?.focus()
  })
}

const submit = () => {
  if (!validate()) {
    focusFirstError()
    return
  }
  const subject = form.subject || t('contact.form.title')
  const href = `mailto:${company.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(buildBody())}`
  sent.value = true
  copied.value = false
  window.location.href = href
}

/** mailto: 未生效时的兜底：把完整询价内容复制到剪贴板 */
const copyDetails = async () => {
  const text = `${form.subject || t('contact.form.title')}\n\n${buildBody()}`
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
    } else {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    copied.value = true
    setTimeout(() => (copied.value = false), 2400)
  } catch {
    /* 复制不可用时静默降级——邮箱地址与电话仍然可直接点击 */
  }
}
</script>

<template>
  <div class="cform" :class="`cform--${props.variant}`">
    <h3 class="cform__title">{{ t('contact.form.title') }}</h3>
    <p class="cform__text">{{ t('contact.form.text') }}</p>

    <div v-if="sent" class="alert--ok" role="status">
      <AppIcon name="checkCircle" :size="18" />
      <div>
        <strong>{{ t('contact.form.successTitle') }}</strong>
        <p class="cform__oktext">
          {{ t('contact.form.success') }}
          <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        </p>
        <button type="button" class="btn btn--ghost btn--sm cform__copy" @click="copyDetails">
          <AppIcon :name="copied ? 'check' : 'doc'" :size="15" />
          {{ copied ? t('contact.form.copied') : t('contact.form.copy') }}
        </button>
      </div>
    </div>

    <form ref="formEl" novalidate @submit.prevent="submit">
      <div class="field--row">
        <label class="field">
          <span class="field__label"
            >{{ t('contact.form.firstName') }} <span class="field__req">*</span></span
          >
          <input
            v-model="form.firstName"
            type="text"
            :class="{ 'has-error': errors.firstName }"
            :aria-invalid="errors.firstName ? 'true' : undefined"
            autocomplete="given-name"
          />
          <span v-if="errors.firstName" class="field__error">{{ errors.firstName }}</span>
        </label>

        <label class="field">
          <span class="field__label"
            >{{ t('contact.form.lastName') }} <span class="field__req">*</span></span
          >
          <input
            v-model="form.lastName"
            type="text"
            :class="{ 'has-error': errors.lastName }"
            :aria-invalid="errors.lastName ? 'true' : undefined"
            autocomplete="family-name"
          />
          <span v-if="errors.lastName" class="field__error">{{ errors.lastName }}</span>
        </label>
      </div>

      <div class="field--row field--spaced">
        <label class="field">
          <span class="field__label">{{ t('contact.form.company') }}</span>
          <input v-model="form.company" type="text" autocomplete="organization" />
        </label>
        <label class="field">
          <span class="field__label">{{ t('contact.form.phone') }}</span>
          <input v-model="form.phone" type="tel" autocomplete="tel" />
        </label>
      </div>

      <label class="field field--spaced">
        <span class="field__label">
          {{ t('contact.form.email') }} <span class="field__req">*</span>
        </span>
        <input
          v-model="form.email"
          type="email"
          :class="{ 'has-error': errors.email }"
          :aria-invalid="errors.email ? 'true' : undefined"
          autocomplete="email"
        />
        <span v-if="errors.email" class="field__error">{{ errors.email }}</span>
      </label>

      <label class="field">
        <span class="field__label">{{ t('contact.form.subject') }}</span>
        <select v-model="form.subject">
          <option value="">{{ t('contact.form.subject') }}</option>
          <option v-for="(opt, i) in subjectOptions" :key="i" :value="opt">{{ opt }}</option>
        </select>
      </label>

      <div class="field--row field--spaced">
        <label class="field">
          <span class="field__label">{{ t('contact.form.route') }}</span>
          <input v-model="form.route" type="text" placeholder="Ningbo → Hamburg" />
        </label>
        <label class="field">
          <span class="field__label">{{ t('contact.form.weight') }}</span>
          <input v-model="form.weight" type="text" placeholder="1 × 40′ HC, 18.400 kg" />
        </label>
      </div>

      <div class="field--row field--spaced">
        <label class="field">
          <span class="field__label">{{ t('contact.form.cargo') }}</span>
          <input v-model="form.cargo" type="text" />
        </label>
        <label class="field">
          <span class="field__label">{{ t('contact.form.timeline') }}</span>
          <input v-model="form.timeline" type="text" />
        </label>
      </div>

      <label class="field field--spaced">
        <span class="field__label"
          >{{ t('contact.form.message') }} <span class="field__req">*</span></span
        >
        <textarea
          v-model="form.message"
          :class="{ 'has-error': errors.message }"
          :aria-invalid="errors.message ? 'true' : undefined"
          :placeholder="t('contact.form.messagePlaceholder')"
        ></textarea>
        <span v-if="errors.message" class="field__error">{{ errors.message }}</span>
      </label>

      <label class="checkbox">
        <input
          v-model="form.consent"
          type="checkbox"
          :aria-invalid="errors.consent ? 'true' : undefined"
        />
        <span>
          {{ t('contact.form.consent') }}
          <RouterLink :to="link('privacy')">{{ t('common.privacy') }}</RouterLink>
        </span>
      </label>
      <span v-if="errors.consent" class="field__error cform__consentErr">
        {{ errors.consent }}
      </span>

      <button type="submit" class="btn btn--primary btn--block">
        {{ t('contact.form.submit') }}
        <AppIcon name="arrow" :size="17" />
      </button>

      <p class="form-note">
        {{ t('common.officeHours') }}: {{ t('common.officeHoursValue') }}
      </p>
    </form>
  </div>
</template>

<style scoped>
.cform {
  padding: clamp(1.6rem, 1.2rem + 1.4vw, 2.4rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface-solid);
  box-shadow: var(--sh-2);
}
/* 弹框形态：外壳交给 QuoteModal 的面板，这里只保留内容 */
.cform--modal {
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.cform__title {
  margin-bottom: 0.4rem;
}
.cform__text {
  margin-bottom: 1.6rem;
  font-size: 0.94rem;
  color: var(--body);
}
.cform__oktext {
  margin: 0.4rem 0 0.9rem;
}
.cform__copy {
  gap: 0.45rem;
}
.cform__consentErr {
  display: block;
  margin-top: -0.9rem;
  margin-bottom: 1rem;
}
.field--spaced {
  margin-top: 1.05rem;
}
.btn--block {
  width: 100%;
}
</style>
