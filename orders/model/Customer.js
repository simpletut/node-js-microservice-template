const mongoose = require('mongoose');

const customersDB = mongoose.createConnection('mongodb://localhost/customers-service');

const customerSchema = new mongoose.Schema();
const Customer = customersDB.model('Customer', customerSchema);

exports.Customer = Customer;
