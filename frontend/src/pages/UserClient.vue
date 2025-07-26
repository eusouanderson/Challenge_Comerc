<template>
  <main class="min-h-screen bg-background text-text p-6 mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-primary">Gerenciamento</h1>

    <div class="flex gap-4 mb-6">
      <button
        @click="showUser = !showUser"
        class="px-4 py-2 rounded-md bg-primary hover:bg-accent text-text transition"
      >
        {{ showUser ? 'Ocultar' : 'Mostrar' }} Usuários
      </button>
      <button
        @click="showClient = !showClient"
        class="px-4 py-2 rounded-md bg-secondary hover:bg-accent text-text transition"
      >
        {{ showClient ? 'Ocultar' : 'Mostrar' }} Clientes
      </button>
    </div>

    <section class="space-y-8">
      <UserManagement v-if="showUser" />
      <ClientManagement v-if="showClient" />
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import UserManagement from '@/views/UserManagement.vue';
import ClientManagement from '@/views/ClientManagement.vue';

const showUser = ref(false);
const showClient = ref(false);
</script>
