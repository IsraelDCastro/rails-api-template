import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./routes";
import "./assets/main.css";
import { initAnalytics } from "@/lib/analytics";

const app = createApp(App);

initAnalytics();

app.use(createPinia());
app.use(router);
app.mount("#app");
