import ClienteForm from '@/components/molecules/ClientForm.vue';
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('ClienteForm.vue', () => {
  // Mock data for an existing client
  const existingClient = {
    name: 'Existing',
    lastname: 'Client',
    email: 'existing@test.com',
    cpf: '12345678901',
    cell: '11999999999',
    cep: '01001000',
    street: 'Existing Street',
    neighborhood: 'Existing Neighborhood',
    city: 'Existing City',
    uf: 'SP',
    status: 'active',
  };

  // Mock window.alert before each test
  beforeEach(() => {
    window.alert = vi.fn();
  });

  it('renderiza todos os campos do formulário', () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null, // For new client form
      },
    });

    const fields = [
      'name',
      'lastname',
      'email',
      'cpf',
      'cell',
      'cep',
      'street',
      'neighborhood',
      'city',
      'uf',
      'password',
      'status',
    ];

    fields.forEach((field) => {
      expect(wrapper.find(`#${field}`).exists()).toBe(true);
    });
  });

  it('emite evento save com dados do formulário', async () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null, // For new client form
      },
    });

    // Fill out the form
    await wrapper.find('#name').setValue('Test Name');
    await wrapper.find('#lastname').setValue('Test Lastname');
    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#cpf').setValue('12345678901');
    await wrapper.find('#cell').setValue('11999999999');
    await wrapper.find('#cep').setValue('01001000');
    await wrapper.find('#street').setValue('Test Street');
    await wrapper.find('#neighborhood').setValue('Test Neighborhood');
    await wrapper.find('#city').setValue('Test City');
    await wrapper.find('#uf').setValue('SP');
    await wrapper.find('#password').setValue('password123');

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('save')).toBeTruthy();
    expect(wrapper.emitted('save')?.[0]).toEqual([
      {
        name: 'Test Name',
        lastname: 'Test Lastname',
        email: 'test@example.com',
        cpf: '12345678901',
        cell: '11999999999',
        cep: '01001000',
        street: 'Test Street',
        neighborhood: 'Test Neighborhood',
        city: 'Test City',
        uf: 'SP',
        password: 'password123',
        status: 'active', // default value
      },
    ]);
  });

  it('não requer senha quando editando cliente existente', () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: existingClient,
      },
    });

    const passwordInput = wrapper.find('#password');
    expect(passwordInput.attributes('required')).toBeUndefined();
  });

  it('requer senha quando criando novo cliente', () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null, // For new client form
      },
    });

    const passwordInput = wrapper.find('#password');
    expect(passwordInput.attributes('required')).toBeDefined();
  });

  it('preenche campos quando modelValue é fornecido', () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: existingClient,
      },
    });

    expect(wrapper.find('#name').element.value).toBe(existingClient.name);
    expect(wrapper.find('#lastname').element.value).toBe(existingClient.lastname);
    expect(wrapper.find('#email').element.value).toBe(existingClient.email);
    expect(wrapper.find('#password').element.value).toBe('');
  });

  it('não emite save se campos obrigatórios estiverem vazios e mostra alerta', async () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null,
      },
    });

    await wrapper.find('form').trigger('submit.prevent');

    // Verify save was not emitted
    expect(wrapper.emitted('save')).toBeUndefined();

    // Verify alert was called with the correct message
    expect(window.alert).toHaveBeenCalledWith('Preencha todos os campos obrigatórios');
  });

  it('busca endereço quando CEP é válido', async () => {
    // Mock the fetch function
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            logradouro: 'Praça da Sé',
            bairro: 'Sé',
            localidade: 'São Paulo',
            uf: 'SP',
          }),
      })
    );

    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null,
      },
    });

    await wrapper.find('#cep').setValue('01001000');
    await wrapper.find('#cep').trigger('blur');

    // Wait for promises to resolve
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.form.street).toBe('Praça da Sé');
    expect(wrapper.vm.form.city).toBe('São Paulo');
    expect(wrapper.vm.autoFilled).toBe(true);
  });

  it('não busca endereço quando CEP é inválido', async () => {
    const wrapper = mount(ClienteForm, {
      props: {
        modelValue: null,
      },
    });

    await wrapper.find('#cep').setValue('123');
    await wrapper.find('#cep').trigger('blur');

    expect(wrapper.vm.autoFilled).toBe(false);
    expect(wrapper.vm.form.street).toBe('');
  });
});
