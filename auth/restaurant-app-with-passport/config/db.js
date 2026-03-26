import mongoose from "mongoose";
import config from "./env.js";

const uri = config.db_uri;

const db = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(() => {
      console.log("Couldn't connect to Database");
    });
};

export default db;
