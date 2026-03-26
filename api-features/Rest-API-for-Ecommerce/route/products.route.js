import express from "express";
import { getProducts, launchProducts, updateProducts, removeProducts } from "../controller/products.controller.js";

const productsRoute = express.Router();

productsRoute.get("/", getProducts);
productsRoute.post("/", launchProducts);
productsRoute.put("/:name", updateProducts);
productsRoute.delete("/:name", removeProducts);

export default productsRoute;