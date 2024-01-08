<template>
    <div class="layer">
      <img src="~/assets/logo.png" class="w-64 pt-10 pb-10" />
      <div class="menu-container">
        <nuxt-link to="/menu" class="menu-item">Menu</nuxt-link>
        <nuxt-link to="/promotion1" class="menu-item">Invita amigos y almuerza gratis!</nuxt-link>
        <a href="https://wa.link/eyr894" class="menu-item">WhatsApp</a>
        <a href="https://www.instagram.com/monchefcol" class="menu-item">Instagram</a>
        <a href="https://wa.link/j65cb9" class="menu-item">Peticiones, Quejas, Reclamos, Sugerencias y Denuncias</a>
        <p>Otros</p>
        <nuxt-link to="https://wa.link/eyr894" class="menu-item">Planes x5 - x20 ¡Programate!</nuxt-link>
        <nuxt-link to="https://wa.link/eyr894" class="menu-item">Planes para empresas</nuxt-link>
        <nuxt-link to="https://wa.link/eyr894" class="menu-item">Campaña: No al hambre</nuxt-link>
      </div>
  
      <nuxt />
    </div>
  </template>
  
  <style>
  .layer {
    @apply min-h-screen;
    @apply flex flex-col items-center;
    @apply pb-20;
    @apply bg-[#86a15e];
  }
  
  .menu-container {
    @apply max-w-lg w-full;
    @apply flex flex-col items-center gap-6;
    @apply p-4;
  }
  
  .menu-item {
    @apply w-full;
    @apply p-4;
    @apply bg-[#4D272D] no-underline text-lg text-white;
    border-radius: 8px;
  }
  
  .dark .menu-container {
    @apply bg-gray-800;
    border: 2px solid var(--color-light);
  }
  
  .dark .menu-item {
    @apply text-light;
  }
  
  .dark button.menu-item {
    @apply bg-light border-light;
  }
  </style>