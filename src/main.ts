// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labsComponents from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

// Components
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";

const vuetify = createVuetify({
  components: {
    ...components,
    ...labsComponents,
  },
  directives,
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App).use(vuetify).use(router);

export const hostname = window.location.origin;
app.provide("hostname", hostname);

app.mount("#app");
