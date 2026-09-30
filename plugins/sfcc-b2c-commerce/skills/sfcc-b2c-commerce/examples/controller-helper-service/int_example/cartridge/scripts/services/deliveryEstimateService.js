'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var SERVICE_ID = 'example.delivery.estimate.http';

/**
 * Masks secrets in anything the service framework writes to communication logs.
 * Without filterLogMessage (or both get*LogMessage callbacks) SFCC suppresses comm logs
 * on production; with them, YOU are responsible for what gets logged.
 * @param {string} msg - raw log message
 * @returns {string} masked message
 */
function maskSecrets(msg) {
    if (!msg) {
        return msg;
    }
    return String(msg)
        .replace(/(Authorization:\s*)(Basic|Bearer)\s+[^\s"]+/gi, '$1$2 ****')
        .replace(/("?(?:api[_-]?key|apikey|token|secret|password)"?\s*[:=]\s*"?)[^"&\s,}]+/gi, '$1****')
        .replace(/([?&](?:api[_-]?key|token|signature)=)[^&\s]+/gi, '$1****');
}

/**
 * Created per call (cheap) so configuration changes in Business Manager apply immediately.
 * Credentials come from the service credential in BM (Administration > Operations > Services),
 * never from code or site preferences.
 * @returns {dw.svc.Service} configured HTTP service
 */
function createService() {
    return LocalServiceRegistry.createService(SERVICE_ID, {
        createRequest: function (svc, params) {
            var credential = svc.getConfiguration().getCredential();
            svc.setRequestMethod('GET');
            // API-key auth: turn off the default BASIC auth so user/password aren't also sent.
            svc.setAuthentication('NONE');
            svc.addHeader('Accept', 'application/json');
            svc.addHeader('X-Api-Key', credential.getPassword());
            svc.addParam('sku', params.productID);
            svc.addParam('pincode', params.pincode);
            return null;
        },
        parseResponse: function (svc, client) {
            return JSON.parse(client.getText());
        },
        mockCall: function () {
            return { statusCode: 200, statusMessage: 'OK', text: '{"serviceable":true,"days":3}' };
        },
        filterLogMessage: maskSecrets,
        getRequestLogMessage: function (request) {
            return maskSecrets(request);
        },
        getResponseLogMessage: function (response) {
            // Log status + size only; delivery responses don't need their body in logs.
            return response ? 'HTTP ' + response.getStatusCode() + ' (' + (response.getText() || '').length + ' chars)' : null;
        }
    });
}

/**
 * @param {string} productID - validated product ID
 * @param {string} pincode - validated PIN code
 * @returns {dw.svc.Result} result; check result.ok before using result.object
 */
function fetchEstimate(productID, pincode) {
    return createService().call({ productID: productID, pincode: pincode });
}

module.exports = {
    fetchEstimate: fetchEstimate,
    maskSecrets: maskSecrets
};
