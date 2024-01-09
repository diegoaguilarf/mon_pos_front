<template>
  <div class="w-full h-screen flex">
    <div class="flex-1">
      <Product></Product>
    </div>
    <div class="w-96 h-screen bg-black"></div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/20/solid";
import Product from "../components/Product.vue";
</script>
