'use strict';

const service = require('feathers-mongoose');
const product = require('./product-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: product,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/products', service(options));

  // Get our initialize service to that we can bind hooks
  const productService = app.service('/products');

  // Set up our before hooks
  productService.before(hooks.before);

  // Set up our after hooks
  productService.after(hooks.after);
};
