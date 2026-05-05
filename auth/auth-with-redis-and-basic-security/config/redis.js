import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config(); // Config ENV File

const Redis = createClient({
  url: process.env.redis_uri,
});

const connectToRedis = async () => {
  await Redis.connect()
    .then(() => {
      console.log("Connected to Redis");
    })
    .catch((err) => {
      console.error("Error connecting to Redis", err);
      process.exit(1);
    });
};

export { Redis, connectToRedis };
