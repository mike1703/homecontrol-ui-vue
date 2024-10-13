// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const app = createApp(App).use(vuetify).use(router);

export const hostname = window.location.origin;
app.provide("hostname", hostname);

app.mount("#app");
