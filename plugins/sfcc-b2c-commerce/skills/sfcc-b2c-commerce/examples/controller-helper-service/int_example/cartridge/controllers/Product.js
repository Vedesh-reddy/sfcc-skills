'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

var page = module.superModule;
server.extend(page);

// The PDP needs a CSRF token to call DeliveryEstimate-Get.
server.append('Show', csrfProtection.generateToken, function (req, res, next) {
    var Site = require('dw/system/Site');
    var viewData = res.getViewData();
    viewData.deliveryEstimateEnabled = !!Site.getCurrent().getCustomPreferenceValue('deliveryEstimateEnabled');
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
