<template>
  <div class="w-full h-screen flex">
    <div class="h-full flex-1 bg-gray-100 p-4 overflow-auto">
      <div>
        <header>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex" aria-label="Tabs">
                <a @click="getOption(tab)"
                  v-for="tab in tabs"
                  :key="tab.name"
                  :href="tab.href"
                  :class="[
                    selectTab.name === tab.name
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium',
                  ]"
                  :aria-current=" selectTab.name === tab.name ? 'page' : undefined"
                  >{{ tab.name }}</a
                >
              </nav>
            </div>
          </div>
        </header>
      </div>
      <div class="h-full flex flex-wrap content-start gap-4">
        <Product
          v-for="product in products"
          :product="{ product }"
          :key="product.id"
        ></Product>
      </div>
    </div>
    <div class="w-[500px] h-screen bg-white">
      <Order />
    </div>
    <PaymentMethodModal />
    <ShippingMethodModal />
    <NotesModal />
    <OrderItemModal />
  </div>
</template>

<script setup>
import { useMainStore } from "@/stores/main.store";
import Product from "../components/Product.vue";
import Order from "../components/Order.vue";
import PaymentMethodModal from "../components/Modals/PaymentMethod.vue";
import ShippingMethodModal from "../components/Modals/ShippingMethod.vue";
import NotesModal from "../components/Modals/Notes.vue";
import OrderItemModal from "../components/Modals/OrderItem.vue";
import { onMounted, ref } from "vue";

const tabs = [
  { name: "Todos", href: "#", current: false },
  { name: "Bowls", href: "#", current: false },
  { name: "Bebidas", href: "#", current: true },
  { name: "Extra", href: "#", current: false },
];

const mainStore = useMainStore();

const products = ref([]);
let selectTab = ref(tabs[0]);

onMounted(() => {
  getProducts();
});

const getProducts = async () => {
  const originProducts = await mainStore.getProducts();
  products.value = originProducts.data;
};


const getOption = async (optionTab) => {
  if (optionTab.name == 'Todos') {
    getProducts()
    selectTab.value = tabs[0]
  } else {
    selectTab.value = optionTab
    const originProducts = await mainStore.getProducts();
    products.value = originProducts.data.filter(originProducts => originProducts.group === optionTab.name);
  }

};
</script>
