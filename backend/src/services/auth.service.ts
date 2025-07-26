import { db } from '@/db/client';
import { client, users } from '@/schema/schema';
import { comparePasswords, generateToken } from '@/utils/auth.util';
import { eq } from 'drizzle-orm';

export const loginService = async (email: string, password: string) => {
  const foundClient = await db.select().from(client).where(eq(client.email, email)).limit(1);
  if (foundClient.length > 0) {
    const c = foundClient[0];
    const match = await comparePasswords(password, c.password);
    if (!match) throw new Error('Invalid password');

    const token = generateToken({ id: c.id, role: 'client' });

    return {
      token,
      user: {
        id: c.id,
        name: c.name,
        email: c.email,
        status: c.status,
        role: 'client',
      },
    };
  }

  const foundUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (foundUser.length > 0) {
    const u = foundUser[0];
    const match = await comparePasswords(password, u.password);
    if (!match) throw new Error('Invalid password');

    const token = generateToken({ id: u.id, role: 'admin' });

    return {
      token,
      user: {
        id: u.id,
        name: u.name,
        email: u.email,
        status: u.status,
        role: 'admin',
      },
    };
  }

  throw new Error('User not found');
};
