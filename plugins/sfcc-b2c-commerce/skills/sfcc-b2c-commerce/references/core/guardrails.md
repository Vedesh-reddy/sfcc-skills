# SFCC guardrails

[directive.md](directive.md) governs and overrides this file. Non-negotiable rules for server-side code. Each is checked in `review-checklist.md`; the examples in `../../examples/` implement all of them.

## 1. Transaction boundaries

- Every write to a persistent object (order, product custom attribute, custom object, profile) goes inside `Transaction.wrap(fn)` or `Transaction.begin()` / `commit()` / `rollback()`.
- **Never call external services inside a transaction.** Call the service first, then open a short transaction to apply the result.
- One unit of work per transaction: one order, one chunk. A failure must not roll back unrelated work.
- In jobs, keep `transactional: "false"` in `steptypes.json` and commit per chunk inside `write()` — `true` runs the whole step as one potentially huge transaction.
- Some APIs make the current transaction **rollback-only** when they fail (e.g. `OrderMgr.undoFailOrder`, `undoCancelOrder`). After such a failure, roll back and write any bookkeeping in a *new* transaction.
- `OrderMgr.createShippingOrders` must run **outside** a transaction.
- `Transaction.wrap` rethrows after rolling back; catch it where you can handle it.

## 2. Iterator and resource cleanup

- `SeekableIterator`s (from `searchOrders`, `queryAllSiteProducts`, `CustomObjectMgr.queryCustomObjects`, `searchProfiles`, …) hold database resources: close them in `finally`, or in both `afterStep` **and** a `catch` in chunk functions.
- `FileWriter`, `FileReader`, `XMLStreamWriter`, `CSVStreamWriter`: close in `finally` / cleanup, and write to a temp file, renaming on success.
- Don't call `.asList()` on large iterators; stream them.
- `first()` returns the next element and closes the iterator.

## 3. Sensitive logging

- Use `Logger.getLogger('file-name-prefix', 'category-name')` — **file prefix first, category second**, both kebab-case (see `directive.md`); never `console` or the uncategorized `Logger.info/warn/error`.
- Never log: credentials, API keys, tokens, session IDs, card data, full request/response bodies, addresses, emails, phone numbers.
- Every service defines `filterLogMessage` and/or both `getRequestLogMessage` and `getResponseLogMessage`. On production, SFCC suppresses communication logs unless these exist, and once they exist **you** are responsible for masking.
- Log identifiers (order number, payment ID, status codes), not payloads.
- Log arguments go through `{0}` placeholders, not string concatenation, so unused levels cost nothing.

## 4. Caching

- Page cache (`cache.applyDefaultCache`, `<iscache>`) is for anonymous, non-personalized output only. Personalized fragments go in a separate remote include that isn't cached (or is cached per the right key).
- Never page-cache responses containing prices after customer-group promotions, basket data, CSRF tokens, or customer data.
- Custom caches (`CacheMgr`, `caches.json` at the cartridge root) are per app server, size-limited, not shared, and can be evicted at any time: an optimization, never the source of truth. Don't cache failures (return `undefined` from the loader).

## 5. Authorization and input

- Storefront routes: `server.middleware.https`; `csrfProtection.validateRequest` / `validateAjaxRequest` for state-changing or data-returning AJAX; `userLoggedIn.validateLoggedIn` for account data.
- Orders from a storefront or integration context: `OrderMgr.getOrder(orderNo, orderToken)`, plus a customer check. `getOrder(orderNo)` alone throws or logs `SecurityException` under *Limit Storefront Order Access*.
- Treat every `req.querystring`, `req.form`, and webhook body as hostile: validate type, format and length before use.
- Never trust client-sent prices, totals, order status, or payment results. Recompute server-side; verify gateway callbacks by signature (e.g. HMAC via `dw.crypto.Mac`) before acting.
- Credentials come from Business Manager service credentials, never code, site preferences, or ISML.
- ISML: keep default HTML encoding; `encoding="off"` only for trusted, sanitized HTML.

## 6. Order and payment state

Verified transitions (Script API):

```
CREATED ──placeOrder──→ NEW → OPEN → COMPLETED
   └──────failOrder───→ FAILED ──undoFailOrder──→ CREATED
NEW / OPEN / COMPLETED ──cancelOrder──→ CANCELLED ──undoCancelOrder──→ OPEN
```

- `failOrder` only works on `CREATED` orders; use `failOrder(order, reopenBasketIfPossible)` (the one-argument form is deprecated).
- **Fail an order only on a definitive "not paid".** Timeouts, gateway errors, authorized-not-captured, and amount mismatches are *uncertain*: keep the order `CREATED`, record state, retry, then escalate to manual review. Never auto-fail or auto-refund when money may have moved.
- A `FAILED` order later confirmed as paid: `undoFailOrder` → `placeOrder`; if `undoFailOrder` fails (inventory, coupons), flag for manual review.
- After `placeOrder` succeeds: set payment status (`PAYMENT_STATUS_PAID` when captured), confirmation status, and `EXPORT_STATUS_READY` only when the order should reach the OMS.
- Make state changes idempotent: re-check status before transitioning (webhooks and jobs race).
- Don't search for an order right after creating or updating it: the order search index is asynchronous. Pass the `Order` object along.
- `queryOrder`/`queryOrders` are deprecated: use `searchOrder`/`searchOrders` (the Search Service caps results at 1000) or `processOrders` in jobs.
