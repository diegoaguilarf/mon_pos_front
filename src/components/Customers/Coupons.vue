<template>
    <div class="w-80 border-l p-4 h-screen overflow-auto">
        <h2 class="mb-4 font-bold text-lg">Cupones</h2>
        <div class="flex flex-col gap-4">
          <Coupon :coupon="coupon" v-for="coupon in coupons" />
        </div>
      </div>
</template>

<script setup>
import { defineProps, ref, watch } from "vue";
import { useMainStore } from "@/stores/main.store";
import Coupon from "@/components/Customers/Coupon.vue";

const props = defineProps(["orderCustomer"]);

const mainStore = useMainStore();

const coupons = ref([]);

watch(() => props.orderCustomer, () => {
  getCouponsByUser();
  console.log("watch");
});

const getCouponsByUser = async () => {
  try {
    const { data: originCoupons } = await mainStore.getCouponsByUser(
        props.orderCustomer.id
    );
    console.log(originCoupons)
    coupons.value = originCoupons;
  } catch (error) {
    console.log(error);
  }
};

// const coupons = [
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "pink",
//     status: "open"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "pink",
//     status: "open"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "blue",
//     status: "open"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "amber",
//     status: "used"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "green",
//     status: "used"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "indigo",
//     status: "used"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "amber",
//     status: "used"
//   },
//   {
//     name: "Primer bowl a $7000",
//     description: "Uso de unica vez",
//     discount: "-$7.000",
//     color: "amber",
//     status: "used"
//   }
// ]
</script>