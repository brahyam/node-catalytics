const express = require('express');
const passport = require('passport');
const router = express.Router();
const settingsRoutes = require('./settings');
const authRoutes = require('./auth');


module.exports = function (app) {

  // Catch all auth routes first (login/signup/logoout)
  router.use('/', authRoutes(app));

  // Index - redirect to dashboard
  router.get('/', function (req, res, next) {
    res.redirect('/ui/dashboard');
  });

  router.get('/ui/dashboard', isLoggedIn, function (req, res, next) {
    var data = {
      user: req.user
    };
    res.render('dashboard', data);
  });

  // Handle all settings
  router.use('/ui/settings', isLoggedIn, settingsRoutes(app));

  router.get('/ui/orders', function (req,res,next){
    res.render('orders');
  });

  router.get('/ui/newprod', function (req, res, next) {
    res.render('newprod');
  });

  router.get('/ui/editprod', function (req, res, next) {
    res.render('editprod');
  });

  router.get('/ui/products', function (req,res,next){
    app.service('products').find({paginate: false})
    .then(results => {
      console.log('Products :', results);
      res.render('products');
    });
  });

  router.get('/ui/customers', function (req,res,next){
    res.render('customers');
  });

  router.get('/settings', function (req,res,next){
    res.render('settings');
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.approved == true)
      return next();

    // if they aren't redirect them to the login page
    res.redirect('/login');
  }

  return router;
};
