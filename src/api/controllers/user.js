const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateSign } = require('../../config/jwt');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json('No se ha encontrado la lista de usuarios');
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
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json('El usuario no existe');
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
        return res.status(400).json('Los datos proporcionados no son válidos');
    }
};

module.exports = { getUsers, registerNewUser, login };