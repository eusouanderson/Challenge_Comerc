import { render } from '@testing-library/vue';
import MovieList from '../MovieList.vue';

test('renderiza lista de filmes', () => {
  const { getByText } = render(MovieList, {
    props: {
      movies: [
        { id: '1', title: 'Matrix', year: '1999', poster: '' },
        { id: '2', title: 'Interestelar', year: '2014', poster: '' },
      ],
    },
  });
  getByText('Matrix');
  getByText('Inte