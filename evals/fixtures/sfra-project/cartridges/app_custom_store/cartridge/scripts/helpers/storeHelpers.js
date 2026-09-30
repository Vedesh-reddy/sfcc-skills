'use strict';

var Site = require('dw/system/Site');
var Logger = require('dw/system/Logger');

function getLogger() {
    return Logger.getLogger('app-custom-store', 'storefront');
}

function getFreeShippingThreshold() {
    return Site.getCurrent().getCustomPreferenceValue('freeShippingThreshold') || null;
}

module.exports = {
    getLogger: getLogger,
    getFreeShippingThreshold: getFreeShippingThreshold
};
