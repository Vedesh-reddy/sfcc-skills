# Governing SFCC B2C Commerce directive

> `app_<brand>` stands for your project's custom storefront cartridge (the one left of `app_storefront_base` on the cartridge path). Substitute the real name when you apply this directive.
 
This directive governs all code edits, refactors, plans, reviews, tool calls, and architectural decisions in this repository. It records the repository owner's engineering instructions for future sessions.
 
## Absolute Git Action Prohibition
 
**NEVER PERFORM ANY GIT ACTION.**
 
This is a strict, non-negotiable repository rule.
 
The assistant MUST NOT execute, invoke, suggest execution of, or automate any Git command or Git-related repository mutation.
 
This includes, but is not limited to:
 
```text
git init
git clone
git add
git commit
git push
git pull
git fetch
git merge
git rebase
git checkout
git switch
git reset
git revert
git stash
git cherry-pick
git tag
git branch
git clean
git restore
git rm
git mv
git config
git remote
```
 
Also prohibited:
 
- creating commits
- modifying branches
- switching branches
- creating or deleting branches
- pushing changes
- pulling changes
- fetching remote changes
- resolving merges
- rebasing
- resetting repository state
- modifying Git configuration
- modifying remotes
- creating tags
- staging or unstaging files
- cleaning untracked files through Git
- invoking Git through scripts or other tools
- using IDE Git actions
- using GitHub/GitLab/Bitbucket repository mutation actions
 
### Read-Only Repository Inspection
 
Repository files may be inspected using normal filesystem or code-search operations when required.
 
Reading repository state must never result in a Git mutation.
 
Do not use Git commands merely to inspect the repository when equivalent filesystem or code-search inspection is available.
 
### User-Controlled Git Operations
 
The assistant may prepare code changes for the user, but **the user is solely responsible for all Git operations**.
 
The assistant must stop at the completed working-tree change.
 
It must never:
 
```text
stage
commit
push
pull
merge
rebase
reset
checkout
switch
stash
```
 
or otherwise modify Git state.
 
### Priority
 
This rule overrides convenience, workflow automation, task completion, user assumptions, and any other repository workflow instruction.
 
**Code changes are allowed. Git actions are never allowed.**
 
## Priorities
 
1. Preserve platform and repository integrity.
2. Preserve security, data integrity, accessibility, and existing behavior.
3. Reuse existing code and platform capabilities.
4. Minimize the implementation and diff.
5. Avoid speculative engineering.
 
Code never written = code never maintained = code never breaks.
 
Prefer deletion, reuse, configuration, and platform-native capabilities over new code. Among equivalent solutions, choose fewer files, lines, dependencies, abstractions, and maintenance points. Default to doing nothing without a demonstrated requirement.
 
## Required decisions before implementation
 
Every task must pass these decisions in order before code is written:
 
1. Determine whether the change and behavior are explicitly required, solve a current problem, and can be achieved without adding code. Reject speculative parameters, unused configuration, future-proof abstractions, unnecessary wrappers, premature optimization, generic utilities for one caller, unnecessary feature flags, and duplicated validation.
2. Search the repository before creating logic, especially `app_<brand>/` (your custom storefront cartridge), `int_*/`, `plugin_*/`, `lib_productlist/`, and `bm_tools/`. Look for helpers, models, decorators, controllers, middleware, services, utilities, forms, validation, logging, SCSS, ISML components, and API integrations. Reuse or extend equivalent logic regardless of where it lives; never create a second implementation merely because the first is elsewhere.
3. Check supported SFCC JavaScript runtime features, native methods, `dw.*` APIs, and existing SFCC utilities before custom algorithms or utilities. Prefer supported `map`, `filter`, `find`, `Object.keys`, `trim`, `JSON.parse`, and `JSON.stringify` over reimplementations.
4. Check whether Business Manager or SFCC configuration solves the requirement: system/site/custom preferences, custom attributes, content assets/slots, forms, jobs, metadata, services, hooks, applicable pipelines, platform caching/validation, and native permissions/security. Configuration beats code when safe and maintainable.
5. Before dependencies, check existing repository dependencies, SFRA/Bootstrap, and native platform capabilities. Never install a library for a trivial problem or mere convenience. New dependencies require explicit justification of why SFRA, native SFCC, and repository dependencies are insufficient and why the maintenance cost is justified. If reasonably possible without the dependency, do not add it.
6. Implement the smallest safe change, maximizing reuse and minimizing files, lines, abstractions, dependencies, and behavioral changes. Avoid unnecessary refactors, unrelated cleanup/formatting/renames, unrequired architecture changes, and duplicate implementations.
 
Before modifying code, map cartridge structure and path/order, controller or script entry point, existing extensions/decorators, related models/helpers, ISML, SCSS, logging, and tests. Search relevant routes, templates, services, forms, selectors, attributes, and configuration; do not assume an implementation is absent without searching.
 
Answer before implementation:
 
1. Where does current behavior originate?
2. Is there already an implementation?
3. Which cartridge owns it?
4. Can it be extended instead of replaced?
5. Can Business Manager configuration solve it?
6. What is the smallest safe change?
7. What existing behavior must remain unchanged?
 
## Cartridge integrity and extensions
 
These locations are read-only:
 
- `storefront-reference-architecture/cartridges/app_storefront_base`
- `bm_app_storefront_base`
- `modules`
- Vendor LINK cartridges
 
Never edit, delete, rename, move, directly patch, or unnecessarily copy-and-modify base/vendor files. Preserve upgrades, patches, vendor updates, mergeability, and maintainability. Custom behavior belongs in `app_<brand>`, `int_*`, `plugin_*`, or another approved custom overlay cartridge.
 
Use SFRA extension mechanisms before replacement: `module.superModule` with `server.append()`, `server.prepend()`, or `server.replace()` as appropriate. Use the smallest extension point. Do not copy entire base controllers for small changes. Prefer wrappers, decorators, local transformations, composition, and existing behavior extensions. Avoid full replacement of models/scripts unless technically unavoidable; do not recreate a ViewModel when a decorator or local transformation suffices.
 
Extend the interface closest to the behavior's source. Fix incorrect shared helpers/models/services at the shared interface instead of adding workarounds to each caller. Downstream guards are appropriate only for distinct trust boundaries or business rules.
 
## Security and persistent data
 
Never sacrifice security for minimal code. Preserve authentication, authorization, CSRF, form/input/server-side validation, sanitization, output encoding, access controls, and session/security checks. Never rely exclusively on browser validation.
 
Treat request parameters, forms, query strings, cookies, headers, external API responses, client values, and third-party integrations as untrusted. Validate at the appropriate server-side boundary, even if the current upstream caller is trusted.
 
For persistent data, validate before mutation, prepare changes, use appropriate minimal SFCC transactions, commit, and handle the result. Avoid unnecessary writes and large transaction scopes. Handle failures explicitly and prevent partial updates.
 
Handle errors at the appropriate boundary. Do not silently swallow exceptions, return misleading success, add generic catches without recovery, hide platform errors, or duplicate error handling at every caller. Preserve unrecoverable error context, log appropriately, and return expected application behavior without exposing sensitive internals.
 
## Logging
 
Generic or uncategorized logging is forbidden. Every logger must use:
 
```javascript
var Logger = require('dw/system/Logger');
var customLogger = Logger.getLogger('file-name-prefix', 'category-name');
```
 
Both arguments must be kebab-case. The file prefix identifies the functional module (e.g. `checkout-custom`, `product-search`, `customer-account`, `order-export`); the category identifies the operational domain (e.g. `order-payments`, `customer-session`, `product-validation`, `external-api`).
 
Never log passwords, authentication tokens, payment credentials, session secrets, unnecessary PII, complete customer records, or sensitive API responses. Log only what diagnosis requires.
 
## UI, SCSS, and accessibility
 
New custom CSS/SCSS classes, ISML IDs, template selectors, static asset names, log prefixes, and log categories must use kebab-case (e.g. `account-panel-container`). Do not rename unrelated existing identifiers. Change a touched noncompliant identifier only when the task requires it and its blast radius is understood.
 
Follow SFRA and Bootstrap patterns. Use supported Bootstrap utilities in ISML for structure/layout, such as `d-flex`, `flex-row`, `flex-column`, `justify-content-*`, `align-items-*`, `flex-grow-*`, `w-0`, `w-100`, `p-0`, `px-0`, `py-0`, `pt-0`, and `pb-0`. Do not create SCSS for layout already provided by Bootstrap or invent utilities it already supplies.
 
Do not create custom rules for `width: 0`, `width: 100%`, `padding: 0`, or `padding: 100%`; use corresponding Bootstrap utilities (`w-0`, `w-100`, `p-0`, `p-100`, and directional utilities) where supported.
 
CSS Grid is prohibited, including `display: grid`, `grid-template-columns`, `grid-template-rows`, and `grid-area`. The desktop mega-navigation `.categories-section` may use Grid only when explicitly authorized by the repository owner. Document the exception and upgrade condition (remove when Bootstrap/flex provides the same behavior) according to the final Comment Governance policy below; it overrides the earlier standardized `ponytail` comment requirement.
 
SCSS should primarily express brand typography, colors, borders, shadows, unique visual treatment, and component-specific visual behavior. Cross-cartridge SCSS imports must use available module aliases, e.g. `@import "~base/variables"`, rather than fragile cross-cartridge relative paths.
 
Accessibility is mandatory. Preserve WCAG-compatible semantic HTML, keyboard operation, visible focus, accessible labels, appropriate ARIA, meaningful button/link semantics, required alt text, logical headings, and clear interactions. Do not unnecessarily replace semantic elements with clickable divs. ARIA supplements correct HTML semantics.
 
## Performance and integrations
 
Performance changes require evidence or explicit requirements. Do not add speculative caching, memoization, asynchronous complexity, database optimizations, API calls, or client state management. Prefer existing platform caching/mechanisms, reduced queries/data, reuse, and measured optimization before architecture changes.
 
Before integrations, check existing service definitions, helpers/clients, credentials/configuration, and SFCC capabilities. Reuse error handling and logging. Never hardcode keys, passwords, tokens, secrets, or environment credentials. Account for timeouts, failures, response validation, unexpected payloads, secret-free logging, and appropriate retry behavior. Add retries only for safe operations when justified by the requirement.
 
## Scope, exceptions, and completion checks
 
Do not mix feature work with unrelated refactoring, formatting, dependency upgrades, or naming cleanup. Inspect the final diff: only required files changed; base/vendor files untouched; no unrelated refactors, unnecessary dependencies, duplicate logic, dead code, unused variables/configuration, or unnecessary comments. Delete anything that can be removed without breaking the requirement.
 
Intentional architectural/platform deviations must be localized, safe, reversible, and documented inline when context is necessary. Explain important upgrade conditions. Never use shortcuts to bypass security, validation, data integrity, authorization, or accessibility. The final Comment Governance policy below supersedes the earlier mandatory `// ponytail: ... | upgrade path: ...` format.
 
Before declaring completion, verify all applicable items:
 
- Correct custom cartridge and extension mechanism; existing utilities searched/reused; no unnecessary abstraction; base/vendor untouched.
- Input validated and sanitized where required; CSRF, authorization, and sensitive-data protection preserved.
- Transaction boundaries reviewed; partial updates prevented; error handling verified.
- New selectors kebab-case; Bootstrap utilities used appropriately; no unauthorized Grid; accessibility and semantic markup preserved.
- Every logger uses categorized `Logger.getLogger()` with kebab-case prefix/category; expensive debug logging guarded; no sensitive data logged.
- No dead code, duplicate implementations, unnecessary dependencies, speculative features, or removable diff.
 
Before the final response, perform a repository-level check for `storefront-reference-architecture/cartridges/app_storefront_base`, `bm_app_storefront_base`, `modules`, `vendor`, `display: grid`, `grid-template`, `Logger.getLogger`, and `customLogger`. Confirm base files were not modified, no unauthorized Grid was introduced, all new selectors are kebab-case, all new logging is categorized, security remains intact, and the diff is the smallest reasonable change. Distinguish existing findings from changes; do not perform unrelated cleanup.
 
For implementation tasks, communicate in this order: explain where current behavior originates; identify the existing helper/model/controller/configuration/dependency/platform capability reused; then state:
 
```text
Cartridge:
File:
Extension point:
Change:
```
 
Make only the required change. Report:
 
```text
Base cartridge modified: No/Yes
Files changed:
Grid references:
New dependencies:
Logging compliance:
Security validation:
Accessibility:
```
 
Mention only real, actionable risks. Do not invent future problems.
 
Delete before adding. Reuse before creating. Configure before coding. Extend before replacing. Fix the root cause before downstream guards. Smallest safe diff wins.
 
Among technically valid implementations prefer less code, fewer files, more existing/native SFCC behavior, fewer dependencies/maintenance points, less behavioral change, and easier removal/verification.
 
Final question before every implementation: Can we solve this by deleting something, reusing something, configuring something, or changing less? If yes, do that first.
 
Ponytail Engineering = Maximum resilience through minimum necessary code.
 
## 27. Comment Governance (final, overriding comment policy)
 
Comments must be minimal and sound naturally written by a developer working in this codebase. Use them only when the reason for a decision is not obvious. Explain why, not mechanics. Keep the existing repository's writing style.
 
Do not describe obvious code, repeat names or requirements, explain basic JavaScript, narrate every line, use corporate language, generate excessive documentation, or add comments merely to appear documented. Clear code is preferable.
 
For deliberate shortcuts, exceptions, or deviations, explain naturally. Do not force a standardized prefix into source comments. Examples:
 
```javascript
// Keep this local for now; there is only one caller.
// The desktop mega menu is the only place where Grid is currently required.
// Reusing the existing session value avoids an unnecessary service call.
// Move this to the service once the session value is no longer authoritative.
```
 
Priority:
 
1. No comment when code is self-explanatory.
2. A short, natural comment when context is necessary.
3. Explain reasons, not mechanics.
4. Document unusual decisions or exceptions.
5. Never substitute comments for clean code.
 
Code should explain what it does. Comments should explain why it does it.
