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
    console.log(process.env.ACCES_TOKEN_SECRET, "TOOOOOOOOKEEEEEEEEN");
    const token = jwt.sign({ user }, process.env.ACCES_TOKEN_SECRET);
    res.json({ jwtToken: token });
  } else {
    res.status(404).json({ info: "invalid username or password" });
    return;
  }
}

function lendBook(req, res) {
  try {
    const users = model.getAll();
    const books = bookModel.getAllBooks();
    const book = books.filter((book) => book.id === req.body.bookId);
    const updatedBooks = books.filter((book) => book.id !== req.body.bookId);
    const user = users.filter((user) => user.id === req.body.userId);
    console.log(users);
    console.log(books);
    console.log(user);
    console.log(book);

    if (user.length > 0 && book.length > 0) {
      user[0].borrowedBooks.push(book[0]);
      bookModel.updateBooks(updatedBooks);
      res.json({ info: "book lended, please return in time", user: user });
    } else {
      res.status(404).json({
        info: "coudlnt find user or book, make sure the book and user exists, and that the book is in stock",
      });
    }
  } catch (err) {
    console.log(`something went wrong in lendBook, ${err}`);
  }
}

function returnBook(req, res) {
  try {
    const books = bookModel.getAllBooks();
    const users = model.getAll();
    const updatedUsers = users.filter((user) => user.id !== req.body.userId);
    let user = users.filter((user) => user.id === req.body.userId);
    const bookToReurn = user[0].borrowedBooks.filter(
      (book) => book.id === req.body.bookId
    );
    const usersLendedBooks = user[0].borrowedBooks.filter(
      (book) => book.id !== req.body.bookId
    );
    console.log(usersLendedBooks, "usersLendedBooks");
    console.log(bookToReurn, "bookToReurn");
    console.log(user, "user");
    if (user.length > 0 && bookToReurn.length > 0) {
      user[0].borrowedBooks = usersLendedBooks;
      books.push(bookToReurn[0]);
      bookModel.updateBooks(books);
      updatedUsers.push(user);
      model.updateAllUsers(updatedUsers);
      res.json({
        info: "book succesfully returned",
        returnedBook: bookToReurn[0],
      });
    } else {
      res
        .status(404)
        .json({ info: "couldnt find user or book, mske sure id is correct" });
    }
    return;
  } catch (err) {
    console.log(`something went wrong in return book ${err}`);
  }
}

module.exports = { addUser, logingUser, lendBook, returnBook };
