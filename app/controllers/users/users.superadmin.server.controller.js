'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    errorHandler = require('../errors.server.controller.js'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/** Lists all the current users in the system */

exports.list = function (req, res) {
    User.find().sort('-created').exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            //Delete all the sensitive information from the users list
            res.jsonp(users);
        }
    });
};

/* Creates a user through superadmin panel*/
exports.create = function (req, res) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // Init Variables
    var user = new User(req.body);
    var message = null;

    // Add missing user fields
    user.provider = 'local';
    user.displayName = user.firstName + ' ' + user.lastName;
    user.status = 'active';
    console.log(user);
    // Then save the user
    user.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;
            //user._id = undefined;

            /*req.login(user, function(err) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });*/
            res.json(user);
        }
    });
};

/*
 * Deletes a user through superadmin panel
 */
exports.delete = function (req, res) {
    var user = req.user;

    user.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};


/* Updates a user profile/password through superadmin panel */
exports.updateCompleteProfile = function (req, res) {
    var user = req.user;

    user = _.extend(user, user.body);
    //console.log(user);
    user.updated = Date.now();
    //user.roles.push('salesuser');

    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.read = function (req, res) {
    res.jsonp(req.user);
};

/**
 * Employee middleware
 */
exports.userByID = function (req, res, next, id) {
    User.findById(id).exec(function (err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load User ' + id));
        req.user = user;
        next();
    });
};