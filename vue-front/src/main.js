import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import Aura from "@/presets/aura";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import router from "./routes";
import { createPinia } from "pinia";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, {
  unstyled: true,
  pt: Aura,
});

app.component("Button", Button);
app.component("InputText", InputText);
app.mount("#app");
