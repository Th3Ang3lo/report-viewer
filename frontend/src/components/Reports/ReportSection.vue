<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  id: string,
  name: string
}>();
</script>

<template>
  <div class="py-5 flex items-start justify-between">
      <div class="flex">
          <div>
              <span class="text-start block text-sm text-gray-700 font-semibold">{{ name }}</span>
              <span class="text-start block text-sm text-gray-600">{{ id }}</span>
          </div>
      </div>

      <router-link :to="`/${id}`" class="text-gray-700 text-sm md:text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100 text-center">Ver relatório</router-link>
  </div>
</template>