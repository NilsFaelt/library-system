const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/lend", usersController.lendBook);

router.post("/return", (req, res) => {
  res.send("returining");
});

module.exports = { router };
