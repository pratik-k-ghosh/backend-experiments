import Menu from "../model/menu.js";

export const getMenu = async (req, res) => {
  try {
    const { name, category, price, sort } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (price) {
      query.price = { $lte: price };
    }

    let prompt = Menu.find(query);

    if (sort) {
      prompt = prompt.sort(sort);
    }

    const fullMenu = await prompt;

    if (fullMenu.length == 0) {
      res.status(404).send("No Dishes to Show");
    }

    res.status(200).send(fullMenu);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

export const addDish = async (req, res) => {
  try {
    const newDish = new Menu(req.body);
    await newDish.save();
    res.status(201).send(newDish);
  } catch (err) {
    res.status(500).send("Couldn't Add Dish");
  }
};

export const updateDish = async (req, res) => {
  try {
    const name = req.params.name;
    const updatedDish = await Menu.updateOne({ name: name }, req.body, {
      new: true,
    });
    if (updateDish.modifiedCount == 0) {
      res.status(404).send("No Dish to Update");
    }
    res.status(200).send(updatedDish);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

export const removeDish = async (req, res) => {
  try {
    const name = req.params.name;
    const removedDish = await Menu.deleteOne({ name: name });

    if (removedDish.deletedCount == 0) {
      res.status(404).send("No Dish to Remove");
    }
    res.status(200).send(removedDish);
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};
