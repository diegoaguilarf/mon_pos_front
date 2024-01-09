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
              <div v-if="newOrders.length === 0">
                Aqui veras las ordenes por aceptar
              </div>
              <div v-else class="p-5">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <OrderItem v-for="order in newOrders" :key="order.id" :order="order">
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
import { useMainStore } from "@/stores/main.store";
import Header from "@/components/Header.vue";
import OrderItem from "@/components/OrderItem.vue";
import { computed, onMounted, ref } from "vue";
import { supabase } from "@/services/supabase.service";

const mainStore = useMainStore();

onMounted(() => {
  init()
  getOrders();
});

const orders = ref([]);

const newOrders = computed(() => {
  return orders.value.filter((order) => order.status === "new");
});
const preparingOrders = computed(() => {
  return orders.value.filter((order) => order.status === "preparing");
});

const deliveryOrders = computed(() => {
  return orders.value.filter((order) => order.status === "delivery");
});

const init = () => {
  supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      (payload) => {
        listenOrderInsert()
      }
    )
    .subscribe()

  supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders' },
      (payload) => {
        console.log('UPDATE Change received!', payload)
        listenOrderStatusChange(payload.new)
      }
    )
    .subscribe()
};

const getOrders = async () => {
  const originOrders = await mainStore.getOrders();
  orders.value = originOrders.data;
}

const listenOrderInsert = async () => {
  getOrders()
}

const listenOrderStatusChange = async ({ id, status }) => {
  orders.value = orders.value.map((order) => {
    if (order.id === id) {
      order.status = status;
    }
    return order;
  });
}
</script>
