import MovieCard from '@/components/atoms/MovieCard.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('MovieCard.vue', () => {
  const mockProps = {
    title: 'Inception',
    year: '2010',
    poster: 'https://example.com/poster.jpg',
  };

  it('renderiza corretamente com props', () => {
    const wrapper = mount(MovieCard, {
      props: mockProps,
    });

    expect(wrapper.find('img').attributes('src')).toBe(mockProps.poster);
    expect(wrapper.find('img').attributes('alt')).toBe(mockProps.title);
    expect(wrapper.find('h3').text()).toBe(`${mockProps.title} (${mockProps.year})`);
  });

  it('aplica classes CSS corretamente', () => {
    const wrapper = mount(MovieCard, {
      props: mockProps,
    });

    const card = wrapper.find('div');
    expect(card.classes()).toContain('bg-white');
    expect(card.classes()).toContain('rounded-lg');
    expect(card.classes()).toContain('shadow-md');
    expect(card.classes()).toContain('hover:-translate-y-1');
    expect(card.classes()).toContain('transition-transform');

    const img = wrapper.find('img');
    expect(img.classes()).toContain('w-full');
    expect(img.classes()).toContain('h-[350px]');
    expect(img.classes()).toContain('object-cover');
    expect(img.classes()).toContain('bg-gray-200');

    const title = wrapper.find('h3');
    expect(title.classes()).toContain('truncate');
  });

  it('renderiza slot content corretamente', () => {
    const slotContent = '<p class="text-sm">Ação, Ficção Científica</p>';
    const wrapper = mount(MovieCard, {
      props: mockProps,
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });

  it('trata erro de imagem corretamente', async () => {
    const wrapper = mount(MovieCard, {
      props: mockProps,
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(img.attributes('src')).toBe(
      'https://placehold.co/300x450.png?text=No+Poster+Available&font=roboto'
    );
  });

  it('formata o título corretamente com ano', () => {
    const wrapper = mount(MovieCard, {
      props: {
        title: 'The Dark Knight',
        year: '2008',
        poster: 'poster.jpg',
      },
    });

    expect(wrapper.find('h3').text()).toBe('The Dark Knight (2008)');
  });

  it('aplica hover effect corretamente', () => {
    const wrapper = mount(MovieCard, {
      props: mockProps,
    });

    const card = wrapper.find('div');
    expect(card.classes()).toContain('hover:-translate-y-1');
    expect(card.classes()).toContain('transition-transform');
  });
});
