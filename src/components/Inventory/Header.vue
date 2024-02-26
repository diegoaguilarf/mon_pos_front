<template>
    <header class="flex items-center p-2">
        <router-link :to="to" class="flex-1">
            <ChevronLeftIcon class="w-6 h-6" />
        </router-link>
        <h1 class="flex-2 text-lg">{{ title || 'Title' }}</h1>
        <div class="flex-1"></div>
    </header>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid';

const props = defineProps(["to", "title"]);

</script>