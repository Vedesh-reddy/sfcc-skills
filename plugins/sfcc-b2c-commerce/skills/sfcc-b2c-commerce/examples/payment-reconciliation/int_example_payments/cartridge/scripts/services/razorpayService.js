'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var SERVICE_ID = 'example.razorpay.http';

/**
 * Masks the BASIC auth header and anything that looks like a key or secret.
 * @param {string} msg - raw log message
 * @returns {string} masked message
 */
function maskSecrets(msg) {
    if (!msg) {
        return msg;
    }
    return String(msg)
        .replace(/(Authorization:\s*Basic)\s+[^\s"]+/gi, '$1 ****')
        .replace(/(rzp_(?:live|test)_)[A-Za-z0-9]+/g, '$1****')
        .replace(/("?(?:key_secret|secret|password)"?\s*[:=]\s*"?)[^"&\s,}]+/gi, '$1****');
}

/**
 * Service credential in Business Manager: user = Razorpay key_id, password = key_secret,
 * URL = https://api.razorpay.com/v1/orders/ . The framework sends them as BASIC auth
 * (the HTTPService default), so the secret never appears in code.
 * @returns {dw.svc.Service} configured service
 */
function createService() {
    return LocalServiceRegistry.createService(SERVICE_ID, {
        createRequest: function (svc, razorpayOrderId) {
            svc.setRequestMethod('GET');
            svc.setURL(svc.getURL().replace(/\/?$/, '/') + encodeURIComponent(razorpayOrderId) + '/payments');
            svc.addHeader('Accept', 'application/json');
            return null;
        },
        parseResponse: function (svc, client) {
            var body = JSON.parse(client.getText());
            // Keep only what reconciliation needs; payment items also carry customer email/phone.
            return (body.items || []).map(function (p) {
                return { id: p.id, status: p.status, amount: p.amount, currency: p.currency };
            });
        },
        filterLogMessage: maskSecrets,
        getRequestLogMessage: function (request) {
            return maskSecrets(request);
        },
        getResponseLogMessage: function (response) {
            if (!response) {
                return null;
            }
            // Never log the body: it contains customer contact details.
            return 'HTTP ' + response.getStatusCode();
        }
    });
}

/**
 * @param {string} razorpayOrderId - Razorpay order id (order_...)
 * @returns {{ok: boolean, payments: Array, status: string}} normalized result
 */
function getOrderPayments(razorpayOrderId) {
    var result = createService().call(razorpayOrderId);
    return { ok: result.isOk(), payments: result.isOk() ? result.getObject() : [], status: result.getStatus() };
}

module.exports = {
    getOrderPayments: getOrderPayments,
    maskSecrets: maskSecrets
};
