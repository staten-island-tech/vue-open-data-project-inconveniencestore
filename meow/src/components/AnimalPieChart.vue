<template>
  <div>
    <canvas ref="chartCanvas" class="chart"></canvas>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onUpdated } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const chartCanvas = ref(null)
let chartInstance = null

const props = defineProps([`dataset`])
//fix this later
const speciesList = ref([])

function updateSpeciesList() {
  speciesList.value = [...new Set(props.dataset.map((item) => item.species_description))]
}

// Count occurrences of each species
function sortAnimals(species) {
  return props.dataset.filter((element) => element.species_description === species).length
}

// Generate data array
function sortTheAnimals() {
  return speciesList.value.map((species) => sortAnimals(species))
}

function createChart() {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: speciesList.value, //dataset.map((row) => row.borough),
      datasets: [
        {
          label: 'number of reports',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: sortTheAnimals(),
          borderWidth: 2, //literally the border
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
}

//because apparently on load, theres nothing in props.dataset so it loads in as 0
/* onMounted(() => {
  createChart()
})
 */

//if something in the reactive array changes, it updates. it should be ok because this dataset shouldn't be changing
onUpdated(() => {
  updateSpeciesList()
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  console.log('unmounted piechart')
})
</script>

<style scoped>
.chart {
  width: 40rem;
  height: 40rem;
}
</style>
