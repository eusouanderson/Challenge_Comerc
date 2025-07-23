<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded p-6 w-full max-w-lg">
      <header class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold"><slot name="title" /></h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </header>
      <main><slot /></main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ visible: boolean }>();
</script>
