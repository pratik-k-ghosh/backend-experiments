import express from "express";
import { getUsers, createUsers, updateUsers, deleteUsers } from "../controller/users.controller.js";
const userRoute = express.Router();

userRoute.get('/', getUsers);
userRoute.post('/', createUsers);
userRoute.put('/:name', updateUsers);
userRoute.delete('/:name', deleteUsers);

export default userRoute;