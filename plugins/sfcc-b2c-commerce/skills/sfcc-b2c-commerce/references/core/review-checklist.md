# Review checklist (run before handing back SFCC code)

Answer each line for the code you just wrote. Any "no" is a defect to fix, not a note to add. Then run the completion checks and report format in [directive.md](directive.md), which governs this list.

**Directive**
- [ ] No Git action was performed or suggested; work stops at the working-tree change.
- [ ] Smallest safe diff: nothing that could be deleted, reused or configured instead; base/vendor cartridges untouched.
- [ ] Loggers are `getLogger('kebab-prefix', 'kebab-category')`; new selectors kebab-case; no CSS Grid; accessibility intact.

**Runtime**
- [ ] The file's runtime is identified from its path (`runtimes.md`), and it uses only that runtime's APIs.
- [ ] Every `require('dw/...')` module and method exists in the Script API (check `references/docs/index.md` or the official docs if unsure). No invented methods.
- [ ] Server-side syntax matches the site's compatibility mode (ES5 is always safe).

**Data safety**
- [ ] Writes are inside a transaction; no service call inside a transaction; one unit of work per transaction.
- [ ] Every iterator/writer is closed in `finally` (or in `afterStep` + `catch` for chunk steps).
- [ ] Failures leave data consistent: temp files removed, partial state not committed.

**Security**
- [ ] Input is validated; client-sent prices, totals and status are ignored or recomputed.
- [ ] Storefront routes have HTTPS + CSRF (+ login where account data is involved).
- [ ] Orders are read with `getOrder(orderNo, token)` outside jobs/BM.
- [ ] No secret, token, or PII in logs, ISML, client JS, or committed XML; services mask comm logs.
- [ ] Caching never covers personalized data.

**Orders and payments**
- [ ] Only definitive "not paid" leads to `failOrder`; uncertain outcomes are retried/escalated.
- [ ] State transitions match the verified diagram in `guardrails.md` and are idempotent.

**Config and delivery**
- [ ] XML follows the XSD element order (validate if possible); `steptypes.json` functions match module exports.
- [ ] `b2c` commands and flags exist (`b2c <topic> <command> --help`).
- [ ] The answer says how to deploy and verify (commands, logs to watch).
