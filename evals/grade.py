#!/usr/bin/env python3
"""Grade an agent's eval outputs.

Usage:
  python3 evals/grade.py --work <dir containing out/> [--tasks 01,03] [--xsd <xsd dir>] [--types <script-types/types dir>]
Run from the repo root. --xsd / --types default to .cache/ (populated by scripts/verify.sh --fetch).
Prints a per-check table and a score per task; exits 1 if any check fails.
"""
import argparse, glob, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
ap = argparse.ArgumentParser()
ap.add_argument("--work", required=True)
ap.add_argument("--tasks", default="")
ap.add_argument("--xsd", default=os.path.join(REPO, ".cache", "b2c-developer-tooling", "packages", "b2c-tooling-sdk", "data", "xsd"))
ap.add_argument("--types", default=os.path.join(REPO, ".cache", "b2c-developer-tooling", "packages", "b2c-script-types", "types"))
args = ap.parse_args()
spec = json.load(open(os.path.join(HERE, "tasks.json")))
only = set(filter(None, args.tasks.split(",")))

def files(pattern):
    out = []
    for alt in pattern.split("|"):
        out += [f for f in glob.glob(os.path.join(args.work, alt), recursive=True) if os.path.isfile(f)]
    return sorted(set(out))

def read(f): return open(f, encoding="utf-8", errors="replace").read()

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.returncode == 0, (r.stdout + r.stderr).strip().splitlines()[-3:]

def check(c):
    kind, fs = c["type"], files(c.get("glob", ""))
    flags = re.I if c.get("ignore_case") else 0
    if kind == "file_glob":
        return bool(fs), "" if fs else "no matching file"
    if kind in ("standards", "comment_ratio") and not fs:
        fs = [os.path.join(args.work, c["glob"])] if os.path.exists(os.path.join(args.work, c["glob"])) else []
    if kind == "comment_ratio" and os.path.isdir(fs[0] if fs else ""):
        fs = [f for f in glob.glob(os.path.join(fs[0], "**", "*.js"), recursive=True)]
    if not fs and kind not in ("dw_api",):
        return False, "no matching file"
    if kind == "regex":
        return any(re.search(c["pattern"], read(f), flags) for f in fs), "pattern not found"
    if kind == "regex_absent":
        hits = [os.path.relpath(f, args.work) for f in fs if re.search(c["pattern"], read(f), flags)]
        return not hits, "found in " + ", ".join(hits)
    if kind == "regex_count":
        n = sum(len(re.findall(c["pattern"], read(f), flags)) for f in fs)
        return n >= c["min"], f"found {n}, need {c['min']}"
    if kind == "node_check":
        bad = [os.path.relpath(f, args.work) for f in fs if not run(["node", "--check", f])[0]]
        return not bad, "syntax error in " + ", ".join(bad)
    if kind == "xsd":
        return run([sys.executable, os.path.join(REPO, "scripts", "validate_xml.py"), args.xsd, os.path.dirname(fs[0])])
    if kind == "steptypes":
        return run([sys.executable, os.path.join(REPO, "scripts", "check_steptypes.py"), os.path.join(args.work, c["glob"].split("/**")[0])])
    if kind == "dw_api":
        target = os.path.join(args.work, c["glob"])
        return run([sys.executable, os.path.join(REPO, "scripts", "check_dw_api.py"), args.types, target])
    if kind == "standards":
        return run([sys.executable, os.path.join(REPO, "scripts", "check_standards.py"), os.path.join(args.work, c["glob"])])
    if kind == "comment_ratio":
        code = comments = 0
        for f in fs:
            if not f.endswith(".js"): continue
            for line in read(f).splitlines():
                s = line.strip()
                if not s: continue
                code += 1
                if s.startswith(("//", "/*", "*")): comments += 1
        ratio = comments / code if code else 0
        return ratio <= c["max"], f"{ratio:.0%} comment lines"
    if kind == "unchanged":
        return read(fs[0]) == read(os.path.join(HERE, c["fixture"])), "file was modified"
    return False, "unknown check " + kind

total_pass = total = 0
for t in spec["tasks"]:
    if only and t["id"][:2] not in only: continue
    print(f"\n## {t['id']} — {t['title']}")
    passed = 0
    for c in t["checks"]:
        ok, detail = check(c)
        passed += ok
        if isinstance(detail, list): detail = " | ".join(detail)
        print(f"  [{'PASS' if ok else 'FAIL'}] {c['desc']}" + ("" if ok else f"  ({detail})"))
    src = files(t["id"][:2].join(["out/", "/SOURCES.md"]))
    consulted = read(src[0]) if src else ""
    hit = [s for s in t["expected_sources"] if s in consulted]
    print(f"  guidance selected: {len(hit)}/{len(t['expected_sources'])} expected sources listed in SOURCES.md")
    print(f"  score: {passed}/{len(t['checks'])}")
    total_pass += passed; total += len(t["checks"])
print(f"\nTOTAL {total_pass}/{total}")
sys.exit(0 if total_pass == total else 1)
