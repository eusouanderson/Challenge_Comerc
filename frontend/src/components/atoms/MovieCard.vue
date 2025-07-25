<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform"
  >
    <img
      :src="poster"
      :alt="title"
      class="w-full h-[350px] object-cover bg-gray-200"
      @error="handleImageError"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 truncate">{{ title }} ({{ year }})</h3>
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
