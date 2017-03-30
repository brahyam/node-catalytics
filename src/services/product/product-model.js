'use strict';

// product-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now },
  name: {type: String, required: true, unique: true},
  description:{type: String},
  price:{type: Number},
  quantity:{type: Number}
});

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
