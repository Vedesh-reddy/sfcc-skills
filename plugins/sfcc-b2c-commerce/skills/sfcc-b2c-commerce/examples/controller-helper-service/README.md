# Example: controller → helper → service (SFRA)

A PDP "delivery estimate by PIN code" feature, split the way SFRA code should be:

| Layer | File | Owns |
|---|---|---|
| Controller | `int_example/cartridge/controllers/DeliveryEstimate.js` | HTTP only: middleware (HTTPS, CSRF), status codes, JSON shape |
| Controller extension | `int_example/cartridge/controllers/Product.js` | `server.extend(module.superModule)` + `server.append` — adds the CSRF token the PDP needs, nothing else |
| Helper | `int_example/cartridge/scripts/helpers/deliveryEstimateHelpers.js` | Input validation, business rules |
| Service | `int_example/cartridge/scripts/services/deliveryEstimateService.js` | `LocalServiceRegistry` definition, credential use, **log masking** |
| Service config | `site_template/services.xml` | Service, profile (timeout + circuit breaker), credential |

## Rules this example demonstrates

- **Smallest change:** no cache, feature flag or mock — the directive allows those only with a demonstrated requirement.
- **Credentials** come from the BM service credential (`svc.getConfiguration().getCredential()`), never from code or site preferences. `setAuthentication('NONE')` because this API uses a key header, not BASIC.
- **Logging:** `getLogger('delivery-estimate', 'external-api')`; `filterLogMessage` + `getRequestLogMessage` mask keys/tokens; `getResponseLogMessage` logs status and size only.
- **Failures:** `result.ok` is always checked; the browser gets a generic message, never the raw service error.
- **Input:** query parameters are validated in the helper before any product lookup or remote call.

## Deploy and verify

```bash
# int_example must be left of app_storefront_base on the cartridge path
b2c code deploy ./int_example --reload
b2c sites cartridges add int_example --site-id RefArch --position first

# Import the service definition, then set the real credential in Business Manager
b2c job import ./site_template

b2c logs tail --level ERROR
```
