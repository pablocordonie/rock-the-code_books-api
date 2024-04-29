const mainRouter = require('express').Router();

const booksRouter = require('./book.routes');
const editorialsRouter = require('./editorial.routes');
const usersRouter = require('./user.routes');

mainRouter.use('/books', booksRouter);
mainRouter.use('/editorials', editorialsRouter);
mainRouter.use('/users', usersRouter);

module.exports = mainRouter;