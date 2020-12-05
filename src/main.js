import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './registerServiceWorker'

const app = createApp(App);
app.use(store);

import VCalendar from "v-calendar";
app.use(VCalendar);

app.mount('#app');
