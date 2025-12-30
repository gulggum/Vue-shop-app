import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faBars,
  faMoon,
  faSun,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingCart, faBars, faMoon, faSun, faMagnifyingGlass);

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();

app.use(VueQueryPlugin, { queryClient });
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
