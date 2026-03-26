import { createUser, getUserByUserName } from "../services/user.service.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";

export const renderSignInPage = (req, res) => {
  try {
    res.status(200).render("sign");
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const renderRegisterPage = (req, res) => {
  try {
    res.status(200).render("register");
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const signin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const [user] = await getUserByUserName(userName);

    if (!user) return res.status(404).send("User Not Found");

    const isVerified = await verifyPassword({
      hashedPassword: user.password,
      password,
    });

    if (!isVerified) return res.status(400).send("Wrong Password");

    const data = {
      id: user.id,
      userName: user.userName,
      name: user.name,
      email: user.email,
    };

    const token = await signToken({ data, time: "1m" });
    res.cookie("access_token", token);
    res.status(200).redirect("/");
  } catch (err) {
    return res.status(404).send("Something went wrong");
  }
};

export const register = async (req, res) => {
  try {
    const { userName, name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const [user] = await createUser({
      userName,
      name,
      email,
      hashedPassword,
    });

    if (!user) return res.status(400).send("Could not create User!");

    return res.status(200).redirect("/sign");
  } catch (err) {
    return res.status(404).send("Something Went Wrong");
  }
};

export const logout = (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(400).send("You need to Log in first to be Loggd out");
    }
    res.clearCookie("access_token");
    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};
