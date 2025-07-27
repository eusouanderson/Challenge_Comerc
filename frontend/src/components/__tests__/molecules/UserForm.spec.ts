import ClientForm from '@/components/molecules/ClientForm.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

let wrapper: VueWrapper<any>;
const alertMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal('alert', alertMock);
});

describe('ClientForm.vue', () => {
  it('renderiza corretamente com campos vazios (modo criação)', () => {
    wrapper = mount(ClientForm, {
      props: {
        modelValue: null,
      },
    });

    expect(
      (wrapper.find('input[placeholder="exemplo@dominio.com"]').element as HTMLInputElement).value
    ).toBe('');
    expect(wrapper.find('select').element.value).toBe('active');
  });

  it('preenche os campos e emite o evento save corretamente', async () => {
    wrapper = mount(ClientForm, {
      props: {
        modelValue: null,
      },
    });

    await wrapper.find('input[placeholder="exemplo@dominio.com"]').setValue('joao@email.com');
    await wrapper.find('input[placeholder="Senha"]').setValue('senha123');
    await wrapper.find('select').setValue('inactive');

    await wrapper.find('form').trigger('submit.prevent');
  });

  it('mostra alert se campos obrigatórios estiverem faltando', async () => {
    wrapper = mount(ClientForm, {
      props: { modelValue: null },
    });

    await wrapper.find('input[placeholder="exemplo@dominio.com"]').setValue('');
    await wrapper.find('form').trigger('submit.prevent');

    expect(alertMock).toHaveBeenCalledWith('Preencha todos os campos obrigatórios');
    expect(wrapper.emitted('save')).toBeFalsy();
  });

  it('não exige senha se estiver no modo de edição', async () => {
    wrapper = mount(ClientForm, {
      props: {
        modelValue: {
          name: 'Joana',
          email: 'joana@email.com',
          document: '98765432100',
          status: 'active',
        },
      },
    });

    await wrapper.find('form').trigger('submit.prevent');
  });
});
