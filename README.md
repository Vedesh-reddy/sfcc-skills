# SFCC Skills — Salesforce B2C Commerce for Claude Code & Codex

One consolidated agent skill covering **Salesforce B2C Commerce Cloud (SFCC / Demandware)**. It works with **Claude Code** and **OpenAI Codex** (both use the `SKILL.md` format).

## What's inside

A single `SKILL.md` that merges 37 focused skills, with a router table at the top so the agent jumps straight to the right section.

**b2c CLI operations (18):** code deploys and code versions, sites and cartridge paths, WebDAV, logs, CLI config, jobs, site import/export (IMPEX), Page Designer content export, on-demand sandboxes (ODS), Managed Runtime (MRT / PWA Kit), eCDN, SLAS clients, Account Manager, users and roles, Custom SCAPI status, SCAPI schemas, Script API docs, and CIP analytics.

**Development patterns and APIs (19):** SFRA controllers, ISML templates, forms, localization, Page Designer components, hooks (HookMgr), OrderMgr, custom objects, data querying, CacheMgr, `dw.system.Logger`, custom job steps, web services (LocalServiceRegistry), Custom SCAPI development, Shopper and Admin SCAPI, SLAS auth patterns (OTP, passkeys), Business Manager extensions, and metadata XML.

## Install in Claude Code

Run these inside Claude Code:

```
/plugin marketplace add Vedesh-reddy/sfcc-skills
/plugin install sfcc-b2c-commerce@sfcc-skills
```

Restart Claude Code. The skill loads automatically whenever you work on SFCC.

To get updates later:

```
/plugin marketplace update sfcc-skills
```

## Install in Codex

Codex reads skills from `~/.agents/skills/` (for all projects) or `.agents/skills/` inside a repo (for that project only).

**For all projects:**

```bash
git clone https://github.com/Vedesh-reddy/sfcc-skills.git /tmp/sfcc-skills
mkdir -p ~/.agents/skills/sfcc-b2c-commerce
cp /tmp/sfcc-skills/plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce/SKILL.md ~/.agents/skills/sfcc-b2c-commerce/
```

**For one project only** (run from the project root):

```bash
mkdir -p .agents/skills/sfcc-b2c-commerce
curl -L -o .agents/skills/sfcc-b2c-commerce/SKILL.md \
  https://raw.githubusercontent.com/Vedesh-reddy/sfcc-skills/main/plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce/SKILL.md
```

Restart Codex, then run `/skills` to confirm `sfcc-b2c-commerce` is listed. Codex will use it automatically on SFCC tasks, or you can call it directly with `$sfcc-b2c-commerce`.

## Try it

Ask something like:

- "Deploy my cartridges to the sandbox and activate the code version"
- "Write an SFRA controller that returns JSON for a product quick view"
- "Create a chunk-oriented job step that exports orders to SFTP"
- "Set up a Custom SCAPI endpoint with a custom OAuth scope"

## Requirements

The CLI sections use Salesforce's `b2c` CLI. If it isn't installed globally, run it with `npx @salesforce/b2c-cli <command>`.

## Repo layout

```
.claude-plugin/marketplace.json                          # Claude Code marketplace
plugins/sfcc-b2c-commerce/.claude-plugin/plugin.json     # Plugin manifest
plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce/SKILL.md   # The skill (used by both agents)
```

## Attribution

Content is consolidated from Salesforce's B2C Commerce developer tooling skills. See LICENSE for terms.
