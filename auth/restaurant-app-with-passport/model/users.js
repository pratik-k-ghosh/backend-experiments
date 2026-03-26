import mongoose from "mongoose";
import { hashPassword, check } from "../middlewares/encrypt.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Enter Your Username"],
    unique: true,
    min: 5,
  },
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    min: 3,
  },
  address: {
    type: String,
    required: [true, "Please Enter Your Address"],
    min: 7,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    min: 5,
  },
  designation: {
    type: String,
    enum: ["manager", "chef", "server", "customer"],
    default: "customer",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      const hashed = await hashPassword(this.password);
      this.password = hashed;
    } catch (err) {
      next(err);
    }
  }
  next();
});

userSchema.method.comparePassword = async function (pass) {
  try {
    return await check(pass, this.password);
  } catch (err) {
    throw err;
  }
};

const User = new mongoose.model("user", userSchema);

export default User;
