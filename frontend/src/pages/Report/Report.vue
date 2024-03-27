<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import TimeScaleChart from '@/components/Charts/TimeScaleChart.vue';
import VueDatePicker, { ModelValue } from '@vuepic/vue-datepicker';

const dateValue = ref<ModelValue>();

setInterval(() => console.log(dateValue.value), 100);

const labels = [
  'Janeiro', 'Fevereiro', 'Março'
];

const data = [
    {
        label: 'teste',
        backgroundColor: '#f0f0f0',
        data: [10, 20, 5]
    }
];
</script>

<template>
    <div class="h-full max-w-2xl mx-auto px-4">
        <div class="mt-16">
            <div class="grid justify-center items-center sm:justify-between sm:flex">
                <div>
                    <router-link to="/" class="flex items-center">
                      <svg class="w-8 h-8" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M189.3,128.4L89,233.4c-6,5.8-9,13.7-9,22.4c0,8.7,3,16.5,9,22.4l100.3,105.4c11.9,12.5,31.3,12.5,43.2,0  c11.9-12.5,11.9-32.7,0-45.2L184.4,288h217c16.9,0,30.6-14.3,30.6-32c0-17.7-13.7-32-30.6-32h-217l48.2-50.4  c11.9-12.5,11.9-32.7,0-45.2C220.6,115.9,201.3,115.9,189.3,128.4z"/></svg>
                      <span class="ml-2">Voltar</span>
                    </router-link>

                    <h4 class="mt-4 text-gray-800 text-xl font-semibold">Relatório "Teste"</h4>
                </div>
            </div>

            <section class="mt-12">
              <div class="bg-gray-100 w-full rounded-md p-2">
                <div class="grid grid-cols-2">
                  <h3>Faturamento</h3>
                
                  <VueDatePicker
                    v-model="dateValue"
                    placeholder="Período"
                    range
                  />
                </div>

                <time-scale-chart :labels="labels" :datasets="data" class="mt-4"/>
              </div>
            </section>

            <section class="mt-12">
              <div class="bg-gray-100 w-full rounded-md p-2">
                <h3>Cancelamentos</h3>

                <time-scale-chart :labels="labels" :datasets="data" />
              </div>
            </section>
        </div>
    </div>
</template>

