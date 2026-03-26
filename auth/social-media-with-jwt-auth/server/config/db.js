import mongoose from "mongoose";
import env from "./env.js";

const db = async () => {
  try {
    await mongoose.connect(env.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the Database");
  } catch (err) {
    console.log("Couldn't connect to the Database");
    process.exit(1);
  }
};

export default db;
