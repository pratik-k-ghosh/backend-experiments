import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", authMiddleware, getUser);
authRouter.post("/register", authMiddleware, registerUser);
authRouter.post("/verify", authMiddleware, verifyUser);
authRouter.post("/login", authMiddleware, loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);

export default authRouter;
