import { createApp } from 'vue'
import { router } from './routes/routes'
import App from './App.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import './style.css'


const app = createApp(App)

app.use(router);
app.mount('#app');
