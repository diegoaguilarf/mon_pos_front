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
            <div v-if="showAddressInput">
                <label for="phone-number" class="block text-sm font-medium leading-6 text-gray-900">Tipo
                    direccion</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <div class="absolute inset-y-0 left-0 flex items-center">
                        <label for="type" class="sr-only">Tipo</label>
                        <select v-model="newType" id="type" name="typeAddress"
                            class="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                            <option disabled value="">Tipo</option>
                            <option>Casa</option>
                            <option>Trabajo</option>
                            <option>Oficina</option>
                            <option>Otro</option>
                        </select>
                    </div>
                    <input v-model="newAddress" type="text" name="newAddress" id="newAddress"
                        class="my-2 block w-full rounded-md border-0 py-1.5 pl-24 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Ingresa la nueva direccion" />
                </div>
                <button @click="createAddress" type="button"
                    class="rounded bg-indigo-600 mb-4 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                <button @click="showAddressInput = false" type="button"
                    class="rounded bg-red-600 mx-2 mb-4 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Cancelar</button>
            </div>

        </dt>

        <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li v-for="address in addresses" :key="address.id"
                    class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div class="flex w-0 flex-1 items-center">
                        <div class="ml-4 flex flex-col min-w-0 flex-1">
                            <div class="flex gap-2">
                                <span class="truncate font-medium"> {{ address.type }}</span>
                            </div>
                            <span class="flex-shrink-0 text-gray-400">{{ address.detail }}</span>
                        </div>
                    </div>
                    <div class="ml-4 flex flex-shrink-0 space-x-4">
                        <div>
                            <button @click="toggleEdit(address.id)" type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar

                            </button>
                            <div v-if="isEditing(address.id)">
                                <div class="mt-2">
                                    <input v-model="detailAddress" type="text" name="detailAddress" id="detailAddress"
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Nueva direccion" />
                                </div>
                                <button @click="updateAddress(address.id)" type="button" class="mt-4 rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Guardar</button>
                            </div>
                        </div>


                        <span class="text-gray-200" aria-hidden="true">|</span>
                        <button @click="deleteAddress(address.id)" type="button"
                            class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">Eliminar</button>
                    </div>

                </li>
            </ul>
        </dd>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

let detailAddress = ref('')
let editingId = ref(null)

const newType = ref('')
const newAddress = ref('')

const showAddressInput = ref(false);

let addresses = ref(JSON.parse(localStorage.getItem('addresses')) || [
    {
        detail: 'Cra 39 A #39-19',
        type: 'Casa',
        id: 1
    },
    {
        detail: 'Cll 49 B #20-14',
        type: 'Trabajo',
        id: 2
    },
    {
        detail: 'Av 40 C #12-11',
        type: 'Oficina',
        id: 3
    },
    {
        detail: 'Calle 31 # 21-19',
        type: 'Casa',
        id: 4
    }
])

const createAddress = () => {
    const newAddressObject = {
        detail: newAddress.value,
        type: newType.value,
        id: addresses.value.length + 1
    }
    addresses.value.push(newAddressObject)
    localStorage.setItem('addresses', JSON.stringify(addresses.value))
    newType.value = '';
    newAddress.value = '';
    showAddressInput.value = false;
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
    if (index !== -1){
        addresses.value[index].detail = detailAddress.value
        localStorage.setItem('addresses', JSON.stringify(addresses.value))
        detailAddress.value = ''
        editingId.value = null
    }
}

</script>
