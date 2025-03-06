<template>
  <div>
    <h2>props.</h2>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['species_description', 'index'])
</script>

<style scoped></style>
