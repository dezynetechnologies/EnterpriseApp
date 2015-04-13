'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var InvoiceSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    invNum: {
        type: Number,
        required: 'Invoice Number cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    salesPerson: [{
        type: Schema.ObjectId,
        ref: 'Employee'
    }],
    accountsManager: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    deliveryManager: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    accountsExec: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    deliveryExec: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    customer: {
        type: Schema.ObjectId,
        ref: 'Customer'
    },
    products: [{ /*Atleast one product has to be there */
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        },
        price: Number
    }],
    amount: Number,
    status: {
        type: String,
        enum: ['active', 'approved', 'cancelled', 'paymentPending', 'paymentDone', 'deliveryPending', 'deliveryDone', 'completed']
    }
});

mongoose.model('Invoice', InvoiceSchema);
