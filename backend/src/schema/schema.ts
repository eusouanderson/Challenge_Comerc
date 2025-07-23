import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

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


export type User = InferModel<typeof users>;
