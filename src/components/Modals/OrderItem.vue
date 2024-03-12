<template>
    <Modal :show="mainStore.orderItemModal" @close="onClose">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Producto
        </DialogTitle>
        <div class="flex py-2">
            <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img :src="mainStore.orderItem.image" class="h-full w-full object-cover object-center" />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-center">
                <div>
                    <div class="flex justify-between items-start text-base font-medium text-gray-900">
                        <h3 class="flex-none mr-4">
                            <a>{{ mainStore.orderItem.name }}</a>
                        </h3>

                        <input v-model="total" type="text" name="total" id="total" autocomplete="given-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="flex items-end justify-between text-sm">
                    <p class="text-gray-500">Qty {{ mainStore.orderItem.quantity }}</p>
                </div>
            </div>
        </div>

        <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-gray-900">Notas</label>
            <div class="mt-2">
                <textarea v-model="notes" id="about" name="about" rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
        </div>

        <div class="flex justify-between mt-4">
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="onClose">
                Cancelar
            </button>

            <button type="submit" @click="updateOrderItem"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Guardar
            </button>
        </div>
    </Modal>
</template>

<script setup>
import { watch, ref } from "vue";
import { useMainStore } from "@/stores/main.store";
import Modal from "./index.vue";

const mainStore = useMainStore();

const total = ref(0);
const notes = ref(null);

watch([() => mainStore?.orderItem], () => {
    total.value = mainStore?.orderItem?.total || (mainStore?.orderItem?.price * mainStore?.orderItem?.quantity) || 0
    notes.value = mainStore?.orderItem?.notes || null
});

const updateOrderItem = async () => {
    await mainStore.updateOrderItem({
        id: mainStore.orderItem.id,
        total: total.value,
        notes: notes.value
    });
    onClose();
    // mainStore.setOrderItem(null);
}

const onClose = () => {
    mainStore.toggleOrderItemModal(false)
}

</script>