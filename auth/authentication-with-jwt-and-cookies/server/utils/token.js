import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signToken = async ({ data, time }) => {
  try {
    return await jwt.sign(data, env.tokenKey, { expiresIn: time });
  } catch (err) {
    return null;
  }
};

export const verifyToken = async (token) => {
  try {
    return await jwt.verify(token, env.tokenKey);
  } catch (err) {
    return false;
  }
};
