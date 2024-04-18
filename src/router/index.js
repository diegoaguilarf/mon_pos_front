import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/Login.vue"
import DashboardView from "@/views/Dashboard.vue";

import InventoryList from "@/views/Inventory/List.vue";
import InventoryNew from "@/views/Inventory/New.vue";
import InventoryItem from "@/views/Inventory/Item.vue";
import InventoryItemNewTransaction from "@/views/Inventory/ItemNewTransaction.vue";

import OrdersView from "@/views/OrdersView.vue";
import OrdersNew from "@/views/NewOrderView.vue";
import Customers from "@/views/Customers.vue";

import Delivery from "@/views/Delivery.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: "/kds",
      name: "kds",
      component: OrdersView,
    },
    {
      path: "/delivery",
      name: "delivery",
      component: Delivery,
    },
    {
      path: "/inventory",
      name: "inventoryList",
      component: InventoryList,
    },
    {
      path: "/inventory/new",
      name: "inventoryNew",
      component: InventoryNew,
    },
    {
      path: "/inventory/item/:id",
      name: "inventoryItem",
      component: InventoryItem,
    },
    {
      path: "/inventory/item/:id/new",
      name: "InventoryItemNewTransaction",
      component: InventoryItemNewTransaction,
    },
    {
      path: "/orders/new",
      name: "OrdersNew",
      component: OrdersNew,
    },
    {
      path: "/clientes",
      name: "Customers",
      component: Customers,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && to.path === '/') {
    next('/dashboard');
  }

  if (user) {
    next();
  } else {
    next('/');
  }
});

export default router;
