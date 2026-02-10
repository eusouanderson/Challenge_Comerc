<template>
  <main class="min-h-screen bg-background text-text flex items-center justify-center p-8">
    <LoginView />
  </main>
  <ce-button variant="primary" size="'md'" :disabled="false"> content </ce-button>
  <ce-input label="Label" placeholder="Placeholder" :disabled="false" :required="false">
    content
  </ce-input>
  <ce-select label="Label" placeholder="Placeholder" :disabled="false" :required="false">
    content
  </ce-select>
</template>

<script setup>
import LoginView from '@/views/LoginView.vue';
</script>
