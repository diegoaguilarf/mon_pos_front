import { createRouter, createWebHistory } from "vue-router";

import DashboardView from "@/views/Dashboard.vue";

import InventoryList from "@/views/Inventory/List.vue";
import InventoryNew from "@/views/Inventory/New.vue";
import InventoryItem from "@/views/Inventory/Item.vue";
import InventoryItemNewTransaction from "@/views/Inventory/ItemNewTransaction.vue";

import OrdersView from "@/views/OrdersView.vue";
import OrdersNew from "@/views/NewOrderView.vue";
import Customers from "@/views/Customers.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/kds",
      name: "kds",
      component: OrdersView,
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

export default router;
