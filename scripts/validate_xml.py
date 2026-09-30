#!/usr/bin/env python3
"""Validate every complete ```xml example in the skill against Salesforce's official XSDs.

XSDs come from SalesforceCommerceCloud/b2c-developer-tooling
(packages/b2c-tooling-sdk/data/xsd). Usage:
  python3 scripts/validate_xml.py <path-to-xsd-dir> [skill-dir]
Fragments (no namespaced root element) are reported as SKIPPED, not failed.
"""
import os, re, subprocess, sys, tempfile

xsd_dir = sys.argv[1]
root = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), "..", "plugins")
ns_map = {}
for f in os.listdir(xsd_dir):
    if f.endswith(".xsd"):
        m = re.search(r'targetNamespace="([^"]+)"', open(os.path.join(xsd_dir, f), encoding="utf-8", errors="ignore").read())
        if m: ns_map[m.group(1)] = os.path.join(xsd_dir, f)

ok = fail = skip = 0
failures = []
for dp, _, fs in os.walk(root):
    for f in sorted(fs):
        if not (f.endswith(".md") or f.endswith(".xml")): continue
        p = os.path.join(dp, f)
        text = open(p, encoding="utf-8").read()
        blocks = [text] if f.endswith(".xml") else re.findall(r"```xml\n(.*?)```", text, re.S)
        for i, b in enumerate(blocks):
            m = re.search(r'<([A-Za-z-]+)[^>]*\sxmlns="([^"]+)"', b)
            if not m or m.group(2) not in ns_map:
                skip += 1; continue
            if "..." in b or "<!-- ..." in b:
                skip += 1; continue
            with tempfile.NamedTemporaryFile("w", suffix=".xml", delete=False) as t:
                t.write(b if b.lstrip().startswith("<?xml") else '<?xml version="1.0" encoding="UTF-8"?>\n' + b.strip())
            r = subprocess.run(["xmllint", "--noout", "--schema", ns_map[m.group(2)], t.name], capture_output=True, text=True)
            os.unlink(t.name)
            if r.returncode == 0: ok += 1
            else:
                fail += 1
                err = [l for l in r.stderr.splitlines() if "validates" not in l][:3]
                failures.append(f"{os.path.relpath(p, root)} [xml block {i+1}]\n    " + "\n    ".join(e.split(': ', 1)[-1] for e in err))
print("\n".join(failures))
print(f"valid: {ok}  invalid: {fail}  skipped (fragments/elided): {skip}")
sys.exit(1 if fail else 0)
