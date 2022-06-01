import App from './App.vue'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')
