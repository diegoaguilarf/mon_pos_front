import { createRouter, createWebHistory } from "vue-router";
import OrdersView from "../views/OrdersView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: OrdersView,
    },
  ],
});

export default router;
