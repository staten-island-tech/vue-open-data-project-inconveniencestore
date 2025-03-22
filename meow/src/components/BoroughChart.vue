<template>
  <div>
    <canvas ref="chartCanvasTwo"></canvas>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onUpdated } from 'vue'
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

//because apparently on load, theres nothing in props.dataset so it loads in as 0
/* onMounted(() => {
  createChart()
})
 */

//if something in the reactive array changes, it updates. it should be ok because this dataset shouldn't be changing
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

<style scoped></style>
