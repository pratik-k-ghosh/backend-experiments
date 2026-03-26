import mongoose from "mongoose";
import env from "./env.js";

export const db = () => {
  try {
    mongoose.connect(env.db_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to Database");
  } catch (err) {
    console.log("Couldn't connect to Database");
  }
};
