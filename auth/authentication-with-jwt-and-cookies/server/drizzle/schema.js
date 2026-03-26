import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  userName: varchar("user_name", { length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
