<template>
    <div class="h-screen py-4 px-6 flex-1 overflow-auto">
        <div class="flex justify-between items-center">
            <div>
                <h3 class="text-base font-semibold leading-7 text-gray-900">Descripción general</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos personales del cliente</p>
            </div>
            <button @click="updateOrderAddresses"
                class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1">
                Asignar
            </button>
        </div>
        <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow capitalize">{{ orderCustomer?.full_name }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.phone_number }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Birthdate</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.birthdate }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Identification Number</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.identification_number }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Notes</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.notes }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <Addresses :customerId="orderCustomer?.id"></Addresses>
            </dl>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useCustomerStore } from "@/stores/customer.store";
import { useMainStore } from "@/stores/main.store";
import Addresses from '@/components/Customers/Addresses.vue';

const props = defineProps(["orderCustomer"]);
const router = useRouter();
const mainStore = useMainStore();
const customerStore = useCustomerStore();

const updateOrderAddresses = () => {
    mainStore.setOrderAddresses(customerStore.addresses);
    router.push("/orders/new");
}

</script>