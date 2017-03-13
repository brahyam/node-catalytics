const express = require('express');
const router = express.Router();

module.exports = function (app) {

  router.get('/', function (req, res, next) {
    res.render('landing');
  });

  router.get('/login', function (req, res, next) {
    res.render('login');
  });

  return router;
};
