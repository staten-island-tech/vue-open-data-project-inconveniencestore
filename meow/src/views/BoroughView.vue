<template>
  <div>
    <h1>boroughChart</h1>
    <BoroughChart :dataset="dataset"></BoroughChart>
  </div>
</template>

<script setup>
import BoroughChart from '../components/BoroughChart.vue'
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

//things to graph:
//injuries by borough (done)

//perent of animals

//track a random animal?

onMounted(() => {
  acquireData()
})
</script>

<style scoped></style>
