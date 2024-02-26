<template>
    <li class="border-b">
        <router-link :to="`/inventory/item/${item.id}`" @click="selectItem(item)" class="flex">
            <div class="flex-1 py-2 px-4">
                <p class="font-semibold capitalize">{{ item.name }}</p>
                <p>{{ item.category }}</p>
            </div>
            <div class="w-24 bg-gray-200 text-center py-2">
                <p>{{ item.min_stock }}</p>
                <p>Stock Min</p>
            </div>
            <div :class="currentStatus" class="w-24 text-center py-2">
                <p>{{ item.stock }}</p>
                <p>Stock</p>
            </div>
        </router-link>
    </li>
</template>

<script setup>
import { computed } from 'vue';
const { item, selectItem } = defineProps(["item", "selectItem"]);

const currentStatus = computed(() => {
    if (item.stock < item.min_stock) {
        return 'bg-red-500';
    } else if (item.stock <= (item.min_stock + (item.min_stock * 0.25))) {
        return 'bg-yellow-500';
    }
    
    return 'bg-green-500';
});

</script>