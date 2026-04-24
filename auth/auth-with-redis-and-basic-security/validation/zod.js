import z from "zod";

export const userSechema = new z.object({
  userName: z.string().trim().toLowerCase(),
  name: z
    .string()
    .trim()
    .min(5, { message: "Name must be atleast 5 characters long" }),
  email: z.string().trim().email("Enter a Valid email"),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" })
    .max(15, { message: "Password can be up to 15 characters long" }),
});
