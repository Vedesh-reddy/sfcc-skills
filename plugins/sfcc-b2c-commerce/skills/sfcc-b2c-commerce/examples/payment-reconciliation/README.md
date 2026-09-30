# Example: Razorpay payment reconciliation without failing uncertain orders

A job that settles orders left in `CREATED` (shopper closed the tab, callback lost) and recovers `FAILED` orders that Razorpay later reports as captured.

| File | Purpose |
|---|---|
| `int_example_payments/cartridge/scripts/helpers/paymentReconciliation.js` | **Pure** decision function (no `dw.*`), unit-tested in `../test/` |
| `int_example_payments/cartridge/scripts/services/razorpayService.js` | `GET /v1/orders/{id}/payments`; BASIC auth from the BM credential; masked logs; strips customer PII from the parsed result |
| `int_example_payments/cartridge/scripts/steps/reconcileRazorpayPayments.js` | Job step: search, call gateway, apply decision |
| `int_example_payments/steptypes.json`, `site_template/jobs.xml`, `site_template/services.xml` | Registration, 15-minute schedule (disabled), service config |
| `../metadata/site_template/meta/system-objecttype-extensions.xml` | `Order.razorpayOrderId`, `paymentReconState`, `paymentReconAttempts`, `paymentReconNote` |

## Decision table

| Gateway says | Order `CREATED` | Order `FAILED` |
|---|---|---|
| Error / timeout | `UNCERTAIN`, retry → `MANUAL_REVIEW` after `MaxAttempts` | same |
| One `captured`, amount + currency match | `placeOrder`, payment `PAID`, export `READY` | `undoFailOrder` → `placeOrder` |
| `captured` but amount/currency differ, >1 capture, or any `refunded` | `MANUAL_REVIEW` | `MANUAL_REVIEW` |
| `authorized` / `created` (not captured yet) | `UNCERTAIN` | `UNCERTAIN` |
| Only `failed` / no payments, inside `PaymentWindowMinutes` | `WAIT` | `WAIT` |
| Only `failed` / no payments, window closed | `failOrder(order, false)` | leave as is |

**Only a definitive "not paid" after the window fails an order.** Money-moved-but-inconsistent cases go to a human, never to automatic fail or refund.

## Guardrails applied

- **Transactions:** the gateway call is outside any transaction; each order gets its own short transaction; `Transaction.rollback()` on any placement failure; `undoFailOrder` errors make the transaction rollback-only, so bookkeeping is written in a *new* transaction afterwards.
- **Idempotency:** status is re-checked before placing (a webhook may have placed it); `@supports-parallel-execution` is `false`.
- **Iterators:** `searchOrders` results are closed in `finally`. Search is index-based and capped at 1000 results by the Search Service, so the job runs frequently with a bounded look-back.
- **Logging:** `getLogger('payment-reconciliation', 'order-payments')`; order numbers and payment IDs only, no customer data; comm logs mask `Authorization` and key material.
- **Status:** the step returns `FINISHED_WITH_REVIEW` so Business Manager and alerting can distinguish "needs a human" from success.

Your storefront webhook handler (verify `X-Razorpay-Signature` with `dw.crypto.Mac` HMAC-SHA256 over the raw body before trusting it) should call the same `decide()` so both paths behave identically.

## Deploy

```bash
b2c code deploy ./int_example_payments --reload
b2c sites cartridges add int_example_payments --site-id RefArch --position first
b2c job import ../metadata/site_template
b2c job import ./site_template
b2c job run Example-ReconcileRazorpayPayments --wait --show-log
```

Set the real `key_id` / `key_secret` on the `example.razorpay.cred` credential in Business Manager, never in the XML you commit.
