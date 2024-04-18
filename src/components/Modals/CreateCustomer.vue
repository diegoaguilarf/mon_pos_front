<template>
    <Modal :show="mainStore.createCustomerModal" @close="">
        <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl" @submit.prevent="">
            <div class="px-4 py-6 sm:p-8">
                <div class="grid max-w-2xl grid-cols-4 gap-x-6 gap-y-8">

                    <div class="col-span-2">
                        <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Celular</label>
                        <div class="mt-2">
                            <input v-model="phone_number" id="phone" name="phone" type="text"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-2">
                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                        <div class="mt-2">
                            <input v-model="full_name" type="text" name="first-name" id="first-name"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <!-- <div class="col-span-1">
                        <label for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900">Tipo</label>
                        <div class="mt-2">
                            <input v-model="address" type="text" name="street-address" id="street-address"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-1">
                        <label for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900">Barrio</label>
                        <div class="mt-2">
                            <input v-model="address" type="text" name="street-address" id="street-address"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div> -->

                    <div class="col-span-4">
                        <label for="street-address"
                            class="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                        <div class="mt-2">
                            <input v-model="address" type="text" name="street-address" id="street-address"
                                autocomplete="street-address"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Notas</label>
                        <div class="mt-2">
                            <textarea v-model="notes" id="about" name="about" rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button @click="onClose" class="text-sm font-semibold leading-6 text-gray-900">
                    Cancelar
                </button>
                <button type="submit" @click="createCustomer"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Guardar y asignar
                </button>
            </div>
        </form>
    </Modal>
</template>

<script setup>
import { ref } from "vue";
import { useMainStore } from "@/stores/main.store";
import Modal from "./index.vue";

const mainStore = useMainStore();

const full_name = ref("");
const phone_number = ref("");
const address = ref("");
const notes = ref("");

const createCustomer = async () => {
    if (
        full_name.value === "" ||
        phone_number.value === "" ||
        address === ""
    ) {
        alert("Ingrese todos los datos");
        return;
    }
    const customer = await mainStore.createCustomer({
        full_name: full_name.value,
        phone_number: phone_number.value,
        address: address.value,
        notes: notes.value,
    });
    await mainStore.assignCustomerToOrder(customer.data);
    onClose();
};

const onClose = () => {
    mainStore.toggleCreateCustomerModal();
}

</script>