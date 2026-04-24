import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.db_uri);
    console.log("DB Connected");
  } catch {
    console.error("DB Connect Error");
  }
};

export default connectDb;
