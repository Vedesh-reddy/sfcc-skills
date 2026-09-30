'use strict';

/**
 * Project convention (see also scripts/helpers/storeHelpers.js):
 *  - extend base controllers with server.extend(module.superModule) + append; never copy them
 *  - business logic lives in scripts/helpers/*Helpers.js, controllers only shape viewData
 *  - project data goes under viewData.store.* to avoid clashing with base keys
 *  - logging via storeHelpers.getLogger(), never console
 */
var server = require('server');
var storeHelpers = require('*/cartridge/scripts/helpers/storeHelpers');

var page = module.superModule;
server.extend(page);

server.append('Show', function (req, res, next) {
    var viewData = res.getViewData();
    viewData.store = viewData.store || {};
    viewData.store.freeShippingThreshold = storeHelpers.getFreeShippingThreshold();
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
