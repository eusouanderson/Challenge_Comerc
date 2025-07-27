// @ts-nocheck

import App from '@/App.vue';
import router from '@/router';
import { render, screen } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('main.ts – App initialization', () => {
  it('monta a aplicação e exibe o painel de gerenciamento', async () => {
    router.push('/management');
    await router.isReady();

    render(App, {
      global: {
        plugins: [router, createPinia()],
      },
    });

    const texto = await screen.findByText(/gerenciamento/i);
    expect(texto).toBeInTheDocument();
  });
});
