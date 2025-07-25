import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/schema.ts',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
  migrations: {
    table: 'my_migrations_table',
    schema: 'public',
  },
});
