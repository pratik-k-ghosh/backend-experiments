import argon2 from "argon2";

export const hashPassword = async (pass) => {
  try {
    return argon2.hash(pass);
  } catch (err) {
    return null;
  }
};

export const verifyPassword = async ({ pass, hashed }) => {
  try {
    return argon2.verify(hashed, pass);
  } catch (err) {
    return false;
  }
};
