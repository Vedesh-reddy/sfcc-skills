# Defects a good review of reconcileRazorpay.js finds

Critical
1. Gateway error/timeout is treated as unpaid → `failOrder`: loses paid orders. Must retry and escalate.
2. `authorized` counted as paid: authorized-but-not-captured payments can still lapse; not proof of payment.
3. No amount/currency check before placing.
4. Hardcoded live key id + secret in code (and built into the header by hand).
5. Full Razorpay response logged with `Logger.info` (customer email/phone) and no `filterLogMessage` / `get*LogMessage`.

High
6. Service call inside `Transaction.wrap` (holds the transaction open during network I/O).
7. `placeOrder` / `failOrder` statuses ignored; no rollback on failure; one exception aborts the whole run.
8. Orders created seconds ago are failed immediately: no payment window.
9. `FAILED` orders later captured are never recovered (`undoFailOrder` → `placeOrder`).
10. Iterator never closed.

Medium
11. `queryOrders` and one-argument `failOrder` are deprecated.
12. No confirmation/export status after placing; no idempotency re-check.
13. `Logger.info` without a category/log file; no summary status returned to the job framework.
