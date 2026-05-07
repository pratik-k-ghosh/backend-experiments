import { Redis } from "../config/redis.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import TryCatch from "../middlewares/tryCatch.js";

export const refresh = TryCatch(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  const decoadedRefreshToken = jwt.verify(
    refreshToken,
    process.env.JWT_SECRET_KEY,
  );

  const storedSession = await Redis.get(
    `session:${decoadedRefreshToken.sessionId}`,
  );

  if (!storedSession) {
    return { error: "Invalid or expired refresh token" };
  }

  const parsedSession = JSON.parse(storedSession);

  if (parsedSession.refreshToken !== refreshToken) {
    return { error: "Invalid refresh token" };
  }

  const user = await User.findOne({ email: parsedSession.email });

  if (!user) {
    return { error: "User not found" };
  }

  const payload = {
    email: user.email,
    name: user.name,
    userName: user.userName,
  };

  const newAccessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

  res.cookie("access_token", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 30 * 60 * 1000, // 30 minutes
  });

  return payload;
});
