import MovieSearch from '@/components/organisms/MovieSearch.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('MovieSearch.vue', () => {
  it('renderiza corretamente com a prop modelValue', () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: 'Batman',
      },
    });

    expect(wrapper.find('input').element.value).toBe('Batman');
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.text()).toContain('Search Movies');
  });

  it('emite evento update:modelValue ao digitar no input', async () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: '',
      },
    });

    const input = wrapper.find('input');
    await input.setValue('Superman');

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Superman']);
  });

  it('emite evento search ao clicar no botão', async () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: 'Avengers',
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('search');
  });

  it('emite evento search ao pressionar Enter no input', async () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: 'Iron Man',
      },
    });

    const input = wrapper.find('input');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted()).toHaveProperty('search');
  });

  it('aplica classes CSS corretamente', () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: '',
      },
    });

    // Verifica classes do container principal
    expect(wrapper.classes()).toContain('bg-surface');
    expect(wrapper.classes()).toContain('rounded-xl');
    expect(wrapper.classes()).toContain('shadow-md');

    // Verifica classes do input
    const input = wrapper.find('input');
    expect(input.classes()).toContain('flex-1');
    expect(input.classes()).toContain('px-4');
    expect(input.classes()).toContain('py-3');
    expect(input.classes()).toContain('focus:ring-2');

    // Verifica classes do botão
    const button = wrapper.find('button');
    expect(button.classes()).toContain('bg-accent');
    expect(button.classes()).toContain('text-white');
    expect(button.classes()).toContain('hover:bg-accent/90');
  });

  it('exibe o placeholder correto no input', () => {
    const wrapper = mount(MovieSearch, {
      props: {
        modelValue: '',
      },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter movie title...');
  });
});
