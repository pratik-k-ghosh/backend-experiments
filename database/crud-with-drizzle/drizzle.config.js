import config from "./config/env.js";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle/out",
  schema: "./drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: config.db_uri,
  },
});
