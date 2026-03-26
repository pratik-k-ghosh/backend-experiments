import { getUserDataBySessionId } from "../services/auth.services.js";
import { setUpAuthCookies } from "../utils/auth.cookies.js";
import { verifyJwtToken } from "../utils/token.js";

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (accessToken) {
      const decodedAccessToken = await verifyJwtToken(accessToken);
      req.user = decodedAccessToken;
      return next();
    }

    if (refreshToken) {
      const decodedRefreshToken = await verifyJwtToken(refreshToken);

      const userDataWithSessionId = await getUserDataBySessionId(
        decodedRefreshToken.sessionId
      );

      const newAccessToken = await setUpAuthCookies(res, {
        name: userDataWithSessionId.name,
        userName: userDataWithSessionId.userName,
        email: userDataWithSessionId.email,
        isVerified: userDataWithSessionId.isVerified,
        sessionId: userDataWithSessionId.sessionId,
      });

      req.user = newAccessToken;
      return next();
    }

    req.user = null;
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
};

export default authMiddleware;
