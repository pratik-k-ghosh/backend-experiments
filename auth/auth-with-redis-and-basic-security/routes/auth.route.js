import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", getUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify", verifyUser);
authRouter.post("/login", loginUser);

export default authRouter;
