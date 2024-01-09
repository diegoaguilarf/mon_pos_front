<template>
  <div class="w-full h-screen flex">
    <div class="h-full flex-1 bg-gray-100 p-4 overflow-auto">
      <div class="h-full flex flex-wrap content-start gap-4">
        <Product v-for="product in products" :product={product}></Product>
      </div>
    </div>
    <div class="w-[500px] h-screen bg-white">
      <Order />
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from "@/stores/main.store";
import Product from "../components/Product.vue";
import Order from "../components/Order.vue";
import { onMounted, ref } from "vue";

const mainStore = useMainStore();

const products = ref([]);

onMounted(() => {
  getProducts();
});

const getProducts = async () => {
  const originProducts = await mainStore.getProducts();
  products.value = originProducts.data;
}

</script>
