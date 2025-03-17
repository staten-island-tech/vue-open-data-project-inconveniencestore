<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables) // registers components???
const chartCanvas = ref(null) // reactive ref for the canvas element
let chartInstance = null // store the chart instance

const props = defineProps([`dataset`])
//fix this later
const dataset = props.dataset

function createChart() {
  if (!chartCanvas.value) return

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: dataset.map((row) => row.borough),
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1, //literally the border
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

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped></style>
