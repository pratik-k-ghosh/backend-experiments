import express from "express";
import path from "path";
import userRouter from "./routes/userRoute.js";
import dishRouter from "./routes/dishRoute.js";
import { getDish } from "./controller/dishController.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(import.meta.dirname, "client", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(import.meta.dirname, "client", "views"));

app.use("/api/user", userRouter);
app.use("/api/dish", dishRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(import.meta.dirname, "client", "src", "user", "index.html")
    );
});

app.get("/signup", (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(import.meta.dirname, "client", "src", "user", "signup.html")
    );
});

app.get("/menu", async (req, res) => {
  const dishData = await getDish(req, res);
  res.status(200).render("index", { dishData });
});

app.get("/add", async (req, res) => {
  res
    .status(200)
    .sendFile(
      path.join(import.meta.dirname, "client", "src", "dish", "index.html")
    );
});

export default app;
