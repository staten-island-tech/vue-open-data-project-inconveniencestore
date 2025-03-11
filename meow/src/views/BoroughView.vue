<template>
  <div>
    <BoroughChart v-for="item in dataset" :item="item"></BoroughChart>
  </div>
</template>

<script setup>
import BoroughChart from '../components/BoroughChart.vue'
import { onMounted, ref } from 'vue'
const dataset = ref('')

async function acquireData() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/fuhs-xmg2.json')
    const data = await response.json()
    dataset.value = data.results
  } catch {}
}

//things to graph:
//injuries by borough
//perent of animals
//track a random animal?
//percent of animals by borough

onMounted(() => {
  acquireData()
})
</script>

<style scoped></style>
