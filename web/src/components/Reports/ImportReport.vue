<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import ButtonComponent from '@/components/Button/ButtonComponent.vue';
import AlertMessage from '@/components/Alert/AlertMessage.vue';
import { createReport } from '@/services/create-report';

const fileSelected = ref<null | string>(null);
const fileRef = ref<File | null>();
const fileInput = ref<HTMLInputElement | null>();
const name = ref<HTMLInputElement | null>();
const nameError = ref<string>('');
const fileError = ref<string>('');
const success = ref<string>('');
const sending = ref(false);

const router = useRouter();

function handleSelectFile(event: Event): void {
  const target = event.target as HTMLInputElement;
  const file = target?.files?.[0];
  
  if(file) {
    fileSelected.value = file.name;
    fileRef.value = file;
    fileError.value = '';
  }
}

function handleClearFile(): void {
  fileSelected.value = null;

  if(fileInput.value) {
    fileInput.value = null;
  }
}

async function handleSubmit(): Promise<void> {
  const reportName = name.value?.value;
  const reportFile = fileRef.value;

  const formData = new FormData();

  formData.append('name', reportName!);
  formData.append('file', reportFile!);
  
  let error = false;

  if(!reportName || reportName.toString() == '') {
    nameError.value = 'Nome obrigatório.';
    error = true;
    return;
  }

  if(!reportFile) {
    fileError.value = 'Arquivo obrigatório.';
    error = true;
  }

  if (error) {
    sending.value = true;
    return;
  }

  sending.value = true;

  const request = await createReport(formData);
  
  if (request.status == 201) {
    success.value = 'Relatório criado com sucesso. Redirecionando...';

    setTimeout(() => router.push(`/${request.response?.id}`), 500);

    return;
  }

  fileError.value = request.response?.message ?? 'Houve um erro desconhecido.'

  sending.value = false;
}

</script>

<template>
  <input type="text" ref="name" placeholder="Título do relatório" class="mb-2 w-full pl-3 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" tabindex="1" />

  <span class="text-red-500">{{ nameError }}</span>

  <div v-if="!fileSelected" class="max-w-md mx-auto h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
    <label htmlFor="file" class="cursor-pointer text-center p-4 md:p-8" tabindex="1">
        <svg class="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <p class="mt-3 text-gray-700 max-w-xs mx-auto">Clique para <span class="font-medium text-indigo-600">enviar</span> ou arraste e solte arquivo aqui</p>
    </label>

    <input id="file" name="name" type="file" class="hidden" ref="fileInput" @change="handleSelectFile" />
  </div>

  <alert-message v-if="fileSelected" :message="fileSelected" @close="handleClearFile" />

  <span class="text-red-500">{{ fileError }}</span>
  <span class="text-green-500">{{ success }}</span>

  <div class="mt-2">
    <button-component class="w-full py-3" tabindex="2" type="submit" @click="handleSubmit" :disabled="sending">
      {{ sending ? 'Enviando...' : 'Enviar' }}
    </button-component>
  </div>
</template>