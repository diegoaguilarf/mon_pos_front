<template>
  <div>
    <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow" @click="showDetails">
      <div class="flex w-full items-center justify-between space-x-6 px-6 py-4">
        <div class="flex-1 truncate">
          <div class="flex items-center justify-between space-x-3">
            <h3 class="truncate text-xl font-medium text-gray-900">
              ID: {{ order.id }}
            </h3>
            <div>
              <p class="p-2 bg-green-500 rounded-lg text-white">27 m</p>
            </div>
          </div>
          <p>{{ order.users.address }}</p>
          <p class="mb-5">{{ order.users.phone_number }}</p>
          <p class="font-sm text-gray-500 text-center">Creado a las 12:17 pm</p>
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
