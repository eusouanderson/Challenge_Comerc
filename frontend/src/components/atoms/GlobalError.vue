<template>
  <transition name="fade">
    <div
      v-if="errorMessage"
      class="fixed top-4 right-4 max-w-sm bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg z-50 flex items-center space-x-3"
      role="alert"
    >
      <strong class="font-bold">Erro:</strong>
      <span class="flex-1">{{ errorMessage }}</span>
      <button
        @click="$emit('clear')"
        class="text-red-700 hover:text-red-900 font-bold focus:outline-none"
        aria-label="Fechar"
      >
        &times;
      </button>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  errorMessage: String,
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
