#!/usr/bin/env python3
"""Check that every `require('dw/...')` module and every member accessed on it
(e.g. OrderMgr.undoFailOrder, Transaction.wrap) exists in the official Script API
type definitions (SalesforceCommerceCloud/b2c-developer-tooling packages/b2c-script-types).

Usage: python3 scripts/check_dw_api.py <path-to-b2c-script-types/types> [root]
Scans ```js/```javascript blocks in Markdown and .js files under the skill.
"""
import os, re, sys

types_dir = sys.argv[1]
root = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "plugins")
_members = {}

def members(mod):
    """mod like 'dw/order/OrderMgr' -> set of member names or None if module missing."""
    if mod in _members: return _members[mod]
    p = os.path.join(types_dir, mod + ".d.ts")
    if not os.path.exists(p):
        _members[mod] = None; return None
    src = open(p, encoding="utf-8").read()
    names = set(re.findall(r"^\s*(?:static\s+)?(?:readonly\s+)?([A-Za-z_$][\w$]*)\s*[(:<?=]", src, re.M))
    # inherit from parent classes declared with `extends X` where X imported from a dw path
    for parent in re.findall(r"class\s+\w+\s+extends\s+(\w+)", src):
        m = re.search(r"import\s+" + parent + r"\s*=\s*require\('([^']+)'\)", src)
        if m:
            pmod = os.path.normpath(os.path.join(os.path.dirname(mod), m.group(1))).replace(os.sep, "/")
            pm = members(pmod)
            if pm: names |= pm
    names |= {"prototype", "constructor"}
    _members[mod] = names
    return names

def package_members(pkg):
    d = os.path.join(types_dir, pkg)
    return {f[:-5] for f in os.listdir(d) if f.endswith(".d.ts")} if os.path.isdir(d) else None

problems, checked = [], 0
def check(code, where):
    global checked
    for var, mod in re.findall(r"(?:var|let|const)\s+(\w+)\s*=\s*require\(\s*['\"](dw/[\w/]+)['\"]\s*\)(?!\s*\.)", code):
        if mod.count("/") == 1:  # package require, e.g. require('dw/system')
            pm = package_members(mod)
            if pm is None: problems.append(f"{where}: unknown package {mod}"); continue
            for cls in set(re.findall(r"\b" + var + r"\.(\w+)", code)):
                checked += 1
                if cls not in pm: problems.append(f"{where}: {mod} has no class {cls}")
            continue
        ms = members(mod)
        if ms is None: problems.append(f"{where}: unknown module {mod}"); continue
        for mem in set(re.findall(r"(?<![\w.])" + var + r"\.(\w+)", code)):
            checked += 1
            if mem not in ms: problems.append(f"{where}: {mod} has no member '{mem}'")

for dp, dirs, fs in os.walk(root):
    dirs[:] = [d for d in dirs if d not in ("node_modules", ".git")]
    for f in sorted(fs):
        p = os.path.join(dp, f); rel = os.path.relpath(p, root)
        if f.endswith(".md"):
            text = open(p, encoding="utf-8").read()
            for i, b in enumerate(re.findall(r"```(?:js|javascript)\n(.*?)```", text, re.S)):
                check(b, f"{rel} [js block {i+1}]")
        elif f.endswith(".js") and "/cartridge/" in p.replace(os.sep, "/"):
            check(open(p, encoding="utf-8").read(), rel)

print("\n".join(sorted(set(problems))))
print(f"member references checked: {checked}  problems: {len(set(problems))}")
sys.exit(1 if problems else 0)
