import jwt from "jsonwebtoken";
import { refresh } from "../utils/refresh.js";
import TryCatch from "./tryCatch.js";

export const authMiddleware = TryCatch(async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      console.log({ error: "Missing Refresh Token" });
      req.user = null;
      return next();
    }

    const payload = await refresh(req, res);

    if (payload.error) {
      console.log({ error: payload.error });
      req.user = null;
      return next();
    }

    req.user = payload;
    return next();
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  req.user = decoded;
  next();
});
