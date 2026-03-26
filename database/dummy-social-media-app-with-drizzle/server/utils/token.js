import jwt from "jsonwebtoken";
import env from "../config/env.js";

export const signJwtToken = async (data, time) => {
  try {
    return jwt.sign(data, env.jwtKey, { expiresIn: time });
  } catch (err) {
    return null;
  }
};

export const verifyJwtToken = async (data) => {
  try {
    return jwt.verify(data, env.jwtKey);
  } catch (err) {
    return null;
  }
};
