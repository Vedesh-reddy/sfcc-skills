# Verification record

**Verified:** 2026-09-30  
**Content base:** `SalesforceCommerceCloud/b2c-developer-tooling` @ `fff7d3346ab5a78808a62ad1fa655539a6e8b22b` (agent-plugins 1.10.3, 2026-09-29)  
**Script API / XSD / CLI sources:** the same commit (`packages/b2c-script-types`, `packages/b2c-tooling-sdk/data/xsd`, `packages/b2c-cli/src`)  
**Docs consulted:** Script API `dw.order.OrderMgr`, `dw.svc.ServiceCallback`; guides *Create Custom Job Step Types*, *Web Services*, *Script Programming* / *Compatibility Mode Changes* (developer.salesforce.com)

Re-run everything with `scripts/verify.sh` (add `--fetch` the first time).

## Automated checks

| Check | Against | Result |
|---|---|---|
| Relative links and `#anchors` | files in this repo | 0 broken |
| Complete XML examples (docs + example files) | official XSDs (metadata, services, jobs, form, customobject, preferences, catalog, library) | all valid; fragments and elided (`...`) snippets skipped |
| `require('dw/…')` modules + static members in every JS block | official Script API type definitions | all exist |
| Example cartridge code (instance methods too) | Script API types via `tsc --checkJs` | clean |
| Every `b2c …` command line + `--flag` | b2c CLI command sources (incl. aliases) | all exist |
| `steptypes.json` | rules in *Create Custom Job Step Types*; module exports | valid |
| Decision logic + log masking | unit tests (`examples/test/`) | 12/12 |

## Corrections made to upstream content

| File | Was | Now | Source |
|---|---|---|---|
| `references/ordering/index.md` | "There is no `undoFailOrder()`; failed orders cannot be reopened" | `undoFailOrder` turns FAILED → CREATED; can fail with `INVENTORY_RESERVATION_FAILED` / `COUPON_INVALID` and marks the transaction rollback-only | Script API `OrderMgr` |
| same | NEW → FAILED allowed; CANCELLED → NEW via undoCancel; COMPLETED terminal | `failOrder` only on CREATED; `undoCancelOrder` → OPEN; COMPLETED can be cancelled | Script API `OrderMgr` |
| same | `queryOrder`/`queryOrders` listed as normal | marked deprecated → `searchOrder(s)` / `processOrders`; 1000-result Search Service cap; async index lag | Script API `OrderMgr` |
| same | `getOrder(orderNo)` only | `getOrder(orderNo, orderToken)` for storefront/integrations; `SecurityException` behaviour | Script API `OrderMgr` |
| `references/querying-data/PERFORMANCE-APIS.md` | `queryOrders` recommended for non-indexed attributes | deprecated | Script API `OrderMgr` |
| `references/custom-job-steps/CHUNK-ORIENTED.md` | `transactional: "true"` = one transaction per chunk | runs the step as one potentially large transaction; prefer `Transaction` API | job steps guide |
| `references/custom-job-steps/index.md` | cleanup in `afterStep` only | also clean up in `catch` (guide describes `afterStep` as post-success) | job steps guide |
| `references/metadata/*`, `references/site-import-export/METADATA-XML.md` | `<max-length>`; `<value>` before `<display>`; raw `&` | `<field-length>`; `<display>` first; `&amp;` | `metadata.xsd` |
| `references/forms/FORM-XML.md` | `<field default="…">` | `default-value` (`default` is only valid on `<option>`) | `form.xsd` |
| `references/logging/LOG-FILES.md` | `b2c webdav pull` | `b2c webdav ls/get --root=logs` | CLI source |
| `references/sites/index.md` | `b2c site-import upload` | `b2c job import` | CLI source |
| `references/mrt/*` | `env invalidate --path`; `redirect clone --source/--target`; `redirect create --permanent`; "302 is default" | `--pattern` (required); `--from/--to`; `--status 301`; default is 301 | CLI source |

## Not verified (treat with care)

- **Runtime behaviour** that only a live instance shows: whether `afterStep` is invoked with `success=false` (the examples don't depend on it), Search Service limits on your realm, cache eviction timing.
- **SFRA middleware and controller APIs** (`server`, `csrfProtection`, `cache`, `userLoggedIn`): checked against the upstream skill text and the Script API, not against SFRA source (the SFRA repository wasn't accessible from the verification environment).
- **Razorpay API** field names and statuses (`captured`, `authorized`, `failed`, `refunded`, amounts in paise): from Razorpay's public API behaviour, not re-checked against their current docs.
- **Prose claims** in the 37 upstream topics beyond the items above were not individually checked; the automated checks cover code, XML and CLI only.
- **Agent behaviour**: `evals/` must be run with Claude Code and Codex on a developer machine; no results are recorded yet.
