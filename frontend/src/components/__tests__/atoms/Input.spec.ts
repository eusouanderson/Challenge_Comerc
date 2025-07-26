import Input from '@/components/atoms/Input.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Input.vue', () => {
  it('aplica o type corretamente', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        type: 'email',
      },
    });

    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('exibe placeholder quando fornecido', () => {
    const placeholderText = 'Digite seu email';
    const wrapper = mount(Input, {
      props: {
        modelValue: '',
        placeholder: placeholderText,
      },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe(placeholderText);
  });

  it('aplica v-model corretamente', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'valor inicial',
      },
    });

    const input = wrapper.find('input');
    expect(input.element.value).toBe('valor inicial');

    await input.setValue('novo valor');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['novo valor']);
  });

  it('aplica todas as classes CSS corretamente', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });

    const expectedClasses = [
      'border',
      'border-surface',
      'rounded',
      'px-3',
      'py-2',
      'w-full',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-accent',
      'text-text',
      'placeholder-muted',
    ];

    expectedClasses.forEach((className) => {
      expect(wrapper.find('input').classes()).toContain(className);
    });
  });

  it('emite evento update:modelValue ao digitar', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('testando');

    const emittedEvents = wrapper.emitted('update:modelValue');
    expect(emittedEvents).toBeDefined();
    expect(emittedEvents?.length).toBe(1);
    expect(emittedEvents?.[0]).toEqual(['testando']);
  });

  it('atualiza o valor quando modelValue muda', async () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'valor antigo' },
    });

    expect(wrapper.find('input').element.value).toBe('valor antigo');

    await wrapper.setProps({ modelValue: 'valor novo' });
    expect(wrapper.find('input').element.value).toBe('valor novo');
  });
});
