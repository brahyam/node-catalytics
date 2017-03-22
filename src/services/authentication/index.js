'use strict';

const authentication = require('feathers-authentication');

module.exports = function () {
  const app = this;

  let config = {
    "token": {
      "secret": "GYUH62cUzLwHgpeOtV44i06CmxmlDr2YJbCz+r6+GSvpJ3hSrpJ/VNvPml8/oYahGjv6OgJ4S5FxMPt9h0zxpA=="
    },
    "local": {
      "session": "true"
    },
    "successRedirect": "/ui/dashboard"
  };

  app.set('auth', config);
  app.configure(authentication(config));
};
