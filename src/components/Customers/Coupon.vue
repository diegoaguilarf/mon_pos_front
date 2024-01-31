<template>
    <div :class="`coupon bg-blue-500 text-white rounded p-4 shadow ${isUsed}`">
        <div>

        </div>
        <div>
            <h3 class="font-bold">{{ coupon.name }}</h3>
            <p>{{ coupon.discount_amount }}</p>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["coupon"]);

const isUsed = computed(() => {
  return props.coupon.status === 'used' ? "line-through opacity-40": "";
});
</script>