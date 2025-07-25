import { fireEvent, render } from '@testing-library/vue';
import Input from '../Input.vue';

test('atualiza o valor do input e emite input', async () => {
  const { getByPlaceholderText, emitted } = render(Input, {
    props: { modelValue: '', placeholder: 'Digite algo...' },
  });
  const input = getByPlaceholderText('Digite algo...');
  await fireEvent.update(input, 'teste');
  expect(emitted()).toHaveProperty('update:modelValue');
});
