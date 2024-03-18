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
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicia sesión en tu cuenta</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="login" action="#"  class="space-y-6" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email o usuario</label>
          <div class="mt-2">
            <input v-model="email" id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type="submit" @click="validarCredenciales" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Iniciar sesión</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>

import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      users: [],
    };
  },
  mounted() {
    this.loadUserData();
  },
  methods: {
    async loadUserData() {
      try {
        const response = await axios.get('/src/users.json');
        this.users = response.data.users;
        console.log('Datos de usuarios cargados con éxito:', this.users);
      } catch (error) {
        console.error('Error al cargar datos de usuarios', error);
      }
    },
    async login() {
      console.log('Iniciando proceso de inicio de sesión...');

      await this.loadUserData();  // Asegura que los datos de usuarios estén cargados antes de realizar la comparación.

      const { email, password } = this;
      console.log('Email y contraseña ingresados:', email, password);
      console.log('Tipo de email en this.users:', typeof this.users[0].email);
      console.log('Tipo de password en this.users:', typeof this.users[0].password);


      const user = this.users.find((u) => String(u.email) === email && String(u.password) === password);

      console.log('Usuario encontrado:', user);
      if (user) {
        console.log('Inicio de sesión exitoso. Usuario:', user);
        localStorage.setItem('user', JSON.stringify(user));
        this.$router.push('/dashboard');
      } else {
        console.log('Credenciales incorrectas. No se encontró el usuario.');
        alert('Credenciales incorrectas');
      }
    },
  },
};
</script>