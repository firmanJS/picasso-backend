'use strict';

/**
 * @fileOverview Contains the API Gateway
 *
 * @author Arif Wicaksono
 *
 * @requires NPM:path
 * @requires NPM:@sentry/node
 * @requires NPM:express-gateway
*/

const path = require('path');
const gateway = require('express-gateway');
const Raven = require('raven');

const env = process.env.NODE_ENV;

try {
  switch (env) {
    case 'undefined':
      require('dotenv').config();
      break;
    case 'development':
      require('dotenv').config({
        path: path.resolve(process.cwd(), '../../.env')
      });
      break;
    default:
      Error('Unrecognized Environment');
  }
} catch (err) {
  Error('Error trying to run file');
}

Raven.config(process.env.SENTRY_URI).install();

gateway().load(path.join(process.cwd(), 'config')).run();
//# sourceMappingURL=index.js.map