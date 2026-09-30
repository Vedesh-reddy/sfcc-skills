<!-- source: b2c-ordering/SKILL.md (Salesforce B2C developer tooling skills) -->
> **Scope:** Manage the order lifecycle in B2C Commerce including order creation, status transitions, failure handling, and checkout completion. Use this skill whenever the user needs to create an order from a basket, transition order status, handle failed or cancelled orders, implement payment authorization in checkout, or understand async order processing — even if they just say "my order is stuck" or "finish the checkout flow".

# B2C Ordering

The OrderMgr API provides order creation, status management, and querying. Understanding the order lifecycle is essential for checkout implementation and order processing.

## Order Lifecycle

Orders progress through these statuses:

```
Basket → CREATED ──placeOrder──→ NEW → OPEN → COMPLETED
            └──failOrder───→ FAILED ──undoFailOrder──→ CREATED
NEW / OPEN / COMPLETED ──cancelOrder──→ CANCELLED ──undoCancelOrder──→ OPEN
```

| Status | Description | Can Transition To |
|--------|-------------|-------------------|
| `CREATED` | Order created, not yet placed | `NEW` (`placeOrder`), `FAILED` (`failOrder`) |
| `NEW` | Order placed, awaiting fulfillment | `OPEN`, `COMPLETED`, `CANCELLED` (`cancelOrder`) |
| `OPEN` | Order in processing | `COMPLETED`, `CANCELLED` (`cancelOrder`) |
| `COMPLETED` | Order fulfilled | `CANCELLED` (`cancelOrder`) |
| `CANCELLED` | Order cancelled | `OPEN` (`undoCancelOrder`) |
| `FAILED` | Order failed (payment, validation) | `CREATED` (`undoFailOrder`) |

> **Corrected — verified against the Script API (2026-09-30):**
> - `failOrder` only accepts `CREATED` orders. A placed (`NEW`/`OPEN`) order cannot be failed; cancel it instead.
> - `undoFailOrder(order)` **exists**: it turns `FAILED` back into `CREATED`, re-reserving inventory and coupon redemptions. It can return `INVENTORY_RESERVATION_FAILED` or `COUPON_INVALID`; on error the transaction becomes rollback-only.
> - `failOrder(order, true)` reopens the basket *only if possible* (no other basket exists for the customer). Use it for shopper-facing retries. Use `undoFailOrder` + `placeOrder` to recover an order you failed that the gateway later confirms as paid (late webhook / reconciliation).

## Creating Orders

### Standard Flow (Synchronous)

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Status = require('dw/system/Status');

function createOrder(basket) {
    var order;

    Transaction.wrap(function() {
        // Create order from basket (status: CREATED)
        order = OrderMgr.createOrder(basket);
    });

    if (!order) {
        return { error: true, message: 'Order creation failed' };
    }

    // Authorize payment
    var paymentResult = authorizePayment(order);

    if (!paymentResult.success) {
        Transaction.wrap(function() {
            OrderMgr.failOrder(order, true); // Reopen basket
        });
        return { error: true, message: 'Payment failed' };
    }

    // Place the order (status: CREATED → NEW)
    var placeResult;
    Transaction.wrap(function() {
        placeResult = OrderMgr.placeOrder(order);
    });

    if (placeResult.error) {
        return { error: true, message: 'Order placement failed' };
    }

    // Set confirmation status
    Transaction.wrap(function() {
        order.setConfirmationStatus(order.CONFIRMATION_STATUS_CONFIRMED);
    });

    return { error: false, order: order };
}
```

### SCAPI Flow: Create, Authorize Through Order PI, Then Place

Lead with the Shopper Orders state machine instead of manually placing from `order.afterPOST`:

```text
POST /checkout/shopper-orders/v1/organizations/{orgId}/orders
  -> commits order in CREATED

PATCH /checkout/shopper-orders/v1/organizations/{orgId}/orders/{orderNo}/payment-instruments/{piId}
  -> invokes dw.order.payment.authorizeCreditCard or dw.order.payment.authorize
  -> passes successfullyAuthorized to order.payment_instrument.afterPATCH
  -> default afterPATCH places when authorized coverage reaches the order total

NEW     -> success
CREATED -> not fully placed; authorize remaining PIs, fail safely, or reconcile
```

Return `undefined` from a successful custom order-PI `afterPATCH` implementation so the platform's
default coverage-based placement behavior runs. A non-null `Status` ends execution and suppresses
that implementation.

On a deterministic payment failure, use the Shopper Orders fail action with `reopenBasket=true`.
On an indeterminate gateway result, retain the `CREATED` order for reconciliation rather than
risking a duplicate authorization.

Use `dw.ocapi.shop.order.afterPOST` as the alternative when checkout deliberately needs a single
server-side phase that creates, authorizes, and performs the Commerce-side place-or-fail transition,
or when the processor cannot participate in order-PI authorization. That hook runs inside order
creation's transaction: do not add a nested `Transaction.wrap`, and understand that `Status.ERROR`
rolls back the Commerce order but not an external gateway side effect. See
[b2c-hooks](../hooks/index.md#alternative-authorize-and-place-in-orderafterpost).

## OrderMgr API Reference

### Order Creation

| Method | Description |
|--------|-------------|
| `createOrder(basket)` | Create order with auto-generated number |
| `createOrder(basket, orderNo)` | Create order with specific number |
| `createOrderNo()` | Generate next order number |
| `createOrderSequenceNo()` | Get next sequence number (for custom formatting) |

### Order Status

| Method | Description |
|--------|-------------|
| `placeOrder(order)` | Place order (CREATED → NEW) |
| `failOrder(order, reopenBasket)` | Fail order (set to FAILED status) |
| `cancelOrder(order)` | Cancel order (set to CANCELLED status) |
| `undoCancelOrder(order)` | Revert cancelled order to OPEN |
| `undoFailOrder(order)` | Revert failed order to CREATED (re-reserves inventory/coupons; can fail) |

**Note:** single-argument `failOrder(order)` is deprecated — always pass `reopenBasketIfPossible` explicitly.

### Order Queries

| Method | Description |
|--------|-------------|
| `getOrder(orderNo)` | Get order by number. In a storefront session this throws/logs `SecurityException` on insecure access when *Limit Storefront Order Access* is on |
| `getOrder(orderNo, orderToken)` | **Use for storefront, confirmation links and integrations (payment callbacks/webhooks)** |
| `searchOrder(query, ...args)` | Search for single order (index-based) |
| `searchOrders(query, sortString, ...args)` | Search for multiple orders (close the iterator; Search Service caps at 1000 results) |
| `processOrders(fn, query, ...args)` | Preferred for processing many orders in jobs |
| `queryOrder` / `queryOrders` | **Deprecated** — use `searchOrder` / `searchOrders` / `processOrders` |

> **Search index lag:** the order search index updates asynchronously. Don't create/update an order and then search for it in the same flow — pass the `Order` object along, or use `getOrder(orderNo, orderToken)`.

## Querying Orders

### Get Order by Number

```javascript
var OrderMgr = require('dw/order/OrderMgr');

var order = OrderMgr.getOrder('00001234');

if (order) {
    var status = order.status.value;
    var total = order.totalGrossPrice;
}
```

### Search Orders

```javascript
var OrderMgr = require('dw/order/OrderMgr');

// Search by customer email
var orders = OrderMgr.searchOrders(
    'customerEmail = {0} AND status != {1}',
    'creationDate desc',
    'customer@example.com',
    dw.order.Order.ORDER_STATUS_FAILED
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process order
}
orders.close();
```

### Query by Date Range

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Calendar = require('dw/util/Calendar');

var startDate = new Calendar();
startDate.add(Calendar.DAY_OF_YEAR, -7);

var orders = OrderMgr.searchOrders(
    'creationDate >= {0} AND status = {1}',
    'creationDate desc',
    startDate.time,
    dw.order.Order.ORDER_STATUS_NEW
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process order
}
orders.close();
```

## Order Status Management

### Cancel Order

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Order = require('dw/order/Order');

function cancelOrder(orderNo) {
    var order = OrderMgr.getOrder(orderNo);

    if (!order) {
        return { error: true, message: 'Order not found' };
    }

    // Can only cancel NEW or OPEN orders
    if (order.status.value !== Order.ORDER_STATUS_NEW &&
        order.status.value !== Order.ORDER_STATUS_OPEN) {
        return { error: true, message: 'Order cannot be cancelled' };
    }

    Transaction.wrap(function() {
        OrderMgr.cancelOrder(order);
    });

    return { error: false };
}
```

### Fail Order

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

function failOrder(order, reopenBasket) {
    // reopenBasket: true = customer can retry checkout
    //               false = basket is lost

    Transaction.wrap(function() {
        OrderMgr.failOrder(order, reopenBasket);
    });
}
```

### Handling Failed Orders

For a shopper-facing payment failure, fail the order and reopen the basket so they can retry. (If the gateway later confirms payment for this order, recover it with `undoFailOrder` and then `placeOrder` — see `examples/payment-reconciliation/`.)

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

// When payment fails, fail the order and reopen basket
function handlePaymentFailure(order) {
    Transaction.wrap(function() {
        // reopenBasket=true allows customer to retry checkout
        OrderMgr.failOrder(order, true);
    });

    // Basket is now available again for the customer
    return { error: true, message: 'Payment failed. Please try again.' };
}
```

### SCAPI: Fail Order and Reopen Basket

For SCAPI integrations, use the Shopper Orders fail action after a deterministic payment failure:

```http
POST /checkout/shopper-orders/v1/organizations/{orgId}/orders/{orderNo}/actions/fail?siteId={siteId}&reopenBasket=true
Authorization: Bearer {token}
Content-Type: application/json

{
    "reasonCode": "payment_auth_failure"
}
```

The current payment-oriented reason codes are `payment_auth_failure`, `payment_confirm_failure`, and
`payment_capture_failure`. The endpoint returns `409` when the order is no longer in a state that can
be failed. Confirm the current Shopper Orders schema before generating version-specific code.

### Undo Cancelled Order

Cancelled orders can be reopened using `undoCancelOrder()`:

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Order = require('dw/order/Order');

function reopenCancelledOrder(orderNo) {
    var order = OrderMgr.getOrder(orderNo);

    if (order.status.value !== Order.ORDER_STATUS_CANCELLED) {
        return { error: true, message: 'Order is not cancelled' };
    }

    Transaction.wrap(function() {
        // Revert to NEW status
        OrderMgr.undoCancelOrder(order);
    });

    return { error: false, order: order };
}
```

## Order Properties

| Property | Description |
|----------|-------------|
| `orderNo` | Order number |
| `status` | Current order status |
| `confirmationStatus` | Confirmation status |
| `exportStatus` | Export status for OMS |
| `paymentStatus` | Payment status |
| `shippingStatus` | Shipping status |
| `customerEmail` | Customer email |
| `customerName` | Customer name |
| `totalGrossPrice` | Order total (with tax) |
| `totalNetPrice` | Order total (without tax) |
| `totalTax` | Total tax amount |
| `creationDate` | Order creation date |
| `productLineItems` | Line items in order |
| `shipments` | Order shipments |
| `paymentInstruments` | Payment instruments |

## Custom Order Numbers

Use the `dw.order.createOrderNo` hook for custom order number generation:

```javascript
// hooks.json
{
    "hooks": [
        {
            "name": "dw.order.createOrderNo",
            "script": "./hooks/orderNo.js"
        }
    ]
}
```

```javascript
// hooks/orderNo.js
var OrderMgr = require('dw/order/OrderMgr');
var Site = require('dw/system/Site');

exports.createOrderNo = function() {
    var seqNo = OrderMgr.createOrderSequenceNo();
    var prefix = Site.current.ID.toUpperCase();
    var year = new Date().getFullYear();

    return prefix + '-' + year + '-' + seqNo;
};
```

## Best Practices

### Do

- Wrap Script API order mutations in a transaction only when the caller does not already provide one
- Check order status before transitions
- Close order iterators when done
- Use `failOrder(order, true)` to let customers retry
- Implement idempotent order creation (use specific order numbers)
- Set appropriate export/confirmation status

### Don't

- Place orders before successful payment authorization
- Cancel orders without refund processing
- Leave orders in CREATED status indefinitely
- Forget to handle concurrent order modifications
- Skip status validation before transitions

## Error Handling

| Scenario | Solution |
|----------|----------|
| Basket is empty | Validate basket before `createOrder()` |
| Invalid basket | Check for missing shipping/billing addresses |
| Payment failed | Use `failOrder(order, true)` to reopen basket |
| Order number exists | Use auto-generated numbers or validate uniqueness |
| Status transition invalid | Check current status before calling status methods |

## Related Skills

- [b2c-hooks](../hooks/index.md) - Order hooks (calculate, payment, createOrderNo)
