import {
  changeVerifyStatusByUserId,
  createNewSession,
  createNewUser,
  deleteCodeDataById,
  deleteSessionDataBySessionId,
  getCodeDataByCodeAndUserId,
  getSessionDataBySessionId,
  getUserDataByEmail,
  getUserDataByUserName,
  insertVerifyEmailTokenData,
} from "../services/auth.services.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { loginSchema, signupSchema } from "../validators/auth.validation.js";
import { setUpAuthCookies } from "../utils/auth.cookies.js";
import { genRandomVerifyEmailToken } from "../utils/token.generator.js";
import { genVerifyEmailUri } from "../utils/link.generator.js";
import { sendMail } from "../libs/resend.js";
import { convertMjmlToHtml } from "../utils/convert-mjml-to-html.js";

export const getSignUpPage = (req, res) => {
  if (req.user) return res.redirect("/");
  try {
    return res.status(200).render("signup", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getLogInPage = (req, res) => {
  if (req.user) return res.redirect("/");
  try {
    return res.status(200).render("login", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const getVerifyEmailPage = (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    return res
      .status(200)
      .render("verifyEmail", { errors: req.flash("errors") });
  } catch (err) {
    return res.status(404).send("Page Not Found");
  }
};

export const signup = async (req, res) => {
  if (req.user) return res.redirect("/");
  try {
    const { data, error } = signupSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/signup");
    }

    const { name, userName, email, password } = data;

    const hashedPassword = await hashPassword(password);

    const newUser = await createNewUser({
      name,
      userName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      req.flash("errors", "Couldn't create User");
      return res.redirect("/signup");
    }

    return res.redirect("/login");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};

export const login = async (req, res) => {
  if (req.user) return res.redirect("/");
  try {
    const { data, error } = loginSchema.safeParse(req.body);

    if (error) {
      req.flash("errors", error.errors[0].message);
      return res.redirect("/login");
    }

    const { userName, password } = data;

    const userData = await getUserDataByUserName(userName);

    if (!userData) {
      req.flash("errors", "Invalid user or Password");
      return res.redirect("/login");
    }

    const checkPassword = await verifyPassword({
      pass: password,
      hashed: userData.password,
    });

    if (!checkPassword) {
      req.flash("errors", "Invalid user or Password");
      return res.redirect("/login");
    }

    const session = await createNewSession({
      userId: userData.id,
      userAgent: req.headers["user-agent"],
      userIp: req.clientIp,
    });

    await setUpAuthCookies(res, {
      name: userData.name,
      userName: userData.userName,
      email: userData.email,
      isVerified: userData.isVerified,
      sessionId: session.id,
    });

    return res.redirect("/");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};

export const logout = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const userData = await getUserDataByUserName(req.user.userName);

    if (!userData) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.redirect("/login");
    }

    const sessionData = await getSessionDataBySessionId(req.user.sessionId);

    if (!sessionData || !sessionData.valid) {
      res.clearCookie("access_token");
      res.clearCookie("refresh_token");
      return res.redirect("/login");
    }

    await deleteSessionDataBySessionId(req.user.sessionId);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};

export const getVerifyEmailToken = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const verifyEmailToken = genRandomVerifyEmailToken();

    const userData = await getUserDataByUserName(req.user.userName);

    const insertedToken = await insertVerifyEmailTokenData({
      code: verifyEmailToken,
      userId: userData.id,
    });

    if (!insertedToken) {
      req.flash("errors", "Data could not be inserted");
      return res.status(400).redirect("/verify/email");
    }

    const uri = genVerifyEmailUri(verifyEmailToken, userData.email);

    const html = await convertMjmlToHtml("verify-email", {
      code: verifyEmailToken,
      verifyUri: uri,
    });

    await sendMail({
      to: userData.email,
      subject: "Verify Your Email",
      html,
    }).catch((err) => console.error("Send Mail Error", err));

    return res.redirect("/verify/email");
  } catch (err) {
    req.flash("errors", "Something went wrong");
    return res.status(400).redirect("/verify/email");
  }
};

export const verifyEmail = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const { code, email } = req.query;

    const userData = await getUserDataByEmail(email);
    if (!userData) {
      await deleteCodeDataById(codeData.id);
      return res.redirect("/login");
    }

    const codeData = await getCodeDataByCodeAndUserId(code, userData.id);

    if (!codeData || !codeData.valid) {
      await deleteCodeDataById(codeData.id);
      return res.redirect("/verify/email");
    }

    await changeVerifyStatusByUserId(codeData.userId, codeData.id);

    const updatedUserData = await getUserDataByEmail(userData.email);
    await setUpAuthCookies(res, {
      ...updatedUserData,
      sessionId: req.user.sessionId,
    });
    return res.redirect("/");
  } catch (err) {
    return res.status(400).send("Something went wrong");
  }
};
