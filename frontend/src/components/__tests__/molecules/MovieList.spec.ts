import MovieList from '@/components/molecules/MovieList.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('MovieList.vue', () => {
  it('renderiza corretamente com slot padrão', () => {
    const wrapper = mount(MovieList, {
      slots: {
        default: '<div>Item 1</div><div>Item 2</div>',
      },
    });

    // A div principal + 2 slots = 3 divs no total
    expect(wrapper.findAll('div').length).toBe(3);
    expect(wrapper.text()).toContain('Item 1');
    expect(wrapper.text()).toContain('Item 2');
  });

  it('aplica classes CSS base corretamente', () => {
    const wrapper = mount(MovieList);

    const baseClasses = [
      'bg-center',
      'grid',
      'grid-cols-1',
      'max-w-6xl',
      'gap-6',
      'mx-auto',
      'justify-items-center',
    ];

    baseClasses.forEach((className) => {
      expect(wrapper.classes()).toContain(className);
    });
  });

  it('aplica classes responsivas corretamente', () => {
    const wrapper = mount(MovieList);

    expect(wrapper.classes()).toContain('sm:grid-cols-2');
    expect(wrapper.classes()).toContain('md:grid-cols-3');
    expect(wrapper.classes()).toContain('lg:grid-cols-4');
  });

  it('aplica max-width corretamente', () => {
    const wrapper = mount(MovieList);
    expect(wrapper.classes()).toContain('max-w-6xl');
  });

  it('centraliza os itens horizontalmente', () => {
    const wrapper = mount(MovieList);
    expect(wrapper.classes()).toContain('mx-auto');
    expect(wrapper.classes()).toContain('justify-items-center');
  });
});
