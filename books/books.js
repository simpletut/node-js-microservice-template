const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Book } = require('./model/Book');
const _ = require('lodash');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 4545;

app.use(cors())

app.use(bodyParser.json({ useNewUrlParser: true }));

// connect to db
mongoose.connect('mongodb://localhost/book-service', { useNewUrlParser: true }, () => {
    console.log('Connected to book-service');
});

app.post('/', async (req, res) => {

    book = new Book(
        _.pick(req.body, ['title', 'auther', 'numberPages', 'publisher'])
    );

    await book.save();
    
    res.send(_.pick(book, ['_id']));

});

app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
});

app.get('/book/:id', async (req,res) => {
    Book.findById(req.params.id).then(book => {
        if(book) {
            res.send(book);
        }
    }).catch(err => {
        res.status(400).send(err)
    });
});

app.delete('/book/:id', async (req,res) => {
    Book.findOneAndRemove(req.params.id).then(() => {
        res.send('Book Deleted');
    }).catch(err => {
        res.send('error');
    });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});