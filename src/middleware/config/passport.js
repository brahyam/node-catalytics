'use strict';

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// expose this function to our app using module.exports
module.exports = function (passport, app) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    app.service('users').get(id)
      .then(user => {
        var err;
        if (!user) {
          err = 'user not found';
        }
        console.log('user found:' + user);
        done(err, user);
      })
      .catch(err => {
        console.error('error searching user');
        done(err);
      });
  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) {
      console.log('passport signup strategy init');
      console.log('received email:' + email + " and password:" + password);
      // asynchronous
      // User.findOne wont fire unless data is sent back
      process.nextTick(function () {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        app.service('users').find({paginate: false, query: {email: email}})
          .then(results => {
            var err;
            if (results && results.length > 0) {
              var user = results[0];
              console.log('found user:' + user);
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
            else {
              console.log('user not found');
              app.service('users').create({
                email: email,
                password: password // will be hashed in users before hook
              })
                .then(user => {
                  console.log('user created:' + user);
                  return done(null, user);
                });
            }
          })
          .catch(err => done(err));
      });
    }));

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function (req, email, password, done) { // callback with email and password from our form
      console.log('login in user:' + email + " with password " + password);
      app.service('users').find({paginate: false, query: {email: email}})
        .then(results => {
          console.log('query returned results :', results);
          if (results && results.length > 0) {
            var user = results[0];
            if (!user) {
              return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }
            else {
              if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
              }
              else {
                return done(null, user);
              }
            }
          }
          else {
            console.error('query returned no users');
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
          }
        })
        .catch(err => done(err));
    }));
};
