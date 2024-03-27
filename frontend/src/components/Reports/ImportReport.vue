<script setup lang="ts">
import FileInput from '@/components/File/FileInput.vue';
import ButtonComponent from '@/components/Button/ButtonComponent.vue';

function handleSubmit(event: Event): void {
  event.preventDefault();

  
}
</script>

<template>
  <form @submit="handleSubmit">
    <input type="text" placeholder="Título do relatório" class="mb-2 w-full pl-3 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" tabindex="1" />

    <file-input tabindex="2" name="report" />

    <div class="mt-2">
      <button-component class="w-full py-3" tabindex="2" type="submit">
        Enviar
      </button-component>
    </div>
  </form>
</template>