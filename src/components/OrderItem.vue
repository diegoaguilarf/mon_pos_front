<template>
  <div>
    <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="truncate text-xl font-medium text-gray-900">
              ID: {{ order.id }}
            </h3>
          </div>
          <ul class="">
            <li
              v-for="(product, index) in order.products"
              :key="index"
              class="mt-1 truncate text-md text-gray-500"
            >
              <p>- {{ product.name }} X {{ product.quantity }}</p>
            </li>
          </ul>
          <div class="border-t mt-3">
            <h3 class="text-gray-500 text-xs mt-3">Comentarios:</h3>
            <p class="text-xs text-gray-500">
              {{ order.comment }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <a
              class="cursor-pointer relative text-white bg-green-500 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm font-semibold"
            >
              Aceptar
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <a
              class="cursor-pointer relative text-white bg-red-400 inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm font-semibold"
            >
              Rechazar
            </a>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<script setup>
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/20/solid";
const props = defineProps(["order"]);
</script>
