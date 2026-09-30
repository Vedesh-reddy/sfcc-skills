'use strict';

/**
 * Extends the base Product controller instead of copying it.
 * `module.superModule` resolves the next Product.js on the cartridge path
 * (int_example must sit to the LEFT of app_storefront_base).
 */
var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

var page = module.superModule;
server.extend(page);

// generateToken adds a CSRF token to viewData so the PDP template can call DeliveryEstimate-Get.
server.append('Show', csrfProtection.generateToken, function (req, res, next) {
    var viewData = res.getViewData();
    var Site = require('dw/system/Site');
    viewData.deliveryEstimateEnabled = !!Site.getCurrent().getCustomPreferenceValue('deliveryEstimateEnabled');
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
