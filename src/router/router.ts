import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ProductDetail from "../components/ProductDetail.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "products/:id",
        name: "product-detail",
        component: ProductDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
