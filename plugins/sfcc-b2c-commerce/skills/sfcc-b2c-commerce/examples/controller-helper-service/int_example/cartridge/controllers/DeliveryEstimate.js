'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var deliveryHelpers = require('*/cartridge/scripts/helpers/deliveryEstimateHelpers');

server.get(
    'Get',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var input = deliveryHelpers.validateInput(req.querystring.pid, req.querystring.pincode);
        if (!input.valid) {
            res.setStatusCode(400);
            res.json({ success: false, errorMessage: input.errorMessage });
            return next();
        }

        var estimate = deliveryHelpers.getEstimate(input.productID, input.pincode);
        // Service errors can mention internal hosts, so the browser only gets a generic message.
        res.json({
            success: estimate.success,
            available: estimate.available,
            days: estimate.days,
            errorMessage: estimate.success ? null : 'Delivery estimate is temporarily unavailable.'
        });
        return next();
    }
);

module.exports = server.exports();
