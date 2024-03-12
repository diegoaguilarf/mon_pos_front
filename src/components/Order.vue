<template>
  <div class="pointer-events-none inset-y-0 right-0 flex w-full h-full">
    <div class="pointer-events-auto w-full">
      <div class="flex h-full flex-col overflow-y-scroll bg-white">
        <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-medium text-gray-900">Order</h3>
          </div>

          <div class="mt-8">
            <div class="flow-root">
              <ul role="list" class="-my-6 divide-y divide-gray-200">
                <li v-for="product in products" :key="product.id" class="flex py-2">
                  <div @click="openOrderItem(product)"
                    class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 cursor-pointer">
                    <img :src="product.image" class="h-full w-full object-cover object-center" />
                  </div>

                  <div class="ml-4 flex flex-1 flex-col justify-center">
                    <div>
                      <div class="flex justify-between text-base font-medium text-gray-900">
                        <h3 @click="openOrderItem(product)" class="cursor-pointer">
                          <a>{{ product.name }}</a>
                        </h3>
                        <div class="flex">
                          <p v-if="product?.total" class="ml-4 cursor-pointer line-through text-gray-400">
                            ${{ product.quantity * product.price }}
                          </p>
                          <p @click="openOrderItem(product)" class="ml-4 cursor-pointer">
                            ${{ product?.total || product.quantity * product.price }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-end justify-between text-sm">
                      <p class="text-gray-500">Qty {{ product.quantity }}</p>

                      <div class="flex">
                        <button type="button" @click="removeProduct(product)"
                          class="font-medium text-indigo-600 hover:text-indigo-500">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-200">
          <div class="grid grid-cols-3">
            <router-link to="/clientes" class="flex-1 py-4 text-center border-r border-b border-gray-200 cursor-pointer"
              :class="mainStore?.orderCustomer ? 'bg-green-600 text-white' : ''">
              <p>{{ mainStore?.orderCustomer?.full_name || "Cliente" }}</p>
            </router-link>
            <div class="flex-1 py-4 text-center border-r border-b border-gray-200 cursor-pointer"
              :class="mainStore?.orderPaymentMethod ? 'bg-green-600 text-white' : ''" @click="openPayment">
              <p>{{ mainStore?.orderPaymentMethod || "Medio de pago" }}</p>
            </div>
            <div class="flex-1 py-4 text-center border-b cursor-pointer"
              :class="mainStore?.orderShippingMethod ? 'bg-green-600 text-white' : ''" @click="openShipping">
              <p>{{ mainStore?.orderShippingMethod || "Medio de envio" }}</p>
            </div>
            <!-- <div class="flex-1 py-4 text-center border-r border-b border-gray-200 cursor-pointer"
              :class="mainStore?.orderPaymentMethod ? 'bg-green-600 text-white' : ''" @click="openPayment">
              <p>{{ mainStore?.orderPaymentMethod || "Cupones" }}</p>
            </div>
            <div class="flex-1 py-4 text-center border-r border-b border-gray-200 cursor-pointer"
              :class="mainStore?.orderPaymentMethod ? 'bg-green-600 text-white' : ''" @click="openPayment">
              <p>{{ mainStore?.orderPaymentMethod || "Dirección" }}</p>
            </div>
            <div class="flex-1 py-4 text-center border-b border-gray-200 cursor-pointer"
              :class="mainStore?.orderPaymentMethod ? 'bg-green-600 text-white' : ''" @click="openPayment">
            </div> -->
          </div>
          <div class="px-4 py-6 sm:px-6">
            <div class="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${{ subtotalOrder }}</p>
            </div>
            <p class="mt-0.5 text-sm text-gray-500">
              El envio sera calculado al final.
            </p>
            <div class="flex items-center justify-between">
              <label for="shipping_cost" class="block leading-6 text-base font-medium text-gray-900">Valor del
                envio</label>
              <div class="mt-2">
                <input v-model="shippingCost" id="shipping_cost" name="shipping_cost" type="text" placeholder="$0.00"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="mt-12">
              <button @click="createOrder"
                class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                Hacer Pedido
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "@/stores/main.store";

const mainStore = useMainStore();

const products = computed(() => mainStore.orderProducts);
const shippingCost = ref(0);

const subtotalOrder = computed(() => {
  return mainStore.subtotalOrder;
});

const removeProduct = (product) => {
  mainStore.removeProductFromOrder(product);
};

const openPayment = () => {
  mainStore.togglePaymentMethodModal();
};

const openShipping = () => {
  mainStore.toggleShippingMethodModal();
};

const openOrderItem = (product) => {
  mainStore.setOrderItem(product);
  mainStore.toggleOrderItemModal(true);
};

const createOrder = async () => {
  if (
    mainStore?.orderProducts?.length === 0 ||
    !mainStore?.orderCustomer ||
    !mainStore?.orderPaymentMethod
  ) {
    alert("Debe seleccionar productos, cliente y metodo de pago.");
    return;
  }
  await mainStore.addShippingCostToOrder(shippingCost.value);
  mainStore.toggleNotesModal();
};
</script>
