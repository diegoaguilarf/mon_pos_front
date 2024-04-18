<template>
  <!--
      This example requires updating your template:
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/src/assets/monchef.png" alt="Logo Monchef" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión en tu cuenta
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login" action="#" class="space-y-6" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email o usuario</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" @click="validarCredenciales"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar
            sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import router from '@/router';
import axios from 'axios';
import { ref, onMounted } from 'vue';


const email = ref('');
const password = ref('');
const users = ref([]);

const loadUserData = async () => {
  try {
    const response = await axios.get('/users.json');
    users.value = response.data.users;
    console.log("Datos de usuario cargados con exito")
  } catch (error) {
    console.log("Error al cargar los datos de usuario")
  }
};

const login = async () => {
  console.log('Iniciando proceso de inicio de sesión...');
  await loadUserData();
  const { value: emailValue } = email;
  const { value: passwordValue } = password;
  const user = users.value.find((u) => String(u.email) === emailValue && String(u.password) === passwordValue);
  console.log(user)
  if (user) {
    console.log('Inicio de sesión exitoso. Usuario:', user);
    localStorage.setItem('user', JSON.stringify(user));
    router.push('/dashboard')
  } else {
    console.log('Credenciales incorrectas. No se encontró el usuario.');
    alert('Credenciales incorrectas');
  }
};

onMounted(loadUserData);

</script>
