<template>
  <div class="flex gap-4 mb-4">
    <button
      @click="$emit('viewChanged', 'all')"
      :class="{
        'bg-blue-500 text-white': currentView === 'all',
        'bg-gray-200 text-gray-600': currentView !== 'all',
      }"
      class="px-6 py-2 font-bold rounded transition-colors"
    >
      All Movies
    </button>
    <button
      @click="$emit('viewChanged', 'mine')"
      :class="{
        'bg-blue-500 text-white': currentView === 'mine',
        'bg-gray-200 text-gray-600': currentView !== 'mine',
      }"
      class="px-6 py-2 font-bold rounded transition-colors"
    >
      My Movies
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovieViewToggle',
  props: {
    currentView: { type: String as () => 'all' | 'mine', required: true },
  },
  emits: ['viewChanged'],
});
</script>
