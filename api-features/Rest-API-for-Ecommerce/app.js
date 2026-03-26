// impoerting all files and libraries
import express, { urlencoded } from "express";
import envConfig from "./config/env.config.js";
import { db } from "./config/db.config.js";
import productsRoute from "./route/products.route.js";
import userRoute from "./route/users.route.js";

// Creating all constants
const app = express();
const port = envConfig.port || 3000;

// all middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db();
app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);

// listening to the app
app.listen(port, ()=>{console.log(`App is running at Port: ${port}`)});