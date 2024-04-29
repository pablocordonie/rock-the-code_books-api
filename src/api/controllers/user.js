const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateSign } = require('../../config/jwt');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando la lista de usuarios');
    }
};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando a este usuario');
    }
};

const registerNewUser = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            birthyear: req.body.birthyear,
            role: 'user',
            profileImage: req.body.profileImage
        });
        const savedNewUser = await newUser.save();
        return res.status(201).json(savedNewUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json('No se ha podido encontrar a este usuario');
        }

        if (user.role === 'admin') {
            const token = generateSign(user._id);
            return res.status(200).json({ user, token });
        }

        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateSign(user._id);
            return res.status(200).json({ user, token });
        } else {
            return res.status(400).json('La contraseña no es correcta');
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const authenticatedUser = req.user._id;

        if (authenticatedUser.toString() === id) {
            const newUser = new User(req.body);
            newUser._id = id;
            const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });
            return res.status(201).json(updatedUser);
        } else {
            return res.status(403).json('No tienes permiso para modificar la información de otro usuario');
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        return res.status(200).json(deletedUser);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error eliminando a este usuario');
    }
};

module.exports = { getUsers, getUserById, registerNewUser, login, updateUser, deleteUser };