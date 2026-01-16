import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import router from "./router/router";
import piniaPersist from "pinia-plugin-persistedstate";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faShoppingCart,
  faBars,
  faMoon,
  faSun,
  faMagnifyingGlass,
  faChevronRight,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

library.add(
  faShoppingCart,
  faBars,
  faMoon,
  faSun,
  faMagnifyingGlass,
  faChevronRight,
  faFacebook,
  faInstagram,
  faGithub,
  faStar,
  faStarHalfAlt,
  faStarRegular
);

const app = createApp(App);
const pinia = createPinia();
const queryClient = new QueryClient();
pinia.use(piniaPersist);

app.use(router);
app.use(VueQueryPlugin, { queryClient });
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
