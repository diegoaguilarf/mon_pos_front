import { createRouter, createWebHistory } from "vue-router";

import OrdersView from "../views/OrdersView.vue";
import OrdersNew from "../views/NewOrderView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: OrdersView,
    },
    {
      path: "/orders/new",
      name: "OrdersNew",
      component: OrdersNew,
    },
  ],
});

export default router;
