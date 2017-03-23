'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('Product service', function() {
  it('registered the Products service', () => {
    assert.ok(app.service('Products'));
  });
});
