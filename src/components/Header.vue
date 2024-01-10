<template>
    <div>
        <Disclosure as="nav" class="border-b border-gray-200 bg-white" v-slot="{ open }">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 justify-between">
                    <div class="flex">
                        <div class="flex flex-shrink-0 items-center">
                            <img class="block h-8 w-auto"
                                src="@/assets/monchef.png" alt="Monchef" />
                        </div>
                        <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">

                        </div>
                    </div>
                    <div class="hidden sm:ml-6 sm:flex sm:items-center">
                        <a class="inline-flex items-center text-sm font-medium">
                            <div @click="goToNewOrder" class="bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-lg">
                                Crear pedido
                            </div>
                        </a>

                    </div>
                </div>
            </div>

            <DisclosurePanel class="sm:hidden">
                <div class="space-y-1 pb-3 pt-2">
                    <DisclosureButton class="inline-flex items-center border-b-2 text-sm font-medium">
                        <div @click="goToNewOrder" class="bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-lg">
                            Crear pedido
                        </div>
                    </DisclosureButton>
                </div>
            </DisclosurePanel>
        </Disclosure>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/vue/24/outline";
const route = useRoute();
const router = useRouter();
const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
];

const goToNewOrder = () => {
    router.push({ path: "/orders/new" });
};
</script>
