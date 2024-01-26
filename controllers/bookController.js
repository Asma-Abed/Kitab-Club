const Book = require('./../models/bookModel');
const handler = require('./handlerController');

exports.getAllBooks = handler.getAll(Book);

exports.getBook = handler.getDoc(Book, 'book', {
  path: 'club',
  select: 'name',
});

exports.createBook = handler.createDoc(Book);

exports.updateBook = handler.updateDoc(Book, 'book');

exports.deleteBook = handler.deleteDoc(Book, 'book');
