<template>
    <TransitionRoot as="template" :show="mainStore.orderDetails !== null">
        <Dialog as="div" class="relative z-10" @close="resetOrderDetails">
            <div class="fixed inset-0 bg-black opacity-10" @close="resetOrderDetails" />

            <div class="fixed inset-0 overflow-hidden">
                <div class="absolute inset-0 overflow-hidden">
                    <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enter-from="translate-x-full" enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0"
                            leave-to="translate-x-full">
                            <DialogPanel class="pointer-events-auto w-screen max-w-md">
                                <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                    <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                        <div class="px-4 sm:px-6">
                                            <div class="flex items-start justify-between">
                                                <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                                                    ID: {{ mainStore?.orderDetails?.id }}
                                                </DialogTitle>
                                                <div class="ml-3 flex h-7 items-center">
                                                    <button type="button"
                                                        class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        @click="resetOrderDetails">
                                                        <span class="absolute -inset-2.5" />
                                                        <span class="sr-only">Close panel</span>
                                                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="relative mt-6 flex-1 px-4 sm:px-6">
                                            <!-- <pre>{{ mainStore?.orderDetails }}</pre> -->
                                            <div class="mb-10">
                                                <div class="flex items-center justify-between space-x-3">
                                                    <h3 class="text-lg font-semibold">Cliente</h3>
                                                </div>
                                                <div class="text-md text-gray-500">
                                                    <p>Nombre: {{ mainStore?.orderDetails?.users.full_name }}</p>
                                                    <p>Celular: {{ mainStore?.orderDetails?.users.phone_number }}</p>
                                                    <p>Dirección: {{ mainStore?.orderDetails?.users.address }}</p>
                                                    <p>Notas: {{ mainStore?.orderDetails?.users.notes }}</p>
                                                </div>
                                            </div>
                                            <div class="flex-1 truncate mb-10">
                                                <div class="flex items-center justify-between space-x-3">
                                                    <h3 class="text-lg font-semibold">Productos</h3>
                                                    <img src="@/assets/rappi.png"
                                                        v-if="mainStore?.orderDetails?.shipping_method === 'Rappi'"
                                                        class="w-8 h-8">
                                                    <img src="@/assets/sp.jpg"
                                                        v-else-if="mainStore?.orderDetails?.shipping_method === 'Externo'"
                                                        class="w-8 h-8 rounded-full">
                                                    <img src="@/assets/monchef.png"
                                                        v-else-if="mainStore?.orderDetails?.shipping_method === 'Monchef'"
                                                        class="w-8 h-8">
                                                </div>
                                                <ul class="">
                                                    <li v-for="(product, index) in mainStore?.orderDetails?.orders_products"
                                                        :key="index" class="mt-1 truncate text-md text-gray-500">
                                                        <p>- {{ product.products.name }} X {{ product.quantity }}</p>
                                                    </li>
                                                </ul>
                                                <div class="border-t mt-3">
                                                    <h3 class="text-gray-500 mt-3">Nota:</h3>
                                                    <p class=" text-gray-500">
                                                        {{ mainStore?.orderDetails?.notes }}
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="mb-10">
                                                <div class="flex items-center justify-between space-x-3">
                                                    <h3 class="text-lg font-semibold">Metodo de pago</h3>
                                                    <p class=" text-gray-500">
                                                        {{ mainStore?.orderDetails?.payment_method }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="mb-10">
                                                <div class="flex items-center justify-between space-x-3">
                                                    <h3 class="text-lg font-semibold">Costo del envío</h3>
                                                    <p class=" text-gray-500">
                                                        {{ mainStore?.orderDetails?.shipping_cost }}
                                                    </p>
                                                </div>
                                            </div>
                                            <div
                                                v-if="mainStore?.orderDetails?.shipping_method === null || mainStore?.orderDetails?.shipping_method === ''">
                                                <div class="flex items-center justify-between space-x-3">
                                                    <h3 class="text-lg font-semibold">Escoger metodo de envio</h3>
                                                </div>
                                                <div class="flex mt-2 gap-4">
                                                    <div class="border p-5 rounded cursor-pointer"
                                                        :class="{ 'bg-green-600 text-white': shippingMethod === 'Monchef' }"
                                                        @click="assignShippingMethodToOrder('Monchef')">Monchef</div>
                                                    <div class="border p-5 rounded cursor-pointer"
                                                        :class="{ 'bg-green-600 text-white': shippingMethod === 'Externo' }"
                                                        @click="assignShippingMethodToOrder('Externo')">Externo</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-shrink-0 justify-end px-4 py-4">
                                        <button type="button"
                                            class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                                            @click="resetOrderDetails">Cancel</button>
                                        <button type="submit" @click="updateOrderShipping"
                                            class="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useMainStore } from "@/stores/main.store";

const mainStore = useMainStore();

const shippingMethod = ref(null);

const resetOrderDetails = () => {
    mainStore.setOrderDetails(null);
}

const assignShippingMethodToOrder = (value) => {
    shippingMethod.value = value;
}

const updateOrderShipping = async () => {
    await mainStore.updateOrderShipping({ id: mainStore.orderDetails.id, shipping_method: shippingMethod.value });
    resetOrderDetails()
}

const open = ref(true)
</script>