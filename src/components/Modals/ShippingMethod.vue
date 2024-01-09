<template>
    <Modal :show="mainStore.shippingMethodModal" @close="onClose">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Metodo de envio
        </DialogTitle>
        <div class="flex mt-2 gap-4">
            <div class="border p-5 rounded cursor-pointer">Rappi</div>
            <div class="border p-5 rounded cursor-pointer">Monchef</div>
            <div class="border p-5 rounded cursor-pointer">Externo</div>
        </div>

        <div class="mt-4">
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="closeModal">
                Got it, thanks!
            </button>
        </div>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from "@/stores/main.store";
import Modal from "./index.vue";

const mainStore = useMainStore();

const onClose = () => {
    mainStore.toggleShippingMethodModal()
}

</script>