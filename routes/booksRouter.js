const express = require("express");
const router = express.Router();
const booksController = require("../controllers/books.controller");

router.get("/", booksController.getAllBooks);
router.get("/:id", booksController.getBookById);
router.post("/", booksController.addBook);
router.put("/:id", booksController.changeBookFull);
router.patch("/:id", booksController.changeBookPartial);
router.delete("/:id", booksController.deleteBook);

module.exports = { router };
