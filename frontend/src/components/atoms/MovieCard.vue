<template>
  <div
    class="w-full max-w-[220px] bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform"
  >
    <div class="aspect-[2/3] bg-gray-200 overflow-hidden">
      <img
        :src="poster"
        :alt="title"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
    </div>
    <div class="p-4 text-center">
      <h3 class="text-lg font-semibold text-gray-800 mb-1 truncate">{{ title }}</h3>
      <p class="text-sm text-gray-600">{{ year }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovieCard',
  props: {
    title: { type: String, required: true },
    year: { type: String, required: true },
    poster: { type: String, required: true },
  },
  methods: {
    handleImageError(event: Event) {
      const img = event.target as HTMLImageElement;
      img.src = 'https://placehold.co/300x450.png?text=No+Poster+Available&font=roboto';
    },
  },
});
</script>
