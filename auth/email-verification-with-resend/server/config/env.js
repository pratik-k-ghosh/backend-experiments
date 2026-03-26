import dotenv from "dotenv";
dotenv.config();

const config = {
  dev: {
    db: process.env.DB_URI,
    port: process.env.PORT || 3000,
    jwtKey: process.env.JWT_KEY || "abcde12345",
    root: process.env.ROOT_URI || "http://127.0.0.1:3000",
    resendAPI: process.env.RESEND_API_KEY,
    log: "bug",
  },
};

const stage = process.env.STAGE || "dev";

export default config[stage];
