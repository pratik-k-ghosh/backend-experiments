import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const Dish = mysqlTable("dish", {
  id: serial().primaryKey(),
  name: varchar({ length: 10 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: int().notNull(),
});

export const User = mysqlTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 10 }).notNull(),
  designation: varchar({ length: 8 }).default("customer"),
  password: varchar({ length: 10 }).notNull(),
});
