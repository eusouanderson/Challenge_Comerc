<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <div
      class="w-full max-w-md bg-surface rounded-xl shadow-lg p-8 space-y-6 border border-surface-2"
    >
      <div class="text-center">
        <h1 class="text-2xl font-bold text-text">Acesse sua conta</h1>
        <p class="text-muted mt-2">Informe seu e-mail e senha para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-text mb-1">E-mail</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-lg border border-surface-2 bg-background text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-text mb-1">Senha</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-lg border border-surface-2 bg-background text-text placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="••••••••"
          />
        </div>

        <div v-if="errorMessage" class="p-3 bg-danger/10 text-danger rounded-lg text-sm">
          {{ errorMessage }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ loading ? 'Acessando...' : 'Entrar' }}</span>
        </button>
      </form>

      <div class="text-center text-sm text-muted">
        Não tem uma conta?
        <router-link to="/register" class="text-accent hover:underline">Cadastre-se</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiClient } from '@/api/api.service.ts';

interface LoginResponse {
  message: string;
  client: {
    id: string;
    name: string;
    email: string;
  };
}

const router = useRouter();

const form = ref({
  email: '',
  password: '',
});

const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  const response = await apiClient.post<LoginResponse>('/client/auth', {
    email: form.value.email,
    password: form.value.password,
  });
  console.log(response.message);
  if (response.message === 'Login successful') {
    localStorage.setItem('client', JSON.stringify(response.message));
    router.push('/movies');
  }
};
</script>
