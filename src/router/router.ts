import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ProductDetail from "../components/ProductDetail.vue";
import ListPage from "../views/ListPage.vue";
import CartPage from "../views/CartPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: ":category",
        name: "category",
        component: ListPage,
      },
      {
        path: ":category/:id",
        name: "product-detail",
        component: ProductDetail,
      },
      {
        path: "cart",
        name: "cartPage",
        component: CartPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
