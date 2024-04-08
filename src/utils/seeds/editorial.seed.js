require('dotenv').config();
const mongoose = require('mongoose');
const Editorial = require('../../api/models/Editorial');

const editorials = [
    {
        name: 'Editorial Sudamericana',
        country: 'Argentina'
    },
    {
        name: 'Secker & Warburg',
        country: 'Reino Unido'
    },
    {
        name: 'Reynal & Hitchcock',
        country: 'Estados Unidos'
    },
    {
        name: "Scribner's",
        country: 'Estados Unidos'
    },
    {
        name: 'Allen & Unwin',
        country: 'Reino Unido'
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const editorialsCollection = await Editorial.find();
        if (editorialsCollection.length) {
            await Editorial.collection.drop();
            console.log(`The editorials collection's been dropped`);
        }
    })
    .catch(err => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        const editorialsData = editorials.map(product => new Editorial(product));
        await Editorial.insertMany(editorialsData);
        console.log('The new editorials data are inserted on the DB');
    })
    .catch(error => console.log(`Error creating the new data: ${error}`))
    .finally(() => mongoose.disconnect());