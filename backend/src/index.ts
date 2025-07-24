import { userRoutes } from '@/routes/user.routes';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { clientRoutes } from './routes/client.routes';
import { movieRoutes } from './routes/movie.routes';

const app = new Hono();

app.use('*', cors());

app.get('/', (c) => {
  return c.text('Api is runnig! ');
});

app.route('/movies', movieRoutes);
app.route('/users', userRoutes);
app.route('/client', clientRoutes);

export default app;
