<template>
  <h1>PieView</h1>
  <label for="pet-select">choose a type of chart:</label>

  <select name="chart" id="chart-select" @change="updateChart">
    <option value="good">good chart</option>
    <option value="bad">evil chart</option>
  </select>
  <div>
    <AnimalPieChart :dataset="dataset" :is-evil="isEvil"></AnimalPieChart>
  </div>
</template>

<script setup>
import AnimalPieChart from '@/components/AnimalPieChart.vue'
import { onMounted, ref } from 'vue'

const dataset = ref([])
const isEvil = ref(false)

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

function updateChart(event) {
  const selectedValue = event.target.value
  if (selectedValue === 'good') {
    isEvil.value = false
  } else if (selectedValue === 'bad') {
    isEvil.value = true
  }
}

onMounted(() => {
  acquireData()
})
</script>

<style scoped></style>
