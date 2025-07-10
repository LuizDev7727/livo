import { env } from '@livo/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/infra/database/schema/**.ts',
  out: './src/infra/database/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
