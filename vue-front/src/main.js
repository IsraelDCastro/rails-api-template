import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import { createPinia } from "pinia";
import configurePrimeVue from "./primevue";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

configurePrimeVue(app);

app.mount("#app");
