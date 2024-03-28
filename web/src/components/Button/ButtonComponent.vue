<script setup lang="ts">
const props = defineProps<{
  onClick?: () => void,
  disabled?: boolean
}>();

function handleClick(event: Event) {
  event.preventDefault();

  props.onClick?.();
}

</script>

<template>
  <button class="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0" @click="handleClick" :disabled="props.disabled ?? false">
      <slot></slot>
  </button>
</template>