import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 3,
      required: true,
    },
    email: {
      type: String,
      min: 6,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      min: 5,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 5,
      max: 10,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = new mongoose.model("user", userSchema);
export default User;
