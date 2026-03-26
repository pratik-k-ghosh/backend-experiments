import User from "../models/user.js";

export const createUser = async ({ name, email, userName, password }) => {
  try {
    const newUser = new User({ name, email, userName, password });
    await newUser.save();
    return newUser;
  } catch (err) {
    return null;
  }
};

export const findUserbyUserName = async (userName) => {
  try {
    const [userData] = await User.find({ userName });
    return userData;
  } catch (err) {
    return null;
  }
};
