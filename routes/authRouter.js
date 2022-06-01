const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.post("/register", userController.addUser);
router.post("/login", userController.logingUser);

module.exports = { router };
