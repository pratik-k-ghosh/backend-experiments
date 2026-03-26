import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  isVerified: boolean("is_verified").default(false).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const sessionsTable = mysqlTable("sessions_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent").notNull(),
  userIp: varchar("user_ip", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const verifyEmailsTable = mysqlTable("verify_emails_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  code: varchar({ length: 8 }).notNull(),
  valid: boolean().default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 15 MINUTE)`)
    .notNull(),
});

export const verifyPasswordTable = mysqlTable("verify_password_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  code: varchar({ length: 8 }).notNull(),
  valid: boolean().default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)`)
    .notNull(),
});

export const usersTableRelation = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
  verifyEmail: many(verifyEmailsTable),
}));

export const sessionsTableRelation = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const verifyEmailsTableRelation = relations(
  verifyEmailsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [verifyEmailsTable.userId],
      references: [usersTable.id],
    }),
  })
);

export const verifyPasswordTableRelation = relations(
  verifyPasswordTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [verifyEmailsTable.userId],
      references: [usersTable.id],
    }),
  })
);
