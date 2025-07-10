import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: varchar(),
  avatarUrl: varchar('avatar_url'),
  createdAt: timestamp().defaultNow().notNull(),
});
