<template>
  <div class="regularChart" v-if="props.isEvil === false">
    <canvas ref="chartCanvas"></canvas>
  </div>
  <div v-if="props.isEvil === true">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted, onUpdated } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
const chartCanvas = ref(null)
let chartInstance = null

const props = defineProps([`dataset`, `isEvil`])
const speciesList = ref([])

function updateSpeciesList() {
  const uniqueSpecies = []
  props.dataset.forEach((item) => {
    if (!uniqueSpecies.includes(item.species_description)) {
      uniqueSpecies.push(item.species_description)
    }
  })
  speciesList.value = uniqueSpecies
  console.log('done loading species list')
}
// number of animals in each category
function sortAnimals(species) {
  return props.dataset.filter((element) => element.species_description === species).length
}
// basically runs this code for each value in specieslist, and then puts the data straight into the dataset portion of the chart
function sortTheAnimals() {
  return speciesList.value.map((species) => sortAnimals(species))
}
// ###########################################################
// good chart
function sortTheAnimalsGood() {
  const otherCount = otherCategory()
  const counts = []

  speciesListAltered.value.forEach((species) => {
    if (species === 'Other') {
      counts.push(otherCount)
    } else {
      counts.push(sortAnimals(species))
    }
  })

  console.log(counts)

  return counts
}

const speciesListAltered = ref([])
function otherCategory() {
  const threshold = 100
  const categorizedSpecies = []
  let otherCount = 0

  speciesList.value.forEach((species) => {
    const count = sortAnimals(species)
    if (count >= threshold) {
      categorizedSpecies.push(species)
    } else {
      otherCount += count
    }
  })

  categorizedSpecies.push('Other')

  speciesListAltered.value = categorizedSpecies
  return otherCount
}

function generateColor(arrayLength) {
  const colorArray = []
  let currentCount = 0
  for (let i = 0; i < arrayLength; i++) {
    currentCount += 25
    if (currentCount > 255) currentCount = currentCount % 255
    colorArray.push(`rgba(${currentCount}, ${255 - currentCount}, 250, 0.7)`)
  }
  return colorArray
}

function createChart() {
  if (!chartCanvas.value) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  otherCategory()

  if (props.isEvil === false) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'pie',
      data: {
        labels: speciesListAltered.value,
        datasets: [
          {
            label: 'number of reports',
            backgroundColor: generateColor(speciesListAltered.value.length),
            data: sortTheAnimalsGood(speciesListAltered),
            borderWidth: 2, //literally the border
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      },
    })
  } else if (props.isEvil === true) {
    chartInstance = new Chart(chartCanvas.value, {
      type: 'pie',
      data: {
        labels: speciesList.value, //dataset.map((row) => row.borough),
        datasets: [
          {
            label: 'number of reports',
            backgroundColor: 'rgba(255, 3, 187, 0.9)', //generateColor(speciesList.value.length),
            data: sortTheAnimals(),
            borderWidth: 2, //literally the border
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
          },
        },
      },
    })
  }
}

onMounted(() => {
  updateSpeciesList()
  createChart()
})
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
.regularChart {
  height: 40rem;
}
</style>
