import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const { id, name } = req.query;
    if (id) {
      const data = await prisma.User.findUnique({ where: { id } });
      return res.status(200).send(data);
    }

    if (name) {
      const data = await prisma.User.findMany({ where: { name } });
      return res.status(200).send(data);
    }

    const data = await prisma.User.findMany();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
};

export const createUser = async (req, res) => {
  try {
    const createdUser = await prisma.User.create({ data: req.body });
    res.status(201).send(createdUser);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.User.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).send(updatedUser);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await prisma.User.delete({
      where: { id: req.params.id },
    });
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
};
