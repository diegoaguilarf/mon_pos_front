<template>
    <Modal :show="show" @close="onClose">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Payment successful
        </DialogTitle>
        <div class="mt-2">
            <p class="text-sm text-gray-500">
                Your payment has been successfully submitted. We’ve sent you
                an email with all of the details of your order.
            </p>
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
const show = ref(mainStore.notesModal);

const onClose = () => {
    mainStore.notesModal = false;
}

</script>