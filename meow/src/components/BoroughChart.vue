<template>
  <div class="chart">
    <canvas ref="chartCanvasTwo"></canvas>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted, onUpdated } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const chartCanvasTwo = ref(null)
let chartInstance = null

const props = defineProps([`dataset`])
//fix this later
const boroughs = ['Brooklyn', 'Manhattan', 'Queens', 'Staten Island', 'Bronx']

function sortBoroughs(borough) {
  let counter = 0
  props.dataset.forEach((element) => {
    if (element.borough === borough) {
      counter += 1
    }
  })
  console.log(counter)

  return counter
}

function generateColor(arrayLength) {
  const colorArray = []
  let currentCount = 0
  for (let i = 0; i < arrayLength; i++) {
    currentCount += 50
    if (currentCount > 255) currentCount = currentCount % 255
    colorArray.push(`rgba(${currentCount}, ${255 - currentCount}, 255, 0.7)`)
  }
  return colorArray
}

function createChart() {
  if (!chartCanvasTwo.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvasTwo.value, {
    type: 'bar',
    data: {
      labels: boroughs, //dataset.map((row) => row.borough),
      datasets: [
        {
          label: 'number of reports',
          backgroundColor: generateColor(boroughs.length),
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
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'left',
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
onMounted(() => {
  createChart()
})

onUpdated(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
  console.log('unmounted boroughchart')
})
</script>

<style scoped>
.chart {
  height: 40rem;
}
</style>
