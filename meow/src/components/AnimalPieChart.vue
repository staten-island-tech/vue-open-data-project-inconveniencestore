<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onUpdated } from 'vue'
import { Chart, registerables } from 'chart.js'

//i have no idea what any of the below means
Chart.register(...registerables)
const chartCanvas = ref(null)
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

//function doesnt work. returns 0 0 0 0 0 0
function putTheStupidBoroughDataIntoAnArray() {
  const tempArr = []
  for (let i = 0; i < boroughs.length; i++) {
    let tempVar = sortBoroughs(boroughs[i])
    console.log(tempVar)
    tempArr.push(tempVar)
  }

  return tempArr
}

function createChart() {
  if (!chartCanvas.value) return

  chartInstance = new Chart(chartCanvas.value, {
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
})
</script>

<style scoped></style>
