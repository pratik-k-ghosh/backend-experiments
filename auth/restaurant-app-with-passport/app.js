// import all file and folders
import express from "express";
import db from "./config/db.js";
import usersRouter from "./routes/usersRoute.js";
import menuRouter from "./routes/menuRoute.js";
import passport from "./middlewares/auth.js";

// create all constants
const app = express();

// all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();

// routings
app.use("/api/user", usersRouter);
app.use("/api/menu", menuRouter);
app.get("/", (req, res) => {
  res.status(200).send("Home");
});

export default app;
