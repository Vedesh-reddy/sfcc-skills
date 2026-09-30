# Example: controller → helper → service (SFRA)

A PDP "delivery estimate by PIN code" feature, split the way SFRA code should be:

| Layer | File | Owns |
|---|---|---|
| Controller | `int_example/cartridge/controllers/DeliveryEstimate.js` | HTTP only: middleware (HTTPS, CSRF), status codes, JSON shape |
| Controller extension | `int_example/cartridge/controllers/Product.js` | `server.extend(module.superModule)` + `server.append` — never copy base controllers |
| Helper | `int_example/cartridge/scripts/helpers/deliveryEstimateHelpers.js` | Input validation, business rules, custom cache |
| Service | `int_example/cartridge/scripts/services/deliveryEstimateService.js` | `LocalServiceRegistry` definition, credential use, **log masking** |
| Cache config | `int_example/caches.json` + `int_example/package.json` | Custom cache registration (cartridge root, not `cartridge/`) |
| Service config | `site_template/services.xml` | Service, profile (timeout + circuit breaker), credential |

## Rules this example demonstrates

- **Credentials** come from the BM service credential (`svc.getConfiguration().getCredential()`), never from code or site preferences. `setAuthentication('NONE')` because this API uses a key header, not BASIC.
- **Logging**: `filterLogMessage` + `getRequestLogMessage` mask keys/tokens; `getResponseLogMessage` logs status and size only. Custom logger category, no request bodies or PII.
- **Failures**: `result.ok` is always checked; failures are not cached (loader returns `undefined`); the browser gets a generic message, never the raw service error.
- **Input**: query parameters are validated in the helper before any product lookup or remote call.

## Deploy and verify

```bash
# 1. Upload code (int_example must be left of app_storefront_base on the cartridge path)
b2c code deploy ./int_example --reload
b2c sites cartridges add int_example --site-id RefArch --position first

# 2. Import the service definition, then set the real credential in Business Manager
b2c job import ./site_template

# 3. Watch for errors while testing the PDP
b2c logs tail --level ERROR
```

Create the site preference `deliveryEstimateEnabled` (Boolean) on `SitePreferences` — see `../metadata/` for the XML pattern.
