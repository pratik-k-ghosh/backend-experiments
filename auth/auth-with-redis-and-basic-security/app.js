// import all libraries
import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Config ENV File

// import all modules
import connectToDb from "./config/db.js";
import { connectToRedis } from "./config/redis.js";
import authRouter from "./routes/auth.route.js";

await connectToDb(); // connect to DB
await connectToRedis(); // connect to Redis

const app = express(); // Create app instance

// app middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Home");
});

export default app;
