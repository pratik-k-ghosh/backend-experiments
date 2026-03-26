import { createUser, findUserbyUserName } from "../services/user.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";

export const getSignupPage = (req, res) => {
  try {
    if (req.user) return res.status(200).redirect("/");
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const getLoginPage = (req, res) => {
  try {
    if (req.user) return res.status(200).redirect("/");
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page not Found");
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, userName, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
      name,
      email,
      userName,
      password: hashedPassword,
    });

    if (!newUser) {
      req.flash("errors", "Couldn't create user");
      return res.redirect("/signup");
    }

    return res.status(201).redirect("/login");
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const userData = await findUserbyUserName(userName);

    if (!userData) {
      req.flash("errors", "Wrong User Name or Password");
      return res.redirect("/login");
    }

    const isVerified = await verifyPassword({
      password,
      hashedPassword: userData.password,
    });

    if (!isVerified) {
      req.flash("errors", "Wrong User Name or Password");
      return res.redirect("/login");
    }

    const data = {
      name: userData.name,
      email: userData.email,
      userName: userData.userName,
    };

    const token = await signToken(data);
    res.cookie("access_token", token);
    return res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).send("Something went Wrong");
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).redirect("/login");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};
