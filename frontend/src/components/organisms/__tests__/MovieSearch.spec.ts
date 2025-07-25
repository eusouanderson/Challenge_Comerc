import { fireEvent, render } from '@testing-library/vue';
import MovieSearch from '../MovieSearch.vue';

test('emite evento de busca ao clicar no botão', async () => {
  const { getByPlaceholderText, getByRole, emitted } = render(MovieSearch);
  const input = getByPlaceholderText('Buscar filme...');
  await fireEvent.update(input, 'Batman');
  await fireEvent.click(getByRole('button'));
  expect(emitted()).toHaveProperty('search');
});
