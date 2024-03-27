<script setup lang="ts">
const props = defineProps<{
  datasets: Array<{
    label: string
    backgroundColor: string
    data: any[]
  }>,
  labels: string[]
}>();

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

const data = {
  labels: props.labels,
  datasets: props.datasets
}

const options = {
  responsive: true
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
</script>


<template>
  <Line :data="data" :options="options" />
</template>
