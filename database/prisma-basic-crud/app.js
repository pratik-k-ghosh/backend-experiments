import express from "express";
import userRouter from "./routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({ page: "Home" });
});

export default app;
