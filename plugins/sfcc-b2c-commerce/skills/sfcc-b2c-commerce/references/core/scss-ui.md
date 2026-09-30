# SCSS, ISML markup and accessibility

How to apply the directive's UI rules. [directive.md](directive.md) governs; this file shows the patterns.

## Order of preference

1. **Existing markup/SCSS in the project** — search `app_<brand>` and plugin cartridges for the component first.
2. **Bootstrap utility classes in ISML** for layout and spacing.
3. **SCSS** only for brand typography, colors, borders, shadows and component-specific visuals.

## Bootstrap utilities (SFRA ships Bootstrap 4)

| Need | Use in ISML | Don't write in SCSS |
|---|---|---|
| Flex row / column | `d-flex flex-row`, `d-flex flex-column` | `display: flex; flex-direction: …` |
| Alignment | `justify-content-between`, `align-items-center` | `justify-content`, `align-items` |
| Grow / shrink | `flex-grow-1`, `flex-shrink-0` | `flex-grow: 1` |
| Full width | `w-100` | `width: 100%` |
| Other widths | `w-25`, `w-50`, `w-75`, `w-auto` | fixed percentage widths |
| No padding / margin | `p-0`, `px-0`, `py-0`, `pt-0`, `pb-0`, `m-0` | `padding: 0`, `margin: 0` |
| Spacing | `p-1`…`p-5`, `mt-3`, `mx-auto` | ad-hoc spacing values |
| Responsive | `d-none d-md-flex`, `flex-md-row` | media queries for show/hide or direction |
| Columns | `row` + `col-*` | CSS Grid |

**Bootstrap 4 has no `w-0` or `p-100`.** The directive lists them "where supported": use them only if your project defines them; otherwise use the nearest real utility, and never invent a utility class name.

## SCSS rules

```scss
@import "~base/variables";

.purity-badge {
    color: $white;
    background-color: $primary;
    border-radius: 0.25rem;
    font-weight: 600;
}

.purity-badge-label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

- kebab-case class names only (`purity-badge-label`, not `purityBadge__label` or `purity_badge`).
- Cross-cartridge imports use aliases (`~base/…`), never `../../../app_storefront_base/…`.
- **No CSS Grid** (`display: grid`, `grid-template-*`, `grid-area`). The only exception is the desktop mega-navigation `.categories-section`, and only with the owner's explicit approval, with a short comment saying why and when to remove it.
- Reuse existing variables and mixins before adding new ones; no new color literals when a variable exists.
- Don't restyle base components by copying their SCSS; override only the properties that change.

## ISML markup

```html
<div class="purity-badge-container d-flex align-items-center">
    <isif condition="${pdict.product.metalPurity}">
        <span class="purity-badge px-2 py-1">
            <span class="purity-badge-label">${Resource.msg('label.purity', 'product', null)}</span>
            <isprint value="${pdict.product.metalPurity}" encoding="htmlcontent"/>
        </span>
    </isif>
    <button type="button" class="btn btn-link p-0 purity-info-toggle"
            aria-expanded="false" aria-controls="purity-info">
        ${Resource.msg('button.purity.info', 'product', null)}
    </button>
</div>
<div id="purity-info" class="purity-info d-none">
    <isprint value="${pdict.purityInfo}" encoding="htmlcontent"/>
</div>
```

- Layout from utilities; the SCSS classes only carry visual styling.
- New classes and IDs are kebab-case; don't rename existing ones unless the task requires it.
- Text comes from resource bundles, output is encoded (never `encoding="off"` for untrusted data).

## Accessibility checklist

- Interactive things are `<button>` or `<a href>`, never clickable `<div>`/`<span>`.
- Every `<img>` has `alt` (empty `alt=""` only for decorative images).
- Form fields have a `<label for>` (or `aria-label` when no visible label is possible).
- Focus stays visible; don't remove `outline` without a replacement.
- Headings are in order; ARIA only supplements correct HTML (`aria-expanded`, `aria-controls`, `aria-live` for async updates).
- Everything works with the keyboard.
