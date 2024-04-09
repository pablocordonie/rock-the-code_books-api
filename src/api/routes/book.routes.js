const express = require('express');
const booksRouter = express.Router();
const { getBooks, postBook, updateBook, deleteBook } = require('../controllers/book');

booksRouter.get('/', getBooks);
booksRouter.post('/', postBook);
booksRouter.put('/:id', updateBook);
booksRouter.delete('/:id', deleteBook);

module.exports = booksRouter;