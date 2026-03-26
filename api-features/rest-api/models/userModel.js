import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        required: [true, "Please Enter Your Name"]
    },
    address: {
        type: String,
        min: 6,
        required: [true, "Please Enter Your Address"]
    },
    membership: {
        type: Boolean,
        default: false
    },
    pass: {
        type: String,
        required: [true, "Please Enter Your Password"]
    }
})

const User = new mongoose.model('user', userSchema);
export default User;