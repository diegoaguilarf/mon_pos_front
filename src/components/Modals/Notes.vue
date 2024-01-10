<template>
    <Modal :show="mainStore.notesModal" @close="onClose">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Notas
        </DialogTitle>
        <div class="mt-2">
            <textarea
                    v-model="notes"
                    id="about"
                    name="about"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
        </div>

        <div class="mt-4">
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="save">
                Crear Pedido
            </button>
        </div>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from "@/stores/main.store";
import router from "@/router";
import Modal from "./index.vue";

const mainStore = useMainStore();

const show = ref();
const notes = ref("");

const onClose = () => {
    mainStore.toggleNotesModal();
}

const save = async () => {
    onClose();
    await mainStore.addNotesToOrder(notes.value);
    await mainStore.createOrder();
    router.push("/");
}

</script>