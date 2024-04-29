const express = require('express');
const booksRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getBooks, getBookById, postBook, updateBook, deleteBook } = require('../controllers/book');

booksRouter.get('/', getBooks);
booksRouter.get('/:id', isAdmin, getBookById);

booksRouter.post('/', isAuth, postBook);

booksRouter.put('/:id', isAdmin, updateBook);

booksRouter.delete('/:id', isAdmin, deleteBook);

module.exports = booksRouter;