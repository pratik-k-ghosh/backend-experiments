import express from "express";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("Home");
});

export default app;
