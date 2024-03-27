<script setup lang="ts">
const props = defineProps<{
  onClose?: () => void,
  message: string
}>();
</script>

<template>
  <div className="bg-indigo-600 rounded-md">
    <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-start justify-between text-white md:px-8">
        <div className="flex gap-x-4">
            <p className="py-2">
                {{  props.message }}
            </p>
        </div>

        <button className="p-2 rounded-lg duration-150 hover:bg-indigo-500 ring-offset-2 focus:ring" @click="props.onClose">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
    </div>
  </div>
</template>