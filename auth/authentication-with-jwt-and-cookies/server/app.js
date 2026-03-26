// importing all modules and files
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

// creating app
const app = express();

// creating all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

app.use(authMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// creating all routes
app.use(authRouter);

app.get("/", (req, res) => {
  res.status(200).render("index");
});

// exporting app
export default app;
