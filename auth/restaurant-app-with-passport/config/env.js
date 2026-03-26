import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    db_uri: process.env.DB_URI,
    port: process.env.PORT || 3000,
    log: "bug",
  },
  test: {
    db_uri: process.env.DB_URI,
    port: process.env.PORT || 3000,
    log: "info",
  },
  production: {
    db_uri: process.env.DB_URI,
    port: process.env.PORT || 3000,
    log: "error",
  },
};

const phase = process.env.PHASE || "dev";

export default config[phase];
