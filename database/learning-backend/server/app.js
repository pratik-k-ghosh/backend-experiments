const db = require("./config/database");
const envConfig = require("./config/environment");
const express = require("express");
const app = express();
const PORT = envConfig.port || 3000;
const userRouter = require("./routes/user");

app.use(express.json());
app.use(express.static("./client/public"));
app.use(express.urlencoded({ extended: true }));

db();
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server Running at Port:${PORT}`);
});
