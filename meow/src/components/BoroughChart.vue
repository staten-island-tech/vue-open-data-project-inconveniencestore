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
const dataset = props.dataset //shouldn't it need this?? why did dataset.map work??

function sortBoroughs(borough) {
  let counter = 0
  dataset.forEach((element) => {
    if (element.borough === borough) {
      counter += 1
    }
  })

  return counter
}

function createChart() {
  if (!chartCanvas.value) return

  chartInstance = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: ['Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bronx'], //dataset.map((row) => row.borough),
      datasets: [
        {
          label: '# of Votes',
          data: [
            sortBoroughs('Brooklyn'),
            sortBoroughs('Manhattan'),
            sortBoroughs('Queens'),
            sortBoroughs('Staten Island'),
            sortBoroughs('Bronx'),
          ],
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
