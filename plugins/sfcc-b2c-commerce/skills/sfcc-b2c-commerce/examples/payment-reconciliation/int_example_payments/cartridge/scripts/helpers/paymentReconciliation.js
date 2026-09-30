'use strict';

/**
 * Pure decision logic for Razorpay reconciliation. No dw.* calls, no side effects,
 * so it can be unit-tested and reused by a webhook handler.
 *
 * Core rule: an order is only FAILED when the gateway gives a *definitive* "not paid"
 * after the payment window closed. Anything uncertain (timeouts, errors, authorized-but-not-
 * captured, amount mismatch, refunds) never fails the order.
 */

var ACTIONS = {
    PLACE: 'PLACE', // CREATED + captured      -> placeOrder
    UNDO_FAIL_AND_PLACE: 'UNDO_FAIL_AND_PLACE', // FAILED + captured -> undoFailOrder, placeOrder
    FAIL: 'FAIL', // CREATED + definitively unpaid after window -> failOrder
    RESOLVED_UNPAID: 'RESOLVED_UNPAID', // FAILED + unpaid: nothing to do
    WAIT: 'WAIT', // payment may still complete; check again later
    UNCERTAIN: 'UNCERTAIN', // could not determine; retry later
    MANUAL_REVIEW: 'MANUAL_REVIEW' // money may have moved but state is inconsistent: a human decides
};

/**
 * @param {Object} input
 * @param {string} input.orderStatus - 'CREATED' or 'FAILED'
 * @param {number} input.amountMinor - order total in paise
 * @param {string} input.currency - order currency code
 * @param {number} input.ageMinutes - minutes since order creation
 * @param {number} input.attempts - previous reconciliation attempts
 * @param {Object} input.gateway - {ok: boolean, payments: Array<{id, status, amount, currency}>}
 * @param {Object} config - {paymentWindowMinutes: number, maxAttempts: number}
 * @returns {{action: string, paymentId: string, reason: string}}
 */
function decide(input, config) {
    var retryOrReview = function (reason) {
        return input.attempts + 1 >= config.maxAttempts
            ? { action: ACTIONS.MANUAL_REVIEW, paymentId: null, reason: reason + '; max attempts reached' }
            : { action: ACTIONS.UNCERTAIN, paymentId: null, reason: reason };
    };

    if (!input.gateway || !input.gateway.ok) {
        return retryOrReview('gateway unavailable');
    }

    var payments = input.gateway.payments || [];
    var captured = payments.filter(function (p) { return p.status === 'captured'; });
    var authorized = payments.filter(function (p) { return p.status === 'authorized'; });
    var refunded = payments.filter(function (p) { return p.status === 'refunded'; });
    var pending = payments.filter(function (p) { return p.status === 'created'; });

    if (captured.length > 1 || refunded.length > 0) {
        return { action: ACTIONS.MANUAL_REVIEW, paymentId: null, reason: 'multiple captures or refund present' };
    }

    if (captured.length === 1) {
        var payment = captured[0];
        if (payment.amount !== input.amountMinor || payment.currency !== input.currency) {
            return { action: ACTIONS.MANUAL_REVIEW, paymentId: payment.id, reason: 'captured amount/currency does not match order' };
        }
        return {
            action: input.orderStatus === 'FAILED' ? ACTIONS.UNDO_FAIL_AND_PLACE : ACTIONS.PLACE,
            paymentId: payment.id,
            reason: 'payment captured'
        };
    }

    if (authorized.length > 0 || pending.length > 0) {
        return retryOrReview('payment authorized/in progress, not captured yet');
    }

    // Only 'failed' payments, or none at all.
    if (input.ageMinutes < config.paymentWindowMinutes) {
        return { action: ACTIONS.WAIT, paymentId: null, reason: 'payment window still open' };
    }
    return input.orderStatus === 'FAILED'
        ? { action: ACTIONS.RESOLVED_UNPAID, paymentId: null, reason: 'no successful payment' }
        : { action: ACTIONS.FAIL, paymentId: null, reason: 'no successful payment after window' };
}

module.exports = {
    ACTIONS: ACTIONS,
    decide: decide
};
