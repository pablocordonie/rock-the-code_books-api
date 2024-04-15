const express = require('express');
const booksRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getBooks, postBook, updateBook, deleteBook } = require('../controllers/book');

booksRouter.get('/', getBooks);
booksRouter.post('/', isAuth, postBook);
booksRouter.put('/:id', isAdmin, updateBook);
booksRouter.delete('/:id', isAdmin, deleteBook);

module.exports = booksRouter;