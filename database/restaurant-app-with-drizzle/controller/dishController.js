import { eq, lte } from "drizzle-orm";
import db from "../config/db.js";
import { Dish } from "../drizzle/schema.js";

export const createDish = async (req, res) => {
  try {
    const newDish = await db.insert(Dish).values(req.body);
    return res.status(201).json(newDish);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const getDish = async (req, res) => {
  try {
    const { name, price } = req.query;

    if (name) {
      const dishData = await db.select().from(Dish).where(eq(Dish.name, name));
      console.log(dishData);
      return res.status(200).json(dishData);
    }

    if (price) {
      const dishData = await db
        .select()
        .from(Dish)
        .where(lte(Dish.price, price));
      return res.status(200).json(dishData);
    }

    const dishData = await db.select().from(Dish);
    return dishData;
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const updateDish = async (req, res) => {
  try {
    const updatedDish = await db
      .update(Dish)
      .set(req.body)
      .where(eq(Dish.id, req.params.id));
    return res.status(200).json(updatedDish);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const deleteDish = async (req, res) => {
  try {
    const deletedDish = await db.delete(Dish).where(eq(Dish.id, req.params.id));
    return res.status(200).json(deletedDish);
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};
