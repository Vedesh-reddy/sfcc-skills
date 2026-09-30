'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var Logger = require('dw/system/Logger');
var deliveryService = require('*/cartridge/scripts/services/deliveryEstimateService');

var log = Logger.getLogger('delivery-estimate', 'external-api');
var PINCODE_PATTERN = /^[1-9][0-9]{5}$/;

function validateInput(pid, pincode) {
    var cleanPincode = pincode ? String(pincode).trim() : '';
    if (!pid || !PINCODE_PATTERN.test(cleanPincode)) {
        return { valid: false, productID: null, pincode: null, errorMessage: 'Enter a valid 6-digit PIN code.' };
    }
    var product = ProductMgr.getProduct(String(pid));
    if (!product || !product.isOnline()) {
        return { valid: false, productID: null, pincode: null, errorMessage: 'Product not found.' };
    }
    return { valid: true, productID: product.getID(), pincode: cleanPincode, errorMessage: null };
}

function getEstimate(productID, pincode) {
    var result = deliveryService.fetchEstimate(productID, pincode);
    if (!result.ok) {
        log.warn('Delivery estimate failed: status={0} error={1}', result.status, result.error);
        return { success: false, available: false, days: null };
    }
    return { success: true, available: !!result.object.serviceable, days: Number(result.object.days) || null };
}

module.exports = {
    validateInput: validateInput,
    getEstimate: getEstimate
};
