<template>
  <div class="chart">
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
//sort out all animals that are less than 30 and put into a seperate array

//while that is happening, all animals above 30 go into a seperate array. others get pushed into the end of the array??

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
        labels: speciesListAltered.value, //dataset.map((row) => row.borough),
        datasets: [
          {
            label: 'number of reports',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: sortTheAnimalsGood(),
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
  } else if (props.isEvil === true) {
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
.chart {
}
</style>
