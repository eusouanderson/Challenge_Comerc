<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="border border-surface rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-accent text-text placeholder-muted"
  />
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
}>();
</script>
