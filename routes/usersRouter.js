const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

router.post("/lend", (req, res) => {
  res.send("ledning");
});

router.post("/return", (req, res) => {
  res.send("returining");
});

module.exports = { router };
