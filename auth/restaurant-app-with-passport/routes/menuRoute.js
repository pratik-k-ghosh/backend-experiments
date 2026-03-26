import express from "express";
import {
  getMenu,
  addDish,
  updateDish,
  removeDish,
} from "../controllers/menuController.js";

const menuRouter = express.Router();

menuRouter.get("/", getMenu);
menuRouter.post("/edit", addDish);
menuRouter.put("/edit/:name", updateDish);
menuRouter.delete("/edit/:name", removeDish);

export default menuRouter;
