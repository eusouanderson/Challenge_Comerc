import Button from '@/components/atoms/Button.vue';
import { fireEvent, render } from '@testing-library/vue';

describe('Button.vue', () => {
  it('deve renderizar com classe "primary" por padrão', () => {
    const { getByRole } = render(Button, {
      slots: { default: 'Clique aqui' },
    });

    const button = getByRole('button');
    expect(button).toHaveTextContent('Clique aqui');
    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveClass('text-[var(--color-text)]');
    expect(button).toHaveClass('focus:ring-[var(--color-primary)]');
    expect(button).toHaveClass('hover:brightness-110');
  });

  it('deve renderizar com classe "secondary"', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'secondary' },
      slots: { default: 'Secundário' },
    });

    const button = getByRole('button');
    expect(button).toHaveClass('bg-[var(--color-secondary)]');
    expect(button).toHaveClass('text-[var(--color-text)]');
    expect(button).toHaveClass('focus:ring-[var(--color-secondary)]');
  });

  it('deve renderizar com classe "danger"', () => {
    const { getByRole } = render(Button, {
      props: { variant: 'danger' },
      slots: { default: 'Perigo' },
    });

    const button = getByRole('button');
    expect(button).toHaveClass('bg-red-600');
    expect(button).toHaveClass('text-white');
    expect(button).toHaveClass('focus:ring-red-600');
  });

  it('deve aplicar estilo e atributo disabled', () => {
    const { getByRole } = render(Button, {
      props: { disabled: true },
      slots: { default: 'Desativado' },
    });

    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).not.toHaveClass('hover:brightness-110'); // hover não deve estar presente
  });

  it('deve emitir evento "click" ao ser clicado', async () => {
    const { getByRole, emitted } = render(Button, {
      slots: { default: 'Clique' },
    });

    const button = getByRole('button');
    await fireEvent.click(button);
    expect(emitted().click).toBeDefined();
    expect(emitted().click?.length).toBeGreaterThan(0);
  });
});
