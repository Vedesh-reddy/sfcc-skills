'use strict';
var test = require('node:test');
var assert = require('node:assert');
var load = require('./load');

var recon = load('payment-reconciliation/int_example_payments/cartridge/scripts/helpers/paymentReconciliation');
var razorpay = load('payment-reconciliation/int_example_payments/cartridge/scripts/services/razorpayService');
var delivery = load('controller-helper-service/int_example/cartridge/scripts/services/deliveryEstimateService');
var A = recon.ACTIONS;
var cfg = { paymentWindowMinutes: 60, maxAttempts: 3 };

function input(overrides) {
    var base = { orderStatus: 'CREATED', amountMinor: 1250000, currency: 'INR', ageMinutes: 90, attempts: 0,
        gateway: { ok: true, payments: [] } };
    Object.keys(overrides || {}).forEach(function (k) { base[k] = overrides[k]; });
    return base;
}
function pay(status, amount, currency) {
    return { id: 'pay_1', status: status, amount: amount === undefined ? 1250000 : amount, currency: currency || 'INR' };
}

test('gateway error never fails the order', function () {
    var d = recon.decide(input({ gateway: { ok: false } }), cfg);
    assert.strictEqual(d.action, A.UNCERTAIN);
});
test('gateway error after max attempts goes to manual review, not FAIL', function () {
    assert.strictEqual(recon.decide(input({ gateway: { ok: false }, attempts: 2 }), cfg).action, A.MANUAL_REVIEW);
});
test('captured payment places a CREATED order', function () {
    var d = recon.decide(input({ gateway: { ok: true, payments: [pay('failed'), pay('captured')] } }), cfg);
    assert.strictEqual(d.action, A.PLACE);
    assert.strictEqual(d.paymentId, 'pay_1');
});
test('captured payment on a FAILED order is recovered with undoFailOrder', function () {
    assert.strictEqual(recon.decide(input({ orderStatus: 'FAILED', gateway: { ok: true, payments: [pay('captured')] } }), cfg).action, A.UNDO_FAIL_AND_PLACE);
});
test('amount or currency mismatch goes to manual review', function () {
    assert.strictEqual(recon.decide(input({ gateway: { ok: true, payments: [pay('captured', 1000)] } }), cfg).action, A.MANUAL_REVIEW);
    assert.strictEqual(recon.decide(input({ gateway: { ok: true, payments: [pay('captured', 1250000, 'USD')] } }), cfg).action, A.MANUAL_REVIEW);
});
test('authorized but not captured is uncertain, never failed', function () {
    assert.strictEqual(recon.decide(input({ gateway: { ok: true, payments: [pay('authorized')] } }), cfg).action, A.UNCERTAIN);
});
test('refund present goes to manual review', function () {
    assert.strictEqual(recon.decide(input({ gateway: { ok: true, payments: [pay('refunded')] } }), cfg).action, A.MANUAL_REVIEW);
});
test('no payment inside the window waits', function () {
    assert.strictEqual(recon.decide(input({ ageMinutes: 10 }), cfg).action, A.WAIT);
});
test('only failed payments after the window fails a CREATED order', function () {
    assert.strictEqual(recon.decide(input({ gateway: { ok: true, payments: [pay('failed')] } }), cfg).action, A.FAIL);
});
test('unpaid FAILED order is left alone', function () {
    assert.strictEqual(recon.decide(input({ orderStatus: 'FAILED' }), cfg).action, A.RESOLVED_UNPAID);
});

test('razorpay log masking hides BASIC auth and key ids', function () {
    var out = razorpay.maskSecrets('GET /v1/orders/order_X/payments\nAuthorization: Basic cnpwX2xpdmVfYWJjOnNlY3JldA==\nkey rzp_live_ABC123 "key_secret":"s3cr3t"');
    assert.ok(out.indexOf('cnpwX2xpdmVfYWJjOnNlY3JldA==') === -1);
    assert.ok(out.indexOf('ABC123') === -1);
    assert.ok(out.indexOf('s3cr3t') === -1);
    assert.ok(out.indexOf('order_X') !== -1, 'non-secret context is kept');
});
test('delivery log masking hides api keys in headers, JSON and query strings', function () {
    var out = delivery.maskSecrets('X-Api-Key: k1\nAuthorization: Bearer abc.def\n{"apiKey":"k2"} https://x?sku=1&api_key=k3&pincode=560001');
    ['k1', 'abc.def', '"k2"', 'k3'].forEach(function (s) { assert.ok(out.indexOf(s) === -1, s + ' leaked: ' + out); });
    assert.ok(out.indexOf('pincode=560001') !== -1);
});
