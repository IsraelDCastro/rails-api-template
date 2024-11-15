import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";

export default (app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });

  app.component("Button", Button);
  app.component("Password", Password);
  app.component("InputText", InputText);
  app.component("FloatLabel", FloatLabel);
  app.component("Checkbox", Checkbox);
}
