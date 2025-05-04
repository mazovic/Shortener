import { pgTable, varchar, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const urls = pgTable('urls', {
  id: uuid('id').primaryKey().defaultRandom(),
  shortUrl: varchar('short_url', { length: 10 }).notNull().unique(),
  originalUrl: varchar('original_url', { length: 2048 }).notNull(),
  visitCount: integer('visit_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  lastVisitedAt: timestamp('last_visited_at'),
});
