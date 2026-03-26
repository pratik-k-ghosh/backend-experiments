import express from "express";
import {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/", getProduct);
productRouter.post("/", addProduct);
productRouter.put("/:name", updateProduct);
productRouter.delete("/:name", deleteProduct);

export default productRouter;
