'use strict';
const product = require('./product');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function () {
  const app = this;

  mongoose.connect(process.env.MONGODB_URI || app.get('mongodb'));
  mongoose.Promise = global.Promise;
  global.db = mongoose.connection;

  app.configure(authentication);
  app.configure(user);
  app.configure(product);
};
