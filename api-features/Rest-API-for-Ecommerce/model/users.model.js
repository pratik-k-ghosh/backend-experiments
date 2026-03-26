import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "name": {
        "type": String,
        "required": [true, "Enter Your name"]
    },
    "address": {
        "type": String,
        "required": [true, "Enter Your address"]
    },
    "contact": {
        "type": Number,
        "required": [true, "Enter Your contact number"]
    },
    "pass": {
        "type": String,
        "required": [true, "Enter Your password"]
    }
})

const User = new mongoose.model('user', userSchema);
export default User;