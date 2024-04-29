const express = require('express');
const usersRouter = express.Router();
const { isAuth, isAdmin } = require('../../middlewares/auth');
const { getUsers, getUserById, registerNewUser, login, updateUser, deleteUser } = require('../controllers/user');

usersRouter.get('/', isAdmin, getUsers);
usersRouter.get('/:id', isAdmin, getUserById);

usersRouter.post('/register', registerNewUser);
usersRouter.post('/login', login);

usersRouter.put('/:id', isAuth, updateUser);

usersRouter.delete('/:id', isAdmin, deleteUser);

module.exports = usersRouter;