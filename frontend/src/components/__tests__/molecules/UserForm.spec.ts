import ClientForm from '@/components/molecules/UserForm.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ClientForm.vue', () => {
  let wrapper: any;
  const mockSave = vi.fn();

  beforeEach(() => {
    // Mock da função alert global
    global.alert = vi.fn();

    wrapper = mount(ClientForm, {
      global: {
        stubs: ['Input', 'Button'], // Stub dos componentes filhos
      },
      props: {
        modelValue: null,
        onSave: mockSave,
      },
      emits: ['save'],
    });
  });

  it('não emite save se campos obrigatórios estiverem vazios', async () => {
    // Tenta submeter sem preencher campos
    await wrapper.find('form').trigger('submit.prevent');

    // Verifica se alert foi chamado
    expect(global.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios');
    // Verifica se o evento não foi emitido
    expect(wrapper.emitted('save')).toBeFalsy();
  });

  it('atualiza o status corretamente', async () => {
    const select = wrapper.find('select');
    await select.setValue('inactive');

    expect(wrapper.vm.form.status).toBe('inactive');
  });

  it('mantém password vazio quando editando', async () => {
    await wrapper.setProps({
      modelValue: {
        name: 'Cliente',
        email: 'cliente@example.com',
        document: '12345678901',
        status: 'active',
      },
    });

    expect(wrapper.vm.form.password).toBe('');
  });
});
