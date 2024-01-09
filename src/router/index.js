import { createRouter, createWebHistory } from "vue-router";

import OrdersView from "@/views/OrdersView.vue";
import OrdersNew from "@/views/NewOrderView.vue";
import FormClient from "@/views/FormClient.vue";

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
    {
      path: "/clientes",
      name: "clients",
      component: FormClient,
    },
  ],
});

export default router;
