import { fireEvent, render } from '@testing-library/vue';
import Modal from '../Modal.vue';

test('fecha modal ao clicar no botão de fechar', async () => {
  const { getByRole, emitted } = render(Modal, {
    props: { show: true },
  });
  const closeButton = getByRole('button');
  await fireEvent.click(closeButton);
  expect(emitted()).toHaveProperty('close');
});
