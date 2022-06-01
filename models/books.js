const allBooks = [
  { name: "bok1", id: 1 },
  { name: "bok2", id: 2 },
];

function getAllBooks() {
  return allBooks;
}

function addNewBook(newBook) {
  allBooks.push(newBook);
  return allBooks;
}

module.exports = {
  getAllBooks,
  addNewBook,
};
