const { v4 } = require("uuid");
const model = require("../models/users");
const bookModel = require("../models/books");
const jwt = require("jsonwebtoken");

function addUser(req, res) {
  const user = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    id: v4(),
    borrowedBooks: [],
  };
  const result = model.addUser(user);
  res.json(result);
}

function logingUser(req, res) {
  let authorized = false;
  const users = model.getAll();
  const user = users.filter((user) => user.username === req.body.username);
  const password = users.filter((user) => user.password === req.body.password);
  console.log(password);
  if (password.length > 0 && user.length > 0) {
    authorized = true;
  }

  if (authorized) {
    const token = jwt.sign({ user }, "secret_key");
    res.json({ jwtToken: token });
  } else {
    res.status(404).json({ info: "invalid username or password" });
    return;
  }
}

function lendBook(req, res) {
  const users = model.getAll();
  const books = bookModel.getAllBooks();
  const book = books.filter((book) => book.id === req.body.bookId);
  const updatedBooks = books.filter((book) => book.id !== req.body.bookId);
  const user = users.filter((user) => user.id === req.body.userId);
  user[0].borrowedBooks.push(book);
  bookModel.updateBooks(updatedBooks);
  res.json({ user });
}

module.exports = { addUser, logingUser, lendBook };
