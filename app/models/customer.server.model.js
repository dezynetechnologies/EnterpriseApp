'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return (!this.updated || property.length);
};

/**
 * Article Schema
 */
var CustomerSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Company name cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    custtype: {
        type: String,
        enum: ['individual', 'company'],
        default: 'company'
    },
    phone: {
        type: Number
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    updated: {
        type: Date
    },
    /*Customer Users for this Customer Account having access to our system*/
    user: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    salesManager: {
        type: Schema.ObjectId,
        ref: 'Employee'
    },
    invoices: [{
        type: Schema.ObjectId,
        ref: 'Invoice'
    }],
    createdBy: {
        type: Schema.ObjectId,
        ref : 'User'
    }
});

mongoose.model('Customer', CustomerSchema);
