'use strict';

const service = require('feathers-mongoose');
const Product = require('./Product-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: Product,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/Products', service(options));

  // Get our initialize service to that we can bind hooks
  const ProductService = app.service('/Products');

  // Set up our before hooks
  ProductService.before(hooks.before);

  // Set up our after hooks
  ProductService.after(hooks.after);
};
