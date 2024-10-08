import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.provide("hostname", window.location.origin);

app.mount("#app");
