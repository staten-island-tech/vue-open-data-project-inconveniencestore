<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onUpdated, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'

//i have no idea what any of the below means
Chart.register(...registerables)
const chartCanvas = ref(null)
let chartInstance = null

const props = defineProps([`dataset`])
//fix this later

function createChart() {
  if (!chartCanvas.value) return

  chartInstance = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: boroughs, //dataset.map((row) => row.borough),
      datasets: [
        {
          label: 'number of reports',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: [
            sortBoroughs('Brooklyn'),
            sortBoroughs('Manhattan'),
            sortBoroughs('Queens'),
            sortBoroughs('Staten Island'),
            sortBoroughs('Bronx'),
          ],
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

onUpdated(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped></style>
