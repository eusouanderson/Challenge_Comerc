<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-background/50 flex items-center justify-center z-50 p-4"
  >
    <div class="bg-surface rounded p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <header class="flex justify-between items-center mb-4 sticky top-0 bg-surface z-10">
        <h3 class="text-xl font-bold text-text"><slot name="title" /></h3>
        <button
          @click="$emit('close')"
          class="text-muted hover:text-accent text-2xl leading-none transition-colors"
        >
          &times;
        </button>
      </header>
      <main class="overflow-y-auto max-h-[75vh] text-text">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ visible: boolean }>();
</script>
