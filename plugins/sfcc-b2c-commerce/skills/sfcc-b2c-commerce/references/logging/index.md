<!-- source: b2c-logging/SKILL.md (Salesforce B2C developer tooling skills), rewritten to follow references/core/directive.md -->
> **Scope:** Implement server-side logging with dw.system.Logger, custom log categories, and named log files. Use this skill whenever the user needs to add debug or error logging to Commerce scripts, write to a dedicated log file, configure log categories and levels, or use nested diagnostic context for tracing. Also use when setting up logging in controllers, hooks, or job scripts -- even if they just say 'add logging to my script' or 'write to a custom log file'.

# Logging

The governing directive allows exactly one logging pattern: a named logger with a kebab-case **file prefix** and a kebab-case **category**.

```javascript
var Logger = require('dw/system/Logger');
var customLogger = Logger.getLogger('order-export', 'order-payments');

customLogger.info('Exported order {0}', orderNo);
```

Not allowed in project code: the static `Logger.debug/info/warn/error/fatal(...)`, single-argument `Logger.getLogger('category')`, and dotted or camelCase names.

## `getLogger(fileNamePrefix, category)`

| Argument | Meaning | Rule |
|---|---|---|
| `fileNamePrefix` | Log file: `custom-<prefix>-<hostname>-appserver-<date>.log` | kebab-case, 3–25 characters, starts and ends alphanumeric; names the functional module (`checkout-custom`, `product-search`, `order-export`) |
| `category` | Configured in Business Manager; not part of the file name | kebab-case; names the operational domain (`order-payments`, `customer-session`, `external-api`) |

At most 200 distinct custom log file names per day per app server; `getLogger` throws once the quota is used up, so derive prefixes from fixed module names, never from data.

**Pick a first word that is unique per module.** `b2c logs` treats everything up to the second dash as the file's category, so `custom-payment-gateway-*.log` and `custom-payment-reconciliation-*.log` both filter as `custom-payment`. `razorpay-reconciliation` and `payu-gateway` stay separable.

## Levels

| Level | Method | Default | Use for |
|---|---|---|---|
| `debug` | `debug()` | Disabled (never on production) | Diagnostics during development |
| `info` | `info()` | Disabled | Notable business events |
| `warn` | `warn()` | Enabled | Recoverable problems |
| `error` | `error()` | Enabled | Failures that need attention |
| `fatal` | `fatal()` | Enabled, can email | System cannot continue |

Messages use Java `MessageFormat` placeholders; pass values as arguments so disabled levels cost nothing:

```javascript
var Logger = require('dw/system/Logger');
var customLogger = Logger.getLogger('order-export', 'order-processing');

customLogger.info('Order {0} has {1} items', orderNo, itemCount);

if (customLogger.isDebugEnabled()) {
    customLogger.debug('Export row count {0}', buildRowCount(order));
}
```

Guard any debug message whose arguments are expensive to compute.

## What to log

Log identifiers and outcomes: order number, product ID, payment ID, service status code, counts, durations.

Never log passwords, tokens, API keys, session IDs, payment credentials or card data, full request/response bodies, addresses, emails, phone numbers, or whole customer/order objects.

```javascript
var Logger = require('dw/system/Logger');
var customLogger = Logger.getLogger('payment-gateway', 'order-payments');

customLogger.error('Payment declined for order {0}: status {1}', orderNo, gatewayStatus);
```

Service communication logs are separate: mask them with `filterLogMessage` / `getRequestLogMessage` / `getResponseLogMessage` (see `../webservices/index.md`).

## Nested Diagnostic Context (NDC)

NDC adds context to every message logged inside a scope:

```javascript
var Logger = require('dw/system/Logger');
var Log = require('dw/system/Log');

var customLogger = Logger.getLogger('checkout-custom', 'order-processing');

function processOrder(orderNo) {
    var ndc = Log.getNDC();
    ndc.push('order:' + orderNo);
    try {
        customLogger.info('Processing started');
        processPayment();
    } finally {
        ndc.pop();
    }
}
```

| Method | Description |
|--------|-------------|
| `push(message)` | Add context to the stack |
| `pop()` | Remove and return top context |
| `peek()` | View top context without removing |
| `remove()` | Clear entire context |

## Business Manager configuration

**Administration › Operations › Custom Log Settings**: enable levels per category (log to file), set email recipients for `fatal`, and add the categories your code uses.

Entry format: `[timestamp] [level] [category] message`, e.g. `[2026-01-15 10:30:45.123 GMT] [INFO] [order-processing] Exported order 00001234`.

## Detailed reference

- [Log Files](LOG-FILES.md) — log file types, locations, and retention

## Script API classes

| Class | Description |
|-------|-------------|
| `dw.system.Logger` | Logger factory (`getLogger`) |
| `dw.system.Log` | Logger instance; `Log.getNDC()` |
| `dw.system.LogNDC` | Nested Diagnostic Context |
