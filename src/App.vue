<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'




</script>
<template>

  <main class=" w-screen h-screen p-0 m-0 box-border bg-bg-image md:bg-bg-image-lg bg-cover">
      <header class=" bg-white bg-opacity-30 p-2 flex justify-between ">
        <div class="text-xl p-2 text-purple-300">Weather App</div>
      <nav class=" flex gap-3 text-xl">
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        <RouterLink to="/saved" class="text-pink-100 bg-pink-300 p-2 hover:bg-purple-200  rounded-xl">Saved</RouterLink>
        
      </nav>
  </header>
    <RouterView />
  </main>
</template>


