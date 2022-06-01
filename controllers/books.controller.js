const model = require("../models/books");

function getAllBooks(req, res) {
  const result = model.getAllBooks();
  res.send(result);
}

module.exports = { getAllBooks };
