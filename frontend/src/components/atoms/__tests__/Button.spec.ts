import { fireEvent, render } from '@testing-library/vue';
import Button from '../Button.vue';

test('emite clique quando clicado', async () => {
  const { getByText, emitted } = render(Button, {
    slots: { default: 'Salvar' },
  });
  await fireEvent.click(getByText('Salvar'));
  expect(emitted()).toHaveProperty('click');
});
