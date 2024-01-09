<template>
  <div class="px-36 py-10">
    <h2 class="text-base font-semibold leading-7 text-gray-900">
      Asignar o Agregar nuevo cliente
    </h2>
    <p class="mt-1 text-sm leading-6 text-gray-600">
      Datos personales de los clientes
    </p>
    <div class="space-y-5">
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-5 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <div class="border rounded-lg p-10">
            <h2 class="font-bold">Clientes</h2>
            <div class="grid gap-5 mt-5">
              <div class="flex justify-between" v-for="(customer, index) in customers">
                <div>
                  <p>{{ customer.full_name }}</p>
                  <p class="text-sm text-gray-500">Celular:{{ customer.phone_number }}</p>
                </div>
                <button @click="assignCustomerToOrder(customer)"
                  class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1">
                  Asignar
                </button>
              </div>
            </div>
          </div>
        </div>

        <form class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" @submit.prevent="">
          <div class="px-4 py-6 sm:p-8">
            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="col-span-full">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Nombre</label>
                <div class="mt-2">
                  <input v-model="full_name" type="text" name="first-name" id="first-name" autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="col-span-full">
                <label for="phone" class="block text-sm font-medium leading-6 text-gray-900">Celular</label>
                <div class="mt-2">
                  <input v-model="phone_number" id="phone" name="phone" type="text"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div class="col-span-full">
                <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
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
            <RouterLink to="/orders/new" class="text-sm font-semibold leading-6 text-gray-900">
              Cancelar
            </RouterLink>
            <button type="submit" @click="createCustomer"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Guardar y asignar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useMainStore } from "@/stores/main.store";
import router from "@/router";

const mainStore = useMainStore();

const full_name = ref("");
const phone_number = ref("");
const address = ref("");
const notes = ref("");

const customers = ref([]);

onMounted(() => {
  getCustomers();
});

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
    router.push("/orders/new");
  } catch (error) {
    console.log(error);
  }
};

const createCustomer = async () => {
  const customer = await mainStore.createCustomer({
    full_name: full_name.value,
    phone_number: phone_number.value,
    address: address.value,
    notes: notes.value,
  });
  await mainStore.assignCustomerToOrder(customer.data);
  router.push("/orders/new");
}

</script>
