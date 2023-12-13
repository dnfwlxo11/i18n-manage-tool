import { createApp } from 'vue'
import './style.css'
import router from './router/index.js'
import main from './App.vue'

const App = createApp(main)

App.use(router)
App.mount('#app')
