<template>
  <main class="min-h-screen bg-zinc-900 text-text p-6 mx-auto">
    <h1 class="text-4xl font-bold mb-8 text-primary">Gerenciamento</h1>

    <div class="flex gap-4 mb-6">
      <button
        @click="toggleUser"
        :class="[
          'px-4 py-2 rounded-md font-semibold transition-colors',
          showUser ? 'bg-primary text-white' : 'bg-primary/70 hover:bg-primary/90 text-white',
        ]"
      >
        {{ showUser ? 'Ocultar' : 'Mostrar' }} Usuários
      </button>

      <button
        @click="toggleClient"
        :class="[
          'px-4 py-2 rounded-md font-semibold transition-colors',
          showClient
            ? 'bg-secondary text-white'
            : 'bg-secondary/70 hover:bg-secondary/90 text-white',
        ]"
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

function toggleUser() {
  showUser.value = !showUser.value;
  if (showUser.value) showClient.value = false;
}

function toggleClient() {
  showClient.value = !showClient.value;
  if (showClient.value) showUser.value = false;
}
</script>
