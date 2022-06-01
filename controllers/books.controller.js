const parse = require("nodemon/lib/cli/parse");
const { v4 } = require("uuid");
const model = require("../models/books");

function getAllBooks(req, res) {
  const result = model.getAllBooks();
  res.send(result);
}

function getBookById(req, res) {
  try {
    console.log(req.params.id);
    const books = model.getAllBooks();
    const result = books.filter((book) => book.id === parseInt(req.params.id));
    if (result.length > 0) {
      res.json({ info: "book found", book: result });
    } else {
      res
        .status(404)
        .json({ info: "couldnt find book, make sure id is correct" });
    }
  } catch (err) {
    console.log(`something went wrong in getBookById ${err}`);
  }
}

function addBook(req, res) {
  try {
    const newBook = {
      title: req.body.title || "undefined",
      author: req.body.author || "undefined",
      id: v4(),
    };
    if (!req.body.title) {
      res.status(404).json({ info: "make sure to add a correct title" });
    } else {
      const result = model.addNewBook(newBook);
      console.log(result);
      res.json({ info: "book were succesfully added", book: newBook });
    }
  } catch (err) {
    console.log(`something went wroing in addBook ${err}`);
  }
}

function changeBookFull(req, res) {
  try {
    const books = model.getAllBooks();
    const book = books.filter((book) => book.id === parseInt(req.params.id));
    if (!book[0]) {
      res
        .status(404)
        .json({ info: "couldnt find book, make sure id is correct" });
      return;
    }
    const updatedBooks = books.filter(
      (book) => book.id !== parseInt(req.params.id)
    );
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      id: book[0].id,
    };
    updatedBooks.push(newbook);
    const result = model.updateBooks(updatedBooks);

    console.log(result);
    res.json({ info: "book successfully updated", book: newbook });
  } catch (err) {
    console.log(`something went wrong in changeBookFull, ${err}`);
  }
}

module.exports = { getAllBooks, getBookById, addBook, changeBookFull };
