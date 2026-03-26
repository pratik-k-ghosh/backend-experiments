import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    "name": {
        "type": String,
        "required": [true, "Enter The Product Name"]
    },
    "price": {
        "type": Number,
        "required": [true, "Enter The Product Price"]
    },
    "desc": {
        "type": String,
        "required": [true, "Enter The Product Description"]
    },
    "available": {
        "type": Boolean,
        "default": true
    },
    "launch": {
        "type": Date,
        "default": Date.now()
    }
})

const Product = new mongoose.model('product', productSchema);
export default Product;