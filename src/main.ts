import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

const authStore = useAuthStore()
authStore.initializeAuth().then(() => {
  app.mount('#app')
})
