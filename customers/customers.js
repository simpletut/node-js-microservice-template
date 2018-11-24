const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Customer } = require('./model/Customer');
const _ = require('lodash');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5555;

// db connect
mongoose.connect('mongodb://localhost/customers-service', { useNewUrlParser: true }, () => {
    console.log('Connected to customer-service');
});

app.use(cors())
app.use(bodyParser.json());

app.post('/customers', async (req, res) => {

    const customer = new Customer(
        _.pick(req.body, ['name', 'age', 'address'])
    );

    await customer.save();
    
    res.send(_.pick(customer, ['_id']));

});

app.get('/customers', async (req,res) => {
    const customers = await Customer.find();
    res.send(customers);
});

app.get('/customer/:id', async (req,res) => {
    const customer_id = req.params.id;
    const customer = await Customer.findById(customer_id);
    res.send(customer);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});