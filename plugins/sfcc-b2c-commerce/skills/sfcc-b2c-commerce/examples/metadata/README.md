# Example: custom attributes with import instructions

`site_template/meta/system-objecttype-extensions.xml` adds:

| Object | Attribute | Type | Used by |
|---|---|---|---|
| `Product` | `metalPurity` | enum-of-string (916 / 750 / 925) | `../chunk-job/` |
| `Order` | `razorpayOrderId`, `paymentReconState`, `paymentReconAttempts`, `paymentReconNote` | string / enum / int / string | `../payment-reconciliation/` |

The file validates against Salesforce's `metadata.xsd`.

## Rules that the schema enforces (and models often get wrong)

- **Element order inside `<attribute-definition>` is fixed** by the XSD: `display-name`, `description`, `type`, `localizable-flag`, `site-specific-flag`, `mandatory-flag`, `visible-flag`, `externally-managed-flag`, `order-required-flag`, `externally-defined-flag`, `min-length`, `field-length`, … `value-definitions`, `default-value`.
- **String length is `<field-length>`.** There is no `<max-length>` element in metadata XML (that attribute exists only in form XML).
- **In `<value-definition>`, `<display>` comes before `<value>`.**
- `<mandatory-flag>` is accepted but ignored on import (the XSD marks it deprecated/immutable); enforce required values in code or forms.
- `&` must be escaped as `&amp;` in display names.
- Attributes you want editable in Business Manager must be in an `<attribute-group>`.

## Import

The archive layout is `site_template/meta/system-objecttype-extensions.xml`. Import the directory, then confirm:

```bash
b2c job import ./site_template
b2c job log sfcc-site-archive-import --failed
```

Import is additive for attribute definitions: removing an attribute from this file does **not** delete it from the instance. Delete attributes deliberately in Business Manager, after checking no code or data depends on them.
