import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
// import moshaToast from 'mosha-vue-toastify'
import './styles/index.css'
import 'mosha-vue-toastify/dist/style.css'

createApp(App)
    .use( createPinia() )
    .use( router )    
    .mount('#app')
