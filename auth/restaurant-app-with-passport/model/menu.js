import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Dish name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter Your Food Description"],
    min: 10,
  },
  category: {
    type: String,
    enum: ["veg", "non-veg"],
    required: [true, "Please Enter The Dish Category"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Your Dish Price"],
  },
});

const Menu = new mongoose.model("menu", menuSchema);

export default Menu;
