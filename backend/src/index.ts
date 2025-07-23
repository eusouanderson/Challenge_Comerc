import { Hono } from 'hono'
import { userRoutes } from '@/routes/user.routes';
import { cors } from 'hono/cors';

const app = new Hono()

app.use('*', cors())

app.get('/', (c) => {
  return c.text('Api is runnig! ')
})

app.route('/users', userRoutes);

export default app
