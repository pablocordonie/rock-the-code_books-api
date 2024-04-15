const express = require('express');
const usersRouter = express.Router();
const { isAdmin } = require('../../middlewares/auth');
const { getUsers, registerNewUser, login } = require('../controllers/user');

usersRouter.get('/', isAdmin, getUsers);

usersRouter.post('/register', registerNewUser);
usersRouter.post('/login', login);

module.exports = usersRouter;