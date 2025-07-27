import LogoutButton from '@/components/molecules/LogoutButton.vue';
import { fireEvent, render } from '@testing-library/vue';
import { vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/login', name: 'LoginView', component: { template: '<div>Login</div>' } }],
});

describe('LogoutButton.vue', () => {
  beforeEach(() => {
    localStorage.setItem('client', 'token-fake');
  });

  it('deve remover client do localStorage e redirecionar para /login', async () => {
    const pushSpy = vi.spyOn(router, 'push');

    const { getByRole } = render(LogoutButton, {
      global: { plugins: [router] },
    });

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(localStorage.getItem('client')).toBeNull();
    expect(pushSpy).toHaveBeenCalledWith('/login');
  });
});
