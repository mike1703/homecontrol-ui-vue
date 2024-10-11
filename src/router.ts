import Settings from "./components/Settings.vue";
import Commands from "./components/Commands.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  // '/': Home, // dashboard for some values
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/commands", name: "Commands", component: Commands },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
