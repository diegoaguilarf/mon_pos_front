<template>
    <div class="w-full h-full absolute flex items-end" v-if="show">
        <div class="w-full h-full bg-black/40 absolute" @click="closeModal"></div>
        <div class="w-full h-1/2 bg-white relative flex flex-col border-t rounded-t-xl p-4">
            <div v-if="title" class="h-14 p-2">
                <h2 class="font-bold">{{ title }}</h2>
            </div>
            <div class="h-full overflow-auto p-2">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['close']);

const props = defineProps({
    title: String,
    show: Boolean
})

const closeModal = () => {
    emit("close")
}

</script>