import express from "express";
import { getUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", getUser);
authRouter.post("/register", registerUser);

export default authRouter;
