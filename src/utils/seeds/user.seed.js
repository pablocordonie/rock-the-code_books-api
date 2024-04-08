require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../../api/models/User');

const users = [
    {
        username: 'usuario_1',
        email: 'usuario_1@gmail.com',
        password: '12345',
        role: 'user'
    },
    {
        username: 'usuario_2',
        email: 'usuario_2@gmail.com',
        password: '67890',
        role: 'user'
    },
    {
        username: 'admin',
        email: 'admin@gmail.com',
        password: 'admin123',
        role: 'admin'
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const usersCollection = await User.find();
        if (usersCollection.length) {
            await User.collection.drop();
            console.log(`The users collection's been dropped`);
        }
    })
    .catch(err => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        const usersData = users.map(product => new User(product));
        await User.insertMany(usersData);
        console.log('The new users data are inserted on the DB');
    })
    .catch(error => console.log(`Error creating the new data: ${error}`))
    .finally(() => mongoose.disconnect());