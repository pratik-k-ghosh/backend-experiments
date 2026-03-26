import {
  ACCESS_TOKEN_EXPIRY,
  MILI_PER_SEC,
  REFRESH_TOKEN_EXPIRY,
} from "../config/const.js";
import { signJwtToken } from "./token.js";

export const setUpAuthCookies = async (
  res,
  { name, userName, email, isVerified, sessionId }
) => {
  try {
    const accessToken = await signJwtToken(
      {
        name,
        userName,
        email,
        isVerified,
        sessionId,
      },
      ACCESS_TOKEN_EXPIRY / MILI_PER_SEC
    );

    const refreshToken = await signJwtToken(
      { sessionId },
      REFRESH_TOKEN_EXPIRY / MILI_PER_SEC
    );

    const preConfig = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("access_token", accessToken, {
      ...preConfig,
      maxAge: ACCESS_TOKEN_EXPIRY,
    });

    res.cookie("refresh_token", refreshToken, {
      ...preConfig,
      maxAge: REFRESH_TOKEN_EXPIRY,
    });

    return accessToken;
  } catch (err) {
    return res.status(400).send("Error in Auth Cookies");
  }
};
