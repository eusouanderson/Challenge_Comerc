import GlobalError from '@/components/atoms/GlobalError.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('GlobalError.vue', () => {
  it('não renderiza quando errorMessage está vazio', () => {
    const wrapper = mount(GlobalError, {
      props: { errorMessage: '' },
    });
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });

  it('renderiza corretamente quando errorMessage existe', () => {
    const errorMsg = 'Erro de teste';
    const wrapper = mount(GlobalError, {
      props: { errorMessage: errorMsg },
    });

    const alert = wrapper.find('[role="alert"]');
    expect(alert.exists()).toBe(true);
    expect(alert.text()).toContain(errorMsg);
    expect(alert.classes()).toContain('bg-red-100');
    expect(alert.classes()).toContain('border-red-400');
  });

  it('contém a estrutura correta do DOM', () => {
    const wrapper = mount(GlobalError, {
      props: { errorMessage: 'Teste' },
    });

    const alert = wrapper.find('[role="alert"]');
    expect(alert.find('strong').text()).toBe('Erro:');
    expect(alert.find('span').exists()).toBe(true);
    expect(alert.find('button').exists()).toBe(true);
    expect(alert.find('button').text()).toBe('×');
  });

  it('emite evento clear quando o botão é clicado', async () => {
    const wrapper = mount(GlobalError, {
      props: { errorMessage: 'Teste' },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('clear');
  });

  it('aplica classes CSS corretamente', () => {
    const wrapper = mount(GlobalError, {
      props: { errorMessage: 'Teste' },
    });

    const alert = wrapper.find('[role="alert"]');
    const expectedClasses = [
      'fixed',
      'top-4',
      'right-4',
      'max-w-sm',
      'bg-red-100',
      'border',
      'border-red-400',
      'text-red-700',
      'px-4',
      'py-3',
      'rounded',
      'shadow-lg',
      'z-50',
      'flex',
      'items-center',
      'space-x-3',
    ];

    expectedClasses.forEach((className) => {
      expect(alert.classes()).toContain(className);
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('text-red-700');
    expect(button.classes()).toContain('hover:text-red-900');
  });

  it('tem atributos ARIA corretos', () => {
    const wrapper = mount(GlobalError, {
      props: { errorMessage: 'Teste' },
    });

    const alert = wrapper.find('[role="alert"]');
    expect(alert.attributes('role')).toBe('alert');

    const button = wrapper.find('button');
    expect(button.attributes('aria-label')).toBe('Fechar');
  });
});
