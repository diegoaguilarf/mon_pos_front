<template>
    <div class="h-screen py-4 px-6 flex-1 overflow-auto">
        <div class="flex justify-between items-center">
            <div>
                <h3 class="text-base font-semibold leading-7 text-gray-900">Descripción general</h3>
                <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Datos personales del cliente</p>
            </div>
            <router-link to="/orders/new"
                class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1">
                Asignar
            </router-link>
        </div>
        <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow capitalize">{{ orderCustomer?.full_name }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.phone_number }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Birthdate</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.birthdate }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Identification Number</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.identification_number }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Notes</dt>
                    <dd class="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <span class="flex-grow">{{ orderCustomer?.notes }}</span>
                        <span class="ml-4 flex-shrink-0">
                            <button type="button"
                                class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                        </span>
                    </dd>
                </div>
                <!-- <Addresses></Addresses> -->
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Direcciones</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                            <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                <div class="flex w-0 flex-1 items-center">
                                    <MapPinIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <div class="ml-4 flex flex-col min-w-0 flex-1">
                                        <div class="flex gap-2">
                                            <span class="truncate font-medium">Localizacion</span>
                                            <span class="flex-shrink-0 text-gray-400">- -</span>
                                        </div>
                                        <span class="flex-shrink-0 text-gray-400">{{ orderCustomer?.address }}</span>
                                    </div>
                                </div>
                                <div class="ml-4 flex flex-shrink-0 space-x-4">
                                    <button type="button"
                                        class="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Actualizar</button>
                                    <span class="text-gray-200" aria-hidden="true">|</span>
                                    <button type="button"
                                        class="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">Eliminar</button>
                                </div>
                            </li>
                        </ul>
                    </dd>
                </div>
                <!--Aqui estaba el address-->

                <!-- <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="">
                        <p class="text-sm font-medium leading-6 text-gray-900">Memberships</p>
                        <a class="text-sm text-indigo-600 cursor-pointer">Add item</a>
                    </dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <ul role="list" class="divide-y divide-gray-100 rounded-md border border-gray-200">
                            <li class="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6" v-for="n in 3">
                                <div class="flex w-0 flex-1 items-center">
                                    <CalendarDaysIcon class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                    <div class="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span class="truncate font-medium">Plan 5 Bowls</span>
                                        <span class="flex-shrink-0 text-gray-400">01 March, 2024</span>
                                        <span class="flex-shrink-0 text-indigo-600 ml-auto">04 Restantes</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </dd>
                </div> -->
            </dl>
        </div>
    </div>
</template>

<script setup>
import { MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/20/solid'
import Addresses from '@/components/Customers/Addresses.vue'

const props = defineProps(["orderCustomer"]);

</script>