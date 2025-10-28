import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import naive from 'naive-ui'
import { createPinia } from 'pinia'  
import { createI18n } from 'vue-i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import vi from './locales/vi'
import en from './locales/en'

const i18n = createI18n({
  locale: 'vi',          // Ngôn ngữ mặc định
  fallbackLocale: 'en',  // Nếu key không tìm thấy
  messages: { vi, en }
})
const app = createApp(App)
const pinia = createPinia()   

app.use(i18n)
app.use(router)
app.use(naive)
app.use(pinia)               
app.mount('#app')
