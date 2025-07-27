<template>
  <header
    class="relative flex items-center justify-between px-8 py-4 bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 text-white overflow-hidden select-none"
  >
    <div class="flex items-center space-x-4 overflow-hidden">
      <div
        class="animate-slideInLeft h-1 w-24 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"
      ></div>
      <h1 class="font-extrabold text-2xl tracking-widest animate-slideInLeft">
        MOVIE<span class="text-indigo-400">HUB</span>
      </h1>
    </div>

    <div class="flex items-center space-x-6 overflow-hidden">
      <LogoutButton />
      <div
        class="animate-slideInRight h-1 w-24 bg-gradient-to-l from-purple-400 to-indigo-400 rounded-full"
      ></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoutButton from '@/components/molecules/LogoutButton.vue';
</script>

<style scoped>
@keyframes slideInLeft {
  0% {
    transform: translateX(-150%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInRight {
  0% {
    transform: translateX(150%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideInLeft {
  animation: slideInLeft 1.2s ease forwards;
}

.animate-slideInRight {
  animation: slideInRight 1.2s ease forwards;
}
</style>
