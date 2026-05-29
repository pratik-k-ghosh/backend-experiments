import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  res.send("Hello, Users!");
});

app.get("/user/:id", (req, res) => {
  res.send(`Hello, user with id: ${req.params.id}`);
});

app.post("/user", (req, res) => {
  res.send("User Created");
});

export default app;
