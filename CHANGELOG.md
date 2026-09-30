# Changelog

## 2.0.0 — 2026-09-30

Restructured for how agents find, apply and verify guidance.

- **Split** the 660 KB single file into a 72-line `SKILL.md` router plus `references/<topic>/` (37 topics, one `index.md` each, detail files alongside).
- **Rebased** content on upstream `SalesforceCommerceCloud/b2c-developer-tooling@fff7d33` (2026-09-29); the previous copy was from May 2026.
- **Fixed navigation:** every cross-skill link now points to a file in this repo; links to upstream skills that aren't bundled are named as such. 0 broken links or anchors.
- **Corrected** (details in `VERIFICATION.md`): order status transitions and the claim that `undoFailOrder` doesn't exist; deprecated `queryOrders`/`queryOrder` and insecure `getOrder(orderNo)`; `transactional: "true"` and `afterStep` cleanup guidance; metadata XML (`<max-length>`, `<display>`/`<value>` order, unescaped `&`); form XML `default` → `default-value`; six CLI commands/flags (`webdav pull`, `site-import upload`, `mrt env invalidate --path`, `redirect clone --source/--target`, `redirect create --permanent`, redirect default status).
- **Added** `references/core/`: runtimes (server script vs ISML vs browser vs Node), guardrails (transactions, iterator cleanup, sensitive logging, caching, authorization, order/payment state), review checklist.
- **Added** `examples/`: controller → helper → service; chunk job with `steptypes.json` + `jobs.xml`; metadata with import steps; Razorpay payment reconciliation. All XML validates against Salesforce XSDs, all JS typechecks against the Script API types, decision logic and log masking are unit-tested.
- **Added** `evals/`: five tasks for Claude Code and Codex with automated graders.
- **Added** `scripts/verify.sh` + CI: links, XSD, Script API members, CLI commands/flags, steptypes, structure, typecheck, unit tests.
- Added Apache-2.0 `LICENSE` and `NOTICE` with upstream attribution.

## 1.0.0 — 2026-09-30

- Initial release: 37 upstream skills concatenated into one `SKILL.md`.
