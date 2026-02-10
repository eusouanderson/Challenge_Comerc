<template>
  <ce-autocomplete> content </ce-autocomplete>
  <button
    :class="[
      'px-4 py-2 rounded font-semibold focus:outline-none transition-colors duration-300',
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-[var(--color-secondary)] text-[var(--color-text)] focus:ring-[var(--color-secondary)]';
    case 'danger':
      return 'bg-red-600 text-white focus:ring-red-600';
    default:
      return 'bg-[var(--color-primary)] text-[var(--color-text)] focus:ring-[var(--color-primary)]';
  }
});
</script>

<style scoped>
button {
  box-shadow: 0 4px 6px rgb(0 0 0 / 0.1);
}

button:hover:not(:disabled) {
  cursor: pointer;
  box-shadow: 0 6px 12px rgb(0 0 0 / 0.15);
}
</style>
