'use strict';

/**
 * DeliveryEstimate-Get  (AJAX, JSON)
 * GET /DeliveryEstimate-Get?pid=<productID>&pincode=<6 digits>&csrf_token=<token>
 *
 * Layering: controller = HTTP concerns only (input, auth, response shape).
 * Business rules live in the helper; the remote call lives in the service module.
 */
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
        // Never forward raw service errors (they can contain internal hosts/ids) to the browser.
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
