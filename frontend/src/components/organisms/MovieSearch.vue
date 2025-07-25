<template>
  <div class="bg-surface rounded-xl shadow-md p-6 mb-8 border border-surface-2">
    <h2 class="text-2xl font-bold text-text mb-6 pb-3 border-b border-surface-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 inline-block mr-2 text-accent"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      Search Movies
    </h2>

    <div class="flex flex-col sm:flex-row gap-3">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        placeholder="Enter movie title..."
        class="flex-1 px-4 py-3 border border-surface-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-background text-text placeholder-muted transition-all"
        @keyup.enter="$emit('search')"
      />

      <button
        @click="$emit('search')"
        class="px-6 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovieSearch',
  props: {
    modelValue: { type: String, required: true },
  },
  emits: ['update:modelValue', 'search'],
});
</script>
