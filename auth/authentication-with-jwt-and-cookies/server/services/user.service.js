import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async ({ userName, name, email, hashedPassword }) => {
  try {
    return await db
      .insert(usersTable)
      .values({ userName, name, email, password: hashedPassword });
  } catch (err) {
    return null;
  }
};

export const getUserByUserName = async (userName) => {
  try {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userName, userName));
  } catch (err) {
    return null;
  }
};
