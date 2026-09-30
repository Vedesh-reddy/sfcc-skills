'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

function maskSecrets(msg) {
    if (!msg) {
        return msg;
    }
    return String(msg)
        .replace(/(Authorization:\s*Basic)\s+[^\s"]+/gi, '$1 ****')
        .replace(/(rzp_(?:live|test)_)[A-Za-z0-9]+/g, '$1****')
        .replace(/("?(?:key_secret|secret|password)"?\s*[:=]\s*"?)[^"&\s,}]+/gi, '$1****');
}

// key_id/key_secret live on the BM service credential and go out as BASIC auth.
function createService() {
    return LocalServiceRegistry.createService('example.razorpay.http', {
        createRequest: function (svc, razorpayOrderId) {
            svc.setRequestMethod('GET');
            svc.setURL(svc.getURL().replace(/\/?$/, '/') + encodeURIComponent(razorpayOrderId) + '/payments');
            svc.addHeader('Accept', 'application/json');
            return null;
        },
        parseResponse: function (svc, client) {
            var body = JSON.parse(client.getText());
            // Payment items carry customer email and phone; keep only what reconciliation needs.
            return (body.items || []).map(function (p) {
                return { id: p.id, status: p.status, amount: p.amount, currency: p.currency };
            });
        },
        filterLogMessage: maskSecrets,
        getRequestLogMessage: function (request) {
            return maskSecrets(request);
        },
        getResponseLogMessage: function (response) {
            return response ? 'HTTP ' + response.getStatusCode() : null;
        }
    });
}

function getOrderPayments(razorpayOrderId) {
    var result = createService().call(razorpayOrderId);
    return { ok: result.isOk(), payments: result.isOk() ? result.getObject() : [], status: result.getStatus() };
}

module.exports = {
    getOrderPayments: getOrderPayments,
    maskSecrets: maskSecrets
};
