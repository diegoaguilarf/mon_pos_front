<template>
    <div class="min-h-screen bg-gray-100" v-if="currentItem">
        <Header to="/inventory" />
        <div class="flex justify-around pt-10 pb-6">
            <div>
                <h2 class="text-xl font-semibold">{{ currentItem.name }}</h2>
                <p>{{ currentItem.category }}</p>
            </div>
        </div>
        <div class="flex justify-center gap-4 px-4 mb-10">
            <div class="bg-white rounded-lg text-center p-3">
                <p class="text-lg font-semibold">{{ currentItem.stock }} libras</p>
                <p>El minimo es {{ currentItem.min_stock }}</p>
            </div>
            <div class="bg-white rounded-lg text-center p-3">
                <p class="text-lg font-semibold">${{ averageItemCost }} libra</p>
                <p>costo promedio</p>
            </div>
        </div>
        <div>
            <div class="flex items-center justify-between px-4 mb-4">
                <h3 class="text-lg font-semibold">Transacciones</h3>
                <RouterLink :to="`${route.fullPath}/new`"
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Registro
                </RouterLink>
            </div>
            <ul class="bg-white border-t">
                <li class="flex items-center px-2 py-2 border-b" v-for="transaction in transactions">
                    <div 
                        :class="transaction.type === 'input' ? 'bg-green-500' : 'bg-red-500'"
                        class="w-8 h-8 text-white grid place-content-center rounded mr-2">
                        {{ transaction.type === 'input' ? '+' : '-' }}
                    </div>

                    <p :class="transaction.type === 'input' ? 'text-green-800' : 'text-red-800'">{{ formatDistance(transaction.created_at, new Date()) }}</p>

                    <p v-if="transaction.type === 'input'" class="bg-red-500 text-white mx-auto">${{ transaction.price }}</p>
                    <p class="ml-auto">{{ transaction.quantity }} libras</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { formatDistance } from "date-fns";
import { useInventoryStore } from '@/stores/inventory.store';
import Header from "@/components/Inventory/Header.vue";

const route = useRoute();
const inventoryStore = useInventoryStore();

const transactions = ref([]);

const currentItem = computed(() => inventoryStore.currentItem);
const averageItemCost = computed(() => inventoryStore.averageItemCost);

onMounted(() => {
    getTransactions();
    getItem();
});

const getItem = async () => {
    if (!inventoryStore.currentItem) {
        await inventoryStore.getItem({ id: route.params.id });
    }
}

const getTransactions = async () => {
    const { data } = await inventoryStore.getItemTransactions({ item_id: route.params.id });
    transactions.value = data;
}
</script>