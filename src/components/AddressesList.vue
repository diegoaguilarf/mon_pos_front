<template>
    <RadioGroup v-model="selected">
        <div class="space-y-4">
            <RadioGroupOption as="template" v-for="address in values" :key="address.id" :value="address"
                v-slot="{ active, checked }">
                <div @dblclick="setOption"
                    :class="[active ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300', 'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between']">
                    <span class="flex items-center">
                        <span class="flex flex-col text-sm">
                            <RadioGroupLabel as="span" class="font-medium text-gray-900">{{ address?.neighborhood?.name
        || 'Sin Barrio' }}</RadioGroupLabel>
                            <RadioGroupDescription as="span" class="text-gray-500">
                                <span class="block sm:inline">{{ address.street }}</span>
                            </RadioGroupDescription>
                        </span>
                    </span>
                    <RadioGroupDescription as="span"
                        class="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right">
                        <span class="font-medium text-gray-900">{{ address.neighborhood?.price || "$n/n" }}</span>
                    </RadioGroupDescription>
                    <span
                        :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-600' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg']"
                        aria-hidden="true" />
                </div>
            </RadioGroupOption>
        </div>
    </RadioGroup>
</template>

<script setup>
import { ref } from 'vue'
import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { useMainStore } from "@/stores/main.store";

const props = defineProps(["values"]);

const mainStore = useMainStore();

const selected = ref(null)

const setOption = () => {
    console.log(selected.value)
    mainStore.toggleAdressesBottomSheet();
}
</script>