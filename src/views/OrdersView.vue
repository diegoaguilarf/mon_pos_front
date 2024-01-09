<template>
  <div class="h-full">
    <Header />
    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 grid-cols-1 gap-10">
            <div class="border rounded-lg">
              <div class="h-16 border-b py-2 px-3 font-bold text-xl items-center flex">
                Por aceptar
              </div>
              <div v-if="pendingOrders.length === 0">
                Aqui veras las ordenes por aceptar
              </div>
              <div v-else class="p-5">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <OrderItem v-for="order in pendingOrders" :key="order.email" :order="order">
                  </OrderItem>
                </ul>
              </div>
            </div>
            <div class="border rounded-lg">
              <div class="h-16 border-b py-2 px-3 font-bold text-xl items-center flex">
                En preparación
              </div>
              <div v-if="preparingOrders.length === 0">
                Aqui veras las ordenes por aceptar
              </div>
              <div v-else class="p-5">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <OrderItem v-for="order in preparingOrders" :key="order.email" :order="order">
                  </OrderItem>
                </ul>
              </div>
            </div>
            <div class="border rounded-lg">
              <div class="h-16 border-b py-2 px-3 font-bold text-xl items-center flex">
                Por entregar
              </div>
              <div v-if="deliveryOrders.length === 0" class="flex items-center justify-center h-full">
                <p class="text-gray-500 text-sm">
                  Aqui veras las ordenes por aceptar
                </p>
              </div>
              <div v-else class="p-5">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <OrderItem v-for="order in deliveryOrders" :key="order.email" :order="order">
                  </OrderItem>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import OrderItem from "@/components/OrderItem.vue";
import { computed, onMounted } from "vue";
import { supabase } from "@/services/supabase.service";

onMounted(() => {
  init()
});

const init = () => {
  console.log("ANY")
  supabase.channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'orders' },
    (payload) => {
      console.log('INSERT Change received!', payload)
    }
  )
  .subscribe()

  supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders' },
      (payload) => {
        console.log('UPDATE Change received!', payload)
      }
    )
    .subscribe()
};

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const pendingOrders = computed(() => {
  return people.filter((order) => order.status === "pending");
});
const preparingOrders = computed(() => {
  return people.filter((order) => order.status === "preparing");
});

const deliveryOrders = computed(() => {
  return people.filter((order) => order.status === "delivery");
});

const people = [
  {
    id: 123,
    products: [
      {
        name: "Llanero",
        quantity: 3,
      },
      {
        name: "Paisa",
        quantity: 2,
      },
      {
        name: "Thai",
        quantity: 1,
      },
    ],
    status: "pending",
    comment: "Sin carne",
  },
  {
    id: 456,
    products: [
      {
        name: "Llanero",
        quantity: 3,
      },
    ],
    comment: "Sin carne",
    status: "pending",
  },
  {
    id: 789,
    products: [
      {
        name: "Llanero",
        quantity: 3,
      },
    ],
    comment: "Sin carne",
    status: "pending",
  },
  {
    id: 543,
    products: [
      {
        name: "Llanero",
        quantity: 3,
      },
    ],
    comment: "Sin carne",
    status: "preparing",
  },
  {
    id: 212,
    products: [
      {
        name: "Llanero",
        quantity: 3,
      },
    ],
    comment: "Sin carne",
    status: "delivery",
  },

  // More people...
];
</script>
