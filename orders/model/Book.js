const mongoose = require('mongoose');

const bookDB = mongoose.createConnection('mongodb://localhost/book-service');

const bookSchema = new mongoose.Schema();
const Book = bookDB.model('Book', bookSchema);

exports.Book = Book;
