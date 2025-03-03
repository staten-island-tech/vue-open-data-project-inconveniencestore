<template>
  <div></div>
</template>

<script setup>
import { onMounted } from 'vue'
async function testAPI() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/fuhs-xmg2.json')
    const data = await response.json()
    console.log(data)
  } catch {}
}

onMounted(() => {
  testAPI()
})
</script>

<style scoped></style>
