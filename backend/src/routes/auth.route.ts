import { loginService } from '@/services/auth.service';
import { Hono } from 'hono';

const authRouter = new Hono();

authRouter.post('/login', async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const result = await loginService(email, password);

    return c.json({
      message: 'Login successful',
      user: result.user,
      token: result.token, // token JWT para autenticação futura
    });
  } catch (err) {
    console.error('[LOGIN ERROR]', err);
    return c.json({ error: 'Invalid credentials' }, 401);
  }
});

export { authRouter };
