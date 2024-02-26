<template>
    <div>
        <Header to="/" />
        <div class="p-6">
            <input type="text" id="email" placeholder="Buscar Producto"
                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        </div>
        <ul class="border-t">
            <Item v-for="item in inventory" class="border-b" :item="item" :selectItem="selectItem"/>
        </ul>
        <router-link to="/inventory/new" class="p-4 bg-indigo-500 text-white rounded-full fixed bottom-6 right-6">
            <PlusIcon class="w-8 h-8" />
        </router-link>
    </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';
import { onMounted, computed } from 'vue';
import { useMainStore } from '@/stores/main.store';
import { useInventoryStore } from '@/stores/inventory.store';
import Header from "@/components/Inventory/Header.vue";
import Item from "@/components/Inventory/Item.vue";

const mainStore = useMainStore();
const inventoryStore = useInventoryStore();

onMounted(() => {
    mainStore.getInventory();
});

const inventory = computed(() => mainStore.inventory);

const selectItem = (item) => {
    inventoryStore.setItem(item);
}

</script>