import TryCatch from "../middlewares/tryCatch.js";
import sanitize from "mongo-sanitize";
import { userSechema } from "../validator/zod.validator.js";
import User from "../models/user.model.js";
import { sendEmail } from "../services/email.service.js";
import { Redis } from "../config/redis.js";
import * as argon2 from "argon2";

export const getUser = TryCatch(async (req, res) => {
  res.send("success");
});

export const registerUser = TryCatch(async (req, res) => {
  const reqData = sanitize(req.body);
  const { data, error } = userSechema.safeParse(reqData);

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

  res
    .status(200)
    .send("OTP sent Successfully, Verify within 5 minutes or register again");
});
