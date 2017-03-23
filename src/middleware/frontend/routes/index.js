const express = require('express');
const passport = require('passport');
const router = express.Router();


module.exports = function (app) {

  router.get('/', function (req, res, next) {
    res.redirect('/ui/dashboard');
  });

  router.get('/ui/dashboard', isLoggedIn, function (req, res, next) {
    var data = {
      user: req.user
    };
    res.render('dashboard', data);
  });

  router.get('/login', function (req, res, next) {
    res.render('login', {message: req.flash('loginMessage')});
  });

  router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/ui/dashboard', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/signup', function (req, res, next) {
    res.render('signUp', {message: req.flash('signupMessage')});
  });

  router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/ui/dashboard', // redirect to the dashboard
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  router.get('/logout', function (req, res, next) {
    res.logout();
    res.render('signUp');
  });

  router.get('/ui/orders', function (req,res,next){
    res.render('orders');
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
    if (req.isAuthenticated())
      return next();

    // if they aren't redirect them to the login page
    res.redirect('/login');
  }

  return router;
};
