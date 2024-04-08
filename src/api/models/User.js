const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, trim: true, required: true, unique: true },
        email: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
        role: { type: String, trim: true, required: true }
    },
    {
        timestamps: true,
        collection: 'users'
    }
);

const User = mongoose.model('users', userSchema, 'users');

module.exports = User;