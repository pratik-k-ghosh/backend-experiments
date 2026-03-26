import express from "express";
import {
  createDish,
  deleteDish,
  getDish,
  updateDish,
} from "../controller/dishController.js";

const dishRouter = express.Router();

dishRouter.post("/", createDish);
dishRouter.get("/", getDish);
dishRouter.put("/:id", updateDish);
dishRouter.delete("/:id", deleteDish);

export default dishRouter;
