const Book = require('../models/Book');

const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('editorial');
        return res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

const postBook = async (req, res, next) => {
    try {
        const newBook = new Book(req.body);
        const savedNewBook = await newBook.save();
        return res.status(201).json(savedNewBook);
    } catch (err) {
        next(err);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBook = new Book(req.body);
        newBook._id = id;
        const updatedBook = await Book.findByIdAndUpdate(id, newBook, { new: true });
        return res.status(201).json(updatedBook);
    } catch (err) {
        next(err);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        return res.status(200).json(deletedBook);
    } catch (err) {
        next(err);
    }
}

module.exports = { getBooks, postBook, updateBook, deleteBook };