import { createApp } from 'vue';
import App from './App';
import store from '@/store';
import PrimeVue from "primevue/config";
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app
  .use(store)
  .use(PrimeVue)
  .mount('#app');
