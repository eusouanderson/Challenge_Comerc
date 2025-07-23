import { Hono } from 'hono'
import { userRoutes } from '@/routes/user.routes';
import { movieRoutes } from './routes/movie.routes';
import { cors } from 'hono/cors';

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('Api is runnig! ')
})

app.route('/movies', movieRoutes);
app.route('/users', userRoutes);

export default app
