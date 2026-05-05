import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.db_uri);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to DB", err);
    process.exit(1);
  }
};

export default connectToDb;
