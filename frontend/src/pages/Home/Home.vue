<script setup lang="ts">
import ReportSection from "@/components/Reports/ReportSection.vue";
import Modal from "@/components/Modal/Modal.vue";
import ImportReport from "@/components/Reports/ImportReport.vue";
import ButtonComponent from "@/components/Button/ButtonComponent.vue";

const members = [
    {
        name: "Relatório teste",
        id: "9c678328-3e40-46ea-94c7-03cf72530489"
    },
    {
        name: "Relatório teste",
        id: "fef87dd3-efc1-49d8-b8bc-cf27135dbe73"
    },
    {
        name: "Relatório teste",
        id: "cc9c90eb-13da-48d4-ac81-db8d532dab62"
    },
    {
        name: "Relatório teste",
        id: "656b6bee-c3f7-4d12-b629-ffa843e54b84"
    }
];
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
                <report-section v-for="(report, idx) in members" :id="report.id" :name="report.name" :key="idx" />
            </section>
        </div>
    </div>
</template>

