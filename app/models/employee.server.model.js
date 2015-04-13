'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function (password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var EmployeeSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    username: String,
    department: {
        type: String,
        enum: ['sales', 'accounts', 'delivery','engineering']
    },
    employeeId: Number,
    doj: Date,
    dob: Date,
    designation: {
        type: String,
        enum: ['Sales Executive', 'Sales Manager', 'Accounts Executive', 'Accounts Manager', 'Delivery Executive', 'Delivery Manager','CEO','Engineer']
    }
});
mongoose.model('Employee', EmployeeSchema);
