# Example: chunk-oriented job that always releases its resources

Exports online products to `IMPEX/src/feeds/<prefix>_<timestamp>.csv`.

| File | Purpose |
|---|---|
| `int_example_jobs/steptypes.json` | Registers step type `custom.ExampleExportProductFeed` (cartridge **root**, one file per cartridge) |
| `int_example_jobs/cartridge/scripts/steps/exportProductFeed.js` | The chunk module |
| `site_template/jobs.xml` | Job definition `Example-ExportProductFeed` (validated against `jobs.xsd`) |

## What makes it safe

1. **Iterator and writer are always closed.** `closeResources()` is idempotent and runs in `afterStep` *and* in the `catch` of every `read`/`process`/`write` (via `guarded()`), then the error is rethrown so the step ends in `ERROR`. Salesforce's docs describe `afterStep` as running after a successful step, so cleanup can't live there alone.
2. **No partial output.** Rows go to `*.csv.tmp`; the file is renamed only when `afterStep(success)` is true, and deleted on failure.
3. **No giant transaction.** `transactional` is `"false"` (read-only step). A step that writes data should call `Transaction.wrap` inside `write()` so each chunk commits on its own.
4. **`process` filters by returning `undefined`**, which drops the item from the chunk.
5. **`CSVStreamWriter.writeNext` is varargs** (`String...`): pass columns as arguments (`writeNext.apply(csvWriter, row)`), per the Script API types.

## Deploy, import, run

```bash
b2c code deploy ./int_example_jobs --reload
b2c sites cartridges add int_example_jobs --site-id RefArch --position first
b2c job import ./site_template
b2c job run Example-ExportProductFeed --wait --show-log
b2c job log Example-ExportProductFeed --failed
```

Change `site-id="RefArch"` in `jobs.xml` to your site before importing.
