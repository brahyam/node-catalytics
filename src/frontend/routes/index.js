const express = require('express');
const router = express.Router();

module.exports = function (app) {

  router.get('/', function (req, res, next) {
    res.redirect('/ui/dashboard');
  });

  router.get('/ui/dashboard', function (req, res, next) {
    res.render('dashboard');
  });

  router.get('/ui/orders', function (req,res,next){
    res.render('orders');
  });

  router.get('/ui/products', function (req,res,next){
    res.render('products');
  });

  router.get('/ui/customers', function (req,res,next){
    res.render('customers');
  });

  router.get('/settings', function (req,res,next){
    res.render('settings');
  });

  router.get('/login', function (req, res, next) {
    res.render('login');
  });

  router.get('/signup', function (req, res, next) {
    res.render('signUp');
  });

  router.post('/signup', function (req, res, next) {
    const body = req.body;
    app.service('users').create({
      email: body.email,
      password: body.password
    })
      .then(user => res.redirect('/login'))
      .catch(next);
  });



  return router;
};
