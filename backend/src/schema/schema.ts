import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

// Tabela de usuários
export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
  document: varchar('document', { length: 100 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  email: varchar('email').notNull(),
  status: varchar('status', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// Tabela de clientes
export const client = pgTable('client', {
  id: varchar('id', { length: 36 }).primaryKey(), 
  name: varchar('name', { length: 255 }).notNull(),
  lastname: varchar('lastname', { length: 100 }).notNull(),
  cpf: varchar('cpf', { length: 14 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  cell: varchar('cell', { length: 20 }).notNull(),
  cep: varchar('cep', { length: 9 }).notNull(),
  street: varchar('street', { length: 255 }).notNull(),
  neighborhood: varchar('neighborhood', { length: 100 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  uf: varchar('uf', { length: 2 }).notNull(), 
  password: varchar('password', { length: 255 }).notNull(),
  status: varchar('status', { length: 10 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Client = typeof client.$inferSelect;
export type NewClient = typeof client.$inferInsert;
