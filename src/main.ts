import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Import des styles globaux
import './assets/styles/main.css'

// Configuration de l'application
const app = createApp(App)

// Configuration des plugins
app.use(createPinia())
app.use(router)

// Montage de l'application
app.mount('#app') 