import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.save();
    return res.status(201).redirect("/");
  } catch (err) {
    return res.status(400).send("Something Went Wrong");
  }
};

export const checkUser = async (req, res) => {
  const { userid } = req.query;
  const [userData] = await User.find({ userid });

  try {
    if (userData.password == req.query.password) {
      return res.status(200).redirect("/home");
    } else {
      return res.status(400).send({ Password: "Wrong" });
    }
  } catch (err) {
    console.log(userData);
    return res.status(400).send("Something Went Wrong");
  }
};
