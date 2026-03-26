import { eq } from "drizzle-orm";
import db from "../config/db.js";
import { usersTable } from "../drizzle/schema.js";

export const createUser = async (req, res) => {
  try {
    const newUser = await db.insert(usersTable).values(req.body);
    return res.status(201).send(newUser);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const getUser = async (req, res) => {
  try {
    if (req.query.name) {
      const userData = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.name, req.query.name));
      return res.status(200).send(userData);
    }

    const userData = await db.select().from(usersTable);
    return res.status(200).send(userData);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await db
      .update(usersTable)
      .set(req.body)
      .where(eq(usersTable.id, req.params.id));
    return res.status(200).send(updatedUser);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await db
      .delete(usersTable)
      .where(eq(usersTable.id, req.params.id));
    return res.status(200).send(deletedUser);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
