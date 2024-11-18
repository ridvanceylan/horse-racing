import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'
import router from './router'
import store from "./store";


const app = createApp(App).use(bootstrap)
app.use(router)
app.use(store)

app.mount('#app')
