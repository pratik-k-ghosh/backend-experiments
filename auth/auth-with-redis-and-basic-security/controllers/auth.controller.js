import TryCatch from "../middlewares/tryCatch.js";
import sanitize from "mongo-sanitize";
import { userSechema } from "../validation/zod.js";

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

  res.send(data);
});
