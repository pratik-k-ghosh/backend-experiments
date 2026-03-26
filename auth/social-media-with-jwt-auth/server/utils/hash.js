import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    return bcrypt.hash(password, 10);
  } catch (err) {
    return null;
  }
};

export const verifyPassword = async ({ password, hashedPassword }) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (err) {
    return false;
  }
};
