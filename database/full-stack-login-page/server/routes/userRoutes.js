import express from "express";
import { checkUser, createUser } from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.get("/", checkUser);
userRouter.post("/", createUser);

export default userRouter;
