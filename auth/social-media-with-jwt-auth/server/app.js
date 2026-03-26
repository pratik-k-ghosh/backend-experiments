// importing all modules and files
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import authRouter from "./routes/auth.router.js";
import db from "./config/db.js";
import authMiddleware from "./middlewares/auth.middleware.js";

// creating app
const app = express();

// setting all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "..", "client", "views"));
app.use(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

// connecting to the Database
db();

// creating all middlewares
app.use(
  session({ secret: "My-secret", resave: true, saveUninitialized: false })
);
app.use(flash());
app.use(authMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

// creating all Routes
app.use("/", authRouter);

app.get("/", (req, res) => {
  if (!req.user) return res.status(200).render("index");
  const { userName, name, email } = req.user;
  return res.status(200).render("home", { userName, name, email });
});

// exporting app
export default app;
