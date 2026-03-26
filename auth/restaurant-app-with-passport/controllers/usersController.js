import User from "../model/users.js";

export const getUsers = async (req, res) => {
  try {
    const usersData = await User.find(req.query);
    if (usersData.length == 0) {
      res.status(404).send("No Users to Show");
    }
    res.status(200).send(usersData);
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send("Couldn't Create User");
  }
};

export const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const updatedUser = await User.updateOne({ username: username }, req.body);
    if (updatedUser.modifiedCount == 0) {
      res.status(404).send("No User to Update");
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const deletedUser = await User.deleteOne({ username: username });
    if (deletedUser.deletedCount == 0) {
      res.status(404).send("User Doesn't Exist");
    }
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
};
