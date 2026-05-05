import TryCatch from "../middlewares/tryCatch.js";
import sanitize from "mongo-sanitize";
import {
  loginSchema,
  userSchema,
  verifyuserSchema,
} from "../validator/zod.validator.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import { Redis } from "../config/redis.js";
import * as argon2 from "argon2";
import { authCookieSetup } from "../utils/authCookieSetup.js";

export const getUser = TryCatch(async (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  res.status(200).json({ user: req.user });
});

export const registerUser = TryCatch(async (req, res) => {
  const reqData = sanitize(req.body);
  const { data, error } = userSchema.safeParse(reqData);

  if (error) {
    res.status(400).send(error.issues[0].message);
  }

  const { name, userName, email, password } = data;
  const hashedPassword = await argon2.hash(password);

  const registerRateLimitString = `rl:register:${email}`;
  const registerRateLimit = await Redis.get(registerRateLimitString);

  if (registerRateLimit) {
    return res
      .status(429)
      .send("Too many registration attempts, please try again later");
  }

  const doesUserExist = await User.findOne({ $or: [{ email }, { userName }] });

  if (doesUserExist) {
    return res.status(400).send("User already exists");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await argon2.hash(otp);

  Redis.set(`otp:register:${email}`, hashedOtp, { EX: 5 * 60 }); // Store OTP in Redis with a TTL of 5 minutes
  Redis.set(
    `data:register:${email}`,
    JSON.stringify({ userName, name, email, password: hashedPassword }),
    { EX: 5 * 60 },
  ); // Store registration data in Redis with a TTL of 5 minutes

  await sendEmail({
    to: email,
    subject: "Register User",
    text: "This is your OTP for registration",
    html: `<p>Your OTP for registration is: ${otp}</p>`,
  });

  Redis.set(registerRateLimitString, "1", { EX: 60 }); // Set rate limit for registration attempts (1 minute)
  res.cookie("user_email", email, { maxAge: 5 * 60 * 1000, httpOnly: true }); // store email in cookie for 5 minutes

  res
    .status(200)
    .send("OTP sent Successfully, Verify within 5 minutes or register again");
});

export const verifyUser = TryCatch(async (req, res) => {
  const reqData = sanitize(req.body);
  const { data, error } = verifyuserSchema.safeParse(reqData);

  if (error) {
    return res.status(400).send(error.issues[0].message);
  }

  const { otp } = data;
  const user_email = req.cookies.user_email;

  const storedHashedOtp = await Redis.get(`otp:register:${user_email}`);

  if (!storedHashedOtp) {
    return res
      .status(400)
      .send("OTP expired or invalid, please register again");
  }

  const isOtpValid = await argon2.verify(storedHashedOtp, otp);

  if (!isOtpValid) {
    return res.status(400).send("Invalid OTP, please try again");
  }

  const userData = await Redis.get(`data:register:${user_email}`);

  if (!userData) {
    return res
      .status(400)
      .send("Registration data expired or invalid, please register again");
  }

  const { userName, name, email, password } = JSON.parse(userData);

  const newUser = new User({
    userName,
    name,
    email,
    password,
  });

  await newUser.save();

  await Redis.del(`otp:register:${user_email}`);
  await Redis.del(`data:register:${user_email}`);
  res.clearCookie("user_email");

  res.status(201).send("User registered successfully");
});

export const loginUser = TryCatch(async (req, res) => {
  const reqData = sanitize(req.body);
  const { data, error } = loginSchema.safeParse(reqData);

  if (error) {
    return res.status(400).send(error.issues[0].message);
  }

  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    return res.status(400).send("Invalid email or password");
  }

  await authCookieSetup(
    res,
    {
      email: user.email,
      name: user.name,
      userName: user.userName,
    },
    {
      clientIp: req.ip,
      userAgent: req.get("User-Agent"),
    },
  );

  res.status(200).send("Login successful");
});
