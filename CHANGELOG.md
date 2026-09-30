# Changelog

## 2.1.1 — 2026-09-30

- Directive: client-specific cartridge name replaced with the placeholder `app_<brand>`, with a note to substitute the project's custom storefront cartridge.
- Example code brought in line with the directive's comment policy: JSDoc blocks and narrating comments removed; only short *why* comments remain (and one JSDoc type cast the typecheck needs).

## 2.1.0 — 2026-09-30

- **Added the governing directive** (`references/core/directive.md`, verbatim) and made it section 0 of `SKILL.md`: it is read first and overrides every other file. Summarized its non-negotiables in the router (no Git actions, smallest safe diff, read-only base/vendor cartridges, kebab-case categorized logging, no CSS Grid, minimal comments, pre-implementation questions and completion report).
- **Fixed** `guardrails.md`: `Logger.getLogger` takes the file-name prefix first and the category second (it said the reverse).
- Example and fixture loggers renamed to kebab-case `getLogger('prefix', 'category')`; guardrails and review checklist now defer to the directive.
- `scripts/check_structure.py` enforces kebab-case loggers and no CSS Grid in examples, and that the router points to the directive; eval tasks 01, 02, 04, 05 check logger naming.

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
