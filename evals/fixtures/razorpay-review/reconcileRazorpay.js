'use strict';

// Job step written by a teammate. Review it before it goes to production.
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var Transaction = require('dw/system/Transaction');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Logger = require('dw/system/Logger');

var service = LocalServiceRegistry.createService('razorpay.http', {
    createRequest: function (svc, rzpOrderId) {
        svc.setRequestMethod('GET');
        svc.setURL('https://api.razorpay.com/v1/orders/' + rzpOrderId + '/payments');
        svc.addHeader('Authorization', 'Basic ' + require('dw/util/StringUtils').encodeBase64('rzp_live_Xk29aQ:9fQ2mZ8sLw'));
        return null;
    },
    parseResponse: function (svc, client) {
        Logger.info('Razorpay response: ' + client.getText());
        return JSON.parse(client.getText());
    }
});

exports.execute = function () {
    var orders = OrderMgr.queryOrders('status = {0}', null, Order.ORDER_STATUS_CREATED);
    while (orders.hasNext()) {
        var order = orders.next();
        Transaction.wrap(function () {
            var result = service.call(order.custom.razorpayOrderId);
            if (!result.ok) {
                // Razorpay didn't answer, treat as unpaid
                OrderMgr.failOrder(order);
                return;
            }
            var paid = result.object.items.some(function (p) { return p.status === 'captured' || p.status === 'authorized'; });
            if (paid) {
                OrderMgr.placeOrder(order);
                order.setPaymentStatus(Order.PAYMENT_STATUS_PAID);
            } else {
                OrderMgr.failOrder(order);
            }
        });
    }
};
