<template>
    <Header :to="`/inventory/item/${route.params.id}`" title="New Transaction" />
    <div class="p-6">
        <div class="grid gap-5">
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Type
                </label>
                <div class="mt-2">
                    <span class="isolate flex rounded-md shadow-sm">
                        <button type="button" @click="type = 'output'"
                            :class="type === 'output' ? 'bg-red-500' : 'bg-white'"
                            class="flex-1 relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10">Salida</button>
                        <button type="button" @click="type = 'input'"
                            :class="type === 'input' ? 'bg-green-500' : 'bg-white'"
                            class="flex-1 relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10">Entrada</button>
                    </span>
                </div>
            </div>
            <div class="col-span-2">
                <label for="quantity" class="block text-sm font-medium leading-6 text-gray-900">
                    Quantity
                </label>
                <div class="mt-2">
                    <input v-model="quantity" id="quantity" name="quantity" type="number"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2" v-if="type === 'input'">
                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">
                    Price
                </label>
                <div class="mt-2">
                    <input v-model="price" id="price" name="price" type="number"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <label for="notes" class="block text-sm font-medium leading-6 text-gray-900">
                    Notes
                </label>
                <div class="mt-2">
                    <textarea rows="3" v-model="notes" id="notes" name="notes" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <button @click="register"
                    class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Register
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useInventoryStore } from "@/stores/inventory.store";
import Header from "@/components/Inventory/Header.vue";

const route = useRoute();
const router = useRouter();
const inventoryStore = useInventoryStore();

const type = ref("");
const quantity = ref("");
const price = ref(null);
const notes = ref("");

const register = async () => {
    await inventoryStore.createItemTransaction({
        item_id: route.params.id,
        type: type.value,
        quantity: quantity.value,
        price: price.value,
        notes: notes.value
    });

    router.push(`/inventory/item/${route.params.id}`);
}
</script>