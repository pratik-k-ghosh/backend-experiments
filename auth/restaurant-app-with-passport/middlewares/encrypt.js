import bcrypt from "bcrypt";

export const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(pass, salt);
  return hashed;
};

export const check = async (pass, realPass) => {
  return await bcrypt.compare(pass, realPass);
};
