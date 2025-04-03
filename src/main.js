import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import router from './router';


const app = createApp(App);

app.use(router)
app.use(PrimeVue);

app.mount('#app');