const express = require('express');
const editorialsRouter = express.Router();
const { isAdmin } = require('../../middlewares/auth');
const { getEditorials, getEditorialById } = require('../controllers/editorial');

editorialsRouter.get('/', getEditorials);
editorialsRouter.get('/:id', isAdmin, getEditorialById);

module.exports = editorialsRouter;