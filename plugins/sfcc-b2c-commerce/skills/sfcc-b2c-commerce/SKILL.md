---
name: sfcc-b2c-commerce
description: Salesforce B2C Commerce Cloud (SFCC / Demandware) development and operations. Use for ANY SFCC work — SFRA controllers, ISML, forms, hooks, orders and payments (OrderMgr, failOrder, placeOrder, payment reconciliation), custom objects, job steps and steptypes.json, services (LocalServiceRegistry), custom caches, logging, metadata/custom-attribute XML, site import/export, Page Designer, Business Manager extensions, localization, Custom SCAPI, Shopper/Admin SCAPI, SLAS — and the b2c CLI (code deploy, sandboxes/ODS, jobs, WebDAV, logs, MRT/PWA Kit, eCDN, Account Manager, CIP). Trigger on cartridges, dw.* APIs, Business Manager, isml, SFRA or storefront code even when SFCC isn't named.
---

# SFCC / B2C Commerce

Work in three passes: **find** the right guidance, **apply** it with the guardrails, **verify** before answering. Don't answer SFCC questions from memory when a file below covers them — this skill corrects several common errors (see [VERIFICATION.md](VERIFICATION.md)).

## 1. Find

**First, identify the runtime** from the file path: SFCC server script, ISML, storefront browser JS, or Node.js → [references/core/runtimes.md](references/core/runtimes.md). Then open the one or two files for the task:

| Task | Read |
|---|---|
| Controller route, extend a base controller | [controllers](references/controllers/index.md) → `SFRA-PATTERNS.md`; example [controller-helper-service](examples/controller-helper-service/README.md) |
| ISML template, expressions, tags | [isml](references/isml/index.md) |
| Form definition XML | [forms](references/forms/index.md) → `FORM-XML.md` |
| Hooks (order, payment, OCAPI/SCAPI) | [hooks](references/hooks/index.md) → `ORDER-HOOK-LIFECYCLE.md`, `SYSTEM-HOOKS.md` |
| Orders: create, place, fail, cancel, status, payment state | [ordering](references/ordering/index.md) + [guardrails §6](references/core/guardrails.md#6-order-and-payment-state); example [payment-reconciliation](examples/payment-reconciliation/README.md) |
| Query products/orders/profiles, performance | [querying-data](references/querying-data/index.md) |
| Custom objects | [custom-objects](references/custom-objects/index.md) |
| Custom job step (task or chunk), steptypes.json, jobs.xml | [custom-job-steps](references/custom-job-steps/index.md); example [chunk-job](examples/chunk-job/README.md) |
| HTTP/SOAP/FTP service, services.xml, log masking | [webservices](references/webservices/index.md); example [controller-helper-service](examples/controller-helper-service/README.md) |
| Custom cache (CacheMgr) | [custom-caches](references/custom-caches/index.md) |
| Logging (Logger, categories, log files) | [logging](references/logging/index.md) |
| Custom attributes, system/custom object metadata XML | [metadata](references/metadata/index.md); example [metadata](examples/metadata/README.md) |
| Site archive import/export (XML) | [site-import-export](references/site-import-export/index.md) |
| Localization, resource bundles | [localization](references/localization/index.md) |
| Page Designer components | [page-designer](references/page-designer/index.md) |
| Business Manager extension cartridge | [business-manager-extensions](references/business-manager-extensions/index.md) |
| Custom SCAPI endpoint (build) | [custom-api-development](references/custom-api-development/index.md) |
| Shopper / Admin SCAPI clients | [scapi-shopper](references/scapi-shopper/index.md), [scapi-admin](references/scapi-admin/index.md) |
| SLAS login, passkeys, session bridge | [slas-auth-patterns](references/slas-auth-patterns/index.md) |

**`b2c` CLI** (prefix `npx @salesforce/b2c-cli` if not installed; credentials/targets: [config](references/config/index.md)):

| Deploy code, code versions | [code](references/code/index.md) | Run/import/export jobs | [job](references/job/index.md) |
|---|---|---|---|
| Sites, cartridge path | [sites](references/sites/index.md) | Logs (tail/get) | [logs](references/logs/index.md) |
| WebDAV files | [webdav](references/webdav/index.md) | Sandboxes (ODS) | [sandbox](references/sandbox/index.md) |
| Content libraries | [content](references/content/index.md) | MRT / PWA Kit | [mrt](references/mrt/index.md) |
| eCDN | [ecdn](references/ecdn/index.md) | SLAS clients | [slas](references/slas/index.md) |
| Account Manager | [am](references/am/index.md) | BM users & roles | [users-roles](references/users-roles/index.md) |
| Custom SCAPI status | [scapi-custom](references/scapi-custom/index.md) | SCAPI schemas | [scapi-schemas](references/scapi-schemas/index.md) |
| Script API docs lookup | [docs](references/docs/index.md) | Analytics (CIP) | [cip](references/cip/index.md) |

Many tasks span a development file and a CLI file: write a job step → `custom-job-steps` then `job`; write metadata XML → `metadata` then `job` (import); build a Custom SCAPI → `custom-api-development` then `scapi-custom`.

## 2. Apply

Always apply [references/core/guardrails.md](references/core/guardrails.md). The short version:

- **Transactions:** writes inside `Transaction.wrap`; never a service call inside a transaction; one order/chunk per transaction; jobs keep `transactional: "false"`.
- **Cleanup:** close every `SeekableIterator` and writer in `finally` (chunk steps: `afterStep` *and* `catch`).
- **Logging:** no secrets, tokens or PII; services implement `filterLogMessage` / `get*LogMessage`.
- **Caching:** never cache personalized data; custom caches are optional speed-ups.
- **Authorization:** HTTPS + CSRF on routes; `getOrder(orderNo, token)` outside jobs; recompute prices/totals server-side; verify webhook signatures.
- **Orders:** `failOrder` only on definitive non-payment of a `CREATED` order; uncertain → retry then manual review; `undoFailOrder` exists for late captures.

Prefer extending over copying (`server.extend(module.superModule)` + `append`/`prepend`), helpers for logic, services for I/O — mirror the project's existing cartridge conventions when they're visible.

## 3. Verify

Before answering, run [references/core/review-checklist.md](references/core/review-checklist.md). When a tool is available, check instead of guessing:

- Script API: `b2c docs search <Class>` / `b2c docs read <Class>` ([docs](references/docs/index.md)).
- CLI flags: `b2c <topic> <command> --help`.
- XML: validate against the XSD (element order matters).
- Deploy and watch: `b2c code deploy --reload`, `b2c job run <id> --wait --show-log`, `b2c logs tail --level ERROR`.

If something can't be verified, say so in the answer rather than presenting it as fact.
