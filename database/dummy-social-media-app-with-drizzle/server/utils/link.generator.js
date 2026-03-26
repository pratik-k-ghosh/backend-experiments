import env from "../config/env.js";

export const genVerifyEmailUri = (code, email) => {
  try {
    const uri = new URL(`${env.root}/verify-email-token/`);
    uri.searchParams.append("code", code);
    uri.searchParams.append("email", email);
    return uri.toString();
  } catch (err) {
    return null;
  }
};
