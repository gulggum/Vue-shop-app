import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import MainLayout from "../layouts/MainLayout.vue";
import ProductDetail from "../components/ProductDetail.vue";
import CategoryPage from "../views/CategoryPage.vue";
import CartPage from "../views/CartPage.vue";
import NotFound from "../views/NotFound.vue";

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
        component: CategoryPage,
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
      {
        path: "/:pathMatch(.*)*",
        name: "notFoundPage",
        component: NotFound,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
