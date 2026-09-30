<!-- source: b2c-job/SKILL.md (Salesforce B2C developer tooling skills) -->
> **Scope:** Run existing B2C Commerce jobs, monitor executions, inspect failures, rebuild search indexes, and import or export site archives with the CLI.

# Run and Monitor Jobs

Use `b2c job` for existing jobs. To create job steps or author `jobs.xml`, use
`references/custom-job-steps/index.md`. If `b2c` is unavailable, use `npx @salesforce/b2c-cli`.

## Configuration and tool choice

CLI and MCP share configuration: `SFCC_*` variables (including project `.env`),
project/shared `dw.json`, and plugins; `package.json` provides nonsecret defaults.
Use `--project-directory` when running outside the target project. Inspect with
`b2c setup inspect --json` or MCP `config_inspect`; both mask secrets by default.
Override configured values only when needed. For resolution issues, use `references/config/index.md`.

No dedicated MCP job tool exists. Prefer these CLI workflows for running/waiting
on jobs and transferring archives. MCP `scapi_search`/`scapi_execute` can compose
supported Admin requests; they do not replace the CLI's archive transfer workflow.

## Run and inspect

```bash
b2c job run my-job --wait --timeout 600
b2c job run my-job --wait -P key=value
b2c job search --job-id my-job --count 5
b2c job wait my-job execution-id --timeout 600
b2c job log my-job --failed
```

`job run` returns immediately unless `--wait` is supplied. For raw system-job
bodies, search indexing, standard step choices, execution deletion, and backend
configuration: [run and monitor](RUN-AND-MONITOR.md).
Deletion removes completed execution records; it does not cancel jobs.

## Site archives

```bash
b2c job import ./archive --show-log
b2c job import ./storefront-export.zip --wait-for-storefront
b2c job export --site MySite --site-data campaigns_and_promotions --output ./export
b2c job export --storefront my-storefront --output ./export
```

Import/export wait by default and transfer files over WebDAV. Jobs prefer SCAPI
(`sfcc.jobs.rw` for writes, `sfcc.jobs` for reads); `--api-backend auto` falls back
on supported SCAPI rejections. See the backend section in the run/monitor reference
if access fails. Check job outcome before retrying a write.

Read only the relevant reference:

- Import remote archives or directory subsets: [import options](IMPORT.md).
- Choose export data units or output paths: [export](EXPORT.md).
- Author/validate XML and verify imported settings: `references/site-import-export/index.md`.
- Apply ordered, tracked migrations: the upstream `b2c-import-set-migrations` skill (not bundled here).

## Output

Normal CLI output suffices for status. For scripting, save large `--json` results
to a file and print selected fields; keep the exit code and inspect failures.
See [export](EXPORT.md), section `compact-results`. Avoid dumping full
execution records or reading both JSON and human output for the same result.
