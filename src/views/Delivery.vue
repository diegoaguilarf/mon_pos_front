<template>
  <div class="h-full bg-gray-100">
    <Header />
    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 px-4">
          <div class="grid md:grid-cols-4 grid-cols-1 gap-8">
            <div class="rounded-lg">
              <div class="h-16 py-2 px-3 font-bold text-xl items-center flex sticky top-0 bg-gray-100 ">
                Por entregar
              </div>
              <div v-if="deliveryOrders.length === 0" class="flex items-center justify-center h-full">
                <p class="text-gray-500 text-sm">
                  Aqui veras las ordenes por aceptar
                </p>
              </div>
              <div v-else class="p-1">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <DeliveryItem v-for="order in deliveryOrders" :key="order.email" :order="order">
                  </DeliveryItem>
                </ul>
              </div>
            </div>
            <div class="rounded-lg">
              <div class="h-16 py-2 px-3 font-bold text-xl items-center flex sticky top-0 bg-gray-100 ">
                En preparación
              </div>
              <div v-if="preparingOrders.length === 0">
                Aqui veras las ordenes por aceptar
              </div>
              <div v-else class="p-1">
                <ul role="list" class="grid grid-cols-1 gap-6">
                  <li v-for="order in preparingOrders" :key="order.email" :order="order"
                    class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow grayscale">
                    <div class="flex items-center justify-between space-x-3 px-6 py-4">
                      <h3 class="truncate text-xl font-medium text-gray-900">
                        ID: {{ order.id }}
                      </h3>
                      <p class="p-2 bg-green-500 rounded-lg text-white">27 m</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <OrderItemDetails />
  </div>
</template>
<script setup>
import { useMainStore } from "@/stores/main.store";
import Header from "@/components/Header.vue";
import DeliveryItem from "@/components/DeliveryItem.vue";
import OrderItemDetails from "@/components/OrderItemDetails.vue";
import { computed, onMounted, ref } from "vue";
import { supabase } from "@/services/supabase.service";

const mainStore = useMainStore();

onMounted(() => {
  init()
  getOrders();
});

const audio = new Audio("/super-mario-bros.mp3");

const newOrders = computed(() => {
  return mainStore.orders.filter((order) => order.status === "new").reverse();
});
const preparingOrders = computed(() => {
  return mainStore.orders.filter((order) => order.status === "preparing").reverse();
});

const deliveryOrders = computed(() => {
  return mainStore.orders.filter((order) => order.status === "delivery" && order.shipping_method !== 'Rappi').reverse();
});

const deliveryRappiOrders = computed(() => {
  return mainStore.orders.filter((order) => order.status === "delivery" && order.shipping_method === 'Rappi').reverse();
});

const init = () => {
  supabase.channel('custom-insert-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'orders' },
      () => {
        listenOrderInsert()
      }
    )
    .subscribe()

  supabase.channel('custom-update-channel')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'orders' },
      (payload) => {
        listenOrderStatusChange(payload.new)
      }
    )
    .subscribe()

  setInterval(() => {
    if (newOrders.value.length > 0) {
      playToAlert()
    }
  }, 30000);
};

const getOrders = async () => {
  mainStore.getOrders();
}

const playToAlert = () => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

const stopToAlert = () => {
  audio.pause();
  audio.currentTime = 0;
}

const listenOrderInsert = async () => {
  playToAlert()
  getOrders()
}

const listenOrderStatusChange = async ({ id, status }) => {
  stopToAlert();
  const orders = mainStore.orders.map((order) => {
    if (order.id === id) {
      order.status = status;
    }
    return order;
  });

  mainStore.setOrders(orders)
}
</script>
