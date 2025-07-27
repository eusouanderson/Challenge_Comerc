// @ts-nocheck

import Form from '@/components/molecules/ClientForm.vue';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        logradouro: 'Rua Teste',
        bairro: 'Centro',
        localidade: 'São Paulo',
        uf: 'SP',
      }),
  })
) as any;

describe('ClientForm.vue', () => {
  it('renderiza todos os campos esperados', () => {
    const { getByLabelText } = render(Form, { props: { modelValue: null } });

    expect(getByLabelText('Nome')).toBeInTheDocument();
    expect(getByLabelText('E-mail')).toHaveAttribute('type', 'email');
    expect(getByLabelText('Senha')).toBeRequired();
  });

  it('emite evento save ao preencher e enviar dados válidos', async () => {
    const { getByLabelText, getByRole, emitted } = render(Form, { props: { modelValue: null } });

    await fireEvent.update(getByLabelText('Nome'), 'João');
    await fireEvent.update(getByLabelText('Sobrenome'), 'Silva');
    await fireEvent.update(getByLabelText('E-mail'), 'joao@email.com');
    await fireEvent.update(getByLabelText('CPF'), '12345678900');
    await fireEvent.update(getByLabelText('Celular'), '(11) 99999-9999');
    await fireEvent.update(getByLabelText('CEP'), '01001000');
    await fireEvent.blur(getByLabelText('CEP'));

    await waitFor(() => {
      expect(getByLabelText('Logradouro')).toHaveValue('Rua Teste');
      expect(getByLabelText('Cidade')).toHaveValue('São Paulo');
      expect(getByLabelText('UF')).toHaveValue('SP');
    });

    await fireEvent.update(getByLabelText('Senha'), '123456');
    await fireEvent.click(getByRole('button', { name: 'Salvar' }));

    const saveEvents = emitted().save;
    expect(saveEvents).toBeTruthy();
    const payload = saveEvents[0][0] as { name: string; city: string };
    expect(payload.name).toBe('João');
    expect(payload.city).toBe('São Paulo');
  });

  it('não emite evento save se campos obrigatórios estiverem vazios', async () => {
    const { getByRole, emitted } = render(Form, { props: { modelValue: null } });

    await fireEvent.click(getByRole('button', { name: 'Salvar' }));

    expect(emitted().save).toBeUndefined();
  });

  it('ao receber modelValue, preenche os campos e desativa senha', async () => {
    const mockClient = {
      name: 'Ana',
      lastname: 'Souza',
      email: 'ana@email.com',
      cpf: '98765432100',
      cell: '(21) 98888-8888',
      cep: '22041001',
      street: 'Rua Ana',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      uf: 'RJ',
      status: 'active',
    };

    const { getByLabelText } = render(Form, {
      props: { modelValue: mockClient },
    });

    expect(getByLabelText('Nome')).toHaveValue('Ana');
    expect(getByLabelText('Senha')).not.toBeRequired();
  });
});
