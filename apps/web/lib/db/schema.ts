import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Example users table - customize as needed
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Add your tables here
// Example:
// export const posts = pgTable("posts", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   title: text("title").notNull(),
//   content: text("content"),
//   authorId: uuid("author_id").references(() => users.id),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });
