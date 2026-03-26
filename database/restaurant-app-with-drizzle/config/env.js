import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    log: "bug",
  },
  test: {
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    log: "info",
  },
  production: {
    port: process.env.PORT || 3000,
    db: process.env.DATABASE_URL,
    log: "error",
  },
};

const stage = process.env.STAGE || "dev";
export default config[stage];
