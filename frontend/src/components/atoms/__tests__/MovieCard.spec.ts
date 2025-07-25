import { render } from '@testing-library/vue';
import MovieCard from '../MovieCard.vue';

test('renderiza título do filme', () => {
  const { getByText } = render(MovieCard, {
    props: {
      movie: {
        id: '1',
        title: 'Matrix',
        year: '1999',
        poster: '',
      },
    },
  });
  getByText('Matrix');
});
