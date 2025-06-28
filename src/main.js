import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import { createI18n } from 'vue-i18n'
import ar from './locales/ar.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  messages: { ar, en }
})

const app = createApp(App)
app.use(router)
app.use(i18n)

const setDirection = (locale) => {
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', locale)
}

// Apply direction on first load
setDirection(i18n.global.locale.value)

// Watch for language changes and update direction
watch(i18n.global.locale, (newLocale) => {
  console.log('Locale changed to:', newLocale)
  setDirection(newLocale)
})

app.mount('#app')
