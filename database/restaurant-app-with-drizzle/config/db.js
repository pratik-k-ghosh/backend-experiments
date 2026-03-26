import config from "./env.js";
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(config.db);

export default db;
