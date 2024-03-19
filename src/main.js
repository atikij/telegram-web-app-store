import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store.js";
import axios from "axios";
//import VueTelegram from 'vue-tg'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.use(store)
//app.use(VueTelegram)

app.mount('#app')
