import z from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, { message: "Name must have atlest 3 charecters" })
  .max(20, { message: "Name can't have more than 20 charecters" });

const userNameSchema = z
  .string()
  .trim()
  .min(5, { message: "User Name must have atlest 5 charecters" })
  .max(15, { message: "User Name can't have more than 15 charecters" });

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Please Enter a valid Email" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must have atleast 8 charecters" })
  .max(15, { message: "Password can't have more than 15 charecters" });

export const loginSchema = z.object({
  userName: userNameSchema,
  password: passwordSchema,
});

export const signupSchema = loginSchema.extend({
  name: nameSchema,
  email: emailSchema,
});
