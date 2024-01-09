<template>
  <div class="px-36 py-10">
    <h2 class="text-base font-semibold leading-7 text-gray-900">
      Asignar o Agregar nuevo cliente
    </h2>
    <p class="mt-1 text-sm leading-6 text-gray-600">
      Datos personales de los clientes
    </p>
    <div class="space-y-5">
      <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-5 md:grid-cols-3">
        <div class="px-4 sm:px-0">
          <div class="border rounded-lg p-10">
            <h2 class="font-bold">Clientes</h2>
            <div class="grid gap-5 mt-5">
              <div class="flex justify-between" v-for="(client, index) in 10">
                <div>
                  <p>Nombre Generico</p>
                  <p class="text-sm text-gray-500">Celular:{{ client }}</p>
                </div>
                <div
                  class="rounded-lg h-8 text-center items-center flex text-sm bg-blue-500 text-white px-3 py-1"
                >
                  Asignar
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
        >
          <div class="px-4 py-6 sm:p-8">
            <div
              class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
            >
              <div class="sm:col-span-3">
                <label
                  for="first-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Nombre</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="last-name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Apellido</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="sm:col-span-4">
                <label
                  for="phone"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Celular</label
                >
                <div class="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="street-address"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Dirección</label
                >
                <div class="mt-2">
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autocomplete="street-address"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="col-span-full">
                <label
                  for="about"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Notas</label
                >
                <div class="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
          >
            <button
              type="button"
              class="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar y asignar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PhotoIcon, UserCircleIcon } from "@heroicons/vue/24/solid";
</script>
