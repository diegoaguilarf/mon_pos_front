<template>
    <Modal :show="mainStore.paymentMethodModal" @close="onClose">
        <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Medio de pago
        </DialogTitle>
        <div class="flex mt-2 gap-4">
            <div class="border p-5 rounded cursor-pointer" @click="assignPaymentMethodToOrder('Efectivo')">Efectivo</div>
            <div class="border p-5 rounded cursor-pointer" @click="assignPaymentMethodToOrder('Nequi')">Nequi</div>
            <div class="border p-5 rounded cursor-pointer" @click="assignPaymentMethodToOrder('Bancolombia')">Bancolombia</div>
            <div class="border p-5 rounded cursor-pointer" @click="assignPaymentMethodToOrder('Rappi')">Rappi</div>
        </div>

        <div class="mt-4">
            <button type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                @click="onClose">
                Cancelar
            </button>
        </div>
    </Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from "@/stores/main.store";
import Modal from "./index.vue";

const mainStore = useMainStore();
const show = ref(mainStore.paymentMethodModal);

const onClose = () => {
    mainStore.togglePaymentMethodModal()
}

const assignPaymentMethodToOrder = (paymentMethod) => {
    mainStore.assignPaymentMethodToOrder(paymentMethod);
    onClose();
}

</script>