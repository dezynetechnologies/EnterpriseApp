'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reviewer: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: {
        type: String,
        default: ''
    }
});
/**
 * Product Schema
 */
var ProductSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Product name cannot be blank'
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    createdBy: [{
        type: Schema.ObjectId,
        ref: 'Employee'
    }],
    refPrice: {
        type: Number
    },
    avgRating: {
        type: Number
    },
    reviews: [reviewSchema]
});

mongoose.model('Product', ProductSchema);
