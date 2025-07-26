import FeedbackMessage from '@/components/atoms/FeedbackMessage.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('FeedbackMessage.vue', () => {
  it('renderiza corretamente com mensagem padrão', () => {
    const message = 'Operação realizada com sucesso!';
    const wrapper = mount(FeedbackMessage, {
      props: { message },
    });

    expect(wrapper.text()).toContain(message);
    expect(wrapper.classes()).toContain('bg-green-500');
    expect(wrapper.classes()).not.toContain('bg-red-500');
    expect(wrapper.classes()).toContain('fixed');
    expect(wrapper.classes()).toContain('bottom-4');
  });

  it('aplica classe de sucesso quando type é "success"', () => {
    const wrapper = mount(FeedbackMessage, {
      props: {
        message: 'Sucesso!',
        type: 'success',
      },
    });

    expect(wrapper.classes()).toContain('bg-green-500');
    expect(wrapper.classes()).not.toContain('bg-red-500');
  });

  it('aplica classe de erro quando type é "error"', () => {
    const wrapper = mount(FeedbackMessage, {
      props: {
        message: 'Erro ocorreu!',
        type: 'error',
      },
    });

    expect(wrapper.classes()).toContain('bg-red-500');
    expect(wrapper.classes()).not.toContain('bg-green-500');
  });

  it('renderiza a mensagem passada como prop', () => {
    const testMessage = 'Mensagem personalizada de teste';
    const wrapper = mount(FeedbackMessage, {
      props: { message: testMessage },
    });

    expect(wrapper.text()).toBe(testMessage);
  });

  it('possui classes CSS base sempre presentes', () => {
    const wrapper = mount(FeedbackMessage, {
      props: { message: 'Teste' },
    });

    const baseClasses = [
      'fixed',
      'bottom-4',
      'right-4',
      'text-white',
      'px-4',
      'py-2',
      'rounded',
      'shadow-lg',
      'transition-opacity',
      'duration-300',
    ];

    baseClasses.forEach((className) => {
      expect(wrapper.classes()).toContain(className);
    });
  });
});
