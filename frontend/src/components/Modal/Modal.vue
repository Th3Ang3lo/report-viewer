<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'radix-vue';

const props = defineProps<{
  modalTitle: string
  actionButtons?: boolean
}>()
</script>

<template>
  <DialogRoot class="fixed inset-0 z-10 overflow-y-auto">
    <DialogTrigger as="div">
      <slot name="modal-trigger-button"></slot>
    </DialogTrigger>
    
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 w-full h-full bg-black opacity-40" />

      <DialogContent class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4" tabindex="-1" aria-hidden="false" data-aria-hidden="false">
        <div class="bg-white rounded-md shadow-lg">
          <div class="flex items-center justify-between p-4 border-b">
            <DialogTitle class="text-lg font-medium text-gray-800">
              {{ props.modalTitle}}
            </DialogTitle>

            <DialogClose class="p-2 text-gray-400 rounded-md hover:bg-gray-100" tabindex="1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </DialogClose>
          </div>

          <DialogDescription class="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
            <slot name="modal-content"></slot>
          </DialogDescription>
          
          <div class="flex items-center gap-3 p-4 border-t" v-if="props.actionButtons">
            <DialogClose as-child>
              <button class="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                Confirmar
              </button>
            </DialogClose>
            <DialogClose as-child>
              <button class="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2" aria-label="Close">
                Cancelar
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>