<script setup lang="ts">
import ReportSection from "@/components/Reports/ReportSection.vue";
import Modal from "@/components/Modal/Modal.vue";
import ImportReport from "@/components/Reports/ImportReport.vue";
import ButtonComponent from "@/components/Button/ButtonComponent.vue";
import { listAllReports } from "@/services/list-all-reports";
import { Report } from "@/services/dtos/list-all-reports.dto";
import { onMounted, ref } from "vue";

const reports = ref<Report[]>([]);

async function loadReports() {
    const response = await listAllReports()

    if (response.status == 200) {
        reports.value = response.response?.reports!;
    }
}

onMounted(() => {
    loadReports();
})
</script>

<template>
    <title>Relatórios</title>

    <div class="h-full max-w-2xl mx-auto px-4">
        <div class="mt-16">
            <div class="grid justify-center items-center sm:justify-between sm:flex">
                <div>
                    <h4 class="text-gray-800 text-xl font-semibold">Lista de relatórios</h4>
                </div>

                <modal modal-title="Importar relatório">
                    <template #modal-trigger-button>
                        <button-component>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"/>
                            </svg>
                            
                            Importar relatório
                        </button-component>
                    </template>

                    <template #modal-content>
                        <import-report />
                    </template>
                </modal>
            </div>

            <section class="mt-12">
                <report-section v-for="(report, idx) in reports" :id="report.id" :name="report.name" :key="idx" />
            </section>
        </div>
    </div>
</template>

