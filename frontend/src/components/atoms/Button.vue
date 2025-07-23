<template>
  <button
    :class="[
      'px-4 py-2 rounded font-semibold focus:outline-none',
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-500 text-white';
    case 'danger':
      return 'bg-red-600 text-white';
    default:
      return 'bg-blue-600 text-white';
  }
});
</script>
