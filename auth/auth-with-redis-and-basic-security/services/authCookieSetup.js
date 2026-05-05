import jwt from "jsonwebtoken";
import { Redis } from "../config/redis.js";

export const authCookieSetup = async (res, data) => {
  const accessToken = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

  const refreshToken = jwt.sign(
    { email: data.email },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    },
  );

  await Redis.set(`refresh_token:${data.email}`, refreshToken, {
    EX: 15 * 24 * 60 * 60,
  }); // Store refresh token in Redis with a TTL of 15 days

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};
