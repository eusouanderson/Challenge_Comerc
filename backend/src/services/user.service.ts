import { db } from '@/db/client';
import { ConflictError } from '@/error/conflict.error';
import { users } from '@/schema/schema';
import { User } from '@/types/user';
import { createUserSchema } from '@/validators/user.validate';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

export class UserService {
  async create(data: any) {
    try {
      const parsed = createUserSchema.safeParse(data);
      if (!parsed.success) {
        throw new Error('Validation failed: ' + JSON.stringify(parsed.error.flatten().fieldErrors));
      }
      const validData = parsed.data;

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, validData.email))
        .limit(1);

      if (existingUser.length > 0) {
        throw new ConflictError('Email already registered');
      }

      const hashedPassword = await bcrypt.hash(validData.password, 10);
      const newUser = {
        id: randomUUID(),
        name: validData.name,
        document: validData.document,
        password: hashedPassword,
        email: validData.email,
        status: 'active',
      };

      await db.insert(users).values(newUser);

      return { ...newUser, password: undefined };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return db.select().from(users);
  }

  async findById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async update(id: string, data: Partial<User>) {
    await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  async deactivate(id: string) {
    await db.update(users).set({ status: 'inactive' }).where(eq(users.id, id));
  }

  async login(document: string, password: string) {
    const result = await db.select().from(users).where(eq(users.document, document));
    const user = result[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return { id: user.id, name: user.name };
  }
}
