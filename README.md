# SFCC Skills — Salesforce B2C Commerce for Claude Code & Codex

One agent skill for **Salesforce B2C Commerce Cloud (SFCC / Demandware)**, built so the agent **finds** the right guidance, **applies** it safely, and **verifies** its output.

- **Router, not a wall of text:** a 72-line `SKILL.md` sends the agent to the one or two files it needs, out of 37 topic folders.
- **Guardrails:** transactions, iterator cleanup, sensitive logging, caching, authorization, and order/payment state (`references/core/`).
- **Runtime-aware:** separates SFCC server script, ISML, storefront browser JS and Node.js.
- **Verified:** XML against Salesforce XSDs, `dw.*` calls against the Script API types, `b2c` commands against the CLI source. Upstream errors are corrected and recorded in [VERIFICATION.md](plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce/VERIFICATION.md).
- **Complete examples:** controller → helper → service, chunk job + `steptypes.json` + `jobs.xml`, metadata with import steps, Razorpay payment reconciliation.
- **Evals:** five realistic tasks with automated graders for Claude Code and Codex.

## Install in Claude Code

```
/plugin marketplace add Vedesh-reddy/sfcc-skills
/plugin install sfcc-b2c-commerce@sfcc-skills
```

Restart Claude Code. Update later with `/plugin marketplace update sfcc-skills`.

## Install in Codex

Codex reads skills from `~/.agents/skills/` (all projects) or `.agents/skills/` in a repo (one project). Copy the **whole skill folder**: `SKILL.md` links to `references/` and `examples/`.

```bash
git clone https://github.com/Vedesh-reddy/sfcc-skills.git /tmp/sfcc-skills
mkdir -p ~/.agents/skills
rm -rf ~/.agents/skills/sfcc-b2c-commerce
cp -r /tmp/sfcc-skills/plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce ~/.agents/skills/
```

For one project, use `.agents/skills/` in the project root instead of `~/.agents/skills/`. Restart Codex and run `/skills` to confirm `sfcc-b2c-commerce` is listed.

## Layout

```
.claude-plugin/marketplace.json
plugins/sfcc-b2c-commerce/
  .claude-plugin/plugin.json
  skills/sfcc-b2c-commerce/
    SKILL.md              router: find → apply → verify
    VERIFICATION.md       what was checked, what was corrected, what wasn't verified
    references/core/      runtimes, guardrails, review checklist
    references/<topic>/   index.md + detail files (37 topics)
    examples/             4 complete examples + unit tests
evals/                    tasks, fixtures, grader, runner
scripts/                  verify.sh and individual checkers
```

## Verify and evaluate

```bash
scripts/verify.sh --fetch     # downloads pinned Salesforce sources, runs all checks
evals/run.sh claude           # run the eval tasks with Claude Code and grade them
evals/run.sh codex
```

Requires `python3`, `xmllint` (libxml2), `node` 18+, `git`. See [evals/README.md](evals/README.md).

## Updating from upstream

Content comes from `SalesforceCommerceCloud/b2c-developer-tooling`. To move to a newer commit: change `UPSTREAM_SHA` in `scripts/verify.sh`, re-sync the topic files, run `scripts/verify.sh --fetch`, fix what fails, add a `CHANGELOG.md` entry, bump `version` in `plugin.json`.

## License

Apache-2.0. Derived from Salesforce's B2C developer tooling skills (Copyright (c) 2024 Salesforce, Inc.); see [NOTICE](NOTICE).
