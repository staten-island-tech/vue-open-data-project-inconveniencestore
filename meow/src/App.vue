<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Borough</RouterLink>
        <RouterLink to="/animaltype">Animal Type</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  background-color: rgba(255, 3, 187);
  padding: 1rem;
  display: flex;
  gap: 2rem;
}
nav a {
  color: white;
  text-decoration: none;
  padding: 1rem;
  border-radius: 0.5rem;
}
</style>
