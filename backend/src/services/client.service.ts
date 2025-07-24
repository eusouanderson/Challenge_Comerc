import { db } from '@/db/client';
import { ConflictError } from '@/error/conflict.error';
import { client } from '@/schema/schema';
import { Client } from '@/types/client';
import { createClientSchema } from '@/validators/client.validate';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { eq } from 'drizzle-orm';

export class ClientService {
  async create(data: any) {
    const parsed = createClientSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error('Validation failed: ' + JSON.stringify(parsed.error.flatten().fieldErrors));
    }
    const validData = parsed.data;

    const existingClient = await db
      .select()
      .from(client)
      .where(eq(client.email, validData.email))
      .limit(1);

    if (existingClient.length > 0) {
      throw new ConflictError('Email already registered');
    }

    const existingCpf = await db
      .select()
      .from(client)
      .where(eq(client.cpf, validData.cpf))
      .limit(1);

    if (existingCpf.length > 0) {
      throw new ConflictError('CPF already registered');
    }

    const hashedPassword = await bcrypt.hash(validData.password, 10);

    const newClient = {
      id: randomUUID(),
      name: validData.name,
      lastname: validData.lastname,
      cpf: validData.cpf,
      email: validData.email,
      cell: validData.cell,
      cep: validData.cep,
      street: validData.street,
      neighborhood: validData.neighborhood,
      city: validData.city,
      uf: validData.uf,
      password: hashedPassword,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.insert(client).values(newClient);

    return { ...newClient, password: undefined };
  }

  async findAll() {
    return db.select().from(client);
  }

  async findById(id: string) {
    const result = await db.select().from(client).where(eq(client.id, id));
    return result[0];
  }

  async update(id: string, data: Partial<Client>) {
    await db
      .update(client)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(client.id, id));
  }

  async deactivate(id: string) {
    await db.update(client).set({ status: 'inactive' }).where(eq(client.id, id));
  }

  async login(cpf: string, password: string) {
    const result = await db.select().from(client).where(eq(client.cpf, cpf));
    const clientUser = result[0];
    if (!clientUser || !(await bcrypt.compare(password, clientUser.password))) {
      throw new Error('Invalid credentials');
    }
    return { id: clientUser.id, name: clientUser.name };
  }
}
