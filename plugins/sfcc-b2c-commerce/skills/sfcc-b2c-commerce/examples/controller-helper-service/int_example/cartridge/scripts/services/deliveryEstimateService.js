'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

function maskSecrets(msg) {
    if (!msg) {
        return msg;
    }
    return String(msg)
        .replace(/(Authorization:\s*)(Basic|Bearer)\s+[^\s"]+/gi, '$1$2 ****')
        .replace(/("?(?:api[_-]?key|apikey|token|secret|password)"?\s*[:=]\s*"?)[^"&\s,}]+/gi, '$1****')
        .replace(/([?&](?:api[_-]?key|token|signature)=)[^&\s]+/gi, '$1****');
}

function createService() {
    return LocalServiceRegistry.createService('example.delivery.estimate.http', {
        createRequest: function (svc, params) {
            var credential = svc.getConfiguration().getCredential();
            svc.setRequestMethod('GET');
            // The API authenticates by key header; without this the credential is also sent as BASIC auth.
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
        filterLogMessage: maskSecrets,
        getRequestLogMessage: function (request) {
            return maskSecrets(request);
        },
        getResponseLogMessage: function (response) {
            return response ? 'HTTP ' + response.getStatusCode() + ' (' + (response.getText() || '').length + ' chars)' : null;
        }
    });
}

function fetchEstimate(productID, pincode) {
    return createService().call({ productID: productID, pincode: pincode });
}

module.exports = {
    fetchEstimate: fetchEstimate,
    maskSecrets: maskSecrets
};
