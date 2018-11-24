const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Order } = require('./model/Order');
const { Customer } = require('./model/Customer');
const { Book } = require('./model/Book');
const _ = require('lodash');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 7777;

// db connect
mongoose.connect('mongodb://localhost/orders-service', { useNewUrlParser: true }, () => {
    console.log('Connected to customer-service');
});

app.use(cors())
app.use(bodyParser.json());

app.post('/order', async (req, res) => {
    
    const order = new Order(
        _.pick(req.body, ['customerID', 'bookID'])
    );

    if(
        !mongoose.Types.ObjectId.isValid(order.customerID) ||
        !mongoose.Types.ObjectId.isValid(order.bookID)
    ){
        return res.status(400).send('Bad request.')
    }

    await order.save(order);

    res.send(_.pick(order, ['_id']));

});

app.get('/order', async (req, res) => {
    
    const orders = await Order.find()
        .populate({ path: 'customerID', model: Customer, select: 'name -_id'})
        .populate({ path: 'bookID', model: Book, select: '-_id' });

    res.send(orders);

});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});