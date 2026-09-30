---
name: sfcc-b2c-commerce
description: Complete reference for Salesforce B2C Commerce Cloud (SFCC / Demandware) development and operations. Use this skill for ANY SFCC / B2C Commerce work, including the b2c CLI (@salesforce/b2c-cli) for code deploys, sandboxes (ODS), jobs, site import/export, WebDAV, logs, MRT/PWA Kit, eCDN, SLAS, Account Manager, SCAPI schemas and CIP analytics; and cartridge development: SFRA controllers, ISML templates, forms, hooks, custom objects, OrderMgr, product/order queries, CacheMgr, dw.system.Logger, custom job steps, LocalServiceRegistry web services, Custom SCAPI endpoints, Shopper/Admin SCAPI, SLAS auth patterns, Page Designer, Business Manager extensions, metadata XML and localization. Trigger even when the user only mentions cartridges, Demandware, Business Manager, dw.* APIs, isml, sandboxes or storefront code.
---

# Salesforce B2C Commerce (SFCC) — Consolidated Skill

This file merges 37 individual `b2c-*` skills into one document. Every original SKILL.md body and every file from each skill's `references/` folder is included verbatim below (only heading levels were shifted so the document nests cleanly). Evaluation files (`evals/trigger-evals.json`) were dropped because they are test data, not guidance.

## How to use this file

1. Find the task in the **Router** table below and jump to that section.
2. Read the section's main guidance first; its **Reference** subsections hold the deep detail (XML schemas, full command lists, API patterns).
3. Many tasks span two sections — a *development* section (how to write the code) and a *CLI* section (how to deploy or run it). Examples: write a job step (`b2c-custom-job-steps`) then run it (`b2c-job`); write a Custom SCAPI endpoint (`b2c-custom-api-development`) then check registration (`b2c-scapi-custom`); write metadata XML (`b2c-metadata`) then import it (`b2c-site-import-export`).

## The b2c CLI in one paragraph

CLI sections use Salesforce's `b2c` command-line tool. If it isn't installed globally, prefix commands with `npx @salesforce/b2c-cli` (e.g. `npx @salesforce/b2c-cli code deploy`). Credentials and instance settings (server, code version, OAuth client ID/secret, WebDAV credentials) are resolved from config files, environment variables and flags — see the `b2c-config` section when a command can't find credentials or targets the wrong instance.

## Router


### CLI operations (18)

| Section | What it covers |
|---|---|
| [`b2c-am`](#b2c-am) | Manage Account Manager resources (API clients, users, roles, organizations) with the b2c cli. Use this skill whenever working with SFCC/B2C Commerce user management, role assignments, API client provisioning, organization lookup, user onboarding/offboarding, or auditing Account Manager permissions. Also use when granting Business Manager roles, creating API clients for CI/CD, or managing tenant-scoped role assignments. |
| [`b2c-cip`](#b2c-cip) | Run Commerce Intelligence Platform (CIP/CCAC) analytics reports, metadata discovery, and SQL queries with the b2c cli. Always reference when using the CLI to run analytics reports, query Commerce Intelligence data, discover CIP tables, or export KPI metrics. Also use when users ask about sales, search, or payment analytics. |
| [`b2c-code`](#b2c-code) | Deploy and manage code versions/cartridges on B2C Commerce instances/sandboxes with the b2c cli. Always reference when using the CLI to upload cartridges, deploy code, activate code versions, manage code versions, or watch for file changes during development. |
| [`b2c-config`](#b2c-config) | View and debug b2c CLI configuration and understand where credentials come from. Always reference when using the CLI to inspect configuration, manage instances, retrieve OAuth tokens, or set up IDE integration. Also use when authentication fails, connection errors occur, or the wrong instance is being used. |
| [`b2c-content`](#b2c-content) | Export, list, and validate Page Designer pages and metadefinitions from B2C Commerce content libraries. Always reference when using the CLI to export, list, or validate Page Designer content, discover page IDs, or work with content library assets. Covers page designer JSON, content migration, library XML, content archive, site content, component export, and offline export. |
| [`b2c-docs`](#b2c-docs) | Search and read B2C Commerce (SFCC/Demandware) Script API documentation and XSD schemas with the b2c cli. Always reference when using the CLI to search or read Script API documentation, look up dw.* classes, or browse XSD schemas. Also use when writing B2C scripts, answering "how do I" questions about URLs/products/orders, or verifying class methods and properties. |
| [`b2c-ecdn`](#b2c-ecdn) | Manage B2C Commerce eCDN (embedded Content Delivery Network / edge CDN, powered by Cloudflare) settings with the b2c CLI. Use for CDN zone management, cache purging, SSL certificate provisioning, WAF rules, firewall rules, rate limiting, logpush, Page Shield, MRT routing, mTLS, cipher suites, origin headers, and speed optimization. |
| [`b2c-job`](#b2c-job) | Run and monitor existing (B2C/demandware/SFCC) jobs using the b2c cli, import/export site archives (IMPEX). Always reference when using the CLI to run jobs, import or export site archives, check job execution status, or trigger search indexing. For creating new jobs, use b2c-custom-job-steps skill instead. |
| [`b2c-logs`](#b2c-logs) | Retrieve or monitor logs from B2C Commerce instances with the b2c cli. Always reference when using the CLI to fetch logs, search log entries, filter by level/time, or tail logs in real-time. Also use when a user reports errors, broken functionality, or issues with controllers, script APIs, custom API backends, jobs, or other SFCC server-side components. |
| [`b2c-mrt`](#b2c-mrt) | Deploy and manage (B2C/SFCC/Demandware) Managed Runtime (MRT) storefronts using the b2c cli. Always reference when using the CLI to deploy MRT bundles, manage MRT environments, set environment variables, configure redirects, or manage MRT projects and organizations. |
| [`b2c-sandbox`](#b2c-sandbox) | Create and manage (B2C/SFCC/Demandware) on-demand sandboxes (ODS) with the b2c cli. Always reference when using the CLI to create, start, stop, restart, delete, or list on-demand sandboxes (ODS) and development instances. |
| [`b2c-scapi-custom`](#b2c-scapi-custom) | Check Custom SCAPI (B2C/SFCC/Demandware) endpoint registration status with the b2c cli. Always reference when using the CLI to check custom API endpoint status, verify custom API deployment, or debug "endpoint not found" errors. For creating new custom APIs, use b2c-custom-api-development skill instead. |
| [`b2c-scapi-schemas`](#b2c-scapi-schemas) | Browse and retrieve (B2C/SFCC/Demandware) SCAPI OpenAPI schemas with the b2c cli. Always reference when using the CLI to browse SCAPI schemas, check API request/response formats, explore available endpoints, or understand SCAPI data models. |
| [`b2c-site-import-export`](#b2c-site-import-export) | Work with (B2C/SFCC/Demandware) site archive import archives and metadata XML patterns with the b2c cli. Always reference when using the CLI to work with site archive imports, add custom attributes, create system object extensions, configure site preferences, or understand import/export XML schemas. |
| [`b2c-sites`](#b2c-sites) | List and manage storefront sites and cartridge paths on B2C Commerce (SFCC/Demandware) instances with the b2c cli. Always reference when using the CLI to list storefront sites, find site IDs, check site status, view storefront configuration, site settings, channel IDs, or get a site list, or manage the ordered list of active cartridges on a site or Business Manager. |
| [`b2c-slas`](#b2c-slas) | Manage SLAS (Shopper Login and API Access Service) clients for B2C Commerce (SFCC/Demandware) with the b2c cli. Always reference when using the CLI to create, update, list, or delete SLAS clients, manage shopper OAuth scopes (including custom scopes like c_loyalty), or configure shopper authentication for PWA/headless. SLAS is for shopper (customer) authentication, not admin APIs. |
| [`b2c-users-roles`](#b2c-users-roles) | Manage users and roles with the b2c cli. Covers Account Manager (AM) user CRUD, AM role grant/revoke with scoping, AM organizations, AM API clients, and Business Manager (BM) instance-level role CRUD, user assignment, and permissions. Use when managing users, roles, permissions, organizations, or API clients in Account Manager or Business Manager. |
| [`b2c-webdav`](#b2c-webdav) | List, upload, download, and manage files on B2C Commerce instances via WebDAV with the b2c cli. Always reference when using the CLI to upload or download files via WebDAV, manage IMPEX directories, create remote directories, or zip/unzip remote files. For log exploration and tailing, use b2c-logs instead. |

### Development patterns & APIs (19)

| Section | What it covers |
|---|---|
| [`b2c-business-manager-extensions`](#b2c-business-manager-extensions) | Create Business Manager extension cartridges for B2C Commerce. Use when building admin tools, BM menu items, or custom BM pages (bm_* cartridges). Covers bm_extensions.xml, menu items, dialog actions, and form extensions. |
| [`b2c-controllers`](#b2c-controllers) | Create storefront controllers in SFRA or classic B2C Commerce patterns. Use when building pages, handling form submissions, creating AJAX endpoints, or working with server.get/server.post, res.render, res.json, and middleware chains. Also covers URLUtils for URL generation. |
| [`b2c-custom-api-development`](#b2c-custom-api-development) | Develop Custom SCAPI endpoints for B2C Commerce. Use when creating REST APIs, defining api.json routes, writing schema.yaml (OAS 3.0), or building headless commerce integrations. Covers cartridge structure, endpoint implementation, and OAuth scope configuration. |
| [`b2c-custom-caches`](#b2c-custom-caches) | Implement custom caching with CacheMgr in B2C Commerce. Use when adding application-level caching, cache invalidation, or optimizing performance with custom cache regions. Covers cache definition JSON, CacheMgr API, and cache entry lifecycle. |
| [`b2c-custom-job-steps`](#b2c-custom-job-steps) | Create custom job steps for B2C Commerce batch processing. Use when writing scheduled tasks, data sync jobs, import/export scripts, or any server-side batch processing code. Covers steptypes.json, chunk-oriented processing, and task-oriented execution. For running existing jobs, use b2c-job instead. |
| [`b2c-custom-objects`](#b2c-custom-objects) | Work with custom objects in B2C Commerce using Script API and OCAPI. Use when storing custom business data, querying custom objects, implementing data persistence, or creating site-scoped or global data stores. Covers CustomObjectMgr, OCAPI Data API, search queries, and Shopper Custom Objects API. |
| [`b2c-forms`](#b2c-forms) | B2C Commerce form development including form XML definitions, ISML form rendering, dw.forms API, form groups, form lists, form actions, form validation, server-side processing, and template rendering. Covers checkout forms, account forms, address forms, and any form with field definitions or validation rules. |
| [`b2c-hooks`](#b2c-hooks) | Implement hooks using HookMgr and extension points in B2C Commerce. Use when extending OCAPI/SCAPI behavior, handling system events like order calculation, or registering custom hook implementations. Covers hooks.json, dw.ocapi hooks, and custom extension points. |
| [`b2c-isml`](#b2c-isml) | Work with ISML templates in B2C Commerce. Use when writing storefront templates, using isprint/isset/isloop tags, understanding ISML expressions (${...}), or creating custom template modules. Covers tag syntax, expression language, and template includes. |
| [`b2c-localization`](#b2c-localization) | Localize templates, forms, and content in B2C Commerce. Use when adding translations, working with resource bundles (*.properties files), using Resource.msg or Resource.msgf, or implementing multi-locale/multi-language/multi-country support. Covers i18n, internationalization, translation files, locale folders, string externalization, and date/currency formatting. |
| [`b2c-logging`](#b2c-logging) | Implement logging in B2C Commerce scripts using dw.system.Logger. Use when adding debug output, error tracking, or custom log files to server-side code. Covers getLogger, log categories, log levels (debug, info, warn, error, fatal), and custom named log files. |
| [`b2c-metadata`](#b2c-metadata) | Work with B2C Commerce site metadata XML for custom attributes and object types. Use when defining custom attributes on products/orders/customers, creating custom object types, or setting site preferences via XML import. Covers site import, site archive, system object extensions, system-objecttype-extensions.xml, custom-objecttype-definitions.xml, Business Manager attributes, BM configuration, and data model definitions. |
| [`b2c-ordering`](#b2c-ordering) | Work with orders using OrderMgr API in B2C Commerce. Use when creating orders, managing order status, handling order failures, or implementing checkout flows. Covers order lifecycle, status transitions, async order processing, and order queries. |
| [`b2c-page-designer`](#b2c-page-designer) | Create Page Designer pages and components in B2C Commerce. Use when building visual merchandising tools, content slots, or experience API integrations. Covers page types, component types, regions, attribute definitions, component type ID and subfolders, enum and custom/color attribute pitfalls, and troubleshooting when a component does not appear in the editor. |
| [`b2c-querying-data`](#b2c-querying-data) | Best practices for querying products, orders, customers, and system objects in B2C Commerce. Use when writing product searches, order queries, customer/profile lookups, replacing database-intensive APIs, improving search performance, or diagnosing slow category/search pages. Covers ProductSearchModel, OrderMgr, CustomerMgr, SystemObjectMgr, index-friendly vs database-intensive APIs, and query performance pitfalls. For order lifecycle and status management, use b2c-ordering instead. For custom object CRUD, use b2c-custom-objects instead. |
| [`b2c-scapi-admin`](#b2c-scapi-admin) | Consume SCAPI Admin APIs for backend integrations and data management. Use when building inventory sync, order management, catalog updates, or customer data integrations. Covers Account Manager OAuth, admin scopes, and common integration patterns. |
| [`b2c-scapi-shopper`](#b2c-scapi-shopper) | Consume standard Shopper Commerce APIs (SCAPI) for headless storefronts. Use when building PWA/composable commerce, accessing products, search, baskets, orders, or customer data via SCAPI. Covers authentication with SLAS, checkout flows, performance optimization, and Shopper Context API. |
| [`b2c-slas-auth-patterns`](#b2c-slas-auth-patterns) | Implement advanced SLAS authentication patterns in B2C Commerce. Use when implementing passwordless login (email OTP, SMS OTP, passkeys), session bridging between PWA and SFRA, hybrid authentication, token refresh, or trusted system authentication. Covers authentication flows, token management, and JWT validation. |
| [`b2c-webservices`](#b2c-webservices) | Implement web service integrations in B2C Commerce using LocalServiceRegistry. Use when calling external APIs, configuring service credentials in services.xml, handling HTTP requests/responses, or implementing circuit breakers. Covers HTTP, SOAP, FTP, and SFTP services. |

---


# Part 1 — CLI operations


<a id="b2c-am"></a>
## b2c-am

**When to use:** Manage Account Manager resources (API clients, users, roles, organizations) with the b2c cli. Use this skill whenever working with SFCC/B2C Commerce user management, role assignments, API client provisioning, organization lookup, user onboarding/offboarding, or auditing Account Manager permissions. Also use when granting Business Manager roles, creating API clients for CI/CD, or managing tenant-scoped role assignments.

## B2C Account Manager Skill

Use the `b2c am` commands to manage Account Manager resources: API clients, users, roles, and organizations.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli am clients list`).

### Authentication

Account Manager commands work out of the box with no configuration. The CLI uses a built-in public client and opens a browser for login.

- **Zero-config (browser login):** Default. Just run the commands -- the CLI opens a browser for login.
- **Client credentials:** For CI/CD and automation. Pass `--client-id` and `--client-secret` (or set `SFCC_CLIENT_ID` and `SFCC_CLIENT_SECRET` env vars).
- **Force browser login (`--user-auth`):** When client credentials are configured but you need browser-based login (required for org and client management).

#### Role Requirements

| Operations | Client Credentials (roles on API client) | User Auth (roles on user account) |
|---|---|---|
| Users & Roles | User Administrator | Account Administrator or User Administrator |
| Organizations | Not supported -- use `--user-auth` | Account Administrator |
| API Clients | Not supported -- use `--user-auth` | Account Administrator or API Administrator |

Organization and API client management are only available with user authentication.

### API Clients

#### List Clients

```bash
b2c am clients list

# with pagination
b2c am clients list --size 50 --page 2

# JSON output
b2c am clients list --json
```

#### Get Client

```bash
# by UUID
b2c am clients get <api-client-id>

# with expanded organizations and roles
b2c am clients get <api-client-id> --expand organizations --expand roles
```

#### Create Client

Clients are created inactive by default. Requires user auth.

```bash
b2c am clients create \
  --name "My API Client" \
  --orgs <org-id> \
  --password "securePassword123"

# with roles, role tenant filter, and redirect URLs
b2c am clients create \
  --name "CI/CD Pipeline" \
  --orgs <org-id> \
  --password "securePassword123" \
  --roles SALESFORCE_COMMERCE_API \
  --role-tenant-filter "SALESFORCE_COMMERCE_API:zzxy_prd" \
  --redirect-urls "https://example.com/callback" \
  --active
```

#### Update Client

Partial update -- only specified fields are changed.

```bash
b2c am clients update <api-client-id> --name "New Name"
b2c am clients update <api-client-id> --active
```

#### Change Client Password

```bash
b2c am clients password <api-client-id> --current "oldPass" --new "newSecurePass123"
```

#### Delete Client

Client must be disabled for 7+ days before deletion. Destructive operation (safe mode check).

```bash
b2c am clients delete <api-client-id>
```

### Users

#### List Users

```bash
b2c am users list

# with extended columns (roles, organizations)
b2c am users list --extended

# JSON output with pagination
b2c am users list --size 100 --json
```

#### Get User

```bash
b2c am users get user@example.com

# with expanded roles and organizations
b2c am users get user@example.com --expand-all
```

#### Create User

```bash
b2c am users create \
  --org "My Organization" \
  --mail user@example.com \
  --first-name Jane \
  --last-name Doe
```

The `--org` flag accepts either an org ID or org name. Users are created in INITIAL state with no roles.

#### Update User

```bash
b2c am users update user@example.com --first-name Janet --last-name Smith
```

#### Delete User

Soft-deletes by default. Use `--purge` for hard delete (user must already be in DELETED state).

```bash
# soft delete
b2c am users delete user@example.com

# hard delete (purge)
b2c am users delete developer@example.com --purge
```

#### Reset User Password

Resets password to INITIAL state, clearing expiration. Destructive operation (safe mode check).

```bash
b2c am users reset user@example.com
```

### Roles

#### List Roles

```bash
b2c am roles list

# filter by target type
b2c am roles list --target-type User
b2c am roles list --target-type ApiClient
```

#### Get Role

```bash
b2c am roles get bm-admin
b2c am roles get SLAS_ORGANIZATION_ADMIN
```

#### Grant Role to User

```bash
b2c am roles grant user@example.com --role bm-admin

# with tenant scope
b2c am roles grant user@example.com --role bm-admin --scope zzzz_001,zzzz_002
```

#### Revoke Role from User

```bash
# revoke entire role
b2c am roles revoke user@example.com --role bm-admin

# revoke specific tenant scopes only
b2c am roles revoke user@example.com --role bm-admin --scope zzzz_001
```

### Organizations

#### List Organizations

```bash
b2c am orgs list

# all organizations (max page size)
b2c am orgs list --all

# extended columns
b2c am orgs list --extended
```

#### Get Organization

Accepts org ID or name.

```bash
b2c am orgs get <org-id>
b2c am orgs get "My Organization"
```

### Common Workflows

#### User Onboarding

```bash
# Create the user
b2c am users create --org $ORG_ID --mail developer@example.com \
  --first-name Alex --last-name Developer

# Grant Business Manager Admin role scoped to a specific tenant
b2c am roles grant developer@example.com --role bm-admin --scope zzxy_prd
```

#### User Offboarding

```bash
# Revoke roles
b2c am roles revoke developer@example.com --role bm-admin

# Soft delete the user
b2c am users delete developer@example.com

# Permanent deletion (user must be in DELETED state first)
b2c am users delete developer@example.com --purge
```

#### Bulk Operations with JSON

```bash
# Export all users as JSON
b2c am users list --size 4000 --json

# Pipe to jq for filtering
b2c am users list --json | jq '.[] | select(.userState == "ACTIVE")'
```

### Common Patterns

All `am` commands support `--json` for programmatic output. List commands support `--columns`, `--extended`, `--size`, and `--page` for pagination and column control.

Destructive operations (user delete, user reset, client delete) check safe mode. Only delete or purge users when explicitly requested.

#### More Commands

See `b2c am --help` for a full list of available commands and options.

---


<a id="b2c-cip"></a>
## b2c-cip

**When to use:** Run Commerce Intelligence Platform (CIP/CCAC) analytics reports, metadata discovery, and SQL queries with the b2c cli. Always reference when using the CLI to run analytics reports, query Commerce Intelligence data, discover CIP tables, or export KPI metrics. Also use when users ask about sales, search, or payment analytics.

## B2C CIP Skill

Use `b2c cip` commands to query B2C Commerce Intelligence (CIP), also known as Commerce Cloud Analytics (CCAC).

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli`.

### Command Structure

```text
cip
├── tables                        - list metadata catalog tables
├── describe <table>              - describe table columns
├── query                         - raw SQL execution
└── report                        - curated report topic
    ├── sales-analytics
    ├── sales-summary
    ├── ocapi-requests
    ├── top-selling-products
    ├── product-co-purchase-analysis
    ├── promotion-discount-analysis
    ├── search-query-performance
    ├── payment-method-performance
    ├── customer-registration-trends
    └── top-referrers
```

### Requirements

- OAuth client credentials: `--client-id`, `--client-secret`
- CIP tenant: `--tenant-id` (or `--tenant`)
- API client has `Salesforce Commerce API` role with tenant filter for your instance

Optional:

- `--cip-host` (or `SFCC_CIP_HOST`) to override the default host
- `--staging` (or `SFCC_CIP_STAGING`) to force staging analytics host

::: warning Availability
This feature is typically used with production analytics tenants (for example `abcd_prd`).

Starting with release 26.1, reports and dashboards data can also be enabled for non-production instances (ODS/dev/staging and designated test realms) using the **Enable Reports & Dashboards Data Tracking** feature switch.

Reports & Dashboards non-production URL: `https://ccac.stg.analytics.commercecloud.salesforce.com`
:::

### Quick Workflow

1. Discover available tables (`b2c cip tables`) or curated reports (`b2c cip report --help`).
2. Use `b2c cip describe <table>` or report `--describe` to inspect structure/parameters.
3. Use report `--sql` to preview generated SQL.
4. Pipe SQL into `cip query` when you need custom execution/output handling.

### Metadata Discovery Examples

```bash
# List warehouse tables
b2c cip tables --tenant-id abcd_prd --client-id <client-id> --client-secret <client-secret>

# Filter table names
b2c cip tables --tenant-id abcd_prd --pattern "ccdw_aggr_%" --client-id <client-id> --client-secret <client-secret>

# Describe table columns
b2c cip describe ccdw_aggr_ocapi_request --tenant-id abcd_prd --client-id <client-id> --client-secret <client-secret>
```

### Known Tables

For an efficient table catalog grouped by aggregate/dimension/fact families, use:

- `references/KNOWN_TABLES.md`

For a general-purpose starter query pack with ready-to-run SQL patterns, use:

- `references/STARTER_QUERIES.md`

The list is derived from official JDBC documentation and intended as a quick discovery aid.

### Curated Report Examples

```bash
# Show report commands
b2c cip report --help

# Run a report
b2c cip report sales-analytics \
  --site-id Sites-RefArch-Site \
  --from 2025-01-01 \
  --to 2025-01-31 \
  --tenant-id abcd_prd \
  --client-id <client-id> \
  --client-secret <client-secret>

# Show report parameter contract
b2c cip report top-referrers --describe

# Print generated SQL and stop
b2c cip report top-referrers --site-id Sites-RefArch-Site --limit 25 --sql

# Force staging analytics host
b2c cip report top-referrers --site-id Sites-RefArch-Site --limit 25 --staging --sql
```

#### SQL Pipeline Pattern

```bash
b2c cip report sales-analytics --site-id Sites-RefArch-Site --sql \
  | b2c cip query --tenant-id abcd_prd --client-id <client-id> --client-secret <client-secret>
```

### Raw SQL Query Examples

```bash
b2c cip query \
  --tenant-id abcd_prd \
  --client-id <client-id> \
  --client-secret <client-secret> \
  "SELECT * FROM ccdw_aggr_sales_summary LIMIT 10"
```

You can also use:

- `--file ./query.sql`
- pipe query text from standard input (for example `cat query.sql | b2c cip query ...`)

#### Date Placeholders

`b2c cip query` supports placeholder replacement:

- `<FROM>` with `--from YYYY-MM-DD`
- `<TO>` with `--to YYYY-MM-DD`
- `--from` defaults to first day of current month
- `--to` defaults to today

If you provide `--site-id`, the common CIP format is `Sites-{siteId}-Site`. The command warns when `siteId` does not match that pattern but still runs with your input.

### Output Formats

Both raw query and report commands support:

- `--format table` (default)
- `--format csv`
- `--format json`
- `--json` (global JSON mode)

### Service Limits and Best Practices

The underlying JDBC analytics service has strict limits. Keep requests scoped:

- avoid broad `SELECT *` queries
- use narrow date ranges and incremental windows
- prefer aggregate tables when possible
- use report commands for common KPI workflows

Limits can change over time. Use the official JDBC access guide for current NFR limits:

- https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_access_guide.html

### Troubleshooting

- **`tenant-id is required`**: set `--tenant-id` (or `SFCC_TENANT_ID`)
- **Auth method error**: CIP supports client credentials only; remove `--user-auth`
- **403/unauthorized**: verify API client role and tenant filter include target instance
- **Rate/timeout failures**: reduce date window, select fewer columns, query aggregate tables

For full command reference, use `b2c cip --help` and [CLI docs](/cli/cip).

### Reference: KNOWN_TABLES.md

#### Known CIP Tables

This quick catalog is based on the official JDBC schema documentation.

Use this as a starting point. Always verify actual availability in your tenant with:

```bash
b2c cip tables --tenant-id <tenant-id>
b2c cip describe <table-name> --tenant-id <tenant-id>
```

Official schema references:

- https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_lakehouse_schema.html
- https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_aggregate_tables.html
- https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_dimension_tables.html
- https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_fact_tables.html

##### Aggregate Tables (`ccdw_aggr_*`)

Best for KPI/reporting use cases (already summarized):

- [`ccdw_aggr_sales_summary`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_sales_summary.html)
- [`ccdw_aggr_product_sales_summary`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_product_sales_summary.html)
- [`ccdw_aggr_promotion_sales_summary`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_promotion_sales_summary.html)
- [`ccdw_aggr_payment_sales_summary`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_payment_sales_summary.html)
- [`ccdw_aggr_registration`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_registration.html)
- [`ccdw_aggr_search`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_search.html)
- [`ccdw_aggr_search_query`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_search_query.html)
- [`ccdw_aggr_search_conversion`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_search_conversion.html)
- [`ccdw_aggr_ocapi_request`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_ocapi_request.html)
- [`ccdw_aggr_scapi_request`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_scapi_request.html)
- [`ccdw_aggr_visit`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit.html)
- [`ccdw_aggr_visit_checkout`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit_checkout.html)
- [`ccdw_aggr_visit_referrer`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit_referrer.html)
- [`ccdw_aggr_visit_ip_address`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit_ip_address.html)
- [`ccdw_aggr_visit_user_agent`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit_user_agent.html)
- [`ccdw_aggr_visit_robot`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_visit_robot.html)
- [`ccdw_aggr_controller_request`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_controller_request.html)
- [`ccdw_aggr_include_controller_request`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_include_controller_request.html)
- [`ccdw_aggr_source_code_activation`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_source_code_activation.html)
- [`ccdw_aggr_source_code_sales`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_source_code_sales.html)
- [`ccdw_aggr_product_cobuy`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_product_cobuy.html)
- [`ccdw_aggr_product_recommendation`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_product_recommendation.html)
- [`ccdw_aggr_product_recommendation_recommender`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_product_recommendation_recommender.html)
- [`ccdw_aggr_detail_product_recommendation_recommender`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_detail_product_recommendation_recommender.html)
- [`ccdw_aggr_daily_detail_product_recommendation_recommender`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_daily_detail_product_recommendation_recommender.html)
- [`ccdw_aggr_inventory_by_location`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_inventory_by_location.html)
- [`ccdw_aggr_inventory_by_location_group`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_inventory_by_location_group.html)
- [`ccdw_aggr_promotion_activation`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_promotion_activation.html)
- [`ccdw_aggr_promotion_cobuy`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_aggr_promotion_cobuy.html)

##### Dimension Tables (`ccdw_dim_*`)

Reference/context entities used for joins:

- [`ccdw_dim_site`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_site.html)
- [`ccdw_dim_product`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_product.html)
- [`ccdw_dim_customer`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_customer.html)
- [`ccdw_dim_campaign`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_campaign.html)
- [`ccdw_dim_coupon`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_coupon.html)
- [`ccdw_dim_promotion`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_promotion.html)
- [`ccdw_dim_payment_method`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_payment_method.html)
- [`ccdw_dim_business_channel`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_business_channel.html)
- [`ccdw_dim_locale`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_locale.html)
- [`ccdw_dim_geography`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_geography.html)
- [`ccdw_dim_currency`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_currency.html)
- [`ccdw_dim_source_code_group`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_source_code_group.html)
- [`ccdw_dim_location`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_location.html)
- [`ccdw_dim_location_group`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_location_group.html)
- [`ccdw_dim_date`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_date.html)
- [`ccdw_dim_time`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_time.html)
- [`ccdw_dim_timezone`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_timezone.html)
- [`ccdw_dim_user_agent`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_dim_user_agent.html)

##### Fact Tables (`ccdw_fact_*`)

Most granular event-level tables (typically larger):

- [`ccdw_fact_line_item`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_line_item.html)
- [`ccdw_fact_order_payments`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_order_payments.html)
- [`ccdw_fact_customer_registration`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_customer_registration.html)
- [`ccdw_fact_customer_list_snapshot`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_customer_list_snapshot.html)
- [`ccdw_fact_promotion_line_item`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_promotion_line_item.html)
- [`ccdw_fact_promotion_activation`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_promotion_activation.html)
- [`ccdw_fact_source_codes_activation`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_source_codes_activation.html)
- [`ccdw_fact_inventory_record_snapshot`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_inventory_record_snapshot.html)
- [`ccdw_fact_inventory_record_snapshot_hourly`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_inventory_record_snapshot_hourly.html)
- [`ccdw_fact_realtime_metric`](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/jdbc_ccdw_fact_realtime_metric.html)

##### Practical Starters

When users ask for common analysis, start with:

- **Sales trends:** `ccdw_aggr_sales_summary`
- **Product performance:** `ccdw_aggr_product_sales_summary`, join `ccdw_dim_product`
- **Promotion impact:** `ccdw_aggr_promotion_sales_summary`, join `ccdw_dim_promotion`
- **Search conversion:** `ccdw_aggr_search_conversion`, `ccdw_aggr_search_query`
- **Traffic source:** `ccdw_aggr_visit_referrer`
- **API performance:** `ccdw_aggr_ocapi_request`, `ccdw_aggr_scapi_request`

##### Notes

- Some doc pages may contain naming variance/typos (for example `..._couse` vs `..._cobuy`). Prefer actual tenant metadata output from `cip tables`.
- Non-table helper objects may appear in some tenants (for example `all_calcite_types`).

### Reference: STARTER_QUERIES.md

#### CIP Starter Queries

Use these as general-purpose starting points for exploration and troubleshooting.

Defaults used in examples:

- `siteId`: `Sites-RefArch-Site`
- keep `LIMIT` clauses to stay lightweight

##### 1) Recent Daily Sales Snapshot

```sql
SELECT submit_date, num_orders, std_revenue, std_tax, std_shipping
FROM ccdw_aggr_sales_summary
ORDER BY submit_date DESC
LIMIT 20
```

##### 2) Sales by Site (Joined)

```sql
SELECT ss.submit_date, ds.nsite_id, SUM(ss.num_orders) AS orders, SUM(ss.std_revenue) AS revenue
FROM ccdw_aggr_sales_summary ss
JOIN ccdw_dim_site ds ON ss.site_id = ds.site_id
WHERE ds.nsite_id = 'Sites-RefArch-Site'
GROUP BY ss.submit_date, ds.nsite_id
ORDER BY ss.submit_date DESC
LIMIT 30
```

##### 3) Top-Selling Products by Revenue

```sql
SELECT p.nproduct_id, p.product_display_name, SUM(pss.std_revenue) AS revenue, SUM(pss.num_units) AS units
FROM ccdw_aggr_product_sales_summary pss
JOIN ccdw_dim_product p ON p.product_id = pss.product_id
JOIN ccdw_dim_site s ON s.site_id = pss.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY p.nproduct_id, p.product_display_name
ORDER BY revenue DESC
LIMIT 25
```

##### 4) Promotion Impact Summary

```sql
SELECT p.promotion_class, SUM(pss.std_revenue) AS revenue, SUM(pss.std_total_discount) AS discount
FROM ccdw_aggr_promotion_sales_summary pss
JOIN ccdw_dim_promotion p ON p.promotion_id = pss.promotion_id
JOIN ccdw_dim_site s ON s.site_id = pss.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY p.promotion_class
ORDER BY revenue DESC
LIMIT 20
```

##### 5) OCAPI Request Volume

```sql
SELECT request_date, api_name, api_resource, SUM(num_requests) AS total_requests, SUM(response_time) AS total_response_time
FROM ccdw_aggr_ocapi_request
GROUP BY request_date, api_name, api_resource
ORDER BY request_date DESC, total_requests DESC
LIMIT 25
```

##### 6) SCAPI Request Volume

```sql
SELECT request_date, api_name, api_resource, SUM(num_requests) AS total_requests, SUM(response_time) AS total_response_time
FROM ccdw_aggr_scapi_request
GROUP BY request_date, api_name, api_resource
ORDER BY request_date DESC, total_requests DESC
LIMIT 25
```

##### 7) Top Search Terms by Revenue

```sql
SELECT LOWER(sc.query) AS search_term, SUM(sc.num_searches) AS searches, SUM(sc.num_orders) AS orders, SUM(sc.std_revenue) AS revenue
FROM ccdw_aggr_search_conversion sc
JOIN ccdw_dim_site s ON s.site_id = sc.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY LOWER(sc.query)
ORDER BY revenue DESC
LIMIT 30
```

##### 8) Referrer Mix

```sql
SELECT referrer_medium, referrer_source, SUM(num_visits) AS visits
FROM ccdw_aggr_visit_referrer vr
JOIN ccdw_dim_site s ON s.site_id = vr.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY referrer_medium, referrer_source
ORDER BY visits DESC
LIMIT 30
```

##### 9) Customer Registration Trend

```sql
SELECT registration_date, SUM(num_registrations) AS registrations
FROM ccdw_aggr_registration r
JOIN ccdw_dim_site s ON s.site_id = r.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY registration_date
ORDER BY registration_date DESC
LIMIT 30
```

##### 10) Payment Method Performance

```sql
SELECT pm.display_name AS payment_method, SUM(pss.num_payments) AS payments, SUM(pss.std_captured_amount) AS captured_amount
FROM ccdw_aggr_payment_sales_summary pss
JOIN ccdw_dim_payment_method pm ON pm.payment_method_id = pss.payment_method_id
JOIN ccdw_dim_site s ON s.site_id = pss.site_id
WHERE s.nsite_id = 'Sites-RefArch-Site'
GROUP BY pm.display_name
ORDER BY captured_amount DESC
LIMIT 20
```

##### Placeholder Pattern for Date Windows

Use this pattern when running with `b2c cip query --from ... --to ...`:

```sql
SELECT submit_date, num_orders, std_revenue
FROM ccdw_aggr_sales_summary
WHERE submit_date >= '<FROM>'
  AND submit_date <= '<TO>'
ORDER BY submit_date DESC
LIMIT 20
```

---


<a id="b2c-code"></a>
## b2c-code

**When to use:** Deploy and manage code versions/cartridges on B2C Commerce instances/sandboxes with the b2c cli. Always reference when using the CLI to upload cartridges, deploy code, activate code versions, manage code versions, or watch for file changes during development.

## B2C Code Skill

Use the `b2c` CLI to deploy and manage code versions on Salesforce B2C Commerce instances.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli code deploy`).

### Examples

#### Deploy Cartridges

```bash
# deploy all cartridges from current directory
b2c code deploy

# deploy cartridges from a specific directory
b2c code deploy ./my-cartridges

# deploy to a specific server and code version
b2c code deploy --server my-sandbox.demandware.net --code-version v1

# deploy and reload (re-activate) the code version
b2c code deploy --reload

# delete existing cartridges before upload and reload
b2c code deploy --delete --reload

# deploy only specific cartridges
b2c code deploy -c app_storefront_base -c plugin_applepay

# exclude specific cartridges from deployment
b2c code deploy -x test_cartridge
```

#### Watch for Changes

```bash
# watch cartridges and upload changes automatically
b2c code watch

# watch a specific directory
b2c code watch ./my-cartridges

# watch with specific server and code version
b2c code watch --server my-sandbox.demandware.net --code-version v1

# watch only specific cartridges
b2c code watch -c app_storefront_base

# watch excluding specific cartridges
b2c code watch -x test_cartridge
```

#### List Code Versions

```bash
# list code versions on the instance
b2c code list

# list with JSON output
b2c code list --json
```

#### Activate Code Version

```bash
# activate a code version
b2c code activate <version-name>

# reload (re-activate) the current code version
b2c code activate --reload
```

**Note:** Activating a code version triggers Custom API endpoint registration. If you've added or modified Custom APIs, use `--reload` with deploy or activate to register them. Check registration status with the `b2c-cli:b2c-scapi-custom` skill.

#### Delete Code Version

```bash
# delete a code version
b2c code delete <version-name>
```

#### More Commands

See `b2c code --help` for a full list of available commands and options in the `code` topic.

> **Note:** `b2c code deploy` uploads cartridge *code* to an instance. To manage which cartridges are *active on a site* (the cartridge path), see the `b2c-cli:b2c-sites` skill for the `b2c sites cartridges` commands.

### Related Skills

- `b2c-cli:b2c-sites` - Manage site cartridge paths (list, add, remove, set active cartridges)
- `b2c-cli:b2c-scapi-custom` - Check Custom API registration status after deployment
- `b2c-cli:b2c-webdav` - Low-level file operations (delete cartridges, list files)
- `b2c:b2c-custom-api-development` - Creating Custom API endpoints

---


<a id="b2c-config"></a>
## b2c-config

**When to use:** View and debug b2c CLI configuration and understand where credentials come from. Always reference when using the CLI to inspect configuration, manage instances, retrieve OAuth tokens, or set up IDE integration. Also use when authentication fails, connection errors occur, or the wrong instance is being used.

## B2C Config Skill

The B2C CLI (`@salesforce/b2c-cli`) is a command-line tool for Salesforce B2C Commerce development. It provides commands organized by topic: `auth`, `code`, `webdav`, `sandbox`, `mrt`, `scapi`, `slas`, `ecdn`, `job`, `logs`, `sites`, `content`, `cip`, `setup`, and more. Use `b2c --help` or `b2c <topic> --help` for a full list.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli setup inspect`).

### Authentication

Most commands that interact with a B2C Commerce instance require authentication. The CLI supports several methods:

- **Client credentials (API client):** Configure `clientId` and `clientSecret` in dw.json or environment variables. This is the default for automated/CI use.
- **Browser-based (implicit OAuth):** Use `--user-auth` on any OAuth-enabled command to authenticate interactively via the browser. This opens Account Manager in your default browser for login.
- **Basic auth:** Configure `username` and `password` for WebDAV operations.
- **Stateful sessions:** Use `b2c auth login` for persistent browser-based login sessions.

#### `--user-auth` Flag

Many commands support `--user-auth` to use browser-based implicit OAuth instead of client credentials. This is useful when:

- You don't have a `clientSecret` configured
- You need user-level permissions (e.g., Account Manager admin roles)
- You're working interactively

```bash
# Interactive browser-based auth for any OAuth command
b2c sandbox list --user-auth
b2c scapi schemas list --user-auth
b2c auth token --user-auth
```

Coding agents can also use `--user-auth` — the browser flow works in any environment where a browser can be opened. The flag is exclusive with `--auth-methods`.

**Running behind a proxy:** If `localhost:8080` isn't reachable by the browser (e.g., running in a container or behind a reverse proxy), set `SFCC_REDIRECT_URI` to the proxy URL. The local OAuth server still listens on the default port (or `SFCC_OAUTH_LOCAL_PORT`), but the redirect URI sent to Account Manager will use your proxy URL. Add the proxy URL to the API client's redirect URLs in Account Manager.

### Tenant ID and Organization ID

B2C Commerce uses two related identifiers:

- **Tenant ID** — the short form (e.g., `zzxy_prd` or `zzxy-prd`)
- **Organization ID** — the SCAPI form with `f_ecom_` prefix (e.g., `f_ecom_zzxy_prd`)

The CLI automatically normalizes and translates between these formats. You can provide either form in configuration or flags — the CLI handles the conversion. It also extracts tenant IDs from hostnames (e.g., `zzxy-prd.dx.commercecloud.salesforce.com` resolves to `zzxy_prd`).

In dw.json or environment variables, use the `tenantId` config key. The CLI will add the `f_ecom_` prefix when making SCAPI calls.

### Inspecting Configuration

Use `b2c setup inspect` to view the resolved configuration and understand where each value comes from. Use `b2c setup instance` commands to manage named instance configurations.

> **Note:** `b2c setup config` works as an alias for `b2c setup inspect`.

#### When to Use

Use `b2c setup inspect` when you need to:

- Verify which configuration file is being used
- Check if environment variables are being read correctly
- Debug authentication failures by confirming credentials are loaded
- Understand credential source priority (dw.json vs env vars vs plugins)
- Identify hostname mismatch protection issues
- Verify MRT API key is loaded from ~/.mobify

#### View Current Configuration

```bash
# Display resolved configuration (sensitive values masked by default)
b2c setup inspect

# View configuration for a specific instance from dw.json
b2c setup inspect -i staging

# View configuration with a specific config file
b2c setup inspect --config /path/to/dw.json
```

#### Debug Sensitive Values

```bash
# Show actual passwords, secrets, and API keys (use with caution)
b2c setup inspect --unmask
```

#### JSON Output for Scripting

```bash
# Output as JSON for parsing in scripts
b2c setup inspect --json

# Pretty-print with jq
b2c setup inspect --json | jq '.config'

# Check which sources are loaded
b2c setup inspect --json | jq '.sources'
```

### IDE Integration (Prophet)

Use `b2c setup ide prophet` to generate a `dw.js` bridge script for the Prophet VS Code extension.

```bash
# Generate ./dw.js in the current project
b2c setup ide prophet

# Overwrite existing file
b2c setup ide prophet --force

# Custom path
b2c setup ide prophet --output .vscode/dw.js
```

The generated script runs `b2c setup inspect --json --unmask` at runtime, so Prophet sees the same resolved config as CLI commands, including configuration plugins. It maps values to `dw.json`-style keys and passes through Prophet fields like `cartridgesPath`, `siteID`, and `storefrontPassword` when present.

### Managing Instances

#### List Configured Instances

```bash
# Show all instances from dw.json
b2c setup instance list

# Output as JSON
b2c setup instance list --json
```

#### Create a New Instance

```bash
# Interactive mode - prompts for all values
b2c setup instance create staging

# With hostname
b2c setup instance create staging --hostname staging.example.com

# Create and set as active
b2c setup instance create staging --hostname staging.example.com --active

# Non-interactive mode (for scripts)
b2c setup instance create staging \
  --hostname staging.example.com \
  --username admin \
  --password secret \
  --force
```

#### Switch Active Instance

```bash
# Set staging as the default instance
b2c setup instance set-active staging

# Now commands use staging by default
b2c code list  # Uses staging
```

#### Remove an Instance

```bash
# Remove with confirmation prompt
b2c setup instance remove staging

# Remove without confirmation
b2c setup instance remove staging --force
```

### Understanding the Output

The `setup inspect` command displays configuration organized by category:

- **Instance**: hostname, webdavHostname (if set), codeVersion
- **Authentication (Basic)**: username, password (for WebDAV)
- **Authentication (OAuth)**: clientId, clientSecret, scopes, authMethods, accountManagerHost (if set), sandboxApiHost (if set)
- **TLS/mTLS**: certificate, certificatePassphrase, selfSigned (only shown when configured)
- **SCAPI**: shortCode, tenantId
- **Managed Runtime (MRT)**: mrtProject, mrtEnvironment, mrtApiKey, mrtOrigin (if set)
- **Metadata**: instanceName (from multi-instance configs)
- **Sources**: List of all configuration sources that were loaded

Each value shows its source in brackets:

- `[DwJsonSource]` — Value from dw.json file
- `[EnvSource]` — Value from an SFCC_* environment variable
- `[MobifySource]` — Value from ~/.mobify file
- `[PackageJsonSource]` — Value from package.json `b2c` key
- Plugin-provided source names (e.g., a credential plugin)

### Configuration Priority

Values are resolved with this priority (highest to lowest):

1. CLI flags and environment variables
2. Plugin sources (high priority)
3. dw.json file
4. ~/.mobify file (MRT API key only)
5. Plugin sources (low priority)
6. package.json `b2c` key

When troubleshooting, check the source column to understand which configuration is taking precedence.

### Common Issues

#### Missing Values

If a value shows `-`, it means no source provided that configuration. Check:

- Is the field spelled correctly in dw.json?
- Is the environment variable set?
- Does the plugin provide that value?

#### Wrong Source Taking Precedence

If a value comes from an unexpected source:

- Higher priority sources override lower ones
- Credential groups (username+password, clientId+clientSecret) are atomic
- Hostname mismatch protection may discard values

#### Sensitive Values Masked

By default, passwords and secrets show partial values like `admi...REDACTED`. Use `--unmask` to see full values when debugging authentication issues.

### Getting Admin OAuth Tokens

Use `b2c auth token` to get an admin OAuth access token for Account Manager credentials (OCAPI and Admin APIs). This is useful for testing APIs, scripting, or CI/CD pipelines.

```bash
# Get access token (outputs raw token to stdout)
b2c auth token

# Get token with browser-based auth
b2c auth token --user-auth

# Get token with specific scopes
b2c auth token --auth-scope sfcc.orders --auth-scope sfcc.products

# Get token as JSON (includes expiration and scopes)
b2c auth token --json

# Use in curl for OCAPI calls
curl -H "Authorization: Bearer $(b2c auth token)" \
  "https://your-instance.dx.commercecloud.salesforce.com/s/-/dw/data/v24_1/sites"
```

The token is obtained using the `clientId` and `clientSecret` from your configuration (dw.json or environment variables). If only `clientId` is configured, or `--user-auth` is used, an implicit OAuth flow is used (browser-based).

**Note:** This command returns **admin** tokens for OCAPI/Admin APIs. For **shopper** tokens (SLAS), see the [b2c-slas skill](../b2c-slas/SKILL.md).

### More Commands

See `b2c setup --help` for other setup commands including `b2c setup skills` for AI agent skill installation.

---


<a id="b2c-content"></a>
## b2c-content

**When to use:** Export, list, and validate Page Designer pages and metadefinitions from B2C Commerce content libraries. Always reference when using the CLI to export, list, or validate Page Designer content, discover page IDs, or work with content library assets. Covers page designer JSON, content migration, library XML, content archive, site content, component export, and offline export.

## B2C Content Skill

Use the `b2c` CLI to export, list, and validate Page Designer content from Salesforce B2C Commerce content libraries.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli content export homepage`).

### Examples

#### Export Pages

```bash
# export a single page from a shared library
b2c content export homepage --library SharedLibrary

# export multiple pages
b2c content export homepage about-us contact --library SharedLibrary

# export pages matching a regex pattern
b2c content export "hero-.*" --library SharedLibrary --regex

# export to a specific output directory
b2c content export homepage --library SharedLibrary -o ./my-export

# export a specific component by ID
b2c content export hero-banner --library SharedLibrary

# export from a site-private library
b2c content export homepage --library RefArch --site-library

# preview without downloading (dry run)
b2c content export homepage --library SharedLibrary --dry-run

# export with JSON output
b2c content export homepage --library SharedLibrary --json

# export from a local XML file (offline, no instance needed)
b2c content export homepage --library SharedLibrary --library-file ./library.xml --offline

# filter pages by folder classification
b2c content export homepage --library SharedLibrary --folder seasonal

# custom asset extraction paths
b2c content export homepage --library SharedLibrary -q "image.path" -q "video.url"

# include orphan components in export
b2c content export homepage --library SharedLibrary --keep-orphans
```

#### List Content

```bash
# list all content in a library
b2c content list --library SharedLibrary

# list only pages
b2c content list --library SharedLibrary --type page

# list including components
b2c content list --library SharedLibrary --components

# show tree structure
b2c content list --library SharedLibrary --tree

# list from a site-private library
b2c content list --library RefArch --site-library

# list from a local XML file
b2c content list --library SharedLibrary --library-file ./library.xml

# JSON output
b2c content list --library SharedLibrary --json
```

#### Configuration

The `--library` flag can be configured in `dw.json` or `package.json` so you don't need to pass it every time:

```json
// dw.json
{
  "hostname": "my-sandbox.demandware.net",
  "content-library": "SharedLibrary"
}
```

```json
// package.json
{
  "b2c": {
    "contentLibrary": "SharedLibrary"
  }
}
```

With a configured library, commands become shorter:

```bash
b2c content export homepage
b2c content list --type page
```

#### Validate Metadefinitions

```bash
# validate a single metadefinition file
b2c content validate cartridge/experience/pages/storePage.json

# validate all metadefinitions in a directory recursively
b2c content validate cartridge/experience/

# validate with a glob pattern
b2c content validate 'cartridge/experience/**/*.json'

# explicitly specify the schema type
b2c content validate --type componenttype mycomponent.json

# JSON output for CI/scripting
b2c content validate cartridge/experience/ --json
```

Schema types are auto-detected from file paths (`experience/pages/` → pagetype, `experience/components/` → componenttype) and from JSON content. Use `--type` to override.

#### More Commands

See `b2c content --help` for a full list of available commands and options in the `content` topic.

### Troubleshooting

- **"Library is required"** -- Set `--library` flag or configure `content-library` in `dw.json`.
- **Authentication errors** -- OAuth credentials are required for remote operations. Run `b2c auth:login` first. The `--library-file` flag bypasses authentication for offline/local use.
- **Library not found** -- Verify the library ID matches exactly. For site-private libraries, add `--site-library`.
- **No content found** -- Check that the page/content IDs exist. Use `b2c content list` to discover available IDs.
- **Timeout errors** -- Large libraries may exceed the default timeout. Use `--timeout <seconds>` to increase it.

### Related Skills

- `b2c-cli:b2c-site-import-export` - Site archive import/export operations
- `b2c-cli:b2c-webdav` - Low-level file operations on content libraries
- `b2c-cli:b2c-config` - Configuration and credential management

---


<a id="b2c-docs"></a>
## b2c-docs

**When to use:** Search and read B2C Commerce (SFCC/Demandware) Script API documentation and XSD schemas with the b2c cli. Always reference when using the CLI to search or read Script API documentation, look up dw.* classes, or browse XSD schemas. Also use when writing B2C scripts, answering "how do I" questions about URLs/products/orders, or verifying class methods and properties.

## B2C Docs Skill

Use the `b2c` CLI to search and read bundled Script API documentation and XSD schemas for Salesforce B2C Commerce.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli docs search ProductMgr`).

### Examples

#### Search Documentation

```bash
# Search for a class by name
b2c docs search ProductMgr

# Search with partial match
b2c docs search "catalog product"

# Limit results
b2c docs search status --limit 5

# List all available documentation
b2c docs search --list
```

#### Read Documentation

```bash
# Read documentation for a class (renders in terminal)
b2c docs read ProductMgr

# Read by fully qualified name
b2c docs read dw.catalog.ProductMgr

# Output raw markdown (for piping)
b2c docs read ProductMgr --raw

# Output as JSON
b2c docs read ProductMgr --json
```

#### Download Documentation

Download the latest Script API documentation from a B2C Commerce instance:

```bash
# Download to a directory
b2c docs download ./my-docs

# Download with specific server
b2c docs download ./docs --server sandbox.demandware.net

# Keep the original archive
b2c docs download ./docs --keep-archive
```

#### Read XSD Schemas

Read bundled XSD schema files for import/export data formats:

```bash
# Read a schema by name
b2c docs schema catalog

# Fuzzy match schema name
b2c docs schema order

# List all available schemas
b2c docs schema --list

# Output as JSON
b2c docs schema catalog --json
```

### Common Classes

| Class | Description |
|-------|-------------|
| `dw.catalog.ProductMgr` | Product management and queries |
| `dw.catalog.Product` | Product data and attributes |
| `dw.order.Basket` | Shopping basket operations |
| `dw.order.Order` | Order processing |
| `dw.customer.CustomerMgr` | Customer management |
| `dw.system.Site` | Site configuration |
| `dw.web.URLUtils` | URL generation utilities |

### Common Schemas

| Schema | Description |
|--------|-------------|
| `catalog` | Product catalog import/export |
| `order` | Order data import/export |
| `customer` | Customer data import/export |
| `inventory` | Inventory data import/export |
| `pricebook` | Price book import/export |
| `promotion` | Promotion definitions |
| `coupon` | Coupon codes import/export |
| `jobs` | Job step definitions |

### More Commands

See `b2c docs --help` for a full list of available commands and options.

---


<a id="b2c-ecdn"></a>
## b2c-ecdn

**When to use:** Manage B2C Commerce eCDN (embedded Content Delivery Network / edge CDN, powered by Cloudflare) settings with the b2c CLI. Use for CDN zone management, cache purging, SSL certificate provisioning, WAF rules, firewall rules, rate limiting, logpush, Page Shield, MRT routing, mTLS, cipher suites, origin headers, and speed optimization.

## B2C eCDN Skill

Use the `b2c` CLI plugin to manage eCDN (embedded Content Delivery Network) zones, certificates, security settings, and more.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli ecdn zones list`).

### Prerequisites

- OAuth credentials with `sfcc.cdn-zones` scope (read operations)
- OAuth credentials with `sfcc.cdn-zones.rw` scope (write operations)
- Tenant ID for your B2C Commerce organization

### Examples

#### List CDN Zones

```bash
# list all CDN zones for a tenant
b2c ecdn zones list --tenant-id zzxy_prd

# list with JSON output
b2c ecdn zones list --tenant-id zzxy_prd --json
```

#### Create a Storefront Zone

```bash
# create a new storefront zone
b2c ecdn zones create --tenant-id zzxy_prd --storefront-hostname www.example.com --origin-hostname origin.example.com
```

#### Purge Cache

```bash
# purge cache for specific paths
b2c ecdn cache purge --tenant-id zzxy_prd --zone my-zone --path /products --path /categories

# purge by cache tags
b2c ecdn cache purge --tenant-id zzxy_prd --zone my-zone --tag product-123 --tag category-456

# purge everything
b2c ecdn cache purge --tenant-id zzxy_prd --zone my-zone --purge-everything
```

#### Manage Certificates

```bash
# list certificates for a zone
b2c ecdn certificates list --tenant-id zzxy_prd --zone my-zone

# add a new certificate
b2c ecdn certificates add --tenant-id zzxy_prd --zone my-zone --hostname www.example.com --certificate-file ./cert.pem --private-key-file ./key.pem

# get certificate details
b2c ecdn certificates get --tenant-id zzxy_prd --zone my-zone --certificate-id abc123

# validate a custom hostname
b2c ecdn certificates validate --tenant-id zzxy_prd --zone my-zone --certificate-id abc123
```

#### Security Settings

```bash
# get security settings
b2c ecdn security get --tenant-id zzxy_prd --zone my-zone

# update security settings
b2c ecdn security update --tenant-id zzxy_prd --zone my-zone --ssl-mode full --min-tls-version 1.2 --always-use-https
```

#### Speed Settings

```bash
# get speed optimization settings
b2c ecdn speed get --tenant-id zzxy_prd --zone my-zone

# update speed settings
b2c ecdn speed update --tenant-id zzxy_prd --zone my-zone --browser-cache-ttl 14400 --auto-minify-html --auto-minify-css
```

### Additional Topics

For less commonly used eCDN features, see the reference files:

- **[SECURITY.md](references/SECURITY.md)** — WAF (v1 and v2), custom firewall rules, rate limiting, and Page Shield (CSP policies, script detection, notification webhooks)
- **[ADVANCED.md](references/ADVANCED.md)** — Logpush jobs, MRT routing rules, mTLS certificates, cipher suite configuration, and origin header modification

### Configuration

The tenant ID can be set via environment variable:
- `SFCC_TENANT_ID`: B2C Commerce tenant ID

The `--zone` flag accepts either:
- Zone ID (32-character hex string)
- Zone name (human-readable, case-insensitive lookup)

#### OAuth Scopes

| Operation | Required Scope |
|-----------|---------------|
| Read operations | `sfcc.cdn-zones` |
| Write operations | `sfcc.cdn-zones.rw` |

#### More Commands

See `b2c ecdn --help` for a full list of available commands and options in the `ecdn` topic.

### Reference: ADVANCED.md

#### eCDN Advanced Reference

Logpush, MRT rules, mTLS, cipher suites, and origin header commands for B2C eCDN.

##### Logpush

```bash
# create ownership challenge for S3 destination
b2c ecdn logpush ownership --tenant-id zzxy_prd --zone my-zone --destination-path 's3://my-bucket/logs?region=us-east-1'

# list logpush jobs
b2c ecdn logpush jobs list --tenant-id zzxy_prd --zone my-zone

# create a logpush job
b2c ecdn logpush jobs create --tenant-id zzxy_prd --zone my-zone --name "HTTP logs" --destination-path 's3://my-bucket/logs?region=us-east-1' --log-type http_requests

# update a logpush job (enable/disable)
b2c ecdn logpush jobs update --tenant-id zzxy_prd --zone my-zone --job-id 123456 --enabled

# delete a logpush job
b2c ecdn logpush jobs delete --tenant-id zzxy_prd --zone my-zone --job-id 123456
```

##### MRT Rules

```bash
# get MRT ruleset for a zone
b2c ecdn mrt-rules get --tenant-id zzxy_prd --zone my-zone

# create MRT rules to route to a Managed Runtime environment
b2c ecdn mrt-rules create --tenant-id zzxy_prd --zone my-zone --mrt-hostname customer-pwa.mobify-storefront.com --expressions '(http.host eq "example.com")'

# update MRT ruleset hostname
b2c ecdn mrt-rules update --tenant-id zzxy_prd --zone my-zone --mrt-hostname new-customer-pwa.mobify-storefront.com

# delete MRT ruleset
b2c ecdn mrt-rules delete --tenant-id zzxy_prd --zone my-zone
```

##### mTLS Certificates

```bash
# list mTLS certificates (organization level)
b2c ecdn mtls list --tenant-id zzxy_prd

# create mTLS certificate for code upload authentication
b2c ecdn mtls create --tenant-id zzxy_prd --name "Build Server" --ca-certificate-file ./ca.pem --leaf-certificate-file ./leaf.pem

# get mTLS certificate details
b2c ecdn mtls get --tenant-id zzxy_prd --certificate-id abc123

# delete mTLS certificate
b2c ecdn mtls delete --tenant-id zzxy_prd --certificate-id abc123
```

##### Cipher Suites

```bash
# get cipher suites configuration
b2c ecdn cipher-suites get --tenant-id zzxy_prd --zone my-zone

# update to Modern cipher suite
b2c ecdn cipher-suites update --tenant-id zzxy_prd --zone my-zone --suite-type Modern

# update to Custom cipher suite with specific ciphers
b2c ecdn cipher-suites update --tenant-id zzxy_prd --zone my-zone --suite-type Custom --ciphers "ECDHE-ECDSA-AES128-GCM-SHA256,ECDHE-RSA-AES128-GCM-SHA256"
```

##### Origin Headers

```bash
# get origin header modification
b2c ecdn origin-headers get --tenant-id zzxy_prd --zone my-zone

# set origin header modification (for MRT)
b2c ecdn origin-headers set --tenant-id zzxy_prd --zone my-zone --header-value my-secret-value

# delete origin header modification
b2c ecdn origin-headers delete --tenant-id zzxy_prd --zone my-zone
```

### Reference: SECURITY.md

#### eCDN Security Reference

WAF, firewall rules, rate limiting, and Page Shield commands for B2C eCDN.

##### WAF (Web Application Firewall)

```bash
# list WAF v1 groups
b2c ecdn waf groups list --tenant-id zzxy_prd --zone my-zone

# update WAF v1 group mode
b2c ecdn waf groups update --tenant-id zzxy_prd --zone my-zone --group-id abc123 --mode on

# list WAF v1 rules in a group
b2c ecdn waf rules list --tenant-id zzxy_prd --zone my-zone --group-id abc123

# list WAF v2 rulesets
b2c ecdn waf rulesets list --tenant-id zzxy_prd --zone my-zone

# update WAF v2 ruleset
b2c ecdn waf rulesets update --tenant-id zzxy_prd --zone my-zone --ruleset-id abc123 --action block

# migrate zone to WAF v2
b2c ecdn waf migrate --tenant-id zzxy_prd --zone my-zone
```

##### Firewall Rules

```bash
# list custom firewall rules
b2c ecdn firewall list --tenant-id zzxy_prd --zone my-zone

# create a firewall rule
b2c ecdn firewall create --tenant-id zzxy_prd --zone my-zone --description "Block bad bots" --action block --filter '(cf.client.bot)'

# update a firewall rule
b2c ecdn firewall update --tenant-id zzxy_prd --zone my-zone --rule-id abc123 --action challenge

# reorder firewall rules
b2c ecdn firewall reorder --tenant-id zzxy_prd --zone my-zone --rule-ids id1,id2,id3
```

##### Rate Limiting

```bash
# list rate limiting rules
b2c ecdn rate-limit list --tenant-id zzxy_prd --zone my-zone

# create a rate limiting rule
b2c ecdn rate-limit create --tenant-id zzxy_prd --zone my-zone --description "API rate limit" --threshold 100 --period 60 --action block --match-url '/api/*'

# delete a rate limiting rule
b2c ecdn rate-limit delete --tenant-id zzxy_prd --zone my-zone --rule-id abc123
```

##### Page Shield

```bash
# list Page Shield notification webhooks (organization level)
b2c ecdn page-shield notifications list --tenant-id zzxy_prd

# create a notification webhook
b2c ecdn page-shield notifications create --tenant-id zzxy_prd --url https://example.com/webhook --secret my-secret --zones zone1,zone2

# list Page Shield policies (zone level)
b2c ecdn page-shield policies list --tenant-id zzxy_prd --zone my-zone

# create a CSP policy
b2c ecdn page-shield policies create --tenant-id zzxy_prd --zone my-zone --action allow --value script-src

# list detected scripts
b2c ecdn page-shield scripts list --tenant-id zzxy_prd --zone my-zone
```

---


<a id="b2c-job"></a>
## b2c-job

**When to use:** Run and monitor existing (B2C/demandware/SFCC) jobs using the b2c cli, import/export site archives (IMPEX). Always reference when using the CLI to run jobs, import or export site archives, check job execution status, or trigger search indexing. For creating new jobs, use b2c-custom-job-steps skill instead.

## B2C Job Skill

Use the `b2c` CLI plugin to **run existing jobs** and import/export site archives on Salesforce B2C Commerce instances.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli job run`).

> **Creating a new job?** If you need to write custom job step code (batch processing, scheduled tasks, data sync), use the `b2c:b2c-custom-job-steps` skill instead.

### Examples

#### Run a Job

```bash
# run a job and return immediately
b2c job run my-custom-job

# run a job and wait for completion
b2c job run my-custom-job --wait

# run a job with a timeout (in seconds)
b2c job run my-custom-job --wait --timeout 600

# run a job with parameters (standard jobs)
b2c job run my-custom-job -P "SiteScope={\"all_storefront_sites\":true}" -P OtherParam=value

# show job log if the job fails
b2c job run my-custom-job --wait --show-log
```

#### Run System Jobs with Custom Request Bodies

Some system jobs (like search indexing) use non-standard request schemas. Use `--body` to provide a raw JSON request body:

```bash
# run search index job for specific sites
b2c job run sfcc-search-index-product-full-update --wait --body '{"site_scope":["RefArch","SiteGenesis"]}'

# run search index job for a single site
b2c job run sfcc-search-index-product-full-update --wait --body '{"site_scope":["RefArch"]}'
```

Note: `--body` and `-P` are mutually exclusive.

#### Import Site Archives

The `job import` command automatically waits for the import job to complete before returning. It does not use the `--wait` option.

```bash
# import a local directory as a site archive
b2c job import ./my-site-data

# import a local zip file
b2c job import ./export.zip

# keep the archive on the instance after import
b2c job import ./my-site-data --keep-archive

# import an archive that already exists on the instance (in Impex/src/instance/)
b2c job import existing-archive.zip --remote

# show job log on failure
b2c job import ./my-site-data --show-log
```

#### Export Site Archives

```bash
# export site data using the job export command
b2c job export
```

#### Search Job Executions

```bash
# search for job executions
b2c job search

# search with JSON output
b2c job search --json
```

#### Wait for Job Completion

```bash
# wait for a specific job execution to complete
b2c job wait <execution-id>
```

#### More Commands

See `b2c job --help` for a full list of available commands and options in the `job` topic.

### Related Skills

- `b2c:b2c-custom-job-steps` - For **creating** new custom job steps (batch processing scripts, scheduled tasks, data sync jobs)
- `b2c-cli:b2c-site-import-export` - For site archive structure and metadata XML patterns

---


<a id="b2c-logs"></a>
## b2c-logs

**When to use:** Retrieve or monitor logs from B2C Commerce instances with the b2c cli. Always reference when using the CLI to fetch logs, search log entries, filter by level/time, or tail logs in real-time. Also use when a user reports errors, broken functionality, or issues with controllers, script APIs, custom API backends, jobs, or other SFCC server-side components.

## B2C Logs Skill

Use the `b2c` CLI to retrieve and monitor log files on Salesforce B2C Commerce instances. The `logs get` command is designed for agent-friendly, non-interactive log retrieval with structured JSON output.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli logs get`).

### Agent-Friendly Log Retrieval

The `logs get` command is optimized for coding agents:
- Exits immediately after retrieving logs (non-interactive)
- Supports `--json` for structured output
- Filters by time, level, and text search
- Auto-normalizes file paths for IDE click-to-open

### Examples

#### Get Recent Logs

```bash
# Get last 20 entries from error and customerror logs (default)
b2c logs get

# Get last 50 entries
b2c logs get --count 50

# JSON output for programmatic parsing
b2c logs get --json
```

#### Filter by Time

```bash
# Entries from the last 5 minutes
b2c logs get --since 5m

# Entries from the last 1 hour
b2c logs get --since 1h

# Entries from the last 2 days
b2c logs get --since 2d

# Entries after a specific time (ISO 8601)
b2c logs get --since "2026-01-25T10:00:00"
```

#### Filter by Log Level

```bash
# Only ERROR level entries
b2c logs get --level ERROR

# ERROR and FATAL entries
b2c logs get --level ERROR --level FATAL
```

#### Search Text

```bash
# Search for "OrderMgr" in messages
b2c logs get --search OrderMgr

# Search for payment errors
b2c logs get --search "PaymentProcessor"
```

#### Combined Filters

```bash
# Recent errors containing "PaymentProcessor"
b2c logs get --since 1h --level ERROR --search "PaymentProcessor" --json

# Last hour of errors and fatals from specific log types
b2c logs get --filter error --filter warn --since 1h --level ERROR --level FATAL
```

#### List Available Log Files

```bash
# List all log files
b2c logs list

# List specific log types
b2c logs list --filter error --filter customerror

# JSON output
b2c logs list --json
```

#### Real-Time Tailing (Human Use)

For interactive log monitoring (not for agents):

```bash
# Tail error and customerror logs
b2c logs tail

# Tail specific log types
b2c logs tail --filter debug --filter error

# Tail only ERROR and FATAL level entries
b2c logs tail --level ERROR --level FATAL

# Tail with text search
b2c logs tail --search "PaymentProcessor"

# Combined filtering
b2c logs tail --filter customerror --level ERROR --search "OrderMgr"

# Stop with Ctrl+C
```

### Downloading Full Log Files

To download the complete log file, use the `file` field from the JSON output with `b2c-cli:b2c-webdav`:

```bash
b2c webdav get error-odspod-0-appserver-20260126.log --root=logs -o -
```

### JSON Output Structure

When using `--json`, `logs get` returns:

```json
{
  "count": 1,
  "entries": [
    {
      "file": "error-odspod-0-appserver-20260126.log",
      "timestamp": "2026-01-26 04:38:03.022 GMT",
      "level": "ERROR",
      "message": "PipelineCallServlet|156679877|Sites-Site|...",
      "raw": "[2026-01-26 04:38:03.022 GMT] ERROR PipelineCallServlet|..."
    }
  ]
}
```

| Field | Description |
|-------|-------------|
| `file` | Source log file name (use with `b2c-cli:b2c-webdav` to download full file) |
| `level` | Log level: ERROR, WARN, INFO, DEBUG, FATAL, TRACE |
| `timestamp` | Entry timestamp |
| `message` | Log message (paths normalized for IDE click-to-open) |
| `raw` | Raw unprocessed log line |

### Log Types

Common log file prefixes:

| Prefix | Description |
|--------|-------------|
| `error` | System errors |
| `customerror` | Custom script errors (`Logger.error()`) |
| `warn` | Warnings |
| `debug` | Debug output (when enabled) |
| `info` | Informational messages |
| `jobs` | Job execution logs |
| `api` | API problems and violations |
| `deprecation` | Deprecated API usage |
| `quota` | Quota warnings |

### More Commands

See `b2c logs --help` for all available commands and options.

### Related Skills

- `b2c-cli:b2c-webdav` - Direct WebDAV file access for downloading full log files
- `b2c-cli:b2c-config` - Verify configuration and credentials

---


<a id="b2c-mrt"></a>
## b2c-mrt

**When to use:** Deploy and manage (B2C/SFCC/Demandware) Managed Runtime (MRT) storefronts using the b2c cli. Always reference when using the CLI to deploy MRT bundles, manage MRT environments, set environment variables, configure redirects, or manage MRT projects and organizations.

## B2C MRT Skill

Use the `b2c` CLI to manage Managed Runtime (MRT) projects, environments, bundles, and deployments for PWA Kit storefronts.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli mrt bundle deploy`).

### Command Structure

```
mrt
├── org (list, b2c)              - Organizations and B2C connections
├── project                      - Project management
│   ├── member                   - Team member management
│   └── notification             - Deployment notifications
├── env                          - Environment management
│   ├── var                      - Environment variables
│   ├── redirect                 - URL redirects
│   └── access-control           - Access control headers
├── bundle                       - Bundle and deployment management
└── user                         - User profile and settings
```

### Quick Examples

#### Deploy a Bundle

```bash
# Push local build to staging
b2c mrt bundle deploy -p my-storefront -e staging

# Push to production with release message
b2c mrt bundle deploy -p my-storefront -e production -m "Release v1.0.0"

# Deploy existing bundle by ID
b2c mrt bundle deploy 12345 -p my-storefront -e production
```

#### Manage Environments

```bash
# List environments
b2c mrt env list -p my-storefront

# Create a new environment
b2c mrt env create qa -p my-storefront --name "QA Environment"

# Get environment details
b2c mrt env get -p my-storefront -e production

# Invalidate CDN cache
b2c mrt env invalidate -p my-storefront -e production
```

#### Environment Variables

```bash
# List variables
b2c mrt env var list -p my-storefront -e production

# Set variables
b2c mrt env var set API_KEY=secret DEBUG=true -p my-storefront -e staging

# Delete a variable
b2c mrt env var delete OLD_VAR -p my-storefront -e production
```

#### View Deployment History

```bash
# List bundles in project
b2c mrt bundle list -p my-storefront

# View deployment history for environment
b2c mrt bundle history -p my-storefront -e production

# Download a bundle artifact
b2c mrt bundle download 12345 -p my-storefront
```

#### Project Management

```bash
# List projects
b2c mrt project list

# Get project details
b2c mrt project get -p my-storefront

# List project members
b2c mrt project member list -p my-storefront

# Add a member
b2c mrt project member add user@example.com -p my-storefront --role developer
```

#### URL Redirects

```bash
# List redirects
b2c mrt env redirect list -p my-storefront -e production

# Create a redirect
b2c mrt env redirect create -p my-storefront -e production \
  --from "/old-path" --to "/new-path"

# Clone redirects between environments
b2c mrt env redirect clone -p my-storefront --source staging --target production
```

### Configuration

#### dw.json

Configure MRT settings in your project's `dw.json`:

```json
{
  "mrtProject": "my-storefront",
  "mrtEnvironment": "staging"
}
```

#### Environment Variables

```bash
export MRT_API_KEY=your-api-key
export MRT_PROJECT=my-storefront
export MRT_ENVIRONMENT=staging
```

#### ~/.mobify Config

Store your API key in `~/.mobify`:

```json
{
  "api_key": "your-mrt-api-key"
}
```

### Detailed References

- [Project Commands](references/PROJECT-COMMANDS.md) - Projects, members, and notifications
- [Environment Commands](references/ENVIRONMENT-COMMANDS.md) - Environments, variables, redirects
- [Bundle Commands](references/BUNDLE-COMMANDS.md) - Deployments, history, downloads

#### More Commands

See `b2c mrt --help` for a full list of available commands and options.

### Reference: BUNDLE-COMMANDS.md

#### MRT Bundle Commands Reference

Detailed reference for MRT bundle deployment, listing, history, and download commands.

##### Bundle Deploy

Push a local build or deploy an existing bundle to Managed Runtime.

###### Push Local Build

```bash
# Push local build to project (no deployment)
b2c mrt bundle deploy --project my-storefront

# Push and deploy to staging
b2c mrt bundle deploy -p my-storefront -e staging

# Push and deploy to production with message
b2c mrt bundle deploy -p my-storefront -e production --message "Release v1.0.0"

# Push from custom build directory
b2c mrt bundle deploy -p my-storefront --build-dir ./dist

# Specify Node.js version
b2c mrt bundle deploy -p my-storefront --node-version 20.x

# Set SSR parameters
b2c mrt bundle deploy -p my-storefront --ssr-param SSRProxyPath=/api

# Multiple SSR parameters
b2c mrt bundle deploy -p my-storefront \
  --ssr-param SSRProxyPath=/api \
  --ssr-param SSRTimeout=30000
```

###### Deploy Existing Bundle

```bash
# Deploy existing bundle by ID
b2c mrt bundle deploy 12345 -p my-storefront -e production

# Deploy with JSON output
b2c mrt bundle deploy 12345 -p my-storefront -e staging --json
```

**Flags:**
| Flag | Description | Default |
|------|-------------|---------|
| `--message`, `-m` | Bundle message/description | |
| `--build-dir`, `-b` | Path to build directory | `build` |
| `--ssr-only` | Server-only file patterns | `ssr.js,ssr.mjs,server/**/*` |
| `--ssr-shared` | Shared file patterns | `static/**/*,client/**/*` |
| `--node-version`, `-n` | Node.js version for SSR | `22.x` |
| `--ssr-param` | SSR parameters (key=value, can repeat) | |

##### Bundle List

List bundles in a project.

```bash
b2c mrt bundle list --project my-storefront
b2c mrt bundle list -p my-storefront --limit 10
b2c mrt bundle list -p my-storefront --offset 20
b2c mrt bundle list -p my-storefront --json
```

**Output columns:** Bundle ID, Message, Status, Created

##### Bundle History

View deployment history for an environment.

```bash
b2c mrt bundle history -p my-storefront -e production
b2c mrt bundle history -p my-storefront -e staging --limit 5
b2c mrt bundle history -p my-storefront -e production --json
```

**Output columns:** Bundle ID, Message, Status, Type, Created

##### Bundle Download

Download a bundle artifact.

```bash
# Download to current directory (bundle-{id}.tgz)
b2c mrt bundle download 12345 -p my-storefront

# Download to specific path
b2c mrt bundle download 12345 -p my-storefront -o ./artifacts/bundle.tgz

# Get download URL only (for use in scripts)
b2c mrt bundle download 12345 -p my-storefront --url-only

# JSON output with download URL
b2c mrt bundle download 12345 -p my-storefront --json
```

##### Common Workflows

###### Development to Production Pipeline

```bash
# 1. Build your PWA Kit application
npm run build

# 2. Push to staging for testing
b2c mrt bundle deploy -p my-storefront -e staging -m "v1.0.0-rc1"

# 3. After testing, deploy same bundle to production
# First, find the bundle ID from the staging deployment
b2c mrt bundle list -p my-storefront --limit 1

# 4. Deploy that bundle to production
b2c mrt bundle deploy 12345 -p my-storefront -e production
```

###### Rollback to Previous Bundle

```bash
# 1. View deployment history
b2c mrt bundle history -p my-storefront -e production

# 2. Deploy previous bundle
b2c mrt bundle deploy 12340 -p my-storefront -e production
```

###### Download and Inspect Bundle

```bash
# Download the bundle
b2c mrt bundle download 12345 -p my-storefront -o bundle.tgz

# Extract and inspect
tar -xzf bundle.tgz
ls -la
```

### Reference: ENVIRONMENT-COMMANDS.md

#### MRT Environment Commands Reference

Detailed reference for MRT environment, variable, redirect, and access control commands.

##### Environment Management

###### List Environments

```bash
b2c mrt env list --project my-storefront
b2c mrt env list -p my-storefront --json
```

###### Create Environment

```bash
# Basic staging environment
b2c mrt env create staging --project my-storefront --name "Staging Environment"

# Production environment in specific region
b2c mrt env create production -p my-storefront --name "Production" \
  --production --region eu-west-1

# With external hostname configuration
b2c mrt env create prod -p my-storefront --name "Production" \
  --production \
  --external-hostname www.example.com \
  --external-domain example.com

# With cookie forwarding and source maps
b2c mrt env create dev -p my-storefront --name "Development" \
  --allow-cookies --enable-source-maps
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--name`, `-n` | Display name (required) |
| `--region`, `-r` | AWS region for SSR deployment |
| `--production` | Mark as production environment |
| `--hostname` | Hostname pattern for V8 Tag loading |
| `--external-hostname` | Full external hostname (e.g., www.example.com) |
| `--external-domain` | External domain for Universal PWA SSR |
| `--allow-cookies` | Forward HTTP cookies to origin |
| `--enable-source-maps` | Enable source map support |

###### Get Environment Details

```bash
b2c mrt env get --project my-storefront --environment staging
b2c mrt env get -p my-storefront -e production --json
```

###### Update Environment

```bash
b2c mrt env update -p my-storefront -e staging --name "Updated Staging"
b2c mrt env update -p my-storefront -e production --allow-cookies
b2c mrt env update -p my-storefront -e dev --no-enable-source-maps
```

###### Delete Environment

```bash
b2c mrt env delete staging --project my-storefront
b2c mrt env delete old-env -p my-storefront --force
```

###### Invalidate Cache

Invalidate CDN cached content for an environment.

```bash
# Invalidate all cached content
b2c mrt env invalidate -p my-storefront -e production

# Invalidate specific paths
b2c mrt env invalidate -p my-storefront -e production \
  --path "/products/*" --path "/categories/*"
```

###### B2C Commerce Connection

Get or set B2C Commerce instance connection for an environment.

```bash
# Get current configuration
b2c mrt env b2c -p my-storefront -e production

# Set B2C instance
b2c mrt env b2c -p my-storefront -e production --instance-id aaaa_prd

# Set B2C instance with specific sites
b2c mrt env b2c -p my-storefront -e production \
  --instance-id aaaa_prd --sites RefArch,SiteGenesis

# Clear sites list
b2c mrt env b2c -p my-storefront -e production --clear-sites
```

##### Environment Variables

###### List Variables

```bash
b2c mrt env var list --project my-storefront --environment production
b2c mrt env var list -p my-storefront -e staging --json
```

###### Set Variables

```bash
# Single variable
b2c mrt env var set MY_VAR=value -p my-storefront -e production

# Multiple variables
b2c mrt env var set API_KEY=secret DEBUG=true FEATURE_FLAG=enabled \
  -p my-storefront -e staging

# Value with spaces (use quotes)
b2c mrt env var set "MESSAGE=hello world" -p my-storefront -e production

# Using environment variables for auth
export MRT_API_KEY=your-api-key
export MRT_PROJECT=my-storefront
export MRT_ENVIRONMENT=staging
b2c mrt env var set MY_VAR=value
```

###### Delete Variable

```bash
b2c mrt env var delete MY_VAR -p my-storefront -e production
```

##### URL Redirects

###### List Redirects

```bash
b2c mrt env redirect list -p my-storefront -e production
b2c mrt env redirect list -p my-storefront -e production --limit 50
b2c mrt env redirect list -p my-storefront -e production --json
```

###### Create Redirect

```bash
# Basic redirect
b2c mrt env redirect create -p my-storefront -e production \
  --from "/old-path" --to "/new-path"

# Permanent redirect (301)
b2c mrt env redirect create -p my-storefront -e production \
  --from "/legacy/*" --to "/modern/$1" --permanent

# Temporary redirect (302, default)
b2c mrt env redirect create -p my-storefront -e production \
  --from "/promo" --to "/sale"
```

###### Delete Redirect

```bash
b2c mrt env redirect delete abc-123 -p my-storefront -e production
b2c mrt env redirect delete abc-123 -p my-storefront -e production --force
```

###### Clone Redirects

Copy redirects from one environment to another.

```bash
b2c mrt env redirect clone -p my-storefront \
  --source staging --target production
```

##### Access Control Headers

###### List Access Control Headers

```bash
b2c mrt env access-control list -p my-storefront -e staging
b2c mrt env access-control list -p my-storefront -e production --json
```

### Reference: PROJECT-COMMANDS.md

#### MRT Project Commands Reference

Detailed reference for MRT project, member, and notification commands.

##### Project Management

###### List Projects

```bash
b2c mrt project list
b2c mrt project list --limit 10 --offset 0
b2c mrt project list --json
```

###### Create Project

```bash
b2c mrt project create my-storefront --name "My Storefront"
b2c mrt project create my-storefront --name "My Storefront" --organization my-org
```

###### Get Project Details

```bash
b2c mrt project get --project my-storefront
b2c mrt project get -p my-storefront --json
```

###### Update Project

```bash
b2c mrt project update --project my-storefront --name "Updated Name"
```

###### Delete Project

```bash
b2c mrt project delete --project my-storefront
b2c mrt project delete -p my-storefront --force  # skip confirmation
```

##### Member Management

Members can have one of three roles: `admin`, `developer`, or `viewer`.

###### List Members

```bash
b2c mrt project member list --project my-storefront
b2c mrt project member list -p my-storefront --json
```

###### Add Member

```bash
b2c mrt project member add user@example.com --project my-storefront --role admin
b2c mrt project member add user@example.com -p my-storefront --role developer
b2c mrt project member add user@example.com -p my-storefront --role viewer
```

###### Get Member Details

```bash
b2c mrt project member get user@example.com --project my-storefront
```

###### Update Member Role

```bash
b2c mrt project member update user@example.com --project my-storefront --role viewer
```

###### Remove Member

```bash
b2c mrt project member remove user@example.com --project my-storefront
b2c mrt project member remove user@example.com -p my-storefront --force
```

##### Deployment Notifications

Configure email notifications for deployment events (start, success, failure).

###### List Notifications

```bash
b2c mrt project notification list --project my-storefront
b2c mrt project notification list -p my-storefront --json
```

###### Create Notification

```bash
# Notify on deployment failures only
b2c mrt project notification create -p my-storefront \
  --target staging --target production \
  --recipient ops@example.com \
  --on-failed

# Notify on all deployment events
b2c mrt project notification create -p my-storefront \
  --target production \
  --recipient team@example.com \
  --on-start --on-success --on-failed

# Multiple recipients
b2c mrt project notification create -p my-storefront \
  --target production \
  --recipient dev@example.com --recipient ops@example.com \
  --on-failed
```

**Flags:**
| Flag | Description |
|------|-------------|
| `--target`, `-t` | Target environment (can specify multiple) |
| `--recipient`, `-r` | Email recipient (can specify multiple) |
| `--on-start` | Notify when deployment starts |
| `--on-success` | Notify when deployment succeeds |
| `--on-failed` | Notify when deployment fails |

###### Get Notification Details

```bash
b2c mrt project notification get abc-123 --project my-storefront
b2c mrt project notification get abc-123 -p my-storefront --json
```

###### Update Notification

```bash
# Change notification events
b2c mrt project notification update abc-123 -p my-storefront --on-start --no-on-failed

# Update recipients
b2c mrt project notification update abc-123 -p my-storefront --recipient new-team@example.com
```

###### Delete Notification

```bash
b2c mrt project notification delete abc-123 --project my-storefront
b2c mrt project notification delete abc-123 -p my-storefront --force
```

---


<a id="b2c-sandbox"></a>
## b2c-sandbox

**When to use:** Create and manage (B2C/SFCC/Demandware) on-demand sandboxes (ODS) with the b2c cli. Always reference when using the CLI to create, start, stop, restart, delete, or list on-demand sandboxes (ODS) and development instances.

## B2C Sandbox Skill

Only create or delete sandboxes when explicitly requested. Always confirm destructive actions.

Use the `b2c` CLI plugin to manage Salesforce B2C Commerce On-demand sandboxes (ODS). Only create or delete a sandbox if explicitly asked as this may be a billable or destructible action.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli sandbox list`).

> **Alias:** The `ods` prefix is still supported as a backward-compatible alias (e.g., `b2c ods list` works the same as `b2c sandbox list`).

### Sandbox ID Formats

Commands that operate on a specific sandbox accept two ID formats:

- **UUID**: The full sandbox UUID (e.g., `abc12345-1234-1234-1234-abc123456789`)
- **Realm-instance**: The realm-instance format (e.g., `zzzv-123` or `zzzv_123`)

The realm-instance format uses the 4-character realm code followed by a dash or underscore and the instance number. When using a realm-instance format, the CLI will automatically look up the corresponding UUID.

### Examples

#### List Sandboxes

```bash
b2c sandbox list

# for realm zzpq with JSON output
b2c sandbox list --realm zzpq --json

# filter by status and those created by a specific user, only print the columns id,state,hostname
b2c sandbox list --filter-params 'state=started,creating&createdBy=clavery@salesforce.com' --realm zzpq --columns id,state,hostname
```

#### Create Sandbox

Only create a sandbox if explicitly asked as this may be a billable action.

```bash
# create in realm zzpq with 4 hour TTL (0 = infinite); json output and wait for completion (this may take 5-10 minutes; timeout is 10 minutes)
b2c sandbox create --realm zzpq --ttl 4 --json --wait

# create in realm zzpq with large profile (medium is default)
b2c sandbox create --realm zzpq --profile large

# create without automatic OCAPI/WebDAV permissions
b2c sandbox create --realm zzpq --no-set-permissions

# use a different client ID for default permissions
b2c sandbox create --realm zzpq --permissions-client-id my-other-client

# custom OCAPI settings (replaces defaults)
b2c sandbox create --realm zzpq --ocapi-settings '[{"client_id":"my-client","resources":[{"resource_id":"/code_versions","methods":["get"]}]}]'

# with start/stop scheduler
b2c sandbox create --realm zzpq --start-scheduler '{"weekdays":["MONDAY","TUESDAY"],"time":"08:00:00Z"}' --stop-scheduler '{"weekdays":["MONDAY","TUESDAY"],"time":"19:00:00Z"}'

# get full log trace output to debug
b2c sandbox create --realm zzpq --log-level trace
```

#### Get/Start/Stop/Restart/Delete Sandbox

Commands that operate on a specific sandbox support both UUID and realm-instance formats:

```bash
# Using UUID
b2c sandbox get abc12345-1234-1234-1234-abc123456789
b2c sandbox start abc12345-1234-1234-1234-abc123456789
b2c sandbox stop abc12345-1234-1234-1234-abc123456789

# Using realm-instance format
b2c sandbox get zzzv-123
b2c sandbox start zzzv_123
b2c sandbox stop zzzv-123
b2c sandbox restart zzzv-123
b2c sandbox delete zzzv-123 --force
```

#### More Commands

See `b2c sandbox --help` for a full list of available commands and options in the `sandbox` topic.

---


<a id="b2c-scapi-custom"></a>
## b2c-scapi-custom

**When to use:** Check Custom SCAPI (B2C/SFCC/Demandware) endpoint registration status with the b2c cli. Always reference when using the CLI to check custom API endpoint status, verify custom API deployment, or debug "endpoint not found" errors. For creating new custom APIs, use b2c-custom-api-development skill instead.

## B2C SCAPI Custom APIs Skill

Use the `b2c` CLI plugin to manage SCAPI Custom API endpoints and check their registration status.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli scapi custom status`).

### Required: Tenant ID

The `--tenant-id` flag is **required** for all commands. The tenant ID identifies your B2C Commerce instance.

**Important:** The tenant ID is NOT the same as the organization ID:
- **Tenant ID**: `zzxy_prd` (used with commands that require `--tenant-id`)
- **Organization ID**: `f_ecom_zzxy_prd` (used in SCAPI URLs, has `f_ecom_` prefix)

#### Deriving Tenant ID from Hostname

For sandbox instances, you can derive the tenant ID from the hostname by replacing hyphens with underscores:

| Hostname | Tenant ID |
|----------|-----------|
| `zzpq-013.dx.commercecloud.salesforce.com` | `zzpq_013` |
| `zzxy-001.dx.commercecloud.salesforce.com` | `zzxy_001` |
| `abcd-dev.dx.commercecloud.salesforce.com` | `abcd_dev` |

For production instances, use your realm and instance identifier (e.g., `zzxy_prd`).

### Examples

#### Get Custom API Endpoint Status

```bash
# list all Custom API endpoints for an organization
b2c scapi custom status --tenant-id zzxy_prd

# list with JSON output
b2c scapi custom status --tenant-id zzxy_prd --json
```

#### Filter by Status

```bash
# list only active endpoints
b2c scapi custom status --tenant-id zzxy_prd --status active

# list only endpoints that failed to register
b2c scapi custom status --tenant-id zzxy_prd --status not_registered
```

#### Group by Type or Site

```bash
# group endpoints by API type (Admin vs Shopper)
b2c scapi custom status --tenant-id zzxy_prd --group-by type

# group endpoints by site
b2c scapi custom status --tenant-id zzxy_prd --group-by site
```

#### Customize Output Columns

```bash
# show extended columns (includes error reasons, sites, etc.)
b2c scapi custom status --tenant-id zzxy_prd --extended

# select specific columns to display
b2c scapi custom status --tenant-id zzxy_prd --columns type,apiName,status,sites

# available columns: type, apiName, apiVersion, cartridgeName, endpointPath, httpMethod, status, sites, securityScheme, operationId, schemaFile, implementationScript, errorReason, id
```

#### Debug Failed Registrations

```bash
# quickly find and diagnose failed Custom API registrations
b2c scapi custom status --tenant-id zzxy_prd --status not_registered --columns type,apiName,endpointPath,errorReason
```

#### Configuration

The tenant ID and short code can be set via environment variables:
- `SFCC_TENANT_ID`: Tenant ID (e.g., `zzxy_prd`, not the organization ID)
- `SFCC_SHORTCODE`: SCAPI short code

#### More Commands

See `b2c scapi custom --help` for a full list of available commands and options.

### Related Skills

- `b2c:b2c-custom-api-development` - Creating Custom API endpoints (schema, script, mapping)
- `b2c-cli:b2c-code` - Deploying and activating code versions (triggers registration)

---


<a id="b2c-scapi-schemas"></a>
## b2c-scapi-schemas

**When to use:** Browse and retrieve (B2C/SFCC/Demandware) SCAPI OpenAPI schemas with the b2c cli. Always reference when using the CLI to browse SCAPI schemas, check API request/response formats, explore available endpoints, or understand SCAPI data models.

## B2C SCAPI Schemas Skill

Use the `b2c` CLI plugin to browse and retrieve SCAPI OpenAPI schema specifications.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli scapi schemas list`).

### Required: Tenant ID

The `--tenant-id` flag is **required** for all commands. The tenant ID identifies your B2C Commerce instance.

**Important:** The tenant ID is NOT the same as the organization ID:
- **Tenant ID**: `zzxy_prd` (used with commands that require `--tenant-id`)
- **Organization ID**: `f_ecom_zzxy_prd` (used in SCAPI URLs, has `f_ecom_` prefix)

#### Deriving Tenant ID from Hostname

For sandbox instances, you can derive the tenant ID from the hostname by replacing hyphens with underscores:

| Hostname | Tenant ID |
|----------|-----------|
| `zzpq-013.dx.commercecloud.salesforce.com` | `zzpq_013` |
| `zzxy-001.dx.commercecloud.salesforce.com` | `zzxy_001` |
| `abcd-dev.dx.commercecloud.salesforce.com` | `abcd_dev` |

For production instances, use your realm and instance identifier (e.g., `zzxy_prd`).

### Examples

#### List Available Schemas

```bash
# list all available SCAPI schemas
b2c scapi schemas list --tenant-id zzxy_prd

# list with JSON output
b2c scapi schemas list --tenant-id zzxy_prd --json
```

#### Filter Schemas

```bash
# filter by API family (e.g., product, checkout, search)
b2c scapi schemas list --tenant-id zzxy_prd --api-family product

# filter by API name
b2c scapi schemas list --tenant-id zzxy_prd --api-name shopper-products

# filter by status
b2c scapi schemas list --tenant-id zzxy_prd --status current
```

#### Get Schema (Collapsed/Outline - Default)

By default, schemas are output in a collapsed format optimized for context efficiency. This is ideal for agentic use cases and LLM consumption.

```bash
# get collapsed schema (paths show methods, schemas show names only)
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd

# save to file
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd > schema.json
```

#### Get Schema with Selective Expansion

Expand only the parts of the schema you need:

```bash
# expand specific paths
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --expand-paths /products,/products/{productId}

# expand specific schemas
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --expand-schemas Product,ProductResult

# combine expansions
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --expand-paths /products --expand-schemas Product
```

#### Get Full Schema

```bash
# get full schema without any collapsing
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --expand-all
```

#### List Available Paths/Schemas/Examples

Discover what's available in a schema before expanding:

```bash
# list all paths in the schema
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --list-paths

# list all schema names
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --list-schemas

# list all examples
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --list-examples
```

#### Output Formats

```bash
# output as YAML
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --yaml

# output wrapped JSON with metadata (apiFamily, apiName, apiVersion, schema)
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --json
```

#### Custom Properties

```bash
# include custom properties (default behavior)
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd

# exclude custom properties
b2c scapi schemas get product shopper-products v1 --tenant-id zzxy_prd --no-expand-custom-properties
```

#### Configuration

The tenant ID and short code can be set via environment variables:
- `SFCC_TENANT_ID`: Tenant ID (e.g., `zzxy_prd`, not the organization ID)
- `SFCC_SHORTCODE`: SCAPI short code

#### More Commands

See `b2c scapi schemas --help` for a full list of available commands and options.

---


<a id="b2c-site-import-export"></a>
## b2c-site-import-export

**When to use:** Work with (B2C/SFCC/Demandware) site archive import archives and metadata XML patterns with the b2c cli. Always reference when using the CLI to work with site archive imports, add custom attributes, create system object extensions, configure site preferences, or understand import/export XML schemas.

## Site Import/Export Skill

Use the `b2c` CLI plugin to import and export site archives on Salesforce B2C Commerce instances.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli job import`).

### Import Commands

#### Import Local Directory

```bash
# Import a local directory as a site archive
b2c job import ./my-site-data

# Import and wait for completion
b2c job import ./my-site-data --wait

# Import a local zip file
b2c job import ./export.zip

# Keep the archive on the instance after import
b2c job import ./my-site-data --keep-archive

# Show job log if the import fails
b2c job import ./my-site-data --wait --show-log
```

#### Import Remote Archive

```bash
# Import an archive that already exists on the instance (in Impex/src/instance/)
b2c job import existing-archive.zip --remote
```

### Export Commands

```bash
# Export site data
b2c job export

# Export with specific configuration
b2c job export --wait
```

### Common Workflows

#### Adding a Custom Attribute to Products

1. Create the metadata XML file:

**meta/system-objecttype-extensions.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Product">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="vendorSKU">
                <display-name xml:lang="x-default">Vendor SKU</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
                <externally-managed-flag>true</externally-managed-flag>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="CustomAttributes">
                <display-name xml:lang="x-default">Custom Attributes</display-name>
                <attribute attribute-id="vendorSKU"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

2. Create the directory structure:
```
my-import/
└── meta/
    └── system-objecttype-extensions.xml
```

3. Import:
```bash
b2c job import ./my-import --wait
```

#### Adding Site Preferences

1. Create metadata for the preference:

**meta/system-objecttype-extensions.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="enableFeatureX">
                <display-name xml:lang="x-default">Enable Feature X</display-name>
                <type>boolean</type>
                <default-value>false</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
    </type-extension>
</metadata>
```

2. Create preference values:

**sites/MySite/preferences.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<preferences xmlns="http://www.demandware.com/xml/impex/preferences/2007-03-31">
    <custom-preferences>
        <all-instances>
            <preference preference-id="enableFeatureX">true</preference>
        </all-instances>
    </custom-preferences>
</preferences>
```

3. Directory structure:
```
my-import/
├── meta/
│   └── system-objecttype-extensions.xml
└── sites/
    └── MySite/
        └── preferences.xml
```

4. Import:
```bash
b2c job import ./my-import --wait
```

#### Creating a Custom Object Type

1. Define the custom object:

**meta/custom-objecttype-definitions.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <custom-type type-id="APIConfiguration">
        <display-name xml:lang="x-default">API Configuration</display-name>
        <staging-mode>source-to-target</staging-mode>
        <storage-scope>site</storage-scope>
        <key-definition attribute-id="configId">
            <display-name xml:lang="x-default">Config ID</display-name>
            <type>string</type>
            <min-length>1</min-length>
        </key-definition>
        <attribute-definitions>
            <attribute-definition attribute-id="endpoint">
                <display-name xml:lang="x-default">API Endpoint</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="apiKey">
                <display-name xml:lang="x-default">API Key</display-name>
                <type>password</type>
            </attribute-definition>
            <attribute-definition attribute-id="isActive">
                <display-name xml:lang="x-default">Active</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
        </attribute-definitions>
    </custom-type>
</metadata>
```

2. Import:
```bash
b2c job import ./my-import --wait
```

#### Importing Custom Object Data

**customobjects/APIConfiguration.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<custom-objects xmlns="http://www.demandware.com/xml/impex/customobject/2006-10-31">
    <custom-object type-id="APIConfiguration" object-id="payment-gateway">
        <object-attribute attribute-id="endpoint">https://api.payment.com/v2</object-attribute>
        <object-attribute attribute-id="isActive">true</object-attribute>
    </custom-object>
</custom-objects>
```

### Site Archive Structure

```
site-archive/
├── services.xml                           # Service configurations (credentials, profiles, services)
├── meta/
│   ├── system-objecttype-extensions.xml   # Custom attributes on system objects
│   └── custom-objecttype-definitions.xml  # Custom object type definitions
├── sites/
│   └── {SiteID}/
│       ├── preferences.xml                # Site preference values
│       └── library/
│           └── content/
│               └── content.xml            # Content assets
├── catalogs/
│   └── {CatalogID}/
│       └── catalog.xml                    # Products and categories
├── pricebooks/
│   └── {PriceBookID}/
│       └── pricebook.xml                  # Price definitions
├── customobjects/
│   └── {ObjectTypeID}.xml                 # Custom object instances
└── inventory-lists/
    └── {InventoryListID}/
        └── inventory.xml                  # Inventory records
```

### Tips

#### Checking Job Status

```bash
# Search for recent job executions
b2c job search

# Wait for a specific job execution
b2c job wait <execution-id>

# View job logs on failure
b2c job import ./my-data --wait --show-log
```

#### Best Practices

1. **Test imports on sandbox first** before importing to staging/production
2. **Use `--wait`** to ensure import completes before continuing
3. **Use `--show-log`** to debug failed imports
4. **Keep archives organized** by feature or change type
5. **Version control your metadata** XML files

#### Configuring External Services

For service configurations (HTTP, FTP, SOAP services), see the `b2c:b2c-webservices` skill which includes:
- Complete services.xml examples
- Credential, profile, and service element patterns
- Import/export workflows

Quick example:
```bash
# Import service configuration
b2c job import ./services-folder
```

Where `services-folder/services.xml` follows the patterns in the `b2c:b2c-webservices` skill.

### Detailed Reference

- [Metadata XML Patterns](references/METADATA-XML.md) - Common XML patterns for imports

### Related Skills

- `b2c:b2c-webservices` - Service configurations (HTTP, FTP, SOAP), services.xml format
- `b2c:b2c-metadata` - System object extensions and custom object definitions
- `b2c-cli:b2c-job` - Running jobs and monitoring import status

### Reference: METADATA-XML.md

#### Metadata XML Patterns

Common XML patterns for site archive imports.

##### XSD Schema Reference

For authoritative XML schema definitions, use the `b2c` CLI (if installed):

```bash
# View the metadata XSD schema
b2c docs schema metadata

# List all available schemas
b2c docs schema --list
```

##### Other Import Formats

For service configurations (HTTP services, credentials, profiles), see the `b2c:b2c-webservices` skill.

##### System Object Extensions

###### Add String Attribute to Product

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Product">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="externalId">
                <display-name xml:lang="x-default">External ID</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
                <externally-managed-flag>true</externally-managed-flag>
                <max-length>100</max-length>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="ExternalData">
                <display-name xml:lang="x-default">External Data</display-name>
                <attribute attribute-id="externalId"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

###### Add Enum Attribute to Order

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Order">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="fulfillmentStatus">
                <display-name xml:lang="x-default">Fulfillment Status</display-name>
                <type>enum-of-string</type>
                <mandatory-flag>false</mandatory-flag>
                <value-definitions>
                    <value-definition default="true">
                        <value>pending</value>
                        <display xml:lang="x-default">Pending</display>
                    </value-definition>
                    <value-definition>
                        <value>processing</value>
                        <display xml:lang="x-default">Processing</display>
                    </value-definition>
                    <value-definition>
                        <value>shipped</value>
                        <display xml:lang="x-default">Shipped</display>
                    </value-definition>
                    <value-definition>
                        <value>delivered</value>
                        <display xml:lang="x-default">Delivered</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="FulfillmentInfo">
                <display-name xml:lang="x-default">Fulfillment Info</display-name>
                <attribute attribute-id="fulfillmentStatus"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

###### Add Boolean Attribute to Customer Profile

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Profile">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="marketingOptIn">
                <display-name xml:lang="x-default">Marketing Opt-In</display-name>
                <type>boolean</type>
                <mandatory-flag>false</mandatory-flag>
                <default-value>false</default-value>
            </attribute-definition>
            <attribute-definition attribute-id="loyaltyMember">
                <display-name xml:lang="x-default">Loyalty Member</display-name>
                <type>boolean</type>
                <mandatory-flag>false</mandatory-flag>
                <default-value>false</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
    </type-extension>
</metadata>
```

##### Site Preferences

###### Boolean Preference

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="enableReviews">
                <display-name xml:lang="x-default">Enable Product Reviews</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
    </type-extension>
</metadata>
```

###### String Preference (API Key)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="analyticsApiKey">
                <display-name xml:lang="x-default">Analytics API Key</display-name>
                <type>password</type>
            </attribute-definition>
            <attribute-definition attribute-id="analyticsEndpoint">
                <display-name xml:lang="x-default">Analytics Endpoint</display-name>
                <type>string</type>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="AnalyticsSettings">
                <display-name xml:lang="x-default">Analytics Settings</display-name>
                <attribute attribute-id="analyticsApiKey"/>
                <attribute attribute-id="analyticsEndpoint"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

###### Preference Values

**sites/RefArch/preferences.xml:**

Preferences can be set per instance type:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<preferences xmlns="http://www.demandware.com/xml/impex/preferences/2007-03-31">
    <custom-preferences>
        <all-instances>
            <preference preference-id="enableReviews">true</preference>
        </all-instances>
        <development>
            <preference preference-id="analyticsEndpoint">https://dev-analytics.example.com/api</preference>
        </development>
        <production>
            <preference preference-id="analyticsEndpoint">https://analytics.example.com/api</preference>
        </production>
    </custom-preferences>
</preferences>
```

##### Custom Object Types

###### Simple Custom Object

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <custom-type type-id="Banner">
        <display-name xml:lang="x-default">Banner</display-name>
        <staging-mode>source-to-target</staging-mode>
        <storage-scope>site</storage-scope>
        <key-definition attribute-id="bannerId">
            <display-name xml:lang="x-default">Banner ID</display-name>
            <type>string</type>
            <min-length>1</min-length>
        </key-definition>
        <attribute-definitions>
            <attribute-definition attribute-id="title">
                <display-name xml:lang="x-default">Title</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="imageUrl">
                <display-name xml:lang="x-default">Image URL</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="linkUrl">
                <display-name xml:lang="x-default">Link URL</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="startDate">
                <display-name xml:lang="x-default">Start Date</display-name>
                <type>datetime</type>
            </attribute-definition>
            <attribute-definition attribute-id="endDate">
                <display-name xml:lang="x-default">End Date</display-name>
                <type>datetime</type>
            </attribute-definition>
            <attribute-definition attribute-id="isActive">
                <display-name xml:lang="x-default">Active</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
        </attribute-definitions>
    </custom-type>
</metadata>
```

###### Custom Object Data

**customobjects/Banner.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<custom-objects xmlns="http://www.demandware.com/xml/impex/customobject/2006-10-31">
    <custom-object type-id="Banner" object-id="homepage-hero">
        <object-attribute attribute-id="title">Summer Sale</object-attribute>
        <object-attribute attribute-id="imageUrl">/images/banners/summer-sale.jpg</object-attribute>
        <object-attribute attribute-id="linkUrl">/sale</object-attribute>
        <object-attribute attribute-id="startDate">2024-06-01T00:00:00.000Z</object-attribute>
        <object-attribute attribute-id="endDate">2024-08-31T23:59:59.000Z</object-attribute>
        <object-attribute attribute-id="isActive">true</object-attribute>
    </custom-object>
    <custom-object type-id="Banner" object-id="promo-banner">
        <object-attribute attribute-id="title">Free Shipping</object-attribute>
        <object-attribute attribute-id="imageUrl">/images/banners/free-shipping.jpg</object-attribute>
        <object-attribute attribute-id="linkUrl">/shipping-info</object-attribute>
        <object-attribute attribute-id="isActive">true</object-attribute>
    </custom-object>
</custom-objects>
```

##### Content Assets

**sites/RefArch/library/content/content.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<library xmlns="http://www.demandware.com/xml/impex/library/2006-10-31">
    <content content-id="terms-conditions">
        <display-name xml:lang="x-default">Terms and Conditions</display-name>
        <online-flag>true</online-flag>
        <searchable-flag>false</searchable-flag>
        <custom-attributes>
            <custom-attribute attribute-id="body" xml:lang="x-default">
                <![CDATA[<h1>Terms and Conditions</h1><p>Content here...</p>]]>
            </custom-attribute>
        </custom-attributes>
    </content>
</library>
```

##### Attribute Types Reference

| Type | XML Value | Example |
|------|-----------|---------|
| `string` | `<type>string</type>` | Text up to 4000 chars |
| `text` | `<type>text</type>` | Unlimited text |
| `int` | `<type>int</type>` | Whole numbers |
| `double` | `<type>double</type>` | Decimal numbers |
| `boolean` | `<type>boolean</type>` | true/false |
| `date` | `<type>date</type>` | Date only |
| `datetime` | `<type>datetime</type>` | Date and time |
| `email` | `<type>email</type>` | Email format |
| `password` | `<type>password</type>` | Encrypted |
| `html` | `<type>html</type>` | HTML content |
| `image` | `<type>image</type>` | Image reference |
| `enum-of-string` | `<type>enum-of-string</type>` | Single select |
| `set-of-string` | `<type>set-of-string</type>` | Multi-select |

##### Complete Import Example

Directory structure for adding a custom integration:

```
integration-import/
├── meta/
│   ├── system-objecttype-extensions.xml
│   └── custom-objecttype-definitions.xml
├── sites/
│   └── RefArch/
│       └── preferences.xml
└── customobjects/
    └── IntegrationConfig.xml
```

**meta/system-objecttype-extensions.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="integrationEnabled">
                <display-name xml:lang="x-default">Enable Integration</display-name>
                <type>boolean</type>
                <default-value>false</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
    </type-extension>
    <type-extension type-id="Order">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="integrationId">
                <display-name xml:lang="x-default">Integration ID</display-name>
                <type>string</type>
                <externally-managed-flag>true</externally-managed-flag>
            </attribute-definition>
        </custom-attribute-definitions>
    </type-extension>
</metadata>
```

**meta/custom-objecttype-definitions.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <custom-type type-id="IntegrationConfig">
        <display-name xml:lang="x-default">Integration Configuration</display-name>
        <staging-mode>source-to-target</staging-mode>
        <storage-scope>organization</storage-scope>
        <key-definition attribute-id="configKey">
            <display-name xml:lang="x-default">Config Key</display-name>
            <type>string</type>
        </key-definition>
        <attribute-definitions>
            <attribute-definition attribute-id="endpoint">
                <display-name xml:lang="x-default">Endpoint</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="apiKey">
                <display-name xml:lang="x-default">API Key</display-name>
                <type>password</type>
            </attribute-definition>
        </attribute-definitions>
    </custom-type>
</metadata>
```

**sites/RefArch/preferences.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<preferences xmlns="http://www.demandware.com/xml/impex/preferences/2007-03-31">
    <custom-preferences>
        <all-instances>
            <preference preference-id="integrationEnabled">true</preference>
        </all-instances>
    </custom-preferences>
</preferences>
```

**customobjects/IntegrationConfig.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<custom-objects xmlns="http://www.demandware.com/xml/impex/customobject/2006-10-31">
    <custom-object type-id="IntegrationConfig" object-id="production">
        <object-attribute attribute-id="endpoint">https://api.integration.com/v1</object-attribute>
    </custom-object>
</custom-objects>
```

Import command:
```bash
b2c job import ./integration-import --wait --show-log
```

---


<a id="b2c-sites"></a>
## b2c-sites

**When to use:** List and manage storefront sites and cartridge paths on B2C Commerce (SFCC/Demandware) instances with the b2c cli. Always reference when using the CLI to list storefront sites, find site IDs, check site status, view storefront configuration, site settings, channel IDs, or get a site list, or manage the ordered list of active cartridges on a site or Business Manager.

## B2C Sites Skill

Use the `b2c` CLI plugin to list and manage storefront sites on Salesforce B2C Commerce instances.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli sites list`).

### Commands

#### `b2c sites list`

Lists all sites on a B2C Commerce instance, showing site ID, display name, and storefront status.

```bash
# list all sites on the configured instance
b2c sites list

# list sites on a specific server
b2c sites list --server my-sandbox.demandware.net

# list sites with JSON output (useful for parsing/automation)
b2c sites list --json

# use a specific instance from config
b2c sites list --instance production

# enable debug logging
b2c sites list --debug
```

#### Cartridge Path Management

Manage the ordered list of active cartridges on a site. The singular alias `sites cartridge` also works.

```bash
# list the cartridge path for a storefront site
b2c sites cartridges list --site-id RefArch

# list the Business Manager cartridge path
b2c sites cartridges list --bm

# add a cartridge to the beginning of a site's path (default)
b2c sites cartridges add plugin_applepay --site-id RefArch

# add a cartridge to the end
b2c sites cartridges add plugin_applepay --site-id RefArch --position last

# add a cartridge after a specific cartridge
b2c sites cartridges add plugin_applepay --site-id RefArch --position after --target app_storefront_base

# add a cartridge to Business Manager
b2c sites cartridges add bm_extension --bm --position first

# remove a cartridge from a site
b2c sites cartridges remove old_cartridge --site-id RefArch

# replace the entire cartridge path
b2c sites cartridges set "app_storefront_base:plugin_applepay:plugin_wishlists" --site-id RefArch

# JSON output for automation
b2c sites cartridges list --site-id RefArch --json
```

When OCAPI direct permissions for `/sites/*/cartridges` are unavailable, cartridge commands automatically fall back to site archive import/export. Business Manager (`--bm`) updates always use site archive import.

**Key flags (inherited from InstanceCommand):**

| Flag | Short | Description |
|------|-------|-------------|
| `--server` | `-s` | B2C instance hostname (env: `SFCC_SERVER`) |
| `--json` | | Output full site data as JSON |
| `--instance` | | Named instance from config |
| `--debug` | | Enable debug logging |

**Output columns:** ID, Display Name, Status (storefront_status).

**JSON output** returns the full OCAPI sites response including all site properties (useful for extracting channel IDs, custom preferences, and other site metadata not shown in the table).

### Common Use Cases

**Finding site IDs for other commands:** Many commands (e.g., site import/export) require a site ID. Use `sites list` to discover valid IDs:

```bash
b2c sites list
# then use the ID in other commands
b2c site-import upload --site RefArch ...
```

**Checking site status:** The status column shows the storefront status (online/offline) for each site, useful for verifying deployment state.

**Scripting and automation:** Use `--json` to get machine-readable output for CI/CD pipelines:

```bash
b2c sites list --json | jq '.data[].id'
```

### Related Skills

- **b2c-config** -- configure instances, credentials, and debug connection issues
- **b2c-site-import-export** -- import/export site archives and metadata XML

---


<a id="b2c-slas"></a>
## b2c-slas

**When to use:** Manage SLAS (Shopper Login and API Access Service) clients for B2C Commerce (SFCC/Demandware) with the b2c cli. Always reference when using the CLI to create, update, list, or delete SLAS clients, manage shopper OAuth scopes (including custom scopes like c_loyalty), or configure shopper authentication for PWA/headless. SLAS is for shopper (customer) authentication, not admin APIs.

## B2C SLAS Skill

Use the `b2c` CLI plugin to manage SLAS (Shopper Login and API Access Service) API clients and credentials.

> **Important:** SLAS is for **shopper** (customer) authentication used by storefronts and headless commerce. For **admin** tokens (OCAPI, Admin APIs), use `b2c auth token` - see [b2c-config skill](../b2c-config/SKILL.md).

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli slas client list`).

### When to Use

Common scenarios requiring SLAS client management:

- **Testing Custom APIs**: Create a client with custom scopes (e.g., `c_loyalty`) to test your Custom API endpoints
- **PWA/Headless Development**: Configure clients for composable storefronts
- **Integration Testing**: Create dedicated test clients with specific scope sets

### Examples

#### List SLAS Clients

```bash
# list all SLAS clients for a tenant
b2c slas client list --tenant-id abcd_123

# list with JSON output
b2c slas client list --tenant-id abcd_123 --json
```

#### Get SLAS Client Details

```bash
# get details for a specific SLAS client
b2c slas client get my-client-id --tenant-id abcd_123
```

#### Create SLAS Client

```bash
# create a new SLAS client with default scopes (auto-generates UUID client ID)
b2c slas client create --tenant-id abcd_123 --channels RefArch --default-scopes --redirect-uri http://localhost:3000/callback

# create with a specific client ID and custom scopes
b2c slas client create my-client-id --tenant-id abcd_123 --channels RefArch --scopes sfcc.shopper-products,sfcc.shopper-search --redirect-uri http://localhost:3000/callback

# create a public client
b2c slas client create --tenant-id abcd_123 --channels RefArch --default-scopes --redirect-uri http://localhost:3000/callback --public

# create client without auto-creating tenant (if you manage tenants separately)
b2c slas client create --tenant-id abcd_123 --channels RefArch --default-scopes --redirect-uri http://localhost:3000/callback --no-create-tenant

# output as JSON (useful for capturing the generated secret)
b2c slas client create --tenant-id abcd_123 --channels RefArch --default-scopes --redirect-uri http://localhost:3000/callback --json
```

Note: By default, the tenant is automatically created if it doesn't exist.

**Warning:** Use `--scopes` (plural) for client scopes, NOT `--auth-scope` (singular). The `--auth-scope` flag is a global authentication option for OAuth scopes.

#### Create Client for Custom API Testing

When testing a Custom API that requires custom scopes:

```bash
# Create a private client with custom scope for testing
# Replace c_my_scope with your API's custom scope from schema.yaml
b2c slas client create \
  --tenant-id zzpq_013 \
  --channels RefArch \
  --default-scopes \
  --scopes "c_my_scope" \
  --redirect-uri http://localhost:3000/callback \
  --json

# Output includes client_id and client_secret - save these for token requests
```

**Important:** The custom scope in your SLAS client must match the scope defined in your Custom API's `schema.yaml` security section.

#### Get a Shopper Token

Use `b2c slas token` to obtain a shopper access token for API testing:

```bash
# Guest token with auto-discovery (finds first public SLAS client)
b2c slas token --tenant-id abcd_123 --site-id RefArch

# Guest token with explicit client (public PKCE flow)
b2c slas token --slas-client-id my-client --tenant-id abcd_123 --short-code kv7kzm78 --site-id RefArch

# Guest token with private client (client_credentials flow)
b2c slas token --slas-client-id my-client --slas-client-secret sk_xxx --tenant-id abcd_123 --short-code kv7kzm78 --site-id RefArch

# Registered customer token
b2c slas token --tenant-id abcd_123 --site-id RefArch --shopper-login user@example.com --shopper-password secret

# JSON output (includes refresh token, expiry, usid, etc.)
b2c slas token --tenant-id abcd_123 --site-id RefArch --json

# Use token in a subsequent API call
TOKEN=$(b2c slas token --tenant-id abcd_123 --site-id RefArch)
curl -H "Authorization: Bearer $TOKEN" "https://kv7kzm78.api.commercecloud.salesforce.com/..."
```

The `--slas-client-id` and `--slas-client-secret` can also be set via `SFCC_SLAS_CLIENT_ID` and `SFCC_SLAS_CLIENT_SECRET` environment variables, or `slasClientId` and `slasClientSecret` in dw.json.

#### Update SLAS Client

```bash
# update the display name
b2c slas client update my-client-id --tenant-id abcd_123 --name "New Name"

# rotate the client secret
b2c slas client update my-client-id --tenant-id abcd_123 --secret new-secret-value

# add scopes (appends to existing by default)
b2c slas client update my-client-id --tenant-id abcd_123 --scopes sfcc.shopper-baskets

# replace scopes instead of appending
b2c slas client update my-client-id --tenant-id abcd_123 --scopes sfcc.shopper-baskets --replace

# replace channels
b2c slas client update my-client-id --tenant-id abcd_123 --channels RefArch,SiteGenesis --replace
```

#### Delete SLAS Client

```bash
# delete a SLAS client
b2c slas client delete my-client-id --tenant-id abcd_123
```

#### Configuration

The tenant ID can be set via environment variable:
- `SFCC_TENANT_ID`: SLAS tenant ID (organization ID)

#### More Commands

See `b2c slas --help` for a full list of available commands and options in the `slas` topic.

### Related Skills

- `b2c:b2c-custom-api-development` - Creating Custom APIs that require SLAS authentication
- `b2c-cli:b2c-scapi-custom` - Checking Custom API registration status

---


<a id="b2c-users-roles"></a>
## b2c-users-roles

**When to use:** Manage users and roles with the b2c cli. Covers Account Manager (AM) user CRUD, AM role grant/revoke with scoping, AM organizations, AM API clients, and Business Manager (BM) instance-level role CRUD, user assignment, and permissions. Use when managing users, roles, permissions, organizations, or API clients in Account Manager or Business Manager.

## B2C Users and Roles Skill

Use the `b2c` CLI to manage users and roles across Account Manager (AM) and Business Manager (BM).

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead.

### Overview

| Area | Topic | Description |
|------|-------|-------------|
| Account Manager | `am users` | Create, update, delete AM users |
| Account Manager | `am roles` | List, grant, revoke AM roles (with optional tenant scope) |
| Account Manager | `am orgs` | List organizations |
| Account Manager | `am clients` | Manage API clients |
| Business Manager | `bm roles` | Create, delete instance-level BM roles |
| Business Manager | `bm roles grant/revoke` | Assign/unassign users to BM roles on an instance |
| Business Manager | `bm roles permissions` | Get/set role permissions on an instance |

### Account Manager Users

```bash
# list all users
b2c am users list

# create a user
b2c am users create --mail user@example.com --first-name Jane --last-name Doe --org MyOrg

# get a user by login
b2c am users get user@example.com

# update a user
b2c am users update user@example.com --first-name Janet

# delete (disable) a user
b2c am users delete user@example.com

# reset a user to INITIAL state
b2c am users reset user@example.com
```

### Account Manager Roles

```bash
# list all AM roles
b2c am roles list

# list roles filtered by target type
b2c am roles list --target-type User

# get role details
b2c am roles get bm-admin

# grant a role to a user
b2c am roles grant user@example.com --role bm-admin

# grant a role with tenant scope
b2c am roles grant user@example.com --role bm-admin --scope tenant1,tenant2

# revoke a role
b2c am roles revoke user@example.com --role bm-admin

# revoke only specific scope
b2c am roles revoke user@example.com --role bm-admin --scope tenant1
```

### Account Manager Organizations and API Clients

```bash
# list organizations
b2c am orgs list

# list API clients
b2c am clients list

# create an API client
b2c am clients create --display-name "My Client" --org MyOrg

# reset API client password
b2c am clients password my-client-id
```

### Business Manager Roles

BM role commands operate on a specific Commerce Cloud instance (via `--server` or config).

```bash
# list BM roles on an instance
b2c bm roles list --server my-sandbox.demandware.net

# get role details (with user list)
b2c bm roles get Administrator --expand users

# create a custom role
b2c bm roles create MyCustomRole --description "Custom role for content editors"

# delete a custom role (system roles cannot be deleted)
b2c bm roles delete MyCustomRole

# grant a BM role to a user on the instance
b2c bm roles grant user@example.com --role Administrator

# revoke a BM role from a user
b2c bm roles revoke user@example.com --role Administrator

# all commands support --json for machine-readable output
b2c bm roles list --json
```

### Business Manager Role Permissions

Permissions use a file-based get/set workflow since the API replaces all permissions at once.

```bash
# view permission summary
b2c bm roles permissions get Administrator

# export permissions to a JSON file for editing
b2c bm roles permissions get Administrator --output admin-perms.json

# edit the file, then apply
b2c bm roles permissions set Administrator --file admin-perms.json
```

The permissions JSON has four sections: `functional`, `module`, `locale`, and `webdav`. Each can be scoped to organization, site, or unscoped depending on type.

### Authentication Requirements

| Operations | Client Credentials | User Auth |
|---|---|---|
| AM Users and Roles | User Administrator role on API client | Account Administrator or User Administrator |
| AM Organizations | Not supported | Account Administrator |
| AM API Clients | Not supported | Account Administrator or API Administrator |
| BM Roles | OCAPI permissions for `/roles` resource | OCAPI permissions for `/roles` resource |

### Related Skills

- `b2c-cli:b2c-config` - Configure authentication credentials and instance settings
- `b2c-cli:b2c-sandbox` - Create and manage sandboxes (instances)

---


<a id="b2c-webdav"></a>
## b2c-webdav

**When to use:** List, upload, download, and manage files on B2C Commerce instances via WebDAV with the b2c cli. Always reference when using the CLI to upload or download files via WebDAV, manage IMPEX directories, create remote directories, or zip/unzip remote files. For log exploration and tailing, use b2c-logs instead.

## B2C WebDAV Skill

Use the `b2c` CLI plugin to perform WebDAV file operations on Salesforce B2C Commerce instances. This includes listing files, uploading, downloading, and managing files across different WebDAV roots.

> **Tip:** If `b2c` is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli webdav ls`).

### WebDAV Roots

The `--root` flag specifies the WebDAV directory:
- `impex` (default) - Import/Export directory
- `temp` - Temporary files
- `cartridges` - Code cartridges
- `realmdata` - Realm data
- `catalogs` - Product catalogs
- `libraries` - Content libraries
- `static` - Static resources
- `logs` - Application logs
- `securitylogs` - Security logs

### Examples

#### List Files

```bash
# list files in the default IMPEX root
b2c webdav ls

# list files in a specific path
b2c webdav ls src/instance

# list files in the cartridges root
b2c webdav ls --root=cartridges

# list files with JSON output
b2c webdav ls --root=impex --json
```

#### Download Files

```bash
# download a file from IMPEX (default root)
b2c webdav get src/instance/export.zip

# download to a specific local path
b2c webdav get src/instance/export.zip -o ./downloads/export.zip

# download from a specific root
b2c webdav get customerror.log --root=logs

# output file content to stdout
b2c webdav get src/instance/data.xml -o -
```

#### Upload Files

```bash
# upload a file to IMPEX
b2c webdav put ./local-file.zip src/instance/

# upload to a specific root
b2c webdav put ./my-cartridge.zip --root=cartridges
```

#### Create Directories

```bash
# create a directory in IMPEX
b2c webdav mkdir src/instance/my-folder

# create a directory in a specific root
b2c webdav mkdir my-folder --root=temp
```

#### Delete Files

```bash
# delete a file
b2c webdav rm src/instance/old-export.zip

# delete from a specific root
b2c webdav rm old-file.txt --root=temp
```

#### Delete Cartridges

To delete cartridges from a code version, use the `cartridges` root with the path format `{code-version}/{cartridge-name}`:

```bash
# delete a cartridge from a code version
b2c webdav rm v25_1_0/app_mysite --root=cartridges

# delete multiple cartridges
b2c webdav rm v25_1_0/app_mysite --root=cartridges
b2c webdav rm v25_1_0/int_myintegration --root=cartridges

# list cartridges in a code version first
b2c webdav ls v25_1_0 --root=cartridges
```

**Important:** The path is `{code-version}/{cartridge-name}`, not `/cartridges/{code-version}/...`. The `--root=cartridges` (or `-r cartridges`) flag sets the WebDAV root.

#### Zip/Unzip Remote Files

```bash
# create a zip archive of a remote directory
b2c webdav zip src/instance/my-folder

# extract a remote zip archive
b2c webdav unzip src/instance/archive.zip
```

#### More Commands

See `b2c webdav --help` for a full list of available commands and options in the `webdav` topic.

### Related Skills

- `b2c-cli:b2c-logs` - Filtered log retrieval, search, and real-time tailing (preferred for log exploration)
- `b2c-cli:b2c-code` - Higher-level code deployment (preferred for cartridge upload)
- `b2c-cli:b2c-job` - Import/export site archives

---


# Part 2 — Development patterns & APIs


<a id="b2c-business-manager-extensions"></a>
## b2c-business-manager-extensions

**When to use:** Create Business Manager extension cartridges for B2C Commerce. Use when building admin tools, BM menu items, or custom BM pages (bm_* cartridges). Covers bm_extensions.xml, menu items, dialog actions, and form extensions.

## Business Manager Extensions Skill

This skill guides you through creating Business Manager (BM) extension cartridges to customize the admin interface.

### Overview

BM extensions allow you to add custom functionality to Business Manager:

| Extension Type | Purpose |
|----------------|---------|
| **Menu Items** | Add top-level menu sections |
| **Menu Actions** | Add functional links under menus |
| **Dialog Actions** | Add buttons to existing BM pages |
| **Form Extensions** | Add fields to existing forms |

### File Structure

```
/bm_my_extension
    /cartridge
        bm_extensions.xml           # Extension definitions (required)
        /controllers
            MyExtension.js          # Controller for menu actions
        /templates
            /default
                /extensions
                    mypage.isml     # Custom BM pages
        /static
            /default
                /icons
                    my-icon.gif     # Menu icons
```

### Basic bm_extensions.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<extensions xmlns="http://www.demandware.com/xml/extensibility/2013-04-24">
    <!-- Menu Item: Creates section in navigation -->
    <menuitem id="my-tools" name="label.menu.mytools"
              site="false" position="10">
        <icon path="icons/my-icon.gif"/>
    </menuitem>

    <!-- Menu Action: Creates link under menu item -->
    <menuaction id="my-dashboard" menupath="my-tools"
                name="label.action.dashboard">
        <exec pipeline="MyExtension" node="Dashboard"/>
        <sub-pipelines>
            <pipeline name="MyExtension"/>
        </sub-pipelines>
    </menuaction>
</extensions>
```

### Menu Items

Create top-level navigation sections:

```xml
<menuitem id="custom-tools"
          name="label.menu.customtools"
          site="false"
          position="10">
    <description>Custom administration tools</description>
    <icon path="icons/tools-icon.gif"/>
</menuitem>
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id` | Yes | Unique identifier |
| `name` | Yes | Resource key for display name |
| `site` | No | `true` = Site menu, `false` = Admin menu (default: true) |
| `position` | No | Sort order (higher = higher in list) |

### Menu Actions

Add functional pages under menu items:

```xml
<menuaction id="product-export"
            menupath="custom-tools"
            name="label.action.productexport">
    <description>Export products to CSV</description>
    <exec pipeline="ProductExport" node="Start"/>
    <sub-pipelines>
        <pipeline name="ProductExport"/>
    </sub-pipelines>
    <icon path="icons/export-icon.gif"/>
</menuaction>
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id` | Yes | Unique identifier |
| `menupath` | No | Parent menu item ID |
| `name` | Yes | Resource key for display name |

**Note:** For controllers, use `pipeline="ControllerName"` and `node="ActionName"`.

### Dialog Actions

Add buttons to existing BM pages:

```xml
<dialogaction id="order-export-btn"
              menuaction-ref="order-search"
              xp-ref="OrderPage-OrderDetails">
    <exec pipeline="OrderExport" node="Export"/>
    <icon path="icons/export.gif"/>
    <parameters>
        <parameter name="OrderNo"/>
    </parameters>
</dialogaction>
```

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id` | Yes | Unique identifier |
| `menuaction-ref` | Yes | Parent menu action ID |
| `xp-ref` | Yes | Extension point ID |

Common extension points: `OrderPage-OrderDetails`, `ProductPage-Details`, `CustomerPage-Profile`

### Form Extensions

Add fields to existing BM forms:

```xml
<formextension id="order-search-extension">
    <valueinput type="string" name="customOrderField">
        <label xml:lang="x-default">Custom Field</label>
        <label xml:lang="de">Benutzerdefiniertes Feld</label>
    </valueinput>
    <valueinput type="string" name="exportStatus">
        <label xml:lang="x-default">Export Status</label>
        <option>Pending</option>
        <option>Exported</option>
        <option>Failed</option>
    </valueinput>
</formextension>
```

### Controller Example

```javascript
'use strict';

var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');

exports.Dashboard = function () {
    ISML.renderTemplate('extensions/dashboard', {
        title: 'My Dashboard',
        data: getReportData()
    });
};
exports.Dashboard.public = true;

exports.ProcessAction = function () {
    var params = request.httpParameterMap;
    var itemId = params.itemId.stringValue;

    // Process the action
    var result = processItem(itemId);

    // Redirect back or show result
    response.redirect(URLUtils.url('MyExtension-Dashboard', 'result', result));
};
exports.ProcessAction.public = true;
```

### Template Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>${pdict.title}</title>
    <link rel="stylesheet" href="${URLUtils.staticURL('/css/bm-custom.css')}"/>
</head>
<body>
    <div class="bm-content">
        <h1>${pdict.title}</h1>

        <table class="bm-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <isloop items="${pdict.data}" var="item">
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>
                            <a href="${URLUtils.url('MyExtension-ProcessAction', 'itemId', item.id)}">
                                Process
                            </a>
                        </td>
                    </tr>
                </isloop>
            </tbody>
        </table>
    </div>
</body>
</html>
```

### Localization

Add resource bundles for labels:

**templates/resources/bm_extensions.properties:**
```properties
label.menu.customtools=Custom Tools
label.action.dashboard=Dashboard
label.action.productexport=Product Export
```

**templates/resources/bm_extensions_de.properties:**
```properties
label.menu.customtools=Benutzerdefinierte Werkzeuge
label.action.dashboard=Instrumententafel
label.action.productexport=Produktexport
```

### Enabling the Extension

1. Add cartridge to Business Manager site's cartridge path:
   - Administration > Sites > Manage Sites > Business Manager
   - Add cartridge ID to cartridge path

2. Grant permissions to roles:
   - Administration > Organization > Roles
   - Select role > Business Manager Modules
   - Enable your custom modules

### Best Practices

1. **Prefix IDs** with your organization name to avoid conflicts
2. **Use resource keys** for all displayed text (localization)
3. **Keep cartridge separate** - don't mix with storefront cartridges
4. **Test permissions** with different user roles
5. **Don't reference internal BM URLs** - they may change

### Detailed Reference

- [Extensions XML Reference](references/EXTENSIONS-XML.md) - Complete XML schema and examples

### Reference: EXTENSIONS-XML.md

#### Business Manager Extensions XML Reference

Complete reference for bm_extensions.xml schema.

##### XSD Schema Reference

For the authoritative XML schema definition, use the `b2c` CLI (if installed):

```bash
# View the BM extensions XSD schema
b2c docs schema bmext
```

##### File Location

```
/bm_cartridge_name
    /cartridge
        bm_extensions.xml    <-- Required file
```

##### Root Element

```xml
<?xml version="1.0" encoding="UTF-8"?>
<extensions xmlns="http://www.demandware.com/xml/extensibility/2013-04-24">
    <!-- Menu items, menu actions, dialog actions, form extensions -->
</extensions>
```

##### Menu Item Element

Creates navigation sections.

```xml
<menuitem id="my-tools"
          name="label.menu.name"
          site="false"
          position="100">
    <description>Optional description resource key</description>
    <short-description>Short description key</short-description>
    <icon path="icons/menu-icon.gif"/>
</menuitem>
```

###### Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `id` | Yes | - | Unique identifier |
| `name` | Yes | - | Resource key for menu name |
| `site` | No | `true` | `true` = Site menu, `false` = Admin menu |
| `position` | No | 0 | Sort order (higher = appears higher) |

###### Child Elements

| Element | Description |
|---------|-------------|
| `<description>` | Tooltip resource key |
| `<short-description>` | Short description resource key |
| `<icon path="..."/>` | Icon path relative to static folder |

##### Menu Action Element

Creates functional pages/links.

```xml
<menuaction id="export-products"
            menupath="my-tools"
            name="label.action.export"
            position="10">
    <description>Export products resource key</description>
    <exec pipeline="ExportController" node="Start"/>
    <sub-pipelines>
        <pipeline name="ExportController"/>
        <pipeline name="ExportHelper"/>
    </sub-pipelines>
    <parameters>
        <parameter name="format" value="csv"/>
    </parameters>
    <icon path="icons/export.gif"/>
</menuaction>
```

###### Attributes

| Attribute | Required | Default | Description |
|-----------|----------|---------|-------------|
| `id` | Yes | - | Unique identifier |
| `menupath` | No | - | Parent menu item ID |
| `name` | Yes | - | Resource key for action name |
| `position` | No | 0 | Sort order |

###### Child Elements

| Element | Required | Description |
|---------|----------|-------------|
| `<exec>` | Yes | Controller/pipeline reference |
| `<sub-pipelines>` | Yes | All pipelines used by this action |
| `<description>` | No | Description resource key |
| `<parameters>` | No | Static parameters |
| `<icon>` | No | Icon path |

###### exec Element

```xml
<!-- For controller -->
<exec pipeline="ControllerName" node="ActionName"/>

<!-- With conditional security -->
<exec pipeline="SecureController" node="Action" https="true"/>
```

| Attribute | Description |
|-----------|-------------|
| `pipeline` | Controller or pipeline name |
| `node` | Action/start node name |
| `https` | Require HTTPS (optional) |

##### Dialog Action Element

Adds buttons/actions to existing BM pages.

```xml
<dialogaction id="custom-order-action"
              menuaction-ref="order-details"
              xp-ref="OrderPage-OrderDetails"
              position="10">
    <exec pipeline="OrderCustom" node="CustomAction"/>
    <parameters>
        <parameter name="OrderNo"/>
        <parameter name="OrderUUID"/>
    </parameters>
    <icon path="icons/action.gif"/>
    <extern>false</extern>
</dialogaction>
```

###### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id` | Yes | Unique identifier |
| `menuaction-ref` | Yes | Parent menu action ID |
| `xp-ref` | Yes | Extension point ID |
| `position` | No | Sort order |

###### Child Elements

| Element | Description |
|---------|-------------|
| `<exec>` | Controller/pipeline reference |
| `<parameters>` | Context parameters to pass |
| `<icon>` | Icon path |
| `<extern>` | `true` opens new window |

###### Common Extension Points

| Extension Point | Page |
|-----------------|------|
| `OrderPage-OrderDetails` | Order detail page |
| `OrderPage-OrderAttributes` | Order attributes section |
| `ProductPage-General` | Product general section |
| `ProductPage-Images` | Product images section |
| `CustomerPage-Profile` | Customer profile page |
| `CustomerPage-Addresses` | Customer addresses |
| `ContentPage-General` | Content asset page |
| `CatalogPage-CategoryGeneral` | Category general section |

##### Form Extension Element

Adds fields to existing BM forms.

```xml
<formextension id="order-search-custom">
    <valueinput type="string" name="customField" defaultvalue="">
        <label xml:lang="x-default">Custom Field</label>
        <label xml:lang="de">Benutzerdefiniertes Feld</label>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </valueinput>

    <valueinput type="int" name="minQuantity">
        <label xml:lang="x-default">Minimum Quantity</label>
    </valueinput>

    <valueinput type="double" name="minPrice">
        <label xml:lang="x-default">Minimum Price</label>
    </valueinput>
</formextension>
```

###### Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `id` | Yes | Unique identifier |

###### valueinput Attributes

| Attribute | Description |
|-----------|-------------|
| `type` | `string`, `int`, `double` |
| `name` | Field name |
| `defaultvalue` | Default value |

###### Child Elements

| Element | Description |
|---------|-------------|
| `<label xml:lang="...">` | Localized label (required) |
| `<option>` | Dropdown options (optional) |

##### Complete Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<extensions xmlns="http://www.demandware.com/xml/extensibility/2013-04-24">

    <!-- Admin Menu Item -->
    <menuitem id="acme-tools"
              name="label.menu.acmetools"
              site="false"
              position="50">
        <description>label.menu.acmetools.desc</description>
        <icon path="icons/acme-menu.gif"/>
    </menuitem>

    <!-- Site Menu Item -->
    <menuitem id="acme-site-tools"
              name="label.menu.acmesitetools"
              site="true"
              position="50">
        <icon path="icons/acme-site.gif"/>
    </menuitem>

    <!-- Dashboard Action -->
    <menuaction id="acme-dashboard"
                menupath="acme-tools"
                name="label.action.dashboard"
                position="10">
        <exec pipeline="AcmeDashboard" node="Show"/>
        <sub-pipelines>
            <pipeline name="AcmeDashboard"/>
        </sub-pipelines>
        <icon path="icons/dashboard.gif"/>
    </menuaction>

    <!-- Export Action -->
    <menuaction id="acme-export"
                menupath="acme-tools"
                name="label.action.export"
                position="20">
        <description>label.action.export.desc</description>
        <exec pipeline="AcmeExport" node="Start"/>
        <sub-pipelines>
            <pipeline name="AcmeExport"/>
        </sub-pipelines>
        <parameters>
            <parameter name="defaultFormat" value="csv"/>
        </parameters>
    </menuaction>

    <!-- Site-specific Action -->
    <menuaction id="acme-site-report"
                menupath="acme-site-tools"
                name="label.action.sitereport"
                position="10">
        <exec pipeline="AcmeSiteReport" node="Generate"/>
        <sub-pipelines>
            <pipeline name="AcmeSiteReport"/>
        </sub-pipelines>
    </menuaction>

    <!-- Order Page Button -->
    <dialogaction id="acme-order-sync"
                  menuaction-ref="order-details"
                  xp-ref="OrderPage-OrderDetails"
                  position="100">
        <exec pipeline="AcmeOrderSync" node="Sync"/>
        <parameters>
            <parameter name="OrderNo"/>
        </parameters>
        <icon path="icons/sync.gif"/>
    </dialogaction>

    <!-- Product Page Button -->
    <dialogaction id="acme-product-validate"
                  menuaction-ref="product-details"
                  xp-ref="ProductPage-General"
                  position="50">
        <exec pipeline="AcmeProductValidate" node="Validate"/>
        <parameters>
            <parameter name="ProductID"/>
        </parameters>
    </dialogaction>

    <!-- Order Search Form Extension -->
    <formextension id="acme-order-search">
        <valueinput type="string" name="acmeOrderId">
            <label xml:lang="x-default">ACME Order ID</label>
            <label xml:lang="de">ACME Bestellnummer</label>
        </valueinput>
        <valueinput type="string" name="acmeSyncStatus">
            <label xml:lang="x-default">Sync Status</label>
            <option>All</option>
            <option>Synced</option>
            <option>Pending</option>
            <option>Failed</option>
        </valueinput>
    </formextension>

</extensions>
```

##### Controller Template

```javascript
'use strict';

var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('bm', 'AcmeDashboard');

/**
 * Show dashboard
 */
exports.Show = function () {
    var stats = calculateStats();

    ISML.renderTemplate('extensions/acme/dashboard', {
        stats: stats,
        breadcrumbs: [
            { name: 'ACME Tools', url: null },
            { name: 'Dashboard', url: null }
        ]
    });
};
exports.Show.public = true;

/**
 * Process action and redirect
 */
exports.Process = function () {
    var params = request.httpParameterMap;
    var action = params.action.stringValue;

    try {
        // Process action
        var result = performAction(action);

        response.redirect(URLUtils.url('AcmeDashboard-Show',
            'success', 'true',
            'message', 'Action completed'
        ));
    } catch (e) {
        log.error('Action failed: ' + e.message);
        response.redirect(URLUtils.url('AcmeDashboard-Show',
            'error', 'true',
            'message', e.message
        ));
    }
};
exports.Process.public = true;
```

##### ISML Template

```html
<!DOCTYPE html>
<html>
<head>
    <title>ACME Dashboard</title>
    <style>
        .dashboard { padding: 20px; }
        .stat-card { border: 1px solid #ccc; padding: 15px; margin: 10px; display: inline-block; }
        .stat-value { font-size: 24px; font-weight: bold; }
        .stat-label { color: #666; }
        .success { color: green; }
        .error { color: red; }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>ACME Dashboard</h1>

        <!-- Messages -->
        <isif condition="${request.httpParameterMap.success.stringValue == 'true'}">
            <div class="success">${request.httpParameterMap.message.stringValue}</div>
        </isif>
        <isif condition="${request.httpParameterMap.error.stringValue == 'true'}">
            <div class="error">${request.httpParameterMap.message.stringValue}</div>
        </isif>

        <!-- Stats -->
        <div class="stats">
            <isloop items="${pdict.stats}" var="stat">
                <div class="stat-card">
                    <div class="stat-value">${stat.value}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            </isloop>
        </div>

        <!-- Actions -->
        <div class="actions">
            <a href="${URLUtils.url('AcmeDashboard-Process', 'action', 'refresh')}"
               class="button">Refresh Data</a>
        </div>
    </div>
</body>
</html>
```

---


<a id="b2c-controllers"></a>
## b2c-controllers

**When to use:** Create storefront controllers in SFRA or classic B2C Commerce patterns. Use when building pages, handling form submissions, creating AJAX endpoints, or working with server.get/server.post, res.render, res.json, and middleware chains. Also covers URLUtils for URL generation.

## Controllers Skill

This skill guides you through creating storefront controllers for Salesforce B2C Commerce. Controllers handle HTTP requests and render responses for the storefront.

### Overview

Controllers are JavaScript modules that handle storefront requests. A controller URL has this structure:

```
https://{domain}/on/demandware.store/Sites-{SiteName}-Site/{locale}/{ControllerName}-{FunctionName}
```

**Example:** `https://example.com/on/demandware.store/Sites-RefArch-Site/en_US/Home-Show`

### Two Controller Patterns

B2C Commerce supports two controller patterns:

| Pattern | When to Use | Module Style |
|---------|-------------|--------------|
| **SFRA** | Storefront Reference Architecture sites | `server` module with middleware |
| **Classic** | Non-SFRA sites, simple APIs | Direct exports with `.public = true` |

**SFRA is recommended** for most storefront development. Classic controllers are useful for simple endpoints or non-SFRA projects.

### File Location

Controllers reside in the cartridge's `controllers` directory:

```
/my-cartridge
    /cartridge
        /controllers
            Home.js           # URL: Home-{function}
            Product.js        # URL: Product-{function}
            Cart.js           # URL: Cart-{function}
```

**Naming:** Controller filename becomes the URL prefix. `Home.js` handles `Home-*` requests.

### SFRA Controllers (Recommended)

SFRA controllers use the `server` module for routing and middleware:

```javascript
'use strict';

var server = require('server');

// Handle GET request
server.get('Show', function (req, res, next) {
    res.render('home/homepage');
    next();
});

// Handle POST request
server.post('Subscribe', function (req, res, next) {
    var email = req.form.email;
    // Process subscription...
    res.json({ success: true });
    next();
});

module.exports = server.exports();
```

#### Request Object (req)

```javascript
req.querystring          // Query parameters: ?q=shoes -> req.querystring.q
req.form                 // Form POST data: req.form.email
req.httpMethod           // HTTP method: 'GET', 'POST', etc.
req.httpHeaders          // Request headers
req.currentCustomer      // Current customer object
req.locale               // Current locale
req.session              // Session object
```

#### Response Object (res)

```javascript
res.render('template', model)   // Render ISML template with data
res.json(object)                // Return JSON response
res.redirect(url)               // Redirect to URL
res.setViewData(data)           // Add data to view model
res.getViewData()               // Get current view model
res.setStatusCode(code)         // Set HTTP status code
```

#### Middleware

Apply middleware to routes for cross-cutting concerns:

```javascript
var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

// Apply caching
server.get('Show', cache.applyDefaultCache, function (req, res, next) {
    res.render('home/homepage');
    next();
});

// Require HTTPS
server.post('Login', server.middleware.https, function (req, res, next) {
    // Handle login...
    next();
});

// CSRF protection for forms
server.post('Submit', csrfProtection.validateAjaxRequest, function (req, res, next) {
    // Handle form submission...
    next();
});
```

#### Common Middleware

| Middleware | Purpose |
|------------|---------|
| `server.middleware.https` | Require HTTPS connection |
| `cache.applyDefaultCache` | Apply default page caching |
| `csrfProtection.validateAjaxRequest` | Validate CSRF token |
| `consentTracking.consent` | Check tracking consent |
| `userLoggedIn.validateLoggedIn` | Require authenticated user |

#### Route Events

Execute code at specific points in the request lifecycle:

```javascript
server.post('Submit', function (req, res, next) {
    var form = req.form;
    res.setViewData({ email: form.email });
    next();
}, function (req, res, next) {
    // Additional middleware
    next();
});

// Execute after all middleware, before render
this.on('route:BeforeComplete', function (req, res) {
    var viewData = res.getViewData();
    // Modify view data if needed
});
```

#### Extending Controllers

Extend existing controllers to add or modify functionality:

```javascript
'use strict';

var server = require('server');
var page = module.superModule;  // Get parent controller

server.extend(page);

// Add new route
server.get('NewRoute', function (req, res, next) {
    res.render('newtemplate');
    next();
});

// Override existing route
server.replace('Show', function (req, res, next) {
    // Custom implementation
    res.render('custom/homepage');
    next();
});

// Prepend to existing route
server.prepend('Show', function (req, res, next) {
    // Runs before original handler
    next();
});

// Append to existing route
server.append('Show', function (req, res, next) {
    // Runs after original handler
    var viewData = res.getViewData();
    viewData.customData = 'value';
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
```

### Classic Controllers (Non-SFRA)

For non-SFRA sites or simple endpoints, use direct exports:

```javascript
'use strict';

var ISML = require('dw/template/ISML');

exports.Show = function () {
    var params = request.httpParameterMap;
    var productId = params.pid.stringValue;

    ISML.renderTemplate('product/detail', {
        productId: productId
    });
};
exports.Show.public = true;  // Required: marks function as accessible

exports.GetData = function () {
    var result = { status: 'ok', data: [] };

    response.setContentType('application/json');
    response.writer.print(JSON.stringify(result));
};
exports.GetData.public = true;
```

**Key difference:** Classic controllers use `exports.FunctionName.public = true` instead of the `server` module.

### Module Imports

Import B2C Commerce APIs using `require()`:

```javascript
// B2C Commerce APIs
var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');

// Cartridge modules (use */ for cartridge path resolution)
var collections = require('*/cartridge/scripts/util/collections');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
```

**Best Practice:** Only require modules when needed, not all at the top of the file.

### Error Handling

Wrap operations in try-catch blocks:

```javascript
server.get('Show', function (req, res, next) {
    try {
        var product = ProductMgr.getProduct(req.querystring.pid);
        if (!product) {
            res.setStatusCode(404);
            res.render('error/notfound');
            return next();
        }
        res.render('product/detail', { product: product });
    } catch (e) {
        Logger.error('Product error: ' + e.message);
        res.setStatusCode(500);
        res.render('error/general');
    }
    next();
});
```

### Generating URLs

Use URLUtils to generate locale-aware URLs:

```javascript
var URLUtils = require('dw/web/URLUtils');

// Controller URL
var productUrl = URLUtils.url('Product-Show', 'pid', 'ABC123');
// Result: /on/demandware.store/Sites-RefArch-Site/en_US/Product-Show?pid=ABC123

// HTTPS URL
var loginUrl = URLUtils.https('Login-Show');

// Static resource URL
var imageUrl = URLUtils.staticURL('/images/logo.png');
```

### Best Practices

1. **Always call `next()`** in SFRA middleware chain
2. **Use ViewModels** to prepare data for templates
3. **Keep controllers thin** - move business logic to scripts/helpers
4. **Use hooks** for functionality that works for both storefront and OCAPI
5. **Handle errors gracefully** - never expose stack traces
6. **Use `*/cartridge/...`** for portable module paths

### Detailed Reference

For comprehensive patterns and examples:
- [SFRA Patterns](references/SFRA-PATTERNS.md) - Full SFRA patterns with middleware
- [Classic Patterns](references/CLASSIC-PATTERNS.md) - Non-SFRA controller patterns

### Reference: CLASSIC-PATTERNS.md

#### Classic Controller Patterns

Patterns for non-SFRA controllers using direct exports with `.public = true`.

##### When to Use Classic Controllers

- Non-SFRA (pipelines-based) storefronts
- Simple REST-like endpoints
- Quick prototypes
- Legacy integrations

##### Basic Structure

```javascript
'use strict';

var ISML = require('dw/template/ISML');

exports.Show = function () {
    ISML.renderTemplate('home/homepage', {
        pageTitle: 'Welcome'
    });
};
exports.Show.public = true;  // Required for URL access
```

**Key:** Every exported function must have `.public = true` to be accessible via URL.

##### Request Handling

```javascript
exports.GetProduct = function () {
    // Query parameters
    var params = request.httpParameterMap;
    var productId = params.pid.stringValue;
    var quantity = params.qty.intValue || 1;

    // Check if parameter exists
    if (params.isParameterSubmitted('pid')) {
        // Parameter was provided
    }

    // Form data (POST)
    var email = params.email.stringValue;

    // HTTP method
    var method = request.httpMethod;  // 'GET', 'POST', etc.

    // Headers
    var contentType = request.httpHeaders.get('content-type');

    ISML.renderTemplate('product/detail', {
        productId: productId,
        quantity: quantity
    });
};
exports.GetProduct.public = true;
```

##### Response Types

###### HTML Response (ISML)

```javascript
var ISML = require('dw/template/ISML');

exports.ShowPage = function () {
    ISML.renderTemplate('path/to/template', {
        data: 'value'
    });
};
exports.ShowPage.public = true;
```

###### JSON Response

```javascript
exports.GetData = function () {
    var result = {
        success: true,
        items: [],
        count: 0
    };

    response.setContentType('application/json');
    response.writer.print(JSON.stringify(result));
};
exports.GetData.public = true;
```

###### XML Response

```javascript
exports.GetXML = function () {
    var xml = '<?xml version="1.0"?><data><item>value</item></data>';

    response.setContentType('application/xml');
    response.writer.print(xml);
};
exports.GetXML.public = true;
```

###### Redirect

```javascript
var URLUtils = require('dw/web/URLUtils');

exports.Redirect = function () {
    response.redirect(URLUtils.url('Home-Show'));
};
exports.Redirect.public = true;
```

###### Status Codes

```javascript
exports.NotFound = function () {
    response.setStatus(404);
    ISML.renderTemplate('error/notfound');
};
exports.NotFound.public = true;
```

##### Error Handling

```javascript
var Logger = require('dw/system/Logger');

exports.ProcessOrder = function () {
    try {
        var params = request.httpParameterMap;
        var orderId = params.orderID.stringValue;

        if (!orderId) {
            response.setStatus(400);
            response.setContentType('application/json');
            response.writer.print(JSON.stringify({
                error: true,
                message: 'Order ID required'
            }));
            return;
        }

        // Process order...

        response.setContentType('application/json');
        response.writer.print(JSON.stringify({ success: true }));

    } catch (e) {
        Logger.error('Order processing error: ' + e.message);
        response.setStatus(500);
        response.setContentType('application/json');
        response.writer.print(JSON.stringify({
            error: true,
            message: 'Internal error'
        }));
    }
};
exports.ProcessOrder.public = true;
```

##### Database Operations

```javascript
var Transaction = require('dw/system/Transaction');
var ProductMgr = require('dw/catalog/ProductMgr');

exports.UpdateProduct = function () {
    var params = request.httpParameterMap;
    var pid = params.pid.stringValue;
    var product = ProductMgr.getProduct(pid);

    if (!product) {
        response.setStatus(404);
        return;
    }

    Transaction.wrap(function () {
        product.custom.lastViewed = new Date();
    });

    response.setContentType('application/json');
    response.writer.print(JSON.stringify({ updated: true }));
};
exports.UpdateProduct.public = true;
```

##### HTTPS Enforcement

```javascript
exports.SecurePage = function () {
    if (!request.isHttpSecure()) {
        var URLUtils = require('dw/web/URLUtils');
        response.redirect(URLUtils.https('Controller-SecurePage'));
        return;
    }

    ISML.renderTemplate('secure/page');
};
exports.SecurePage.public = true;
```

##### Authentication Check

```javascript
var CustomerMgr = require('dw/customer/CustomerMgr');

exports.AccountPage = function () {
    var customer = session.customer;

    if (!customer.authenticated) {
        var URLUtils = require('dw/web/URLUtils');
        response.redirect(URLUtils.url('Login-Show'));
        return;
    }

    ISML.renderTemplate('account/dashboard', {
        customer: customer
    });
};
exports.AccountPage.public = true;
```

##### Complete Example

```javascript
'use strict';

var ISML = require('dw/template/ISML');
var Transaction = require('dw/system/Transaction');
var ProductMgr = require('dw/catalog/ProductMgr');
var BasketMgr = require('dw/order/BasketMgr');
var URLUtils = require('dw/web/URLUtils');
var Logger = require('dw/system/Logger');

/**
 * Display product detail page
 */
exports.Show = function () {
    var params = request.httpParameterMap;
    var pid = params.pid.stringValue;

    var product = ProductMgr.getProduct(pid);

    if (!product || !product.online) {
        response.setStatus(404);
        ISML.renderTemplate('error/notfound');
        return;
    }

    ISML.renderTemplate('product/detail', {
        product: product,
        quantity: params.qty.intValue || 1
    });
};
exports.Show.public = true;

/**
 * Add product to cart (AJAX)
 */
exports.AddToCart = function () {
    var params = request.httpParameterMap;
    var pid = params.pid.stringValue;
    var qty = params.qty.intValue || 1;

    try {
        var product = ProductMgr.getProduct(pid);
        if (!product) {
            sendJSON({ success: false, error: 'Product not found' }, 404);
            return;
        }

        var basket = BasketMgr.getCurrentOrNewBasket();

        Transaction.wrap(function () {
            var pli = basket.createProductLineItem(pid, basket.defaultShipment);
            pli.setQuantityValue(qty);
        });

        sendJSON({
            success: true,
            cartCount: basket.productQuantityTotal
        });

    } catch (e) {
        Logger.error('Add to cart error: ' + e.message);
        sendJSON({ success: false, error: 'Unable to add to cart' }, 500);
    }
};
exports.AddToCart.public = true;

/**
 * Get product availability (AJAX)
 */
exports.GetAvailability = function () {
    var params = request.httpParameterMap;
    var pid = params.pid.stringValue;

    var product = ProductMgr.getProduct(pid);
    if (!product) {
        sendJSON({ available: false }, 404);
        return;
    }

    var availability = product.availabilityModel;
    sendJSON({
        available: availability.inStock,
        quantity: availability.inventoryRecord ? availability.inventoryRecord.ATS.value : 0
    });
};
exports.GetAvailability.public = true;

/**
 * Helper: Send JSON response
 */
function sendJSON(data, status) {
    if (status) {
        response.setStatus(status);
    }
    response.setContentType('application/json');
    response.writer.print(JSON.stringify(data));
}
```

##### Comparison: Classic vs SFRA

| Aspect | Classic | SFRA |
|--------|---------|------|
| Public access | `exports.fn.public = true` | Automatic via `server` |
| Request data | `request.httpParameterMap` | `req.querystring`, `req.form` |
| Render HTML | `ISML.renderTemplate()` | `res.render()` |
| Return JSON | `response.writer.print()` | `res.json()` |
| Middleware | Manual checks | Built-in middleware chain |
| Controller extension | Not supported | `module.superModule` |
| Route events | Not available | `this.on('route:BeforeComplete')` |

### Reference: SFRA-PATTERNS.md

#### SFRA Controller Patterns

Detailed patterns for SFRA controllers using the `server` module.

##### Basic Route Structure

```javascript
'use strict';

var server = require('server');

server.get('RouteName', function (req, res, next) {
    // Handler logic
    next();
});

module.exports = server.exports();
```

##### HTTP Methods

```javascript
server.get('Show', handler);      // GET requests
server.post('Submit', handler);   // POST requests
server.use('Any', handler);       // Any HTTP method
```

##### Multiple Middleware

Chain multiple middleware functions:

```javascript
server.get('Show',
    middleware1,
    middleware2,
    function (req, res, next) {
        // Final handler
        next();
    }
);
```

##### Request Object Properties

```javascript
server.get('Example', function (req, res, next) {
    // Query parameters (?param=value)
    var param = req.querystring.param;
    var pid = req.querystring.pid;

    // Form data (POST body)
    var email = req.form.email;
    var password = req.form.password;

    // Current customer
    var customer = req.currentCustomer;
    var profile = req.currentCustomer.profile;
    var isAuthenticated = customer.authenticated;

    // Locale and session
    var locale = req.locale;
    var currency = req.session.currency;

    // HTTP details
    var method = req.httpMethod;
    var headers = req.httpHeaders;
    var host = req.httpHost;

    next();
});
```

##### Response Methods

```javascript
server.get('Example', function (req, res, next) {
    // Render ISML template
    res.render('path/to/template', {
        key1: 'value1',
        key2: { nested: 'data' }
    });

    // Return JSON (for AJAX)
    res.json({
        success: true,
        data: { id: 123 }
    });

    // Redirect
    res.redirect(URLUtils.url('Home-Show'));

    // Set HTTP status
    res.setStatusCode(404);

    // Set response header
    res.setHttpHeader('X-Custom-Header', 'value');

    next();
});
```

##### View Data Pattern

Build view data incrementally across middleware:

```javascript
server.get('Show',
    function (req, res, next) {
        res.setViewData({ step1: 'data' });
        next();
    },
    function (req, res, next) {
        var viewData = res.getViewData();
        viewData.step2 = 'more data';
        res.setViewData(viewData);
        next();
    },
    function (req, res, next) {
        res.render('template', res.getViewData());
        next();
    }
);
```

##### Route Events

```javascript
server.post('Submit', function (req, res, next) {
    var form = server.forms.getForm('profile');

    // BeforeComplete: runs after all middleware, before render
    this.on('route:BeforeComplete', function (req, res) {
        var viewData = res.getViewData();
        Transaction.wrap(function () {
            // Database operations
            customer.profile.firstName = viewData.firstName;
        });
    });

    res.setViewData({ firstName: form.firstName.value });
    next();
});
```

##### Extending Controllers

###### Using module.superModule

```javascript
'use strict';

var server = require('server');
var base = module.superModule;  // Parent controller

server.extend(base);

// Methods available after server.extend():
// - server.append()   Add to end of existing route
// - server.prepend()  Add to beginning of existing route
// - server.replace()  Replace existing route entirely
```

###### Append Pattern (Most Common)

```javascript
server.append('Show', function (req, res, next) {
    // Runs AFTER original handler
    var viewData = res.getViewData();
    viewData.customField = 'custom value';
    res.setViewData(viewData);
    next();
});
```

###### Prepend Pattern

```javascript
server.prepend('Show', function (req, res, next) {
    // Runs BEFORE original handler
    // Useful for validation, logging, etc.
    if (!someCondition) {
        res.redirect(URLUtils.url('Error-Show'));
        return next();
    }
    next();
});
```

###### Replace Pattern

```javascript
server.replace('Show', function (req, res, next) {
    // Completely replaces original handler
    // Original code does NOT run
    res.render('custom/template');
    next();
});
```

##### Common Middleware Examples

###### Caching Middleware

```javascript
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Show',
    cache.applyDefaultCache,  // Apply standard caching
    function (req, res, next) {
        res.render('template');
        next();
    }
);

// Custom cache duration
server.get('Data',
    cache.applyShortPromotionSensitiveCache,
    handler
);
```

###### Authentication Middleware

```javascript
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

server.get('Account',
    userLoggedIn.validateLoggedIn,
    function (req, res, next) {
        // Only runs if user is logged in
        res.render('account/dashboard');
        next();
    }
);
```

###### HTTPS Middleware

```javascript
server.post('Checkout',
    server.middleware.https,
    function (req, res, next) {
        // Only runs over HTTPS
        next();
    }
);
```

###### CSRF Protection

```javascript
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

// Generate CSRF token (for form pages)
server.get('ShowForm',
    csrfProtection.generateToken,
    function (req, res, next) {
        res.render('form');  // Template includes CSRF hidden field
        next();
    }
);

// Validate CSRF token (for form submissions)
server.post('Submit',
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        // Only runs if CSRF token is valid
        next();
    }
);
```

##### Form Handling

```javascript
server.get('ShowForm', function (req, res, next) {
    var form = server.forms.getForm('profile');
    form.clear();  // Reset form data

    res.render('forms/profile', {
        profileForm: form
    });
    next();
});

server.post('SubmitForm', function (req, res, next) {
    var form = server.forms.getForm('profile');

    if (form.valid) {
        // Process valid form
        var firstName = form.customer.firstname.value;
        var lastName = form.customer.lastname.value;

        this.on('route:BeforeComplete', function () {
            Transaction.wrap(function () {
                // Save to database
            });
        });

        res.json({ success: true });
    } else {
        res.json({
            success: false,
            error: true,
            fieldErrors: formErrors.getFormErrors(form)
        });
    }
    next();
});
```

##### AJAX Responses

```javascript
server.get('GetData', function (req, res, next) {
    var result = {
        success: true,
        data: {
            items: [],
            count: 0
        }
    };

    res.json(result);
    next();
});

// With error handling
server.post('Process', function (req, res, next) {
    try {
        // Process request
        res.json({ success: true });
    } catch (e) {
        res.json({
            success: false,
            errorMessage: Resource.msg('error.general', 'error', null)
        });
    }
    next();
});
```

##### Complete Controller Example

```javascript
'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');

server.get('Show',
    cache.applyDefaultCache,
    function (req, res, next) {
        var pid = req.querystring.pid;
        var product = ProductMgr.getProduct(pid);

        if (!product || !product.online) {
            res.setStatusCode(404);
            res.render('error/notfound');
            return next();
        }

        res.render('product/detail', {
            product: product,
            breadcrumbs: getBreadcrumbs(product)
        });
        next();
    }
);

server.post('AddToWishlist',
    server.middleware.https,
    userLoggedIn.validateLoggedIn,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var pid = req.form.pid;

        this.on('route:BeforeComplete', function () {
            Transaction.wrap(function () {
                // Add to wishlist
            });
        });

        res.json({
            success: true,
            message: Resource.msg('wishlist.added', 'wishlist', null)
        });
        next();
    }
);

module.exports = server.exports();
```

---


<a id="b2c-custom-api-development"></a>
## b2c-custom-api-development

**When to use:** Develop Custom SCAPI endpoints for B2C Commerce. Use when creating REST APIs, defining api.json routes, writing schema.yaml (OAS 3.0), or building headless commerce integrations. Covers cartridge structure, endpoint implementation, and OAuth scope configuration.

## Custom API Development Skill

This skill guides you through developing Custom APIs for Salesforce B2C Commerce. Custom APIs let you expose custom script code as REST endpoints under the SCAPI framework.

> **Tip:** If `b2c` CLI is not installed globally, use `npx @salesforce/b2c-cli` instead (e.g., `npx @salesforce/b2c-cli code deploy`).

### Overview

A Custom API URL has this structure:

```
https://{shortCode}.api.commercecloud.salesforce.com/custom/{apiName}/{apiVersion}/organizations/{organizationId}/{endpointPath}
```

Three components are required to create a Custom API:

1. **API Contract** - An OAS 3.0 schema file (YAML)
2. **API Implementation** - A script using the B2C Commerce Script API
3. **API Mapping** - An `api.json` file binding endpoints to implementations

### Cartridge Structure

```
/my-cartridge
    /cartridge
        package.json
        /rest-apis
            /my-api-name              # API name (lowercase alphanumeric and hyphens only)
                api.json              # Mapping file
                schema.yaml           # OAS 3.0 contract
                script.js             # Implementation
```

**Important:** API directory names can only contain alphanumeric lowercase characters and hyphens.

### Component 1: API Contract (schema.yaml)

Minimal example:

```yaml
openapi: 3.0.0
info:
  version: 1.0.0
  title: My Custom API
components:
  securitySchemes:
    ShopperToken:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/token
          scopes:
            c_my_scope: My custom scope
  parameters:
    siteId:
      name: siteId
      in: query
      required: true
      schema:
        type: string
        minLength: 1
paths:
  /my-endpoint:
    get:
      operationId: getMyData
      parameters:
        - $ref: '#/components/parameters/siteId'
      responses:
        '200':
          description: Success
security:
  - ShopperToken: ['c_my_scope']
```

**Key requirements:**
- Use `ShopperToken` for Shopper APIs (requires siteId), `AmOAuth2` for Admin APIs
- Custom scopes must start with `c_`, max 25 chars
- Custom parameters must have `c_` prefix

See [Contract Reference](references/CONTRACT.md) for full schema examples and Shopper vs Admin API differences.

### Component 2: Implementation (script.js)

```javascript
var RESTResponseMgr = require('dw/system/RESTResponseMgr');

exports.getMyData = function() {
    var myParam = request.getHttpParameterMap().get('c_my_param').getStringValue();
    var result = { data: 'my data', param: myParam };
    RESTResponseMgr.createSuccess(result).render();
};
exports.getMyData.public = true;  // Required
```

**Key requirements:**
- Mark exported functions with `.public = true`
- Use `RESTResponseMgr.createSuccess()` for responses
- Use `RESTResponseMgr.createError()` for error responses (RFC 9457 format)

See [Implementation Reference](references/IMPLEMENTATION.md) for caching, remote includes, and external service calls.

### Component 3: Mapping (api.json)

```json
{
  "endpoints": [
    {
      "endpoint": "getMyData",
      "schema": "schema.yaml",
      "implementation": "script"
    }
  ]
}
```

**Important:** Implementation name must NOT include file extension.

### Development Workflow

1. Create cartridge with `rest-apis/{api-name}/` structure
2. Define contract (schema.yaml) with endpoints and security
3. Implement logic (script.js) with exported functions
4. Create mapping (api.json) binding endpoints to implementation
5. Deploy and activate to register endpoints
6. Check registration status and test

#### Deployment

```bash
# Deploy and activate to register endpoints
b2c code deploy ./my-cartridge --reload

# Check registration status
b2c scapi custom status --tenant-id zzpq_013

# Show failed registrations with error reasons
b2c scapi custom status --tenant-id zzpq_013 --status not_registered --columns apiName,endpointPath,errorReason
```

### Authentication Setup

#### For Shopper APIs

1. Create a SLAS client with your custom scope(s):
   ```bash
   b2c slas client create --default-scopes --scopes "c_my_scope"
   ```
2. Obtain token via SLAS client credentials
3. Include `siteId` in all requests

#### For Admin APIs

1. Configure custom scope in Account Manager
2. Obtain token via Account Manager OAuth
3. Omit `siteId` from requests

See [Testing Reference](references/TESTING.md) for curl examples and authentication setup.

### Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Invalid/unknown params | Define all params in schema |
| 401 Unauthorized | Invalid token | Check token validity |
| 403 Forbidden | Missing scope | Verify scope in token |
| 404 Not Found | Not registered | Check `b2c scapi custom status` |
| 500 Internal Error | Script error | Check `b2c logs get --level ERROR` |
| 503 Service Unavailable | Circuit breaker open | Fix errors, wait for reset |

#### Registration Issues

- **Endpoint not appearing:** Verify cartridge is in site's cartridge path, re-activate code version
- **Check logs:** Use `b2c logs get` or filter Log Center with `CustomApiRegistry`

### Related Skills

- `b2c-cli:b2c-code` - Deploying cartridges and activating code versions
- `b2c-cli:b2c-scapi-custom` - Checking Custom API registration status
- `b2c-cli:b2c-slas` - Creating SLAS clients for testing Shopper APIs
- `b2c:b2c-webservices` - Service configuration for external calls

### Reference Documentation

- [Contract Reference](references/CONTRACT.md) - Full schema.yaml examples, Shopper vs Admin APIs
- [Implementation Reference](references/IMPLEMENTATION.md) - script.js patterns, caching, remote includes
- [Testing Reference](references/TESTING.md) - Authentication setup, curl examples

### Reference: CONTRACT.md

#### API Contract Reference (schema.yaml)

##### Full Schema Example

```yaml
openapi: 3.0.0
info:
  version: 1.0.0                      # API version (1.0.0 becomes v1 in URL)
  title: My Custom API
components:
  securitySchemes:
    ShopperToken:                     # For Shopper APIs (requires siteId)
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{organizationId}/oauth2/token
          scopes:
            c_my_scope: Description of my scope
    AmOAuth2:                         # For Admin APIs (no siteId)
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://account.demandware.com/dwsso/oauth2/access_token
          scopes:
            c_my_admin_scope: Description of my admin scope
  parameters:
    siteId:
      name: siteId
      in: query
      required: true
      schema:
        type: string
        minLength: 1
    locale:
      name: locale
      in: query
      required: false
      schema:
        type: string
        minLength: 1
paths:
  /my-endpoint:
    get:
      summary: Get something
      operationId: getMyData         # Must match function name in script
      parameters:
        - $ref: '#/components/parameters/siteId'
        - in: query
          name: c_my_param           # Custom params must start with c_
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
security:
  - ShopperToken: ['c_my_scope']     # Global security (or per-operation)
```

##### Contract Requirements

- **Version:** Defined in `info.version`, transformed to URL version (e.g., `1.0.1` becomes `v1`)
- **Security Scheme:** Use `ShopperToken` for Shopper APIs or `AmOAuth2` for Admin APIs
- **Custom Scopes:** Must start with `c_`, contain only alphanumeric/hyphen/period/underscore, max 25 chars
- **Parameters:** All request parameters must be defined; custom params must have `c_` prefix
- **System Parameters:** `siteId` and `locale` must have `type: string` and `minLength: 1`
- **No additionalProperties:** The `additionalProperties` attribute is not allowed in request body schemas

##### Shopper vs Admin APIs

| Aspect | Shopper API | Admin API |
|--------|-------------|-----------|
| Security Scheme | `ShopperToken` | `AmOAuth2` |
| `siteId` Parameter | Required | Must omit |
| Max Runtime | 10 seconds | 60 seconds |
| Max Request Body | 5 MiB | 20 MB |
| Activity Type | STOREFRONT | BUSINESS_MANAGER |

##### Path Parameter Example

```yaml
paths:
  /items/{itemId}:
    get:
      operationId: getItem
      parameters:
        - $ref: '#/components/parameters/siteId'
        - in: path
          name: itemId
          required: true
          schema:
            type: string
```

##### Request Body Example (POST/PUT/PATCH)

```yaml
paths:
  /items:
    post:
      operationId: createItem
      parameters:
        - $ref: '#/components/parameters/siteId'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
              properties:
                name:
                  type: string
                c_customField:
                  type: string
      responses:
        '201':
          description: Created
```

### Reference: IMPLEMENTATION.md

#### Implementation Reference (script.js)

##### Complete Implementation Example

```javascript
var RESTResponseMgr = require('dw/system/RESTResponseMgr');

exports.getMyData = function() {
    // Get query parameters
    var myParam = request.getHttpParameterMap().get('c_my_param').getStringValue();

    // Get path parameters (for paths like /items/{itemId})
    var itemId = request.getSCAPIPathParameters().get('itemId');

    // Get request body (for POST/PUT/PATCH)
    var requestBody = JSON.parse(request.httpParameterMap.requestBodyAsString);

    // Business logic here...
    var result = {
        data: 'my data',
        param: myParam
    };

    // Return success response
    RESTResponseMgr.createSuccess(result).render();
};
exports.getMyData.public = true;  // Required: mark function as public

// Error response example
exports.getMyDataWithError = function() {
    RESTResponseMgr
        .createError(404, 'not-found', 'Resource Not Found', 'The requested resource was not found.')
        .render();
};
exports.getMyDataWithError.public = true;
```

##### Best Practices

- Always return JSON format responses
- Use RFC 9457 error format with at least the `type` field
- Mark all exported functions with `.public = true`
- Handle errors gracefully to avoid circuit breaker activation
- GET requests cannot commit transactions

##### Caching Responses

Enable Page Caching for the site, then use:

```javascript
// Cache for 60 seconds
response.setExpires(Date.now() + 60000);

// Personalized caching
response.setVaryBy('price_promotion');
```

##### Remote Includes

Include responses from other SCAPI endpoints:

```javascript
var include = dw.system.RESTResponseMgr.createScapiRemoteInclude(
    'custom', 'other-api', 'v1', 'endpointPath',
    dw.web.URLParameter('siteId', 'MySite')
);

var response = {
    data: 'my data',
    included: [include]
};
RESTResponseMgr.createSuccess(response).render();
```

##### External Service Calls

When calling external services via `LocalServiceRegistry.createService()`, configure the service in Business Manager or import via site archive:

```javascript
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var service = LocalServiceRegistry.createService('my.external.api', {
    createRequest: function(svc, args) {
        svc.setRequestMethod('GET');
        svc.addHeader('Authorization', 'Bearer ' + args.token);
        return null;
    },
    parseResponse: function(svc, client) {
        return JSON.parse(client.text);
    }
});

var result = service.call({ token: 'my-token' });
```

See `b2c:b2c-webservices` skill for service configuration and services.xml format.

##### services.xml Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<services xmlns="http://www.demandware.com/xml/impex/services/2014-09-26">

    <service-credential service-credential-id="my.external.api">
        <url>https://api.example.com/v1</url>
    </service-credential>

    <service-profile service-profile-id="my.external.api.profile">
        <timeout-millis>5000</timeout-millis>
        <rate-limit-enabled>false</rate-limit-enabled>
        <cb-enabled>true</cb-enabled>
        <cb-calls>5</cb-calls>
        <cb-millis>10000</cb-millis>
    </service-profile>

    <service service-id="my.external.api">
        <service-type>HTTP</service-type>
        <enabled>true</enabled>
        <log-prefix>MYAPI</log-prefix>
        <comm-log-enabled>true</comm-log-enabled>
        <profile-id>my.external.api.profile</profile-id>
        <credential-id>my.external.api</credential-id>
    </service>

</services>
```

Import with: `b2c job import ./my-services-folder`

##### HTTP Methods Supported

- GET (no transaction commits)
- POST
- PUT
- PATCH
- DELETE
- HEAD
- OPTIONS

##### Circuit Breaker Protection

Custom APIs have a circuit breaker that blocks requests when error rate exceeds 50%:

1. Circuit opens after 50+ errors in 100 requests
2. Requests return 503 for 60 seconds
3. Circuit enters half-open state, testing next 10 requests
4. If >5 fail, circuit reopens; otherwise closes

**Prevention:** Write robust code with error handling and avoid long-running remote calls.

### Reference: TESTING.md

#### Testing Custom APIs

##### Prerequisites for Testing

Before testing a Shopper API with custom scopes, ensure you have a SLAS client configured with those scopes:

```bash
# Create a test client with your custom scope (replace c_my_scope with your scope)
b2c slas client create \
  --tenant-id zzpq_013 \
  --channels RefArch \
  --default-scopes \
  --scopes "c_my_scope" \
  --redirect-uri http://localhost:3000/callback \
  --json

# Save the client_id and client_secret from the output
```

**Warning:** Use `--scopes` (plural) for client scopes, NOT `--scope` (singular).

See `b2c-cli:b2c-slas` skill for more options.

##### Get a Shopper Token (Private Client)

Using a private SLAS client with client credentials grant:

```bash
# Set your credentials
SHORTCODE="your-short-code" # see b2c-cli:b2c-config skill to find this value
ORG="f_ecom_xxxx_xxx"
SLAS_CLIENT_ID="your-client-id"
SLAS_CLIENT_SECRET="your-client-secret"
SITE="RefArch" # b2c-cli:b2c-sites skill to find site IDs

# Get access token
TOKEN=$(curl -s "https://$SHORTCODE.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/$ORG/oauth2/token" \
    -u "$SLAS_CLIENT_ID:$SLAS_CLIENT_SECRET" \
    -d "grant_type=client_credentials&channel_id=$SITE" | jq -r '.access_token')

echo $TOKEN
```

##### Call Your Custom API

```bash
# Call the Custom API endpoint
curl -s "https://$SHORTCODE.api.commercecloud.salesforce.com/custom/my-api/v1/organizations/$ORG/my-endpoint?siteId=$SITE" \
    -H "Authorization: Bearer $TOKEN" | jq
```

##### Testing Admin APIs

For Admin APIs (AmOAuth2), obtain a token from Account Manager:

```bash
AM_CLIENT_ID="your-am-client-id"
AM_CLIENT_SECRET="your-am-client-secret"

TOKEN=$(curl -s "https://account.demandware.com/dwsso/oauth2/access_token" \
    -u "$AM_CLIENT_ID:$AM_CLIENT_SECRET" \
    -d "grant_type=client_credentials" | jq -r '.access_token')

# Call Admin API (no siteId)
curl -s "https://$SHORTCODE.api.commercecloud.salesforce.com/custom/my-admin-api/v1/organizations/$ORG/my-endpoint" \
    -H "Authorization: Bearer $TOKEN" | jq
```

##### Testing Tips

- Use `b2c slas client list` to find existing SLAS clients
- Use `b2c slas client create --default-scopes --scopes "c_my_scope"` to create a test client
- Check logs with `b2c logs get` if requests fail
- Verify endpoint registration with `b2c scapi custom status --tenant-id <tenant>`

##### Common Test Failures

| Error | Cause | Solution |
|-------|-------|----------|
| 400 Bad Request | Missing or invalid parameter | Check schema.yaml parameter definitions |
| 401 Unauthorized | Invalid/expired token | Get a fresh token |
| 403 Forbidden | Missing scope | Verify scope in token matches contract |
| 404 Not Found | Endpoint not registered | Run `b2c scapi custom status` |
| 500 Internal Error | Script error | Check `b2c logs get --level ERROR` |

---


<a id="b2c-custom-caches"></a>
## b2c-custom-caches

**When to use:** Implement custom caching with CacheMgr in B2C Commerce. Use when adding application-level caching, cache invalidation, or optimizing performance with custom cache regions. Covers cache definition JSON, CacheMgr API, and cache entry lifecycle.

## B2C Custom Caches

Custom caches improve code performance by storing data that is expensive to calculate, takes a long time to retrieve, or is accessed frequently. Caches are defined in JSON files within cartridges and accessed via the Script API.

### When to Use Custom Caches

| Use Case | Example |
|----------|---------|
| Expensive calculations | Check if any variation product is on sale for base product display |
| External system responses | Cache in-store availability or prices from external APIs |
| Configuration settings | Store configuration data from JSON files or external sources |
| Frequently accessed data | Product attributes, category data, site preferences |

### Limitations

| Constraint | Value |
|------------|-------|
| Total memory per app server | ~20 MB for all custom caches |
| Max caches per code version | 100 |
| Max entry size | 128 KB |
| Supported value types | Primitives, arrays, plain objects, `null` (not `undefined`) |
| Cross-server sync | None (caches are per-application-server) |

### Defining a Custom Cache

#### File Structure

```
my_cartridge/
├── package.json       # References caches.json
└── caches.json        # Cache definitions
```

#### package.json

Add a `caches` entry pointing to the cache definition file:

```json
{
  "name": "my_cartridge",
  "caches": "./caches.json"
}
```

#### caches.json

Define caches with unique IDs and optional expiration:

```json
{
  "caches": [
    {
      "id": "ProductAttributeCache"
    },
    {
      "id": "ExternalPriceCache",
      "expireAfterSeconds": 300
    },
    {
      "id": "SiteConfigCache",
      "expireAfterSeconds": 60
    }
  ]
}
```

| Property | Required | Description |
|----------|----------|-------------|
| `id` | Yes | Unique ID across all cartridges in code version |
| `expireAfterSeconds` | No | Maximum seconds an entry is retained |

### Using Custom Caches

#### Script API Classes

| Class | Description |
|-------|-------------|
| `dw.system.CacheMgr` | Entry point for accessing defined caches |
| `dw.system.Cache` | Cache instance for storing and retrieving entries |

#### Basic Usage

```javascript
var CacheMgr = require('dw/system/CacheMgr');

// Get a defined cache
var cache = CacheMgr.getCache('ProductAttributeCache');

// Get value (returns undefined if not found)
var value = cache.get('myKey');

// Store value directly
cache.put('myKey', { data: 'value' });

// Remove entry
cache.invalidate('myKey');
```

#### Recommended Pattern: get with Loader

Use `get(key, loader)` to automatically populate the cache on miss:

```javascript
var CacheMgr = require('dw/system/CacheMgr');
var Site = require('dw/system/Site');

var cache = CacheMgr.getCache('SiteConfigCache');

// Loader function called only on cache miss
var config = cache.get(Site.current.ID + '_config', function() {
    // Expensive operation - only runs if not cached
    return loadConfigurationFromFile(Site.current);
});
```

#### Scoped Cache Keys

Include scope identifiers in keys to separate entries by context:

```javascript
var CacheMgr = require('dw/system/CacheMgr');
var Site = require('dw/system/Site');

var cache = CacheMgr.getCache('ProductCache');

// Site-scoped key
var siteKey = Site.current.ID + '_' + productID;
var productData = cache.get(siteKey, loadProductData);

// Catalog-scoped key
var catalogKey = 'catalog_' + catalogID + '_' + productID;
var catalogData = cache.get(catalogKey, loadCatalogData);

// Locale-scoped key
var localeKey = request.locale + '_' + contentID;
var content = cache.get(localeKey, loadLocalizedContent);
```

### Cache Methods

| Method | Description |
|--------|-------------|
| `get(key)` | Returns cached value or `undefined` |
| `get(key, loader)` | Returns cached value or calls loader, stores result |
| `put(key, value)` | Stores value directly (overwrites existing) |
| `invalidate(key)` | Removes entry for key |

### Best Practices

#### Do

- Use `get(key, loader)` pattern for automatic population
- Include scope (site, catalog, locale) in cache keys
- Set appropriate `expireAfterSeconds` for time-sensitive data
- Handle cache misses gracefully (data may be evicted anytime)
- Use descriptive cache IDs

#### Don't

- Include personal user data in cache keys (keys may appear in logs)
- Store Script API objects (only primitives and plain objects)
- Rely on cache entries existing (no persistence guarantee)
- Expect cross-server cache synchronization
- Store `undefined` values (use `null` instead)

### Cache Invalidation

Caches are automatically cleared when:
- Any file in the active code version changes
- A new code version is activated
- Data replication completes
- Code replication completes

Manual invalidation only affects the current application server:

```javascript
var cache = CacheMgr.getCache('MyCache');

// Invalidate single entry (current app server only)
cache.invalidate('myKey');

// Storing undefined has same effect as invalidate
cache.put('myKey', undefined);
```

### Common Patterns

#### Caching External API Responses

```javascript
var CacheMgr = require('dw/system/CacheMgr');
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var priceCache = CacheMgr.getCache('ExternalPriceCache');

function getExternalPrice(productID) {
    return priceCache.get('price_' + productID, function() {
        var service = LocalServiceRegistry.createService('PriceService', {
            createRequest: function(svc, args) {
                svc.setRequestMethod('GET');
                svc.addParam('productId', args.productID);
                return null;
            },
            parseResponse: function(svc, response) {
                return JSON.parse(response.text);
            }
        });

        var result = service.call({ productID: productID });
        return result.ok ? result.object : null;
    });
}
```

#### Caching Expensive Calculations

```javascript
var CacheMgr = require('dw/system/CacheMgr');

var saleCache = CacheMgr.getCache('ProductSaleCache');

function isProductOnSale(masterProduct) {
    return saleCache.get('sale_' + masterProduct.ID, function() {
        var variants = masterProduct.variants.iterator();
        while (variants.hasNext()) {
            var variant = variants.next();
            if (isInPromotion(variant)) {
                return true;
            }
        }
        return false;
    });
}
```

#### Configuration Cache with Site Scope

```javascript
var CacheMgr = require('dw/system/CacheMgr');
var Site = require('dw/system/Site');
var File = require('dw/io/File');
var FileReader = require('dw/io/FileReader');

var configCache = CacheMgr.getCache('SiteConfigCache');

function getSiteConfig() {
    var siteID = Site.current.ID;

    return configCache.get(siteID + '_config', function() {
        var configFile = new File(File.IMPEX + '/src/config/' + siteID + '.json');
        if (!configFile.exists()) {
            return null;
        }

        var reader = new FileReader(configFile);
        var content = reader.getString();
        reader.close();

        return JSON.parse(content);
    });
}
```

### Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Cache not found exception | Cache ID not defined in any caches.json | Add cache definition to caches.json |
| Duplicate cache ID error | Same ID used in multiple cartridges | Use unique IDs across all cartridges |
| Entry not stored | Value exceeds 128 KB limit | Reduce data size or cache subsets |
| Entry not stored | Value contains Script API objects | Use only primitives and plain objects |
| Unexpected cache misses | Different app server or cache cleared | Always handle misses gracefully |

Check the custom error log and custom warn log for cache-related messages.

---


<a id="b2c-custom-job-steps"></a>
## b2c-custom-job-steps

**When to use:** Create custom job steps for B2C Commerce batch processing. Use when writing scheduled tasks, data sync jobs, import/export scripts, or any server-side batch processing code. Covers steptypes.json, chunk-oriented processing, and task-oriented execution. For running existing jobs, use b2c-job instead.

## Custom Job Steps Skill

This skill guides you through **creating new custom job steps** for Salesforce B2C Commerce batch processing.

> **Running an existing job?** If you need to execute jobs or import site archives via CLI, use the `b2c-cli:b2c-job` skill instead.

### When to Use

- Creating a **new scheduled job** for batch processing
- Building a **data import job** (customers, products, orders)
- Building a **data export job** (reports, feeds, sync)
- Implementing **data sync** between systems
- Creating **cleanup or maintenance tasks**

### Overview

Custom job steps allow you to execute custom business logic as part of B2C Commerce jobs. There are two execution models:

| Model | Use Case | Progress Tracking |
|-------|----------|-------------------|
| **Task-oriented** | Single operations (FTP, import/export) | Limited |
| **Chunk-oriented** | Bulk data processing | Fine-grained |

### File Structure

```
my_cartridge/
├── cartridge/
│   ├── scripts/
│   │   └── steps/
│   │       ├── myTaskStep.js       # Task-oriented script
│   │       └── myChunkStep.js      # Chunk-oriented script
│   └── my_cartridge.properties
└── steptypes.json                  # Step type definitions (at cartridge ROOT)
```

**Important:** The `steptypes.json` file must be placed in the **root** folder of the cartridge, not inside the `cartridge/` directory. Only one `steptypes.json` file per cartridge.

### Step Type Definition (steptypes.json)

```json
{
    "step-types": {
        "script-module-step": [
            {
                "@type-id": "custom.MyTaskStep",
                "@supports-parallel-execution": "false",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "My custom task step",
                "module": "my_cartridge/cartridge/scripts/steps/myTaskStep.js",
                "function": "execute",
                "timeout-in-seconds": 900,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "InputFile",
                            "@type": "string",
                            "@required": "true",
                            "description": "Path to input file"
                        },
                        {
                            "@name": "Enabled",
                            "@type": "boolean",
                            "@required": "false",
                            "default-value": "true",
                            "description": "Enable processing"
                        }
                    ]
                },
                "status-codes": {
                    "status": [
                        {
                            "@code": "OK",
                            "description": "Step completed successfully"
                        },
                        {
                            "@code": "ERROR",
                            "description": "Step failed"
                        },
                        {
                            "@code": "NO_DATA",
                            "description": "No data to process"
                        }
                    ]
                }
            }
        ],
        "chunk-script-module-step": [
            {
                "@type-id": "custom.MyChunkStep",
                "@supports-parallel-execution": "true",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Bulk data processing step",
                "module": "my_cartridge/cartridge/scripts/steps/myChunkStep.js",
                "before-step-function": "beforeStep",
                "read-function": "read",
                "process-function": "process",
                "write-function": "write",
                "after-step-function": "afterStep",
                "total-count-function": "getTotalCount",
                "chunk-size": 100,
                "transactional": "false",
                "timeout-in-seconds": 1800,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "CategoryId",
                            "@type": "string",
                            "@required": "true"
                        }
                    ]
                }
            }
        ]
    }
}
```

### Task-Oriented Steps

Use for single operations like FTP transfers, file generation, or import/export.

#### Script (scripts/steps/myTaskStep.js)

```javascript
'use strict';

var Status = require('dw/system/Status');
var Logger = require('dw/system/Logger');

/**
 * Execute the task step
 * @param {Object} parameters - Job step parameters
 * @param {dw.job.JobStepExecution} stepExecution - Step execution context
 * @returns {dw.system.Status} Execution status
 */
exports.execute = function (parameters, stepExecution) {
    var log = Logger.getLogger('job', 'MyTaskStep');

    try {
        var inputFile = parameters.InputFile;
        var enabled = parameters.Enabled;

        if (!enabled) {
            log.info('Step disabled, skipping');
            return new Status(Status.OK, 'SKIP', 'Step disabled');
        }

        // Your business logic here
        log.info('Processing file: ' + inputFile);

        // Return success
        return new Status(Status.OK);

    } catch (e) {
        log.error('Step failed: ' + e.message);
        return new Status(Status.ERROR, 'ERROR', e.message);
    }
};
```

#### Status Codes

```javascript
// Success
return new Status(Status.OK);
return new Status(Status.OK, 'CUSTOM_CODE', 'Custom message');

// Error
return new Status(Status.ERROR);
return new Status(Status.ERROR, null, 'Error message');
```

**Important:** Custom status codes work **only** with OK status. If you use a custom code with ERROR status, it is replaced with ERROR. Custom status codes cannot contain commas, wildcards, leading/trailing whitespace, or exceed 100 characters.

### Chunk-Oriented Steps

Use for bulk processing of countable data (products, orders, customers).

**Important:** You cannot define custom exit status for chunk-oriented steps. Chunk modules always finish with either **OK** or **ERROR**.

#### Required Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `read()` | Get next item | Item or nothing |
| `process(item)` | Transform item | Processed item or nothing (filters) |
| `write(items)` | Save chunk of items | Nothing |

#### Optional Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `beforeStep()` | Initialize (open files, queries) | Nothing |
| `afterStep(success)` | Cleanup (close files) | Nothing |
| `getTotalCount()` | Return total items for progress | Number |
| `beforeChunk()` | Before each chunk | Nothing |
| `afterChunk()` | After each chunk | Nothing |

#### Script (scripts/steps/myChunkStep.js)

```javascript
'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');

var log = Logger.getLogger('job', 'MyChunkStep');
var products;
var fileWriter;

/**
 * Initialize before processing
 */
exports.beforeStep = function (parameters, stepExecution) {
    log.info('Starting chunk processing');

    // Open resources
    var outputFile = new File(File.IMPEX + '/export/products.csv');
    fileWriter = new FileWriter(outputFile);
    fileWriter.writeLine('ID,Name,Price');

    // Query products
    products = ProductMgr.queryAllSiteProducts();
};

/**
 * Get total count for progress tracking
 */
exports.getTotalCount = function (parameters, stepExecution) {
    return products.count;
};

/**
 * Read next item
 * Return nothing to signal end of data
 */
exports.read = function (parameters, stepExecution) {
    if (products.hasNext()) {
        return products.next();
    }
    // Return nothing = end of data
};

/**
 * Process single item
 * Return nothing to filter out item
 */
exports.process = function (product, parameters, stepExecution) {
    // Filter: skip offline products
    if (!product.online) {
        return;  // Filtered out
    }

    // Transform
    return {
        id: product.ID,
        name: product.name,
        price: product.priceModel.price.value
    };
};

/**
 * Write chunk of processed items
 */
exports.write = function (items, parameters, stepExecution) {
    for (var i = 0; i < items.size(); i++) {
        var item = items.get(i);
        fileWriter.writeLine(item.id + ',' + item.name + ',' + item.price);
    }
};

/**
 * Cleanup after all chunks
 */
exports.afterStep = function (success, parameters, stepExecution) {
    // Close resources
    if (fileWriter) {
        fileWriter.close();
    }
    if (products) {
        products.close();
    }

    if (success) {
        log.info('Chunk processing completed successfully');
    } else {
        log.error('Chunk processing failed');
    }
};
```

### Parameter Types

| Type | Description | Example Value |
|------|-------------|---------------|
| `string` | Text value | `"my-value"` |
| `boolean` | true/false | `true` |
| `long` | Integer | `12345` |
| `double` | Decimal | `123.45` |
| `datetime-string` | ISO datetime | `"2024-01-15T10:30:00Z"` |
| `date-string` | ISO date | `"2024-01-15"` |
| `time-string` | ISO time | `"10:30:00"` |

#### Parameter Validation Attributes

| Attribute | Applies To | Description |
|-----------|------------|-------------|
| `@trim` | All | Trim whitespace before validation (default: `true`) |
| `@required` | All | Mark as required (default: `true`) |
| `@target-type` | datetime-string, date-string, time-string | Convert to `long` or `date` (default: `date`) |
| `pattern` | string | Regex pattern for validation |
| `min-length` | string | Minimum string length (must be ≥1) |
| `max-length` | string | Maximum string length (max 1000 chars total) |
| `min-value` | long, double, datetime-string, time-string | Minimum numeric value |
| `max-value` | long, double, datetime-string, time-string | Maximum numeric value |
| `enum-values` | All | Restrict to allowed values (dropdown in BM) |

### Configuration Options

#### steptypes.json Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `@type-id` | Yes | Unique ID (must start with `custom.`, max 100 chars) |
| `@supports-parallel-execution` | No | Allow parallel execution (default: `true`) |
| `@supports-site-context` | No | Available in site-scoped jobs (default: `true`) |
| `@supports-organization-context` | No | Available in org-scoped jobs (default: `true`) |
| `module` | Yes | Path to script module |
| `function` | Yes | Function name to execute (task-oriented) |
| `timeout-in-seconds` | No | Step timeout (recommended to set) |
| `transactional` | No | Wrap in single transaction (default: `false`) |
| `chunk-size` | Yes* | Items per chunk (*required for chunk steps) |

**Context Constraints:** `@supports-site-context` and `@supports-organization-context` cannot both be `true` or both be `false` - one must be `true` and the other `false`.

### Best Practices

1. **Use chunk-oriented** for bulk data - better progress tracking and resumability
2. **Close resources** in `afterStep()` - queries, files, connections
3. **Set explicit timeouts** - default may be too short
4. **Log progress** - helps debugging
5. **Handle errors gracefully** - return proper Status objects
6. **Don't rely on transactional=true** - use `Transaction.wrap()` for control

### Related Skills

- `b2c-cli:b2c-job` - For **running** existing jobs and importing site archives via CLI
- `b2c:b2c-webservices` - When job steps need to call external HTTP services or APIs, use the webservices skill for service configuration and HTTP client patterns

### Detailed Reference

- [Task-Oriented Steps](references/TASK-ORIENTED.md) - Full task step patterns
- [Chunk-Oriented Steps](references/CHUNK-ORIENTED.md) - Full chunk step patterns
- [steptypes.json Reference](references/STEPTYPES-JSON.md) - Complete schema

### Reference: CHUNK-ORIENTED.md

#### Chunk-Oriented Job Steps Reference

Complete patterns for chunk-oriented job steps.

##### When to Use

- Product exports/imports
- Order processing
- Customer data sync
- Inventory updates
- Any bulk data operation with countable items

**Important:** Chunk-oriented steps **cannot** define custom exit status. They always finish with either **OK** or **ERROR**.

##### Basic Structure

```javascript
'use strict';

var iterator;

exports.beforeStep = function (parameters, stepExecution) {
    // Initialize: open files, start queries
};

exports.getTotalCount = function (parameters, stepExecution) {
    return iterator.count;
};

exports.read = function (parameters, stepExecution) {
    if (iterator.hasNext()) {
        return iterator.next();
    }
};

exports.process = function (item, parameters, stepExecution) {
    // Transform item
    return transformedItem;
};

exports.write = function (items, parameters, stepExecution) {
    // Write chunk
};

exports.afterStep = function (success, parameters, stepExecution) {
    // Cleanup
};
```

##### Product Export Example

```javascript
'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'ProductExport');
var products;
var writer;

exports.beforeStep = function (parameters, stepExecution) {
    var outputPath = parameters.OutputFile || '/export/products.csv';
    var outputFile = new File(File.IMPEX + outputPath);

    // Ensure parent directory exists
    outputFile.parentFile.mkdirs();

    writer = new FileWriter(outputFile, 'UTF-8');
    writer.writeLine('ID,Name,Brand,Price,Online');

    // Query all products
    products = ProductMgr.queryAllSiteProducts();

    log.info('Starting product export');
};

exports.getTotalCount = function (parameters, stepExecution) {
    return products.count;
};

exports.read = function (parameters, stepExecution) {
    if (products.hasNext()) {
        return products.next();
    }
};

exports.process = function (product, parameters, stepExecution) {
    // Skip masters (export variants only) or filter as needed
    if (product.master) {
        return;  // Filter out
    }

    // Extract and transform data
    return {
        id: product.ID,
        name: escapeCsv(product.name || ''),
        brand: product.brand ? escapeCsv(product.brand) : '',
        price: product.priceModel.price ? product.priceModel.price.value : 0,
        online: product.online ? 'Y' : 'N'
    };
};

exports.write = function (items, parameters, stepExecution) {
    for (var i = 0; i < items.size(); i++) {
        var item = items.get(i);
        writer.writeLine([
            item.id,
            item.name,
            item.brand,
            item.price,
            item.online
        ].join(','));
    }
};

exports.afterStep = function (success, parameters, stepExecution) {
    if (products) {
        products.close();
    }
    if (writer) {
        writer.close();
    }

    if (success) {
        log.info('Product export completed successfully');
    } else {
        log.error('Product export failed');
    }
};

function escapeCsv(str) {
    if (str.indexOf(',') >= 0 || str.indexOf('"') >= 0) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}
```

##### Order Processing Example

```javascript
'use strict';

var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'OrderProcess');
var orders;

exports.beforeStep = function (parameters, stepExecution) {
    var status = parameters.OrderStatus || 'NEW';

    // Query orders by status
    orders = OrderMgr.searchOrders(
        'status = {0}',
        'creationDate asc',
        require('dw/order/Order')[status]
    );

    log.info('Found ' + orders.count + ' orders to process');
};

exports.getTotalCount = function (parameters, stepExecution) {
    return orders.count;
};

exports.read = function (parameters, stepExecution) {
    if (orders.hasNext()) {
        return orders.next();
    }
};

exports.process = function (order, parameters, stepExecution) {
    // Validate order can be processed
    if (order.paymentStatus.value !== require('dw/order/Order').PAYMENT_STATUS_PAID) {
        log.warn('Skipping order ' + order.orderNo + ' - not paid');
        return;  // Filter out
    }

    return order;
};

exports.write = function (orders, parameters, stepExecution) {
    for (var i = 0; i < orders.size(); i++) {
        var order = orders.get(i);

        Transaction.wrap(function () {
            // Update order status
            order.setExportStatus(require('dw/order/Order').EXPORT_STATUS_EXPORTED);
            log.info('Processed order: ' + order.orderNo);
        });
    }
};

exports.afterStep = function (success, parameters, stepExecution) {
    if (orders) {
        orders.close();
    }
};
```

##### Customer Sync Example

```javascript
'use strict';

var CustomerMgr = require('dw/customer/CustomerMgr');
var HTTPClient = require('dw/net/HTTPClient');
var Transaction = require('dw/system/Transaction');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'CustomerSync');
var customers;
var apiUrl;
var apiKey;

exports.beforeStep = function (parameters, stepExecution) {
    apiUrl = parameters.APIEndpoint;
    apiKey = parameters.APIKey;

    // Query customers modified since last sync
    var lastSync = parameters.LastSyncDate;
    if (lastSync) {
        customers = CustomerMgr.searchProfiles(
            'lastModified >= {0}',
            'lastModified asc',
            new Date(lastSync)
        );
    } else {
        customers = CustomerMgr.searchProfiles('', 'lastModified asc');
    }
};

exports.getTotalCount = function (parameters, stepExecution) {
    return customers.count;
};

exports.read = function (parameters, stepExecution) {
    if (customers.hasNext()) {
        return customers.next();
    }
};

exports.process = function (profile, parameters, stepExecution) {
    return {
        customerId: profile.customerNo,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        lastModified: profile.lastModified.toISOString()
    };
};

exports.write = function (items, parameters, stepExecution) {
    var http = new HTTPClient();
    http.setTimeout(30000);
    http.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    http.setRequestHeader('Content-Type', 'application/json');

    // Convert Java List to array
    var payload = [];
    for (var i = 0; i < items.size(); i++) {
        payload.push(items.get(i));
    }

    try {
        http.open('POST', apiUrl + '/customers/batch');
        http.send(JSON.stringify({ customers: payload }));

        if (http.statusCode >= 200 && http.statusCode < 300) {
            log.info('Synced ' + payload.length + ' customers');
        } else {
            log.error('API error: ' + http.statusCode);
            throw new Error('API returned ' + http.statusCode);
        }
    } catch (e) {
        log.error('Sync error: ' + e.message);
        throw e;  // Causes step to fail
    }
};

exports.afterStep = function (success, parameters, stepExecution) {
    if (customers) {
        customers.close();
    }
};
```

##### Chunk Lifecycle

1. `beforeStep()` - Called once at start
2. For each chunk:
   - `beforeChunk()` - Before chunk (optional)
   - `read()` - Called repeatedly until returns nothing
   - `process()` - Called for each item from read()
   - `write()` - Called with chunk of processed items
   - `afterChunk()` - After chunk (optional)
3. `afterStep(success)` - Called once at end

##### Chunk Size Considerations

| Chunk Size | Pros | Cons |
|------------|------|------|
| Small (10-50) | More frequent progress updates | Higher overhead |
| Medium (100-500) | Good balance | Default choice |
| Large (1000+) | Less overhead | Less granular progress |

##### Transaction Handling

Two approaches:

**1. transactional="true" in steptypes.json:**
```json
{
    "transactional": "true",
    "chunk-size": 100
}
```
Each chunk wrapped in single transaction. Rollback on error.

**2. Manual Transaction.wrap():**
```javascript
exports.write = function (items, parameters, stepExecution) {
    for (var i = 0; i < items.size(); i++) {
        var item = items.get(i);
        Transaction.wrap(function () {
            // Per-item transaction
        });
    }
};
```
More control, item-level error handling.

##### steptypes.json for Chunk Steps

```json
{
    "step-types": {
        "chunk-script-module-step": [
            {
                "@type-id": "custom.ProductExport",
                "@supports-parallel-execution": "true",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Export products to CSV",
                "module": "my_cartridge/cartridge/scripts/steps/productExport.js",
                "before-step-function": "beforeStep",
                "total-count-function": "getTotalCount",
                "read-function": "read",
                "process-function": "process",
                "write-function": "write",
                "after-step-function": "afterStep",
                "chunk-size": 100,
                "transactional": "false",
                "timeout-in-seconds": 3600,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "OutputFile",
                            "@type": "string",
                            "@required": "false",
                            "default-value": "/export/products.csv",
                            "description": "Output file path"
                        }
                    ]
                }
            }
        ]
    }
}
```

### Reference: STEPTYPES-JSON.md

#### steptypes.json Reference

Complete schema for custom job step type definitions.

##### File Location

Place `steptypes.json` in the **root** folder of the cartridge (NOT inside `cartridge/`):

```
my_cartridge/
├── cartridge/
│   ├── controllers/
│   ├── scripts/
│   │   └── steps/
│   │       └── myStep.js
│   └── my_cartridge.properties
└── steptypes.json              <-- HERE (cartridge root)
```

**Important:** Only one `steptypes.json` file per cartridge. You cannot have both `steptypes.json` and `steptypes.xml` - use one or the other (JSON preferred).

##### Root Structure

```json
{
    "step-types": {
        "script-module-step": [],
        "chunk-script-module-step": []
    }
}
```

##### Task-Oriented Step Schema

```json
{
    "step-types": {
        "script-module-step": [
            {
                "@type-id": "custom.MyStep",
                "@supports-parallel-execution": "false",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Step description",
                "module": "cartridge_name/cartridge/scripts/steps/myStep.js",
                "function": "execute",
                "timeout-in-seconds": 900,
                "parameters": {},
                "status-codes": {}
            }
        ]
    }
}
```

##### Chunk-Oriented Step Schema

```json
{
    "step-types": {
        "chunk-script-module-step": [
            {
                "@type-id": "custom.MyChunkStep",
                "@supports-parallel-execution": "true",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Step description",
                "module": "cartridge_name/cartridge/scripts/steps/myChunkStep.js",
                "before-step-function": "beforeStep",
                "read-function": "read",
                "process-function": "process",
                "write-function": "write",
                "after-step-function": "afterStep",
                "before-chunk-function": "beforeChunk",
                "after-chunk-function": "afterChunk",
                "total-count-function": "getTotalCount",
                "chunk-size": 100,
                "transactional": "false",
                "timeout-in-seconds": 1800,
                "parameters": {},
                "status-codes": {}
            }
        ]
    }
}
```

##### Step Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `@type-id` | Yes | Unique ID (must start with `custom.`, max 100 chars, no whitespace) |
| `@supports-parallel-execution` | No | Allow parallel execution (default: `true`) |
| `@supports-site-context` | No | Available in site-scoped jobs (default: `true`) |
| `@supports-organization-context` | No | Available in org-scoped jobs (default: `true`) |
| `description` | No | Step description (max 4000 chars, not shown in BM) |
| `module` | Yes | Path to script module (no leading/trailing whitespace) |
| `timeout-in-seconds` | No | Step timeout in seconds (recommended to set) |

**Context Constraint:** `@supports-site-context` and `@supports-organization-context` cannot both be `true` or both be `false`. One must be `true` and the other `false`.

##### Task Step Functions

| Attribute | Required | Description |
|-----------|----------|-------------|
| `function` | Yes | Main function name |

##### Chunk Step Functions

| Attribute | Required | Description |
|-----------|----------|-------------|
| `read-function` | No | Read function name (default: `read`) |
| `process-function` | No | Process function name (default: `process`) |
| `write-function` | No | Write function name (default: `write`) |
| `before-step-function` | No | Init function (called once before step) |
| `after-step-function` | No | Cleanup function (called once after step) |
| `before-chunk-function` | No | Called before each chunk |
| `after-chunk-function` | No | Called after each chunk |
| `total-count-function` | No | Returns total item count for progress |
| `chunk-size` | **Yes** | Items per chunk (must be > 0) |
| `transactional` | No | Wrap chunks in transaction (default: `false`) |

**Note:** Chunk-oriented steps always finish with OK or ERROR - you cannot define custom exit status.

##### Parameters

```json
{
    "parameters": {
        "parameter": [
            {
                "@name": "StringParam",
                "@type": "string",
                "@required": "true",
                "@trim": "true",
                "description": "A required string parameter with validation",
                "default-value": "default",
                "min-length": "1",
                "max-length": "100",
                "pattern": "^[a-zA-Z0-9_-]+$"
            },
            {
                "@name": "EnumParam",
                "@type": "string",
                "@required": "true",
                "description": "Select from predefined values",
                "enum-values": {
                    "value": ["option1", "option2", "option3"]
                }
            },
            {
                "@name": "NumberParam",
                "@type": "double",
                "@required": "false",
                "description": "A numeric parameter with range",
                "default-value": "10",
                "min-value": "0",
                "max-value": "100"
            },
            {
                "@name": "DateParam",
                "@type": "datetime-string",
                "@required": "false",
                "@target-type": "date",
                "description": "A datetime parameter converted to date"
            }
        ]
    }
}
```

###### Parameter Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `@name` | Yes | Parameter name (no leading/trailing whitespace) |
| `@type` | Yes | Data type: `boolean`, `string`, `long`, `double`, `datetime-string`, `date-string`, `time-string` |
| `@required` | No | Required flag (default: `true`) |
| `@trim` | No | Trim whitespace before validation (default: `true`) |
| `@target-type` | No | For datetime/date/time types: convert to `long` or `date` (default: `date`) |
| `description` | Yes | Parameter description (max 256 chars) |
| `default-value` | No | Default value when not provided |
| `pattern` | No | Regex pattern for string validation |
| `min-length` | No | Min string length (≥1, strings only) |
| `max-length` | No | Max string length (≤1000, strings only) |
| `min-value` | No | Min value (for long, double, datetime-string, time-string) |
| `max-value` | No | Max value (for long, double, datetime-string, time-string) |
| `enum-values` | No | Allowed values (dropdown in Business Manager) |

###### Parameter Types

| Type | Description | Script Access |
|------|-------------|---------------|
| `string` | Text | `parameters.Name` (String) |
| `boolean` | true/false | `parameters.Name` (Boolean) |
| `long` | Integer | `parameters.Name` (Number) |
| `double` | Decimal | `parameters.Name` (Number) |
| `datetime-string` | ISO datetime | `parameters.Name` (String) |
| `date-string` | ISO date | `parameters.Name` (String) |
| `time-string` | ISO time | `parameters.Name` (String) |

##### Status Codes

```json
{
    "status-codes": {
        "status": [
            {
                "@code": "OK",
                "description": "Step completed successfully"
            },
            {
                "@code": "ERROR",
                "description": "Step failed"
            },
            {
                "@code": "NO_DATA",
                "description": "No data to process"
            },
            {
                "@code": "PARTIAL",
                "description": "Partially completed"
            }
        ]
    }
}
```

**Important notes:**
- Custom status codes work **only** with OK status. If you return `Status.ERROR` with a custom code, it is replaced with ERROR.
- Chunk-oriented steps **cannot** define custom exit status - they always finish with OK or ERROR.
- Custom codes cannot contain commas, wildcards, leading/trailing whitespace, or exceed 100 characters.

```javascript
// Task-oriented step - custom codes work with OK only
return new Status(Status.OK, 'NO_DATA', 'No files to process');
```

##### Complete Example

```json
{
    "step-types": {
        "script-module-step": [
            {
                "@type-id": "custom.FTPDownload",
                "@supports-parallel-execution": "false",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Download files from FTP server",
                "module": "my_cartridge/cartridge/scripts/steps/ftpDownload.js",
                "function": "execute",
                "timeout-in-seconds": 600,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "Host",
                            "@type": "string",
                            "@required": "true",
                            "description": "FTP hostname"
                        },
                        {
                            "@name": "Port",
                            "@type": "long",
                            "@required": "false",
                            "default-value": "21"
                        },
                        {
                            "@name": "Protocol",
                            "@type": "string",
                            "@required": "true",
                            "enum-values": {
                                "value": ["FTP", "SFTP", "FTPS"]
                            }
                        },
                        {
                            "@name": "Username",
                            "@type": "string",
                            "@required": "true"
                        },
                        {
                            "@name": "Password",
                            "@type": "string",
                            "@required": "true"
                        },
                        {
                            "@name": "RemotePath",
                            "@type": "string",
                            "@required": "true",
                            "description": "Remote file or directory path"
                        },
                        {
                            "@name": "LocalPath",
                            "@type": "string",
                            "@required": "true",
                            "default-value": "/src/download/",
                            "description": "Local path relative to IMPEX"
                        },
                        {
                            "@name": "DeleteAfterDownload",
                            "@type": "boolean",
                            "@required": "false",
                            "default-value": "false"
                        }
                    ]
                },
                "status-codes": {
                    "status": [
                        { "@code": "OK", "description": "Download successful" },
                        { "@code": "ERROR", "description": "Download failed" },
                        { "@code": "NO_FILES", "description": "No files to download" },
                        { "@code": "CONNECT_ERROR", "description": "Connection failed" }
                    ]
                }
            }
        ],
        "chunk-script-module-step": [
            {
                "@type-id": "custom.ProductExport",
                "@supports-parallel-execution": "true",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Export products to CSV file",
                "module": "my_cartridge/cartridge/scripts/steps/productExport.js",
                "before-step-function": "beforeStep",
                "total-count-function": "getTotalCount",
                "read-function": "read",
                "process-function": "process",
                "write-function": "write",
                "after-step-function": "afterStep",
                "chunk-size": 500,
                "transactional": "false",
                "timeout-in-seconds": 7200,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "OutputFile",
                            "@type": "string",
                            "@required": "false",
                            "default-value": "/export/products.csv"
                        },
                        {
                            "@name": "CategoryID",
                            "@type": "string",
                            "@required": "false",
                            "description": "Filter by category (empty = all)"
                        },
                        {
                            "@name": "OnlineOnly",
                            "@type": "boolean",
                            "@required": "false",
                            "default-value": "true"
                        },
                        {
                            "@name": "IncludeMasters",
                            "@type": "boolean",
                            "@required": "false",
                            "default-value": "false"
                        }
                    ]
                },
                "status-codes": {
                    "status": [
                        { "@code": "OK", "description": "Export completed" },
                        { "@code": "ERROR", "description": "Export failed" },
                        { "@code": "NO_PRODUCTS", "description": "No products found" }
                    ]
                }
            }
        ]
    }
}
```

### Reference: TASK-ORIENTED.md

#### Task-Oriented Job Steps Reference

Complete patterns for task-oriented job steps.

##### When to Use

- FTP file transfers
- Import/export operations
- Report generation
- External API calls
- Cleanup operations
- Any non-iterable task

##### Basic Structure

```javascript
'use strict';

var Status = require('dw/system/Status');

exports.execute = function (parameters, stepExecution) {
    // Your logic here
    return new Status(Status.OK);
};
```

##### Status Codes

Custom status codes work **only** with `Status.OK`. Custom codes with `Status.ERROR` are replaced with ERROR.

```javascript
// Custom OK codes work - these are useful for flow transitions
return new Status(Status.OK, 'NO_DATA', 'No files found');
return new Status(Status.OK, 'PARTIAL', 'Some items processed');

// ERROR always becomes ERROR - custom code is ignored
return new Status(Status.ERROR, null, 'Something failed');  // Code will be ERROR
```

##### Step Execution Context

```javascript
exports.execute = function (parameters, stepExecution) {
    // Access job information
    var jobId = stepExecution.jobExecution.jobID;
    var stepId = stepExecution.stepID;
    var startTime = stepExecution.startTime;

    // Access custom exit status if set
    var exitStatus = stepExecution.exitStatus;
};
```

##### FTP Download Example

```javascript
'use strict';

var Status = require('dw/system/Status');
var FTPClient = require('dw/net/FTPClient');
var File = require('dw/io/File');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'FTPDownload');

exports.execute = function (parameters, stepExecution) {
    var host = parameters.Host;
    var username = parameters.Username;
    var password = parameters.Password;
    var remoteFile = parameters.RemoteFile;
    var localPath = parameters.LocalPath;

    var ftp = new FTPClient();

    try {
        // Connect
        log.info('Connecting to ' + host);
        ftp.connect(host, username, password);

        if (!ftp.connected) {
            return new Status(Status.ERROR, 'CONNECT_FAILED', 'Failed to connect to FTP server');
        }

        // Download file
        log.info('Downloading ' + remoteFile);
        var localFile = new File(File.IMPEX + localPath);
        var success = ftp.getBinary(remoteFile, localFile);

        if (!success) {
            return new Status(Status.ERROR, 'DOWNLOAD_FAILED', 'Failed to download file');
        }

        log.info('Download complete: ' + localFile.fullPath);
        return new Status(Status.OK);

    } catch (e) {
        log.error('FTP error: ' + e.message);
        return new Status(Status.ERROR, 'FTP_ERROR', e.message);

    } finally {
        if (ftp.connected) {
            ftp.disconnect();
        }
    }
};
```

##### SFTP Example

```javascript
'use strict';

var Status = require('dw/system/Status');
var SFTPClient = require('dw/net/SFTPClient');
var File = require('dw/io/File');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'SFTPUpload');

exports.execute = function (parameters, stepExecution) {
    var host = parameters.Host;
    var port = parameters.Port || 22;
    var username = parameters.Username;
    var password = parameters.Password;
    var localPath = parameters.LocalFile;
    var remotePath = parameters.RemotePath;

    var sftp = new SFTPClient();

    try {
        sftp.connect(host, port, username, password);

        if (!sftp.connected) {
            return new Status(Status.ERROR, 'CONNECT_FAILED');
        }

        var localFile = new File(File.IMPEX + localPath);
        if (!localFile.exists()) {
            return new Status(Status.ERROR, 'FILE_NOT_FOUND', 'Local file not found');
        }

        sftp.putBinary(remotePath, localFile);
        log.info('Uploaded: ' + localFile.name + ' to ' + remotePath);

        return new Status(Status.OK);

    } finally {
        if (sftp.connected) {
            sftp.disconnect();
        }
    }
};
```

##### HTTP/REST API Example

```javascript
'use strict';

var Status = require('dw/system/Status');
var HTTPClient = require('dw/net/HTTPClient');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'APISync');

exports.execute = function (parameters, stepExecution) {
    var apiUrl = parameters.APIUrl;
    var apiKey = parameters.APIKey;

    var http = new HTTPClient();
    http.setTimeout(30000);
    http.setRequestHeader('Authorization', 'Bearer ' + apiKey);
    http.setRequestHeader('Content-Type', 'application/json');

    try {
        http.open('POST', apiUrl);
        http.send(JSON.stringify({ action: 'sync', timestamp: new Date().toISOString() }));

        var statusCode = http.statusCode;
        var responseText = http.text;

        if (statusCode >= 200 && statusCode < 300) {
            log.info('API sync successful');
            return new Status(Status.OK);
        } else {
            log.error('API error: ' + statusCode + ' - ' + responseText);
            return new Status(Status.ERROR, 'API_ERROR', 'HTTP ' + statusCode);
        }

    } catch (e) {
        log.error('HTTP error: ' + e.message);
        return new Status(Status.ERROR, 'HTTP_ERROR', e.message);
    }
};
```

##### File Processing Example

```javascript
'use strict';

var Status = require('dw/system/Status');
var File = require('dw/io/File');
var FileReader = require('dw/io/FileReader');
var FileWriter = require('dw/io/FileWriter');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'FileProcessor');

exports.execute = function (parameters, stepExecution) {
    var inputPath = parameters.InputFile;
    var outputPath = parameters.OutputFile;

    var inputFile = new File(File.IMPEX + inputPath);
    if (!inputFile.exists()) {
        return new Status(Status.ERROR, 'FILE_NOT_FOUND', 'Input file not found');
    }

    var outputFile = new File(File.IMPEX + outputPath);
    var reader;
    var writer;

    try {
        reader = new FileReader(inputFile);
        writer = new FileWriter(outputFile);

        var line;
        var lineCount = 0;

        while ((line = reader.readLine()) !== null) {
            // Process line
            var processed = line.toUpperCase();  // Example transformation
            writer.writeLine(processed);
            lineCount++;
        }

        log.info('Processed ' + lineCount + ' lines');
        return new Status(Status.OK);

    } finally {
        if (reader) reader.close();
        if (writer) writer.close();
    }
};
```

##### Cleanup Example

```javascript
'use strict';

var Status = require('dw/system/Status');
var File = require('dw/io/File');
var Logger = require('dw/system/Logger');

var log = Logger.getLogger('job', 'FileCleanup');

exports.execute = function (parameters, stepExecution) {
    var directory = parameters.Directory;
    var maxAgeHours = parameters.MaxAgeHours || 24;

    var folder = new File(File.IMPEX + directory);
    if (!folder.exists() || !folder.directory) {
        return new Status(Status.ERROR, 'INVALID_PATH', 'Directory not found');
    }

    var files = folder.listFiles();
    var cutoffTime = Date.now() - (maxAgeHours * 60 * 60 * 1000);
    var deletedCount = 0;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (!file.directory && file.lastModified() < cutoffTime) {
            file.remove();
            deletedCount++;
            log.info('Deleted: ' + file.name);
        }
    }

    log.info('Cleanup complete. Deleted ' + deletedCount + ' files.');
    return new Status(Status.OK, 'OK', 'Deleted ' + deletedCount + ' files');
};
```

##### steptypes.json for Task Steps

```json
{
    "step-types": {
        "script-module-step": [
            {
                "@type-id": "custom.FTPDownload",
                "@supports-parallel-execution": "false",
                "@supports-site-context": "true",
                "@supports-organization-context": "false",
                "description": "Download file from FTP server",
                "module": "my_cartridge/cartridge/scripts/steps/ftpDownload.js",
                "function": "execute",
                "timeout-in-seconds": 600,
                "parameters": {
                    "parameter": [
                        {
                            "@name": "Host",
                            "@type": "string",
                            "@required": "true",
                            "description": "FTP server hostname"
                        },
                        {
                            "@name": "Username",
                            "@type": "string",
                            "@required": "true"
                        },
                        {
                            "@name": "Password",
                            "@type": "string",
                            "@required": "true"
                        },
                        {
                            "@name": "RemoteFile",
                            "@type": "string",
                            "@required": "true",
                            "description": "Remote file path"
                        },
                        {
                            "@name": "LocalPath",
                            "@type": "string",
                            "@required": "true",
                            "description": "Local path (relative to IMPEX)"
                        }
                    ]
                },
                "status-codes": {
                    "status": [
                        { "@code": "OK", "description": "Download successful" },
                        { "@code": "ERROR", "description": "Download failed" },
                        { "@code": "CONNECT_FAILED", "description": "Connection failed" },
                        { "@code": "DOWNLOAD_FAILED", "description": "File download failed" }
                    ]
                }
            }
        ]
    }
}
```

---


<a id="b2c-custom-objects"></a>
## b2c-custom-objects

**When to use:** Work with custom objects in B2C Commerce using Script API and OCAPI. Use when storing custom business data, querying custom objects, implementing data persistence, or creating site-scoped or global data stores. Covers CustomObjectMgr, OCAPI Data API, search queries, and Shopper Custom Objects API.

## B2C Custom Objects

Custom objects store business data that doesn't fit into standard system objects. They support both site-scoped and organization-scoped (global) data, with full CRUD operations via Script API and OCAPI.

### When to Use Custom Objects

| Use Case | Example |
|----------|---------|
| Business configuration | Store configuration per site or globally |
| Integration data | Cache external system responses |
| Custom entities | Loyalty tiers, custom promotions, vendor data |
| Temporary processing | Job processing queues, import staging |

### Custom Object Types

Custom objects are defined in Business Manager under **Administration > Site Development > Custom Object Types**. Each type has:

- **ID**: Unique identifier (e.g., `CustomConfig`)
- **Key Attribute**: Primary key field for lookups
- **Attributes**: Custom attributes for data storage
- **Scope**: Site-scoped or organization-scoped (global)

### Script API (CustomObjectMgr)

#### Getting Custom Objects

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

// Get a single custom object by type and key
var config = CustomObjectMgr.getCustomObject('CustomConfig', 'myConfigKey');

if (config) {
    var value = config.custom.configValue;
}
```

#### Creating Custom Objects

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

Transaction.wrap(function() {
    // Create new custom object (type, keyValue)
    var obj = CustomObjectMgr.createCustomObject('CustomConfig', 'newKey');
    obj.custom.configValue = 'myValue';
    obj.custom.isActive = true;
});
```

#### Querying Custom Objects

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

// Query with attribute filter
var objects = CustomObjectMgr.queryCustomObjects(
    'CustomConfig',                    // Type
    'custom.isActive = {0}',           // Query (uses positional params)
    'creationDate desc',               // Sort order
    true                               // Parameter value for {0}
);

while (objects.hasNext()) {
    var obj = objects.next();
    // Process object
}
objects.close();
```

#### Deleting Custom Objects

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

Transaction.wrap(function() {
    var obj = CustomObjectMgr.getCustomObject('CustomConfig', 'keyToDelete');
    if (obj) {
        CustomObjectMgr.remove(obj);
    }
});
```

#### Getting All Objects of a Type

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

// Get all objects of a type
var allConfigs = CustomObjectMgr.getAllCustomObjects('CustomConfig');

while (allConfigs.hasNext()) {
    var config = allConfigs.next();
    // Process
}
allConfigs.close();
```

### CustomObjectMgr API Reference

| Method | Description |
|--------|-------------|
| `getCustomObject(type, keyValue)` | Get single object by type and key |
| `createCustomObject(type, keyValue)` | Create new object (within transaction) |
| `remove(object)` | Delete object (within transaction) |
| `queryCustomObjects(type, query, sortString, ...args)` | Query with filters |
| `getAllCustomObjects(type)` | Get all objects of a type |
| `describe(type)` | Get metadata about the custom object type |

### OCAPI Data API

#### Get Custom Object

```http
GET /s/-/dw/data/v25_6/custom_objects/{object_type}/{key}
Authorization: Bearer {token}
```

**Note:** Use `/s/{site_id}/dw/data/v25_6/custom_objects/...` for site-scoped objects, or `/s/-/dw/data/v25_6/custom_objects/...` for organization-scoped (global) objects.

#### Create Custom Object

```http
PUT /s/-/dw/data/v25_6/custom_objects/{object_type}/{key}
Authorization: Bearer {token}
Content-Type: application/json

{
    "key_property": "myKey",
    "c_configValue": "myValue",
    "c_isActive": true
}
```

#### Update Custom Object

```http
PATCH /s/-/dw/data/v25_6/custom_objects/{object_type}/{key}
Authorization: Bearer {token}
Content-Type: application/json

{
    "c_configValue": "updatedValue"
}
```

#### Delete Custom Object

```http
DELETE /s/-/dw/data/v25_6/custom_objects/{object_type}/{key}
Authorization: Bearer {token}
```

#### Search Custom Objects

```http
POST /s/-/dw/data/v25_6/custom_object_search/{object_type}
Authorization: Bearer {token}
Content-Type: application/json

{
    "query": {
        "bool_query": {
            "must": [
                { "term_query": { "field": "c_isActive", "value": true } }
            ]
        }
    },
    "select": "(**)",
    "sorts": [{ "field": "creation_date", "sort_order": "desc" }],
    "start": 0,
    "count": 25
}
```

#### Search Query Types

| Query Type | Description | Example |
|------------|-------------|---------|
| `term_query` | Exact match | `{"field": "c_status", "value": "active"}` |
| `text_query` | Full-text search | `{"fields": ["c_name"], "search_phrase": "test"}` |
| `range_query` | Range comparison | `{"field": "c_count", "from": 1, "to": 10}` |
| `bool_query` | Combine queries | `{"must": [...], "should": [...], "must_not": [...]}` |
| `match_all_query` | Match all records | `{}` |

### Shopper Custom Objects API (SCAPI)

For read-only access from storefronts, use the Shopper Custom Objects API. This requires specific OAuth scopes.

#### Get Custom Object (Shopper)

```http
GET https://{shortCode}.api.commercecloud.salesforce.com/custom-object/shopper-custom-objects/v1/organizations/{organizationId}/custom-objects/{objectType}/{key}?siteId={siteId}
Authorization: Bearer {shopper_token}
```

#### Required Scopes

For the Shopper Custom Objects API, configure these scopes in your SLAS client:

- `sfcc.shopper-custom-objects` - Global read access to all custom object types
- `sfcc.shopper-custom-objects.{objectType}` - Type-specific read access

**Note:** SLAS clients can have a maximum of 20 custom object scopes.

The custom object type must also be enabled for shopper access in Business Manager.

#### Searchable System Fields

All custom objects have these system fields available for OCAPI search queries:

- `creation_date` - When the object was created (Date)
- `last_modified` - When the object was last modified (Date)
- `key_value_string` - String key value
- `key_value_integer` - Integer key value
- `site_id` - Site identifier (for site-scoped objects)

### Best Practices

#### Do

- Use transactions for create/update/delete operations
- Close query iterators when done (`objects.close()`)
- Use meaningful key values for efficient lookups
- Index frequently queried attributes
- Use site-scoped objects for site-specific data
- Use organization-scoped objects for shared configuration

#### Don't

- Store sensitive data without encryption
- Create excessive custom object types
- Use custom objects for high-volume transactional data
- Forget to handle null returns from `getCustomObject()`
- Leave query iterators open (causes resource leaks)

### Common Patterns

#### Configuration Store

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Site = require('dw/system/Site');

function getConfig(key, defaultValue) {
    var configKey = Site.current.ID + '_' + key;
    var obj = CustomObjectMgr.getCustomObject('SiteConfig', configKey);

    if (obj && obj.custom.value !== null) {
        return JSON.parse(obj.custom.value);
    }
    return defaultValue;
}

function setConfig(key, value) {
    var Transaction = require('dw/system/Transaction');
    var configKey = Site.current.ID + '_' + key;

    Transaction.wrap(function() {
        var obj = CustomObjectMgr.getCustomObject('SiteConfig', configKey);
        if (!obj) {
            obj = CustomObjectMgr.createCustomObject('SiteConfig', configKey);
        }
        obj.custom.value = JSON.stringify(value);
    });
}
```

#### Processing Queue

```javascript
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var Transaction = require('dw/system/Transaction');

// Add to queue
function enqueue(data) {
    var key = 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    Transaction.wrap(function() {
        var obj = CustomObjectMgr.createCustomObject('JobQueue', key);
        obj.custom.data = JSON.stringify(data);
        obj.custom.status = 'pending';
    });
}

// Process queue
function processQueue() {
    var pending = CustomObjectMgr.queryCustomObjects(
        'JobQueue',
        'custom.status = {0}',
        'creationDate asc',
        'pending'
    );

    while (pending.hasNext()) {
        var job = pending.next();
        Transaction.wrap(function() {
            job.custom.status = 'processing';
        });

        try {
            var data = JSON.parse(job.custom.data);
            processJob(data);

            Transaction.wrap(function() {
                CustomObjectMgr.remove(job);
            });
        } catch (e) {
            Transaction.wrap(function() {
                job.custom.status = 'failed';
                job.custom.error = e.message;
            });
        }
    }
    pending.close();
}
```

### Detailed References

- [OCAPI Search Queries](references/OCAPI-SEARCH.md) - Full search query syntax and examples

### Reference: OCAPI-SEARCH.md

#### OCAPI Custom Object Search Reference

Full reference for searching custom objects via OCAPI Data API.

##### Search Endpoint

```http
POST /s/-/dw/data/v24_1/custom_object_search/{object_type}
Authorization: Bearer {token}
Content-Type: application/json
```

##### Request Structure

```json
{
    "query": { },
    "select": "(**)",
    "expand": [],
    "sorts": [{ "field": "creation_date", "sort_order": "desc" }],
    "start": 0,
    "count": 25
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `query` | Yes | Search query object |
| `select` | No | Fields to return (`(**)` for all) |
| `expand` | No | Related objects to expand |
| `sorts` | No | Sort order array |
| `start` | No | Pagination offset (default: 0) |
| `count` | No | Results per page (default: 25, max: 200) |

##### Query Types

###### Term Query (Exact Match)

```json
{
    "query": {
        "term_query": {
            "field": "c_status",
            "value": "active"
        }
    }
}
```

Supports operators:
- `is` (default): Exact match
- `one_of`: Match any value in array
- `is_null`: Check for null
- `is_not_null`: Check for non-null
- `less`, `greater`, `less_or_equal`, `greater_or_equal`: Comparisons
- `not_in`: Exclude values
- `neq`: Not equal

```json
{
    "term_query": {
        "field": "c_priority",
        "operator": "greater",
        "value": 5
    }
}
```

```json
{
    "term_query": {
        "field": "c_status",
        "operator": "one_of",
        "values": ["active", "pending"]
    }
}
```

###### Text Query (Full-Text Search)

```json
{
    "query": {
        "text_query": {
            "fields": ["c_name", "c_description"],
            "search_phrase": "test product"
        }
    }
}
```

###### Range Query

```json
{
    "query": {
        "range_query": {
            "field": "c_count",
            "from": 1,
            "to": 100,
            "from_inclusive": true,
            "to_inclusive": false
        }
    }
}
```

###### Boolean Query

Combine multiple queries:

```json
{
    "query": {
        "bool_query": {
            "must": [
                { "term_query": { "field": "c_isActive", "value": true } },
                { "term_query": { "field": "c_type", "value": "premium" } }
            ],
            "should": [
                { "term_query": { "field": "c_priority", "operator": "greater", "value": 5 } }
            ],
            "must_not": [
                { "term_query": { "field": "c_status", "value": "deleted" } }
            ]
        }
    }
}
```

| Clause | Description |
|--------|-------------|
| `must` | All conditions must match (AND) |
| `should` | At least one should match (OR) |
| `must_not` | None of these should match (NOT) |

###### Match All Query

```json
{
    "query": {
        "match_all_query": {}
    }
}
```

###### Filtered Query

Combine query with filter (filter doesn't affect scoring):

```json
{
    "query": {
        "filtered_query": {
            "query": {
                "text_query": {
                    "fields": ["c_name"],
                    "search_phrase": "test"
                }
            },
            "filter": {
                "term_query": {
                    "field": "c_isActive",
                    "value": true
                }
            }
        }
    }
}
```

###### Nested Query

Query nested objects:

```json
{
    "query": {
        "nested_query": {
            "path": "c_addresses",
            "query": {
                "term_query": {
                    "field": "c_addresses.city",
                    "value": "Boston"
                }
            }
        }
    }
}
```

##### Sorting

```json
{
    "sorts": [
        { "field": "creation_date", "sort_order": "desc" },
        { "field": "c_priority", "sort_order": "asc" }
    ]
}
```

| Sort Order | Description |
|------------|-------------|
| `asc` | Ascending (A-Z, 0-9, oldest first) |
| `desc` | Descending (Z-A, 9-0, newest first) |

##### Field Selection

```json
{
    "select": "(c_name, c_status, creation_date)"
}
```

- `(**)` - All fields (default)
- `(field1, field2)` - Specific fields only

##### Response Structure

```json
{
    "_v": "24.1",
    "count": 25,
    "data": [
        {
            "key_property": "key1",
            "c_name": "Test Object",
            "c_status": "active",
            "creation_date": "2024-01-15T10:30:00.000Z"
        }
    ],
    "expand": [],
    "hits": [
        {
            "data": { },
            "relevant_attributes": ["c_name"]
        }
    ],
    "query": { },
    "select": "(**)",
    "start": 0,
    "total": 150
}
```

##### Pagination Example

```bash
# First page
curl -X POST ".../custom_object_search/MyType" \
  -d '{"query":{"match_all_query":{}},"start":0,"count":25}'

# Second page
curl -X POST ".../custom_object_search/MyType" \
  -d '{"query":{"match_all_query":{}},"start":25,"count":25}'
```

##### Complex Query Example

Find active premium configs modified in the last 7 days:

```json
{
    "query": {
        "bool_query": {
            "must": [
                { "term_query": { "field": "c_isActive", "value": true } },
                { "term_query": { "field": "c_tier", "value": "premium" } },
                {
                    "range_query": {
                        "field": "last_modified",
                        "from": "2024-01-08T00:00:00.000Z"
                    }
                }
            ]
        }
    },
    "sorts": [{ "field": "last_modified", "sort_order": "desc" }],
    "count": 50
}
```

##### Error Handling

| Status | Description |
|--------|-------------|
| 400 | Invalid query syntax |
| 401 | Missing or invalid token |
| 403 | Insufficient permissions |
| 404 | Custom object type not found |

---


<a id="b2c-forms"></a>
## b2c-forms

**When to use:** B2C Commerce form development including form XML definitions, ISML form rendering, dw.forms API, form groups, form lists, form actions, form validation, server-side processing, and template rendering. Covers checkout forms, account forms, address forms, and any form with field definitions or validation rules.

## Forms Skill

This skill guides you through creating forms with validation in Salesforce B2C Commerce using the SFRA patterns.

### Overview

B2C Commerce forms consist of three parts:

1. **Form Definition** - XML file defining fields, validation, and actions
2. **Controller Logic** - Server-side form handling and processing
3. **Template** - ISML template rendering the HTML form

### File Location

Forms are defined in the cartridge's `forms` directory:

```
/my-cartridge
    /cartridge
        /forms
            /default              # Default locale
                profile.xml
                contact.xml
            /de_DE               # German-specific (optional)
                address.xml
```

### Form Definition (XML)

#### Basic Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <field formid="email" label="form.email.label" type="string"
           mandatory="true" max-length="50"
           regexp="^[\w.%+-]+@[\w.-]+\.\w{2,6}$"
           parse-error="form.email.invalid"/>

    <field formid="password" label="form.password.label" type="string"
           mandatory="true" min-length="8" max-length="255"
           missing-error="form.password.required"/>

    <field formid="rememberMe" label="form.remember.label" type="boolean"/>

    <action formid="submit" valid-form="true"/>
    <action formid="cancel" valid-form="false"/>
</form>
```

#### Field Types

| Type | Description | HTML Input |
|------|-------------|------------|
| `string` | Text input | `<input type="text">` |
| `integer` | Whole number | `<input type="number">` |
| `number` | Decimal number | `<input type="number">` |
| `boolean` | Checkbox | `<input type="checkbox">` |
| `date` | Date value | `<input type="date">` |

#### Key Field Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `formid` | Field identifier (required) | `formid="email"` |
| `label` | Resource key for label | `label="form.email.label"` |
| `type` | Data type (required) | `type="string"` |
| `mandatory` | Required field | `mandatory="true"` |
| `max-length` | Max string length | `max-length="100"` |
| `min-length` | Min string length | `min-length="8"` |
| `regexp` | Validation pattern | `regexp="^\d{5}$"` |

#### Validation Error Messages

| Attribute | When Triggered |
|-----------|----------------|
| `missing-error` | Mandatory field is empty |
| `parse-error` | Value doesn't match regexp or type |
| `range-error` | Value outside min/max range |
| `value-error` | General validation failure |

See [Form XML Reference](references/FORM-XML.md) for complete field attributes, groups, lists, and validation patterns.

### Controller Logic (SFRA)

#### Rendering a Form

```javascript
'use strict';

var server = require('server');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get('Show',
    csrfProtection.generateToken,
    function (req, res, next) {
        var form = server.forms.getForm('profile');
        form.clear();  // Reset previous values

        res.render('account/profile', {
            profileForm: form
        });
        next();
    }
);

module.exports = server.exports();
```

#### Processing Form Submission

```javascript
server.post('Submit',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var form = server.forms.getForm('profile');

        if (!form.valid) {
            res.json({
                success: false,
                fields: getFormErrors(form)
            });
            return next();
        }

        // Access form values
        var email = form.email.value;
        var firstName = form.firstName.value;

        // Process and save data
        this.on('route:BeforeComplete', function () {
            var Transaction = require('dw/system/Transaction');
            Transaction.wrap(function () {
                customer.profile.email = email;
                customer.profile.firstName = firstName;
            });
        });

        res.json({ success: true });
        next();
    }
);

function getFormErrors(form) {
    var errors = {};
    Object.keys(form).forEach(function (key) {
        if (form[key] && form[key].error) {
            errors[key] = form[key].error;
        }
    });
    return errors;
}
```

#### Prepopulating Forms

```javascript
server.get('Edit', function (req, res, next) {
    var form = server.forms.getForm('profile');
    form.clear();

    var profile = req.currentCustomer.profile;
    form.firstName.value = profile.firstName;
    form.lastName.value = profile.lastName;
    form.email.value = profile.email;

    res.render('account/editProfile', { profileForm: form });
    next();
});
```

### Template (ISML)

#### Basic Form Template

```html
<form action="${pdict.actionUrl}" method="POST" name="profile-form"
      class="form-horizontal" data-action="${URLUtils.url('Profile-Submit')}">

    <!-- CSRF Token -->
    <input type="hidden" name="${pdict.csrf.tokenName}" value="${pdict.csrf.token}"/>

    <div class="form-group ${pdict.profileForm.email.mandatory ? 'required' : ''}">
        <label for="email" class="form-control-label">
            ${Resource.msg('form.email.label', 'forms', null)}
        </label>
        <input type="email"
               id="email"
               name="email"
               class="form-control ${pdict.profileForm.email.error ? 'is-invalid' : ''}"
               value="${pdict.profileForm.email.value || ''}"
               <isif condition="${pdict.profileForm.email.mandatory}">required</isif>
               maxlength="${pdict.profileForm.email.maxLength || 50}"/>
        <isif condition="${pdict.profileForm.email.error}">
            <div class="invalid-feedback">${pdict.profileForm.email.error}</div>
        </isif>
    </div>

    <button type="submit" class="btn btn-primary">
        ${Resource.msg('button.submit', 'forms', null)}
    </button>
</form>
```

### Localization

Form labels and errors use resource bundles:

**forms.properties:**
```properties
form.email.label=Email Address
form.email.required=Email is required
form.email.invalid=Please enter a valid email address
form.password.label=Password
button.submit=Submit
```

**forms_de_DE.properties:**
```properties
form.email.label=E-Mail-Adresse
form.email.required=E-Mail ist erforderlich
```

### Best Practices

1. **Always use CSRF protection** for form submissions
2. **Clear forms** before displaying to reset state
3. **Use resource keys** for labels and errors (localization)
4. **Validate server-side** even with client-side validation
5. **Use `route:BeforeComplete`** for database operations
6. **Return JSON** for AJAX form submissions

### Detailed Reference

For comprehensive form patterns:
- [Form XML Reference](references/FORM-XML.md) - Complete XML schema, validation patterns, and examples

### Reference: FORM-XML.md

#### Form XML Reference

Complete reference for B2C Commerce form definitions.

##### XSD Schema Reference

For the authoritative XML schema definition, use the `b2c` CLI (if installed):

```bash
# View the form XSD schema
b2c docs schema form
```

##### XML Schema

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <!-- Fields, groups, lists, and actions -->
</form>
```

##### Field Element

###### All Attributes

```xml
<field
    formid="fieldName"          <!-- Required: unique identifier -->
    label="resource.key"        <!-- Resource key for label -->
    type="string"               <!-- Required: string|integer|number|boolean|date -->
    mandatory="true"            <!-- Required field (default: false) -->
    default="value"             <!-- Default value -->
    max-length="100"            <!-- Max string length -->
    min-length="1"              <!-- Min string length -->
    max="1000"                  <!-- Max numeric value -->
    min="0"                     <!-- Min numeric value -->
    regexp="^pattern$"          <!-- Validation regex -->
    format="yyyy-MM-dd"         <!-- Date format -->
    binding="object.property"   <!-- Object binding path -->
    validation="${script}"      <!-- Custom validation script -->
    description="resource.key"  <!-- Field description resource -->
    missing-error="error.key"   <!-- Error when mandatory field empty -->
    parse-error="error.key"     <!-- Error when format/type invalid -->
    range-error="error.key"     <!-- Error when out of range -->
    value-error="error.key"     <!-- General validation error -->
    checked-value="yes"         <!-- Value when boolean checked -->
    unchecked-value="no"        <!-- Value when boolean unchecked -->
/>
```

##### Field Types

###### String Field

```xml
<field formid="firstName" type="string"
       label="form.firstname.label"
       mandatory="true"
       max-length="50"
       missing-error="form.firstname.required"/>

<field formid="email" type="string"
       label="form.email.label"
       mandatory="true"
       regexp="^[\w.%+-]+@[\w.-]+\.\w{2,6}$"
       parse-error="form.email.invalid"/>

<field formid="phone" type="string"
       label="form.phone.label"
       regexp="^\+?[\d\s-]{10,20}$"
       parse-error="form.phone.invalid"/>
```

###### Integer Field

```xml
<field formid="quantity" type="integer"
       label="form.quantity.label"
       mandatory="true"
       min="1"
       max="99"
       default="1"
       range-error="form.quantity.range"/>
```

###### Number Field (Decimal)

```xml
<field formid="amount" type="number"
       label="form.amount.label"
       min="0.01"
       max="10000.00"
       range-error="form.amount.range"/>
```

###### Boolean Field

```xml
<field formid="subscribe" type="boolean"
       label="form.subscribe.label"
       checked-value="yes"
       unchecked-value="no"/>

<field formid="termsAccepted" type="boolean"
       label="form.terms.label"
       mandatory="true"
       missing-error="form.terms.required"/>
```

###### Date Field

```xml
<field formid="birthDate" type="date"
       label="form.birthdate.label"
       format="MM/dd/yyyy"
       parse-error="form.birthdate.invalid"/>

<field formid="startDate" type="date"
       label="form.startdate.label"
       format="yyyy-MM-dd"
       mandatory="true"/>
```

##### Validation Patterns

###### Common Regular Expressions

```xml
<!-- Email -->
<field formid="email" regexp="^[\w.%+-]+@[\w.-]+\.\w{2,6}$"/>

<!-- US Phone -->
<field formid="phone" regexp="^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$"/>

<!-- US Zip Code -->
<field formid="postalCode" regexp="^\d{5}(-\d{4})?$"/>

<!-- Credit Card (basic) -->
<field formid="cardNumber" regexp="^\d{13,19}$"/>

<!-- CVV -->
<field formid="cvv" regexp="^\d{3,4}$"/>

<!-- URL -->
<field formid="website" regexp="^https?://[\w.-]+\.\w{2,}"/>

<!-- Alpha only -->
<field formid="name" regexp="^[A-Za-z\s'-]+$"/>

<!-- Alphanumeric -->
<field formid="code" regexp="^[A-Za-z0-9]+$"/>
```

###### Custom Validation Script

```xml
<field formid="password" type="string"
       validation="${require('*/cartridge/scripts/forms/validation').passwordStrength(formfield)}"
       range-error="form.password.weak"/>
```

**Validation script:**
```javascript
// scripts/forms/validation.js
exports.passwordStrength = function(formfield) {
    var password = formfield.value;
    if (!password || password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;  // Uppercase
    if (!/[a-z]/.test(password)) return false;  // Lowercase
    if (!/[0-9]/.test(password)) return false;  // Number
    return true;
};

exports.matchField = function(formfield, otherFieldId) {
    var form = formfield.parent;
    return formfield.value === form[otherFieldId].value;
};
```

##### Groups

Group related fields:

```xml
<group formid="billingAddress">
    <field formid="firstName" type="string" mandatory="true"/>
    <field formid="lastName" type="string" mandatory="true"/>
    <field formid="address1" type="string" mandatory="true"/>
    <field formid="address2" type="string"/>
    <field formid="city" type="string" mandatory="true"/>
    <field formid="state" type="string" mandatory="true"/>
    <field formid="postalCode" type="string" mandatory="true"/>
    <field formid="country" type="string" mandatory="true"/>
</group>
```

**Access in controller:**
```javascript
var form = server.forms.getForm('checkout');
var firstName = form.billingAddress.firstName.value;
var city = form.billingAddress.city.value;
```

##### Lists

Repeating field groups:

```xml
<list formid="lineItems" max="100">
    <field formid="productId" type="string" mandatory="true"/>
    <field formid="quantity" type="integer" min="1" default="1"/>
    <field formid="note" type="string" max-length="255"/>
</list>
```

**Access in controller:**
```javascript
var form = server.forms.getForm('order');
var items = form.lineItems;
for (var i = 0; i < items.length; i++) {
    var productId = items[i].productId.value;
    var quantity = items[i].quantity.value;
}
```

##### Actions

```xml
<!-- Validates form before action -->
<action formid="submit" valid-form="true"/>
<action formid="save" valid-form="true"/>

<!-- Skips validation -->
<action formid="cancel" valid-form="false"/>
<action formid="back" valid-form="false"/>
<action formid="clear" valid-form="false"/>
```

**In template:**
```html
<button type="submit" name="submit">Submit</button>
<button type="submit" name="cancel">Cancel</button>
```

**In controller:**
```javascript
if (req.form.submit) {
    // Submit button clicked, form.valid reflects validation
}
if (req.form.cancel) {
    // Cancel clicked, no validation performed
    res.redirect(URLUtils.url('Account-Show'));
}
```

##### Object Binding

Bind fields to B2C objects:

```xml
<field formid="firstName" type="string" binding="profile.firstName"/>
<field formid="email" type="string" binding="profile.email"/>
```

**Copy to object:**
```javascript
var form = server.forms.getForm('profile');
form.copyTo(customer.profile);
```

**Copy from object:**
```javascript
form.copyFrom(customer.profile);
```

##### Complete Examples

###### Login Form

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <field formid="username" type="string"
           label="form.login.username"
           mandatory="true"
           regexp="^[\w.%+-]+@[\w.-]+\.\w{2,6}$"
           missing-error="form.login.username.missing"
           parse-error="form.login.username.invalid"/>

    <field formid="password" type="string"
           label="form.login.password"
           mandatory="true"
           missing-error="form.login.password.missing"/>

    <field formid="rememberMe" type="boolean"
           label="form.login.remember"/>

    <action formid="login" valid-form="true"/>
    <action formid="forgotPassword" valid-form="false"/>
</form>
```

###### Address Form

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <field formid="firstName" type="string"
           label="form.address.firstname"
           mandatory="true"
           max-length="50"
           binding="address.firstName"/>

    <field formid="lastName" type="string"
           label="form.address.lastname"
           mandatory="true"
           max-length="50"
           binding="address.lastName"/>

    <field formid="address1" type="string"
           label="form.address.line1"
           mandatory="true"
           max-length="100"
           binding="address.address1"/>

    <field formid="address2" type="string"
           label="form.address.line2"
           max-length="100"
           binding="address.address2"/>

    <field formid="city" type="string"
           label="form.address.city"
           mandatory="true"
           max-length="50"
           binding="address.city"/>

    <field formid="state" type="string"
           label="form.address.state"
           mandatory="true"
           binding="address.stateCode"/>

    <field formid="postalCode" type="string"
           label="form.address.postalcode"
           mandatory="true"
           regexp="^\d{5}(-\d{4})?$"
           parse-error="form.address.postalcode.invalid"
           binding="address.postalCode"/>

    <field formid="country" type="string"
           label="form.address.country"
           mandatory="true"
           default="US"
           binding="address.countryCode"/>

    <field formid="phone" type="string"
           label="form.address.phone"
           regexp="^\+?[\d\s.-]{10,20}$"
           parse-error="form.address.phone.invalid"
           binding="address.phone"/>

    <action formid="save" valid-form="true"/>
    <action formid="cancel" valid-form="false"/>
</form>
```

###### Registration Form with Password Confirmation

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <field formid="email" type="string"
           label="form.register.email"
           mandatory="true"
           regexp="^[\w.%+-]+@[\w.-]+\.\w{2,6}$"
           missing-error="form.register.email.missing"
           parse-error="form.register.email.invalid"/>

    <field formid="password" type="string"
           label="form.register.password"
           mandatory="true"
           min-length="8"
           validation="${require('*/cartridge/scripts/forms/validation').passwordStrength(formfield)}"
           missing-error="form.register.password.missing"
           range-error="form.register.password.weak"/>

    <field formid="confirmPassword" type="string"
           label="form.register.confirmpassword"
           mandatory="true"
           missing-error="form.register.confirmpassword.missing"/>

    <field formid="firstName" type="string"
           label="form.register.firstname"
           mandatory="true"
           max-length="50"/>

    <field formid="lastName" type="string"
           label="form.register.lastname"
           mandatory="true"
           max-length="50"/>

    <field formid="acceptTerms" type="boolean"
           label="form.register.terms"
           mandatory="true"
           missing-error="form.register.terms.required"/>

    <action formid="register" valid-form="true"/>
</form>
```

---


<a id="b2c-hooks"></a>
## b2c-hooks

**When to use:** Implement hooks using HookMgr and extension points in B2C Commerce. Use when extending OCAPI/SCAPI behavior, handling system events like order calculation, or registering custom hook implementations. Covers hooks.json, dw.ocapi hooks, and custom extension points.

## B2C Commerce Hooks

Hooks are extension points that allow you to customize business logic by registering scripts. B2C Commerce supports two types of hooks:

1. **OCAPI/SCAPI Hooks** - Extend API resources with before, after, and modifyResponse hooks
2. **System Hooks** - Custom extension points for order calculation, payment, and other core functionality

### Hook Types Overview

| Type | Purpose | Examples |
|------|---------|----------|
| OCAPI/SCAPI | Extend API behavior | `dw.ocapi.shop.basket.afterPOST` |
| System | Core business logic | `dw.order.calculate` |
| Custom | Your own extension points | `app.checkout.validate` |

### Hook Registration

#### File Structure

```
my_cartridge/
├── package.json           # References hooks.json
└── cartridge/
    └── scripts/
        ├── hooks.json     # Hook registrations
        └── hooks/         # Hook implementations
            ├── basket.js
            └── order.js
```

#### package.json

Reference the hooks configuration file:

```json
{
  "name": "my_cartridge",
  "hooks": "./cartridge/scripts/hooks.json"
}
```

#### hooks.json

Register hooks with their implementing scripts:

```json
{
  "hooks": [
    {
      "name": "dw.ocapi.shop.basket.afterPOST",
      "script": "./hooks/basket.js"
    },
    {
      "name": "dw.ocapi.shop.basket.modifyPOSTResponse",
      "script": "./hooks/basket.js"
    },
    {
      "name": "dw.order.calculate",
      "script": "./hooks/order.js"
    }
  ]
}
```

#### Hook Script

Export functions matching the hook method name (without package prefix):

```javascript
// hooks/basket.js
var Status = require('dw/system/Status');

exports.afterPOST = function(basket) {
    // Called after basket creation
    // Returning a value would skip system implementation
};

exports.modifyPOSTResponse = function(basket, basketResponse) {
    // Modify the API response
    basketResponse.c_customField = 'value';
};
```

### HookMgr API

Use `dw.system.HookMgr` to call hooks programmatically:

```javascript
var HookMgr = require('dw/system/HookMgr');

// Check if hook exists
if (HookMgr.hasHook('dw.order.calculate')) {
    // Call the hook
    var result = HookMgr.callHook('dw.order.calculate', 'calculate', basket);
}
```

| Method | Description |
|--------|-------------|
| `hasHook(extensionPoint)` | Returns true if hook is registered or has default implementation |
| `callHook(extensionPoint, functionName, args...)` | Calls the hook, returns result or undefined |

### Status Object

Hooks return `dw.system.Status` to indicate success or failure:

```javascript
var Status = require('dw/system/Status');

// Success - continue processing
return new Status(Status.OK);

// Error - stop processing, rollback transaction
var status = new Status(Status.ERROR);
status.addDetail('error_code', 'INVALID_ADDRESS');
status.addDetail('message', 'Address validation failed');
return status;
```

| Status | HTTP Response | Behavior |
|--------|---------------|----------|
| `Status.OK` | Continues | Hook execution continues |
| `Status.ERROR` | 400 Bad Request | Transaction rolled back, processing stops |
| Uncaught exception | 500 Internal Error | Transaction rolled back |

### Return Value Behavior (Important)

**OCAPI/SCAPI hooks that return ANY value will SKIP the system implementation and all subsequent registered hooks for that extension point.**

This is a common source of bugs. For example, if a hook returns `Status.OK`, the system's `dw.order.calculate` implementation won't run, causing cart totals to be incorrect.

#### When to Return a Value

Return a `Status` object **only** when you want to:
- **Stop processing** with an error (`Status.ERROR`)
- **Skip the system implementation** intentionally

#### When NOT to Return a Value

To ensure system implementations run (like cart calculation), **return nothing**:

```javascript
// Returning Status.OK skips system implementation
exports.afterPOST = function(basket) {
    doSomething(basket);
    return new Status(Status.OK);  // Skips dw.order.calculate
};

// No return value - system implementation runs
exports.afterPOST = function(basket) {
    doSomething(basket);
    // No return, or explicit: return;
};
```

#### Summary

| Return Value | OCAPI/SCAPI Behavior | Custom Hook Behavior |
|-------------|---------------------|---------------------|
| `undefined` (no return) | System implementation runs, subsequent hooks run | All hooks run |
| `Status.OK` | **Skips** system implementation and subsequent hooks | All hooks run |
| `Status.ERROR` | Stops processing, returns error | All hooks run |

**Debugging tip**: If cart totals are wrong or hooks aren't firing, check if an earlier hook is returning a value.

### OCAPI/SCAPI Hooks

OCAPI and SCAPI share the same hooks. Enable in Business Manager:
**Administration > Global Preferences > Feature Switches > Enable Salesforce Commerce Cloud API hook execution**

#### Hook Types

| Hook | When Called | Use Case |
|------|-------------|----------|
| `before<METHOD>` | Before processing | Validation, access control |
| `after<METHOD>` | After processing (in transaction) | Data modification, external calls |
| `modify<METHOD>Response` | Before response sent | Add/modify response properties |

#### Common Hook Patterns

```javascript
// Validation in beforePUT
exports.beforePUT = function(basket, addressDoc) {
    if (!isValidAddress(addressDoc)) {
        var status = new Status(Status.ERROR);
        status.addDetail('validation_error', 'Invalid address');
        return status;
    }
};

// External call in afterPOST (within transaction)
exports.afterPOST = function(basket, paymentDoc) {
    var result = callPaymentService(paymentDoc);
    request.custom.paymentResult = result; // Pass to modifyResponse
    // Returning a Status would skip system implementation
};

// Modify response
exports.modifyPOSTResponse = function(basket, basketResponse, paymentDoc) {
    basketResponse.c_paymentStatus = request.custom.paymentResult.status;
};
```

#### Passing Data Between Hooks

Use `request.custom` to pass data between hooks in the same request:

```javascript
// In afterPOST
exports.afterPOST = function(basket, doc) {
    request.custom.externalId = callExternalService();
};

// In modifyPOSTResponse
exports.modifyPOSTResponse = function(basket, response, doc) {
    response.c_externalId = request.custom.externalId;
};
```

#### Detect SCAPI vs OCAPI

```javascript
exports.afterPOST = function(basket) {
    if (request.isSCAPI()) {
        // SCAPI-specific logic
    } else {
        // OCAPI-specific logic
    }
};
```

### System Hooks

#### Calculate Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.calculate` | `calculate` | Full basket/order calculation |
| `dw.order.calculateShipping` | `calculateShipping` | Shipping calculation |
| `dw.order.calculateTax` | `calculateTax` | Tax calculation |

```javascript
// hooks/calculate.js
var Status = require('dw/system/Status');
var HookMgr = require('dw/system/HookMgr');

exports.calculate = function(lineItemCtnr) {
    // Calculate shipping
    HookMgr.callHook('dw.order.calculateShipping', 'calculateShipping', lineItemCtnr);

    // Calculate promotions, totals...

    // Calculate tax
    HookMgr.callHook('dw.order.calculateTax', 'calculateTax', lineItemCtnr);

    return new Status(Status.OK);
};
```

#### Payment Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.payment.authorize` | `authorize` | Payment authorization |
| `dw.order.payment.capture` | `capture` | Capture authorized payment |
| `dw.order.payment.refund` | `refund` | Refund payment |
| `dw.order.payment.validateAuthorization` | `validateAuthorization` | Check authorization validity |
| `dw.order.payment.reauthorize` | `reauthorize` | Re-authorize expired auth |

#### Order Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.createOrderNo` | `createOrderNo` | Custom order number generation |

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Site = require('dw/system/Site');

exports.createOrderNo = function() {
    var seqNo = OrderMgr.createOrderSequenceNo();
    var prefix = Site.current.ID;
    return prefix + '-' + seqNo;
};
```

### Custom Hooks

Create your own extension points:

```javascript
// Define custom hook
var HookMgr = require('dw/system/HookMgr');

function processCheckout(basket) {
    // Call custom hook if registered
    if (HookMgr.hasHook('app.checkout.validate')) {
        var status = HookMgr.callHook('app.checkout.validate', 'validate', basket);
        if (status && status.error) {
            return status;
        }
    }
    // Continue processing...
}
```

Register in hooks.json:

```json
{
  "hooks": [
    {
      "name": "app.checkout.validate",
      "script": "./hooks/checkout.js"
    }
  ]
}
```

Custom hooks always execute all registered implementations regardless of return value.

### Remote Includes in Hooks

Enhance API responses with data from other SCAPI endpoints:

```javascript
var RESTResponseMgr = require('dw/system/RESTResponseMgr');

exports.modifyGETResponse = function(product, doc) {
    // Include Custom API response
    var include = RESTResponseMgr.createScapiRemoteInclude(
        'custom',           // API family
        'my-api',           // API name
        'v1',               // Version
        'endpoint'          // Endpoint
    );
    doc.c_additionalData = { value: [include] };
};
```

### Best Practices

- Return `undefined` (no return) from OCAPI/SCAPI hooks to ensure system implementations run
- Only return `Status.ERROR` when you need to stop processing
- Returning `Status.OK` skips system implementation and subsequent hooks
- Use `request.custom` to pass data between hooks
- Check `request.isSCAPI()` when supporting both APIs
- Keep hooks focused and performant
- Use custom properties (`c_` prefix) in modifyResponse
- Avoid transactions in calculate hooks (breaks SCAPI)
- Avoid slow external calls in beforeGET (affects caching)

### Error Handling

#### Circuit Breaker

Too many hook errors triggers circuit breaker (HTTP 503):

```json
{
  "title": "Hook Circuit Breaker",
  "type": "https://api.commercecloud.salesforce.com/.../hook-circuit-breaker",
  "detail": "Failure rate above threshold of '50%'",
  "extensionPointName": "dw.ocapi.shop.basket.afterPOST"
}
```

#### Timeout

Hooks must complete within the SCAPI timeout (HTTP 504 on timeout).

### Detailed References

- [OCAPI/SCAPI Hooks](references/OCAPI-SCAPI-HOOKS.md) - API hook patterns and available hooks
- [System Hooks](references/SYSTEM-HOOKS.md) - Calculate, payment, and order hooks

### Reference: OCAPI-SCAPI-HOOKS.md

#### OCAPI/SCAPI Hooks Reference

OCAPI and SCAPI share the same hooks. Registering a hook for OCAPI also applies to SCAPI endpoints.

##### Prerequisites

Enable hooks in Business Manager:
**Administration > Global Preferences > Feature Switches > Enable Salesforce Commerce Cloud API hook execution**

##### Hook Naming Convention

```
dw.ocapi.shop.<resource>.<sub-resource>.<hookType><METHOD>
```

Hook types: `before<METHOD>`, `after<METHOD>`, `modify<METHOD>Response`, `validate<Resource>`

##### Complete Hook Reference

###### Authentication

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.auth.beforePOST` | `beforePOST(authHeader: String, authType: EnumValue): Status` |
| `dw.ocapi.shop.auth.afterPOST` | `afterPOST(customer: Customer, authType: EnumValue): Status` |
| `dw.ocapi.shop.auth.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, authType): Status` |

###### Basket

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.beforeGET` | `beforeGET(basketId: String): Status` |
| `dw.ocapi.shop.basket.beforePATCH` | `beforePATCH(basket: Basket, input): Status` |
| `dw.ocapi.shop.basket.beforePOST_v2` | `beforePOST(basket: Basket): Status` |
| `dw.ocapi.shop.basket.beforeDELETE` | `beforeDELETE(basket: Basket): Status` |
| `dw.ocapi.shop.basket.afterPOST` | `afterPOST(basket: Basket): Status` |
| `dw.ocapi.shop.basket.afterPATCH` | `afterPATCH(basket: Basket, input): Status` |
| `dw.ocapi.shop.basket.afterDELETE` | `afterDELETE(basketId: String): Status` |
| `dw.ocapi.shop.basket.modifyGETResponse` | `modifyGETResponse(basket: Basket, response): Status` |
| `dw.ocapi.shop.basket.modifyPATCHResponse` | `modifyPATCHResponse(basket: Basket, response): Status` |
| `dw.ocapi.shop.basket.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response): Status` |
| `dw.ocapi.shop.basket.validateBasket` | `validateBasket(response, duringSubmit: boolean): Status` |
| `dw.ocapi.baskets.actions.afterMerge` | `afterMerge(basket: Basket): Status` |
| `dw.ocapi.baskets.actions.afterTransfer` | `afterTransfer(basket: Basket): Status` |

###### Basket Billing Address

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.billing_address.beforePUT` | `beforePUT(basket: Basket, address): Status` |
| `dw.ocapi.shop.basket.billing_address.afterPUT` | `afterPUT(basket: Basket, address): Status` |
| `dw.ocapi.shop.basket.billing_address.modifyPUTResponse` | `modifyPUTResponse(basket: Basket, response, address): Status` |

###### Basket Customer

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.customer.beforePUT` | `beforePUT(basket: Basket, customerInfo): Status` |
| `dw.ocapi.shop.basket.customer.afterPUT` | `afterPUT(basket: Basket, customerInfo): Status` |
| `dw.ocapi.shop.basket.customer.modifyPUTResponse` | `modifyPUTResponse(basket: Basket, response, customerInfo): Status` |

###### Basket Coupon

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.coupon.beforePOST` | `beforePOST(basket: Basket, couponItem): Status` |
| `dw.ocapi.shop.basket.coupon.beforeDELETE` | `beforeDELETE(basket: Basket, couponItemId: String): Status` |
| `dw.ocapi.shop.basket.coupon.afterPOST` | `afterPOST(basket: Basket, couponItem): Status` |
| `dw.ocapi.shop.basket.coupon.afterDELETE` | `afterDELETE(basket: Basket, couponItemId: String): Status` |
| `dw.ocapi.shop.basket.coupon.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response, coupon): Status` |
| `dw.ocapi.shop.basket.coupon.modifyDELETEResponse` | `modifyDELETEResponse(basket: Basket, response, couponItemId): Status` |

###### Basket Items

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.items.beforePOST` | `beforePOST(basket: Basket, items): Status` |
| `dw.ocapi.shop.basket.items.afterPOST` | `afterPOST(basket: Basket, items): Status` |
| `dw.ocapi.shop.basket.items.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response, items): Status` |
| `dw.ocapi.shop.basket.item.beforePATCH` | `beforePATCH(basket: Basket, item): Status` |
| `dw.ocapi.shop.basket.item.beforeDELETE` | `beforeDELETE(basket: Basket, itemId: String): Status` |
| `dw.ocapi.shop.basket.item.afterPATCH` | `afterPATCH(basket: Basket, item): Status` |
| `dw.ocapi.shop.basket.item.afterDELETE` | `afterDELETE(basket: Basket, itemId: String): Status` |
| `dw.ocapi.shop.basket.item.modifyPATCHResponse` | `modifyPATCHResponse(basket: Basket, response, itemId): Status` |
| `dw.ocapi.shop.basket.item.modifyDELETEResponse` | `modifyDELETEResponse(basket: Basket, response, itemId): Status` |

###### Basket Gift Certificate Item

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.gift_certificate_item.beforePOST` | `beforePOST(basket: Basket, item): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.beforePATCH` | `beforePATCH(basket: Basket, itemId: String, item): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.beforeDELETE` | `beforeDELETE(basket: Basket, itemId: String): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.afterPOST` | `afterPOST(basket: Basket, item): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.afterPATCH` | `afterPATCH(basket: Basket, itemId: String, item): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.afterDELETE` | `afterDELETE(basket: Basket, itemId: String): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response, item): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.modifyPATCHResponse` | `modifyPATCHResponse(basket: Basket, response, itemId): Status` |
| `dw.ocapi.shop.basket.gift_certificate_item.modifyDELETEResponse` | `modifyDELETEResponse(basket: Basket, response, itemId): Status` |

###### Basket Payment Instrument

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.payment_instrument.beforePOST` | `beforePOST(basket: Basket, instrument): Status` |
| `dw.ocapi.shop.basket.payment_instrument.beforePATCH` | `beforePATCH(basket: Basket, instrument, newInstrument): Status` |
| `dw.ocapi.shop.basket.payment_instrument.beforeDELETE` | `beforeDELETE(basket: Basket, instrument): Status` |
| `dw.ocapi.shop.basket.payment_instrument.afterPOST` | `afterPOST(basket: Basket, instrument): Status` |
| `dw.ocapi.shop.basket.payment_instrument.afterPATCH` | `afterPATCH(basket: Basket, instrument, request): Status` |
| `dw.ocapi.shop.basket.payment_instrument.afterDELETE` | `afterDELETE(basket: Basket): Status` |
| `dw.ocapi.shop.basket.payment_instrument.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response, request): Status` |
| `dw.ocapi.shop.basket.payment_instrument.modifyPATCHResponse` | `modifyPATCHResponse(basket: Basket, response, instrumentId): Status` |
| `dw.ocapi.shop.basket.payment_instrument.modifyDELETEResponse` | `modifyDELETEResponse(basket: Basket, response, instrumentId): Status` |

###### Basket Payment Methods

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.payment_methods.beforeGET` | `beforeGET(basketId: String): Status` |
| `dw.ocapi.shop.basket.payment_methods.afterGET` | `afterGET(basket: Basket, paymentMethods): Status` |
| `dw.ocapi.shop.basket.payment_methods.modifyGETResponse_v2` | `modifyGETResponse(basket: Basket, response): Status` |

###### Basket Shipment

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.shipment.beforePOST` | `beforePOST(basket: Basket, shipment): Status` |
| `dw.ocapi.shop.basket.shipment.beforePATCH` | `beforePATCH(basket: Basket, shipment: Shipment, shipmentInfo): Status` |
| `dw.ocapi.shop.basket.shipment.beforeDELETE` | `beforeDELETE(basket: Basket, shipment: Shipment): Status` |
| `dw.ocapi.shop.basket.shipment.afterPOST` | `afterPOST(basket: Basket, shipment): Status` |
| `dw.ocapi.shop.basket.shipment.afterPATCH` | `afterPATCH(basket: Basket, shipment: Shipment, shipmentInfo): Status` |
| `dw.ocapi.shop.basket.shipment.afterDELETE` | `afterDELETE(basket: Basket, shipmentId: String): Status` |
| `dw.ocapi.shop.basket.shipment.modifyPOSTResponse` | `modifyPOSTResponse(basket: Basket, response, shipment): Status` |
| `dw.ocapi.shop.basket.shipment.modifyPATCHResponse` | `modifyPATCHResponse(basket: Basket, response, shipmentId): Status` |
| `dw.ocapi.shop.basket.shipment.modifyDELETEResponse` | `modifyDELETEResponse(basket: Basket, response, shipmentId): Status` |

###### Basket Shipment Shipping Address

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.shipment.shipping_address.beforePUT` | `beforePUT(basket: Basket, shipment: Shipment, address): Status` |
| `dw.ocapi.shop.basket.shipment.shipping_address.afterPUT` | `afterPUT(basket: Basket, shipment: Shipment, address): Status` |
| `dw.ocapi.shop.basket.shipment.shipping_address.modifyPUTResponse` | `modifyPUTResponse(basket: Basket, response, address): Status` |

###### Basket Shipment Shipping Method

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.shipment.shipping_method.beforePUT` | `beforePUT(basket: Basket, shipment: Shipment, method): Status` |
| `dw.ocapi.shop.basket.shipment.shipping_method.afterPUT` | `afterPUT(basket: Basket, shipment: Shipment, method): Status` |
| `dw.ocapi.shop.basket.shipment.shipping_method.modifyPUTResponse` | `modifyPUTResponse(basket: Basket, response, method): Status` |

###### Basket Shipments Shipping Methods

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.basket.shipments.shipping_methods.beforeGET` | `beforeGET(basketId: String, shipmentId: String): Status` |
| `dw.ocapi.shop.basket.shipments.shipping_methods.modifyGETResponse_v2` | `modifyGETResponse(basket: Basket, response): Status` |

###### Category

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.category.beforeGET` | `beforeGET(categoryId: String): Status` |
| `dw.ocapi.shop.category.modifyGETResponse` | `modifyGETResponse(category: Category, response): Status` |

###### Customer

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.beforePOST` | `beforePOST(customerInput): Status` |
| `dw.ocapi.shop.customer.beforePATCH` | `beforePATCH(customer: Customer, customerInput): Status` |
| `dw.ocapi.shop.customer.afterPOST` | `afterPOST(customer: Customer, customerInput): Status` |
| `dw.ocapi.shop.customer.afterPATCH` | `afterPATCH(customer: Customer, customerInput): Status` |
| `dw.ocapi.shop.customer.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.modifyPATCHResponse` | `modifyPATCHResponse(customer: Customer, response): Status` |

###### Customer Auth

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.auth.beforePOST` | `beforePOST(authHeader: String, authType: EnumValue): Status` |
| `dw.ocapi.shop.customer.auth.afterPOST` | `afterPOST(customer: Customer, authType: EnumValue): Status` |
| `dw.ocapi.shop.customer.auth.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, authType): Status` |

###### Customer Address

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.addresses.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.addresses.beforePOST` | `beforePOST(customer: Customer, address): Status` |
| `dw.ocapi.shop.customer.addresses.afterPOST` | `afterPOST(customer: Customer, address): Status` |
| `dw.ocapi.shop.customer.addresses.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.address.beforeGET` | `beforeGET(customerId: String, addressName: String): Status` |
| `dw.ocapi.shop.customer.address.beforePATCH` | `beforePATCH(customer: Customer, address, addressInput): Status` |
| `dw.ocapi.shop.customer.address.beforeDELETE` | `beforeDELETE(customer: Customer, address): Status` |
| `dw.ocapi.shop.customer.address.afterPATCH` | `afterPATCH(customer: Customer, address, addressInput): Status` |
| `dw.ocapi.shop.customer.address.afterDELETE` | `afterDELETE(customer: Customer, addressName: String): Status` |
| `dw.ocapi.shop.customer.address.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.address.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, address): Status` |
| `dw.ocapi.shop.customer.address.modifyPATCHResponse` | `modifyPATCHResponse(customer: Customer, response, addressName): Status` |

###### Customer Baskets

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.baskets.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.baskets.modifyGETResponse_v2` | `modifyGETResponse(customer: Customer, response): Status` |

###### Customer Orders

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.orders.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.orders.modifyGETResponse_v2` | `modifyGETResponse(customer: Customer, response): Status` |

###### Customer Password

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.password.beforePUT` | `beforePUT(customer: Customer, passwordInput): Status` |
| `dw.ocapi.shop.customer.password.afterPUT_v2` | `afterPUT(customer: Customer, passwordInput): Status` |
| `dw.ocapi.shop.customer.password_reset.beforePOST` | `beforePOST(email: String): Status` |
| `dw.ocapi.shop.customer.password_reset.afterPOST` | `afterPOST(email: String): Status` |

###### Customer Payment Instrument

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.payment_instruments.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.payment_instruments.modifyGETResponse_v2` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.payment_instrument.beforeGET` | `beforeGET(customerId: String, instrumentId: String): Status` |
| `dw.ocapi.shop.customer.payment_instrument.beforePOST` | `beforePOST(customer: Customer, instrument): Status` |
| `dw.ocapi.shop.customer.payment_instrument.beforeDELETE` | `beforeDELETE(customer: Customer, instrument): Status` |
| `dw.ocapi.shop.customer.payment_instrument.afterPOST` | `afterPOST(customer: Customer, instrument): Status` |
| `dw.ocapi.shop.customer.payment_instrument.afterDELETE` | `afterDELETE(customer: Customer, instrumentId: String): Status` |
| `dw.ocapi.shop.customer.payment_instrument.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.payment_instrument.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, instrument): Status` |

###### Customer Product Lists

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.product_lists.beforeGET` | `beforeGET(customerId: String): Status` |
| `dw.ocapi.shop.customer.product_lists.beforePOST` | `beforePOST(customer: Customer, productList): Status` |
| `dw.ocapi.shop.customer.product_lists.afterPOST` | `afterPOST(customer: Customer, productList): Status` |
| `dw.ocapi.shop.customer.product_lists.modifyGETResponse_v3` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.product_list.beforeGET` | `beforeGET(customerId: String, listId: String): Status` |
| `dw.ocapi.shop.customer.product_list.beforePATCH` | `beforePATCH(customer: Customer, productList, listInput): Status` |
| `dw.ocapi.shop.customer.product_list.beforeDELETE` | `beforeDELETE(customer: Customer, productList): Status` |
| `dw.ocapi.shop.customer.product_list.afterPATCH` | `afterPATCH(customer: Customer, productList, listInput): Status` |
| `dw.ocapi.shop.customer.product_list.afterDELETE` | `afterDELETE(customer: Customer, listId: String): Status` |
| `dw.ocapi.shop.customer.product_list.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.product_list.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, productList): Status` |
| `dw.ocapi.shop.customer.product_list.modifyPATCHResponse` | `modifyPATCHResponse(customer: Customer, response, listId): Status` |

###### Customer Product List Items

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.customer.product_list.items.beforeGET` | `beforeGET(customerId: String, listId: String): Status` |
| `dw.ocapi.shop.customer.product_list.items.beforePOST` | `beforePOST(customer: Customer, productList, item): Status` |
| `dw.ocapi.shop.customer.product_list.items.afterPOST` | `afterPOST(customer: Customer, productList, item): Status` |
| `dw.ocapi.shop.customer.product_list.items.modifyGETResponse_v2` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.product_list.item.beforeGET` | `beforeGET(customerId: String, listId: String, itemId: String): Status` |
| `dw.ocapi.shop.customer.product_list.item.beforePATCH` | `beforePATCH(customer: Customer, productList, item, itemInput): Status` |
| `dw.ocapi.shop.customer.product_list.item.beforeDELETE` | `beforeDELETE(customer: Customer, productList, item): Status` |
| `dw.ocapi.shop.customer.product_list.item.afterPATCH` | `afterPATCH(customer: Customer, productList, item, itemInput): Status` |
| `dw.ocapi.shop.customer.product_list.item.afterDELETE` | `afterDELETE(customer: Customer, productList, itemId: String): Status` |
| `dw.ocapi.shop.customer.product_list.item.modifyGETResponse` | `modifyGETResponse(customer: Customer, response): Status` |
| `dw.ocapi.shop.customer.product_list.item.modifyPOSTResponse` | `modifyPOSTResponse(customer: Customer, response, item): Status` |
| `dw.ocapi.shop.customer.product_list.item.modifyPATCHResponse` | `modifyPATCHResponse(customer: Customer, response, itemId): Status` |

###### Gift Certificate

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.gift_certificate.beforePOST` | `beforePOST(giftCertificateCode: String): Status` |
| `dw.ocapi.shop.gift_certificate.modifyPOSTResponse` | `modifyPOSTResponse(giftCertificate, response): Status` |

###### Order

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.order.beforeGET` | `beforeGET(orderId: String): Status` |
| `dw.ocapi.shop.order.beforePOST` | `beforePOST(basket: Basket): Status` |
| `dw.ocapi.shop.order.afterPOST` | `afterPOST(order: Order): Status` |
| `dw.ocapi.shop.order.modifyGETResponse` | `modifyGETResponse(order: Order, response): Status` |
| `dw.ocapi.shop.order.modifyPOSTResponse` | `modifyPOSTResponse(order: Order, response): Status` |
| `dw.ocapi.shop.order.validateOrder` | `validateOrder(response, duringPlace: boolean): Status` |

###### Order Payment Instrument

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.order.payment_instrument.beforePOST` | `beforePOST(order: Order, instrument): Status` |
| `dw.ocapi.shop.order.payment_instrument.beforePATCH` | `beforePATCH(order: Order, instrument, newInstrument): Status` |
| `dw.ocapi.shop.order.payment_instrument.beforeDELETE` | `beforeDELETE(order: Order, instrument): Status` |
| `dw.ocapi.shop.order.payment_instrument.afterPOST` | `afterPOST(order: Order, instrument): Status` |
| `dw.ocapi.shop.order.payment_instrument.afterPATCH` | `afterPATCH(order: Order, instrument, request): Status` |
| `dw.ocapi.shop.order.payment_instrument.afterDELETE` | `afterDELETE(order: Order, instrumentId: String): Status` |
| `dw.ocapi.shop.order.payment_instrument.modifyPOSTResponse` | `modifyPOSTResponse(order: Order, response, request): Status` |
| `dw.ocapi.shop.order.payment_instrument.modifyPATCHResponse` | `modifyPATCHResponse(order: Order, response, instrumentId): Status` |
| `dw.ocapi.shop.order.payment_instrument.modifyDELETEResponse` | `modifyDELETEResponse(order: Order, response, instrumentId): Status` |

###### Order Payment Methods

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.order.payment_methods.beforeGET` | `beforeGET(orderId: String): Status` |
| `dw.ocapi.shop.order.payment_methods.modifyGETResponse_v2` | `modifyGETResponse(order: Order, response): Status` |

###### Product

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.product.beforeGET` | `beforeGET(productId: String): Status` |
| `dw.ocapi.shop.product.modifyGETResponse` | `modifyGETResponse(product: Product, response): Status` |

###### Product Search

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.product_search.beforeGET` | `beforeGET(searchRequest): Status` |
| `dw.ocapi.shop.product_search.modifyGETResponse` | `modifyGETResponse(searchResult, response): Status` |

###### Promotion

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.promotion.beforeGET` | `beforeGET(promotionId: String): Status` |
| `dw.ocapi.shop.promotion.modifyGETResponse` | `modifyGETResponse(promotion: Promotion, response): Status` |
| `dw.ocapi.shop.promotions.beforeGET` | `beforeGET(promotionIds: String): Status` |
| `dw.ocapi.shop.promotions.modifyGETResponse` | `modifyGETResponse(promotions, response): Status` |

###### Search Suggestion

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.search_suggestion.beforeGET` | `beforeGET(query: String): Status` |
| `dw.ocapi.shop.search_suggestion.modifyGETResponse` | `modifyGETResponse(suggestions, response): Status` |

###### Store

| Hook | Signature |
|------|-----------|
| `dw.ocapi.shop.store.beforeGET` | `beforeGET(storeId: String): Status` |
| `dw.ocapi.shop.store.modifyGETResponse` | `modifyGETResponse(store: Store, response): Status` |
| `dw.ocapi.shop.stores.beforeGET` | `beforeGET(storeIds: String): Status` |
| `dw.ocapi.shop.stores.modifyGETResponse` | `modifyGETResponse(stores, response): Status` |

##### Common Patterns

###### Validation (return error to reject request)

```javascript
exports.beforePUT = function(basket, address) {
    if (!isValidZipCode(address.postalCode)) {
        var status = new Status(Status.ERROR);
        status.addDetail('field', 'postalCode');
        status.addDetail('message', 'Invalid postal code');
        return status;
    }
    return new Status(Status.OK);
};
```

###### Modify Response (add custom properties)

```javascript
exports.modifyGETResponse = function(product, response) {
    response.c_customField = 'value';
    response.c_extendedInfo = { source: 'hook' };
};
```

###### Custom Properties

Add `c_` prefixed properties in modifyResponse hooks. Supported types: String, Integer, Double, Boolean, Date, Set of Strings.

##### Notes

- All hooks return `dw.system.Status` - return `Status.OK` to continue, `Status.ERROR` to reject
- Hooks with `_v2` or `_v3` suffix are newer versions with updated signatures
- Response objects in `modify*Response` hooks can be modified in place
- Custom query parameters with `c_` prefix are accessible via `request.httpParameterMap`

### Reference: SYSTEM-HOOKS.md

#### System Hooks Reference

System hooks provide extension points for core B2C Commerce functionality like order calculation, payment processing, and order management.

##### Calculate Hooks

Calculate hooks control basket and order calculation logic.

###### Extension Points

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.calculate` | `calculate(lineItemCtnr)` | Full calculation |
| `dw.order.calculateShipping` | `calculateShipping(lineItemCtnr)` | Shipping only |
| `dw.order.calculateTax` | `calculateTax(lineItemCtnr)` | Tax only |

###### Registration

```json
{
  "hooks": [
    {"name": "dw.order.calculate", "script": "./calculate.js"},
    {"name": "dw.order.calculateShipping", "script": "./calculate.js"},
    {"name": "dw.order.calculateTax", "script": "./calculate.js"}
  ]
}
```

###### Implementation

```javascript
// calculate.js
var Status = require('dw/system/Status');
var HookMgr = require('dw/system/HookMgr');
var ShippingMgr = require('dw/order/ShippingMgr');
var TaxMgr = require('dw/order/TaxMgr');

exports.calculate = function(lineItemCtnr) {
    // 1. Calculate product prices
    calculateProductPrices(lineItemCtnr);

    // 2. Calculate shipping
    HookMgr.callHook('dw.order.calculateShipping', 'calculateShipping', lineItemCtnr);

    // 3. Calculate promotions
    calculatePromotions(lineItemCtnr);

    // 4. Calculate tax
    HookMgr.callHook('dw.order.calculateTax', 'calculateTax', lineItemCtnr);

    // 5. Calculate totals
    lineItemCtnr.updateTotals();

    return new Status(Status.OK);
};

exports.calculateShipping = function(lineItemCtnr) {
    var shipments = lineItemCtnr.shipments.iterator();
    while (shipments.hasNext()) {
        var shipment = shipments.next();
        var method = shipment.shippingMethod;
        if (method) {
            var cost = ShippingMgr.getShippingCost(method, shipment);
            shipment.setShippingLineItem(method);
            shipment.shippingLineItem.setPriceValue(cost.amount.value);
        }
    }
    return new Status(Status.OK);
};

exports.calculateTax = function(lineItemCtnr) {
    // Use built-in tax calculation or external service
    TaxMgr.applyDefaultTaxes(lineItemCtnr);
    return new Status(Status.OK);
};
```

###### SCAPI Consideration

**Important**: Do not use transactions in calculate hooks when supporting SCAPI:

```javascript
exports.calculate = function(lineItemCtnr) {
    // DON'T do this - breaks SCAPI
    // Transaction.wrap(function() { ... });

    // DO this instead - SCAPI manages transactions
    calculatePrices(lineItemCtnr);
    return new Status(Status.OK);
};
```

Check if running under SCAPI:

```javascript
exports.calculate = function(lineItemCtnr) {
    if (request.isSCAPI()) {
        // SCAPI path - no transactions
    } else {
        // Controller path - may use transactions
    }
};
```

##### Payment Hooks

Payment hooks handle authorization, capture, and refund operations.

###### Extension Points

| Extension Point | Function | When Called |
|-----------------|----------|-------------|
| `dw.order.payment.authorize` | `authorize(order, instrument)` | Initial authorization |
| `dw.order.payment.authorizeCreditCard` | `authorizeCreditCard(order, instrument, cvn)` | Credit card auth |
| `dw.order.payment.validateAuthorization` | `validateAuthorization(order)` | Check auth validity |
| `dw.order.payment.reauthorize` | `reauthorize(order)` | Re-authorize if expired |
| `dw.order.payment.capture` | `capture(invoice)` | Capture payment |
| `dw.order.payment.refund` | `refund(invoice)` | Refund payment |
| `dw.order.payment.releaseAuthorization` | `releaseAuthorization(order)` | Release auth hold |

###### Authorization Flow

```javascript
// payment.js
var Status = require('dw/system/Status');
var Transaction = require('dw/system/Transaction');

exports.authorize = function(order, paymentInstrument) {
    var paymentMethod = paymentInstrument.paymentMethod;

    // Call payment processor
    var result = callPaymentProcessor(order, paymentInstrument);

    if (result.success) {
        // Store authorization info
        Transaction.wrap(function() {
            paymentInstrument.paymentTransaction.setTransactionID(result.transactionId);
            paymentInstrument.paymentTransaction.custom.authCode = result.authCode;
            paymentInstrument.paymentTransaction.custom.authTimestamp = new Date();
        });
        return new Status(Status.OK);
    }

    return new Status(Status.ERROR, 'AUTHORIZATION_FAILED', result.errorMessage);
};

exports.validateAuthorization = function(order) {
    var validPayments = 0;
    var instruments = order.paymentInstruments.iterator();

    while (instruments.hasNext()) {
        var pi = instruments.next();
        var authTimestamp = pi.paymentTransaction.custom.authTimestamp;

        // Check if auth is still valid (e.g., within 7 days)
        if (authTimestamp) {
            var authAge = Date.now() - authTimestamp.getTime();
            var sevenDays = 7 * 24 * 60 * 60 * 1000;

            if (authAge < sevenDays) {
                validPayments++;
            }
        }
    }

    return validPayments > 0 ? new Status(Status.OK) : new Status(Status.ERROR);
};

exports.reauthorize = function(order) {
    var instruments = order.paymentInstruments.iterator();

    while (instruments.hasNext()) {
        var pi = instruments.next();
        var result = callPaymentProcessor(order, pi);

        if (!result.success) {
            return new Status(Status.ERROR, 'REAUTH_FAILED');
        }

        Transaction.wrap(function() {
            pi.paymentTransaction.custom.authTimestamp = new Date();
        });
    }

    return new Status(Status.OK);
};
```

###### Capture Flow

```javascript
exports.capture = function(invoice) {
    var order = invoice.order;
    var amount = invoice.grandTotal.grossPrice;

    // Find payment instrument for this invoice
    var paymentInstrument = findPaymentInstrument(order, invoice);
    if (!paymentInstrument) {
        return new Status(Status.ERROR, 'NO_PAYMENT_INSTRUMENT');
    }

    // Call payment processor to capture
    var result = capturePayment(paymentInstrument, amount);

    if (result.success) {
        Transaction.wrap(function() {
            invoice.addCaptureTransaction(paymentInstrument, amount);
        });
        return new Status(Status.OK);
    }

    return new Status(Status.ERROR, 'CAPTURE_FAILED', result.errorMessage);
};
```

###### Refund Flow

```javascript
exports.refund = function(invoice) {
    var order = invoice.order;
    var amount = invoice.grandTotal.grossPrice;

    var paymentInstrument = findPaymentInstrument(order, invoice);
    if (!paymentInstrument) {
        return new Status(Status.ERROR, 'NO_PAYMENT_INSTRUMENT');
    }

    var result = refundPayment(paymentInstrument, amount);

    if (result.success) {
        Transaction.wrap(function() {
            invoice.addRefundTransaction(paymentInstrument, amount);
        });
        return new Status(Status.OK);
    }

    return new Status(Status.ERROR, 'REFUND_FAILED', result.errorMessage);
};
```

##### Order Hooks

###### Order Number Generation

```javascript
// orders.js
var OrderMgr = require('dw/order/OrderMgr');
var Site = require('dw/system/Site');

exports.createOrderNo = function() {
    // Get sequential number
    var seqNo = OrderMgr.createOrderSequenceNo();

    // Add site prefix
    var siteId = Site.current.ID;

    // Format: SITE-YYYYMMDD-00001
    var date = new Date();
    var dateStr = date.getFullYear().toString() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2);

    return siteId + '-' + dateStr + '-' + seqNo;
};
```

Registration:

```json
{
  "hooks": [
    {"name": "dw.order.createOrderNo", "script": "./orders.js"}
  ]
}
```

**Note**: Maximum order number length is 50 characters.

##### Checkout Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.hooks.validateOrder` | `validateOrder(basket)` | Validate before order creation |

##### Return Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.hooks.returnChangeStatus` | `changeStatus(return, returnWO)` | Handle return status changes |

##### Shipping Order Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.hooks.shippingOrderChangeStatus` | `changeStatus(shippingOrder, shippingOrderWO)` | Handle shipping order status |

##### Basket Merge Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.order.hooks.basketMerge` | `merge(sourceBasket, targetBasket)` | Custom basket merge logic |

##### Request Hooks

| Extension Point | Function | Purpose |
|-----------------|----------|---------|
| `dw.system.request.onRequest` | `onRequest()` | Called at request start |
| `dw.system.request.onSession` | `onSession()` | Called when session starts |

##### Custom Extension Points

Create your own extension points for application-specific logic:

```javascript
// In your controller/script
var HookMgr = require('dw/system/HookMgr');

function processLoyalty(customer, order) {
    if (HookMgr.hasHook('app.loyalty.processOrder')) {
        return HookMgr.callHook('app.loyalty.processOrder', 'processOrder', customer, order);
    }
    return null;
}
```

Register implementation:

```json
{
  "hooks": [
    {"name": "app.loyalty.processOrder", "script": "./loyalty.js"}
  ]
}
```

```javascript
// loyalty.js
var Status = require('dw/system/Status');

exports.processOrder = function(customer, order) {
    var points = calculateLoyaltyPoints(order);
    awardPoints(customer, points);
    return new Status(Status.OK);
};
```

Custom hooks execute all registered implementations regardless of return values.

##### Hook Execution Order

When multiple cartridges register the same hook:
1. Hooks execute in cartridge path order
2. First hook to return a value stops execution (for system hooks)
3. Custom hooks execute all implementations

##### Best Practices

###### Calculate Hooks

- Keep calculations fast - runs frequently
- Avoid external service calls during calculation
- Use caching for expensive lookups
- Don't use transactions under SCAPI

###### Payment Hooks

- Always handle partial failures
- Log transaction IDs for debugging
- Implement idempotency where possible
- Store auth timestamps for validation

###### General

- Return appropriate Status objects
- Handle exceptions gracefully
- Use Transaction.wrap() for data changes (except SCAPI calculate)
- Log errors with context for debugging

---


<a id="b2c-isml"></a>
## b2c-isml

**When to use:** Work with ISML templates in B2C Commerce. Use when writing storefront templates, using isprint/isset/isloop tags, understanding ISML expressions (${...}), or creating custom template modules. Covers tag syntax, expression language, and template includes.

## ISML Skill

This skill guides you through creating and working with ISML (Isomorphic Markup Language) templates in Salesforce B2C Commerce. ISML templates combine HTML with dynamic server-side tags.

### Overview

ISML templates are server-side templates that generate HTML. They use special tags prefixed with `is` and expressions in `${...}` syntax to embed dynamic content.

### File Location

Templates reside in the cartridge's `templates` directory:

```
/my-cartridge
    /cartridge
        /templates
            /default                    # Default locale
                /product
                    detail.isml
                    tile.isml
                /home
                    homepage.isml
                /util
                    modules.isml        # Custom tag definitions
            /fr_FR                      # French-specific templates
                /product
                    detail.isml
```

### Essential Tags

#### Conditional Logic

```html
<isif condition="${product.available}">
    <span class="in-stock">In Stock</span>
<iselseif condition="${product.preorderable}">
    <span class="preorder">Pre-order</span>
<iselse>
    <span class="out-of-stock">Out of Stock</span>
</isif>
```

#### Loops

```html
<isloop items="${products}" var="product" status="loopstate">
    <div class="product ${loopstate.odd ? 'odd' : 'even'}">
        <span>${loopstate.count}. ${product.name}</span>
        <isif condition="${loopstate.first}">
            <span class="badge">Featured</span>
        </isif>
    </div>
</isloop>
```

**Loop status properties:**
- `count` - Iteration number (1-based)
- `index` - Current index (0-based)
- `first` - Boolean, true on first iteration
- `last` - Boolean, true on last iteration
- `odd` - Boolean, true on odd iterations
- `even` - Boolean, true on even iterations

#### Variables

```html
<!-- Set a variable (scope is required) -->
<isset name="productName" value="${product.name}" scope="page"/>

<!-- Use the variable -->
<span>${productName}</span>

<!-- Remove a variable -->
<isremove name="productName" scope="page"/>
```

**Scopes (required):** `page`, `request`, `session`, `pdict`

#### Output

```html
<!-- Basic output (HTML encoded by default) -->
<isprint value="${product.name}"/>

<!-- Unencoded output (use carefully) -->
<isprint value="${htmlContent}" encoding="off"/>

<!-- Formatted number -->
<isprint value="${price}" style="CURRENCY"/>

<!-- Formatted date -->
<isprint value="${order.creationDate}" style="DATE_SHORT"/>
```

#### Include Templates

```html
<!-- Include local template -->
<isinclude template="product/components/price"/>

<!-- Include with URL (remote include) -->
<isinclude url="${URLUtils.url('Product-GetPrice', 'pid', product.ID)}"/>
```

#### Decorator Pattern

**Base decorator (layouts/pagelayout.isml):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>${pdict.pageTitle}</title>
</head>
<body>
    <header>
        <isinclude template="components/header"/>
    </header>
    <main>
        <isreplace/>  <!-- Content inserted here -->
    </main>
    <footer>
        <isinclude template="components/footer"/>
    </footer>
</body>
</html>
```

**Page using decorator:**
```html
<isdecorate template="layouts/pagelayout">
    <isslot id="home-banner" context="global"/>
    <div class="homepage-content">
        <h1>${pdict.welcomeMessage}</h1>
    </div>
</isdecorate>
```

### Expressions

Expressions use `${...}` syntax to embed dynamic values:

```html
<!-- Property access -->
${product.name}
${product.price.sales.value}

<!-- Method calls -->
${product.getAvailabilityModel().isInStock()}

<!-- Built-in objects -->
${pdict.myVariable}           <!-- Controller data -->
${session.customer.firstName} <!-- Session data -->
${request.httpParameterMap.pid.stringValue}

<!-- Operators -->
${price > 100 ? 'expensive' : 'affordable'}
${firstName + ' ' + lastName}
${quantity * unitPrice}
```

### Built-in Utilities

#### URLUtils

```html
<!-- Controller URL -->
<a href="${URLUtils.url('Product-Show', 'pid', product.ID)}">View</a>

<!-- HTTPS URL -->
<a href="${URLUtils.https('Account-Show')}">My Account</a>

<!-- Static resource -->
<img src="${URLUtils.staticURL('/images/logo.png')}" alt="Logo"/>

<!-- Absolute URL -->
<a href="${URLUtils.abs('Home-Show')}">Home</a>
```

#### Resource (Localization)

```html
<!-- Get localized string -->
${Resource.msg('button.addtocart', 'product', null)}

<!-- With parameters -->
${Resource.msgf('cart.items', 'cart', null, cartCount)}
```

#### StringUtils

```html
<!-- Truncate text -->
${StringUtils.truncate(description, 100, '...')}

<!-- Format number -->
${StringUtils.formatNumber(quantity, '###,###')}
```

### Custom Modules

Define reusable custom tags in `util/modules.isml`:

```html
<!-- Definition in util/modules.isml -->
<ismodule template="components/productcard"
          name="productcard"
          attribute="product"
          attribute="showPrice"
          attribute="showRating"/>

<!-- Usage in any template -->
<isinclude template="util/modules"/>
<isproductcard product="${product}" showPrice="${true}" showRating="${true}"/>
```

**Component template (components/productcard.isml):**
```html
<div class="product-card">
    <img src="${product.image.url}" alt="${product.name}"/>
    <h3>${product.name}</h3>
    <isif condition="${pdict.showPrice}">
        <span class="price">${product.price.sales.formatted}</span>
    </isif>
    <isif condition="${pdict.showRating && product.rating}">
        <span class="rating">${product.rating} stars</span>
    </isif>
</div>
```

### Caching

```html
<!-- Cache for 24 hours -->
<iscache type="relative" hour="24"/>

<!-- Daily cache (expires at midnight) -->
<iscache type="daily" hour="0" minute="0"/>

<!-- Vary cache by parameter -->
<iscache type="relative" hour="1" varyby="price_promotion"/>
```

**Place `<iscache>` at the beginning of the template.**

### Content Type

```html
<!-- Set content type (must be first in template) -->
<iscontent type="text/html" charset="UTF-8"/>

<!-- For JSON responses -->
<iscontent type="application/json" charset="UTF-8"/>

<!-- For XML -->
<iscontent type="application/xml" charset="UTF-8"/>
```

### Embedded Scripts

```html
<isscript>
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct(pdict.pid);
    var price = product.priceModel.price;
</isscript>

<span>${price.toFormattedString()}</span>
```

**Best Practice:** Keep `<isscript>` blocks minimal. Move complex logic to controllers or helper scripts.

### Comments

```html
<!-- HTML comment (visible in source) -->

<iscomment>
    ISML comment - stripped from output.
    Use for documentation and hiding sensitive info.
</iscomment>
```

### Tag Location Constraints

Not all ISML tags can be used anywhere. Important constraints:

| Tag | Allowed Location |
|-----|------------------|
| `<iscontent>` | Must be before DOCTYPE declaration |
| `<isredirect>` | Must be before DOCTYPE declaration |
| `<isprint>` | Only in `<body>` |
| `<isbreak>` | Only in `<body>`, inside `<isloop>` |
| `<iscontinue>` | Only in `<body>`, inside `<isloop>` |
| `<isnext>` | Inside `<isloop>` |
| `<isreplace>` | Must be within `<isdecorate>` tags |
| `<isactivedatahead>` | Only in `<head>` |

Tags that can be used **anywhere**: `<isif>`, `<isloop>`, `<isinclude>`, `<isset>`, `<isremove>`, `<iscache>`, `<iscomment>`, `<ismodule>`, `<iscookie>`, `<isstatus>`.

### Best Practices

1. **Use `<iscomment>`** instead of HTML comments for sensitive info
2. **Place `<iscontent>` first** in templates that need it
3. **Define modules** in `util/modules.isml` for consistency
4. **Keep templates simple** - move logic to controllers/helpers
5. **Use decorators** for consistent page layouts
6. **Enable caching** on cacheable pages with `<iscache>`
7. **Encode output** - default encoding prevents XSS

### Detailed Reference

For comprehensive tag documentation:
- [Tags Reference](references/TAGS.md) - All ISML tags with examples
- [Expressions Reference](references/EXPRESSIONS.md) - Expression syntax and built-in functions

### Reference: EXPRESSIONS.md

#### ISML Expressions Reference

Expression syntax and built-in functions available in ISML templates.

##### Expression Syntax

Expressions use `${...}` syntax:

```html
${expression}
```

##### Property Access

```html
<!-- Simple property -->
${product.name}

<!-- Nested property -->
${product.price.sales.value}

<!-- Method call -->
${product.getName()}

<!-- Chained access -->
${customer.profile.addressBook.preferredAddress.city}
```

##### Built-in Objects

###### pdict

Data passed from controller:

```html
<!-- Controller: res.render('template', { myVar: 'value' }) -->
${pdict.myVar}
```

###### session

Session data:

```html
${session.sessionID}
${session.customer}
${session.customer.authenticated}
${session.customer.profile.firstName}
${session.currency.currencyCode}
${session.custom.myCustomAttribute}
```

###### request

HTTP request:

```html
${request.httpMethod}
${request.httpHost}
${request.httpPath}
${request.httpHeaders}
${request.httpParameterMap.paramName.stringValue}
${request.locale}
${request.isHttpSecure()}
```

###### response

HTTP response (limited in templates):

```html
${response.writer}
```

###### customer

Current customer:

```html
${customer.authenticated}
${customer.registered}
${customer.ID}
${customer.profile.firstName}
${customer.profile.email}
```

##### Operators

###### Arithmetic

```html
${price * quantity}
${total + tax}
${price - discount}
${total / count}
${value % 2}  <!-- Modulo -->
```

###### Comparison

```html
${price > 100}
${quantity >= 1}
${price < maxPrice}
${stock <= threshold}
${product.ID == 'ABC123'}
${status != 'CANCELLED'}
```

###### Logical

```html
${inStock && available}
${isNew || onSale}
${!outOfStock}
```

###### Ternary

```html
${inStock ? 'Available' : 'Out of Stock'}
${customer.authenticated ? customer.profile.firstName : 'Guest'}
```

###### String Concatenation

```html
${firstName + ' ' + lastName}
${'Product: ' + product.name}
```

###### Null Check

```html
${product != null ? product.name : 'Unknown'}
${empty(products) ? 'No products' : products.length + ' products'}
```

##### Built-in Functions

###### empty()

Check if null, empty string, or empty collection:

```html
<isif condition="${empty(products)}">
    No products found
</isif>

<isif condition="${!empty(customer.profile)}">
    Welcome, ${customer.profile.firstName}
</isif>
```

##### Utility Classes

###### URLUtils

Generate URLs:

```html
<!-- Controller URL -->
${URLUtils.url('Controller-Action')}
${URLUtils.url('Product-Show', 'pid', product.ID)}
${URLUtils.url('Search-Show', 'q', searchTerm, 'page', pageNum)}

<!-- HTTPS URL -->
${URLUtils.https('Account-Show')}
${URLUtils.https('Checkout-Start')}

<!-- HTTP URL -->
${URLUtils.http('Home-Show')}

<!-- Absolute URL -->
${URLUtils.abs('Home-Show')}
${URLUtils.absStatic('/images/logo.png')}

<!-- Static resource -->
${URLUtils.staticURL('/css/style.css')}
${URLUtils.staticURL(URLUtils.CONTEXT_CATALOG, '', '/images/product.jpg')}

<!-- Web root -->
${URLUtils.webRoot()}
${URLUtils.httpWebRoot()}
${URLUtils.httpsWebRoot()}

<!-- Home URL -->
${URLUtils.home()}
${URLUtils.httpHome()}
${URLUtils.httpsHome()}

<!-- Continue URL (current page) -->
${URLUtils.continueURL()}
```

###### Resource

Localized strings:

```html
<!-- Simple message -->
${Resource.msg('key.name', 'bundlename', null)}

<!-- With fallback -->
${Resource.msg('key.name', 'bundlename', 'Default Value')}

<!-- With parameters -->
${Resource.msgf('cart.itemcount', 'cart', null, itemCount)}
${Resource.msgf('greeting', 'common', null, firstName, lastName)}
```

###### StringUtils

String manipulation:

```html
<!-- Truncate -->
${StringUtils.truncate(description, 100, '...')}

<!-- Pad -->
${StringUtils.pad(orderNumber, 10)}

<!-- Trim -->
${StringUtils.trim(input)}

<!-- Format -->
${StringUtils.formatNumber(quantity, '###,###')}
${StringUtils.formatInteger(count)}
${StringUtils.formatMoney(price)}

<!-- Encoding -->
${StringUtils.stringToHtml(text)}
${StringUtils.encodeString(text, 'UTF-8')}
```

###### dw.util.Locale

Locale information:

```html
${new dw.util.Locale(request.locale).displayCountry}
${new dw.util.Locale(request.locale).displayLanguage}
```

##### Date/Time

###### Formatting Dates

```html
<!-- Using isprint -->
<isprint value="${order.creationDate}" style="DATE_SHORT"/>
<isprint value="${order.creationDate}" formatter="yyyy-MM-dd HH:mm:ss"/>

<!-- Using StringUtils -->
${StringUtils.formatCalendar(new dw.util.Calendar(), 'yyyy-MM-dd')}
```

###### Current Date

```html
<isscript>
    var now = new Date();
    var calendar = new dw.util.Calendar();
</isscript>
${now}
${calendar.time}
```

##### Collection Operations

###### Iteration

```html
<isloop items="${products}" var="product" status="st">
    ${st.count}: ${product.name}
</isloop>
```

###### Size/Length

```html
${products.length}
${products.size()}
${basket.productLineItems.length}
```

###### Check Contents

```html
<isif condition="${products.length > 0}">
    Found ${products.length} products
</isif>

<isif condition="${empty(cart.items)}">
    Cart is empty
</isif>
```

##### Common Patterns

###### Null-safe Access

```html
<!-- Check before access -->
<isif condition="${product && product.brand}">
    ${product.brand.displayValue}
</isif>

<!-- Ternary fallback -->
${product.brand ? product.brand.displayValue : 'Unknown Brand'}
```

###### Default Values

```html
${quantity || 1}
${customer.profile.firstName || 'Guest'}
```

###### Conditional Classes

```html
<div class="product ${product.available ? 'in-stock' : 'out-of-stock'}">
<li class="${loopstatus.first ? 'first' : ''} ${loopstatus.last ? 'last' : ''}">
```

###### Price Formatting

```html
<!-- Formatted price -->
${product.priceModel.price.toFormattedString()}

<!-- Raw value -->
${product.priceModel.price.value}

<!-- Currency code -->
${product.priceModel.price.currencyCode}
```

###### Product Images

```html
<!-- Primary image -->
${product.getImage('large').URL}
${product.getImage('large').absURL}
${product.getImage('large').alt}

<!-- Image with fallback -->
<isif condition="${product.getImage('large')}">
    <img src="${product.getImage('large').URL}" alt="${product.name}"/>
<iselse>
    <img src="${URLUtils.staticURL('/images/no-image.png')}" alt="No image"/>
</isif>
```

###### Localized Attributes

```html
<!-- Display value for localized attribute -->
${product.custom.myAttribute}
${product.brand.displayValue}

<!-- Enum value -->
${product.custom.productType.value}
${product.custom.productType.displayValue}
```

### Reference: TAGS.md

#### ISML Tags Reference

Comprehensive reference for ISML tags.

##### Control Flow Tags

###### isif / iselseif / iselse

Conditional rendering:

```html
<isif condition="${customer.authenticated}">
    Welcome back, ${customer.profile.firstName}!
<iselseif condition="${session.custom.guestName}">
    Welcome, ${session.custom.guestName}!
<iselse>
    Welcome, Guest!
</isif>
```

###### isloop

Iterate over collections:

```html
<isloop items="${productList}" var="product" status="loopstatus" begin="0" end="9" step="1">
    <div class="item-${loopstatus.count}">
        ${product.name}
    </div>
</isloop>
```

**Attributes:**
- `items` - Collection to iterate (required)
- `var` - Variable name for current item (required)
- `status` - Loop status object name (optional)
- `begin` - Start index (optional, default 0)
- `end` - End index (optional)
- `step` - Increment (optional, default 1)

**Status properties:**
- `count` - 1-based iteration count
- `index` - 0-based index
- `first` - true on first iteration
- `last` - true on last iteration
- `odd` - true on odd iterations (1, 3, 5...)
- `even` - true on even iterations (2, 4, 6...)

###### isbreak / iscontinue / isnext

Loop control:

```html
<isloop items="${products}" var="product">
    <isif condition="${product.ID == 'STOP'}">
        <isbreak/>  <!-- Exit loop -->
    </isif>
    <isif condition="${!product.online}">
        <iscontinue/>  <!-- Skip to next iteration -->
    </isif>
    ${product.name}
</isloop>
```

##### Variable Tags

###### isset

Set a variable (allowed anywhere in template):

```html
<isset name="total" value="${price * quantity}" scope="page"/>
<isset name="cartId" value="${basket.UUID}" scope="session"/>
<isset name="viewMode" value="grid" scope="request"/>
<isset name="title" value="My Page" scope="pdict"/>
```

**Attributes (all required):**
- `name` - Variable name
- `value` - Value to assign
- `scope` - Variable scope (required)

**Scopes:**
- `page` - Current template only
- `request` - Current request (across includes)
- `session` - User session (persistent)
- `pdict` - Pipeline dictionary (for decorator pattern)

###### isremove

Remove a variable:

```html
<isremove name="tempData" scope="page"/>
```

##### Output Tags

###### isprint

Output values with encoding and formatting.

**Allowed location:** `<body>` only.

```html
<!-- Basic (HTML encoded) -->
<isprint value="${product.name}"/>

<!-- No encoding (dangerous - only for trusted HTML) -->
<isprint value="${richTextContent}" encoding="off"/>

<!-- Number formatting -->
<isprint value="${price}" style="CURRENCY"/>
<isprint value="${quantity}" style="INTEGER"/>
<isprint value="${rate}" style="DECIMAL"/>

<!-- Date formatting -->
<isprint value="${order.creationDate}" style="DATE_SHORT"/>
<isprint value="${order.creationDate}" style="DATE_LONG"/>
<isprint value="${order.creationDate}" style="DATE_TIME"/>

<!-- Custom formatter -->
<isprint value="${date}" formatter="yyyy-MM-dd"/>

<!-- Padding -->
<isprint value="${orderNumber}" padding="10"/>
```

**Encoding options:** `on` (default), `off`, `htmlcontent`, `htmlsinglequote`, `htmldoublequote`, `xml`, `jshtml`, `jsattribute`, `jsblock`, `uricomponent`, `uristrict`

##### Template Composition

###### isinclude

Include another template:

```html
<!-- Local include (from cartridge) -->
<isinclude template="components/header"/>

<!-- URL include (controller output) -->
<isinclude url="${URLUtils.url('Header-Include')}"/>

<!-- Include with specific file -->
<isinclude sf-toolkit="off" template="checkout/billing"/>
```

**Max include depth:** 20 for local, 10 for URL includes.

###### isdecorate / isreplace

Decorator pattern for layouts:

**Decorator template (common/layout/page.isml):**
```html
<!DOCTYPE html>
<html>
<head><title>${pdict.title}</title></head>
<body>
    <isinclude template="components/header"/>
    <main>
        <isreplace/>
    </main>
    <isinclude template="components/footer"/>
</body>
</html>
```

**Page template:**
```html
<isdecorate template="common/layout/page">
    <isset name="title" value="My Page" scope="pdict"/>
    <h1>Page Content</h1>
</isdecorate>
```

###### ismodule

Define custom tags:

```html
<!-- In util/modules.isml -->
<ismodule template="components/badge"
          name="badge"
          attribute="text"
          attribute="type"/>

<!-- Component template (components/badge.isml) -->
<span class="badge badge-${pdict.type}">${pdict.text}</span>

<!-- Usage -->
<isinclude template="util/modules"/>
<isbadge text="Sale" type="danger"/>
```

##### Content Tags

###### iscontent

Set response content type.

**Allowed location:** Must be before DOCTYPE declaration (first in template).

```html
<!-- HTML (default) -->
<iscontent type="text/html" charset="UTF-8"/>

<!-- JSON -->
<iscontent type="application/json" charset="UTF-8"/>

<!-- XML -->
<iscontent type="application/xml" charset="UTF-8"/>

<!-- Plain text -->
<iscontent type="text/plain" charset="UTF-8"/>

<!-- Compact mode (strips whitespace) -->
<iscontent type="text/html" charset="UTF-8" compact="true"/>
```

**Must be first in template.**

###### iscache

Page caching:

```html
<!-- Relative cache (from request time) -->
<iscache type="relative" hour="24"/>
<iscache type="relative" minute="30"/>

<!-- Daily cache (at specific time) -->
<iscache type="daily" hour="0" minute="0"/>

<!-- Vary by factors -->
<iscache type="relative" hour="1" varyby="price_promotion"/>
```

**varyby options:** `price_promotion`, `request_path`, custom

###### iscomment

Template comments (not in output):

```html
<iscomment>
    This will not appear in rendered HTML.
    Use for developer documentation.
</iscomment>
```

###### iscomponent

Include pipeline/controller output:

```html
<iscomponent pipeline="Product-Price" pid="${product.ID}"/>
```

##### Navigation Tags

###### isredirect

Redirect to URL.

**Allowed location:** Must be before DOCTYPE declaration.

```html
<!-- Temporary redirect (302) -->
<isredirect location="${URLUtils.url('Home-Show')}"/>

<!-- Permanent redirect (301) -->
<isredirect location="${URLUtils.url('NewPage-Show')}" permanent="true"/>
```

**Must be before any HTML output.**

###### isstatus

Set HTTP status code:

```html
<isstatus value="404"/>
<isstatus value="500"/>
```

##### Form Tags

###### isselect

Enhanced HTML select element (allowed anywhere in template):

```html
<isselect
    name="country"
    iterator="${countries}"
    description="Select Country"
    value="${countryCode}"
    condition="${true}"
    encoding="on"/>
```

**Attributes:**
- `name` - Name attribute for form submission (required)
- `iterator` - Collection to iterate for options (required)
- `description` - Display text for default/empty option (required)
- `value` - Property to use as option value (required)
- `condition` - Expression to mark option as selected (optional)
- `encoding` - HTML encoding on/off (optional, default: on)

##### Script Tag

###### isscript

Embed server-side JavaScript:

```html
<isscript>
    var ProductMgr = require('dw/catalog/ProductMgr');
    var product = ProductMgr.getProduct('ABC123');
    var available = product.availabilityModel.inStock;
</isscript>

<isif condition="${available}">
    In Stock
</isif>
```

**Best Practice:** Minimize inline scripts. Use controllers for complex logic.

##### Slot Tag

###### isslot

Content slot:

```html
<!-- Global slot -->
<isslot id="header-banner" context="global" description="Header Banner"/>

<!-- Category slot -->
<isslot id="category-banner" context="category" context-object="${category}"/>

<!-- Folder slot -->
<isslot id="folder-promo" context="folder" context-object="${folder}"/>
```

##### Cookie Tag

###### iscookie

Set HTTP cookie:

```html
<iscookie
    name="preference"
    value="dark-mode"
    path="/"
    domain=".example.com"
    maxAge="31536000"
    secure="true"/>
```

##### Active Data Tags

###### isobject

Track page impressions/views. Must pass an object of type ProductHit.

```html
<isobject object="${productHit}" view="detail">
    <!-- Product content -->
</isobject>

<isobject object="${productHit}" view="searchhit">
    <!-- Search result item -->
</isobject>
```

**Attributes:**
- `object` - ProductHit object (required)
- `view` - View type (required): `none`, `searchhit`, `recommendation`, `setproduct`, `detail`

###### isactivedatahead

**Allowed location:** `<head>` only.

```html
<isactivedatahead/>
```

Enables active data collection for pages with a `<head>` tag.

###### isactivedatacontext

**Allowed locations:** `<head>`, `<body>`, anywhere script tags are valid.

```html
<isactivedatacontext category="${category}"/>
```

Collects category context from a page. Should only be in one template used to render a page.

###### isanalyticsoff

Disable analytics for single pages.

**Allowed locations:** `<head>`, `<body>`, anywhere script tags are valid.

```html
<isanalyticsoff/>
```

##### Special Tags

###### isprint with style options

| Style | Description | Example Output |
|-------|-------------|----------------|
| `CURRENCY` | Currency format | $1,234.56 |
| `INTEGER` | Integer only | 1,235 |
| `DECIMAL` | Decimal format | 1,234.56 |
| `DATE_SHORT` | Short date | 1/15/24 |
| `DATE_LONG` | Long date | January 15, 2024 |
| `DATE_TIME` | Date and time | 1/15/24 3:30 PM |

---


<a id="b2c-localization"></a>
## b2c-localization

**When to use:** Localize templates, forms, and content in B2C Commerce. Use when adding translations, working with resource bundles (*.properties files), using Resource.msg or Resource.msgf, or implementing multi-locale/multi-language/multi-country support. Covers i18n, internationalization, translation files, locale folders, string externalization, and date/currency formatting.

## Localization Skill

This skill guides you through localizing B2C Commerce storefronts for multiple languages and regions.

### Overview

B2C Commerce supports localization through:

| Component | Approach |
|-----------|----------|
| **Templates** | Single template set + resource bundles |
| **Forms** | Shared definitions + locale-specific labels |
| **Static content** | Locale-specific folders |
| **Product data** | Localizable attributes |

### Locale Format

Locales follow ISO standards: `{language}_{country}`

| Format | Example | Description |
|--------|---------|-------------|
| `en` | English | Language only |
| `en_US` | English/USA | Language + country |
| `fr_CA` | French/Canada | Language + country |
| `de_DE` | German/Germany | Language + country |

### Resource Bundles

#### Directory Structure

```
/cartridge
    /templates
        /resources
            account.properties          # Default (English)
            checkout.properties
            /fr
                account.properties      # French
                checkout.properties
            /de
                account.properties      # German
                checkout.properties
            /fr_CA
                account.properties      # French Canadian
```

#### Property File Format

**account.properties (default):**
```properties
##############################################
# Account Pages
##############################################
account.title=My Account
account.greeting=Welcome back
account.logout=Sign Out

# Account Dashboard
dashboard.title=Dashboard
dashboard.orders=Order History
dashboard.addresses=Address Book
dashboard.wishlist=Wishlist

# Profile
profile.title=Profile
profile.firstName=First Name
profile.lastName=Last Name
profile.email=Email Address
profile.save=Save Changes
```

**account_fr.properties (French):**
```properties
account.title=Mon compte
account.greeting=Bon retour
account.logout=Se déconnecter

dashboard.title=Tableau de bord
dashboard.orders=Historique des commandes
dashboard.addresses=Carnet d'adresses
dashboard.wishlist=Liste de souhaits

profile.title=Profil
profile.firstName=Prénom
profile.lastName=Nom
profile.email=Adresse e-mail
profile.save=Enregistrer les modifications
```

#### Using Resources in Templates

```html
<!-- Simple message -->
<h1>${Resource.msg('account.title', 'account', null)}</h1>

<!-- With fallback -->
<p>${Resource.msg('account.greeting', 'account', 'Welcome')}</p>

<!-- With parameters -->
<p>${Resource.msgf('cart.items', 'cart', null, cartCount)}</p>
```

**Resource.msg() parameters:**
1. Key name
2. Bundle name (filename without extension)
3. Default value (null = use key if not found)

#### Parameterized Messages

**Property:**
```properties
cart.itemCount=You have {0} items in your cart
greeting.personalized=Hello, {0} {1}!
order.confirmation=Order #{0} placed on {1}
```

**Template:**
```html
${Resource.msgf('cart.itemCount', 'cart', null, itemCount)}
${Resource.msgf('greeting.personalized', 'common', null, firstName, lastName)}
```

### Locale Fallback

B2C Commerce uses a fallback chain: `fr_CA` → `fr` → `default`

**Example:** Requesting `fr_CA`:
1. Look in `/resources/fr_CA/account.properties`
2. If not found, look in `/resources/fr/account.properties`
3. If not found, look in `/resources/account.properties`

### Static Files

#### Directory Structure

```
/cartridge
    /static
        /default
            /css
                style.css
            /images
                logo.png
                buttons/
                    submit.png
            /js
                main.js
        /fr
            /images
                buttons/
                    submit.png      # French text on button
        /de
            /images
                buttons/
                    submit.png      # German text on button
```

#### Referencing Static Files

```html
<!-- Uses locale-specific version if available -->
<img src="${URLUtils.staticURL('/images/buttons/submit.png')}" alt="Submit"/>

<!-- CSS (usually not localized) -->
<link rel="stylesheet" href="${URLUtils.staticURL('/css/style.css')}"/>
```

### Forms Localization

#### Form Definition

```xml
<?xml version="1.0" encoding="UTF-8"?>
<form xmlns="http://www.demandware.com/xml/form/2008-04-19">
    <field formid="email" label="form.email.label" type="string"
           mandatory="true"
           missing-error="form.email.required"
           parse-error="form.email.invalid"/>
</form>
```

#### Resource Bundle

**forms.properties:**
```properties
form.email.label=Email Address
form.email.required=Email is required
form.email.invalid=Please enter a valid email address
```

**forms_fr.properties:**
```properties
form.email.label=Adresse e-mail
form.email.required=L'email est requis
form.email.invalid=Veuillez entrer une adresse e-mail valide
```

### URL Localization

#### Locale-Aware URLs

```html
<!-- Current locale URL -->
<a href="${URLUtils.url('Product-Show', 'pid', 'ABC123')}">View Product</a>

<!-- Specific locale URL -->
<a href="${URLUtils.url(new URLAction('Product-Show', 'MySite', 'fr'))}">
    Voir le produit
</a>
```

#### Language Switcher

```html
<isscript>
    var Site = require('dw/system/Site');
    var URLAction = require('dw/web/URLAction');
    var URLUtils = require('dw/web/URLUtils');
    var Locale = require('dw/util/Locale');
</isscript>

<ul class="language-switcher">
    <isloop items="${Site.current.allowedLocales}" var="localeId">
        <isscript>
            var locale = new Locale(localeId);
            var url = URLUtils.url(new URLAction('Home-Show', Site.current.ID, localeId));
        </isscript>
        <li class="${request.locale == localeId ? 'active' : ''}">
            <a href="${url}">${locale.displayLanguage}</a>
        </li>
    </isloop>
</ul>
```

### Controller Localization

#### Accessing Current Locale

```javascript
var Locale = require('dw/util/Locale');

server.get('Show', function (req, res, next) {
    var currentLocale = Locale.getLocale(req.locale.id);

    res.render('mytemplate', {
        locale: req.locale.id,
        language: currentLocale.language,
        country: currentLocale.country,
        displayLanguage: currentLocale.displayLanguage,
        displayCountry: currentLocale.displayCountry
    });
    next();
});
```

#### Locale-Specific Logic

```javascript
server.get('Checkout', function (req, res, next) {
    var locale = req.locale.id;

    // Locale-specific date format
    var dateFormat = locale.startsWith('en_US') ? 'MM/dd/yyyy' : 'dd/MM/yyyy';

    // Locale-specific content
    var termsContentId = 'terms-' + locale.replace('_', '-').toLowerCase();

    res.render('checkout', {
        dateFormat: dateFormat,
        termsContentId: termsContentId
    });
    next();
});
```

### Email Templates

#### Setting Locale

```javascript
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Mail = require('dw/net/Mail');

function sendOrderConfirmation(order, locale) {
    var template = new Template('mail/orderconfirmation', locale);
    var model = new HashMap();
    model.put('order', order);

    var content = template.render(model).text;

    var mail = new Mail();
    mail.addTo(order.customerEmail);
    mail.setFrom('orders@example.com');
    mail.setSubject(Resource.msg('email.order.subject', 'email', null));
    mail.setContent(content, 'text/html', 'UTF-8');
    mail.send();
}
```

### Currency Formatting

Currency is tied to locale:

```javascript
var Money = require('dw/value/Money');
var StringUtils = require('dw/util/StringUtils');

// Format with locale
var price = new Money(99.99, 'USD');
var formatted = StringUtils.formatMoney(price);  // Uses current locale

// In template
<isprint value="${product.priceModel.price}" style="CURRENCY"/>
```

### Date Formatting

```javascript
var StringUtils = require('dw/util/StringUtils');
var Calendar = require('dw/util/Calendar');

var date = new Calendar();
var formatted = StringUtils.formatCalendar(date, 'yyyy-MM-dd');  // ISO format
var localized = StringUtils.formatCalendar(date, 'MMMM d, yyyy');  // Locale-aware
```

### Best Practices

1. **Use UTF-8** for all property files (required for non-ASCII characters)
2. **Organize bundles by page/feature** not by language
3. **Keep keys descriptive** - `account.profile.firstName` not `label1`
4. **Use parameters** for dynamic values - don't concatenate strings
5. **Test all locales** - ensure fallback works correctly
6. **Don't hardcode text** in templates or scripts

### Detailed Reference

- [Localization Patterns](references/PATTERNS.md) - Complete patterns and examples

### Reference: PATTERNS.md

#### Localization Patterns Reference

Complete patterns for B2C Commerce localization.

##### Resource Bundle Organization

###### Recommended Structure

```
/templates
    /resources
        # Page-specific bundles
        account.properties
        cart.properties
        checkout.properties
        product.properties
        search.properties

        # Feature bundles
        forms.properties
        error.properties
        email.properties

        # Shared bundles
        common.properties
        navigation.properties

        # Locale overrides
        /fr
            account.properties
            cart.properties
            ...
        /de
            account.properties
            cart.properties
            ...
```

###### Bundle Content Patterns

**common.properties:**
```properties
##############################################
# Common UI Elements
##############################################
button.submit=Submit
button.cancel=Cancel
button.save=Save
button.delete=Delete
button.edit=Edit
button.close=Close
button.back=Back
button.continue=Continue
button.addtocart=Add to Cart
button.checkout=Checkout

# Labels
label.required=Required
label.optional=Optional
label.loading=Loading...
label.search=Search
label.filter=Filter
label.sort=Sort by
label.showing=Showing {0} of {1}

# Messages
message.success=Success!
message.error=An error occurred
message.saved=Changes saved successfully
message.deleted=Item deleted
message.confirm=Are you sure?

# Currency
currency.symbol=$
currency.code=USD

# Dates
date.format.short=MM/dd/yyyy
date.format.long=MMMM d, yyyy
```

**error.properties:**
```properties
##############################################
# Error Messages
##############################################
error.general=Something went wrong. Please try again.
error.notfound=Page not found
error.unauthorized=Please sign in to continue
error.forbidden=You don''t have permission to access this page
error.server=Server error. Please try again later.

# Validation errors
error.required={0} is required
error.invalid={0} is invalid
error.email.invalid=Please enter a valid email address
error.password.short=Password must be at least {0} characters
error.password.mismatch=Passwords don''t match

# Cart errors
error.cart.empty=Your cart is empty
error.cart.outofstock={0} is out of stock
error.cart.quantity=Maximum quantity is {0}

# Checkout errors
error.checkout.payment=Payment failed. Please try again.
error.checkout.address=Please enter a valid shipping address
```

##### Template Patterns

###### Page Layout

```html
<isdecorate template="common/layout/page">
    <isset name="pageTitle" value="${Resource.msg('account.title', 'account', 'My Account')}" scope="pdict"/>

    <div class="page-content">
        <h1>${pdict.pageTitle}</h1>

        <isif condition="${pdict.successMessage}">
            <div class="alert alert-success">
                ${Resource.msg(pdict.successMessage, 'common', pdict.successMessage)}
            </div>
        </isif>

        <isif condition="${pdict.errorMessage}">
            <div class="alert alert-error">
                ${Resource.msg(pdict.errorMessage, 'error', pdict.errorMessage)}
            </div>
        </isif>

        <!-- Page content -->
    </div>
</isdecorate>
```

###### Form Labels

```html
<div class="form-group ${pdict.form.email.mandatory ? 'required' : ''}">
    <label for="email">
        ${Resource.msg('form.email.label', 'forms', 'Email')}
        <isif condition="${pdict.form.email.mandatory}">
            <span class="required-indicator">*</span>
        </isif>
    </label>
    <input type="email"
           id="email"
           name="email"
           placeholder="${Resource.msg('form.email.placeholder', 'forms', '')}"
           value="${pdict.form.email.value || ''}"/>
    <isif condition="${pdict.form.email.error}">
        <span class="error-message">${pdict.form.email.error}</span>
    </isif>
</div>
```

###### Pluralization

**Property file:**
```properties
cart.item.singular=item
cart.item.plural=items
cart.summary=Your cart contains {0} {1}
```

**Template:**
```html
<isscript>
    var itemWord = itemCount === 1
        ? Resource.msg('cart.item.singular', 'cart', 'item')
        : Resource.msg('cart.item.plural', 'cart', 'items');
</isscript>
<p>${Resource.msgf('cart.summary', 'cart', null, itemCount, itemWord)}</p>
```

###### Date Formatting

```html
<isscript>
    var StringUtils = require('dw/util/StringUtils');
    var Calendar = require('dw/util/Calendar');

    var orderDate = new Calendar(pdict.order.creationDate);
    var dateFormat = Resource.msg('date.format.long', 'common', 'MMMM d, yyyy');
    var formattedDate = StringUtils.formatCalendar(orderDate, dateFormat);
</isscript>
<p>${Resource.msgf('order.placed', 'order', null, formattedDate)}</p>
```

###### Number Formatting

```html
<isscript>
    var StringUtils = require('dw/util/StringUtils');
    var numberFormat = Resource.msg('number.format', 'common', '#,##0.00');
    var formattedNumber = StringUtils.formatNumber(pdict.quantity, numberFormat);
</isscript>
<span>${formattedNumber}</span>
```

##### Controller Patterns

###### Locale-Aware Controller

```javascript
'use strict';

var server = require('server');
var Resource = require('dw/web/Resource');
var Locale = require('dw/util/Locale');

server.get('Show', function (req, res, next) {
    var currentLocale = Locale.getLocale(req.locale.id);
    var isUSLocale = currentLocale.country === 'US';

    // Get locale-specific content
    var contentAssetId = 'terms-' + req.locale.id.toLowerCase().replace('_', '-');

    // Locale-specific business logic
    var phoneFormat = isUSLocale ? '(XXX) XXX-XXXX' : '+XX XXX XXX XXXX';

    res.render('page', {
        locale: req.locale.id,
        language: currentLocale.displayLanguage,
        phoneFormat: phoneFormat,
        contentAssetId: contentAssetId
    });
    next();
});

// Error messages in controllers
server.post('Submit', function (req, res, next) {
    var form = server.forms.getForm('profile');

    if (!form.valid) {
        res.json({
            success: false,
            message: Resource.msg('error.form.invalid', 'error', 'Please correct the errors')
        });
        return next();
    }

    try {
        // Process form
        res.json({
            success: true,
            message: Resource.msg('message.saved', 'common', 'Saved successfully')
        });
    } catch (e) {
        res.json({
            success: false,
            message: Resource.msg('error.general', 'error', 'An error occurred')
        });
    }
    next();
});
```

###### Multi-Locale Email

```javascript
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Mail = require('dw/net/Mail');
var Resource = require('dw/web/Resource');

function sendWelcomeEmail(customer, locale) {
    var model = new HashMap();
    model.put('customer', customer);
    model.put('storeName', Resource.msg('store.name', 'common', 'Our Store'));

    // Render template with specific locale
    var template = new Template('mail/welcome', locale);
    var htmlContent = template.render(model).text;

    // Get localized subject
    // Note: Resource.msg uses current request locale, not the parameter
    var subject = getLocalizedString('email.welcome.subject', 'email', locale);

    var mail = new Mail();
    mail.addTo(customer.profile.email);
    mail.setFrom('welcome@example.com');
    mail.setSubject(subject);
    mail.setContent(htmlContent, 'text/html', 'UTF-8');
    mail.send();
}

// Helper for getting strings in specific locale
function getLocalizedString(key, bundle, locale) {
    // This requires reading property files directly for non-current locale
    // Or storing translations in a custom object
    var ResourceBundle = require('dw/web/ResourceBundle');
    var rb = ResourceBundle.getBundle(bundle, locale);
    return rb.getString(key);
}
```

##### JavaScript Client-Side

###### Passing Messages to JS

```html
<script>
window.resources = {
    cart: {
        addSuccess: '${Resource.msg('cart.add.success', 'cart', 'Added to cart')}',
        addError: '${Resource.msg('cart.add.error', 'cart', 'Error adding to cart')}',
        removeConfirm: '${Resource.msg('cart.remove.confirm', 'cart', 'Remove this item?')}'
    },
    common: {
        loading: '${Resource.msg('label.loading', 'common', 'Loading...')}',
        error: '${Resource.msg('error.general', 'error', 'An error occurred')}'
    }
};
</script>
```

###### Using in JS

```javascript
function addToCart(productId) {
    showLoading(window.resources.common.loading);

    $.ajax({
        url: '/Cart-AddProduct',
        data: { pid: productId },
        success: function(response) {
            if (response.success) {
                showMessage(window.resources.cart.addSuccess, 'success');
            } else {
                showMessage(response.message || window.resources.cart.addError, 'error');
            }
        },
        error: function() {
            showMessage(window.resources.common.error, 'error');
        }
    });
}
```

##### Special Characters

###### Escaping in Properties

```properties
# Apostrophe - use two single quotes
message.welcome=It''s a great day!
error.cant=You can''t do that

# Newlines
message.multiline=Line one\nLine two\nLine three

# Unicode
store.name=Café du Nord
currency.symbol.euro=€
```

###### UTF-8 Encoding

Always save property files as UTF-8 for proper character support:

```properties
# German
button.close=Schließen
greeting=Grüß Gott!

# French
account.title=Mon Compte
message.success=Réussi!

# Japanese
store.name=店舗名
```

##### Testing Localization

###### Pseudo-Localization

Add a test locale with wrapped strings to find hardcoded text:

```properties
# pseudo.properties
button.submit=[Submit]
button.cancel=[Cancel]
account.title=[My Account]
```

###### Checklist

1. All visible text comes from resource bundles
2. Date/time formats use locale settings
3. Currency displays correctly
4. Number formatting (decimal separators)
5. Images with text have locale versions
6. Email templates render in correct language
7. Error messages are localized
8. JavaScript strings are localized

---


<a id="b2c-logging"></a>
## b2c-logging

**When to use:** Implement logging in B2C Commerce scripts using dw.system.Logger. Use when adding debug output, error tracking, or custom log files to server-side code. Covers getLogger, log categories, log levels (debug, info, warn, error, fatal), and custom named log files.

## Logging Skill

This skill guides you through implementing logging in B2C Commerce using the Logger and Log classes.

### Overview

B2C Commerce provides a logging framework with:

| Feature | Description |
|---------|-------------|
| **Log Levels** | debug, info, warn, error, fatal |
| **Categories** | Organize logs by functional area |
| **Custom Files** | Write to dedicated log files |
| **NDC** | Nested Diagnostic Context for tracing |
| **BM Configuration** | Enable/disable levels per category |

### Log Levels

| Level | Method | Description | Default State |
|-------|--------|-------------|---------------|
| `debug` | `debug()` | Detailed debugging information | Disabled (never on production) |
| `info` | `info()` | General information | Disabled by default |
| `warn` | `warn()` | Warning conditions | Always enabled |
| `error` | `error()` | Error conditions | Always enabled |
| `fatal` | `fatal()` | Critical failures | Always enabled, can send email |

### Basic Logging

#### Using Logger (Static Methods)

The `Logger` class provides static methods for quick logging:

```javascript
var Logger = require('dw/system/Logger');

// Simple messages
Logger.debug('Debug message');
Logger.info('Info message');
Logger.warn('Warning message');
Logger.error('Error message');

// Messages with parameters (Java MessageFormat syntax)
Logger.info('Processing order {0} for customer {1}', orderNo, customerEmail);
Logger.error('Failed to process {0}: {1}', productId, errorMessage);
```

#### Using Log (Instance Methods)

The `Log` class provides instance-based logging with categories:

```javascript
var Logger = require('dw/system/Logger');

// Get logger for a category
var log = Logger.getLogger('checkout');

log.debug('Cart contents: {0}', JSON.stringify(cart));
log.info('Checkout started for basket {0}', basketId);
log.warn('Inventory low for product {0}', productId);
log.error('Payment failed: {0}', errorMessage);
log.fatal('Critical checkout failure: {0}', errorMessage);
```

### Categories

Categories help organize and filter log messages:

```javascript
var Logger = require('dw/system/Logger');

// Different categories for different areas
var checkoutLog = Logger.getLogger('checkout');
var paymentLog = Logger.getLogger('payment');
var inventoryLog = Logger.getLogger('inventory');
var integrationLog = Logger.getLogger('integration');

// Use appropriate logger
checkoutLog.info('Order {0} submitted', orderNo);
paymentLog.info('Payment authorized: {0}', transactionId);
inventoryLog.warn('Stock level below threshold for {0}', productId);
integrationLog.error('API call failed: {0}', serviceName);
```

Categories are configured in Business Manager under **Administration > Operations > Custom Log Settings**.

### Custom Named Log Files

Write to dedicated log files instead of the standard custom log files:

```javascript
var Logger = require('dw/system/Logger');

// Get logger with custom file prefix
var orderExportLog = Logger.getLogger('orderexport', 'export');
var feedLog = Logger.getLogger('productfeed', 'feed');

// Messages go to custom-orderexport-*.log
orderExportLog.info('Exporting order {0}', orderNo);

// Messages go to custom-productfeed-*.log
feedLog.info('Processing product {0}', productId);
```

#### File Name Rules

The `fileNamePrefix` parameter must follow these rules:

| Rule | Requirement |
|------|-------------|
| Length | 3-25 characters |
| Characters | a-z, A-Z, 0-9, `-`, `_` |
| Start/End | Must start and end with alphanumeric |
| Not allowed | Cannot start or end with `-` or `_` |

#### File Naming Pattern

Custom log files follow this pattern:
```
custom-<prefix>-<hostname>-appserver-<date>.log
```

Example: `custom-orderexport-blade0-1-appserver-20240115.log`

#### Quota

Maximum 200 different log file names per day per appserver.

### Checking Log Level Status

Check if a log level is enabled before expensive operations:

```javascript
var Logger = require('dw/system/Logger');
var log = Logger.getLogger('myCategory');

// Check before expensive string building
if (log.isDebugEnabled()) {
    log.debug('Full cart contents: {0}', JSON.stringify(cart));
}

// Check before expensive calculations
if (log.isInfoEnabled()) {
    var stats = calculateDetailedStats(); // expensive
    log.info('Statistics: {0}', JSON.stringify(stats));
}

// Available checks
log.isDebugEnabled();  // true if debug logging enabled
log.isInfoEnabled();   // true if info logging enabled
log.isWarnEnabled();   // true if warn logging enabled
log.isErrorEnabled();  // true if error logging enabled
```

#### Static Level Checks

```javascript
var Logger = require('dw/system/Logger');

if (Logger.isDebugEnabled()) {
    Logger.debug('Debug message');
}
```

### Message Formatting

Messages support Java MessageFormat syntax:

```javascript
var Logger = require('dw/system/Logger');
var log = Logger.getLogger('order');

// Positional parameters
log.info('Order {0} has {1} items totaling {2}', orderNo, itemCount, total);

// Same parameter multiple times
log.info('Product {0}: {0} is out of stock', productId);

// Complex objects (use JSON.stringify for objects)
log.debug('Request: {0}', JSON.stringify(requestData));
```

### Nested Diagnostic Context (NDC)

NDC helps trace related log messages across a request:

```javascript
var Logger = require('dw/system/Logger');
var Log = require('dw/system/Log');

var log = Logger.getLogger('checkout');
var ndc = Log.getNDC();

function processOrder(orderId) {
    // Push context onto the stack
    ndc.push('Order:' + orderId);

    try {
        log.info('Starting order processing');
        processPayment();
        processShipping();
        log.info('Order processing complete');
    } finally {
        // Always pop context when leaving scope
        ndc.pop();
    }
}

function processPayment() {
    ndc.push('Payment');
    try {
        log.info('Processing payment'); // NDC shows: Order:123 Payment
    } finally {
        ndc.pop();
    }
}
```

#### NDC Methods

| Method | Description |
|--------|-------------|
| `push(message)` | Add context to the stack |
| `pop()` | Remove and return top context |
| `peek()` | View top context without removing |
| `remove()` | Clear entire context |

### Best Practices

#### 1. Use Categories

```javascript
// Good: Organized by functional area
var log = Logger.getLogger('payment.processor');
var log = Logger.getLogger('inventory.sync');
var log = Logger.getLogger('order.export');

// Avoid: No category
Logger.info('Something happened');
```

#### 2. Check Level Before Expensive Operations

```javascript
// Good: Check before building expensive string
if (log.isDebugEnabled()) {
    log.debug('Full response: {0}', JSON.stringify(largeObject));
}

// Avoid: Always building expensive strings
log.debug('Full response: {0}', JSON.stringify(largeObject));
```

#### 3. Include Context in Messages

```javascript
// Good: Includes relevant context
log.error('Payment failed for order {0}, customer {1}: {2}',
    orderNo, customerId, errorMessage);

// Avoid: Missing context
log.error('Payment failed');
```

#### 4. Use Appropriate Levels

```javascript
// debug: Detailed technical information
log.debug('SQL query: {0}', query);
log.debug('API request body: {0}', JSON.stringify(body));

// info: Notable events
log.info('Order {0} placed successfully', orderNo);
log.info('Customer {0} logged in', customerId);

// warn: Potential issues
log.warn('Inventory low for product {0}: {1} remaining', productId, qty);
log.warn('Slow API response: {0}ms', responseTime);

// error: Failures that need attention
log.error('Payment declined for order {0}: {1}', orderNo, reason);
log.error('Failed to connect to service {0}: {1}', serviceName, error);

// fatal: Critical system failures
log.fatal('Database connection lost');
log.fatal('Critical configuration missing: {0}', configKey);
```

#### 5. Use Custom Log Files for Integration

```javascript
// Dedicated files for each integration
var erpLog = Logger.getLogger('erp-sync', 'erp');
var omsLog = Logger.getLogger('oms-export', 'oms');
var crmLog = Logger.getLogger('crm-sync', 'crm');
```

#### 6. Don't Log Sensitive Data

```javascript
// Good: Mask sensitive data
log.info('Payment processed for card ending in {0}', cardNumber.slice(-4));

// Avoid: Logging sensitive data
log.info('Payment processed for card {0}', cardNumber);
```

### Business Manager Configuration

Configure custom logging in **Administration > Operations > Custom Log Settings**:

| Setting | Description |
|---------|-------------|
| **Log to File** | Enable file logging for each level |
| **Receive Email** | Email addresses for fatal notifications |
| **Root Category** | Default settings for all categories |
| **Custom Categories** | Override settings per category |

#### Configuring Categories

1. Go to **Custom Log Settings**
2. Click **Add Category**
3. Enter category name (e.g., `checkout`, `payment`)
4. Set log levels to enable

### Log Output Format

Log entries follow this format:
```
[timestamp] [level] [category] message
```

Example:
```
[2024-01-15 10:30:45.123 GMT] [INFO] [checkout] Order ORD123 placed successfully
```

### Detailed Reference

- [Log Files](references/LOG-FILES.md) - Log file types, locations, and retention

### Script API Classes

| Class | Description |
|-------|-------------|
| `dw.system.Logger` | Static logging methods and logger factory |
| `dw.system.Log` | Logger instance with category support |
| `dw.system.LogNDC` | Nested Diagnostic Context for tracing |

### Reference: LOG-FILES.md

#### Log Files Reference

Complete reference for B2C Commerce log file types, locations, and management.

##### Log File Types

###### Custom Log Files

Custom log files are generated by script logging:

| Log File | Trigger | Default State |
|----------|---------|---------------|
| `customdebug` | `Logger.debug()` or `log.debug()` | Disabled |
| `custominfo` | `Logger.info()` or `log.info()` | Disabled |
| `customwarn` | `Logger.warn()` or `log.warn()` | Always enabled |
| `customerror` | `Logger.error()` or `log.error()` | Always enabled |
| `customfatal` | `log.fatal()` | Always enabled |

###### System Log Files

System log files are generated by the platform:

| Log File | Description |
|----------|-------------|
| `error` | System errors in scripts, templates, and platform |
| `warn` | Lock status, slot warnings, servlet warnings |
| `info` | System information from scripts and platform |
| `debug` | Debug information (only when debug flag enabled) |
| `fatal` | Critical system failures |
| `api` | API problems and violations |
| `deprecation` | Usage of deprecated APIs |
| `jobs` | Job status information |
| `staging` | Replication process information |
| `quota` | Quota warnings and limits |
| `sql` | SQL and replication issues |
| `syslog` | API processing, staging, import/export info |
| `sysevent` | Appserver registration, cartridge logs |
| `analytics` | Analytics activity and errors |
| `performance` | Internal performance data |
| `console` | Internal console entries |
| `migration` | Internal migration data |
| `dbinit-sql` | SQL used during database initialization |

###### Custom Named Log Files

Files created with `Logger.getLogger(prefix, category)`:

```
custom-<prefix>-<hostname>-appserver-<date>.log
```

Example: `custom-orderexport-blade0-1-appserver-20240115.log`

##### Log File Locations

###### WebDAV Access

**Logs Directory:**
```
https://<instance>.demandware.net/on/demandware.servlet/webdav/Sites/Logs
```

**Security Logs:**
```
https://<instance>.demandware.net/on/demandware.servlet/webdav/Sites/Securitylogs
```

**Import/Export Logs:**
```
https://<instance>.demandware.net/on/demandware.servlet/webdav/Sites/Impex/log
```

###### Business Manager Access

1. **Administration > Site Development > Development Setup**
2. Scroll to **WebDAV Access** section
3. Click **Log files** link

##### Log Retention

| Environment | Retention | Notes |
|-------------|-----------|-------|
| Production | 30 days | Auto-deleted after retention |
| Staging | 30 days | Auto-deleted after retention |
| Development | Not defined | Manual cleanup recommended |
| Sandbox | Not defined | Manual cleanup recommended |

**Security logs** are retained for 90 days.

###### Archive Process

- After 3 days, logs move to `log_archive` directory
- Archived logs are compressed to gzip format
- Download logs locally for longer retention

##### Storage Limits

###### Custom Log Size Limits

| Limit | Value |
|-------|-------|
| Per log level per day | 10 MB |
| Per application server | Per log type |
| Custom named log files | Same 10 MB limit |

When the limit is reached:
```
+++++++++++ Maximum log file size per day reached, logging suspended. +++++++++++
```

Logging resumes at 00:00 GMT the next day.

###### File Count Limits

- Maximum 100,000 files per folder
- Excess files deleted starting with oldest
- Applies per folder, not across subfolders

###### Custom Log File Quota

- Maximum 200 different log file prefixes per day
- Per application server
- Hard limit (throws exception when exceeded)

##### Log Entry Format

###### Standard Format

```
[timestamp GMT] [level] [category] message
```

Example:
```
[2024-01-15 10:30:45.123 GMT] [INFO] [checkout] Order ORD123 submitted
```

###### With NDC

```
[timestamp GMT] [level] [category] [ndc-context] message
```

Example:
```
[2024-01-15 10:30:45.123 GMT] [INFO] [checkout] [Order:123 Payment] Processing payment
```

##### Redundancy Tracking

Error and Warning messages are tracked for redundancy:

- Messages appearing > 10 times in 3 minutes are suppressed
- Suppression lasts 3 minutes
- Suppression message:

```
The following message was generated more than 10 times within the last 180 seconds.
It will be suppressed for 180 seconds:
<original message>
```

##### Quota Log Format

Quota logs show when thresholds or limits are exceeded:

```
[timestamp] [thread-info] Quota quota.name (enforced, warn threshold, limit):
warn threshold exceeded N time(s), max actual was X, current location: details
```

Example:
```
[2024-01-15 13:00:22.577 GMT] [RequestHandlerServlet|14320460|Sites-MySite|Product-Show|...]
Quota api.jsStringLength (enforced, warn 600000, limit 1000000): warn threshold exceeded 1 time(s),
max actual was 600010, current location: request/site Sites-MySite/top pipeline Product-Show/
interaction node/template default.CustomDisplay
```

##### Security Log Format

```
[timestamp GMT][dw-sec] (User: 'username' (realm), IP: x.x.x.x [ACTION] : details)
```

Example:
```
[2024-01-15 02:23:19.139 GMT][dw-sec] (User: 'admin' (Sites), IP: 192.168.1.1 [LOGIN] : logged in.)
```

Actions logged:
- LOGIN
- LOGOUT
- LOGIN_FAILED
- PASSWORD_CHANGED
- Re-login (session timeout)

##### Import/Export Logs

Located in `/Impex/log/`:

| Log Type | Description |
|----------|-------------|
| Catalog | Catalog import/export logs |
| Customer | Customer batch processing logs |
| Inventory | Inventory import logs |
| Price Book | Price book import/validation logs |
| Promotion | Promotion validation logs |
| Metadata | Metadata validation logs |
| Coupon | Coupon validation logs |

Example path:
```
/Impex/log/Batch-Customer-20240115192425062.log
```

##### Accessing Logs Programmatically

###### Via WebDAV Client

Configure your WebDAV client with:
- URL: `https://<instance>/on/demandware.servlet/webdav/Sites/Logs`
- User: Business Manager username
- Password: Business Manager password

###### Via B2C CLI

```bash
# Download logs via WebDAV
b2c webdav pull /Logs --dest ./local-logs

# Download specific log
b2c webdav pull /Logs/customerror-blade0-1-20240115.log
```

##### Debug Logging on Production

Debug logging is **never enabled on production instances**.

On non-production instances:
- Debug logs are "in-memory" by default
- Enables "Show Request Log" feature
- Does not generate log files unless explicitly enabled

##### Best Practices

###### 1. Monitor Log File Sizes

Check log sizes regularly to avoid hitting limits:
- 10 MB per custom log type per day
- Monitor during high-traffic periods

###### 2. Use Custom Named Logs for Integrations

```javascript
// Separate files for each integration
var erpLog = Logger.getLogger('erp-sync', 'erp');
var paymentLog = Logger.getLogger('payment-gateway', 'payment');
```

###### 3. Clean Up Old Logs

- Delete unnecessary logs promptly
- Don't exceed 100,000 files per folder
- Download and archive important logs locally

###### 4. Configure Categories in Business Manager

1. Go to **Administration > Operations > Custom Log Settings**
2. Add categories for your code areas
3. Enable appropriate log levels per category
4. Set up fatal email notifications

###### 5. Use Appropriate Log Levels

| Level | Use For |
|-------|---------|
| debug | Development debugging only |
| info | Notable events, job progress |
| warn | Recoverable issues, slow operations |
| error | Failures requiring attention |
| fatal | Critical failures, email notification |

---


<a id="b2c-metadata"></a>
## b2c-metadata

**When to use:** Work with B2C Commerce site metadata XML for custom attributes and object types. Use when defining custom attributes on products/orders/customers, creating custom object types, or setting site preferences via XML import. Covers site import, site archive, system object extensions, system-objecttype-extensions.xml, custom-objecttype-definitions.xml, Business Manager attributes, BM configuration, and data model definitions.

## Metadata Skill

This skill guides you through working with site metadata XML for Salesforce B2C Commerce, including custom attributes, custom objects, and site preferences.

### Overview

Metadata defines the structure of your B2C Commerce data:

| Metadata Type | Purpose |
|---------------|---------|
| **System Object Extensions** | Add custom attributes to Products, Orders, Customers, etc. |
| **Custom Objects** | Define entirely new data types |
| **Site Preferences** | Site-specific configuration values |

### Site Archive Structure

Metadata is organized in site archives:

```
/site-archive
    /meta
        system-objecttype-extensions.xml    # Custom attributes on system objects
        custom-objecttype-definitions.xml   # Custom object definitions
    /sites
        /MySite
            preferences.xml                 # Site preferences
```

### System Object Extensions

Add custom attributes to existing system objects.

#### Basic Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Product">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="myCustomAttribute">
                <display-name xml:lang="x-default">My Custom Attribute</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
                <externally-managed-flag>false</externally-managed-flag>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="MyCustomGroup">
                <display-name xml:lang="x-default">My Custom Group</display-name>
                <attribute attribute-id="myCustomAttribute"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

#### Common System Objects

| Object Type | Use Case |
|-------------|----------|
| `Product` | Product attributes |
| `Order` | Order metadata |
| `Profile` | Customer profile data |
| `Basket` | Cart data |
| `SitePreferences` | Site configuration |
| `Category` | Category attributes |
| `Content` | Content asset attributes |

#### Attribute Types

| Type | Description | Example |
|------|-------------|---------|
| `string` | Text (max 4000 chars) | SKU, descriptions |
| `text` | Long text (unlimited) | Rich content |
| `int` | Integer | Quantity, rank |
| `double` | Decimal | Percentage, weight |
| `boolean` | true/false | Flags |
| `date` | Date only | Birth date |
| `datetime` | Date and time | Timestamps |
| `email` | Email address | Contact email |
| `password` | Encrypted | API keys |
| `html` | HTML content | Rich text |
| `enum-of-string` | Single select | Status |
| `enum-of-int` | Numeric enum | Priority level |
| `set-of-string` | Multi-select | Tags |
| `set-of-int` | Numeric multi-select | Categories |
| `image` | Image reference | Thumbnails |

#### Enum Value Definitions

Enum types (`enum-of-string`, `enum-of-int`, `set-of-string`, `set-of-int`) require `value-definitions` with **value/display pairs**:

```xml
<attribute-definition attribute-id="warrantyType">
    <display-name xml:lang="x-default">Warranty Type</display-name>
    <type>enum-of-string</type>
    <mandatory-flag>false</mandatory-flag>
    <value-definitions>
        <value-definition>
            <value>none</value>
            <display xml:lang="x-default">No Warranty</display>
        </value-definition>
        <value-definition>
            <value>limited</value>
            <display xml:lang="x-default">Limited Warranty</display>
        </value-definition>
        <value-definition>
            <value>full</value>
            <display xml:lang="x-default">Full Warranty</display>
        </value-definition>
    </value-definitions>
</attribute-definition>
```

| Element | Purpose |
|---------|---------|
| `<value>` | The stored/API value (use lowercase, no spaces) |
| `<display>` | Human-readable label shown in Business Manager |

### Product Custom Attribute Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Product">
        <custom-attribute-definitions>
            <!-- Simple string attribute -->
            <attribute-definition attribute-id="vendorSKU">
                <display-name xml:lang="x-default">Vendor SKU</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
                <externally-managed-flag>true</externally-managed-flag>
            </attribute-definition>

            <!-- Enum (dropdown) attribute -->
            <attribute-definition attribute-id="productCondition">
                <display-name xml:lang="x-default">Product Condition</display-name>
                <type>enum-of-string</type>
                <mandatory-flag>false</mandatory-flag>
                <value-definitions>
                    <value-definition>
                        <value>new</value>
                        <display xml:lang="x-default">New</display>
                    </value-definition>
                    <value-definition>
                        <value>refurbished</value>
                        <display xml:lang="x-default">Refurbished</display>
                    </value-definition>
                    <value-definition>
                        <value>used</value>
                        <display xml:lang="x-default">Used</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>

            <!-- Boolean attribute -->
            <attribute-definition attribute-id="isHazardous">
                <display-name xml:lang="x-default">Hazardous Material</display-name>
                <type>boolean</type>
                <mandatory-flag>false</mandatory-flag>
                <default-value>false</default-value>
            </attribute-definition>

            <!-- Multi-select attribute -->
            <attribute-definition attribute-id="productFeatures">
                <display-name xml:lang="x-default">Product Features</display-name>
                <type>set-of-string</type>
                <mandatory-flag>false</mandatory-flag>
                <value-definitions>
                    <value-definition>
                        <value>waterproof</value>
                        <display xml:lang="x-default">Waterproof</display>
                    </value-definition>
                    <value-definition>
                        <value>recyclable</value>
                        <display xml:lang="x-default">Recyclable</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>
        </custom-attribute-definitions>

        <group-definitions>
            <attribute-group group-id="CustomProductInfo">
                <display-name xml:lang="x-default">Custom Product Information</display-name>
                <attribute attribute-id="vendorSKU"/>
                <attribute attribute-id="productCondition"/>
                <attribute attribute-id="isHazardous"/>
                <attribute attribute-id="productFeatures"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

### Custom Object Definitions

Create entirely new data types.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <custom-type type-id="StoreLocations">
        <display-name xml:lang="x-default">Store Locations</display-name>
        <description xml:lang="x-default">Physical store information</description>
        <staging-mode>source-to-target</staging-mode>
        <storage-scope>site</storage-scope>
        <key-definition attribute-id="storeId">
            <display-name xml:lang="x-default">Store ID</display-name>
            <type>string</type>
            <min-length>1</min-length>
        </key-definition>
        <attribute-definitions>
            <attribute-definition attribute-id="storeName">
                <display-name xml:lang="x-default">Store Name</display-name>
                <type>string</type>
                <mandatory-flag>true</mandatory-flag>
            </attribute-definition>
            <attribute-definition attribute-id="latitude">
                <display-name xml:lang="x-default">Latitude</display-name>
                <type>double</type>
            </attribute-definition>
            <attribute-definition attribute-id="longitude">
                <display-name xml:lang="x-default">Longitude</display-name>
                <type>double</type>
            </attribute-definition>
            <attribute-definition attribute-id="phone">
                <display-name xml:lang="x-default">Phone</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="isActive">
                <display-name xml:lang="x-default">Active</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
        </attribute-definitions>
        <group-definitions>
            <attribute-group group-id="StoreInfo">
                <display-name xml:lang="x-default">Store Information</display-name>
                <attribute attribute-id="storeId" system="true"/>
                <attribute attribute-id="storeName"/>
                <attribute attribute-id="latitude"/>
                <attribute attribute-id="longitude"/>
                <attribute attribute-id="phone"/>
                <attribute attribute-id="isActive"/>
            </attribute-group>
        </group-definitions>
    </custom-type>
</metadata>
```

### Site Preferences

Site-specific configuration via custom attributes on SitePreferences.

#### Metadata (system-objecttype-extensions.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="enableFeatureX">
                <display-name xml:lang="x-default">Enable Feature X</display-name>
                <type>boolean</type>
                <default-value>false</default-value>
            </attribute-definition>
            <attribute-definition attribute-id="apiEndpoint">
                <display-name xml:lang="x-default">API Endpoint</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="maxItemsPerPage">
                <display-name xml:lang="x-default">Max Items Per Page</display-name>
                <type>int</type>
                <default-value>20</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="CustomSettings">
                <display-name xml:lang="x-default">Custom Settings</display-name>
                <attribute attribute-id="enableFeatureX"/>
                <attribute attribute-id="apiEndpoint"/>
                <attribute attribute-id="maxItemsPerPage"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

#### Values (sites/MySite/preferences.xml)

Preferences can be set per instance type (development, staging, production) or for all instances:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<preferences xmlns="http://www.demandware.com/xml/impex/preferences/2007-03-31">
    <custom-preferences>
        <all-instances>
            <!-- Values that apply to all instance types -->
            <preference preference-id="maxItemsPerPage">25</preference>
        </all-instances>
        <development>
            <!-- Development-specific values -->
            <preference preference-id="enableFeatureX">true</preference>
            <preference preference-id="apiEndpoint">https://dev-api.example.com/v1</preference>
        </development>
        <staging>
            <preference preference-id="enableFeatureX">true</preference>
            <preference preference-id="apiEndpoint">https://staging-api.example.com/v1</preference>
        </staging>
        <production>
            <preference preference-id="enableFeatureX">false</preference>
            <preference preference-id="apiEndpoint">https://api.example.com/v1</preference>
        </production>
    </custom-preferences>
</preferences>
```

#### Access in Code

```javascript
var Site = require('dw/system/Site');

var enableFeatureX = Site.current.getCustomPreferenceValue('enableFeatureX');
var apiEndpoint = Site.current.getCustomPreferenceValue('apiEndpoint');
var maxItems = Site.current.getCustomPreferenceValue('maxItemsPerPage');
```

### Attribute Definition Options

```xml
<attribute-definition attribute-id="myAttribute">
    <display-name xml:lang="x-default">Display Name</display-name>
    <description xml:lang="x-default">Description for BM tooltip</description>
    <type>string</type>
    <localizable-flag>false</localizable-flag>
    <mandatory-flag>false</mandatory-flag>
    <externally-managed-flag>false</externally-managed-flag>
    <visible-flag>true</visible-flag>
    <site-specific-flag>false</site-specific-flag>
    <order-required-flag>false</order-required-flag>
    <searchable-flag>false</searchable-flag>
    <min-length>0</min-length>
    <max-length>256</max-length>
    <default-value>default</default-value>
    <select-mode>none</select-mode>
    <unit>kg</unit>
</attribute-definition>
```

| Flag | Purpose |
|------|---------|
| `localizable-flag` | Can have different values per locale |
| `mandatory-flag` | Required in BM |
| `externally-managed-flag` | Read-only in BM |
| `visible-flag` | Shown in BM |
| `site-specific-flag` | Different value per site |
| `order-required-flag` | Required for order export |
| `searchable-flag` | Indexed for search |

### Best Practices

1. **Use attribute groups** to organize in Business Manager
2. **Prefix custom attributes** with organization name (e.g., `acme_myAttribute`)
3. **Set externally-managed** for data imported from external systems
4. **Use enums over strings** for controlled vocabularies
5. **Document with descriptions** - they appear as tooltips

### Detailed Reference

- [System Objects Reference](references/SYSTEM-OBJECTS.md) - All system object types
- [XML Examples](references/XML-EXAMPLES.md) - Complete import/export examples

### Reference: SYSTEM-OBJECTS.md

#### System Objects Reference

All extensible system object types in B2C Commerce.

##### Product-Related

###### Product

Product master, variant, and standard products.

```xml
<type-extension type-id="Product">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="vendorSKU">
            <display-name xml:lang="x-default">Vendor SKU</display-name>
            <type>string</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

**Common custom attributes:** vendor IDs, compliance flags, external system references

###### ProductLineItem

Line items in baskets and orders.

```xml
<type-extension type-id="ProductLineItem">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="giftMessage">
            <display-name xml:lang="x-default">Gift Message</display-name>
            <type>text</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### Category

Catalog categories.

```xml
<type-extension type-id="Category">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="bannerImage">
            <display-name xml:lang="x-default">Banner Image</display-name>
            <type>image</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Order-Related

###### Order

Placed orders.

```xml
<type-extension type-id="Order">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="externalOrderId">
            <display-name xml:lang="x-default">External Order ID</display-name>
            <type>string</type>
            <externally-managed-flag>true</externally-managed-flag>
        </attribute-definition>
        <attribute-definition attribute-id="exportStatus">
            <display-name xml:lang="x-default">Export Status</display-name>
            <type>enum-of-string</type>
            <value-definitions>
                <value-definition>
                    <value>pending</value>
                    <display xml:lang="x-default">Pending</display>
                </value-definition>
                <value-definition>
                    <value>exported</value>
                    <display xml:lang="x-default">Exported</display>
                </value-definition>
            </value-definitions>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### Basket

Active shopping carts.

```xml
<type-extension type-id="Basket">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="quoteId">
            <display-name xml:lang="x-default">Quote ID</display-name>
            <type>string</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### Shipment

Order/basket shipments.

```xml
<type-extension type-id="Shipment">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="deliveryInstructions">
            <display-name xml:lang="x-default">Delivery Instructions</display-name>
            <type>text</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Customer-Related

###### Profile

Customer profiles (registered customers).

```xml
<type-extension type-id="Profile">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="loyaltyNumber">
            <display-name xml:lang="x-default">Loyalty Number</display-name>
            <type>string</type>
        </attribute-definition>
        <attribute-definition attribute-id="preferredContactMethod">
            <display-name xml:lang="x-default">Preferred Contact Method</display-name>
            <type>enum-of-string</type>
            <value-definitions>
                <value-definition>
                    <value>email</value>
                    <display xml:lang="x-default">Email</display>
                </value-definition>
                <value-definition>
                    <value>phone</value>
                    <display xml:lang="x-default">Phone</display>
                </value-definition>
                <value-definition>
                    <value>sms</value>
                    <display xml:lang="x-default">SMS</display>
                </value-definition>
            </value-definitions>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### CustomerAddress

Customer address book entries.

```xml
<type-extension type-id="CustomerAddress">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="addressType">
            <display-name xml:lang="x-default">Address Type</display-name>
            <type>enum-of-string</type>
            <value-definitions>
                <value-definition>
                    <value>residential</value>
                    <display xml:lang="x-default">Residential</display>
                </value-definition>
                <value-definition>
                    <value>commercial</value>
                    <display xml:lang="x-default">Commercial</display>
                </value-definition>
            </value-definitions>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Content-Related

###### Content

Content assets.

```xml
<type-extension type-id="Content">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="author">
            <display-name xml:lang="x-default">Author</display-name>
            <type>string</type>
        </attribute-definition>
        <attribute-definition attribute-id="publishDate">
            <display-name xml:lang="x-default">Publish Date</display-name>
            <type>datetime</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### Folder

Content folders.

```xml
<type-extension type-id="Folder">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="folderIcon">
            <display-name xml:lang="x-default">Folder Icon</display-name>
            <type>image</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Site Configuration

###### SitePreferences

Site-level configuration.

```xml
<type-extension type-id="SitePreferences">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="enableFeature">
            <display-name xml:lang="x-default">Enable Feature</display-name>
            <type>boolean</type>
            <default-value>false</default-value>
        </attribute-definition>
        <attribute-definition attribute-id="apiKey">
            <display-name xml:lang="x-default">API Key</display-name>
            <type>password</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### OrganizationPreferences

Organization-wide configuration.

```xml
<type-extension type-id="OrganizationPreferences">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="orgWideApiKey">
            <display-name xml:lang="x-default">Organization API Key</display-name>
            <type>password</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Other Objects

###### Store

Physical store information.

```xml
<type-extension type-id="Store">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="googlePlaceId">
            <display-name xml:lang="x-default">Google Place ID</display-name>
            <type>string</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### GiftCertificate

Gift certificates.

```xml
<type-extension type-id="GiftCertificate">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="purchasedBy">
            <display-name xml:lang="x-default">Purchased By</display-name>
            <type>string</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

###### SourceCodeGroup

Source code groups for campaigns.

```xml
<type-extension type-id="SourceCodeGroup">
    <custom-attribute-definitions>
        <attribute-definition attribute-id="campaignType">
            <display-name xml:lang="x-default">Campaign Type</display-name>
            <type>string</type>
        </attribute-definition>
    </custom-attribute-definitions>
</type-extension>
```

##### Complete List of System Objects

| Object Type | Description |
|-------------|-------------|
| `Basket` | Shopping cart |
| `Category` | Catalog category |
| `Content` | Content asset |
| `Coupon` | Coupon codes |
| `CustomerAddress` | Address book entry |
| `CustomerGroup` | Customer segments |
| `Folder` | Content folder |
| `GiftCertificate` | Gift certificate |
| `Order` | Placed order |
| `OrderAddress` | Order shipping/billing address |
| `OrganizationPreferences` | Org-level config |
| `PaymentInstrument` | Payment method |
| `PaymentTransaction` | Payment transaction |
| `Product` | Catalog product |
| `ProductLineItem` | Cart/order line item |
| `Profile` | Customer profile |
| `Shipment` | Order shipment |
| `ShippingLineItem` | Shipping charge |
| `SitePreferences` | Site-level config |
| `SourceCodeGroup` | Campaign source code |
| `Store` | Physical store |

### Reference: XML-EXAMPLES.md

#### Metadata XML Examples

Complete examples for common metadata import/export scenarios.

##### XSD Schema Reference

For authoritative XML schema definitions, use the `b2c` CLI (if installed):

```bash
# View specific schemas
b2c docs schema metadata
b2c docs schema catalog
b2c docs schema library
b2c docs schema preferences

# List all available schemas
b2c docs schema --list
```

##### Site Archive Structure

```
/site-archive/
    /meta/
        system-objecttype-extensions.xml
        custom-objecttype-definitions.xml
    /sites/
        /RefArch/
            preferences.xml
    /catalogs/
        /storefront-catalog/
            catalog.xml
    /libraries/
        /RefArchSharedLibrary/
            library.xml
```

##### Adding Custom Attributes to Products

###### Metadata (meta/system-objecttype-extensions.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Product">
        <custom-attribute-definitions>
            <!-- String attribute -->
            <attribute-definition attribute-id="manufacturerPartNumber">
                <display-name xml:lang="x-default">Manufacturer Part Number</display-name>
                <description xml:lang="x-default">MPN from manufacturer</description>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
                <externally-managed-flag>true</externally-managed-flag>
                <min-length>0</min-length>
                <max-length>50</max-length>
            </attribute-definition>

            <!-- Enum attribute -->
            <attribute-definition attribute-id="warrantyType">
                <display-name xml:lang="x-default">Warranty Type</display-name>
                <type>enum-of-string</type>
                <mandatory-flag>false</mandatory-flag>
                <value-definitions>
                    <value-definition>
                        <value>none</value>
                        <display xml:lang="x-default">No Warranty</display>
                    </value-definition>
                    <value-definition default="true">
                        <value>standard</value>
                        <display xml:lang="x-default">Standard Warranty</display>
                    </value-definition>
                    <value-definition>
                        <value>extended</value>
                        <display xml:lang="x-default">Extended Warranty</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>

            <!-- Boolean attribute -->
            <attribute-definition attribute-id="requiresAssembly">
                <display-name xml:lang="x-default">Requires Assembly</display-name>
                <type>boolean</type>
                <mandatory-flag>false</mandatory-flag>
                <default-value>false</default-value>
            </attribute-definition>

            <!-- Double attribute -->
            <attribute-definition attribute-id="weight">
                <display-name xml:lang="x-default">Product Weight</display-name>
                <type>double</type>
                <mandatory-flag>false</mandatory-flag>
                <unit>kg</unit>
            </attribute-definition>

            <!-- Multi-select attribute -->
            <attribute-definition attribute-id="certifications">
                <display-name xml:lang="x-default">Certifications</display-name>
                <type>set-of-string</type>
                <mandatory-flag>false</mandatory-flag>
                <value-definitions>
                    <value-definition>
                        <value>energy-star</value>
                        <display xml:lang="x-default">Energy Star</display>
                    </value-definition>
                    <value-definition>
                        <value>ul-listed</value>
                        <display xml:lang="x-default">UL Listed</display>
                    </value-definition>
                    <value-definition>
                        <value>fda-approved</value>
                        <display xml:lang="x-default">FDA Approved</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>

            <!-- Localizable attribute -->
            <attribute-definition attribute-id="localDescription">
                <display-name xml:lang="x-default">Localized Description</display-name>
                <type>text</type>
                <localizable-flag>true</localizable-flag>
                <mandatory-flag>false</mandatory-flag>
            </attribute-definition>
        </custom-attribute-definitions>

        <group-definitions>
            <attribute-group group-id="ProductExtras">
                <display-name xml:lang="x-default">Product Extras</display-name>
                <attribute attribute-id="manufacturerPartNumber"/>
                <attribute attribute-id="warrantyType"/>
                <attribute attribute-id="requiresAssembly"/>
                <attribute attribute-id="weight"/>
                <attribute attribute-id="certifications"/>
                <attribute attribute-id="localDescription"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

##### Adding Custom Attributes to Orders

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="Order">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="erpOrderId">
                <display-name xml:lang="x-default">ERP Order ID</display-name>
                <type>string</type>
                <externally-managed-flag>true</externally-managed-flag>
            </attribute-definition>
            <attribute-definition attribute-id="syncStatus">
                <display-name xml:lang="x-default">Sync Status</display-name>
                <type>enum-of-string</type>
                <value-definitions>
                    <value-definition default="true">
                        <value>pending</value>
                        <display xml:lang="x-default">Pending</display>
                    </value-definition>
                    <value-definition>
                        <value>synced</value>
                        <display xml:lang="x-default">Synced</display>
                    </value-definition>
                    <value-definition>
                        <value>failed</value>
                        <display xml:lang="x-default">Failed</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>
            <attribute-definition attribute-id="syncDate">
                <display-name xml:lang="x-default">Last Sync Date</display-name>
                <type>datetime</type>
                <externally-managed-flag>true</externally-managed-flag>
            </attribute-definition>
        </custom-attribute-definitions>

        <group-definitions>
            <attribute-group group-id="ERPIntegration">
                <display-name xml:lang="x-default">ERP Integration</display-name>
                <attribute attribute-id="erpOrderId"/>
                <attribute attribute-id="syncStatus"/>
                <attribute attribute-id="syncDate"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

##### Custom Object Definition

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <custom-type type-id="NewsletterSubscription">
        <display-name xml:lang="x-default">Newsletter Subscription</display-name>
        <description xml:lang="x-default">Email newsletter subscriptions</description>
        <staging-mode>source-to-target</staging-mode>
        <storage-scope>site</storage-scope>

        <key-definition attribute-id="email">
            <display-name xml:lang="x-default">Email Address</display-name>
            <type>string</type>
            <min-length>5</min-length>
            <max-length>256</max-length>
        </key-definition>

        <attribute-definitions>
            <attribute-definition attribute-id="firstName">
                <display-name xml:lang="x-default">First Name</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
            </attribute-definition>
            <attribute-definition attribute-id="lastName">
                <display-name xml:lang="x-default">Last Name</display-name>
                <type>string</type>
                <mandatory-flag>false</mandatory-flag>
            </attribute-definition>
            <attribute-definition attribute-id="subscriptionDate">
                <display-name xml:lang="x-default">Subscription Date</display-name>
                <type>datetime</type>
                <mandatory-flag>true</mandatory-flag>
            </attribute-definition>
            <attribute-definition attribute-id="isActive">
                <display-name xml:lang="x-default">Active</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
            <attribute-definition attribute-id="topics">
                <display-name xml:lang="x-default">Subscribed Topics</display-name>
                <type>set-of-string</type>
                <value-definitions>
                    <value-definition>
                        <value>promotions</value>
                        <display xml:lang="x-default">Promotions</display>
                    </value-definition>
                    <value-definition>
                        <value>new-arrivals</value>
                        <display xml:lang="x-default">New Arrivals</display>
                    </value-definition>
                    <value-definition>
                        <value>tips</value>
                        <display xml:lang="x-default">Tips & Tricks</display>
                    </value-definition>
                </value-definitions>
            </attribute-definition>
        </attribute-definitions>

        <group-definitions>
            <attribute-group group-id="SubscriptionInfo">
                <display-name xml:lang="x-default">Subscription Information</display-name>
                <attribute attribute-id="email" system="true"/>
                <attribute attribute-id="firstName"/>
                <attribute attribute-id="lastName"/>
                <attribute attribute-id="subscriptionDate"/>
                <attribute attribute-id="isActive"/>
                <attribute attribute-id="topics"/>
            </attribute-group>
        </group-definitions>
    </custom-type>
</metadata>
```

##### Site Preferences

###### Metadata

```xml
<?xml version="1.0" encoding="UTF-8"?>
<metadata xmlns="http://www.demandware.com/xml/impex/metadata/2006-10-31">
    <type-extension type-id="SitePreferences">
        <custom-attribute-definitions>
            <attribute-definition attribute-id="enableReviews">
                <display-name xml:lang="x-default">Enable Product Reviews</display-name>
                <type>boolean</type>
                <default-value>true</default-value>
            </attribute-definition>
            <attribute-definition attribute-id="reviewServiceUrl">
                <display-name xml:lang="x-default">Review Service URL</display-name>
                <type>string</type>
            </attribute-definition>
            <attribute-definition attribute-id="reviewServiceApiKey">
                <display-name xml:lang="x-default">Review Service API Key</display-name>
                <type>password</type>
            </attribute-definition>
            <attribute-definition attribute-id="maxReviewsPerProduct">
                <display-name xml:lang="x-default">Max Reviews Per Product</display-name>
                <type>int</type>
                <default-value>10</default-value>
            </attribute-definition>
        </custom-attribute-definitions>
        <group-definitions>
            <attribute-group group-id="ReviewSettings">
                <display-name xml:lang="x-default">Review Settings</display-name>
                <attribute attribute-id="enableReviews"/>
                <attribute attribute-id="reviewServiceUrl"/>
                <attribute attribute-id="reviewServiceApiKey"/>
                <attribute attribute-id="maxReviewsPerProduct"/>
            </attribute-group>
        </group-definitions>
    </type-extension>
</metadata>
```

###### Preference Values (sites/RefArch/preferences.xml)

Preferences can be set per instance type or for all instances:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<preferences xmlns="http://www.demandware.com/xml/impex/preferences/2007-03-31">
    <custom-preferences>
        <all-instances>
            <preference preference-id="maxReviewsPerProduct">20</preference>
        </all-instances>
        <development>
            <preference preference-id="enableReviews">true</preference>
            <preference preference-id="reviewServiceUrl">https://dev-reviews.example.com/api</preference>
        </development>
        <production>
            <preference preference-id="enableReviews">true</preference>
            <preference preference-id="reviewServiceUrl">https://reviews.example.com/api</preference>
        </production>
    </custom-preferences>
</preferences>
```

##### Product Data with Custom Attributes

```xml
<?xml version="1.0" encoding="UTF-8"?>
<catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="storefront-catalog">
    <product product-id="SKU123">
        <display-name xml:lang="x-default">Example Product</display-name>
        <short-description xml:lang="x-default">Short description</short-description>
        <online-flag>true</online-flag>
        <custom-attributes>
            <custom-attribute attribute-id="manufacturerPartNumber">MPN-12345</custom-attribute>
            <custom-attribute attribute-id="warrantyType">extended</custom-attribute>
            <custom-attribute attribute-id="requiresAssembly">true</custom-attribute>
            <custom-attribute attribute-id="weight">2.5</custom-attribute>
            <custom-attribute attribute-id="certifications">energy-star</custom-attribute>
            <custom-attribute attribute-id="certifications">ul-listed</custom-attribute>
            <custom-attribute attribute-id="localDescription" xml:lang="en_US">US Description</custom-attribute>
            <custom-attribute attribute-id="localDescription" xml:lang="fr_FR">Description en Français</custom-attribute>
        </custom-attributes>
    </product>
</catalog>
```

##### Custom Object Data

```xml
<?xml version="1.0" encoding="UTF-8"?>
<custom-objects xmlns="http://www.demandware.com/xml/impex/customobject/2006-10-31">
    <custom-object type-id="NewsletterSubscription" object-id="user@example.com">
        <object-attribute attribute-id="firstName">John</object-attribute>
        <object-attribute attribute-id="lastName">Doe</object-attribute>
        <object-attribute attribute-id="subscriptionDate">2024-01-15T10:30:00.000Z</object-attribute>
        <object-attribute attribute-id="isActive">true</object-attribute>
        <object-attribute attribute-id="topics">
            <value>promotions</value>
            <value>new-arrivals</value>
        </object-attribute>
    </custom-object>
</custom-objects>
```

---


<a id="b2c-ordering"></a>
## b2c-ordering

**When to use:** Work with orders using OrderMgr API in B2C Commerce. Use when creating orders, managing order status, handling order failures, or implementing checkout flows. Covers order lifecycle, status transitions, async order processing, and order queries.

## B2C Ordering

The OrderMgr API provides order creation, status management, and querying. Understanding the order lifecycle is essential for checkout implementation and order processing.

### Order Lifecycle

Orders progress through these statuses:

```
Basket → CREATED → NEW → (COMPLETED or CANCELLED or FAILED)
```

| Status | Description | Can Transition To |
|--------|-------------|-------------------|
| `CREATED` | Order created, not yet placed | `NEW`, `FAILED` |
| `NEW` | Order placed, awaiting fulfillment | `OPEN`, `COMPLETED`, `CANCELLED`, `FAILED` |
| `OPEN` | Order in processing | `COMPLETED`, `CANCELLED` |
| `COMPLETED` | Order fulfilled | - |
| `CANCELLED` | Order cancelled | `NEW` (via `undoCancel`) |
| `FAILED` | Order failed (payment, validation) | - (cannot be reopened) |

**Important:** Once an order reaches `FAILED` status, it cannot be reopened or cancelled. Use `failOrder(order, true)` to reopen the basket for retry instead.

### Creating Orders

#### Standard Flow (Synchronous)

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Status = require('dw/system/Status');

function createOrder(basket) {
    var order;

    Transaction.wrap(function() {
        // Create order from basket (status: CREATED)
        order = OrderMgr.createOrder(basket);
    });

    if (!order) {
        return { error: true, message: 'Order creation failed' };
    }

    // Authorize payment
    var paymentResult = authorizePayment(order);

    if (!paymentResult.success) {
        Transaction.wrap(function() {
            OrderMgr.failOrder(order, true); // Reopen basket
        });
        return { error: true, message: 'Payment failed' };
    }

    // Place the order (status: CREATED → NEW)
    var placeResult;
    Transaction.wrap(function() {
        placeResult = OrderMgr.placeOrder(order);
    });

    if (placeResult.error) {
        return { error: true, message: 'Order placement failed' };
    }

    // Set confirmation status
    Transaction.wrap(function() {
        order.setConfirmationStatus(order.CONFIRMATION_STATUS_CONFIRMED);
    });

    return { error: false, order: order };
}
```

#### Async Flow (SCAPI Pattern)

For SCAPI/headless, create the order before payment authorization:

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

// Step 1: Create order (before payment)
function createOrderAsync(basket, orderNo) {
    var order;

    Transaction.wrap(function() {
        // Create with specific order number (for idempotency)
        order = OrderMgr.createOrder(basket, orderNo);
    });

    return order;
}

// Step 2: After payment success, place the order
function placeOrderAfterPayment(order) {
    Transaction.wrap(function() {
        OrderMgr.placeOrder(order);
        order.setConfirmationStatus(order.CONFIRMATION_STATUS_CONFIRMED);
        order.setExportStatus(order.EXPORT_STATUS_READY);
    });
}

// Step 2 (alt): Payment failed, fail the order
function failOrderAfterPayment(order) {
    Transaction.wrap(function() {
        OrderMgr.failOrder(order, false); // Don't reopen basket
    });
}
```

### OrderMgr API Reference

#### Order Creation

| Method | Description |
|--------|-------------|
| `createOrder(basket)` | Create order with auto-generated number |
| `createOrder(basket, orderNo)` | Create order with specific number |
| `createOrderNo()` | Generate next order number |
| `createOrderSequenceNo()` | Get next sequence number (for custom formatting) |

#### Order Status

| Method | Description |
|--------|-------------|
| `placeOrder(order)` | Place order (CREATED → NEW) |
| `failOrder(order, reopenBasket)` | Fail order (set to FAILED status) |
| `cancelOrder(order)` | Cancel order (set to CANCELLED status) |
| `undoCancelOrder(order)` | Revert cancelled order to NEW |

**Note:** There is no `undoFailOrder()` method. Failed orders cannot be reopened. Use `failOrder(order, true)` to reopen the basket for retry.

#### Order Queries

| Method | Description |
|--------|-------------|
| `getOrder(orderNo)` | Get order by number |
| `searchOrder(query, ...args)` | Search for single order |
| `searchOrders(query, sortString, ...args)` | Search for multiple orders |
| `queryOrder(query, ...args)` | Query single order |
| `queryOrders(query, sortString, ...args)` | Query multiple orders |

### Querying Orders

#### Get Order by Number

```javascript
var OrderMgr = require('dw/order/OrderMgr');

var order = OrderMgr.getOrder('00001234');

if (order) {
    var status = order.status.value;
    var total = order.totalGrossPrice;
}
```

#### Search Orders

```javascript
var OrderMgr = require('dw/order/OrderMgr');

// Search by customer email
var orders = OrderMgr.searchOrders(
    'customerEmail = {0} AND status != {1}',
    'creationDate desc',
    'customer@example.com',
    dw.order.Order.ORDER_STATUS_FAILED
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process order
}
orders.close();
```

#### Query by Date Range

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Calendar = require('dw/util/Calendar');

var startDate = new Calendar();
startDate.add(Calendar.DAY_OF_YEAR, -7);

var orders = OrderMgr.searchOrders(
    'creationDate >= {0} AND status = {1}',
    'creationDate desc',
    startDate.time,
    dw.order.Order.ORDER_STATUS_NEW
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process order
}
orders.close();
```

### Order Status Management

#### Cancel Order

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Order = require('dw/order/Order');

function cancelOrder(orderNo) {
    var order = OrderMgr.getOrder(orderNo);

    if (!order) {
        return { error: true, message: 'Order not found' };
    }

    // Can only cancel NEW or OPEN orders
    if (order.status.value !== Order.ORDER_STATUS_NEW &&
        order.status.value !== Order.ORDER_STATUS_OPEN) {
        return { error: true, message: 'Order cannot be cancelled' };
    }

    Transaction.wrap(function() {
        OrderMgr.cancelOrder(order);
    });

    return { error: false };
}
```

#### Fail Order

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

function failOrder(order, reopenBasket) {
    // reopenBasket: true = customer can retry checkout
    //               false = basket is lost

    Transaction.wrap(function() {
        OrderMgr.failOrder(order, reopenBasket);
    });
}
```

#### Handling Failed Orders

**Failed orders cannot be reopened.** Instead, use `failOrder(order, true)` to reopen the basket:

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

// When payment fails, fail the order and reopen basket
function handlePaymentFailure(order) {
    Transaction.wrap(function() {
        // reopenBasket=true allows customer to retry checkout
        OrderMgr.failOrder(order, true);
    });

    // Basket is now available again for the customer
    return { error: true, message: 'Payment failed. Please try again.' };
}
```

#### SCAPI: Fail with Reopen (B2C 24.3+)

For SCAPI integrations, use the `failed_with_reopen` status to fail an order while reopening the basket:

```http
PATCH /checkout/orders/v1/organizations/{orgId}/orders/{orderNo}?siteId={siteId}
Authorization: Bearer {token}
Content-Type: application/json

{
    "status": "failed_with_reopen"
}
```

This is equivalent to `OrderMgr.failOrder(order, true)` in Script API.

#### Undo Cancelled Order

Cancelled orders can be reopened using `undoCancelOrder()`:

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');
var Order = require('dw/order/Order');

function reopenCancelledOrder(orderNo) {
    var order = OrderMgr.getOrder(orderNo);

    if (order.status.value !== Order.ORDER_STATUS_CANCELLED) {
        return { error: true, message: 'Order is not cancelled' };
    }

    Transaction.wrap(function() {
        // Revert to NEW status
        OrderMgr.undoCancelOrder(order);
    });

    return { error: false, order: order };
}
```

### Order Properties

| Property | Description |
|----------|-------------|
| `orderNo` | Order number |
| `status` | Current order status |
| `confirmationStatus` | Confirmation status |
| `exportStatus` | Export status for OMS |
| `paymentStatus` | Payment status |
| `shippingStatus` | Shipping status |
| `customerEmail` | Customer email |
| `customerName` | Customer name |
| `totalGrossPrice` | Order total (with tax) |
| `totalNetPrice` | Order total (without tax) |
| `totalTax` | Total tax amount |
| `creationDate` | Order creation date |
| `productLineItems` | Line items in order |
| `shipments` | Order shipments |
| `paymentInstruments` | Payment instruments |

### Custom Order Numbers

Use the `dw.order.createOrderNo` hook for custom order number generation:

```javascript
// hooks.json
{
    "hooks": [
        {
            "name": "dw.order.createOrderNo",
            "script": "./hooks/orderNo.js"
        }
    ]
}
```

```javascript
// hooks/orderNo.js
var OrderMgr = require('dw/order/OrderMgr');
var Site = require('dw/system/Site');

exports.createOrderNo = function() {
    var seqNo = OrderMgr.createOrderSequenceNo();
    var prefix = Site.current.ID.toUpperCase();
    var year = new Date().getFullYear();

    return prefix + '-' + year + '-' + seqNo;
};
```

### Best Practices

#### Do

- Always wrap order operations in transactions
- Check order status before transitions
- Close order iterators when done
- Use `failOrder(order, true)` to let customers retry
- Implement idempotent order creation (use specific order numbers)
- Set appropriate export/confirmation status

#### Don't

- Place orders before successful payment authorization
- Cancel orders without refund processing
- Leave orders in CREATED status indefinitely
- Forget to handle concurrent order modifications
- Skip status validation before transitions

### Error Handling

| Scenario | Solution |
|----------|----------|
| Basket is empty | Validate basket before `createOrder()` |
| Invalid basket | Check for missing shipping/billing addresses |
| Payment failed | Use `failOrder(order, true)` to reopen basket |
| Order number exists | Use auto-generated numbers or validate uniqueness |
| Status transition invalid | Check current status before calling status methods |

### Related Skills

- [b2c-hooks](../b2c-hooks/SKILL.md) - Order hooks (calculate, payment, createOrderNo)

---


<a id="b2c-page-designer"></a>
## b2c-page-designer

**When to use:** Create Page Designer pages and components in B2C Commerce. Use when building visual merchandising tools, content slots, or experience API integrations. Covers page types, component types, regions, attribute definitions, component type ID and subfolders, enum and custom/color attribute pitfalls, and troubleshooting when a component does not appear in the editor.

## Page Designer Skill

This skill guides you through creating custom Page Designer page types and component types for Salesforce B2C Commerce.

### Overview

Page Designer allows merchants to create and manage content pages through a visual editor. Developers create:

1. **Page Types** - Define page structures with regions
2. **Component Types** - Reusable content blocks with configurable attributes

### File Structure

Page Designer files are in the cartridge's `experience` directory:

```
/my-cartridge
    /cartridge
        /experience
            /pages
                homepage.json           # Page type meta definition
                homepage.js             # Page type script
            /components
                banner.json             # Component type meta definition
                banner.js               # Component type script
        /templates
            /default
                /experience
                    /pages
                        homepage.isml   # Page template
                    /components
                        banner.isml     # Component template
```

**Naming:** The `.json` and `.js` files must have matching names. Use only **alphanumeric** or **underscore** in file names and in any subdirectory names under `experience/pages` or `experience/components`.

**Component types in subfolders:** You can put component meta and script in a subdirectory (e.g. `experience/components/assets/`). The **component type ID** is then the path with dots: `assets.hero_image_block`. The template path under `templates/default/` must mirror that path (e.g. `templates/default/experience/components/assets/hero_image_block.isml`), and the script must call `Template('experience/components/assets/hero_image_block')` so the path matches. Stored ID is `component.{component_type_id}`; total length must not exceed 256 characters.

### Page Types

#### Meta Definition (pages/homepage.json)

```json
{
    "name": "Home Page",
    "description": "Landing page with hero and content regions",
    "region_definitions": [
        {
            "id": "hero",
            "name": "Hero Section",
            "max_components": 1
        },
        {
            "id": "content",
            "name": "Main Content"
        },
        {
            "id": "footer",
            "name": "Footer Section",
            "component_type_exclusions": [
                { "type_id": "video" }
            ]
        }
    ]
}
```

#### Page Script (pages/homepage.js)

```javascript
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var page = context.page;

    model.put('page', page);

    return new Template('experience/pages/homepage').render(model).text;
};
```

#### Page Template (templates/experience/pages/homepage.isml)

```html
<isdecorate template="common/layout/page">
    <isscript>
        var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
    </isscript>

    <div class="homepage">
        <div class="hero-region">
            <isprint value="${PageRenderHelper.renderRegion(pdict.page.getRegion('hero'))}" encoding="off"/>
        </div>

        <div class="content-region">
            <isprint value="${PageRenderHelper.renderRegion(pdict.page.getRegion('content'))}" encoding="off"/>
        </div>

        <div class="footer-region">
            <isprint value="${PageRenderHelper.renderRegion(pdict.page.getRegion('footer'))}" encoding="off"/>
        </div>
    </div>
</isdecorate>
```

### Component Types

#### Meta Definition (components/banner.json)

```json
{
    "name": "Banner",
    "description": "Promotional banner with image and CTA",
    "group": "content",
    "region_definitions": [],
    "attribute_definition_groups": [
        {
            "id": "image",
            "name": "Image Settings",
            "attribute_definitions": [
                {
                    "id": "image",
                    "name": "Banner Image",
                    "type": "image",
                    "required": true
                },
                {
                    "id": "alt",
                    "name": "Alt Text",
                    "type": "string",
                    "required": true
                }
            ]
        },
        {
            "id": "content",
            "name": "Content",
            "attribute_definitions": [
                {
                    "id": "headline",
                    "name": "Headline",
                    "type": "string",
                    "required": true
                },
                {
                    "id": "body",
                    "name": "Body Text",
                    "type": "markup"
                },
                {
                    "id": "ctaUrl",
                    "name": "CTA Link",
                    "type": "url"
                },
                {
                    "id": "ctaText",
                    "name": "CTA Button Text",
                    "type": "string"
                }
            ]
        },
        {
            "id": "layout",
            "name": "Layout Options",
            "attribute_definitions": [
                {
                    "id": "alignment",
                    "name": "Text Alignment",
                    "type": "enum",
                    "values": ["left", "center", "right"],
                    "default_value": "center"
                },
                {
                    "id": "fullWidth",
                    "name": "Full Width",
                    "type": "boolean",
                    "default_value": false
                }
            ]
        }
    ]
}
```

**Component meta:** Always include `region_definitions`. Use `[]` when the component has no nested regions (no slots for other components).

#### Component Script (components/banner.js)

```javascript
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    // Access merchant-configured attributes
    model.put('image', content.image);        // Image object
    model.put('alt', content.alt);            // String
    model.put('headline', content.headline);  // String
    model.put('body', content.body);          // Markup string
    model.put('ctaUrl', content.ctaUrl);      // URL object
    model.put('ctaText', content.ctaText);    // String
    model.put('alignment', content.alignment || 'center');
    model.put('fullWidth', content.fullWidth);

    return new Template('experience/components/banner').render(model).text;
};
```

**Template path:** The path passed to `Template(...)` must match the template path under `templates/default/`. If the component lives in a subfolder (e.g. `experience/components/assets/hero_image_block`), use `Template('experience/components/assets/hero_image_block')` and place the ISML at `templates/default/experience/components/assets/hero_image_block.isml`.

**Handling colors (string or color picker object):** If an attribute can be a hex string or a color picker object `{ color: "#hex" }`, use a small helper so the script works with both:

```javascript
function getColor(colorAttr) {
    if (!colorAttr) return '';
    if (typeof colorAttr === 'string' && colorAttr.trim()) return colorAttr.trim();
    if (colorAttr.color) return colorAttr.color;
    return '';
}
```

#### Component Template (templates/experience/components/banner.isml)

```html
<div class="banner ${pdict.fullWidth ? 'banner--full-width' : ''}"
     style="text-align: ${pdict.alignment}">
    <isif condition="${pdict.image}">
        <img src="${pdict.image.file.absURL}"
             alt="${pdict.alt}"
             class="banner__image"/>
    </isif>

    <div class="banner__content">
        <h2 class="banner__headline">${pdict.headline}</h2>

        <isif condition="${pdict.body}">
            <div class="banner__body">
                <isprint value="${pdict.body}" encoding="off"/>
            </div>
        </isif>

        <isif condition="${pdict.ctaUrl && pdict.ctaText}">
            <a href="${pdict.ctaUrl}" class="banner__cta btn btn-primary">
                ${pdict.ctaText}
            </a>
        </isif>
    </div>
</div>
```

### Attribute Types

| Type | Description | Returns |
|------|-------------|---------|
| `string` | Text input | String |
| `text` | Multi-line text | String |
| `markup` | Rich text editor | Markup string (use `encoding="off"`) |
| `boolean` | Checkbox | Boolean |
| `integer` | Number input | Integer |
| `enum` | Single select dropdown | String |
| `image` | Image picker | Image object with `file.absURL` |
| `file` | File picker | File object |
| `url` | URL picker | URL string |
| `category` | Category selector | Category object |
| `product` | Product selector | Product object |
| `page` | Page selector | Page object |
| `custom` | JSON object or custom editor | Object (or editor-specific) |

**Enum — critical for component visibility:** Use a **string array** for `values`: `"values": ["left", "center", "right"]`. Do **not** use objects like `{ "value": "x", "display_value": "X" }`; that format can cause the component type to be rejected and **not appear** in the Page Designer component list.

**Custom and colors:** `type: "custom"` with e.g. `editor_definition.type: "styling.colorPicker"` requires a cartridge that provides that editor on the **Business Manager** site cartridge path. If the component does not show up in the editor, use `type: "string"` for color attributes (merchant types a hex). In the script, support both: accept a string or an object like `{ color: "#hex" }` (e.g. a small `getColor(attr)` helper that returns the string).

**default_value:** Used for storefront rendering only; it is **not** shown as preselected in the Page Designer visual editor.

### Region Definitions

```json
{
    "region_definitions": [
        {
            "id": "main",
            "name": "Main Content",
            "max_components": 10,
            "component_type_exclusions": [
                { "type_id": "heavy-component" }
            ],
            "component_type_inclusions": [
                { "type_id": "text-block" },
                { "type_id": "image-block" }
            ]
        }
    ]
}
```

| Property | Description |
|----------|-------------|
| `id` | Unique region identifier |
| `name` | Display name in editor |
| `max_components` | Max number of components (optional) |
| `component_type_exclusions` | Components NOT allowed |
| `component_type_inclusions` | Only these components allowed |

### Rendering Pages

#### In Controllers

```javascript
var PageMgr = require('dw/experience/PageMgr');

server.get('Show', function (req, res, next) {
    var page = PageMgr.getPage(req.querystring.cid);

    if (page && page.isVisible()) {
        res.page(page.ID);
    } else {
        res.setStatusCode(404);
        res.render('error/notfound');
    }
    next();
});
```

#### In ISML

```html
<isscript>
    var PageMgr = require('dw/experience/PageMgr');
    var page = PageMgr.getPage('homepage-id');
</isscript>

<isif condition="${page && page.isVisible()}">
    <isprint value="${PageMgr.renderPage(page.ID)}" encoding="off"/>
</isif>
```

### Component Groups

Organize components in the editor sidebar:

```json
{
    "name": "Product Card",
    "group": "products"
}
```

Common groups: `content`, `products`, `navigation`, `layout`, `media`

### If the component does not appear in Page Designer

1. **Enums:** Ensure all `enum` attributes use `"values": ["a", "b"]` (string array), not objects with `value`/`display_value`.
2. **Custom editors:** Replace `type: "custom"` (e.g. color picker) with `type: "string"` for the problematic attributes and redeploy; if the component then appears, the issue is likely the custom editor or BM cartridge path.
3. **Naming:** File and subdirectory names only alphanumeric or underscore.
4. **region_definitions:** Component meta must include `region_definitions` (use `[]` if no nested regions).
5. **Template path:** Script `Template('...')` path must match the template path under `templates/default/` (including subfolders like `experience/components/assets/...`).
6. **Logs:** In Business Manager, **Administration > Site Development > Development Setup**, check error logs when opening Page Designer for script or meta errors related to your component type ID.
7. **Code version:** Deploy the cartridge to the correct code version; in non-production, meta can be cached for a few seconds—try a code version switch or short wait.

### Best Practices

1. **Use `dw.util.Template`** for rendering (NOT `dw.template.ISML`)
2. **Keep components self-contained** - avoid cross-component dependencies
3. **Provide default values** for optional attributes (they apply to rendering; not shown as preselected in the editor)
4. **Group related attributes** in `attribute_definition_groups`
5. **Use meaningful IDs** - they're used programmatically
6. **Don't change type IDs or attribute types** after merchants create content (creates inconsistency with stored data); add a new component type and deprecate the old one if needed
7. **Prefer string arrays for enums** and **string for colors** unless you control the BM cartridge path and custom editors

### Detailed Reference

For comprehensive attribute documentation:
- [Meta Definitions Reference](references/META-DEFINITIONS.md) - Full JSON schema
- [Attribute Types Reference](references/ATTRIBUTE-TYPES.md) - All attribute types with examples

### Reference: ATTRIBUTE-TYPES.md

#### Page Designer Attribute Types Reference

All attribute types available for Page Designer components.

##### String Types

###### string

Single-line text input.

```json
{
    "id": "headline",
    "name": "Headline",
    "type": "string",
    "required": true,
    "default_value": "Enter headline"
}
```

**Returns:** String

###### text

Multi-line text area.

```json
{
    "id": "description",
    "name": "Description",
    "type": "text",
    "required": false
}
```

**Returns:** String

###### markup

Rich text editor with formatting.

```json
{
    "id": "body",
    "name": "Body Content",
    "type": "markup"
}
```

**Returns:** HTML string (use `encoding="off"` in ISML)

**Template usage:**
```html
<isprint value="${pdict.body}" encoding="off"/>
```

##### Numeric Types

###### integer

Whole number input.

```json
{
    "id": "columns",
    "name": "Number of Columns",
    "type": "integer",
    "default_value": 3
}
```

**Returns:** Integer

##### Boolean Type

###### boolean

Checkbox.

```json
{
    "id": "showPrice",
    "name": "Show Price",
    "type": "boolean",
    "default_value": true
}
```

**Returns:** Boolean

##### Selection Types

###### enum

Single-select dropdown.

```json
{
    "id": "alignment",
    "name": "Text Alignment",
    "type": "enum",
    "values": ["left", "center", "right", "justify"],
    "default_value": "left"
}
```

**Returns:** String (selected value)

###### enum with display names

For user-friendly labels, use separate locale resource files.

```json
{
    "id": "size",
    "name": "Size",
    "type": "enum",
    "values": ["sm", "md", "lg", "xl"],
    "default_value": "md"
}
```

##### Media Types

###### image

Image picker with focal point.

```json
{
    "id": "bannerImage",
    "name": "Banner Image",
    "type": "image",
    "required": true
}
```

**Returns:** `dw.experience.image.Image`

**Script usage:**
```javascript
var image = content.bannerImage;
var url = image.file.absURL;
var focalPoint = image.focalPoint;  // {x, y} if set
```

**Template usage:**
```html
<isif condition="${pdict.bannerImage}">
    <img src="${pdict.bannerImage.file.absURL}"
         alt="${pdict.altText}"/>
</isif>
```

###### file

General file picker.

```json
{
    "id": "document",
    "name": "PDF Document",
    "type": "file"
}
```

**Returns:** `dw.content.MediaFile`

**Usage:**
```javascript
var file = content.document;
var url = file.absURL;
```

##### URL Type

###### url

URL picker (internal or external).

```json
{
    "id": "ctaLink",
    "name": "Button Link",
    "type": "url"
}
```

**Returns:** String (URL)

**Template usage:**
```html
<isif condition="${pdict.ctaLink}">
    <a href="${pdict.ctaLink}" class="btn">Learn More</a>
</isif>
```

##### Commerce Types

###### product

Product selector.

```json
{
    "id": "featuredProduct",
    "name": "Featured Product",
    "type": "product",
    "required": true
}
```

**Returns:** `dw.catalog.Product`

**Script usage:**
```javascript
var product = content.featuredProduct;
if (product) {
    model.put('productName', product.name);
    model.put('productPrice', product.priceModel.price);
    model.put('productImage', product.getImage('large'));
}
```

###### category

Category selector.

```json
{
    "id": "category",
    "name": "Product Category",
    "type": "category"
}
```

**Returns:** `dw.catalog.Category`

**Script usage:**
```javascript
var category = content.category;
if (category) {
    model.put('categoryName', category.displayName);
    model.put('categoryUrl', URLUtils.url('Search-Show', 'cgid', category.ID));
}
```

###### page

Page Designer page selector.

```json
{
    "id": "linkedPage",
    "name": "Linked Page",
    "type": "page"
}
```

**Returns:** `dw.experience.Page`

**Script usage:**
```javascript
var page = content.linkedPage;
if (page && page.isVisible()) {
    model.put('pageUrl', URLUtils.url('Page-Show', 'cid', page.ID));
}
```

##### CMS Type

###### cms_record

CMS content asset selector.

```json
{
    "id": "contentAsset",
    "name": "Content Asset",
    "type": "cms_record"
}
```

**Returns:** Content asset reference

##### Custom Type

###### custom

JSON object with custom UI or text area.

```json
{
    "id": "customData",
    "name": "Custom Configuration",
    "type": "custom",
    "required": false
}
```

**Returns:** Object (parsed JSON)

**Script usage:**
```javascript
var customData = content.customData;
if (customData) {
    model.put('customValue', customData.someProperty);
}
```

##### Complete Component Example

Using multiple attribute types:

```json
{
    "name": "Product Spotlight",
    "group": "products",
    "attribute_definition_groups": [
        {
            "id": "product",
            "name": "Product",
            "attribute_definitions": [
                {
                    "id": "product",
                    "name": "Select Product",
                    "type": "product",
                    "required": true
                }
            ]
        },
        {
            "id": "content",
            "name": "Content",
            "attribute_definitions": [
                {
                    "id": "overrideImage",
                    "name": "Override Image",
                    "description": "Use custom image instead of product image",
                    "type": "image"
                },
                {
                    "id": "headline",
                    "name": "Custom Headline",
                    "description": "Overrides product name",
                    "type": "string"
                },
                {
                    "id": "description",
                    "name": "Custom Description",
                    "type": "markup"
                },
                {
                    "id": "ctaText",
                    "name": "Button Text",
                    "type": "string",
                    "default_value": "Shop Now"
                },
                {
                    "id": "ctaUrl",
                    "name": "Button Link",
                    "description": "Leave empty to link to product page",
                    "type": "url"
                }
            ]
        },
        {
            "id": "display",
            "name": "Display Settings",
            "attribute_definitions": [
                {
                    "id": "showPrice",
                    "name": "Show Price",
                    "type": "boolean",
                    "default_value": true
                },
                {
                    "id": "showRating",
                    "name": "Show Rating",
                    "type": "boolean",
                    "default_value": true
                },
                {
                    "id": "layout",
                    "name": "Layout",
                    "type": "enum",
                    "values": ["horizontal", "vertical", "overlay"],
                    "default_value": "horizontal"
                },
                {
                    "id": "columns",
                    "name": "Grid Columns (for vertical)",
                    "type": "integer",
                    "default_value": 1
                }
            ]
        }
    ]
}
```

**Script:**
```javascript
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var product = content.product;

    if (!product) {
        return '';
    }

    // Use override or product data
    var image = content.overrideImage || product.getImage('large');
    var headline = content.headline || product.name;
    var ctaUrl = content.ctaUrl || URLUtils.url('Product-Show', 'pid', product.ID);

    model.put('product', product);
    model.put('image', image);
    model.put('headline', headline);
    model.put('description', content.description);
    model.put('ctaText', content.ctaText || 'Shop Now');
    model.put('ctaUrl', ctaUrl);
    model.put('showPrice', content.showPrice !== false);
    model.put('showRating', content.showRating !== false);
    model.put('layout', content.layout || 'horizontal');

    return new Template('experience/components/productspotlight').render(model).text;
};
```

### Reference: META-DEFINITIONS.md

#### Page Designer Meta Definitions Reference

Complete JSON schema for page types and component types.

##### Page Type Schema

```json
{
    "name": "Page Type Name",
    "description": "Description shown in editor",
    "region_definitions": [
        {
            "id": "regionId",
            "name": "Region Name",
            "max_components": 5,
            "component_type_exclusions": [],
            "component_type_inclusions": []
        }
    ]
}
```

###### Page Type Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name in editor |
| `description` | string | No | Description shown when selecting page type |
| `region_definitions` | array | Yes | List of content regions |

###### Region Definition Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (alphanumeric, underscore) |
| `name` | string | Yes | Display name in editor |
| `max_components` | integer | No | Maximum components allowed |
| `component_type_exclusions` | array | No | Components NOT allowed in region |
| `component_type_inclusions` | array | No | ONLY these components allowed |

##### Component Type Schema

```json
{
    "name": "Component Name",
    "description": "Component description",
    "group": "content",
    "attribute_definition_groups": [
        {
            "id": "groupId",
            "name": "Group Name",
            "description": "Group description",
            "attribute_definitions": [
                {
                    "id": "attributeId",
                    "name": "Attribute Name",
                    "description": "Help text",
                    "type": "string",
                    "required": false,
                    "default_value": "default"
                }
            ]
        }
    ],
    "region_definitions": []
}
```

###### Component Type Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name |
| `description` | string | No | Description in editor |
| `group` | string | No | Sidebar group (content, products, etc.) |
| `attribute_definition_groups` | array | Yes | Grouped attribute definitions |
| `region_definitions` | array | No | Nested regions (for container components) |

###### Attribute Definition Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Attribute identifier |
| `name` | string | Yes | Display name |
| `description` | string | No | Help text |
| `type` | string | Yes | Attribute type |
| `required` | boolean | No | Whether required (default false) |
| `default_value` | varies | No | Default value |
| `values` | array | No | Options for enum type |

##### Complete Page Type Example

```json
{
    "name": "Product Landing Page",
    "description": "Landing page for product campaigns with hero, features, and product grid",
    "region_definitions": [
        {
            "id": "hero",
            "name": "Hero Section",
            "max_components": 1,
            "component_type_inclusions": [
                { "type_id": "hero-banner" },
                { "type_id": "video-hero" }
            ]
        },
        {
            "id": "features",
            "name": "Features Section",
            "max_components": 4,
            "component_type_inclusions": [
                { "type_id": "feature-card" },
                { "type_id": "icon-block" }
            ]
        },
        {
            "id": "products",
            "name": "Product Grid",
            "max_components": 1,
            "component_type_inclusions": [
                { "type_id": "product-grid" },
                { "type_id": "product-carousel" }
            ]
        },
        {
            "id": "content",
            "name": "Additional Content",
            "component_type_exclusions": [
                { "type_id": "hero-banner" },
                { "type_id": "video-hero" }
            ]
        },
        {
            "id": "cta",
            "name": "Call to Action",
            "max_components": 1
        }
    ]
}
```

##### Complete Component Type Example

```json
{
    "name": "Product Card",
    "description": "Display a single product with image, name, price, and add to cart",
    "group": "products",
    "attribute_definition_groups": [
        {
            "id": "product",
            "name": "Product Selection",
            "attribute_definitions": [
                {
                    "id": "product",
                    "name": "Product",
                    "description": "Select the product to display",
                    "type": "product",
                    "required": true
                }
            ]
        },
        {
            "id": "display",
            "name": "Display Options",
            "attribute_definitions": [
                {
                    "id": "showPrice",
                    "name": "Show Price",
                    "type": "boolean",
                    "default_value": true
                },
                {
                    "id": "showRating",
                    "name": "Show Rating",
                    "type": "boolean",
                    "default_value": true
                },
                {
                    "id": "showAddToCart",
                    "name": "Show Add to Cart Button",
                    "type": "boolean",
                    "default_value": true
                },
                {
                    "id": "imageSize",
                    "name": "Image Size",
                    "type": "enum",
                    "values": ["small", "medium", "large"],
                    "default_value": "medium"
                }
            ]
        },
        {
            "id": "style",
            "name": "Styling",
            "attribute_definitions": [
                {
                    "id": "cardStyle",
                    "name": "Card Style",
                    "type": "enum",
                    "values": ["default", "bordered", "shadow", "minimal"],
                    "default_value": "default"
                },
                {
                    "id": "backgroundColor",
                    "name": "Background Color",
                    "description": "CSS color value (e.g., #ffffff or white)",
                    "type": "string"
                }
            ]
        }
    ]
}
```

##### Container Component Example

Component with nested regions:

```json
{
    "name": "Two Column Layout",
    "description": "Container with two side-by-side columns",
    "group": "layout",
    "attribute_definition_groups": [
        {
            "id": "layout",
            "name": "Layout Options",
            "attribute_definitions": [
                {
                    "id": "leftWidth",
                    "name": "Left Column Width",
                    "type": "enum",
                    "values": ["25%", "33%", "50%", "66%", "75%"],
                    "default_value": "50%"
                },
                {
                    "id": "gap",
                    "name": "Column Gap",
                    "type": "enum",
                    "values": ["none", "small", "medium", "large"],
                    "default_value": "medium"
                }
            ]
        }
    ],
    "region_definitions": [
        {
            "id": "left",
            "name": "Left Column"
        },
        {
            "id": "right",
            "name": "Right Column"
        }
    ]
}
```

**Script for container:**
```javascript
'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    model.put('leftWidth', context.content.leftWidth || '50%');
    model.put('gap', context.content.gap || 'medium');

    // Render nested regions
    model.put('leftRegion', PageRenderHelper.renderRegion(component.getRegion('left')));
    model.put('rightRegion', PageRenderHelper.renderRegion(component.getRegion('right')));

    return new Template('experience/components/twocolumn').render(model).text;
};
```

##### Page Script Context

Properties available in `context` parameter:

```javascript
module.exports.render = function (context) {
    var page = context.page;                    // dw.experience.Page
    var renderParameters = context.renderParameters;  // HashMap from PageMgr.renderPage()

    // Page methods
    var pageId = page.ID;
    var pageName = page.name;
    var isVisible = page.isVisible();
    var region = page.getRegion('regionId');    // dw.experience.Region
};
```

##### Component Script Context

Properties available in `context` parameter:

```javascript
module.exports.render = function (context) {
    var component = context.component;          // dw.experience.Component
    var content = context.content;              // HashMap of attribute values
    var componentRenderSettings = context.componentRenderSettings;

    // Access attributes
    var image = content.image;                  // dw.experience.image.Image
    var product = content.product;              // dw.catalog.Product
    var category = content.category;            // dw.catalog.Category
    var text = content.headline;                // String
    var enabled = content.showPrice;            // Boolean
    var url = content.ctaUrl;                   // String (URL)

    // For container components
    var region = component.getRegion('regionId');
};
```

---


<a id="b2c-querying-data"></a>
## b2c-querying-data

**When to use:** Best practices for querying products, orders, customers, and system objects in B2C Commerce. Use when writing product searches, order queries, customer/profile lookups, replacing database-intensive APIs, improving search performance, or diagnosing slow category/search pages. Covers ProductSearchModel, OrderMgr, CustomerMgr, SystemObjectMgr, index-friendly vs database-intensive APIs, and query performance pitfalls. For order lifecycle and status management, use b2c-ordering instead. For custom object CRUD, use b2c-custom-objects instead.

## Querying Data in B2C Commerce

Efficient data querying is critical for storefront performance and job stability. B2C Commerce provides index-backed search APIs and database query APIs—choosing the right one for each use case avoids performance problems.

### Product Search (Storefront)

Use `ProductSearchModel` for all storefront product searches. It is index-backed and designed for high-traffic pages.

#### Basic Product Search

```javascript
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

var psm = new ProductSearchModel();
psm.setCategoryID('electronics');
psm.setOrderableProductsOnly(true); // Only in-stock products
psm.setSearchPhrase('laptop');
psm.search();

var hits = psm.getProductSearchHits();
while (hits.hasNext()) {
    var hit = hits.next();
    var productID = hit.productID;
    var minPrice = hit.minPrice;
    var maxPrice = hit.maxPrice;
}
hits.close();
```

#### Paging Search Results

Always page results—never load the full result set:

```javascript
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var PagingModel = require('dw/web/PagingModel');

var psm = new ProductSearchModel();
psm.setCategoryID('mens-clothing');
psm.setOrderableProductsOnly(true);
psm.search();

var pagingModel = new PagingModel(psm.getProductSearchHits(), psm.count);
pagingModel.setPageSize(12);
pagingModel.setStart(0); // page offset

var pageElements = pagingModel.pageElements;
while (pageElements.hasNext()) {
    var hit = pageElements.next();
    // Render product tile
}
```

#### Getting Variation Data from Search Hits

Use `ProductSearchHit` methods instead of loading full product objects:

```javascript
// GOOD: Get variation info from the search hit (index-backed)
var representedColors = hit.getRepresentedVariationValues('color');
var representedIDs = hit.getRepresentedProductIDs();
var minPrice = hit.getMinPrice();
var maxPrice = hit.getMaxPrice();

// BAD: Loading the full product and iterating variants (database-intensive)
var product = hit.product;
var variants = product.getVariants(); // Expensive!
var priceModel = product.getPriceModel(); // Expensive!
```

#### Search Refinements

```javascript
var psm = new ProductSearchModel();
psm.setCategoryID('shoes');
psm.addRefinementValues('color', 'blue');
psm.addRefinementValues('size', '10');
psm.setPriceMin(50);
psm.setPriceMax(200);
psm.search();

// Get available refinement values for the current result set
var refinements = psm.getRefinements();
var colorValues = refinements.getNextLevelRefinementValues(
    refinements.getRefinementDefinitionByName('color')
);
```

#### ProductSearchModel API Summary

| Method | Description |
|--------|-------------|
| `search()` | Execute the search |
| `setCategoryID(id)` | Filter by category |
| `setSearchPhrase(phrase)` | Set search keywords |
| `setOrderableProductsOnly(flag)` | Exclude out-of-stock |
| `addRefinementValues(name, value)` | Add refinement filter |
| `setPriceMin(price)` / `setPriceMax(price)` | Price range filter |
| `setSortingRule(rule)` | Set sorting rule |
| `getProductSearchHits()` | Get result iterator |
| `getRefinements()` | Get available refinements |
| `count` | Total result count |

### Order Queries

#### OrderMgr.searchOrders / queryOrders

Use `searchOrders` for index-backed order lookups and `queryOrders` for database queries:

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');

// Index-backed search (preferred for common lookups)
var orders = OrderMgr.searchOrders(
    'customerEmail = {0} AND status != {1}',
    'creationDate desc',
    'customer@example.com',
    Order.ORDER_STATUS_FAILED
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process order
}
orders.close(); // Always close iterators
```

#### Query by Date Range

```javascript
var OrderMgr = require('dw/order/OrderMgr');
var Calendar = require('dw/util/Calendar');
var Order = require('dw/order/Order');

var startDate = new Calendar();
startDate.add(Calendar.DAY_OF_YEAR, -7);

var orders = OrderMgr.searchOrders(
    'creationDate >= {0} AND status = {1}',
    'creationDate desc',
    startDate.time,
    Order.ORDER_STATUS_NEW
);

while (orders.hasNext()) {
    var order = orders.next();
    // Process
}
orders.close();
```

#### searchOrders vs queryOrders

| Aspect | `searchOrders` | `queryOrders` |
|--------|---------------|---------------|
| Backing | Search index | Database |
| Performance | Fast for indexed fields | Slower, full table scan possible |
| Use when | Querying indexed attributes (status, email, dates) | Querying non-indexed or custom attributes |
| Result limit | Up to 1000 hits | No hard limit (but use paging) |

**Prefer `searchOrders`** for storefront and high-traffic code paths. Use `queryOrders` only when you need to query attributes not available in the search index.

### Customer / Profile Queries

#### CustomerMgr (Preferred)

Use `searchProfiles` for index-backed searches and `processProfiles` for batch processing in jobs:

```javascript
var CustomerMgr = require('dw/customer/CustomerMgr');

// Index-backed search (storefront use)
var profiles = CustomerMgr.searchProfiles(
    'email = {0}',
    'lastLoginTime desc',
    'customer@example.com'
);

while (profiles.hasNext()) {
    var profile = profiles.next();
    // Process profile
}
profiles.close();
```

#### Batch Processing (Jobs)

Use `processProfiles` for jobs that need to iterate over many profiles—it has optimized memory management:

```javascript
var CustomerMgr = require('dw/customer/CustomerMgr');

function processProfile(profile) {
    // Process each profile individually
    // Memory is managed automatically
}

// Process all profiles matching the query
CustomerMgr.processProfiles('gender = {0}', processProfile, 1);
```

**Important:** `processProfiles` replaces the older `queryProfiles` and `SystemObjectMgr.querySystemObjects` for customer data. It uses the full-text search service with better performance and memory characteristics.

#### Customer Query Behaviors

- Wildcards (`*`, `%`, `+`) are filtered from queries and replaced by spaces
- `LIKE` and `ILIKE` execute as full-text queries (match whole words, not substrings)
- `LIKE` is case-insensitive
- Combining `AND` and `OR` in the same query degrades performance
- Range queries (e.g., `a > b`) impact performance
- Results are limited to the first 1000 hits

### System Object Queries (SystemObjectMgr)

For querying system objects other than customers (e.g., SitePreferences, catalogs):

```javascript
var SystemObjectMgr = require('dw/object/SystemObjectMgr');

// Query system objects
var results = SystemObjectMgr.querySystemObjects(
    'Profile',
    'custom.loyaltyTier = {0}',
    'lastLoginTime desc',
    'Gold'
);

while (results.hasNext()) {
    var obj = results.next();
    // Process
}
results.close();
```

**Note:** For customer profiles specifically, prefer `CustomerMgr.searchProfiles` or `CustomerMgr.processProfiles` over `SystemObjectMgr.querySystemObjects`—they use the search index and perform significantly better.

### Database-Intensive APIs to Avoid

These APIs hit the database directly and are expensive on high-traffic pages. Replace them with index-friendly alternatives. See [Performance-Critical APIs](references/PERFORMANCE-APIS.md) for the complete list with impact details.

| Avoid (Database-Intensive) | Use Instead (Index-Friendly) |
|----------------------------|------------------------------|
| `Category.getProducts()` / `getOnlineProducts()` | `ProductSearchModel.setCategoryID()` |
| `ProductMgr.queryAllSiteProducts()` | `ProductSearchModel.search()` |
| `Product.getVariants()` / `getVariationModel()` | `ProductSearchHit` methods |
| `Product.getPriceModel()` (in loops) | `ProductSearchHit.getMinPrice()` / `getMaxPrice()` |
| `CustomerMgr.queryProfiles()` | `CustomerMgr.searchProfiles()` or `processProfiles()` |

### Related Skills

- [b2c-ordering](../b2c-ordering/SKILL.md) — Order lifecycle, status transitions, creation flows
- [b2c-custom-objects](../b2c-custom-objects/SKILL.md) — Custom object CRUD, OCAPI search queries

### Best Practices

#### Do

- **Always close iterators** — unclosed iterators leak resources (`results.close()`)
- **Page results** — use `PagingModel` or limit result counts; never load unbounded result sets
- **Put all filtering in the query** — don't post-process or filter results in custom code
- **Use index-backed APIs** — `ProductSearchModel`, `searchOrders`, `searchProfiles` for storefront pages
- **Use `processProfiles`** for batch customer operations in jobs (optimized memory)
- **Limit page size** — maximum ~120 products per page for search result pages
- **Use `setOrderableProductsOnly(true)`** — to filter unavailable products at the search level

#### Don't

- **Don't iterate over product variants on search result pages** — use `ProductSearchHit` methods instead
- **Don't post-process search results** — all criteria must go into the query for efficient execution
- **Don't use `queryAllSiteProducts()`** on storefront pages — it bypasses the search index
- **Don't combine AND + OR** in customer queries — it degrades performance
- **Don't rely on getting more than 1000 results** — search APIs cap at 1000 hits
- **Don't call database-intensive APIs on high-traffic pages** — category pages, search results, PDPs, and homepage

#### Job-Specific Guidelines

- Use `processProfiles` over `queryProfiles` for large customer data sets
- Design loop logic so memory consumption doesn't grow with result set size
- Keep only the currently processed object in memory; don't retain references
- Stream data to files regularly; don't build large structures in memory
- Limit transaction size to under 1000 modified business objects

### Detailed References

- [Performance-Critical APIs](references/PERFORMANCE-APIS.md) — full list of index-friendly vs database-intensive APIs

### Reference: PERFORMANCE-APIS.md

#### Performance-Critical APIs

Complete reference for index-friendly vs database-intensive APIs in B2C Commerce.

##### Product APIs

###### Database-Intensive (Avoid on Storefront Pages)

| API | Problem | Impact |
|-----|---------|--------|
| `Category.getOnlineSubCategories()` | Hits database for each subcategory | Slow on deep category trees |
| `Category.getProducts()` | Loads all products from database | Memory + time on large categories |
| `Category.getOnlineProducts()` | Same as above, filtered | Still database-backed |
| `Category.getProductAssignments()` | Database query per assignment | Expensive with many assignments |
| `Category.getOnlineCategoryAssignments()` | Same, filtered by online status | Still database-backed |
| `ProductMgr.queryAllSiteProducts()` | Full table scan of all products | Never use on storefront |
| `Product.getPriceModel()` | Database lookup for pricing | Expensive in loops |
| `Product.getVariants()` | Loads all variant products | Very expensive for products with many variants |
| `Product.getVariationModel()` | Builds full variation model | Database-intensive |

###### Index-Friendly Replacements

| API | Benefit |
|-----|---------|
| `ProductSearchModel.search()` | Search-index backed, fast |
| `ProductSearchModel.setCategoryID(id)` | Replaces `Category.getProducts()` |
| `ProductSearchModel.setOrderableProductsOnly(true)` | Replaces `Category.getOnlineProducts()` + availability check |
| `ProductSearchModel.getRefinements()` | Index-backed refinement values |
| `ProductSearchRefinements.getNextLevelRefinementValues()` | Replaces `Category.getOnlineSubCategories()` for nav |
| `ProductSearchModel.getProductSearchHits()` | Efficient result iteration |
| `ProductSearchHit.getMinPrice()` / `getMaxPrice()` | Replaces `Product.getPriceModel()` in search |
| `ProductSearchHit.getRepresentedProductIDs()` | Replaces `Product.getVariants()` in search |
| `ProductSearchHit.getRepresentedVariationValues(attr)` | Replaces `Product.getVariationModel()` in search |

##### Order APIs

| API | Type | Notes |
|-----|------|-------|
| `OrderMgr.searchOrders(query, sort, ...args)` | Index-backed | Preferred for storefront lookups; limited to 1000 results |
| `OrderMgr.searchOrder(query, ...args)` | Index-backed | Single order search |
| `OrderMgr.queryOrders(query, sort, ...args)` | Database | Use for non-indexed attributes only |
| `OrderMgr.queryOrder(query, ...args)` | Database | Single order, database query |
| `OrderMgr.getOrder(orderNo)` | Direct lookup | Fast; use when you have the order number |

##### Customer / Profile APIs

| API | Type | Notes |
|-----|------|-------|
| `CustomerMgr.searchProfiles(query, sort, ...args)` | Index-backed | Preferred for storefront; max 1000 results |
| `CustomerMgr.processProfiles(query, callback, ...args)` | Index-backed | Preferred for jobs; optimized memory management |
| `CustomerMgr.queryProfiles(query, sort, ...args)` | Database | **Deprecated pattern**; use `searchProfiles` instead |
| `SystemObjectMgr.querySystemObjects('Profile', ...)` | Database | **Deprecated for profiles**; use `CustomerMgr` methods |
| `CustomerMgr.getCustomerByLogin(login)` | Direct lookup | Fast; use when you have the login |
| `CustomerMgr.getCustomerByToken(token)` | Direct lookup | Fast; token-based auth flows |

##### Custom Object APIs

| API | Type | Notes |
|-----|------|-------|
| `CustomObjectMgr.getCustomObject(type, key)` | Direct lookup | Fast; use when you have the key |
| `CustomObjectMgr.queryCustomObjects(type, query, sort, ...args)` | Database | Only option for filtered queries |
| `CustomObjectMgr.getAllCustomObjects(type)` | Database | Use with caution on large datasets |

##### General Query Performance Rules

1. **Search index APIs** (search*) are 10-100x faster than database APIs (query*) for indexed attributes
2. **Direct lookups** (getOrder, getCustomerByLogin, getCustomObject) are fastest when you have the key
3. **Database queries** (query*) should only be used when:
   - The attribute is not in the search index
   - You need more than 1000 results (use in jobs, not storefront)
   - You need exact database consistency (search index can be slightly behind)
4. **Iterator management**: Always call `.close()` on query/search result iterators
5. **Result limits**: Search APIs return at most 1000 hits; design pagination accordingly

---


<a id="b2c-scapi-admin"></a>
## b2c-scapi-admin

**When to use:** Consume SCAPI Admin APIs for backend integrations and data management. Use when building inventory sync, order management, catalog updates, or customer data integrations. Covers Account Manager OAuth, admin scopes, and common integration patterns.

## SCAPI Admin APIs

This skill guides you through consuming Admin APIs for backend integrations, data synchronization, and management operations. Admin APIs are designed for server-to-server integration, not storefront use.

> **Note:** For **shopper-facing** APIs (products, baskets, checkout), see [b2c-scapi-shopper](../b2c-scapi-shopper/SKILL.md). This skill focuses on **admin/backend** operations.

### Overview

Admin APIs are designed for backend systems and integrations:

- **Client**: Backend services, ETL pipelines, management tools
- **Authentication**: Account Manager OAuth (client credentials)
- **Response Time**: < 60 seconds (HTTP 504 if exceeded)
- **Usage**: Moderate frequency, batch operations preferred

#### Base URL Structure

```
https://{shortCode}.api.commercecloud.salesforce.com/{apiFamily}/{apiName}/v1/organizations/{organizationId}/{resource}
```

Example:
```
https://kv7kzm78.api.commercecloud.salesforce.com/product/products/v1/organizations/f_ecom_zzte_053/products/25518823M
```

**Note:** Admin APIs typically don't require `siteId` parameter (unlike Shopper APIs).

### Authentication

Admin APIs use Account Manager OAuth with client credentials flow.

#### Get Admin Token via CLI

```bash
# Get admin token (uses clientId/clientSecret from dw.json)
b2c auth token

# Get token with specific scopes
b2c auth token --auth-scope sfcc.orders --auth-scope sfcc.products

# Get token as JSON (includes expiration)
b2c auth token --json
```

See [b2c-config skill](../../b2c-cli/skills/b2c-config/SKILL.md) for configuration details.

#### Get Token Programmatically

```bash
curl "https://account.demandware.com/dwsso/oauth2/access_token" \
  --request 'POST' \
  --user "${CLIENT_ID}:${CLIENT_SECRET}" \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data "grant_type=client_credentials" \
  --data-urlencode "scope=SALESFORCE_COMMERCE_API:${TENANT_ID} ${SCOPES}"
```

**Example:**

```bash
CLIENT_ID="your-client-id"
CLIENT_SECRET="your-client-secret"
TENANT_ID="zzte_053"
SCOPES="sfcc.orders sfcc.products"

TOKEN=$(curl -s "https://account.demandware.com/dwsso/oauth2/access_token" \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d "grant_type=client_credentials" \
  --data-urlencode "scope=SALESFORCE_COMMERCE_API:$TENANT_ID $SCOPES" \
  | jq -r '.access_token')
```

#### Dual Scope Requirement

Admin APIs require **two types of scopes**:

1. **Tenant scope**: `SALESFORCE_COMMERCE_API:{tenant_id}` - grants access to the tenant
2. **API-specific scopes**: `sfcc.catalogs`, `sfcc.orders.rw`, etc. - grants API access

```
scope=SALESFORCE_COMMERCE_API:zzte_053 sfcc.catalogs sfcc.products.rw
```

See [OAuth Scopes Reference](references/OAUTH-SCOPES.md) for the complete scope list.

#### Account Manager Setup

1. Log into Account Manager
2. Navigate to **API Client** > **Add API Client**
3. Configure:
   - Display Name and Password (client secret)
   - Assign Organizations (your B2C instances)
   - Role: "Salesforce Commerce API"
   - Token Endpoint Auth Method: `client_secret_post`
   - Access Token Format: `JWT`
   - Allowed Scopes: Add required scopes
4. Copy the Client ID

### API Families

#### Products API

Manage product catalog data.

```javascript
// Get product
const product = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/products/v1/organizations/${orgId}/products/${productId}`,
    {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    }
).then(r => r.json());

// Update product
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/products/v1/organizations/${orgId}/products/${productId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: { default: 'Updated Product Name' },
            shortDescription: { default: 'New description' }
        })
    }
);
```

**Required Scopes:**
- Read: `sfcc.products`
- Write: `sfcc.products.rw`

#### Catalogs API

Manage catalog structure and assignments.

```javascript
// List catalogs
const catalogs = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/catalogs/v1/organizations/${orgId}/catalogs`,
    {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    }
).then(r => r.json());

// Get catalog details
const catalog = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/catalogs/v1/organizations/${orgId}/catalogs/${catalogId}`,
    {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    }
).then(r => r.json());
```

**Required Scopes:**
- Read: `sfcc.catalogs`
- Write: `sfcc.catalogs.rw`

#### Orders API

Retrieve and manage orders.

```javascript
// Get order by number
const order = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${orgId}/orders/${orderNo}?siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    }
).then(r => r.json());

// Update order status
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${orgId}/orders/${orderNo}?siteId=${siteId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: 'completed',
            shippingStatus: 'shipped'
        })
    }
);
```

**Required Scopes:**
- Read: `sfcc.orders`
- Write: `sfcc.orders.rw`

#### Inventory Availability API

Manage product inventory.

```javascript
// Get inventory for a product
const availability = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/inventory/availability/v1/organizations/${orgId}/availability-records/search`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            skus: ['SKU001', 'SKU002'],
            locationIds: ['warehouse-1']
        })
    }
).then(r => r.json());

// Update inventory
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/inventory/availability/v1/organizations/${orgId}/availability-records`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            records: [{
                sku: 'SKU001',
                locationId: 'warehouse-1',
                onHand: 100,
                effectiveDate: new Date().toISOString()
            }]
        })
    }
);
```

**Required Scopes:**
- Read: `sfcc.inventory.availability`
- Write: `sfcc.inventory.availability.rw`

#### Inventory IMPEX API

High-performance bulk inventory import. Use for 1000+ SKU updates.

**Critical Requirements:**
- Files > 100MB **MUST** be gzip compressed
- Use newline-delimited JSON (NDJSON), not comma-separated arrays
- Don't run imports during location graph changes
- Use delta imports (changed data only) for best performance
- Future quantity values must be > 0

```javascript
// Step 1: Initiate import
const importJob = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/inventory/impex/v1/organizations/${orgId}/availability-records/imports`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }
).then(r => r.json());

// Step 2: Prepare newline-delimited JSON
const ndjsonData = inventoryRecords
    .map(r => JSON.stringify({
        recordId: r.recordId || crypto.randomUUID(),
        sku: r.sku,
        locationId: r.locationId,
        onHand: r.quantity,
        effectiveDate: new Date().toISOString()
    }))
    .join('\n');

// Step 3: Upload data to the uploadLink
await fetch(importJob.uploadLink, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: ndjsonData
});

// Step 4: Monitor status
const status = await fetch(importJob.importStatusLink, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
}).then(r => r.json());
```

**Required Scope:** `sfcc.inventory.impex-inventory`

**Note:** Inventory IMPEX logs don't appear in Log Center. Use correlation IDs and monitor import status directly.

See [Integration Patterns Reference](references/INTEGRATION-PATTERNS.md) for bulk import best practices.

#### Customers API

Manage customer data.

```javascript
// Search customers
const customers = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/${orgId}/customer-search?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: {
                textQuery: { fields: ['email'], searchPhrase: 'john@example.com' }
            }
        })
    }
).then(r => r.json());
```

**Required Scopes:**
- Read: `sfcc.shopper-customers`
- Write: `sfcc.shopper-customers.rw`

#### Promotions API

Manage promotions and campaigns.

```javascript
// Get promotion
const promotion = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/pricing/promotions/v1/organizations/${orgId}/promotions/${promotionId}?siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    }
).then(r => r.json());

// Update promotion
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/pricing/promotions/v1/organizations/${orgId}/promotions/${promotionId}?siteId=${siteId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            enabled: true,
            startDate: '2024-06-01T00:00:00Z',
            endDate: '2024-06-30T23:59:59Z'
        })
    }
);
```

**Required Scopes:**
- Read: `sfcc.promotions`
- Write: `sfcc.promotions.rw`

### Request Tracking

#### Correlation IDs

Include correlation IDs for tracking requests across systems:

```javascript
const correlationId = crypto.randomUUID();

const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'correlation-id': correlationId
    }
});

console.log(`Request ${correlationId} completed`);
// Search Log Center: externalID:({correlationId})
```

#### Verbose Logging

Enable verbose logging for debugging:

```javascript
const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${adminToken}`,
        'sfdc_verbose': 'true'
    }
});
```

Check Log Center under `scapi.verbose` category.

**Note:** Some Admin APIs (CDN Zones, Inventory, Shopper Context) don't log to Log Center.

### Error Handling

#### Common Errors

| Status | Meaning | Action |
|--------|---------|--------|
| 400 | Bad Request | Check request body/parameters |
| 401 | Unauthorized | Token expired - get new token |
| 403 | Forbidden | Missing scope or tenant access |
| 404 | Not Found | Resource doesn't exist |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Retry with backoff |
| 504 | Timeout | Request took > 60 seconds |

#### Rate Limiting

Admin APIs have lower rate limits than Shopper APIs. For bulk operations:

- Use batch endpoints when available
- Implement exponential backoff for 429 responses
- Consider inventory IMPEX for large data imports
- Spread operations over time for non-urgent updates

### Related Skills

- [b2c-config](../../b2c-cli/skills/b2c-config/SKILL.md) - Get admin tokens via CLI
- [b2c-scapi-shopper](../b2c-scapi-shopper/SKILL.md) - Shopper-facing APIs
- [b2c-scapi-schemas](../../b2c-cli/skills/b2c-scapi-schemas/SKILL.md) - Browse OpenAPI schemas

### Reference Documentation

- [OAuth Scopes Reference](references/OAUTH-SCOPES.md) - Complete admin scope reference
- [Integration Patterns](references/INTEGRATION-PATTERNS.md) - ETL, sync, and bulk import patterns

### Reference: INTEGRATION-PATTERNS.md

#### Integration Patterns Reference

Common patterns for integrating with Admin APIs, including ETL workflows, data synchronization, and bulk operations.

##### Inventory Sync Pattern

###### Real-Time Inventory Updates

For small, frequent updates (< 100 SKUs):

```javascript
async function updateInventory(records) {
    const adminToken = await getAdminToken();

    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/inventory/availability/v1/organizations/${orgId}/availability-records`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json',
                'correlation-id': crypto.randomUUID()
            },
            body: JSON.stringify({
                records: records.map(r => ({
                    recordId: r.recordId || crypto.randomUUID(),
                    sku: r.sku,
                    locationId: r.locationId,
                    onHand: r.quantity,
                    effectiveDate: new Date().toISOString()
                }))
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Inventory update failed: ${response.status}`);
    }

    return response.json();
}
```

###### Bulk Inventory Import (IMPEX)

For large updates (1000+ SKUs), use the high-performance import process:

```javascript
async function bulkInventoryImport(inventoryData) {
    const adminToken = await getAdminToken();

    // Step 1: Initiate import job
    const initResponse = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/inventory/impex/v1/organizations/${orgId}/availability-records/imports`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            }
        }
    ).then(r => r.json());

    // Step 2: Prepare newline-delimited JSON
    const ndjsonData = inventoryData
        .map(item => JSON.stringify({
            recordId: item.recordId || crypto.randomUUID(),
            sku: item.sku,
            locationId: item.locationId,
            onHand: item.quantity,
            effectiveDate: new Date().toISOString(),
            safetyStockCount: item.safetyStock || 0
        }))
        .join('\n');

    // Step 3: Upload data
    await fetch(initResponse.uploadLink, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ndjsonData
    });

    // Step 4: Poll for completion
    return pollImportStatus(initResponse.importStatusLink, adminToken);
}

async function pollImportStatus(statusUrl, token, maxAttempts = 30) {
    for (let i = 0; i < maxAttempts; i++) {
        const status = await fetch(statusUrl, {
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(r => r.json());

        if (status.status === 'COMPLETED') {
            return status;
        }

        if (status.status === 'FAILED') {
            throw new Error(`Import failed: ${status.errorMessage}`);
        }

        // Wait 2 seconds between polls
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    throw new Error('Import timed out');
}
```

###### Best Practices for Inventory IMPEX

- Files > 100MB must be gzip compressed
- Use delta imports (changed data only), not full exports
- Theoretical limit: ~50 requests/second per SKU/location
- Reuse `recordId` for updates (idempotent)
- Include `externalRefId` for linking to external systems

##### Order Export Pattern

###### Polling for New Orders

```javascript
async function pollOrders(lastExportTime) {
    const adminToken = await getAdminToken();

    // Search for orders modified since last export
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${orgId}/order-search?siteId=${siteId}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: {
                    filteredQuery: {
                        query: { matchAllQuery: {} },
                        filter: {
                            range: {
                                field: 'lastModified',
                                from: lastExportTime.toISOString()
                            }
                        }
                    }
                },
                sorts: [{ field: 'lastModified', sortOrder: 'asc' }],
                select: '(orderNo,status,lastModified,productItems,shipments,totals)'
            })
        }
    ).then(r => r.json());

    return response.hits;
}

// Export loop
async function orderExportLoop() {
    let lastExportTime = await getLastExportTime(); // From your persistence

    setInterval(async () => {
        try {
            const orders = await pollOrders(lastExportTime);

            for (const order of orders) {
                await exportOrderToOMS(order);
                lastExportTime = new Date(order.lastModified);
            }

            await saveLastExportTime(lastExportTime);
        } catch (error) {
            console.error('Order export failed:', error);
        }
    }, 60000); // Poll every minute
}
```

###### Order Status Updates

Update orders from fulfillment system:

```javascript
async function updateOrderStatus(orderNo, status, trackingInfo) {
    const adminToken = await getAdminToken();

    await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/checkout/orders/v1/organizations/${orgId}/orders/${orderNo}?siteId=${siteId}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: status,
                shippingStatus: trackingInfo ? 'shipped' : 'notShipped',
                c_trackingNumber: trackingInfo?.trackingNumber,
                c_carrier: trackingInfo?.carrier
            })
        }
    );
}
```

##### Product Sync Pattern

###### Delta Product Updates

```javascript
async function syncProducts(products) {
    const adminToken = await getAdminToken();
    const results = { success: 0, failed: 0, errors: [] };

    // Process in batches to avoid timeouts
    const batches = chunk(products, 50);

    for (const batch of batches) {
        await Promise.all(batch.map(async (product) => {
            try {
                await fetch(
                    `https://${shortCode}.api.commercecloud.salesforce.com/product/products/v1/organizations/${orgId}/products/${product.id}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${adminToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: { default: product.name },
                            shortDescription: { default: product.description },
                            c_brand: product.brand,
                            c_customAttr: product.customValue
                        })
                    }
                );
                results.success++;
            } catch (error) {
                results.failed++;
                results.errors.push({ productId: product.id, error: error.message });
            }
        }));

        // Rate limit protection
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return results;
}

function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size)
    );
}
```

##### Customer Data Sync Pattern

###### Export Customers to CRM

```javascript
async function exportCustomersToCRM(lastSyncTime) {
    const adminToken = await getAdminToken();

    let offset = 0;
    const pageSize = 100;
    let hasMore = true;

    while (hasMore) {
        const response = await fetch(
            `https://${shortCode}.api.commercecloud.salesforce.com/customer/customers/v1/organizations/${orgId}/customer-search?siteId=${siteId}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: {
                        filteredQuery: {
                            query: { matchAllQuery: {} },
                            filter: {
                                range: {
                                    field: 'lastModified',
                                    from: lastSyncTime.toISOString()
                                }
                            }
                        }
                    },
                    offset: offset,
                    limit: pageSize
                })
            }
        ).then(r => r.json());

        for (const customer of response.hits) {
            await sendToCRM(customer);
        }

        offset += pageSize;
        hasMore = response.hits.length === pageSize;
    }
}
```

##### Error Handling Pattern

###### Retry with Exponential Backoff

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (response.ok) {
                return response;
            }

            // Retry on rate limit or server errors
            if (response.status === 429 || response.status >= 500) {
                const delay = Math.pow(2, attempt) * 1000;
                console.log(`Retry ${attempt + 1}/${maxRetries} after ${delay}ms`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }

            // Don't retry client errors
            throw new Error(`Request failed: ${response.status}`);
        } catch (error) {
            if (attempt === maxRetries - 1) throw error;
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}
```

###### Dead Letter Queue Pattern

For failed records that need manual review:

```javascript
async function processWithDLQ(records, processor) {
    const results = { processed: 0, failed: [] };

    for (const record of records) {
        try {
            await processor(record);
            results.processed++;
        } catch (error) {
            results.failed.push({
                record: record,
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Send failed records to DLQ
    if (results.failed.length > 0) {
        await sendToDLQ(results.failed);
        console.log(`${results.failed.length} records sent to DLQ`);
    }

    return results;
}
```

##### Token Management Pattern

###### Automatic Token Refresh

```javascript
class AdminAPIClient {
    constructor(clientId, clientSecret, tenantId, scopes) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.tenantId = tenantId;
        this.scopes = scopes;
        this.token = null;
        this.tokenExpiry = 0;
    }

    async getToken() {
        const now = Date.now();

        // Refresh token 60 seconds before expiry
        if (this.token && this.tokenExpiry > now + 60000) {
            return this.token;
        }

        const response = await fetch('https://account.demandware.com/dwsso/oauth2/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(this.clientId + ':' + this.clientSecret)}`
            },
            body: `grant_type=client_credentials&scope=SALESFORCE_COMMERCE_API:${this.tenantId} ${this.scopes}`
        });

        const data = await response.json();
        this.token = data.access_token;
        this.tokenExpiry = now + (data.expires_in * 1000);

        return this.token;
    }

    async fetch(url, options = {}) {
        const token = await this.getToken();

        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

// Usage
const client = new AdminAPIClient(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'zzte_053',
    'sfcc.orders sfcc.products.rw'
);

const orders = await client.fetch(`${baseUrl}/orders/search`, {
    method: 'POST',
    body: JSON.stringify({ query: { matchAllQuery: {} } })
}).then(r => r.json());
```

##### Monitoring Pattern

###### Request Logging

```javascript
async function loggedFetch(url, options, context = {}) {
    const correlationId = crypto.randomUUID();
    const startTime = Date.now();

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'correlation-id': correlationId
            }
        });

        const duration = Date.now() - startTime;

        console.log(JSON.stringify({
            type: 'api_call',
            correlationId,
            url: url.split('?')[0], // Remove query params for logging
            method: options.method || 'GET',
            status: response.status,
            duration,
            ...context
        }));

        return response;
    } catch (error) {
        const duration = Date.now() - startTime;

        console.error(JSON.stringify({
            type: 'api_error',
            correlationId,
            url: url.split('?')[0],
            method: options.method || 'GET',
            error: error.message,
            duration,
            ...context
        }));

        throw error;
    }
}
```

##### Scheduling Best Practices

###### Spread Load Over Time

```javascript
// Bad - all updates at once
await Promise.all(products.map(p => updateProduct(p)));

// Good - staggered updates
for (const product of products) {
    await updateProduct(product);
    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms between calls
}
```

###### Off-Peak Processing

Schedule heavy batch operations during off-peak hours to avoid impacting storefront performance.

###### Idempotency

Design integrations to be idempotent - safe to retry without side effects:

```javascript
// Use recordId for inventory updates (idempotent)
{
    "recordId": "550e8400-e29b-41d4-a716-446655440000", // Same ID = update, not duplicate
    "sku": "SKU001",
    "onHand": 100
}

// Use external reference IDs for order tracking
{
    "externalRefId": "WMS-ORDER-12345"
}
```

### Reference: OAUTH-SCOPES.md

#### Admin API OAuth Scopes Reference

Complete reference for OAuth scopes used with Account Manager for Admin APIs.

##### Scope Format

Admin API scopes follow this pattern:

```
SALESFORCE_COMMERCE_API:{tenant_id} {api_scope_1} {api_scope_2} ...
```

**Example:**
```
SALESFORCE_COMMERCE_API:zzte_053 sfcc.catalogs sfcc.products.rw sfcc.orders
```

###### Scope Suffix Convention

- No suffix = read-only access
- `.rw` suffix = read and write access

```
sfcc.products    # Read only
sfcc.products.rw # Read and write
```

##### Getting Tokens with Scopes

###### Via CLI

```bash
# Get token with specific scopes
b2c auth token --auth-scope sfcc.orders --scope sfcc.products

# Get token with full scope string
b2c auth token --auth-scope "sfcc.orders sfcc.products.rw"
```

###### Via cURL

```bash
curl "https://account.demandware.com/dwsso/oauth2/access_token" \
  -u "$CLIENT_ID:$CLIENT_SECRET" \
  -d "grant_type=client_credentials" \
  --data-urlencode "scope=SALESFORCE_COMMERCE_API:$TENANT_ID sfcc.catalogs sfcc.products.rw"
```

##### Product API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.catalogs` | Catalogs | Read catalogs, categories |
| `sfcc.catalogs.rw` | Catalogs | Create/update/delete catalogs |
| `sfcc.products` | Products | Read products |
| `sfcc.products.rw` | Products | Create/update/delete products |

**Use Cases:**
- Catalog sync from PIM system
- Product data export for analytics
- Bulk product updates

##### Order API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.orders` | Orders | Read orders |
| `sfcc.orders.rw` | Orders | Update order status, shipping |

**Use Cases:**
- Order export to OMS/WMS
- Order status updates from fulfillment
- Order analytics and reporting

##### Inventory API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.inventory.availability` | Availability | Read inventory levels |
| `sfcc.inventory.availability.rw` | Availability | Update inventory |
| `sfcc.inventory.reservations` | Reservations | Read reservations |
| `sfcc.inventory.reservations.rw` | Reservations | Create/update reservations |
| `sfcc.inventory.impex-inventory` | IMPEX | Bulk inventory import (read) |
| `sfcc.inventory.impex-inventory.rw` | IMPEX | Bulk inventory import (write) |
| `sfcc.inventory.impex-graphs` | IMPEX | Location graph exports |

**Use Cases:**
- Real-time inventory sync from WMS
- Bulk inventory file imports
- Stock allocation across channels
- Location graph management

##### Pricing API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.promotions` | Promotions | Read promotions |
| `sfcc.promotions.rw` | Promotions | Create/update promotions |
| `sfcc.gift-certificates` | Gift Certificates | Read gift certificates |
| `sfcc.gift-certificates.rw` | Gift Certificates | Manage gift certificates |
| `sfcc.source-codes` | Source Codes | Read source code groups |
| `sfcc.source-codes.rw` | Source Codes | Manage source code groups |

**Use Cases:**
- Promotion data export
- Dynamic promotion creation
- Campaign management integration
- Gift certificate management

##### Customer Management Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.shopper-customers` | Customers | Read customer data |
| `sfcc.shopper-customers.rw` | Customers | Create/update customer profiles |
| `sfcc.consents` | Consents | Read customer consent preferences |
| `sfcc.consents.rw` | Consents | Manage consent preferences |
| `sfcc.customergroups` | Customer Groups | Read customer groups |
| `sfcc.customergroups.rw` | Customer Groups | Manage customer groups |
| `sfcc.customerlists` | Customer Lists | Read customer lists |
| `sfcc.customerlists.rw` | Customer Lists | Manage customer lists |

**Use Cases:**
- Customer data sync to CRM
- Customer profile enrichment
- Consent management (GDPR/CCPA)
- Customer segmentation

##### Configuration Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.cors-preferences` | CORS | Read CORS configuration |
| `sfcc.cors-preferences.rw` | CORS | Manage CORS settings |
| `sfcc.preferences` | Preferences | Read site preferences |
| `sfcc.timeouts` | Timeouts | Read timeout configuration |
| `sfcc.timeouts.rw` | Timeouts | Manage timeout settings |

**Use Cases:**
- Automated configuration management
- CI/CD pipeline configuration

##### Experience Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.experiences.rw` | Experiences | Manage merchandiser experiences |

**Use Cases:**
- Experience/campaign management
- A/B testing automation

##### CDN API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.cdn-zones` | CDN Zones | Read CDN configuration |
| `sfcc.cdn-zones.rw` | CDN Zones | Configure CDN zones |

**Use Cases:**
- CDN configuration automation
- Certificate management
- WAF rule management

##### Developer API Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.custom-apis` | Custom APIs | Read custom API status |
| `sfcc.custom-apis.rw` | Custom APIs | Manage custom API registration |
| `sfcc.scapi-schemas` | SCAPI Schemas | Read SCAPI schema registry |

**Use Cases:**
- Check custom API deployment status
- Automated deployment pipelines
- Schema discovery and documentation

##### SLAS Admin Scopes

| Scope | API Family | Access Level |
|-------|------------|--------------|
| `sfcc.slas-admin` | SLAS Admin | Read SLAS configuration |
| `sfcc.slas-admin.rw` | SLAS Admin | Manage SLAS clients |

**Use Cases:**
- Automated SLAS client provisioning
- Client configuration management

##### Recommended Scope Sets

###### Order Management Integration

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.orders.rw sfcc.inventory.availability.rw
```

###### Catalog/Product Sync

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.catalogs.rw sfcc.products.rw
```

###### Inventory Sync

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.inventory.availability.rw sfcc.inventory.impex-inventory
```

###### Customer Data Sync

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.shopper-customers.rw sfcc.orders
```

###### Read-Only Analytics/Reporting

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.orders sfcc.products sfcc.shopper-customers
```

###### Full Admin Access

```
SALESFORCE_COMMERCE_API:{tenant_id} sfcc.catalogs.rw sfcc.products.rw sfcc.orders.rw sfcc.inventory.availability.rw sfcc.promotions.rw sfcc.shopper-customers.rw
```

##### Best Practices

###### Principle of Least Privilege

Request only the scopes your integration needs:

```bash
# Bad - too broad
b2c auth token --auth-scope "sfcc.catalogs.rw sfcc.products.rw sfcc.orders.rw sfcc.inventory.availability.rw"

# Good - only what's needed for order export
b2c auth token --auth-scope sfcc.orders
```

###### Separate Clients for Different Integrations

Create dedicated API clients for different systems:

| Integration | Client | Scopes |
|-------------|--------|--------|
| PIM Sync | `pim-integration` | `sfcc.products.rw sfcc.catalogs.rw` |
| OMS Sync | `oms-integration` | `sfcc.orders.rw` |
| WMS Sync | `wms-integration` | `sfcc.inventory.availability.rw` |

###### Token Caching

Admin tokens are valid for ~30 minutes. Cache and reuse:

```javascript
let tokenCache = null;
let tokenExpiry = 0;

async function getAdminToken() {
    const now = Date.now();

    // Return cached token if still valid (with 60s buffer)
    if (tokenCache && tokenExpiry > now + 60000) {
        return tokenCache;
    }

    const response = await fetch('https://account.demandware.com/dwsso/oauth2/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
        },
        body: `grant_type=client_credentials&scope=SALESFORCE_COMMERCE_API:${tenantId} ${scopes}`
    });

    const data = await response.json();
    tokenCache = data.access_token;
    tokenExpiry = now + (data.expires_in * 1000);

    return tokenCache;
}
```

###### Audit Scope Usage

Periodically review what scopes are actually being used:

```javascript
// Decode token to see granted scopes
const tokenParts = adminToken.split('.');
const payload = JSON.parse(atob(tokenParts[1]));
console.log('Granted scopes:', payload.scope);
```

##### Scope Errors

###### 403 Forbidden - Missing Scope

```json
{
    "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/forbidden",
    "title": "Forbidden",
    "detail": "Access denied. Missing required scope: sfcc.orders.rw"
}
```

**Solution:** Add the missing scope to your token request.

###### 403 Forbidden - Missing Tenant Scope

```json
{
    "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/forbidden",
    "title": "Forbidden",
    "detail": "Access denied for organization f_ecom_zzte_053"
}
```

**Solution:** Include `SALESFORCE_COMMERCE_API:{tenant_id}` in your scope request.

###### Invalid Scope Error

```json
{
    "error": "invalid_scope",
    "error_description": "One or more scopes are invalid: sfcc.invalid-scope"
}
```

**Solution:** Check scope name spelling and remove invalid scopes.

---


<a id="b2c-scapi-shopper"></a>
## b2c-scapi-shopper

**When to use:** Consume standard Shopper Commerce APIs (SCAPI) for headless storefronts. Use when building PWA/composable commerce, accessing products, search, baskets, orders, or customer data via SCAPI. Covers authentication with SLAS, checkout flows, performance optimization, and Shopper Context API.

## Shopper Commerce APIs (SCAPI)

This skill guides you through consuming standard Shopper APIs for building headless commerce experiences. Shopper APIs are RESTful endpoints designed for customer-facing storefronts.

> **Note:** For **creating** custom API endpoints, see [b2c-custom-api-development](../b2c-custom-api-development/SKILL.md). This skill focuses on **consuming** standard Shopper APIs.

### Overview

Shopper APIs are designed for frontend commerce applications:

- **Client**: PWA Kit, composable storefronts, mobile apps
- **Authentication**: SLAS (Shopper Login and API Access Service)
- **Response Time**: < 10 seconds (HTTP 504 if exceeded)
- **CORS**: Not supported - use a reverse proxy or BFF (Backend for Frontend)

#### Base URL Structure

```
https://{shortCode}.api.commercecloud.salesforce.com/{apiFamily}/{apiName}/v1/organizations/{organizationId}/{resource}?siteId={siteId}
```

Example:
```
https://kv7kzm78.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/f_ecom_zzte_053/products/25518823M?siteId=RefArchGlobal
```

**Note:** Shopper Baskets API supports both `v1` and `v2`. Use `v2` for newer features.

#### Configuration Values

| Value | Description | Example |
|-------|-------------|---------|
| `shortCode` | 8-character API routing code | `kv7kzm78` |
| `organizationId` | Instance identifier | `f_ecom_zzte_053` |
| `siteId` | Site/channel name | `RefArchGlobal` |

Find these in Business Manager: **Administration > Site Development > Salesforce Commerce API Settings**

### Authentication

Shopper APIs require SLAS tokens. SLAS supports guest and registered shopper flows.

#### Create SLAS Client

```bash
# Create client with default scopes for a shopping app
b2c slas client create \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --default-scopes \
  --redirect-uri http://localhost:3000/callback
```

See [b2c-slas skill](../../b2c-cli/skills/b2c-slas/SKILL.md) for full client management.

#### Get Guest Token

```javascript
const response = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/token`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            channel_id: siteId
        })
    }
);

const { access_token, refresh_token } = await response.json();
```

#### Required Scopes

All Shopper API scopes must be configured on your SLAS client. See [Scopes Reference](references/SCOPES.md) for the complete list.

| API Family | Scope |
|------------|-------|
| Products | `sfcc.shopper-products` |
| Search | `sfcc.shopper-product-search` |
| Baskets | `sfcc.shopper-baskets-orders.rw` |
| Orders | `sfcc.shopper-baskets-orders` |
| Customers | `sfcc.shopper-customers.login`, `sfcc.shopper-myaccount.rw` |

### API Families

#### Shopper Products

Retrieve product details, pricing, and availability.

```javascript
// Get product by ID
const product = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/${orgId}/products/${productId}?siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());

// Get multiple products
const products = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/${orgId}/products?ids=prod1,prod2,prod3&siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());
```

#### Shopper Search

Product search and suggestions.

```javascript
// Search products
const results = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/${orgId}/product-search?siteId=${siteId}&q=shirt&limit=25`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());

// Get search suggestions
const suggestions = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/search/shopper-search/v1/organizations/${orgId}/search-suggestions?siteId=${siteId}&q=shi`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());
```

#### Shopper Baskets

Create and manage shopping carts. See [Checkout Flow Reference](references/CHECKOUT-FLOW.md) for the complete flow.

```javascript
// Create basket
const basket = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }
).then(r => r.json());

// Add item to basket
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/items?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            productId: '25518823M',
            quantity: 1
        }])
    }
);
```

#### Shopper Orders

Submit orders and retrieve order history.

```javascript
// Create order from basket
const order = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-orders/v1/organizations/${orgId}/orders?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            basketId: basket.basketId
        })
    }
).then(r => r.json());
```

#### Shopper Customers

Customer registration, login, and account management.

```javascript
// Get customer profile (registered shopper)
const customer = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/customer/shopper-customers/v1/organizations/${orgId}/customers/${customerId}?siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());
```

### Shopper Context API

Maintain personalization state across requests using the Shopper Context API. The `siteId` query parameter is **required** for all Shopper Context operations.

```javascript
// Set shopper context
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/shopper/shopper-context/v1/organizations/${orgId}/shopper-context/${usid}?siteId=${siteId}`,
    {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            effectiveDateTime: new Date().toISOString(),
            sourceCode: 'SUMMER2024',
            customerGroupIds: ['VIP', 'Loyalty']
        })
    }
);
```

#### When to Set Context

- **Initial visit/login**: Immediately after obtaining SLAS token
- **Token refresh**: Reuse existing USID for session continuity
- **Login transitions**: When shopper changes from guest to registered (or vice versa)
- **Logout**: Clear context explicitly

#### Quota Limits

| Environment | Limit |
|-------------|-------|
| Non-production | 5,000 records |
| Production | 1,000,000 records |

**Strategies to manage quota:**
- Use lower TTL (1-2 days for registered shoppers)
- Reuse USIDs for the same shopper
- Explicitly log out shoppers to delete context

#### Best Practices

- Set context immediately after obtaining SLAS token
- Use the USID from the SLAS token response
- Context TTL: 1 day (guest), 7 days (registered)
- **Security**: Use private SLAS clients only, call from BFF (not browser)
- Don't use Shopper Context for data that's automatically set (like geolocation)

### Performance Optimization

#### Use `select` Parameter

Return only needed fields to reduce response size:

```javascript
// Only return specific product fields
const product = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/product/shopper-products/v1/organizations/${orgId}/products/${productId}?siteId=${siteId}&select=(id,name,price,images)`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());
```

#### Use `expand` Carefully

Expansions increase response time and reduce cache effectiveness:

```javascript
// Expand availability (60-second cache TTL)
const product = await fetch(
    `...?expand=availability,images,prices`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
).then(r => r.json());
```

Consider separate requests instead of low-cache expansions.

#### Enable Compression

Always enable HTTP compression in your client for faster responses.

See [Common Patterns Reference](references/COMMON-PATTERNS.md) for more optimization patterns.

### Debugging

#### Correlation IDs

Include correlation IDs for request tracking:

```javascript
const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'correlation-id': crypto.randomUUID()
    }
});

// Check response header for SCAPI-generated ID
const scapiCorrelationId = response.headers.get('sfdc_correlation_id');
```

Search Log Center with: `externalID:({correlation-id})`

#### Verbose Logging

Enable verbose logging for debugging:

```javascript
const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'sfdc_verbose': 'true'
    }
});
```

Find logs in Log Center under `scapi.verbose` category.

### Related Skills

- [b2c-slas](../../b2c-cli/skills/b2c-slas/SKILL.md) - Create and manage SLAS clients
- [b2c-slas-auth-patterns](../b2c-slas-auth-patterns/SKILL.md) - Advanced auth: OTP, passkeys, session bridge
- [b2c-scapi-schemas](../../b2c-cli/skills/b2c-scapi-schemas/SKILL.md) - Browse OpenAPI schemas
- [b2c-custom-api-development](../b2c-custom-api-development/SKILL.md) - Create custom endpoints

### Reference Documentation

- [Checkout Flow](references/CHECKOUT-FLOW.md) - Complete basket to order workflow
- [Common Patterns](references/COMMON-PATTERNS.md) - Error handling, pagination, field selection
- [Scopes Reference](references/SCOPES.md) - Complete shopper scope reference by API family

### Reference: CHECKOUT-FLOW.md

#### Checkout Flow Reference

Complete basket-to-order workflow using Shopper APIs.

##### Flow Overview

```
1. Create Basket
2. Add Items
3. Set Customer Info
4. Set Shipping Address
5. Select Shipping Method
6. Add Payment Instrument
7. Submit Order
```

##### Prerequisites

- SLAS access token with `sfcc.shopper-baskets-orders.rw` scope
- `siteId` query parameter on all requests

##### Step 1: Create Basket

```javascript
const basket = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }
).then(r => r.json());

// Store basketId for subsequent requests
const { basketId } = basket;
```

##### Step 2: Add Items

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/items?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([
            { productId: '25518823M', quantity: 2 },
            { productId: '25519318M', quantity: 1 }
        ])
    }
);
```

###### Update Item Quantity

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/items/${itemId}?siteId=${siteId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: 3 })
    }
);
```

###### Remove Item

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/items/${itemId}?siteId=${siteId}`,
    { method: 'DELETE', headers: { 'Authorization': `Bearer ${accessToken}` } }
);
```

##### Step 3: Set Customer Info

For guest checkout:

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/customer?siteId=${siteId}`,
    {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: 'customer@example.com'
        })
    }
);
```

##### Step 4: Set Shipping Address

All baskets have a default shipment with ID `"me"`. Set the shipping address on this shipment:

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/shipments/me?siteId=${siteId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingAddress: {
                firstName: 'John',
                lastName: 'Doe',
                address1: '123 Main St',
                city: 'San Francisco',
                stateCode: 'CA',
                postalCode: '94105',
                countryCode: 'US',
                phone: '415-555-1234'
            }
        })
    }
);
```

##### Step 5: Get and Select Shipping Method

###### Get Available Shipping Methods

```javascript
const methods = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/shipments/me/shipping-methods?siteId=${siteId}`,
    {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    }
).then(r => r.json());

// methods.applicableShippingMethods contains available options
```

###### Set Shipping Method

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/shipments/me?siteId=${siteId}`,
    {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            shippingMethod: { id: 'standard-shipping' }
        })
    }
);
```

##### Step 6: Add Payment Instrument

**Important:** Never pass raw credit card data to B2C Commerce. Use tokenized payment data from your payment provider.

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/payment-instruments?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            paymentMethodId: 'CREDIT_CARD',
            paymentCard: {
                // Use tokenized data from payment provider
                cardType: 'Visa',
                maskedNumber: '************1111',
                expirationMonth: 12,
                expirationYear: 2025,
                holder: 'John Doe'
            },
            // Payment provider token reference
            c_paymentToken: 'tok_xyz123'
        })
    }
);
```

###### Set Billing Address

If different from shipping:

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/billing-address?siteId=${siteId}`,
    {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: 'John',
            lastName: 'Doe',
            address1: '456 Billing St',
            city: 'San Francisco',
            stateCode: 'CA',
            postalCode: '94105',
            countryCode: 'US'
        })
    }
);
```

##### Step 7: Submit Order

```javascript
const order = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-orders/v1/organizations/${orgId}/orders?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            basketId: basketId
        })
    }
).then(r => r.json());

// order.orderNo contains the order confirmation number
console.log(`Order created: ${order.orderNo}`);
```

##### Single-Request Basket Creation

For simpler flows, create a fully populated basket in one request:

```javascript
const basket = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerInfo: {
                email: 'customer@example.com'
            },
            productItems: [
                { productId: '25518823M', quantity: 1 }
            ],
            shipments: [{
                id: 'me',
                shippingAddress: {
                    firstName: 'John',
                    lastName: 'Doe',
                    address1: '123 Main St',
                    city: 'San Francisco',
                    stateCode: 'CA',
                    postalCode: '94105',
                    countryCode: 'US'
                },
                shippingMethod: { id: 'standard-shipping' }
            }],
            billingAddress: {
                firstName: 'John',
                lastName: 'Doe',
                address1: '123 Main St',
                city: 'San Francisco',
                stateCode: 'CA',
                postalCode: '94105',
                countryCode: 'US'
            }
        })
    }
).then(r => r.json());
```

##### Multiple Shipments

For orders shipping to multiple addresses, create additional shipments:

```javascript
// Create new shipment
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/shipments?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 'shipment-2',
            shippingAddress: {
                firstName: 'Jane',
                lastName: 'Doe',
                address1: '789 Gift St',
                city: 'Los Angeles',
                stateCode: 'CA',
                postalCode: '90001',
                countryCode: 'US'
            }
        })
    }
);

// Add item to specific shipment
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/items?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{
            productId: '25519318M',
            quantity: 1,
            shipmentId: 'shipment-2'
        }])
    }
);
```

##### Applying Promotions

###### Apply Coupon Code

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/coupons?siteId=${siteId}`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: 'SUMMER20'
        })
    }
);
```

###### Remove Coupon

```javascript
await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}/coupons/${couponItemId}?siteId=${siteId}`,
    { method: 'DELETE', headers: { 'Authorization': `Bearer ${accessToken}` } }
);
```

##### Error Handling

###### Common Basket Errors

| Error | Cause | Solution |
|-------|-------|----------|
| 400 `InvalidBasketId` | Basket expired or doesn't exist | Create new basket |
| 400 `ProductNotAvailable` | Product out of stock | Check availability before adding |
| 400 `InvalidShippingMethod` | Method not applicable | Get fresh shipping methods |
| 400 `InvalidPaymentMethod` | Payment method not supported | Check site payment config |

###### Basket Validation

Before submitting order, check basket for issues:

```javascript
const basket = await fetch(
    `https://${shortCode}.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/${orgId}/baskets/${basketId}?siteId=${siteId}`,
    { headers: { 'Authorization': `Bearer ${accessToken}` } }
).then(r => r.json());

// Check for issues
if (basket.flash && basket.flash.length > 0) {
    console.error('Basket has issues:', basket.flash);
}

// Verify orderability
const orderableItems = basket.productItems.filter(item => item.orderable);
if (orderableItems.length !== basket.productItems.length) {
    console.error('Some items are not orderable');
}
```

### Reference: COMMON-PATTERNS.md

#### Common Patterns Reference

Error handling, pagination, field selection, and other common patterns for Shopper APIs.

##### Response Optimization

###### Field Selection with `select`

Use the `select` parameter to return only needed fields:

```javascript
// Basic selection
GET /products/{id}?select=(id,name,price)

// Nested selection
GET /products/{id}?select=(id,name,images.(link,alt),price)

// Array selection
GET /product-search?q=shirt&select=(hits.(productId,productName,price))
```

**Example:**

```javascript
// Without select - returns full product object (~5KB)
const fullProduct = await fetch(
    `${baseUrl}/products/25518823M?siteId=${siteId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
).then(r => r.json());

// With select - returns only needed fields (~500 bytes)
const miniProduct = await fetch(
    `${baseUrl}/products/25518823M?siteId=${siteId}&select=(id,name,price,primaryCategoryId)`,
    { headers: { 'Authorization': `Bearer ${token}` } }
).then(r => r.json());
```

###### Using `expand` Parameter

Expand related data inline. Use carefully as it impacts caching.

```javascript
// Single expansion
GET /products/{id}?expand=images

// Multiple expansions
GET /products/{id}?expand=availability,images,prices,variations

// Expansion with selection
GET /products/{id}?expand=images&select=(id,name,images)
```

**Cache Impact by Expansion:**

| Expansion | Cache TTL | Recommendation |
|-----------|-----------|----------------|
| `images` | Long | Safe to expand |
| `prices` | Medium | Usually safe |
| `availability` | 60 seconds | Consider separate request |
| `variations` | Long | Can be large response |
| `promotions` | Short | Separate request recommended |

###### Compression

Always enable HTTP compression:

```javascript
const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept-Encoding': 'gzip, deflate'
    }
});
```

##### Pagination

###### Offset-Based Pagination

Most search and list endpoints use offset pagination:

```javascript
// First page
GET /product-search?q=shirt&offset=0&limit=25

// Second page
GET /product-search?q=shirt&offset=25&limit=25

// Third page
GET /product-search?q=shirt&offset=50&limit=25
```

**Example implementation:**

```javascript
async function searchProducts(query, page = 0, pageSize = 25) {
    const response = await fetch(
        `${baseUrl}/product-search?siteId=${siteId}&q=${encodeURIComponent(query)}&offset=${page * pageSize}&limit=${pageSize}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    ).then(r => r.json());

    return {
        products: response.hits,
        total: response.total,
        hasMore: (page * pageSize) + response.hits.length < response.total,
        currentPage: page,
        totalPages: Math.ceil(response.total / pageSize)
    };
}
```

###### Response Metadata

Search responses include pagination info:

```json
{
    "limit": 25,
    "offset": 0,
    "total": 156,
    "hits": [...]
}
```

##### Error Handling

###### Error Response Format

SCAPI returns errors in RFC 9457 format:

```json
{
    "type": "https://api.commercecloud.salesforce.com/documentation/error/v1/errors/invalid-request",
    "title": "Invalid Request",
    "detail": "The product ID '12345' was not found.",
    "instance": "/product/shopper-products/v1/organizations/f_ecom_zzbc_001/products/12345"
}
```

###### Common HTTP Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| 200 | Success | Process response |
| 400 | Bad Request | Check request parameters |
| 401 | Unauthorized | Refresh token |
| 403 | Forbidden | Check scopes |
| 404 | Not Found | Resource doesn't exist |
| 429 | Rate Limited | Implement backoff |
| 500 | Server Error | Retry with backoff |
| 504 | Timeout | Request took > 10 seconds |

###### Error Handling Pattern

```javascript
async function callShopperAPI(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            ...options.headers
        }
    });

    if (!response.ok) {
        const error = await response.json();

        switch (response.status) {
            case 401:
                // Token expired - refresh and retry
                await refreshToken();
                return callShopperAPI(url, options);

            case 429:
                // Rate limited - exponential backoff
                const retryAfter = response.headers.get('Retry-After') || 1;
                await sleep(retryAfter * 1000);
                return callShopperAPI(url, options);

            case 404:
                // Resource not found
                return null;

            default:
                throw new ShopperAPIError(error.title, error.detail, response.status);
        }
    }

    return response.json();
}

class ShopperAPIError extends Error {
    constructor(title, detail, status) {
        super(`${title}: ${detail}`);
        this.name = 'ShopperAPIError';
        this.status = status;
        this.title = title;
        this.detail = detail;
    }
}
```

###### Retry with Exponential Backoff

```javascript
async function fetchWithRetry(url, options, maxRetries = 3) {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (response.status === 429 || response.status >= 500) {
                const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
                await sleep(delay);
                continue;
            }

            return response;
        } catch (error) {
            if (attempt === maxRetries - 1) throw error;
            const delay = Math.pow(2, attempt) * 1000;
            await sleep(delay);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
```

##### URL Encoding

###### Special Characters

Double-encode special characters in path parameters:

```javascript
// Product ID with special characters
const productId = 'PROD/123+456';
const encodedId = encodeURIComponent(encodeURIComponent(productId));
// Result: PROD%252F123%252B456

const url = `${baseUrl}/products/${encodedId}?siteId=${siteId}`;
```

###### Query Parameters

Single-encode query parameter values:

```javascript
const searchQuery = 'men\'s shirts & accessories';
const url = `${baseUrl}/product-search?q=${encodeURIComponent(searchQuery)}&siteId=${siteId}`;
```

##### Caching Strategies

###### Client-Side Caching

Implement client-side caching for frequently accessed data:

```javascript
const cache = new Map();
const CACHE_TTL = {
    products: 5 * 60 * 1000,      // 5 minutes
    categories: 15 * 60 * 1000,   // 15 minutes
    search: 2 * 60 * 1000         // 2 minutes
};

async function getProduct(productId) {
    const cacheKey = `product:${productId}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL.products) {
        return cached.data;
    }

    const product = await fetch(
        `${baseUrl}/products/${productId}?siteId=${siteId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
    ).then(r => r.json());

    cache.set(cacheKey, { data: product, timestamp: Date.now() });
    return product;
}
```

###### CDN Cache Headers

Shopper APIs return cache headers. Respect them for upstream caching:

```javascript
const response = await fetch(url, options);
const cacheControl = response.headers.get('Cache-Control');
const etag = response.headers.get('ETag');

// Use ETag for conditional requests
const conditionalResponse = await fetch(url, {
    ...options,
    headers: {
        ...options.headers,
        'If-None-Match': etag
    }
});

if (conditionalResponse.status === 304) {
    // Use cached version
}
```

##### Request Batching

###### Multiple Products

Fetch multiple products in one request:

```javascript
// Instead of multiple calls
const product1 = await getProduct('prod1');
const product2 = await getProduct('prod2');
const product3 = await getProduct('prod3');

// Use batch endpoint
const products = await fetch(
    `${baseUrl}/products?ids=prod1,prod2,prod3&siteId=${siteId}`,
    { headers: { 'Authorization': `Bearer ${token}` } }
).then(r => r.json());
```

###### Parallel Requests

Use Promise.all for independent requests:

```javascript
const [products, categories, promotions] = await Promise.all([
    fetch(`${baseUrl}/product-search?q=shirt&siteId=${siteId}`, options).then(r => r.json()),
    fetch(`${baseUrl}/categories/root?siteId=${siteId}`, options).then(r => r.json()),
    fetch(`${baseUrl}/promotions?siteId=${siteId}`, options).then(r => r.json())
]);
```

##### Debugging Requests

###### Include Correlation ID

```javascript
const correlationId = crypto.randomUUID();

const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'correlation-id': correlationId
    }
});

console.log(`Request ${correlationId} - Status: ${response.status}`);
// Search Log Center: externalID:({correlationId})
```

###### Verbose Logging

Enable for debugging only (not production):

```javascript
const response = await fetch(url, {
    headers: {
        'Authorization': `Bearer ${token}`,
        'sfdc_verbose': 'true'
    }
});

// Check scapi.verbose category in Log Center
```

###### Log Request/Response

```javascript
async function debugFetch(url, options) {
    const startTime = Date.now();
    console.log(`[API] ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, options);
    const duration = Date.now() - startTime;

    console.log(`[API] ${response.status} ${response.statusText} (${duration}ms)`);
    console.log(`[API] correlation-id: ${response.headers.get('sfdc_correlation_id')}`);

    return response;
}
```

### Reference: SCOPES.md

#### Shopper API Scopes Reference

Complete reference for OAuth scopes used with SLAS (Shopper Login and API Access Service).

##### Scope Overview

Scopes define what APIs and operations a SLAS client can access. Configure scopes when creating SLAS clients:

```bash
# Create client with specific scopes
b2c slas client create \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --scopes "sfcc.shopper-products,sfcc.shopper-baskets-orders.rw" \
  --redirect-uri http://localhost:3000/callback

# Create client with default scopes (recommended for shopping apps)
b2c slas client create \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --default-scopes \
  --redirect-uri http://localhost:3000/callback
```

##### Scope Categories

###### Product APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-products` | Shopper Products | Read products, prices, images |
| `sfcc.shopper-categories` | Shopper Products | Read categories |

###### Search APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-product-search` | Shopper Search | Product search and suggestions |
| `sfcc.shopper-discovery-search` | Shopper Discovery Search | AI-powered search (Einstein) |

###### Checkout APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-baskets-orders` | Shopper Baskets, Orders | Read baskets and orders |
| `sfcc.shopper-baskets-orders.rw` | Shopper Baskets, Orders | Create/update/delete baskets, create orders |

###### Customer APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-customers.login` | Shopper Customers | Log in shoppers |
| `sfcc.shopper-customers.register` | Shopper Customers | Register new shoppers |
| `sfcc.shopper-myaccount` | Shopper Customers | Read account info |
| `sfcc.shopper-myaccount.rw` | Shopper Customers | Update account info |
| `sfcc.shopper-myaccount.addresses` | Shopper Customers | Read addresses |
| `sfcc.shopper-myaccount.addresses.rw` | Shopper Customers | Manage addresses |
| `sfcc.shopper-myaccount.baskets` | Shopper Customers | Read saved baskets |
| `sfcc.shopper-myaccount.orders` | Shopper Customers | Read order history |
| `sfcc.shopper-myaccount.paymentinstruments` | Shopper Customers | Read payment methods |
| `sfcc.shopper-myaccount.paymentinstruments.rw` | Shopper Customers | Manage payment methods |
| `sfcc.shopper-myaccount.productlists` | Shopper Customers | Read wishlists |
| `sfcc.shopper-myaccount.productlists.rw` | Shopper Customers | Manage wishlists |

###### Pricing APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-promotions` | Shopper Promotions | Read promotions |
| `sfcc.shopper-gift-certificates` | Shopper Gift Certificates | Read/redeem gift certificates |

###### Store APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-stores` | Shopper Stores | Search and read stores |

###### Context APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-context` | Shopper Context | Read shopper context |
| `sfcc.shopper-context.rw` | Shopper Context | Read/write shopper context |

###### Configuration APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-configurations` | Shopper Configurations | Read site configurations |

###### Product Lists APIs

| Scope | API | Access |
|-------|-----|--------|
| `sfcc.shopper-productlists` | Shopper Product Lists | Read product lists |

##### Special Scopes

###### Authentication Scopes

| Scope | Purpose |
|-------|---------|
| `sfcc.pwdless_login` | Enable passwordless email login (OTP) |
| `sfcc.session_bridge` | Enable session bridging between PWA and SFRA |

###### Trusted Agent/System Scopes

| Scope | Purpose |
|-------|---------|
| `sfcc.ta_ext_on_behalf_of` | Trusted agent - act on behalf of shoppers |
| `sfcc.ts_ext_on_behalf_of` | Trusted system - backend service integration |

###### AI Agent Scope

| Scope | Purpose |
|-------|---------|
| `sfcc.shopper-mcpagent` | MCP (Model Context Protocol) agent access |

###### Custom Scopes

Custom APIs define their own scopes with `c_` prefix:

| Scope Pattern | Purpose |
|---------------|---------|
| `c_my_custom_scope` | Custom API endpoint access |

```bash
# Create client with custom scope for Custom API
b2c slas client create \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --default-scopes \
  --scopes "c_loyalty,c_rewards" \
  --redirect-uri http://localhost:3000/callback
```

##### Default Scopes

When using `--default-scopes`, these scopes are automatically included:

```
sfcc.shopper-myaccount
sfcc.shopper-myaccount.rw
sfcc.shopper-myaccount.baskets
sfcc.shopper-myaccount.addresses
sfcc.shopper-myaccount.addresses.rw
sfcc.shopper-myaccount.paymentinstruments
sfcc.shopper-myaccount.paymentinstruments.rw
sfcc.shopper-myaccount.orders
sfcc.shopper-myaccount.productlists
sfcc.shopper-myaccount.productlists.rw
sfcc.shopper-products
sfcc.shopper-productlists
sfcc.shopper-promotions
sfcc.shopper-customers.login
sfcc.shopper-customers.register
sfcc.shopper-stores
sfcc.shopper-baskets-orders
sfcc.shopper-baskets-orders.rw
sfcc.shopper-gift-certificates
sfcc.shopper-product-search
sfcc.shopper-discovery-search
sfcc.shopper-categories
sfcc.shopper-configurations
```

##### Recommended Scope Sets

###### Basic Shopping App (PWA Kit)

Minimum scopes for a typical shopping experience:

```
sfcc.shopper-baskets-orders.rw
sfcc.shopper-categories
sfcc.shopper-customers.login
sfcc.shopper-customers.register
sfcc.shopper-gift-certificates
sfcc.shopper-myaccount.rw
sfcc.shopper-product-search
sfcc.shopper-productlists
sfcc.shopper-products
sfcc.shopper-promotions
sfcc.shopper-stores
```

###### Read-Only Catalog Browser

For content/catalog browsing without checkout:

```
sfcc.shopper-products
sfcc.shopper-categories
sfcc.shopper-product-search
sfcc.shopper-promotions
sfcc.shopper-stores
```

###### Guest Checkout Only

For sites without customer registration:

```
sfcc.shopper-products
sfcc.shopper-categories
sfcc.shopper-product-search
sfcc.shopper-baskets-orders.rw
sfcc.shopper-promotions
sfcc.shopper-gift-certificates
```

###### Full Customer Experience

Complete scope set for registered customer features:

```
sfcc.shopper-products
sfcc.shopper-categories
sfcc.shopper-product-search
sfcc.shopper-baskets-orders.rw
sfcc.shopper-customers.login
sfcc.shopper-customers.register
sfcc.shopper-myaccount.rw
sfcc.shopper-myaccount.addresses.rw
sfcc.shopper-myaccount.paymentinstruments.rw
sfcc.shopper-myaccount.productlists.rw
sfcc.shopper-promotions
sfcc.shopper-gift-certificates
sfcc.shopper-stores
```

##### Best Practices

###### Minimize Scope Set

Only include scopes your application actually needs:
- Smaller scope set = smaller token = faster cookie/header transmission
- Reduces attack surface if token is compromised
- Easier to audit API access

###### Avoid Redundant Scopes

Don't include both read and read/write scopes:

```bash
# Bad - redundant
--scopes "sfcc.shopper-myaccount,sfcc.shopper-myaccount.rw"

# Good - just use the .rw scope
--scopes "sfcc.shopper-myaccount.rw"
```

###### Separate Clients for Different Purposes

Create dedicated clients for different use cases:

```bash
# Client for storefront (shopper-facing)
b2c slas client create storefront-client \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --scopes "sfcc.shopper-products,sfcc.shopper-baskets-orders.rw" \
  --redirect-uri https://store.example.com/callback

# Client for mobile app (may need different scopes)
b2c slas client create mobile-client \
  --tenant-id zzte_053 \
  --channels RefArchGlobal \
  --scopes "sfcc.shopper-products,sfcc.shopper-baskets-orders.rw,sfcc.shopper-stores" \
  --redirect-uri myapp://callback
```

###### Don't Mix Admin and Shopper Scopes

Shopper scopes (SLAS) and Admin scopes (Account Manager) cannot be combined in the same client or token. Use separate authentication for admin operations.

##### Verifying Token Scopes

Check what scopes are in your access token:

```javascript
// Decode JWT payload (base64)
const tokenParts = accessToken.split('.');
const payload = JSON.parse(atob(tokenParts[1]));

console.log('Token scopes:', payload.scope);
// Output: "sfcc.shopper-products sfcc.shopper-baskets-orders.rw ..."
```

---


<a id="b2c-slas-auth-patterns"></a>
## b2c-slas-auth-patterns

**When to use:** Implement advanced SLAS authentication patterns in B2C Commerce. Use when implementing passwordless login (email OTP, SMS OTP, passkeys), session bridging between PWA and SFRA, hybrid authentication, token refresh, or trusted system authentication. Covers authentication flows, token management, and JWT validation.

## B2C SLAS Authentication Patterns

Advanced authentication patterns for SLAS (Shopper Login and API Access Service) beyond basic login. These patterns enable passwordless authentication, hybrid storefront support, and system-to-system integration.

### Authentication Methods Overview

| Method | Use Case | User Experience |
|--------|----------|-----------------|
| Password | Traditional login | Username + password form |
| Email OTP | Passwordless email | Code sent to email |
| SMS OTP | Passwordless SMS | Code sent to phone |
| Passkeys | FIDO2/WebAuthn | Biometric or device PIN |
| Session Bridge | Hybrid storefronts | Seamless PWA ↔ SFRA |
| Hybrid Auth | B2C 25.3+ | Built-in platform auth sync |
| TSOB | System integration | Backend service calls |

### Passwordless Email OTP

Send one-time passwords via email for passwordless login.

#### Flow Overview

1. Call `/oauth2/passwordless/login` with callback URI
2. SLAS POSTs `pwdless_login_token` to your callback
3. Your app sends OTP to shopper via email
4. Shopper enters OTP, app exchanges for tokens

#### Step 1: Initiate Passwordless Login

```javascript
// POST /shopper/auth/v1/organizations/{org}/oauth2/passwordless/login
async function initiatePasswordlessLogin(email, siteId) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/passwordless/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                user_id: email,
                mode: 'callback',
                channel_id: siteId,
                callback_uri: 'https://yoursite.com/api/passwordless/callback'
            })
        }
    );

    // SLAS will POST to your callback_uri with pwdless_login_token
    return response.json();
}
```

#### Step 2: Handle Callback and Send OTP

Your callback endpoint receives `pwdless_login_token`. Generate an OTP and send it to the user:

```javascript
// Your callback endpoint (receives POST from SLAS)
app.post('/api/passwordless/callback', async (req, res) => {
    const { pwdless_login_token, user_id } = req.body;

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store token + OTP mapping (e.g., Redis with 10 min TTL)
    await redis.setex(`pwdless:${otp}`, 600, JSON.stringify({
        token: pwdless_login_token,
        email: user_id
    }));

    // Send OTP via email (configure in SLAS Admin UI)
    await sendOTPEmail(user_id, otp);

    res.status(200).send('OK');
});
```

#### Step 3: Exchange OTP for Tokens

```javascript
// POST /shopper/auth/v1/organizations/{org}/oauth2/passwordless/token
async function exchangeOTPForToken(otp, clientId, clientSecret, siteId) {
    // Retrieve stored token
    const stored = JSON.parse(await redis.get(`pwdless:${otp}`));
    if (!stored) throw new Error('Invalid or expired OTP');

    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/passwordless/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                hint: 'pwdless_login',
                pwdless_login_token: stored.token,
                channel_id: siteId
            })
        }
    );

    // Returns: { access_token, refresh_token, ... }
    return response.json();
}
```

#### Rate Limits

- 6 requests per user per 10 minutes
- 1,000 requests/month per endpoint on non-production tenants

### Passwordless SMS OTP

Send OTP via SMS using Marketing Cloud or custom integration.

#### Using Marketing Cloud

Configure SMS through Salesforce Marketing Cloud:

1. Set up Marketing Cloud connector
2. Configure SMS journey with OTP template
3. Trigger via SLAS callback (same flow as email OTP)

#### Custom SMS Provider

Use the same callback flow as email, but send via SMS provider:

```javascript
// In your callback handler
const twilio = require('twilio')(accountSid, authToken);

async function sendOTPSMS(phoneNumber, otp) {
    await twilio.messages.create({
        body: `Your login code is: ${otp}`,
        from: '+1234567890',
        to: phoneNumber
    });
}
```

### Passkeys (FIDO2/WebAuthn)

Enable biometric authentication using FIDO2/WebAuthn passkeys. Registration requires prior identity verification via OTP. The flow involves starting registration with SLAS, creating a credential via the browser WebAuthn API, then completing registration. Authentication follows a similar start/authenticate/finish pattern.

See [references/PASSKEYS.md](references/PASSKEYS.md) for full registration and authentication code examples.

### Session Bridge

Maintain session continuity between PWA Kit and SFRA storefronts using signed bridge tokens (`dwsgst` for guest, `dwsrst` for registered). Supports both PWA-to-SFRA and SFRA-to-PWA directions. Note that DWSID is deprecated for registered shoppers.

See [references/SESSION-BRIDGE.md](references/SESSION-BRIDGE.md) for full implementation details including token generation, redirect patterns, callback handlers, and error handling.

### Hybrid Authentication (B2C 25.3+)

**Hybrid Auth replaces Plugin SLAS** for hybrid PWA/SFRA storefronts. It's built directly into the B2C platform and provides automatic session synchronization.

#### Benefits

- No manual session bridge implementation needed
- Automatic sync between PWA and SFRA
- Simplified token management
- Built-in platform support

#### Migration from Plugin SLAS

If using Plugin SLAS, migrate to Hybrid Auth:

1. Upgrade to B2C Commerce 25.3+
2. Enable Hybrid Auth in Business Manager
3. Remove Plugin SLAS cartridge
4. Update storefront to use platform auth

### Token Refresh

**Important:** The `channel_id` parameter is **required** for guest token refresh.

#### Public Clients (Single-Use Refresh)

Public clients (no secret) receive single-use refresh tokens:

```javascript
async function refreshTokenPublic(refreshToken, clientId, siteId) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId,
                channel_id: siteId  // REQUIRED
            })
        }
    );

    // Returns NEW refresh_token (old one is invalidated)
    return response.json();
}
```

#### Private Clients (Reusable Refresh)

Private clients can reuse refresh tokens:

```javascript
async function refreshTokenPrivate(refreshToken, clientId, clientSecret, siteId) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                channel_id: siteId  // REQUIRED
            })
        }
    );

    // Same refresh_token can be used again
    return response.json();
}
```

### Trusted System on Behalf (TSOB)

Server-to-server authentication to act on behalf of a shopper.

#### Use Cases

- Backend services accessing shopper data
- Order management systems
- Customer service applications

#### Get Token on Behalf of Shopper

```javascript
async function getTSOBToken(shopperLoginId) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/trusted-system/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(clientId + ':' + clientSecret)}`
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                login_id: shopperLoginId,
                channel_id: siteId,
                usid: shopperUsid // Optional: reuse existing session
            })
        }
    );

    // Returns tokens that act as the specified shopper
    return response.json();
}
```

#### Important Constraints

**3-Second Protection Window:** Multiple TSOB calls for the same shopper within 3 seconds return HTTP 409:

```
"Tenant id <id> has already performed a login operation for user id <user_id> in the last 3 seconds."
```

Handle this in your code:

```javascript
async function getTSOBTokenWithRetry(shopperLoginId, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await getTSOBToken(shopperLoginId);
        } catch (error) {
            if (error.status === 409 && i < maxRetries - 1) {
                await new Promise(r => setTimeout(r, 3000));
                continue;
            }
            throw error;
        }
    }
}
```

#### Required Configuration

1. SLAS client must have TSOB enabled (`sfcc.ts_ext_on_behalf_of` scope)
2. Configure in SLAS Admin API or Business Manager
3. Secure the client secret (server-side only)
4. Keep `login_id` length under 60 characters

### JWT Validation

Validate SLAS tokens using JWKS (JSON Web Key Set).

#### Get JWKS

```javascript
async function getJWKS() {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/jwks`
    );
    return response.json();
}
```

#### Validate Token

```javascript
const jose = require('jose');

async function validateToken(accessToken) {
    // Get JWKS
    const jwksUrl = `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/jwks`;
    const JWKS = jose.createRemoteJWKSet(new URL(jwksUrl));

    // Verify token
    const { payload } = await jose.jwtVerify(accessToken, JWKS, {
        issuer: `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}`,
        audience: clientId
    });

    return payload;
}
```

#### Token Claims

| Claim | Description |
|-------|-------------|
| `sub` | Subject (customer ID or guest ID) |
| `isb` | Identity subject binding |
| `iss` | Issuer |
| `aud` | Audience (client ID) |
| `exp` | Expiration time |
| `iat` | Issued at time |
| `scope` | Granted scopes |
| `tsob` | TSOB token type (for trusted system tokens) |

### Best Practices

#### Security

- Never expose client secrets in frontend code
- Use HTTPS for all token exchanges
- Validate tokens server-side for sensitive operations
- Implement proper CORS policies
- Store tokens securely (httpOnly cookies preferred)

#### Token Management

- Implement proactive token refresh before expiry
- Handle refresh token rotation for public clients
- Clear tokens on logout from all storage locations
- Use short-lived access tokens where possible
- Always include `channel_id` in refresh requests

#### User Experience

- Provide fallback authentication methods
- Show clear error messages for auth failures
- Remember user's preferred auth method
- Handle session expiry gracefully

### Detailed References

- [Passkeys (FIDO2/WebAuthn)](references/PASSKEYS.md) - Registration and authentication code examples
- [Session Bridge Flows](references/SESSION-BRIDGE.md) - Detailed session bridge implementation
- [Token Lifecycle](references/TOKEN-LIFECYCLE.md) - Token expiry and refresh patterns

### Reference: PASSKEYS.md

#### Passkeys (FIDO2/WebAuthn)

Enable biometric authentication using passkeys.

**Important:** Passkey registration requires **prior identity verification via OTP**. Users must first verify their email before registering a passkey.

##### Registration Flow (3 Steps)

```javascript
// Step 1: Verify identity via OTP first
// Use the Email OTP flow above to verify the user

// Step 2: Start passkey registration (requires valid access token)
async function startPasskeyRegistration(accessToken) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/webauthn/register/start`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channel_id: siteId
            })
        }
    );
    return response.json();
}

// Step 3: Create credential using WebAuthn API
async function createPasskey(options) {
    const credential = await navigator.credentials.create({
        publicKey: {
            challenge: base64ToBuffer(options.challenge),
            rp: { name: options.rp_name, id: options.rp_id },
            user: {
                id: base64ToBuffer(options.user_id),
                name: options.user_name,
                displayName: options.user_display_name
            },
            pubKeyCredParams: options.pub_key_cred_params,
            authenticatorSelection: {
                authenticatorAttachment: 'platform',
                userVerification: 'required'
            }
        }
    });
    return credential;
}

// Step 4: Complete registration with SLAS
async function finishPasskeyRegistration(accessToken, credential) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/webauthn/register/finish`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                channel_id: siteId,
                credential_id: bufferToBase64(credential.rawId),
                client_data_json: bufferToBase64(credential.response.clientDataJSON),
                attestation_object: bufferToBase64(credential.response.attestationObject)
            })
        }
    );
    return response.json();
}
```

##### Authentication Flow

```javascript
// Step 1: Get authentication options
async function startPasskeyAuth() {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/webauthn/authenticate/start`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ channel_id: siteId })
        }
    );
    return response.json();
}

// Step 2: Get credential using WebAuthn API
async function authenticateWithPasskey(options) {
    const assertion = await navigator.credentials.get({
        publicKey: {
            challenge: base64ToBuffer(options.challenge),
            rpId: options.rp_id,
            allowCredentials: options.allow_credentials.map(c => ({
                type: 'public-key',
                id: base64ToBuffer(c.id)
            })),
            userVerification: 'required'
        }
    });
    return assertion;
}

// Step 3: Complete authentication and get tokens
async function finishPasskeyAuth(assertion) {
    const response = await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/webauthn/authenticate/finish`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                credential_id: bufferToBase64(assertion.rawId),
                client_data_json: bufferToBase64(assertion.response.clientDataJSON),
                authenticator_data: bufferToBase64(assertion.response.authenticatorData),
                signature: bufferToBase64(assertion.response.signature),
                channel_id: siteId
            })
        }
    );
    return response.json();
}
```

### Reference: SESSION-BRIDGE.md

#### Session Bridge Reference

Detailed implementation patterns for session bridging between PWA Kit and SFRA.

##### Token Types

| Token | Description | Duration |
|-------|-------------|----------|
| `dwsgst` | Guest session token | 30 minutes |
| `dwsrst` | Registered session token | 30 minutes |
| `dwsid` | SFRA session cookie | Session-based |

##### PWA Kit to SFRA

###### Step 1: Generate Bridge Tokens

```javascript
// commerce-sdk-isomorphic or direct API call
async function generateBridgeTokens(shopperToken) {
    const response = await shopperLogin.getSessionBridgeAccessToken({
        headers: {
            Authorization: `Bearer ${shopperToken.access_token}`
        },
        body: {
            channel_id: siteId,
            login_id: shopperToken.customer_id
        }
    });

    return {
        dwsgst: response.dwsgst,
        dwsrst: response.dwsrst // Only present if logged in
    };
}
```

###### Step 2: Redirect with Tokens

Option A: URL Parameters (simple)

```javascript
function redirectToSFRA(bridgeTokens, targetPath) {
    const url = new URL(sfraBaseUrl + targetPath);
    url.searchParams.set('dwsgst', bridgeTokens.dwsgst);
    if (bridgeTokens.dwsrst) {
        url.searchParams.set('dwsrst', bridgeTokens.dwsrst);
    }
    window.location.href = url.toString();
}
```

Option B: POST Form (more secure)

```javascript
function redirectViaPOST(bridgeTokens, targetPath) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = sfraBaseUrl + '/SessionBridge-Establish';

    const addInput = (name, value) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
    };

    addInput('dwsgst', bridgeTokens.dwsgst);
    if (bridgeTokens.dwsrst) {
        addInput('dwsrst', bridgeTokens.dwsrst);
    }
    addInput('redirect', targetPath);

    document.body.appendChild(form);
    form.submit();
}
```

###### Step 3: SFRA Establishes Session

```javascript
// SFRA Controller: SessionBridge-Establish
var server = require('server');
var SLASBridge = require('*/cartridge/scripts/services/SLASBridge');

server.post('Establish', function(req, res, next) {
    var dwsgst = req.form.dwsgst;
    var dwsrst = req.form.dwsrst;
    var redirect = req.form.redirect || '/';

    try {
        // Exchange bridge tokens for session
        var result = SLASBridge.establishSession(dwsgst, dwsrst);

        if (result.success) {
            // Session established, dwsid cookie is set by platform
            res.redirect(redirect);
        } else {
            res.redirect('/login?error=bridge_failed');
        }
    } catch (e) {
        res.redirect('/login?error=bridge_error');
    }

    next();
});
```

##### SFRA to PWA Kit

###### Step 1: Generate Bridge Tokens in SFRA

```javascript
// SFRA Helper
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var Site = require('dw/system/Site');

function getBridgeTokensForPWA() {
    var customer = session.customer;
    var svc = LocalServiceRegistry.createService('slas.sessionbridge', {
        createRequest: function(svc, args) {
            svc.setRequestMethod('POST');
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

            var params = 'channel_id=' + Site.current.ID;
            if (customer.authenticated) {
                params += '&login_id=' + customer.profile.credentials.login;
            }
            return params;
        },
        parseResponse: function(svc, response) {
            return JSON.parse(response.text);
        }
    });

    var result = svc.call();
    return result.ok ? result.object : null;
}
```

###### Step 2: Redirect to PWA Kit

```javascript
// SFRA Controller: SessionBridge-ToPWA
server.get('ToPWA', function(req, res, next) {
    var SLASBridge = require('*/cartridge/scripts/services/SLASBridge');
    var targetPath = req.querystring.path || '/';

    var bridgeTokens = SLASBridge.getBridgeTokensForPWA();

    if (bridgeTokens) {
        var pwaUrl = 'https://pwa.yoursite.com/session-bridge/callback';
        pwaUrl += '?dwsgst=' + encodeURIComponent(bridgeTokens.dwsgst);
        if (bridgeTokens.dwsrst) {
            pwaUrl += '&dwsrst=' + encodeURIComponent(bridgeTokens.dwsrst);
        }
        pwaUrl += '&redirect=' + encodeURIComponent(targetPath);

        res.redirect(pwaUrl);
    } else {
        res.redirect('https://pwa.yoursite.com' + targetPath);
    }

    next();
});
```

###### Step 3: PWA Kit Handles Callback

```javascript
// PWA Kit: pages/session-bridge/callback.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@salesforce/commerce-sdk-react';

export default function SessionBridgeCallback() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        async function establishSession() {
            const dwsgst = searchParams.get('dwsgst');
            const dwsrst = searchParams.get('dwsrst');
            const redirect = searchParams.get('redirect') || '/';

            try {
                // Exchange bridge tokens
                await auth.loginSessionBridge({ dwsgst, dwsrst });
                navigate(redirect);
            } catch (error) {
                console.error('Bridge failed:', error);
                navigate('/login?error=bridge_failed');
            }
        }

        establishSession();
    }, [searchParams]);

    return <div>Establishing session...</div>;
}
```

##### Hybrid Navigation Component

```jsx
// PWA Kit: components/hybrid-link.jsx
import { useAuth } from '@salesforce/commerce-sdk-react';

export function HybridLink({ href, children, ...props }) {
    const auth = useAuth();

    const handleClick = async (e) => {
        // Check if href is SFRA
        if (href.includes('sfra.yoursite.com')) {
            e.preventDefault();

            // Get bridge tokens
            const tokens = await auth.getSessionBridgeTokens();

            // Build SFRA URL with tokens
            const url = new URL(href);
            url.searchParams.set('dwsgst', tokens.dwsgst);
            if (tokens.dwsrst) {
                url.searchParams.set('dwsrst', tokens.dwsrst);
            }

            window.location.href = url.toString();
        }
        // Otherwise, let normal navigation happen
    };

    return (
        <a href={href} onClick={handleClick} {...props}>
            {children}
        </a>
    );
}
```

##### Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| `invalid_token` | Bridge token expired | Re-generate tokens |
| `session_mismatch` | Different customer | Clear and restart |
| `channel_mismatch` | Wrong site ID | Verify channel_id |
| `bridge_disabled` | Feature not enabled | Enable in SLAS config |

##### Security Considerations

1. **Token Expiry**: Bridge tokens expire quickly (30 min) - generate fresh tokens before redirect
2. **HTTPS Only**: Always use HTTPS for token exchange
3. **Referrer Validation**: Validate source domain on callback endpoints
4. **Rate Limiting**: Implement rate limiting on bridge endpoints
5. **Token Usage**: Each bridge token should only be used once

##### Testing

```bash
# Verify bridge token generation
curl -X POST "https://{shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/{orgId}/oauth2/session-bridge/token" \
  -H "Authorization: Bearer {access_token}" \
  -d "channel_id={siteId}&login_id={customerId}"
```

### Reference: TOKEN-LIFECYCLE.md

#### Token Lifecycle Reference

Understanding token expiry, refresh patterns, and lifecycle management for SLAS.

##### Token Types and Expiry

| Token Type | Default Expiry | Configurable | Use Case |
|------------|----------------|--------------|----------|
| Access Token | 30 minutes | Yes (SLAS Admin) | API requests |
| Refresh Token (Public) | 90 days | Yes | Token renewal |
| Refresh Token (Private) | 90 days | Yes | Token renewal |
| Session Bridge Token | 30 minutes | No | Cross-platform auth |
| Passwordless Token | 10 minutes | No | OTP verification |

##### Access Token Lifecycle

```
[Issue] → [Active] → [Expired]
   ↓         ↓
  Use    Refresh
```

###### Best Practices for Access Tokens

```javascript
class TokenManager {
    constructor(config) {
        this.accessToken = null;
        this.refreshToken = null;
        this.expiresAt = null;
        this.refreshThreshold = 5 * 60 * 1000; // 5 minutes
    }

    isExpired() {
        return Date.now() >= this.expiresAt;
    }

    shouldRefresh() {
        // Refresh when within threshold of expiry
        return Date.now() >= (this.expiresAt - this.refreshThreshold);
    }

    async getValidToken() {
        if (this.shouldRefresh()) {
            await this.refresh();
        }
        return this.accessToken;
    }

    async refresh() {
        const tokens = await this.slasRefresh(this.refreshToken);
        this.setTokens(tokens);
    }

    setTokens(tokens) {
        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token;
        this.expiresAt = Date.now() + (tokens.expires_in * 1000);
    }
}
```

##### Refresh Token Patterns

###### Public Client (Single-Use)

For browser-based apps without a backend:

```javascript
// Refresh tokens are single-use - must store new token
async function refreshPublicClient(refreshToken) {
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId,
            channel_id: siteId
        })
    });

    const tokens = await response.json();

    // IMPORTANT: Old refresh token is now invalid
    // Must use the new refresh_token for next refresh
    return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token, // NEW token
        expiresIn: tokens.expires_in
    };
}
```

###### Private Client (Reusable)

For server-side applications:

```javascript
// Refresh tokens are reusable with client secret
async function refreshPrivateClient(refreshToken) {
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            channel_id: siteId
        })
    });

    const tokens = await response.json();

    // Can reuse same refresh token (though new one may be provided)
    return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || refreshToken,
        expiresIn: tokens.expires_in
    };
}
```

##### Token Rotation Strategy

###### Public Clients - Handle Race Conditions

```javascript
class PublicTokenManager {
    constructor() {
        this.refreshPromise = null;
        this.tokenVersion = 0;
    }

    async refresh() {
        // Prevent multiple concurrent refreshes
        if (this.refreshPromise) {
            return this.refreshPromise;
        }

        const currentVersion = this.tokenVersion;

        this.refreshPromise = this._doRefresh()
            .finally(() => {
                this.refreshPromise = null;
            });

        return this.refreshPromise;
    }

    async _doRefresh() {
        const tokens = await refreshPublicClient(this.refreshToken);

        // Check for race condition
        if (this.tokenVersion !== currentVersion) {
            // Another refresh happened, tokens might be stale
            throw new Error('Token version mismatch');
        }

        this.tokenVersion++;
        this.setTokens(tokens);
        return tokens;
    }
}
```

###### Storage Strategies

```javascript
// Browser - httpOnly cookie preferred (requires BFF)
// Fallback to localStorage with encryption

class TokenStorage {
    // Option 1: httpOnly cookies via BFF
    async storeViaBackend(tokens) {
        await fetch('/api/auth/store-tokens', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(tokens)
        });
    }

    // Option 2: localStorage (less secure)
    storeLocally(tokens) {
        // Consider encrypting before storage
        localStorage.setItem('auth_tokens', JSON.stringify({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: Date.now() + (tokens.expires_in * 1000)
        }));
    }

    // Option 3: Memory only (cleared on refresh)
    storeInMemory(tokens) {
        this._tokens = tokens;
    }
}
```

##### Session Timeout Handling

###### Proactive Refresh

```javascript
class SessionManager {
    constructor() {
        this.refreshTimer = null;
    }

    scheduleRefresh(expiresIn) {
        // Clear existing timer
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }

        // Schedule refresh 5 minutes before expiry
        const refreshIn = (expiresIn - 300) * 1000;

        this.refreshTimer = setTimeout(() => {
            this.refresh().catch(this.handleRefreshError);
        }, refreshIn);
    }

    handleRefreshError(error) {
        // Check if refresh token is also expired
        if (error.message.includes('invalid_grant')) {
            // Full re-authentication required
            this.logout();
            this.redirectToLogin();
        }
    }
}
```

###### Activity-Based Extension

```javascript
class ActivityTracker {
    constructor(tokenManager) {
        this.tokenManager = tokenManager;
        this.lastActivity = Date.now();
        this.activityTimeout = 15 * 60 * 1000; // 15 minutes

        this.setupListeners();
    }

    setupListeners() {
        ['click', 'keydown', 'scroll', 'mousemove'].forEach(event => {
            window.addEventListener(event, () => this.recordActivity(), { passive: true });
        });
    }

    recordActivity() {
        const now = Date.now();
        if (now - this.lastActivity > 60000) { // Throttle to 1 minute
            this.lastActivity = now;
            this.checkTokenRefresh();
        }
    }

    checkTokenRefresh() {
        if (this.tokenManager.shouldRefresh()) {
            this.tokenManager.refresh();
        }
    }

    isInactive() {
        return Date.now() - this.lastActivity > this.activityTimeout;
    }
}
```

##### Guest to Registered Transition

When a guest user logs in, merge sessions:

```javascript
async function loginWithSessionMerge(credentials, guestAccessToken) {
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // Include guest token for basket/session merge
            'Authorization': `Bearer ${guestAccessToken}`
        },
        body: new URLSearchParams({
            grant_type: 'password',
            username: credentials.username,
            password: credentials.password,
            client_id: clientId,
            channel_id: siteId
        })
    });

    // Returns registered user tokens
    // Guest basket is automatically merged
    return response.json();
}
```

##### Logout and Token Revocation

```javascript
async function logout(accessToken, refreshToken) {
    // Revoke refresh token
    await fetch(
        `https://${shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${orgId}/oauth2/revoke`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                token: refreshToken,
                token_type_hint: 'refresh_token',
                client_id: clientId,
                channel_id: siteId
            })
        }
    );

    // Clear local storage
    localStorage.removeItem('auth_tokens');

    // Clear cookies if using BFF
    await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
}
```

##### Error Handling Reference

| Error | Meaning | Action |
|-------|---------|--------|
| `invalid_grant` | Refresh token expired/revoked | Re-authenticate |
| `invalid_token` | Access token invalid | Try refresh |
| `expired_token` | Access token expired | Refresh token |
| `invalid_client` | Client credentials wrong | Check configuration |
| `unauthorized_client` | Client not allowed | Check SLAS client settings |

##### Debugging Token Issues

```javascript
// Decode JWT without validation (for debugging only)
function decodeToken(token) {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return {
        subject: payload.sub,
        issuer: payload.iss,
        audience: payload.aud,
        expiresAt: new Date(payload.exp * 1000),
        issuedAt: new Date(payload.iat * 1000),
        scopes: payload.scope?.split(' ') || []
    };
}

// Check if token is expired
function isTokenExpired(token) {
    const decoded = decodeToken(token);
    return decoded && Date.now() >= decoded.expiresAt.getTime();
}
```

---


<a id="b2c-webservices"></a>
## b2c-webservices

**When to use:** Implement web service integrations in B2C Commerce using LocalServiceRegistry. Use when calling external APIs, configuring service credentials in services.xml, handling HTTP requests/responses, or implementing circuit breakers. Covers HTTP, SOAP, FTP, and SFTP services.

## Web Services Skill

This skill guides you through implementing web service integrations in B2C Commerce using the Service Framework.

### Overview

The Service Framework provides a structured way to call external services with:

| Feature | Description |
|---------|-------------|
| **Configuration** | Service settings managed in Business Manager |
| **Rate Limiting** | Automatic throttling to protect external systems |
| **Circuit Breaker** | Automatic failure handling to prevent cascade failures |
| **Logging** | Communication logging with sensitive data filtering |
| **Mocking** | Test services without external calls |

### Service Types

| Type | Use Case | Protocol |
|------|----------|----------|
| `HTTP` | REST APIs, webhooks | HTTP/HTTPS |
| `HTTPForm` | Form submissions | HTTP/HTTPS with form encoding |
| `FTP` | File transfers (deprecated) | FTP |
| `SFTP` | Secure file transfers | SFTP |
| `SOAP` | SOAP web services | HTTP/HTTPS with SOAP |
| `GENERIC` | Custom protocols | Any |

### Service Framework Components

#### Business Manager Configuration

Services are configured in **Administration > Operations > Services**:

1. **Service Configuration** - General settings (enabled, logging, callbacks)
2. **Service Profile** - Rate limiting and circuit breaker settings
3. **Service Credential** - URL and authentication credentials

#### Script Components

| Component | Purpose |
|-----------|---------|
| `LocalServiceRegistry` | Creates service instances |
| `ServiceCallback` | Defines request/response handling |
| `Service` | Base service with common methods |
| `Result` | Response object with status and data |

### Basic Pattern

```javascript
'use strict';

var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var myService = LocalServiceRegistry.createService('my.service.id', {
    /**
     * Configure the request before it is sent
     * @param {dw.svc.HTTPService} svc - The service instance
     * @param {Object} params - Parameters passed to service.call()
     * @returns {string} Request body
     */
    createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/json');
        return JSON.stringify(params);
    },

    /**
     * Parse the response after a successful call
     * @param {dw.svc.HTTPService} svc - The service instance
     * @param {dw.net.HTTPClient} client - The HTTP client with response
     * @returns {Object} Parsed response
     */
    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    /**
     * Filter sensitive data from logs (required for production)
     * @param {string} msg - The message to filter
     * @returns {string} Filtered message
     */
    filterLogMessage: function (msg) {
        return msg.replace(/("api_key"\s*:\s*")[^"]+"/g, '$1***"');
    }
});

// Call the service
var result = myService.call({ key: 'value' });

if (result.ok) {
    var data = result.object;
} else {
    var error = result.errorMessage;
}
```

### Service Callbacks

| Callback | Required | Description |
|----------|----------|-------------|
| `createRequest` | Yes* | Configure request, return body |
| `parseResponse` | Yes* | Parse response, return result object |
| `execute` | No | Custom execution logic (replaces default) |
| `initServiceClient` | No | Create/configure underlying client |
| `mockCall` | No | Return mock response (execute phase only) |
| `mockFull` | No | Return mock response (entire call) |
| `filterLogMessage` | Recommended | Filter sensitive data from logs |
| `getRequestLogMessage` | No | Custom request log message |
| `getResponseLogMessage` | No | Custom response log message |

*Required unless `execute` is implemented

### Result Object

The `call()` method returns a `dw.svc.Result`:

| Property | Type | Description |
|----------|------|-------------|
| `ok` | Boolean | True if successful |
| `status` | String | "OK", "ERROR", or "SERVICE_UNAVAILABLE" |
| `object` | Object | Response from `parseResponse` |
| `error` | Number | Error code (e.g., HTTP status) |
| `errorMessage` | String | Error description |
| `unavailableReason` | String | Why service is unavailable |
| `mockResult` | Boolean | True if from mock callback |

#### Unavailable Reasons

| Reason | Description |
|--------|-------------|
| `TIMEOUT` | Call timed out |
| `RATE_LIMITED` | Rate limit exceeded |
| `CIRCUIT_BROKEN` | Circuit breaker open |
| `DISABLED` | Service disabled |
| `CONFIG_PROBLEM` | Configuration error |

### Error Handling

```javascript
var result = myService.call(params);

if (result.ok) {
    return result.object;
}

// Handle different error types
switch (result.status) {
    case 'SERVICE_UNAVAILABLE':
        switch (result.unavailableReason) {
            case 'RATE_LIMITED':
                // Retry later
                break;
            case 'CIRCUIT_BROKEN':
                // Service is down, use fallback
                break;
            case 'TIMEOUT':
                // Request timed out
                break;
        }
        break;
    case 'ERROR':
        // Check HTTP status code
        if (result.error === 401) {
            // Authentication error
        } else if (result.error === 404) {
            // Resource not found
        }
        break;
}

throw new Error('Service error: ' + result.errorMessage);
```

### Log Filtering

Production environments require log filtering to prevent sensitive data exposure:

```javascript
var myService = LocalServiceRegistry.createService('my.service', {
    createRequest: function (svc, params) {
        // ... configure request
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    /**
     * Filter sensitive data from all log messages
     */
    filterLogMessage: function (msg) {
        // Filter API keys
        msg = msg.replace(/api_key=[^&]+/g, 'api_key=***');
        // Filter authorization headers
        msg = msg.replace(/Authorization:\s*[^\r\n]+/gi, 'Authorization: ***');
        // Filter passwords in JSON
        msg = msg.replace(/("password"\s*:\s*")[^"]+"/g, '$1***"');
        return msg;
    },

    /**
     * Custom request log message (optional)
     */
    getRequestLogMessage: function (request) {
        // Return custom message or null for default
        return 'Request: ' + request.substring(0, 100) + '...';
    },

    /**
     * Custom response log message (optional)
     */
    getResponseLogMessage: function (response) {
        // Return custom message or null for default
        return 'Response received';
    }
});
```

### Mocking Services

Use mock callbacks for testing without external calls:

```javascript
var myService = LocalServiceRegistry.createService('my.service', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addParam('id', params.id);
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    /**
     * Mock the execute phase only (createRequest and parseResponse still run)
     */
    mockCall: function (svc, request) {
        return {
            statusCode: 200,
            text: JSON.stringify({ id: 1, name: 'Mock Data' })
        };
    },

    /**
     * Or mock the entire call (replaces all phases)
     */
    mockFull: function (svc, params) {
        return { id: params.id, name: 'Full Mock Data' };
    }
});

// Force mock mode
myService.setMock();
var result = myService.call({ id: 123 });
```

### Service Configuration in Business Manager

#### Creating a Service

1. Go to **Administration > Operations > Services**
2. Click **New** under Service Configurations
3. Fill in:
   - **Service ID**: Unique identifier (e.g., `my.api.service`)
   - **Service Type**: HTTP, FTP, SOAP, etc.
   - **Enabled**: Check to enable
   - **Profile**: Select or create a profile
   - **Credential**: Select or create credentials
   - **Communication Log**: Enable for debugging

#### Service Profile Settings

| Setting | Description |
|---------|-------------|
| **Timeout** | Maximum wait time in milliseconds |
| **Rate Limit** | Maximum calls per time unit |
| **Circuit Breaker Enabled** | Enable automatic failure handling |
| **Max Circuit Breaker Calls** | Calls before circuit opens |
| **Circuit Breaker Interval** | Time window for tracking failures |

#### Service Credential Settings

| Setting | Description |
|---------|-------------|
| **ID** | Credential identifier |
| **URL** | Base URL for the service |
| **User** | Username for authentication |
| **Password** | Password for authentication |

### Detailed References

- [HTTP Services](references/HTTP-SERVICES.md) - REST API integrations
- [FTP/SFTP Services](references/FTP-SERVICES.md) - File transfer operations
- [SOAP Services](references/SOAP-SERVICES.md) - SOAP web service integrations
- [Services XML](references/SERVICES-XML.md) - Import/export service configurations

### Script API Classes

| Class | Description |
|-------|-------------|
| `dw.svc.LocalServiceRegistry` | Create service instances |
| `dw.svc.Service` | Base service class |
| `dw.svc.HTTPService` | HTTP service methods |
| `dw.svc.FTPService` | FTP/SFTP service methods |
| `dw.svc.SOAPService` | SOAP service methods |
| `dw.svc.Result` | Service call result |
| `dw.svc.ServiceConfig` | Service configuration |
| `dw.svc.ServiceProfile` | Rate limit/circuit breaker config |
| `dw.svc.ServiceCredential` | Authentication credentials |
| `dw.net.HTTPClient` | Underlying HTTP client |
| `dw.net.FTPClient` | Underlying FTP client |
| `dw.net.SFTPClient` | Underlying SFTP client |

### Reference: FTP-SERVICES.md

#### FTP/SFTP Services Reference

Patterns for implementing file transfer integrations. SFTP is recommended over FTP for security.

##### FTPService Methods

| Method | Description |
|--------|-------------|
| `setOperation(name, args...)` | Set single operation to perform |
| `setAutoDisconnect(bool)` | Control auto-disconnect after call |
| `getClient()` | Get underlying FTPClient or SFTPClient |

##### Configuration Styles

There are two approaches to FTP service configuration:

###### Style 1: setOperation (Simple)

Use `setOperation` in `createRequest` for single operations:

```javascript
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var ftpService = LocalServiceRegistry.createService('my.ftp.service', {
    createRequest: function (svc, params) {
        // Set the operation to perform
        svc.setOperation('list', params.directory);
    },

    parseResponse: function (svc, response) {
        // response is the return value of the operation
        return response;
    },

    filterLogMessage: function (msg) {
        return msg.replace(/password=[^&\s]+/gi, 'password=***');
    }
});
```

###### Style 2: execute (Advanced)

Use `execute` for multiple operations or complex logic:

```javascript
var ftpService = LocalServiceRegistry.createService('my.ftp.service', {
    execute: function (svc, params) {
        var client = svc.client; // SFTPClient or FTPClient

        // Perform multiple operations
        var files = client.list(params.directory);
        var results = [];

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.name.indexOf('.xml') > -1) {
                var content = client.get(params.directory + '/' + file.name);
                results.push({
                    name: file.name,
                    content: content
                });
            }
        }

        return results;
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### SFTP Operations

Common SFTPClient operations:

| Operation | Description | Parameters |
|-----------|-------------|------------|
| `list` | List directory contents | `(path)` |
| `get` | Download file to string | `(remotePath)` |
| `getBinary` | Download file to File | `(remotePath, localFile)` |
| `put` | Upload string content | `(remotePath, content)` |
| `putBinary` | Upload File | `(remotePath, localFile)` |
| `del` | Delete file | `(remotePath)` |
| `mkdir` | Create directory | `(remotePath)` |
| `rmdir` | Remove directory | `(remotePath)` |
| `rename` | Rename/move file | `(oldPath, newPath)` |
| `getFileInfo` | Get file metadata | `(remotePath)` |
| `cd` | Change directory | `(path)` |

##### List Directory

```javascript
var listService = LocalServiceRegistry.createService('my.sftp.list', {
    createRequest: function (svc, directory) {
        svc.setOperation('list', directory || '/');
    },

    parseResponse: function (svc, fileList) {
        // fileList is an array of SFTPFileInfo objects
        var files = [];
        for (var i = 0; i < fileList.length; i++) {
            var f = fileList[i];
            files.push({
                name: f.name,
                directory: f.directory,
                size: f.size,
                modificationTime: f.modificationTime
            });
        }
        return files;
    },

    mockCall: function (svc, request) {
        return [
            { name: 'file1.xml', directory: false, size: 1024, modificationTime: new Date() },
            { name: 'file2.xml', directory: false, size: 2048, modificationTime: new Date() }
        ];
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = listService.call('/incoming');
if (result.ok) {
    var files = result.object;
}
```

##### Download File

###### Download to String

```javascript
var downloadService = LocalServiceRegistry.createService('my.sftp.download', {
    createRequest: function (svc, remotePath) {
        svc.setOperation('get', remotePath);
    },

    parseResponse: function (svc, content) {
        // content is the file contents as a string
        return content;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = downloadService.call('/incoming/data.xml');
if (result.ok) {
    var content = result.object;
}
```

###### Download to Local File

```javascript
var File = require('dw/io/File');

var downloadBinaryService = LocalServiceRegistry.createService('my.sftp.download.binary', {
    createRequest: function (svc, params) {
        var localFile = new File(File.IMPEX + '/src/' + params.localFilename);
        svc.setOperation('getBinary', params.remotePath, localFile);
    },

    parseResponse: function (svc, success) {
        return success; // boolean
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = downloadBinaryService.call({
    remotePath: '/incoming/large-file.zip',
    localFilename: 'downloaded.zip'
});
```

##### Upload File

###### Upload String Content

```javascript
var uploadService = LocalServiceRegistry.createService('my.sftp.upload', {
    createRequest: function (svc, params) {
        svc.setOperation('put', params.remotePath, params.content);
    },

    parseResponse: function (svc, success) {
        return success; // boolean
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var xmlContent = '<?xml version="1.0"?><data><item>value</item></data>';
var result = uploadService.call({
    remotePath: '/outgoing/export.xml',
    content: xmlContent
});
```

###### Upload Local File

```javascript
var File = require('dw/io/File');

var uploadBinaryService = LocalServiceRegistry.createService('my.sftp.upload.binary', {
    createRequest: function (svc, params) {
        var localFile = new File(File.IMPEX + '/src/' + params.localFilename);
        svc.setOperation('putBinary', params.remotePath, localFile);
    },

    parseResponse: function (svc, success) {
        return success;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = uploadBinaryService.call({
    localFilename: 'export.csv',
    remotePath: '/outgoing/export.csv'
});
```

##### Delete File

```javascript
var deleteService = LocalServiceRegistry.createService('my.sftp.delete', {
    createRequest: function (svc, remotePath) {
        svc.setOperation('del', remotePath);
    },

    parseResponse: function (svc, success) {
        return success;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = deleteService.call('/incoming/processed-file.xml');
```

##### Create Directory

```javascript
var mkdirService = LocalServiceRegistry.createService('my.sftp.mkdir', {
    createRequest: function (svc, remotePath) {
        svc.setOperation('mkdir', remotePath);
    },

    parseResponse: function (svc, success) {
        return success;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Move/Rename File

```javascript
var renameService = LocalServiceRegistry.createService('my.sftp.rename', {
    createRequest: function (svc, params) {
        svc.setOperation('rename', params.oldPath, params.newPath);
    },

    parseResponse: function (svc, success) {
        return success;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage - move file to processed folder
var result = renameService.call({
    oldPath: '/incoming/data.xml',
    newPath: '/processed/data.xml'
});
```

##### Complex Multi-Operation Example

Process files from an SFTP server:

```javascript
var File = require('dw/io/File');

var processingService = LocalServiceRegistry.createService('my.sftp.processor', {
    execute: function (svc, params) {
        var client = svc.client;
        var results = {
            processed: [],
            errors: []
        };

        // List files in incoming directory
        var files = client.list(params.incomingDir);

        for (var i = 0; i < files.length; i++) {
            var fileInfo = files[i];

            // Skip directories and non-XML files
            if (fileInfo.directory || fileInfo.name.indexOf('.xml') === -1) {
                continue;
            }

            try {
                var remotePath = params.incomingDir + '/' + fileInfo.name;

                // Download file content
                var content = client.get(remotePath);

                // Move to processed folder
                var processedPath = params.processedDir + '/' + fileInfo.name;
                client.rename(remotePath, processedPath);

                results.processed.push({
                    name: fileInfo.name,
                    content: content,
                    size: fileInfo.size
                });

            } catch (e) {
                results.errors.push({
                    name: fileInfo.name,
                    error: e.message
                });
            }
        }

        return results;
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = processingService.call({
    incomingDir: '/incoming',
    processedDir: '/processed'
});

if (result.ok) {
    var processed = result.object.processed;
    var errors = result.object.errors;
}
```

##### Keep Connection Open

For multiple operations in sequence:

```javascript
var ftpService = LocalServiceRegistry.createService('my.sftp.multiop', {
    createRequest: function (svc, params) {
        // Don't disconnect after this call
        svc.setAutoDisconnect(false);
        svc.setOperation('list', params.directory);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// First call - get file list
var listResult = ftpService.call({ directory: '/incoming' });

// Process each file with the same connection
if (listResult.ok) {
    var files = listResult.object;
    // Connection remains open for subsequent calls
}
```

##### SFTP Key Authentication

For SFTP with key-based authentication, configure the service credential in Business Manager with the private key.

```javascript
var sftpKeyService = LocalServiceRegistry.createService('my.sftp.key.auth', {
    // Key authentication is configured in BM credential
    createRequest: function (svc, directory) {
        svc.setOperation('list', directory);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### File Info

Get metadata about a specific file:

```javascript
var fileInfoService = LocalServiceRegistry.createService('my.sftp.fileinfo', {
    createRequest: function (svc, remotePath) {
        svc.setOperation('getFileInfo', remotePath);
    },

    parseResponse: function (svc, fileInfo) {
        if (fileInfo) {
            return {
                name: fileInfo.name,
                size: fileInfo.size,
                directory: fileInfo.directory,
                modificationTime: fileInfo.modificationTime
            };
        }
        return null;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = fileInfoService.call('/incoming/data.xml');
if (result.ok && result.object) {
    var info = result.object;
    var lastModified = info.modificationTime;
}
```

##### Mock FTP Operations

```javascript
var mockFtpService = LocalServiceRegistry.createService('my.sftp.mock', {
    createRequest: function (svc, directory) {
        svc.setOperation('list', directory);
    },

    parseResponse: function (svc, response) {
        var files = [];
        for (var i = 0; i < response.length; i++) {
            files.push({
                name: response[i].name,
                size: response[i].size
            });
        }
        return files;
    },

    mockCall: function (svc, request) {
        // Return mock file list
        return [
            { name: 'test1.xml', size: 1024, directory: false },
            { name: 'test2.xml', size: 2048, directory: false },
            { name: 'archive', size: 0, directory: true }
        ];
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### FTP (Legacy)

FTP is deprecated. Use SFTP instead. The API is similar:

```javascript
// FTPClient operations (deprecated)
var ftpLegacyService = LocalServiceRegistry.createService('my.ftp.legacy', {
    createRequest: function (svc, params) {
        svc.setOperation('list', params.directory);
    },

    parseResponse: function (svc, response) {
        // FTPFileInfo objects
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

### Reference: HTTP-SERVICES.md

#### HTTP Services Reference

Patterns for implementing HTTP and REST API integrations.

##### HTTPService Methods

| Method | Description |
|--------|-------------|
| `setRequestMethod(method)` | Set HTTP method (GET, POST, PUT, DELETE, PATCH) |
| `addHeader(name, value)` | Add request header |
| `addParam(name, value)` | Add URL query parameter |
| `setURL(url)` | Override the service URL |
| `setAuthentication(type)` | Set auth type ("BASIC" or "NONE") |
| `setEncoding(encoding)` | Set request body encoding (default: UTF-8) |
| `setOutFile(file)` | Write response to file |
| `setCachingTTL(seconds)` | Enable response caching |
| `setIdentity(keyRef)` | Set mTLS client certificate |
| `setHostNameVerification(bool)` | Enable/disable hostname verification |

##### HTTPClient Properties (in parseResponse)

The `client` parameter in `parseResponse` is an `HTTPClient`:

| Property | Description |
|----------|-------------|
| `text` | Response body as string |
| `statusCode` | HTTP status code |
| `statusMessage` | HTTP status message |
| `responseHeaders` | Response headers |
| `errorText` | Error response body |

##### REST API Examples

###### GET Request

```javascript
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var productService = LocalServiceRegistry.createService('my.product.api', {
    createRequest: function (svc, productId) {
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');
        svc.setURL(svc.URL + '/products/' + productId);
        return null; // GET has no body
    },

    parseResponse: function (svc, client) {
        if (client.statusCode === 200) {
            return JSON.parse(client.text);
        }
        return null;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var result = productService.call('SKU123');
if (result.ok) {
    var product = result.object;
}
```

###### POST with JSON Body

```javascript
var orderService = LocalServiceRegistry.createService('my.order.api', {
    createRequest: function (svc, orderData) {
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/json');
        svc.addHeader('Accept', 'application/json');
        return JSON.stringify(orderData);
    },

    parseResponse: function (svc, client) {
        var response = {
            statusCode: client.statusCode,
            success: client.statusCode >= 200 && client.statusCode < 300
        };

        if (response.success) {
            response.data = JSON.parse(client.text);
        } else {
            response.error = client.errorText || client.text;
        }

        return response;
    },

    filterLogMessage: function (msg) {
        // Filter credit card numbers
        msg = msg.replace(/\b\d{13,16}\b/g, '****');
        return msg;
    }
});

// Usage
var result = orderService.call({
    orderNumber: 'ORD123',
    items: [{ sku: 'PROD1', qty: 2 }]
});
```

###### PUT Request

```javascript
var updateService = LocalServiceRegistry.createService('my.update.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('PUT');
        svc.addHeader('Content-Type', 'application/json');
        svc.setURL(svc.URL + '/items/' + params.id);
        return JSON.stringify(params.data);
    },

    parseResponse: function (svc, client) {
        return {
            success: client.statusCode === 200,
            data: client.statusCode === 200 ? JSON.parse(client.text) : null
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

###### DELETE Request

```javascript
var deleteService = LocalServiceRegistry.createService('my.delete.api', {
    createRequest: function (svc, resourceId) {
        svc.setRequestMethod('DELETE');
        svc.setURL(svc.URL + '/resources/' + resourceId);
        return null;
    },

    parseResponse: function (svc, client) {
        return {
            success: client.statusCode === 204 || client.statusCode === 200
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

###### GET with Query Parameters

```javascript
var searchService = LocalServiceRegistry.createService('my.search.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.addHeader('Accept', 'application/json');

        // Add query parameters
        if (params.query) {
            svc.addParam('q', params.query);
        }
        if (params.limit) {
            svc.addParam('limit', params.limit.toString());
        }
        if (params.offset) {
            svc.addParam('offset', params.offset.toString());
        }

        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage: /search?q=shoes&limit=10&offset=0
var result = searchService.call({
    query: 'shoes',
    limit: 10,
    offset: 0
});
```

##### Authentication Patterns

###### Basic Authentication

Basic auth uses credentials from Business Manager:

```javascript
var basicAuthService = LocalServiceRegistry.createService('my.basic.auth.api', {
    createRequest: function (svc, params) {
        // Authentication is automatic if credential has user/password
        svc.setAuthentication('BASIC');
        svc.setRequestMethod('GET');
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        // Filter Authorization header
        return msg.replace(/Authorization:\s*Basic\s+[^\r\n]+/gi, 'Authorization: Basic ***');
    }
});
```

###### Bearer Token (OAuth)

```javascript
var oauthService = LocalServiceRegistry.createService('my.oauth.api', {
    createRequest: function (svc, params) {
        var token = params.accessToken;
        svc.setAuthentication('NONE'); // Don't use basic auth
        svc.setRequestMethod('GET');
        svc.addHeader('Authorization', 'Bearer ' + token);
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg.replace(/Bearer\s+[^\s\r\n]+/gi, 'Bearer ***');
    }
});
```

###### API Key Authentication

```javascript
var apiKeyService = LocalServiceRegistry.createService('my.apikey.api', {
    createRequest: function (svc, params) {
        var credential = svc.configuration.credential;
        svc.setAuthentication('NONE');
        svc.setRequestMethod('GET');
        // API key in header
        svc.addHeader('X-API-Key', credential.password);
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg.replace(/X-API-Key:\s*[^\r\n]+/gi, 'X-API-Key: ***');
    }
});
```

###### OAuth 2.0 Client Credentials Flow

```javascript
// Token service
var tokenService = LocalServiceRegistry.createService('my.oauth.token', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

        var credential = svc.configuration.credential;
        var body = 'grant_type=client_credentials';
        body += '&client_id=' + encodeURIComponent(credential.user);
        body += '&client_secret=' + encodeURIComponent(credential.password);

        return body;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        msg = msg.replace(/client_secret=[^&\s]+/gi, 'client_secret=***');
        msg = msg.replace(/"access_token"\s*:\s*"[^"]+"/gi, '"access_token":"***"');
        return msg;
    }
});

// Get token and use it
function callApiWithOAuth(params) {
    // Get access token
    var tokenResult = tokenService.call();
    if (!tokenResult.ok) {
        throw new Error('Failed to get access token');
    }

    var accessToken = tokenResult.object.access_token;

    // Call API with token
    var apiService = LocalServiceRegistry.createService('my.protected.api', {
        createRequest: function (svc, params) {
            svc.setAuthentication('NONE');
            svc.addHeader('Authorization', 'Bearer ' + accessToken);
            svc.setRequestMethod('GET');
            return null;
        },
        parseResponse: function (svc, client) {
            return JSON.parse(client.text);
        },
        filterLogMessage: function (msg) {
            return msg.replace(/Bearer\s+[^\s\r\n]+/gi, 'Bearer ***');
        }
    });

    return apiService.call(params);
}
```

##### Form Submissions (HTTPForm)

For `application/x-www-form-urlencoded` submissions:

```javascript
var formService = LocalServiceRegistry.createService('my.form.api', {
    // HTTPForm automatically handles form encoding
    // Pass a Map or Object as the call parameter
    parseResponse: function (svc, client) {
        return client.text;
    },

    filterLogMessage: function (msg) {
        return msg.replace(/password=[^&]+/gi, 'password=***');
    }
});

// Usage - pass a Map for form data
var HashMap = require('dw/util/HashMap');
var formData = new HashMap();
formData.put('username', 'user@example.com');
formData.put('action', 'subscribe');

var result = formService.call(formData);
```

##### Multipart Form Data

For file uploads:

```javascript
var HTTPRequestPart = require('dw/net/HTTPRequestPart');

var uploadService = LocalServiceRegistry.createService('my.upload.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('POST');

        var parts = [];

        // Text field
        parts.push(new HTTPRequestPart('description', params.description));

        // File field
        parts.push(new HTTPRequestPart(
            'file',
            params.file,
            params.filename,
            params.contentType
        ));

        return parts; // Array of HTTPRequestPart triggers multipart
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var File = require('dw/io/File');
var file = new File(File.IMPEX + '/src/upload.csv');
var result = uploadService.call({
    description: 'Product import',
    file: file,
    filename: 'products.csv',
    contentType: 'text/csv'
});
```

##### Downloading Files

```javascript
var File = require('dw/io/File');

var downloadService = LocalServiceRegistry.createService('my.download.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        svc.setURL(svc.URL + '/files/' + params.fileId);

        // Write response directly to file
        var outFile = new File(File.IMPEX + '/src/' + params.filename);
        svc.setOutFile(outFile);

        return null;
    },

    parseResponse: function (svc, client) {
        return {
            success: client.statusCode === 200,
            file: svc.outFile
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Response Caching

Enable caching for GET requests:

```javascript
var cachedService = LocalServiceRegistry.createService('my.cached.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        // Cache for 5 minutes
        svc.setCachingTTL(300);
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

Caching restrictions:
- Only GET requests
- Only 2xx status codes
- Response < 50KB
- Response not written to file

##### Custom HTTP Client Configuration

Override HTTP client options:

```javascript
var customService = LocalServiceRegistry.createService('my.custom.api', {
    initServiceClient: function (svc) {
        // Return configuration options
        return {
            allowHTTP2: true
        };
    },

    createRequest: function (svc, params) {
        svc.setRequestMethod('GET');
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Mutual TLS (mTLS)

For client certificate authentication:

```javascript
var KeyRef = require('dw/crypto/KeyRef');

var mtlsService = LocalServiceRegistry.createService('my.mtls.api', {
    createRequest: function (svc, params) {
        // Set client certificate
        svc.setIdentity(new KeyRef('my-client-cert'));
        svc.setRequestMethod('GET');
        return null;
    },

    parseResponse: function (svc, client) {
        return JSON.parse(client.text);
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### XML API Example

```javascript
var xmlService = LocalServiceRegistry.createService('my.xml.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/xml');
        svc.addHeader('Accept', 'application/xml');

        var xml = new XML('<request/>');
        xml.@id = params.id;
        xml.name = params.name;

        return xml.toXMLString();
    },

    parseResponse: function (svc, client) {
        var responseXml = new XML(client.text);
        return {
            status: responseXml.status.toString(),
            message: responseXml.message.toString()
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Error Response Handling

```javascript
var robustService = LocalServiceRegistry.createService('my.robust.api', {
    createRequest: function (svc, params) {
        svc.setRequestMethod('POST');
        svc.addHeader('Content-Type', 'application/json');
        return JSON.stringify(params);
    },

    parseResponse: function (svc, client) {
        var response = {
            statusCode: client.statusCode,
            success: false,
            data: null,
            errors: []
        };

        if (client.statusCode >= 200 && client.statusCode < 300) {
            response.success = true;
            try {
                response.data = JSON.parse(client.text);
            } catch (e) {
                response.data = client.text;
            }
        } else {
            // Try to parse error response
            var errorBody = client.errorText || client.text;
            try {
                var errorData = JSON.parse(errorBody);
                response.errors = errorData.errors || [errorData.message];
            } catch (e) {
                response.errors = [errorBody || 'Unknown error'];
            }
        }

        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

### Reference: SERVICES-XML.md

#### Services XML Import/Export Reference

XML format for importing and exporting service configurations via site import/export.

##### XSD Schema Reference

For the authoritative XML schema definition, use the `b2c` CLI (if installed):

```bash
# View the services XSD schema
b2c docs schema services
```

##### XML Namespace

```xml
<?xml version="1.0" encoding="UTF-8"?>
<services xmlns="http://www.demandware.com/xml/impex/services/2014-09-26">
    <!-- service-credential, service-profile, and service elements -->
</services>
```

##### XML Structure

Services XML contains three types of elements that must appear in this order:

1. `service-credential` - Authentication and URL configuration
2. `service-profile` - Rate limiting and circuit breaker settings
3. `service` - Service configuration linking credentials and profiles

##### Service Credential

Defines authentication credentials and base URL.

```xml
<service-credential service-credential-id="my.api.credential">
    <url>https://api.example.com/v1</url>
    <user-id>api_user</user-id>
    <password>plaintext_password</password>
</service-credential>
```

###### Credential Elements

| Element | Required | Description |
|---------|----------|-------------|
| `url` | No | Base URL for the service |
| `user-id` | No | Username for authentication |
| `password` | No | Password (plain text on import, encrypted on export) |
| `custom-attributes` | No | Custom attributes for the credential |

###### Password Encryption

On export, passwords are encrypted:

```xml
<password encrypted="true" encryption-type="common.export">
    bZHe1DBvCOyUTyHpte9DSgQ2qpqQXe+s6vlsRYbEYAs=
</password>
```

On import, use plain text:

```xml
<password>my_secret_password</password>
```

###### Credential with Custom Attributes

```xml
<service-credential service-credential-id="aws.s3">
    <url>https://bucket-name.s3.amazonaws.com</url>
    <user-id>AWS_ACCESS_KEY_ID</user-id>
    <password>AWS_SECRET_ACCESS_KEY</password>
    <custom-attributes>
        <custom-attribute attribute-id="awsRegion">us-east-2</custom-attribute>
    </custom-attributes>
</service-credential>
```

##### Service Profile

Defines timeout, rate limiting, and circuit breaker settings.

```xml
<service-profile service-profile-id="my.api.profile">
    <timeout-millis>30000</timeout-millis>
    <rate-limit-enabled>true</rate-limit-enabled>
    <rate-limit-calls>10</rate-limit-calls>
    <rate-limit-millis>2000</rate-limit-millis>
    <cb-enabled>true</cb-enabled>
    <cb-calls>5</cb-calls>
    <cb-millis>5000</cb-millis>
</service-profile>
```

###### Profile Elements

| Element | Required | Default | Description |
|---------|----------|---------|-------------|
| `timeout-millis` | No | 30000 | Request timeout in milliseconds |
| `rate-limit-enabled` | No | false | Enable rate limiting |
| `rate-limit-calls` | No | 0 | Max calls in rate limit window |
| `rate-limit-millis` | No | 0 | Rate limit time window in ms |
| `cb-enabled` | No | false | Enable circuit breaker |
| `cb-ignore-5xx` | No | false | Don't count 5xx as failures |
| `cb-calls` | No | 0 | Failures before circuit opens |
| `cb-millis` | No | 0 | Circuit breaker time window |
| `custom-attributes` | No | | Custom attributes |

###### Profile Examples

**High-throughput API:**
```xml
<service-profile service-profile-id="high-throughput">
    <timeout-millis>5000</timeout-millis>
    <rate-limit-enabled>true</rate-limit-enabled>
    <rate-limit-calls>100</rate-limit-calls>
    <rate-limit-millis>1000</rate-limit-millis>
    <cb-enabled>true</cb-enabled>
    <cb-calls>10</cb-calls>
    <cb-millis>2000</cb-millis>
</service-profile>
```

**Long-running service (no rate limit):**
```xml
<service-profile service-profile-id="long-running">
    <timeout-millis>90000</timeout-millis>
    <rate-limit-enabled>false</rate-limit-enabled>
    <rate-limit-calls>0</rate-limit-calls>
    <rate-limit-millis>0</rate-limit-millis>
    <cb-enabled>true</cb-enabled>
    <cb-calls>3</cb-calls>
    <cb-millis>1000</cb-millis>
</service-profile>
```

**No protections (internal service):**
```xml
<service-profile service-profile-id="internal">
    <timeout-millis>60000</timeout-millis>
    <rate-limit-enabled>false</rate-limit-enabled>
    <rate-limit-calls>0</rate-limit-calls>
    <rate-limit-millis>0</rate-limit-millis>
    <cb-enabled>false</cb-enabled>
    <cb-calls>0</cb-calls>
    <cb-millis>0</cb-millis>
</service-profile>
```

##### Service

Links service type, profile, and credential together.

```xml
<service service-id="my.api.service">
    <service-type>HTTP</service-type>
    <enabled>true</enabled>
    <log-prefix>myapi</log-prefix>
    <comm-log-enabled>false</comm-log-enabled>
    <force-prd-enabled>true</force-prd-enabled>
    <mock-mode-enabled>false</mock-mode-enabled>
    <profile-id>my.api.profile</profile-id>
    <credential-id>my.api.credential</credential-id>
</service>
```

###### Service Elements

| Element | Required | Description |
|---------|----------|-------------|
| `service-type` | Yes | HTTP, HTTPForm, FTP, SFTP, SOAP, GENERIC |
| `enabled` | No | Enable/disable the service |
| `log-prefix` | No | Prefix for log entries |
| `comm-log-enabled` | No | Enable communication logging |
| `force-prd-enabled` | No | Force logging on production |
| `mock-mode-enabled` | No | Enable mock mode |
| `profile-id` | No | Reference to service profile |
| `credential-id` | No | Reference to service credential |
| `custom-attributes` | No | Custom attributes |

###### Service Types

| Type | Description |
|------|-------------|
| `HTTP` | Standard HTTP/HTTPS requests |
| `HTTPForm` | Form-encoded HTTP requests |
| `FTP` | FTP file transfer (deprecated) |
| `SFTP` | Secure FTP file transfer |
| `SOAP` | SOAP web services |
| `GENERIC` | Custom protocol implementation |

##### Complete Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<services xmlns="http://www.demandware.com/xml/impex/services/2014-09-26">

    <!-- OAuth Token Endpoint Credential -->
    <service-credential service-credential-id="my.oauth.token.cred">
        <url>https://auth.example.com/oauth/token</url>
        <user-id>client_id_here</user-id>
        <password>client_secret_here</password>
    </service-credential>

    <!-- API Credential (no auth needed, only URL) -->
    <service-credential service-credential-id="my.api.cred">
        <url>https://api.example.com/v2</url>
    </service-credential>

    <!-- SFTP Credential -->
    <service-credential service-credential-id="my.sftp.cred">
        <url>sftp://sftp.example.com:22</url>
        <user-id>sftp_user</user-id>
        <password>sftp_password</password>
    </service-credential>

    <!-- Standard API Profile -->
    <service-profile service-profile-id="standard.api">
        <timeout-millis>15000</timeout-millis>
        <rate-limit-enabled>true</rate-limit-enabled>
        <rate-limit-calls>10</rate-limit-calls>
        <rate-limit-millis>2000</rate-limit-millis>
        <cb-enabled>true</cb-enabled>
        <cb-calls>5</cb-calls>
        <cb-millis>2000</cb-millis>
    </service-profile>

    <!-- Auth Profile (short timeout) -->
    <service-profile service-profile-id="auth.profile">
        <timeout-millis>5000</timeout-millis>
        <rate-limit-enabled>false</rate-limit-enabled>
        <rate-limit-calls>0</rate-limit-calls>
        <rate-limit-millis>0</rate-limit-millis>
        <cb-enabled>false</cb-enabled>
        <cb-calls>0</cb-calls>
        <cb-millis>0</cb-millis>
    </service-profile>

    <!-- SFTP Profile -->
    <service-profile service-profile-id="sftp.profile">
        <timeout-millis>60000</timeout-millis>
        <rate-limit-enabled>true</rate-limit-enabled>
        <rate-limit-calls>5</rate-limit-calls>
        <rate-limit-millis>10000</rate-limit-millis>
        <cb-enabled>true</cb-enabled>
        <cb-calls>3</cb-calls>
        <cb-millis>5000</cb-millis>
    </service-profile>

    <!-- OAuth Token Service -->
    <service service-id="my.oauth.token">
        <service-type>HTTPForm</service-type>
        <enabled>true</enabled>
        <log-prefix>oauth</log-prefix>
        <comm-log-enabled>false</comm-log-enabled>
        <force-prd-enabled>true</force-prd-enabled>
        <mock-mode-enabled>false</mock-mode-enabled>
        <profile-id>auth.profile</profile-id>
        <credential-id>my.oauth.token.cred</credential-id>
    </service>

    <!-- Main API Service -->
    <service service-id="my.api">
        <service-type>HTTP</service-type>
        <enabled>true</enabled>
        <log-prefix>myapi</log-prefix>
        <comm-log-enabled>false</comm-log-enabled>
        <force-prd-enabled>true</force-prd-enabled>
        <mock-mode-enabled>false</mock-mode-enabled>
        <profile-id>standard.api</profile-id>
        <credential-id>my.api.cred</credential-id>
    </service>

    <!-- SFTP Service -->
    <service service-id="my.sftp">
        <service-type>SFTP</service-type>
        <enabled>true</enabled>
        <log-prefix>sftp</log-prefix>
        <comm-log-enabled>true</comm-log-enabled>
        <force-prd-enabled>false</force-prd-enabled>
        <mock-mode-enabled>false</mock-mode-enabled>
        <profile-id>sftp.profile</profile-id>
        <credential-id>my.sftp.cred</credential-id>
    </service>

</services>
```

##### Delete Mode

To delete a service configuration during import, use `mode="delete"`:

```xml
<service service-id="old.service" mode="delete">
    <service-type>HTTP</service-type>
</service>

<service-profile service-profile-id="old.profile" mode="delete"/>

<service-credential service-credential-id="old.credential" mode="delete"/>
```

##### Import via CLI

```bash
# Import services configuration
b2c job import ./my-import-folder --wait

# The import folder should contain services.xml at the root
```

##### Export via Business Manager

1. Go to **Administration > Site Development > Site Import & Export**
2. Select **Export** and choose **Services**
3. Download the exported archive containing `services.xml`

##### Best Practices

1. **Use consistent naming**: Match service-id, profile-id, and credential-id
   ```
   my.integration         (service)
   my.integration         (profile)
   my.integration.cred    (credential)
   ```

2. **Separate auth credentials**: Create dedicated credentials for OAuth token endpoints
   ```
   my.api.cred           (API calls)
   my.api.auth.cred      (Token endpoint)
   ```

3. **Environment-specific credentials**: Use different credential IDs per environment
   ```
   my.api.dev.cred       (Development)
   my.api.stg.cred       (Staging)
   my.api.prd.cred       (Production)
   ```

4. **Don't commit passwords**: Remove or mask passwords in version-controlled files
   ```xml
   <password>PLACEHOLDER</password>
   ```

5. **Set appropriate timeouts**: Match profile timeout to expected response times
   - Auth endpoints: 5000ms
   - Standard APIs: 15000-30000ms
   - File transfers: 60000ms+
   - Long-running processes: 90000ms+

### Reference: SOAP-SERVICES.md

#### SOAP Services Reference

Patterns for implementing SOAP web service integrations using WSDL-generated stubs.

##### SOAPService Methods

| Method | Description |
|--------|-------------|
| `setServiceClient(stub)` | Set the WSDL-generated service stub |
| `getServiceClient()` | Get the service stub |
| `setAuthentication(type)` | Set auth type ("BASIC" or "NONE") |

##### SOAP Service Setup

###### 1. Upload WSDL

Upload your WSDL file to Business Manager:
1. Go to **Administration > Development Setup**
2. Under **WebDAV** section, navigate to the cartridge
3. Upload WSDL to `webreferences2/` folder

###### 2. Generate Stub

The stub is auto-generated from the WSDL. Access it via:

```javascript
var stub = webreferences2.MyServiceWSDL.getDefaultService();
```

###### 3. Create Service Configuration

Configure in Business Manager:
1. **Service Type**: SOAP
2. **URL**: The SOAP endpoint URL
3. **Credential**: Authentication credentials

##### Basic SOAP Service

```javascript
var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

var soapService = LocalServiceRegistry.createService('my.soap.service', {
    /**
     * Create the service client (stub)
     */
    initServiceClient: function (svc) {
        return webreferences2.MyServiceWSDL.getDefaultService();
    },

    /**
     * Configure the request
     */
    createRequest: function (svc, params) {
        // Create request object from WSDL-generated types
        var request = new webreferences2.MyServiceWSDL.MyRequest();
        request.setId(params.id);
        request.setName(params.name);
        return request;
    },

    /**
     * Execute the SOAP call
     */
    execute: function (svc, request) {
        var client = svc.serviceClient;
        return client.myOperation(request);
    },

    /**
     * Parse the response
     */
    parseResponse: function (svc, response) {
        return {
            status: response.getStatus(),
            result: response.getResult()
        };
    },

    filterLogMessage: function (msg) {
        // Filter sensitive data from SOAP envelope
        msg = msg.replace(/<password>[^<]+<\/password>/gi, '<password>***</password>');
        return msg;
    }
});

// Usage
var result = soapService.call({ id: '123', name: 'Test' });
if (result.ok) {
    var data = result.object;
}
```

##### Alternative: Set Client in createRequest

```javascript
var soapService = LocalServiceRegistry.createService('my.soap.service', {
    createRequest: function (svc, params) {
        // Set the service client here instead of initServiceClient
        var stub = webreferences2.MyServiceWSDL.getDefaultService();
        svc.setServiceClient(stub);

        // Create request
        var request = new webreferences2.MyServiceWSDL.MyRequest();
        request.setId(params.id);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.myOperation(request);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### WS-Security

Use `WSUtil` for WS-Security headers:

```javascript
var WSUtil = require('dw/ws/WSUtil');

var secureService = LocalServiceRegistry.createService('my.secure.soap', {
    initServiceClient: function (svc) {
        return webreferences2.SecureServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        var stub = svc.serviceClient;

        // Add WS-Security UsernameToken
        var credential = svc.configuration.credential;
        WSUtil.setWSSecurityUsernameToken(
            stub,
            credential.user,
            credential.password,
            null  // nonce (optional)
        );

        var request = new webreferences2.SecureServiceWSDL.SecureRequest();
        request.setData(params.data);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.secureOperation(request);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        msg = msg.replace(/<wsse:Password[^>]*>[^<]+<\/wsse:Password>/gi, '<wsse:Password>***</wsse:Password>');
        return msg;
    }
});
```

###### WSUtil Methods

| Method | Description |
|--------|-------------|
| `setWSSecurityUsernameToken(stub, user, pass, nonce)` | Add UsernameToken header |
| `setProperty(stub, property, value)` | Set SOAP property |
| `addSOAPHeader(stub, namespace, name, value)` | Add custom SOAP header |

###### WS-Security with Timestamps

```javascript
var WSUtil = require('dw/ws/WSUtil');

var timestampService = LocalServiceRegistry.createService('my.timestamp.soap', {
    initServiceClient: function (svc) {
        return webreferences2.TimestampServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        var stub = svc.serviceClient;
        var credential = svc.configuration.credential;

        // Username token with timestamp
        WSUtil.setWSSecurityUsernameToken(
            stub,
            credential.user,
            credential.password,
            WSUtil.generateNonce()
        );

        // Set timestamp properties
        WSUtil.setProperty(stub, WSUtil.WS_ACTION, 'Timestamp UsernameToken');

        var request = new webreferences2.TimestampServiceWSDL.Request();
        request.setData(params.data);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.operation(request);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg.replace(/<wsse:Password[^>]*>[^<]+<\/wsse:Password>/gi, '<wsse:Password>***</wsse:Password>');
    }
});
```

##### Custom SOAP Headers

```javascript
var WSUtil = require('dw/ws/WSUtil');

var headerService = LocalServiceRegistry.createService('my.header.soap', {
    initServiceClient: function (svc) {
        return webreferences2.HeaderServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        var stub = svc.serviceClient;

        // Add custom SOAP header
        WSUtil.addSOAPHeader(
            stub,
            'http://example.com/ns',
            'CustomHeader',
            '<customValue>' + params.headerValue + '</customValue>'
        );

        var request = new webreferences2.HeaderServiceWSDL.Request();
        request.setData(params.data);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.operation(request);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Handling Complex Types

WSDL-generated types provide setters and getters:

```javascript
var orderService = LocalServiceRegistry.createService('my.order.soap', {
    initServiceClient: function (svc) {
        return webreferences2.OrderServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, order) {
        var request = new webreferences2.OrderServiceWSDL.CreateOrderRequest();

        // Set order header
        var header = new webreferences2.OrderServiceWSDL.OrderHeader();
        header.setOrderNumber(order.orderNo);
        header.setOrderDate(order.creationDate);
        header.setCurrency(order.currencyCode);
        request.setHeader(header);

        // Set line items (array)
        var lineItems = [];
        for (var i = 0; i < order.productLineItems.length; i++) {
            var pli = order.productLineItems[i];
            var lineItem = new webreferences2.OrderServiceWSDL.LineItem();
            lineItem.setSku(pli.productID);
            lineItem.setQuantity(pli.quantity.value);
            lineItem.setPrice(pli.price.value);
            lineItems.push(lineItem);
        }
        request.setLineItems(lineItems);

        // Set shipping address
        var address = new webreferences2.OrderServiceWSDL.Address();
        var shipAddr = order.defaultShipment.shippingAddress;
        address.setFirstName(shipAddr.firstName);
        address.setLastName(shipAddr.lastName);
        address.setAddress1(shipAddr.address1);
        address.setCity(shipAddr.city);
        address.setPostalCode(shipAddr.postalCode);
        address.setCountryCode(shipAddr.countryCode.value);
        request.setShippingAddress(address);

        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.createOrder(request);
    },

    parseResponse: function (svc, response) {
        return {
            success: response.isSuccess(),
            externalOrderId: response.getExternalOrderId(),
            message: response.getMessage()
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Error Handling

```javascript
var robustSoapService = LocalServiceRegistry.createService('my.robust.soap', {
    initServiceClient: function (svc) {
        return webreferences2.RobustServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        var request = new webreferences2.RobustServiceWSDL.Request();
        request.setData(params);
        return request;
    },

    execute: function (svc, request) {
        try {
            return svc.serviceClient.operation(request);
        } catch (e) {
            // Handle SOAP faults
            var faultMessage = '';
            if (e.faultString) {
                faultMessage = e.faultString;
            } else if (e.message) {
                faultMessage = e.message;
            }
            throw new Error('SOAP Fault: ' + faultMessage);
        }
    },

    parseResponse: function (svc, response) {
        if (!response) {
            return { success: false, error: 'No response received' };
        }

        return {
            success: response.getStatus() === 'SUCCESS',
            data: response.getData(),
            errorCode: response.getErrorCode(),
            errorMessage: response.getErrorMessage()
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Mock SOAP Services

```javascript
var mockSoapService = LocalServiceRegistry.createService('my.mock.soap', {
    initServiceClient: function (svc) {
        return webreferences2.MockServiceWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        var request = new webreferences2.MockServiceWSDL.Request();
        request.setId(params.id);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.getData(request);
    },

    parseResponse: function (svc, response) {
        return {
            id: response.getId(),
            name: response.getName(),
            status: response.getStatus()
        };
    },

    /**
     * Mock the execute phase
     */
    mockCall: function (svc, request) {
        // Return mock response object
        return {
            getId: function () { return request.getId(); },
            getName: function () { return 'Mock Name'; },
            getStatus: function () { return 'ACTIVE'; }
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});
```

##### Multiple Operations

```javascript
var multiOpService = LocalServiceRegistry.createService('my.multi.soap', {
    initServiceClient: function (svc) {
        return webreferences2.MultiOpWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        // Store operation type for execute
        svc.operationType = params.operation;

        var request;
        switch (params.operation) {
            case 'create':
                request = new webreferences2.MultiOpWSDL.CreateRequest();
                request.setData(params.data);
                break;
            case 'update':
                request = new webreferences2.MultiOpWSDL.UpdateRequest();
                request.setId(params.id);
                request.setData(params.data);
                break;
            case 'delete':
                request = new webreferences2.MultiOpWSDL.DeleteRequest();
                request.setId(params.id);
                break;
        }
        return request;
    },

    execute: function (svc, request) {
        var client = svc.serviceClient;
        switch (svc.operationType) {
            case 'create':
                return client.create(request);
            case 'update':
                return client.update(request);
            case 'delete':
                return client.delete(request);
        }
    },

    parseResponse: function (svc, response) {
        return {
            success: response.isSuccess(),
            message: response.getMessage()
        };
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage
var createResult = multiOpService.call({
    operation: 'create',
    data: { name: 'New Item' }
});

var updateResult = multiOpService.call({
    operation: 'update',
    id: '123',
    data: { name: 'Updated Item' }
});
```

##### Setting SOAP Endpoint

Override the endpoint URL at runtime:

```javascript
var dynamicEndpointService = LocalServiceRegistry.createService('my.dynamic.soap', {
    initServiceClient: function (svc) {
        return webreferences2.DynamicWSDL.getDefaultService();
    },

    createRequest: function (svc, params) {
        // Override endpoint if specified
        if (params.endpoint) {
            svc.setURL(params.endpoint);
        }

        var request = new webreferences2.DynamicWSDL.Request();
        request.setData(params.data);
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.operation(request);
    },

    parseResponse: function (svc, response) {
        return response;
    },

    filterLogMessage: function (msg) {
        return msg;
    }
});

// Usage with custom endpoint
var result = dynamicEndpointService.call({
    endpoint: 'https://custom-endpoint.example.com/soap',
    data: { key: 'value' }
});
```

##### MTOM/Attachments

For SOAP services with binary attachments:

```javascript
var WSUtil = require('dw/ws/WSUtil');

var mtomService = LocalServiceRegistry.createService('my.mtom.soap', {
    initServiceClient: function (svc) {
        var stub = webreferences2.MTOMServiceWSDL.getDefaultService();

        // Enable MTOM
        WSUtil.setProperty(stub, WSUtil.WS_MTOM_ENABLED, true);

        return stub;
    },

    createRequest: function (svc, params) {
        var request = new webreferences2.MTOMServiceWSDL.UploadRequest();
        request.setFileName(params.fileName);
        request.setFileData(params.fileData); // byte array
        return request;
    },

    execute: function (svc, request) {
        return svc.serviceClient.upload(request);
    },

    parseResponse: function (svc, response) {
        return {
            success: response.isSuccess(),
            fileId: response.getFileId()
        };
    },

    filterLogMessage: function (msg) {
        // Don't log binary data
        return msg.replace(/<fileData>[^<]*<\/fileData>/gi, '<fileData>***BINARY***</fileData>');
    }
});
```

---

