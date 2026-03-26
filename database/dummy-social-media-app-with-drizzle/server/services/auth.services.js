import { and, eq } from "drizzle-orm";
import db from "../config/db.js";
import * as tables from "../drizzle/schema.js";

export const createNewUser = async (data) => {
  try {
    const [user] = await db.insert(tables.usersTable).values(data);
    return user;
  } catch (err) {
    return null;
  }
};

export const getUserDataByUserName = async (userName) => {
  try {
    const [user] = await db
      .select()
      .from(tables.usersTable)
      .where(eq(tables.usersTable.userName, userName));
    return user;
  } catch (err) {
    return null;
  }
};

export const getUserDataByEmail = async (email) => {
  try {
    const [user] = await db
      .select()
      .from(tables.usersTable)
      .where(eq(tables.usersTable.email, email));
    return user;
  } catch (err) {
    return null;
  }
};

export const createNewSession = async (data) => {
  try {
    const [session] = await db
      .insert(tables.sessionsTable)
      .values(data)
      .$returningId();
    return session;
  } catch (err) {
    return null;
  }
};

export const getUserDataBySessionId = async (id) => {
  try {
    const [data] = await db
      .select({
        name: tables.usersTable.name,
        userName: tables.usersTable.userName,
        email: tables.usersTable.email,
        isVerified: tables.usersTable.isVerified,
        sessionId: tables.sessionsTable.id,
      })
      .from(tables.usersTable)
      .where(
        and(
          eq(tables.sessionsTable.id, id),
          eq(tables.usersTable.id, tables.sessionsTable.userId),
          eq(tables.sessionsTable.valid, true)
        )
      )
      .innerJoin(tables.sessionsTable);
    return data;
  } catch (err) {
    return null;
  }
};

export const getSessionDataBySessionId = async (id) => {
  try {
    const [session] = await db
      .select()
      .from(tables.sessionsTable)
      .where(eq(tables.sessionsTable.id, id));
    return session;
  } catch (err) {
    return null;
  }
};

export const deleteSessionDataBySessionId = async (id) => {
  try {
    const [session] = await db
      .delete(tables.sessionsTable)
      .where(eq(tables.sessionsTable.id, id));
    return session;
  } catch (err) {
    return null;
  }
};

export const insertVerifyEmailTokenData = async (data) => {
  return db.transaction(async (tx) => {
    try {
      await tx
        .delete(tables.verifyEmailsTable)
        .where(eq(tables.verifyEmailsTable.userId, data.userId));

      const [insertedData] = await tx
        .insert(tables.verifyEmailsTable)
        .values(data);
      return insertedData;
    } catch (err) {
      console.error("transaction Error:", err);
      return null;
    }
  });
};

export const getCodeDataByCodeAndUserId = async (code, userId) => {
  try {
    const [tokenData] = await db
      .select()
      .from(tables.verifyEmailsTable)
      .where(
        and(
          eq(tables.verifyEmailsTable.code, code),
          eq(tables.verifyEmailsTable.userId, userId)
        )
      );
    return tokenData;
  } catch (err) {
    return null;
  }
};

export const deleteCodeDataById = async (id) => {
  try {
    const [code] = await db
      .delete(tables.verifyEmailsTable)
      .where(eq(tables.verifyEmailsTable.id, id));
    return code;
  } catch (err) {
    return null;
  }
};

export const changeVerifyStatusByUserId = async (userId, codeId) => {
  return db.transaction(async (tx) => {
    try {
      await tx
        .update(tables.usersTable)
        .set({ isVerified: true })
        .where(eq(tables.usersTable.id, userId));

      await tx
        .delete(tables.verifyEmailsTable)
        .where(eq(tables.verifyEmailsTable.id, codeId));
    } catch (err) {
      console.error("transaction Error", err);
      return null;
    }
  });
};
