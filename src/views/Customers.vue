<template>
  <div class="">
    <div class="flex relative min-h-screen">
      <div class="w-96 border-r h-screen overflow-auto">
        <div class="sticky top-0 bg-white pt-6 px-6 pb-3">
          <div class="flex justify-between mb-2">
            <h2 class="font-bold">Clientes</h2>
            <button 
              @click="openCreateCustomer"
              class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1">
              Nuevo
            </button>
          </div>
          <div>
            <label for="email" class="block text-xs font-medium leading-6 text-gray-900">Buscar por celular</label>
            <div class="mt-1">
              <input @change="filterCustomers($event)" type="text" id="email"
                class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
        </div>
        <div class="grid mt-5">
          <div class="flex justify-between px-6 py-3 hover:bg-gray-100 cursor-pointer" v-for="(customer, index) in customers" @click="assignCustomerToOrder(customer)">
            <div>
              <p class="capitalize">{{ customer.full_name }}</p>
              <p class="text-sm text-gray-500">
                Celular: {{ customer.phone_number }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Profile v-if="orderCustomer" :orderCustomer="orderCustomer" />

      <!-- <Coupons :orderCustomer="orderCustomer" /> -->


    </div>
    <CreateCustomer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useMainStore } from "@/stores/main.store";
import Profile from "@/components/Customers/Profile.vue";
import CreateCustomer from "@/components/Modals/CreateCustomer.vue";

const mainStore = useMainStore();

const customers = ref([]);

const orderCustomer = computed(() => mainStore.orderCustomer);

onMounted(() => {
  getCustomers();
});

const filterCustomers = (e) => {
  if (e.target.value === "") {
    getCustomers();
  }
  customers.value = customers.value.filter((customer) =>
    String(customer.phone_number).includes(e.target.value)
  );
};

const getCustomers = async () => {
  try {
    const { data: originCustomers } = await mainStore.getCustomers();
    customers.value = originCustomers;
  } catch (error) {
    console.log(error);
  }
};

const assignCustomerToOrder = async (customer) => {
  try {
    await mainStore.assignCustomerToOrder(customer);
  } catch (error) {
    console.log(error);
  }
};

const openCreateCustomer = () => {
  mainStore.toggleCreateCustomerModal();
};

</script>

<style>
.coupon {
  -webkit-mask-image: radial-gradient(circle at 9px, transparent 9px, red 9.5px);
  -webkit-mask-position: -9px;
  -webkit-mask-size: 100% 32px;
}
</style>