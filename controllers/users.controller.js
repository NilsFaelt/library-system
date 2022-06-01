const { v4 } = require("uuid");
const model = require("../models/users");

function addUser(req, res) {
  const user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    id: v4(),
  };
  const result = model.addUser(user);
  res.json(result);
}

function logingUser(req, res) {
  let authorized = false;
  const users = model.getAll();
  const username = users.filter((user) => user.username === req.body.username);
  const password = users.filter((user) => user.password === req.body.password);
  console.log(password);
  if (password.length > 0 && username.length > 0) {
    authorized = true;
  }
  console.log(authorized);
  if (authorized) {
    res.json({ jwtToken: "1234dsjsdkjc44" });
  } else {
    res.status(404).json({ info: "invalid username or password" });
    return;
  }
}

module.exports = { addUser, logingUser };
