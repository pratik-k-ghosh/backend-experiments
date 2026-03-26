const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 5,
    max: 8,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 6,
    max: 10,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
