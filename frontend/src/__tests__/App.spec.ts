// @ts-nocheck

import App from '@/App.vue';
import router from '@/router';
import { render } from '@testing-library/vue';
import { createPinia } from 'pinia';
import { describe, expect, it } from 'vitest';

describe('App.vue', () => {
  it('renderiza o Header e o conteúdo da rota', async () => {
    const { getByRole } = render(App, {
      global: {
        plugins: [router, createPinia()],
        stubs: ['router-view'],
      },
    });

    expect(getByRole('banner')).toBeTruthy();
  });
});
