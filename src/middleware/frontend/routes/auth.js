const express = require('express');
const router = express.Router();
const passport = require('passport');


module.exports = function (app) {

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
    req.logout();
    res.render('signUp');
  });

  return router;
};
