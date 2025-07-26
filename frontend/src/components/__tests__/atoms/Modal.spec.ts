import Modal from '@/components/atoms/Modal.vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

describe('Modal.vue', () => {
  it('não renderiza quando visible é false', () => {
    const wrapper = mount(Modal, {
      props: { visible: false },
    });
    expect(wrapper.find('.fixed').exists()).toBe(false);
  });

  it('renderiza corretamente quando visible é true', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    expect(wrapper.find('.fixed').exists()).toBe(true);
    expect(wrapper.find('.bg-surface').exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emite evento close quando o botão é clicado', async () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  });

  it('renderiza slots corretamente', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
      slots: {
        default: 'Conteúdo principal do modal',
        title: 'Título do Modal',
      },
    });

    expect(wrapper.text()).toContain('Conteúdo principal do modal');
    expect(wrapper.text()).toContain('Título do Modal');
    expect(wrapper.find('h3').text()).toBe('Título do Modal');
  });

  it('aplica classes CSS corretamente', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    // Teste para classes do overlay
    const overlay = wrapper.find('.fixed');
    expect(overlay.classes()).toContain('bg-background/50');
    expect(overlay.classes()).toContain('flex');
    expect(overlay.classes()).toContain('items-center');
    expect(overlay.classes()).toContain('justify-center');

    // Teste para classes do container do modal
    const modalContainer = wrapper.find('.bg-surface');
    expect(modalContainer.classes()).toContain('rounded');
    expect(modalContainer.classes()).toContain('p-6');
    expect(modalContainer.classes()).toContain('max-w-3xl');
    expect(modalContainer.classes()).toContain('max-h-[90vh]');

    // Teste para classes do botão de fechar
    const closeButton = wrapper.find('button');
    expect(closeButton.classes()).toContain('text-muted');
    expect(closeButton.classes()).toContain('hover:text-accent');
    expect(closeButton.classes()).toContain('transition-colors');
  });

  it('possui estrutura DOM correta', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    expect(wrapper.find('header').exists()).toBe(true);
    expect(wrapper.find('main').exists()).toBe(true);
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('×');
  });

  it('aplica classes sticky no header', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    const header = wrapper.find('header');
    expect(header.classes()).toContain('sticky');
    expect(header.classes()).toContain('top-0');
    expect(header.classes()).toContain('z-10');
  });

  it('configura scroll interno corretamente', () => {
    const wrapper = mount(Modal, {
      props: { visible: true },
    });

    const main = wrapper.find('main');
    expect(main.classes()).toContain('overflow-y-auto');
    expect(main.classes()).toContain('max-h-[75vh]');
  });
});
