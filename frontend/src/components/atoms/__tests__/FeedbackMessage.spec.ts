import { render } from '@testing-library/vue';
import FeedbackMessage from '../FeedbackMessage.vue';

test('renderiza mensagem de feedback corretamente', () => {
  const { getByText } = render(FeedbackMessage, {
    props: { message: 'Tudo certo!', type: 'success' },
  });
  getByText('Tudo certo!');
});
