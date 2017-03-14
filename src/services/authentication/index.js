'use strict';

const authentication = require('feathers-authentication');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

module.exports = function () {
  const app = this;

  let config = {
    "token": {
      "secret": "GYUH62cUzLwHgpeOtV44i06CmxmlDr2YJbCz+r6+GSvpJ3hSrpJ/VNvPml8/oYahGjv6OgJ4S5FxMPt9h0zxpA=="
    },
    "local": {},
    "google": {
      "clientID": "your google client id",
      "clientSecret": "your google client secret",
      "permissions": {
        "scope": [
          "profile"
        ]
      }
    },
    "successRedirect": "/ui/dashboard"
  };

  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;

  app.set('auth', config);
  app.configure(authentication(config));
};
