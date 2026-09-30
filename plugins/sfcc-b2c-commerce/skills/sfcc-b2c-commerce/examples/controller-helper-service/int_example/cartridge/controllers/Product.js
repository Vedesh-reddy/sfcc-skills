'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

var page = module.superModule;
server.extend(page);

// The PDP needs a CSRF token to call DeliveryEstimate-Get.
server.append('Show', csrfProtection.generateToken);

module.exports = server.exports();
