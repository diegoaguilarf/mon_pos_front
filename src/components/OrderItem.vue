<template>
  <div>
    <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center justify-between space-x-3">
            <h3 class="truncate text-xl font-medium text-gray-900">
              ID: {{ order.id }}
            </h3>
            <img src="@/assets/rappi.png" v-if="order.shipping_method === 'Rappi'" class="w-8 h-8">
            <img src="@/assets/sp.jpg" v-else-if="order.shipping_method === 'Externo'" class="w-8 h-8 rounded-full">
            <img src="@/assets/monchef.png" v-else-if="order.shipping_method === 'Monchef'" class="w-8 h-8">
          </div>
          <ul class="">
            <li v-for="(product, index) in order.orders_products" :key="index" class="mt-1 truncate text-md text-gray-500">
              <p>- {{ product.products.name }} X {{ product.quantity }}</p>
              <p v-if="product.notes" class="text-sm text-red-500">^ {{ product.notes }}</p>
            </li>
          </ul>
          <div class="border-t mt-3">
            <h3 class="text-gray-500 text-xs mt-3">Nota:</h3>
            <p class="text-xs text-gray-500">
              {{ order.notes }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button
              @click="showDetails"
              class="cursor-pointer relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold">
              Ver Info
          </button>
          </div>
          <div class="flex w-0 flex-1">
            <button
              @click="moveOrderToNextStatus"
              class="cursor-pointer relative text-white bg-green-500 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<script setup>
import { useMainStore } from "@/stores/main.store";

const mainStore = useMainStore();

const props = defineProps(["order"]);


const moveOrderToNextStatus = async () => {
  const nextStatus = {
    new: "preparing",
    preparing: "delivery",
    delivery: "done",
  }
  await mainStore.updateOrderStatus({ id: props.order.id, status: nextStatus[props.order.status] });
}

const showDetails = () => {
  mainStore.setOrderDetails(props.order);
}

</script>
