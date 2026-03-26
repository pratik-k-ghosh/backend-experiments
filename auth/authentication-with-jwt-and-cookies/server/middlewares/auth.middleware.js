import { verifyToken } from "../utils/token.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = await verifyToken(token);
    req.user = decodedToken;
  } catch (err) {
    req.user = null;
  }
  return next();
};
