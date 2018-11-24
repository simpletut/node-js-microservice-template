const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    bookID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

exports.orderSchema = orderSchema;
exports.Order = Order;