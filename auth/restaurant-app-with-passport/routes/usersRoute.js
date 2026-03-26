import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
const usersRouter = express.Router();

usersRouter.get("/", getUsers);
usersRouter.post("/", createUser);
usersRouter.put("/:username", updateUser);
usersRouter.delete("/:username", deleteUser);

export default usersRouter;
