<template>
    <Header to="/inventory" />
    <div class="p-6">
        <div class="grid gap-5">
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Nombre
                </label>
                <div class="mt-2">
                    <input v-model="name" id="identification_number" name="identification_number" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Categoria
                </label>
                <div class="mt-2">
                    <input v-model="category" id="identification_number" name="identification_number" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Unidad de medida
                </label>
                <div class="mt-2">
                    <input v-model="uom" id="identification_number" name="identification_number" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Stock Minimo
                </label>
                <div class="mt-2">
                    <input v-model="minStock" id="identification_number" name="identification_number" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <label for="identification_number" class="block text-sm font-medium leading-6 text-gray-900">
                    Stock
                </label>
                <div class="mt-2">
                    <input v-model="stock" id="identification_number" name="identification_number" type="text"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-2">
                <button @click="create"
                    class="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Crear Item
                </button>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useInventoryStore } from "@/stores/inventory.store";
import Header from "@/components/Inventory/Header.vue";

const router = useRouter();
const inventoryStore = useInventoryStore();

const name = ref("");
const category = ref("");
const uom = ref("");
const minStock = ref("");
const stock = ref("");

const create = async () => {
    await inventoryStore.createItem({
        name: name.value,
        category: category.value,
        uom: uom.value,
        min_stock: minStock.value,
        stock: stock.value
    });
    
    name.value = "";
    category.value = "";
    uom.value = "";
    minStock.value = "";
    stock.value = "";
    
    router.push("/inventory");
}


</script>