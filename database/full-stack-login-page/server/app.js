import express from "express";
import path from "path";
import { db } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set(
  express.static(path.join(import.meta.dirname, "..", "client", "public"))
);

db();

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(import.meta.dirname, "..", "client", "index.html"));
});

app.get("/style", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(import.meta.dirname, "..", "client", "public", "style.css")
    );
});

app.get("/home", (req, res) => {
  res.status(200).send("logged in");
});

app.get("/signin", (req, res) => {
  res.status(200).redirect("/");
});

app.get("/signup", (req, res) => {
  res
    .status(200)
    .sendFile(path.join(import.meta.dirname, "..", "client", "signup.html"));
});

export default app;
