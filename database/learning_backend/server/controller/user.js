const User = require("../model/user");

const createUser = async (req, res) => {
  try {
    const myUser = new User({
      username: req.body.name,
      password: req.body.pass,
    });
    await myUser.save();
    res.status(200).json(req.body);
  } catch (err) {
    console.error("User Creation Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userName } = req.params;
    const userPass = req.body.pass;

    const userExist = await User.findOne({ username: userName });
    if (!userExist) {
      res.status(500).send("User Does't Exist!");
    }

    const pass = userExist.password;
    if (userPass != pass) {
      res.status(400).send("Wrong Password");
    }

    await User.deleteOne({ username: userName })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch {
    res.status(500).send("Something is wrong!");
  }
};

module.exports = { createUser, deleteUser };
