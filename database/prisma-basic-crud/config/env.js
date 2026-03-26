import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    port: process.env.PORT || 3000,
    log: "bug",
  },
  test: {
    port: process.env.PORT || 3000,
    log: "info",
  },
  production: {
    port: process.env.PORT || 3000,
    log: "error",
  },
};

const stage = process.env.STAGE || "dev";

export default config[stage];
