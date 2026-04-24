import mongoose from "mongoose";
import * as argon2 from "argon2";
import { boolean } from "zod";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;

    return;
  } catch (error) {
    throw new Error("Error hashing password");
  }
});

userSchema.methods.verifyPassword = async function (password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (error) {
    return false;
  }
};

const User = new mongoose.model("User", userSchema);

export default User;
