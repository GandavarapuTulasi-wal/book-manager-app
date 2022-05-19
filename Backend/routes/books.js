const express = require('express');
const booksController = require('../controllers/books');
const router = express.Router();
router.get('/', booksController.getBooks);
router.post('/', booksController.addBook);
router.put('/:id', booksController.editBook);
router.delete('/:id', booksController.deleteBook);
router.get('/:id', booksController.bookById);

module.exports = router;
