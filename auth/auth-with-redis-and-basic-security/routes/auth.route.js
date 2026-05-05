import express from "express";
import {
  getUser,
  registerUser,
  verifyUser,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/", getUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify", verifyUser);

export default authRouter;
