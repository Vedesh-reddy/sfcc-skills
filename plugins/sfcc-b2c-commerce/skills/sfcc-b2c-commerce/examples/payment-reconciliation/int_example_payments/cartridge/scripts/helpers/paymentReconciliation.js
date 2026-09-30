'use strict';

// Kept free of dw.* so a webhook handler can reuse it and it can be unit-tested.
// An order is failed only on a definitive "not paid" after the payment window;
// anything uncertain is retried and then goes to manual review.

var ACTIONS = {
    PLACE: 'PLACE',
    UNDO_FAIL_AND_PLACE: 'UNDO_FAIL_AND_PLACE',
    FAIL: 'FAIL',
    RESOLVED_UNPAID: 'RESOLVED_UNPAID',
    WAIT: 'WAIT',
    UNCERTAIN: 'UNCERTAIN',
    MANUAL_REVIEW: 'MANUAL_REVIEW'
};

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

    // Authorized payments can still lapse, so they aren't proof of payment yet.
    if (authorized.length > 0 || pending.length > 0) {
        return retryOrReview('payment authorized/in progress, not captured yet');
    }

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
