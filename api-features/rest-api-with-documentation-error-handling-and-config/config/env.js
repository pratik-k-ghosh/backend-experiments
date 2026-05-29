import dotenv from "dotenv";

dotenv.config();

if (!process.env.DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}

const config = {
  dev: {
    port: process.env.PORT || 3000,
    db_uri: process.env.DB_URI,
  },
  test: {
    port: process.env.PORT || 3000,
    db_uri: process.env.DB_URI,
  },
  production: {
    port: process.env.PORT || 3000,
    db_uri: process.env.DB_URI,
  },
};

const state = process.env.NODE_ENV || "dev";
export default config[state];
