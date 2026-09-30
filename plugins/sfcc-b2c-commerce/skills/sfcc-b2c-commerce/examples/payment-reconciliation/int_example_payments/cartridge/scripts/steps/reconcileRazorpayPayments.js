'use strict';

var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var Transaction = require('dw/system/Transaction');
var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');
var reconciliation = require('*/cartridge/scripts/helpers/paymentReconciliation');
var razorpayService = require('*/cartridge/scripts/services/razorpayService');

var log = Logger.getLogger('payment-reconciliation', 'order-payments');
var ACTIONS = reconciliation.ACTIONS;

function markRecon(order, state, note, countAttempt) {
    Transaction.wrap(function () {
        order.custom.paymentReconState = state;
        if (countAttempt) {
            order.custom.paymentReconAttempts = (order.custom.paymentReconAttempts || 0) + 1;
        }
        order.custom.paymentReconNote = note;
    });
}

function placePaidOrder(order, paymentId, paymentMethodId, undoFailFirst) {
    var expected = undoFailFirst ? Order.ORDER_STATUS_FAILED : Order.ORDER_STATUS_CREATED;
    // A webhook or an earlier run may already have moved this order on.
    if (order.getStatus().getValue() !== expected) {
        log.info('Order {0} no longer in expected status; skipping', order.getOrderNo());
        return true;
    }
    var failure = null;
    Transaction.begin();
    try {
        if (undoFailFirst) {
            var undo = OrderMgr.undoFailOrder(order);
            if (undo.isError()) {
                failure = 'paid but could not reopen failed order: ' + undo.getCode();
            }
        }
        if (!failure) {
            var instruments = order.getPaymentInstruments(paymentMethodId);
            if (!instruments.isEmpty()) {
                var instrument = /** @type {dw.order.OrderPaymentInstrument} */ (instruments.iterator().next());
                instrument.getPaymentTransaction().setTransactionID(paymentId);
            }
            var placed = OrderMgr.placeOrder(order);
            if (placed.isError()) {
                failure = 'paid but placeOrder failed: ' + placed.getCode();
            } else {
                order.setPaymentStatus(Order.PAYMENT_STATUS_PAID);
                order.setConfirmationStatus(Order.CONFIRMATION_STATUS_CONFIRMED);
                order.setExportStatus(Order.EXPORT_STATUS_READY);
                order.custom.paymentReconState = 'RESOLVED_PAID';
                order.custom.paymentReconNote = 'placed after reconciliation, payment ' + paymentId;
            }
        }
    } catch (e) {
        failure = 'exception while placing: ' + e.message;
    }

    if (failure) {
        // undoFailOrder leaves the transaction rollback-only on error, so the note needs its own transaction.
        Transaction.rollback();
        markRecon(order, 'MANUAL_REVIEW', failure, false);
        log.error('Order {0} needs manual review: {1}', order.getOrderNo(), failure);
        return false;
    }
    Transaction.commit();
    log.info('Order {0} placed after reconciliation (payment {1})', order.getOrderNo(), paymentId);
    return true;
}

function reconcileOrder(order, params, counters) {
    var razorpayOrderId = order.custom.razorpayOrderId;
    if (!razorpayOrderId) {
        return;
    }
    var isFailed = order.getStatus().getValue() === Order.ORDER_STATUS_FAILED;
    // Call the gateway before opening any transaction.
    var gateway = razorpayService.getOrderPayments(razorpayOrderId);

    var decision = reconciliation.decide({
        orderStatus: isFailed ? 'FAILED' : 'CREATED',
        amountMinor: Math.round(order.getTotalGrossPrice().getValue() * 100),
        currency: order.getCurrencyCode(),
        ageMinutes: (Date.now() - order.getCreationDate().getTime()) / 60000,
        attempts: order.custom.paymentReconAttempts || 0,
        gateway: gateway
    }, { paymentWindowMinutes: params.PaymentWindowMinutes, maxAttempts: params.MaxAttempts });

    switch (decision.action) {
        case ACTIONS.PLACE:
        case ACTIONS.UNDO_FAIL_AND_PLACE:
            counters[placePaidOrder(order, decision.paymentId, params.PaymentMethodID, decision.action === ACTIONS.UNDO_FAIL_AND_PLACE) ? 'placed' : 'review']++;
            break;
        case ACTIONS.FAIL:
            Transaction.wrap(function () {
                var failed = OrderMgr.failOrder(order, false);
                if (failed.isError()) {
                    throw new Error('failOrder: ' + failed.getCode());
                }
                order.custom.paymentReconState = 'RESOLVED_UNPAID';
                order.custom.paymentReconNote = decision.reason;
            });
            counters.failed++;
            break;
        case ACTIONS.MANUAL_REVIEW:
            markRecon(order, 'MANUAL_REVIEW', decision.reason, false);
            log.error('Order {0} needs manual review: {1}', order.getOrderNo(), decision.reason);
            counters.review++;
            break;
        case ACTIONS.UNCERTAIN:
            markRecon(order, 'UNCERTAIN', decision.reason, true);
            counters.uncertain++;
            break;
        case ACTIONS.RESOLVED_UNPAID:
            if (order.custom.paymentReconState !== 'RESOLVED_UNPAID') {
                markRecon(order, 'RESOLVED_UNPAID', decision.reason, false);
            }
            break;
        default:
            markRecon(order, 'PENDING', decision.reason, false);
    }
}

// The Search Service caps results at 1000, which is why the job runs often with a bounded look-back.
function processOrdersInStatus(status, since, params, counters) {
    var orders = OrderMgr.searchOrders('status = {0} AND creationDate >= {1}', 'creationDate asc', status, since);
    try {
        while (orders.hasNext()) {
            var order = orders.next();
            try {
                reconcileOrder(order, params, counters);
            } catch (e) {
                counters.errors++;
                log.error('Reconciliation error for order {0}: {1}', order.getOrderNo(), e.message);
            }
        }
    } finally {
        orders.close();
    }
}

exports.execute = function (params) {
    var counters = { placed: 0, failed: 0, uncertain: 0, review: 0, errors: 0 };
    var since = new Date(Date.now() - params.LookbackHours * 3600000);

    processOrdersInStatus(Order.ORDER_STATUS_CREATED, since, params, counters);
    processOrdersInStatus(Order.ORDER_STATUS_FAILED, since, params, counters);

    var summary = 'placed=' + counters.placed + ' failed=' + counters.failed + ' uncertain=' + counters.uncertain +
        ' review=' + counters.review + ' errors=' + counters.errors;
    log.info('Razorpay reconciliation finished: {0}', summary);
    if (counters.errors > 0) {
        return new Status(Status.ERROR, 'ERROR', summary);
    }
    return counters.review > 0 ? new Status(Status.OK, 'FINISHED_WITH_REVIEW', summary) : new Status(Status.OK, 'OK', summary);
};
