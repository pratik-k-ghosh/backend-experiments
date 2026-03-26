import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    min: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
});

const User = new mongoose.model("user", userSchema);

export default User;
