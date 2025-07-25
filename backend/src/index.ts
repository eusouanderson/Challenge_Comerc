import { userRoutes } from '@/routes/user.routes';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { clientRoutes } from './routes/client.routes';
import { movieRoutes } from './routes/movie.routes';

const app = new Hono();

app.use('*', cors());

// Middleware
app.use('*', async (c, next) => {
  console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.url}`);
  await next();
});

app.get('/', (c) => {
  return c.text('Api is runnig! ');
});

app.route('/movies', movieRoutes);
app.route('/users', userRoutes);
app.route('/client', clientRoutes);

export default app;
