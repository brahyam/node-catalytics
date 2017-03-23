'use strict';

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');
const frontend = require('./frontend/routes');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

module.exports = function () {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  // Config passport
  require('./config/passport')(passport, app); // pass passport for configuration

  // Auth
  app.use(session({
    secret: 'GYUH62cUzLwHgpeOtV44i06CmxmlDr2YJbCz+r6+GSvpJ3hSrpJ/VNvPml8/oYahGjv6OgJ4S5FxMPt9h0zxpA==',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({mongooseConnection: global.db})
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  // Routes
  app.use('/', frontend(app));// Manage frontend pages.
  //Errors
  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
