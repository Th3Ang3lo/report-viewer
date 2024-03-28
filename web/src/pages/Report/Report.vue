<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import TimeScaleChart from '@/components/Charts/TimeScaleChart.vue';
import VueDatePicker, { ModelValue } from '@vuepic/vue-datepicker';
import { listReportData } from '@/services/list-report-data';
import { months } from '@/constants/months';
import { ReportData } from '@/dtos/report-data';
import { orderPeriods } from '@/utils/string'

interface ReportContract {
  label: string,
  backgroundColor: string,
  data: number[]
};

const router = useRoute();

const dateValue = ref<ModelValue>(new Date(2020, 0, 1));

const isLoading = ref<boolean>(false);
const subscriptionLabels = ref<string[]>([]);
const subscriptionData = ref<ReportContract[]>([]);

const cancellationLabels = ref<string[]>([]);
const cancellationData = ref<ReportContract[]>([]);

function buildReport(data: ReportData[], type: 'subscription' | 'cancellation') {
  let labels: string[] = [];
  let reportDataBuilded: Record<string, number> = {};

  for (const reportData of data) {
    const date = new Date(reportData.startDate);

    const month = months[date.getMonth()];
    const monthAndyear = `${month}/${date.getFullYear()}`;

    if(!labels.includes(monthAndyear)) {
      labels.push(monthAndyear);
    }

    if(!reportDataBuilded[monthAndyear]) {
      reportDataBuilded[monthAndyear] = 0;
    }

    if(type === 'subscription') {
      reportDataBuilded[monthAndyear] += reportData.amount;
    } else {
      reportDataBuilded[monthAndyear]++;
    }
  }

  labels = labels.sort(orderPeriods)

  return {
    labels,
    data: reportDataBuilded
  };
}

async function handleChangeDate() {
  const startDate = dateValue.value;

  if(startDate instanceof Date) {
    const day = startDate.getDate();
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;

    const format = `${year}-${month}-${day}`;

    const reportId = router.params.id as string;

    isLoading.value = true;
    
    const [subscriptionRequest, cancellationRequests] = await Promise.all([
      listReportData(reportId, { startDate: format, status: 'Ativa' }),
      listReportData(reportId, { startDate: format, status: 'Cancelada' }),
    ]);

    const subscriptionReport = buildReport(subscriptionRequest.response?.reportData!, 'subscription');
    const cancellationReport = buildReport(cancellationRequests.response?.reportData!, 'cancellation');

    subscriptionLabels.value = subscriptionReport.labels;
    subscriptionData.value = [
      {
        backgroundColor: '#4F46E5',
        data: Object.values(subscriptionReport.data),
        label: 'R$ Assinaturas'
      }
    ];

    cancellationLabels.value = cancellationReport.labels;
    cancellationData.value = [
      {
        backgroundColor: '#4F46E5',
        data: Object.values(cancellationReport.data),
        label: 'Cancelamentos'
      }
    ];

    isLoading.value = false;
  }
}

onMounted(() => handleChangeDate())
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
                    placeholder="Início"
                    @update:model-value="handleChangeDate"
                    :enable-time-picker="false"
                  />
                </div>

                <time-scale-chart
                  v-if="!isLoading"
                  :labels="subscriptionLabels"
                  :datasets="subscriptionData"
                  class="mt-4"
                  ref="subscriptionReportRef"
                />
              </div>
            </section>

            <section class="mt-12">
              <div class="bg-gray-100 w-full rounded-md p-2">
                <h3>Cancelamentos</h3>

                <time-scale-chart
                  v-if="!isLoading"
                  :labels="cancellationLabels"
                  :datasets="cancellationData"
                />
              </div>
            </section>
        </div>
    </div>
</template>

