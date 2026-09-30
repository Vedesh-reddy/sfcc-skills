# Evals: does the agent pick the right guidance and write correct, secure SFCC code?

Five realistic tasks, each graded by automated checks (schema validation, Script API member checks, syntax, and required/forbidden patterns) plus a "guidance selected" score from the `SOURCES.md` the agent writes.

| # | Task | What it catches |
|---|---|---|
| 01 | Chunk job that closes its iterator even when processing fails | Cleanup only in `afterStep`, partial files, `transactional: true` |
| 02 | Review Razorpay reconciliation (buggy fixture) | Failing orders on uncertain status, service call inside a transaction, secrets/PII in logs, deprecated APIs, "`undoFailOrder` doesn't exist" |
| 03 | Custom-attribute metadata XML | `<max-length>`, wrong element order, missing attribute group, wrong import command |
| 04 | Extend an SFRA controller in an existing project | Copying base controllers, ignoring project conventions, logic in controllers |
| 05 | Service that masks credentials in logs | Hardcoded keys, missing log callbacks, unmasked headers |

## Run

```bash
# one-time: fetch Salesforce schemas/types used by the graders
scripts/verify.sh --fetch

# with the skill installed in the agent
evals/run.sh claude
evals/run.sh codex

# grade outputs you produced some other way (expects <dir>/out/01 ... /out/05)
python3 evals/grade.py --work <dir>
```

`run.sh` calls `claude -p --permission-mode acceptEdits` and `codex exec --full-auto`; flags change between CLI versions, so override with `CLAUDE_CMD` / `CODEX_CMD` if needed.

**Baseline:** run once with the skill disabled (Claude Code: `/plugin disable sfcc-b2c-commerce`; Codex: move `~/.agents/skills/sfcc-b2c-commerce` aside) and once enabled. The difference is what the skill is worth; record both in `results/`.

## Reading results

- A failed **check** is a code defect. A low **guidance selected** score with passing checks means the agent got lucky or knew the answer — look at the router in `SKILL.md`.
- Checks are necessary, not sufficient. For task 02 also read `REVIEW.md` against the defect list in `fixtures/razorpay-review/EXPECTED.md`.
- `grade.py` passes 48/48 on reference answers built from `examples/` and fails the unfixed fixture (3/13) — rerun that self-test after changing checks.
