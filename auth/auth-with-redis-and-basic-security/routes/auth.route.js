import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUser,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", authMiddleware, getUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify", verifyUser);
authRouter.post("/login", loginUser);

export default authRouter;
