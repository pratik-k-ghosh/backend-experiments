const express = require("express");
const router = express.Router();
const { createUser, deleteUser } = require("../controller/user");

router.post("/", createUser);
router.delete("/delete/:userName/", deleteUser);

module.exports = router;
