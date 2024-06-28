<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'




</script>
<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
   
  </header>
  <main class=" w-screen h-screen p-0 m-0 box-border bg-bg-image md:bg-bg-image-lg bg-cover">
    <RouterView />
  </main>
</template>


