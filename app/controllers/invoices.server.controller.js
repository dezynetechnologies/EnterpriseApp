'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Invoice = mongoose.model('Invoice'),
    Employee = mongoose.model('Employee'),
    _ = require('lodash');


/**
 * Create a article
 */
exports.create = function (req, res) {
    var invoice = new Invoice(req.body);
    Employee.findOne({
        user: req.user._id
    }, function (err, employee) {

        if (err || !employee) {
            return res.status(400).send({
                message: 'You are not an employee'
            });
        } else {
            invoice.salesPerson.push(employee);

            invoice.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.json(invoice);
                }
            });
        }
    });

};


/**
 * Show the current Invoice
 */
exports.read = function(req, res) {
    res.jsonp(req.invoice);
};

/**
 * Update a Invoice
 */
exports.update = function(req, res) {
    var invoice = req.invoice ;

    invoice = _.extend(invoice , req.body);

    invoice.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(invoice);
        }
    });
};

/**
 * Delete an Invoice
 */
exports.delete = function(req, res) {
    var invoice = req.invoice ;

    invoice.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(invoice);
        }
    });
};

/**
 * List of Invoices
 */
exports.list = function(req, res) {
    Invoice.find().sort('-created').populate('salesPerson customer products.product').exec(function(err, invoices) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(invoices);
        }
    });
};

/**
 * Invoice middleware
 */
exports.invoiceByID = function(req, res, next, id) {
    Invoice.findById(id).populate('salesPerson customer products.product').exec(function(err, invoice) {
        if (err) return next(err);
        if (! invoice) return next(new Error('Failed to load Invoice ' + id));
        req.invoice = invoice ;
        next();
    });
};

/**
 * Invoice authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    /*if (req.invoice.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }*/
    next();
};
