#!/usr/bin/env python3
"""Validate every steptypes.json under the skill against the rules in Salesforce's
"Create Custom Job Step Types" guide (verified 2026-09-30), and check that every
referenced function is actually exported by the referenced module.
Usage: python3 scripts/check_steptypes.py [root]"""
import json, os, re, sys

root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "plugins")
TYPES = {"boolean", "string", "long", "double", "datetime-string", "date-string", "time-string"}
FUNCS = {"script-module-step": ["function"],
         "chunk-script-module-step": ["before-step-function", "total-count-function", "before-chunk-function",
                                      "read-function", "process-function", "write-function",
                                      "after-chunk-function", "after-step-function"]}
DEFAULTS = {"read-function": "read", "process-function": "process", "write-function": "write", "function": "execute"}
problems, checked = [], 0

for dp, _, fs in os.walk(root):
    if "steptypes.json" not in fs: continue
    p = os.path.join(dp, "steptypes.json"); rel = os.path.relpath(p, root)
    cartridge_parent = os.path.dirname(dp)
    data = json.load(open(p))
    st = data.get("step-types")
    if not isinstance(st, dict): problems.append(f"{rel}: missing root 'step-types'"); continue
    for kind, steps in st.items():
        for s in steps:
            checked += 1
            tid = s.get("@type-id", "")
            where = f"{rel} [{tid or '?'}]"
            if not tid.startswith("custom.") or len(tid) > 100: problems.append(f"{where}: @type-id must start with 'custom.' (max 100 chars)")
            site = s.get("@supports-site-context", "true"); org = s.get("@supports-organization-context", "true")
            if site == org: problems.append(f"{where}: site and organization context must differ")
            if kind == "chunk-script-module-step":
                try:
                    if int(s.get("chunk-size", 0)) <= 0: raise ValueError
                except ValueError: problems.append(f"{where}: chunk-size must be a number > 0")
            if s.get("transactional") == "true":
                problems.append(f"{where}: transactional=true runs the step as one large transaction; use Transaction API instead")
            for prm in s.get("parameters", {}).get("parameter", []):
                if prm.get("@type") not in TYPES: problems.append(f"{where}: parameter {prm.get('@name')} has invalid @type")
                if not prm.get("description"): problems.append(f"{where}: parameter {prm.get('@name')} needs a description")
            if kind in FUNCS:
                mod = s.get("module", "")
                path = os.path.join(cartridge_parent, mod)
                if not os.path.exists(path):
                    problems.append(f"{where}: module not found: {mod}"); continue
                src = open(path, encoding="utf-8").read()
                exported = set(re.findall(r"exports\.(\w+)\s*=", src)) | set(re.findall(r"^\s*(\w+)\s*:", src, re.M))
                for key in FUNCS[kind]:
                    fn = s.get(key) or DEFAULTS.get(key)
                    if fn and fn not in exported: problems.append(f"{where}: {key} '{fn}' is not exported by {mod}")
print("\n".join(problems))
print(f"step types checked: {checked}  problems: {len(problems)}")
sys.exit(1 if problems else 0)
