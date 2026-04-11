import express from "express";
import dotenv from "dotenv";
import { sendEmail } from "./email.service.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sendmail", async (req, res) => {
  const { to } = req.body;
  await sendEmail({
    to,
    subject: "Testing mail service",
    text: "Hello World",
    html: "<h1>Hello This is a test</h1><p>Hello World</p>",
  });
  res.status(200).send("Email sent!");
});

export default app;
