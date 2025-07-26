import Button from '@/components/atoms/Button.vue';
import { fireEvent, render } from '@testing-library/vue';

describe('Button.vue', () => {
  it('deve renderizar com classe primária por padrão', () => {
    const { getByRole } = render(Button, {
      slots: { default: 'Clique aqui' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveTextContent('Clique aqui');
    expect(button).not.toBeDisabled();
  });

  it('deve renderizar com classe secundária', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Clique aqui' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('bg-gray-500');
  });

  it('deve renderizar com classe danger', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'danger' },
      slots: { default: 'Clique aqui' },
    });
    const button = getByRole('button');
    expect(button).toHaveClass('bg-red-600');
  });

  it('deve aplicar estilo e atributo disabled', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true },
      slots: { default: 'Não clicável' },
    });
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('deve emitir evento click ao ser clicado', async () => {
    const { getByRole, emitted } = render(Button, {
      slots: { default: 'Clique' },
    });

    const button = getByRole('button');
    await fireEvent.click(button);
    expect(emitted().click).toBeDefined();
    expect(emitted().click?.length).toBeGreaterThan(0);
  });
});
