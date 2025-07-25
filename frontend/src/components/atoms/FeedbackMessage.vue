<template>
  <div
    class="fixed bottom-4 right-4 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
    :class="{
      'bg-green-500': type === 'success',
      'bg-red-500': type === 'error',
    }"
  >
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FeedbackMessage',
  props: {
    message: { type: String, required: true },
    type: { type: String as () => 'success' | 'error', default: 'success' },
  },
});
</script>
