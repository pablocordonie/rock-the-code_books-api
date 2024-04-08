require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../../api/models/Book');

const books = [
    {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        year: 1967,
        genre: 'Realismo mágico'
    },
    {
        title: '1984',
        author: 'George Orwell',
        year: 1949,
        genre: 'Ciencia ficción distópica'
    },
    {
        title: 'El principito',
        author: 'Antoine de Saint-Exupéry',
        year: 1943,
        genre: 'Literatura infantil'
    },
    {
        title: 'El gran Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925,
        genre: 'Ficción moderna'
    },
    {
        title: 'El señor de los anillos',
        author: 'J.R.R. Tolkien',
        year: 1954,
        genre: 'Fantasía épica'
    }
];

mongoose.connect(process.env.DB_URL)
    .then(async () => {
        const booksCollection = await Book.find();
        if (booksCollection.length) {
            await Book.collection.drop();
            console.log(`The books collection's been dropped`);
        }
    })
    .catch(err => console.log(`Error deleting data: ${err}`))
    .then(async () => {
        const booksData = books.map(product => new Book(product));
        await Book.insertMany(booksData);
        console.log('The new books data are inserted on the DB');
    })
    .catch(error => console.log(`Error creating the new data: ${error}`))
    .finally(() => mongoose.disconnect());
