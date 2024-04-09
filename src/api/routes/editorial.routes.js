const express = require('express');
const editorialsRouter = express.Router();
const { getEditorials } = require('../controllers/editorial');

editorialsRouter.get('/', getEditorials);

module.exports = editorialsRouter;