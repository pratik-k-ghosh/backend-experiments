import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import express from "express";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.put("/:name", updateUser);
userRouter.delete("/:name", deleteUser);

export default userRouter;