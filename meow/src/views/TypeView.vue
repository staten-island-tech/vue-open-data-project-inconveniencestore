<template>
  <div>
    <h1>PieView</h1>
    <AnimalPieChart :dataset="dataset"></AnimalPieChart>
  </div>
</template>

<script setup>
import AnimalPieChart from '@/components/AnimalPieChart.vue'
import { onMounted, ref } from 'vue'

const dataset = ref([])

async function acquireData() {
  try {
    const response = await fetch(
      'https://data.cityofnewyork.us/resource/fuhs-xmg2.json?$limit=100000',
    )
    const data = await response.json()
    console.log(data)
    dataset.value = data
  } catch {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  acquireData()
})
</script>

<style scoped></style>
