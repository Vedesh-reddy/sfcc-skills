# Runtimes: which JavaScript am I writing?

SFCC projects mix four runtimes. Code that is correct in one is often broken in another. **Identify the runtime from the file path before writing code.**

| Where the file lives | Runtime | Module system | Can use | Must not use |
|---|---|---|---|---|
| `cartridge/controllers/**`, `cartridge/scripts/**`, `cartridge/models/**`, job steps, hooks, `cartridge/rest-apis/**` scripts | **SFCC server-side script** (Rhino) | CommonJS `require` / `module.exports`; `*/cartridge/...` resolves along the cartridge path; `module.superModule` | `dw.*` Script API, `server` (SFRA), `Transaction`, `LocalServiceRegistry` | Node built-ins (`fs`, `http`, `process`, `Buffer`), npm packages, `fetch`, `async`/`await`, Promises for I/O, `setTimeout`, `console` (use `dw.system.Logger`) |
| `cartridge/templates/**/*.isml` | **ISML** (server-rendered) | `<isscript>` blocks run as server script | `${...}` expressions (HTML-encoded by default), `<isprint>`, `<isinclude>`, `<iscache>` | Browser APIs; `encoding="off"` on untrusted data |
| `cartridge/client/**/js/**` (compiled to `cartridge/static/**`) | **Storefront browser JS** | Bundled (webpack via `sgmf-scripts` in SFRA) | DOM, jQuery (SFRA ships it), `fetch`/`$.ajax` to controller URLs | `dw.*` (doesn't exist in the browser), secrets, trusting prices or order state |
| Build tooling, CI, `package.json` scripts, MRT/PWA Kit / Storefront Next apps, `b2c` CLI | **Node.js** | CommonJS or ESM | Node + npm, SCAPI over HTTP | `dw.*`, `require('*/cartridge/...')` |

## Server-side script language level

Server-side B2C Commerce JavaScript runs on Mozilla Rhino. The **site's compatibility mode** sets the language level: modes before **21.2** are ES5; **21.2+** add some ES6 constructs (for example `let`/`const`, arrow functions); **22.7** adds more. It is never full modern JavaScript.

- Check the compatibility mode (Business Manager › Administration › Site Development › Code Deployment) before using ES6 syntax.
- ES5 (`var`, `function`) runs in every mode — the examples in this skill use it for that reason.
- No `async`/`await`, no native Promises for I/O: service calls and DB access are synchronous.
- Script API objects are Java-backed: `dw.util.Collection` is **not** a JS array (use `.size()`, `.get(i)`, `.iterator()`, `.toArray()`); `dw.util.Iterator` is not iterable with `for...of`.
- Varargs Script API methods (e.g. `CSVStreamWriter.writeNext(...line)`) take one argument per value.
- `JSON`, `RegExp`, `Date`, `Math` are available; `Intl` is not reliable — use `dw.util.StringUtils` / `dw.util.Calendar` for formatting.

## Quick checks before writing code

1. Server file? Every `require('dw/...')` must be a real Script API module — see `references/docs/index.md` or `b2c docs search`.
2. Browser file? No `dw.*`, no secrets; call a controller route and treat its response as untrusted input on the server side.
3. Node file? It talks to SFCC only over HTTP (SCAPI/OCAPI/WebDAV) — see `references/scapi-shopper/index.md`, `references/scapi-admin/index.md`.
