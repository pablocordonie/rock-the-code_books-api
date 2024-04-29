const Book = require('../models/Book');

const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('editorial');
        return res.status(200).json(books);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando la lista de libros');
    }
};

const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error mostrando este libro');
    }
};

const postBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        const savedNewBook = await newBook.save();
        return res.status(201).json(savedNewBook);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error publicando un nuevo libro');
    }
};

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBook = new Book(req.body);
        newBook._id = id;
        const updatedBook = await Book.findByIdAndUpdate(id, newBook, { new: true });
        return res.status(201).json(updatedBook);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error modificando este libro');
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        return res.status(200).json(deletedBook);
    } catch (err) {
        console.log(err);
        return res.status(400).json('Ha ocurrido un error eliminando este libro');
    }
};

module.exports = { getBooks, getBookById, postBook, updateBook, deleteBook };