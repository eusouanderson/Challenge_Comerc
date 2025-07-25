<template>
  <div
    class="bg-center grid grid-cols-1 max-w-6xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto justify-items-center"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovieList',
});
</script>
