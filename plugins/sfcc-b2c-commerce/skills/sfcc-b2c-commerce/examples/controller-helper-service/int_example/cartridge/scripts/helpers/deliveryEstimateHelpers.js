'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var CacheMgr = require('dw/system/CacheMgr');
var Logger = require('dw/system/Logger');
var deliveryService = require('*/cartridge/scripts/services/deliveryEstimateService');

var log = Logger.getLogger('deliveryEstimate', 'DeliveryEstimate');
var PINCODE_PATTERN = /^[1-9][0-9]{5}$/; // Indian PIN code: 6 digits, no leading zero

/**
 * Validates untrusted request input. Returns normalized values or an error.
 * @param {string} pid - product ID from the query string
 * @param {string} pincode - PIN code from the query string
 * @returns {{valid: boolean, productID: string, pincode: string, errorMessage: string}}
 */
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

/**
 * Returns a delivery estimate, cached per product+pincode.
 * Custom cache 'deliveryEstimates' is declared in caches.json. A cache is an optimization,
 * never the source of truth: a miss simply calls the service.
 * @param {string} productID - validated product ID
 * @param {string} pincode - validated PIN code
 * @returns {{success: boolean, available: boolean, days: number}}
 */
function getEstimate(productID, pincode) {
    var cache = CacheMgr.getCache('deliveryEstimates');
    return cache.get(productID + ':' + pincode, function () {
        var result = deliveryService.fetchEstimate(productID, pincode);
        if (!result.ok) {
            // Log the status only; the service layer already masks credentials in comm logs.
            log.warn('Delivery estimate failed: status={0} error={1}', result.status, result.error);
            // Returning undefined from the loader means "don't cache the failure".
            return undefined;
        }
        return { success: true, available: !!result.object.serviceable, days: Number(result.object.days) || null };
    }) || { success: false, available: false, days: null };
}

module.exports = {
    validateInput: validateInput,
    getEstimate: getEstimate
};
