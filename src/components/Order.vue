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
                                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img :src="product.image" class="h-full w-full object-cover object-center" />
                                    </div>

                                    <div class="ml-4 flex flex-1 flex-col justify-center">
                                        <div>
                                            <div class="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <a>{{ product.name }}</a>
                                                </h3>
                                                <p class="ml-4">{{ product.quantity * product.price }}</p>
                                            </div>
                                        </div>
                                        <div class="flex items-end justify-between text-sm">
                                            <p class="text-gray-500">Qty {{ product.quantity }}</p>

                                            <div class="flex">
                                                <button type="button" @click="removeProduct(product)"
                                                    class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="border-t border-gray-200">
                    <div class="flex">
                        <div class="flex-1 py-4 text-center border-r border-b border-gray-200 cursor-pointer"
                            @click="openCustomer">
                            <p>Cliente</p>
                        </div>
                        <div class="flex-1 py-4 text-center  border-r border-b border-gray-200 cursor-pointer"
                            @click="openPayment">
                            <p>Medio de pago</p>
                        </div>
                        <div class="flex-1 py-4 text-center border-b cursor-pointer" @click="openShipping">
                            <p>Medio de envio</p>
                        </div>
                    </div>
                    <div class="px-4 py-6 sm:px-6">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$262.00</p>
                        </div>
                        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
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
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useMainStore } from "@/stores/main.store";

const mainStore = useMainStore();

const products = ref(mainStore.orderProducts);

const removeProduct = (product) => {
    mainStore.removeProductFromOrder(product);
}

const openCustomer = () => {
    // mainStore.customerModal = true;
}

const openPayment = () => {
    mainStore.togglePaymentMethodModal();
}

const openShipping = () => {
    mainStore.toggleShippingMethodModal();
}

const createOrder = () => {
    console.log("Hacer order");
}

</script>