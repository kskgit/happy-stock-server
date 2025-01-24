import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    age: integer("age").notNull(),
    email: text("email").notNull().unique(),
});

export const stocksTable = sqliteTable("stocks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("name").notNull(),
    day_of_week: text({ enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',] }),
    notification_time: text("notification_time"),
});
