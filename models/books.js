let allBooks = [];

function getAllBooks() {
  return allBooks;
}

function addNewBook(newBook) {
  allBooks.push(newBook);
  return allBooks;
}

function updateBooks(books) {
  allBooks = books;
  return allBooks;
}

module.exports = {
  getAllBooks,
  addNewBook,
  updateBooks,
};
