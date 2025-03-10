<template>
  <div>
    <BoroughChart></BoroughChart>
  </div>
</template>

<script setup>
import BoroughChart from '../components/BoroughChart.vue'
import { onMounted } from 'vue'

async function testAPI() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/fuhs-xmg2.json')
    const data = await response.json()
    console.log(data)
  } catch {}
}

//things to graph:
//injuries by borough
//perent of animals
//track a random animal?
//percent of animals by borough

onMounted(() => {
  testAPI()
})
</script>

<style scoped></style>
