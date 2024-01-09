<template>
    <div class="max-w-56 bg-white rounded-lg p-4 cursor-pointer">
        <img :src="props.product.product.image" alt="" @click="addProduct"/>
        <div>
            <h1>{{ props.product.product.name }}</h1>
            <p>{{ props.product.product.price }}</p>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from "@/stores/main.store";

const props = defineProps(['product'])
const mainStore = useMainStore();

const addProduct = () => {
    mainStore.addProductToOrder(props.product.product);
}

</script>