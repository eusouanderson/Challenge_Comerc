import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  schema: "./src/schema/schema.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://user:password@host:port/dbname",
  },
  migrations: {
    table: "my_migrations_table",
    schema: "public",
  },
});
