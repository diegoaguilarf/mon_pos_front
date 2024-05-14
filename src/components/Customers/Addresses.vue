<template>
    <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt class="text-sm font-medium leading-6 text-gray-900">
            <p>
                Direcciones
            </p>
            <p>
                <button @click="showAddressInput = true" type="button"
                    class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Agregar nueva</button>
            </p>
        </dt>

        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div v-if="showAddressInput" class="border p-6 mb-2 rounded-md">
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <Neighborhood v-model="selectedNeighborhood" class="col-span-1" />
                    <div class="col-span-2">
                        <label for="first-name"
                            class="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                        <div class="mt-2">
                            <input v-model="newAddress" type="text" name="newAddress" id="newAddress"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
                <div class="flex gap-4">
                    <button @click="createAddress"
                        class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1">
                        Guardar
                    </button>
                    <button
                        class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800"
                        @click="showAddressInput = false"
                        >
                        Cancelar
                    </button>
                </div>
            </div>

            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li v-for="address in addresses" :key="address.id"
                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div class="flex w-0 flex-1 items-center">
                        <div class="ml-4 flex flex-col min-w-0 flex-1">
                            <div class="flex gap-2" v-if="address?.neighborhood">
                                <span class="truncate font-medium"> {{ address?.neighborhood?.name }}</span>
                                <span class="bg-green-500 text-white px-2 rounded-lg">${{ address?.neighborhood?.price
                                    }}</span>
                            </div>
                            <span class="flex-shrink-0 text-gray-400">{{ address.street }}</span>
                        </div>
                    </div>
                    <div class="ml-4 flex flex-shrink-0 space-x-4">
                        <button @click="deleteAddress(address.id)" type="button"
                            class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">Eliminar</button>
                    </div>

                </li>
            </ul>
        </dd>
    </div>
</template>

<script setup>
import { computed, ref, watch, onMounted } from "vue";

import { useCustomerStore } from "@/stores/customer.store";
import Neighborhood from "@/components/Customers/Neighborhood.vue";

const props = defineProps(["customerId"]);

const customerStore = useCustomerStore();


onMounted(() => {
    customerStore.getNeighborhoods();
    customerStore.getAddressesByUser(props.customerId);
});

watch(() => props.customerId, (newValue) => {
    customerStore.getAddressesByUser(newValue);
});

let detailAddress = ref('')
let editingId = ref(null)
const newAddress = ref('')
const showAddressInput = ref(false);

const neighborhoods = computed(() => customerStore.neighborhoods);
const addresses = computed(() => customerStore.addresses);

const query = ref('')

const queryNeighborhood = computed(() => {
    return query.value === '' ? null : { id: null, name: query.value }
})

const selectedNeighborhood = ref(null)
const filteredNeighborhoods = computed(() =>
    query.value === ''
        ? neighborhoods.value
        : neighborhoods.value.filter((neighborhood) => {
            return neighborhood.name.toLowerCase().includes(query.value.toLowerCase())
        })
)

const createAddress = async () => {

    if (selectedNeighborhood.value.id === null) {
        newNeighborhood = await customerStore.createNeighborhood({ name: selectedNeighborhood.value.name });
        selectedNeighborhood.value = newNeighborhood;
    }

    const newAddressObject = {
        neighborhood_id: selectedNeighborhood.value.id,
        street: newAddress.value,
        user_id: props.customerId
    }
    addresses.value.push(newAddressObject)
    selectedNeighborhood.value = '';
    newAddress.value = '';
    showAddressInput.value = false;

    await customerStore.createAddress(newAddressObject)
}

const deleteAddress = (id) => {
    addresses.value = addresses.value.filter(address => address.id !== id)
    localStorage.setItem('addresses', JSON.stringify(addresses.value))
    console.log(addresses.value)
}

const toggleEdit = (id) => {
    editingId.value = id === editingId.value ? null : id
}

const isEditing = (id) => {
    return editingId.value === id
}

const updateAddress = (id) => {
    const index = addresses.value.findIndex(address => address.id === id)
    if (index !== -1) {
        addresses.value[index].detail = detailAddress.value
        localStorage.setItem('addresses', JSON.stringify(addresses.value))
        detailAddress.value = ''
        editingId.value = null
    }
}

</script>
