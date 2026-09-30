#!/usr/bin/env python3
"""Enforce the governing directive on every code sample in the skill and on example files:
loggers, console use, CSS Grid, layout rules Bootstrap covers, import aliases, kebab-case
selectors/IDs, and basic accessibility. Usage: python3 scripts/check_standards.py [root]"""
import os, re, sys

root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "plugins")
KEBAB = r"[a-z0-9]+(?:-[a-z0-9]+)*"
SKIP = {"directive.md"}
problems = []

def js(code, where):
    for m in re.finditer(r"(?<![\w.])Logger\.(debug|info|warn|error|fatal)\(", code):
        problems.append(f"{where}: static Logger.{m.group(1)}() — use a named kebab-case logger")
    for m in re.finditer(r"Logger\.getLogger\(([^)]*)\)", code):
        args = re.fullmatch(r"\s*'(" + KEBAB + r")'\s*,\s*'(" + KEBAB + r")'\s*", m.group(1))
        if not args:
            problems.append(f"{where}: getLogger({m.group(1)}) — needs ('kebab-prefix', 'kebab-category')")
        elif not 3 <= len(args.group(1)) <= 25:
            problems.append(f"{where}: log file prefix '{args.group(1)}' must be 3-25 characters")
    if "require('dw/" in code and re.search(r"\bconsole\.", code):
        problems.append(f"{where}: console.* in server-side code")

def css(code, where):
    for pat, msg in ((r"display\s*:\s*grid|grid-template|grid-area", "CSS Grid is prohibited"),
                     (r"(?<![-\w])width\s*:\s*(0|100%)\s*[;}]", "use w-100 (or a defined utility) instead of width rules"),
                     (r"(?<![-\w])padding\s*:\s*0\s*[;}]", "use p-0 instead of padding: 0"),
                     (r"@import\s+['\"]\.\./", "use a ~alias import, not a relative cross-cartridge path")):
        if re.search(pat, code): problems.append(f"{where}: {msg}")
    for line in code.splitlines():
        if line.rstrip().endswith("{"):
            for cls in re.findall(r"\.([A-Za-z_][\w-]*)", line):
                if not re.fullmatch(KEBAB, cls): problems.append(f"{where}: selector .{cls} is not kebab-case")

def markup(code, where):
    for attr in ("class", "id"):
        for val in re.findall(attr + r'="([^"]*)"', code):
            if "${" in val or "<is" in val: continue
            for tok in val.split():
                if not re.fullmatch(KEBAB, tok): problems.append(f"{where}: {attr} '{tok}' is not kebab-case")
    for img in re.findall(r"<img\b[^>]*>", code):
        if "alt=" not in img: problems.append(f"{where}: <img> without alt")
    if re.search(r"<(div|span)\b[^>]*\bonclick=", code): problems.append(f"{where}: clickable div/span — use a button or link")

for dp, dirs, fs in os.walk(root):
    for f in sorted(fs):
        if f in SKIP: continue
        p = os.path.join(dp, f); rel = os.path.relpath(p, root)
        text = open(p, encoding="utf-8", errors="replace").read()
        if f.endswith(".md"):
            for i, (lang, block) in enumerate(re.findall(r"```(\w*)\n(.*?)```", text, re.S)):
                where = f"{rel} [block {i+1}]"
                if lang in ("js", "javascript"): js(block, where)
                elif lang in ("scss", "css", "sass"): css(block, where)
                elif lang in ("html", "isml"): markup(block, where)
        elif f.endswith(".js") and "/examples/test/" not in p.replace(os.sep, "/"): js(text, rel)
        elif f.endswith((".scss", ".css")): css(text, rel)
        elif f.endswith(".isml"): markup(text, rel)

print("\n".join(problems))
print(f"standards problems: {len(problems)}")
sys.exit(1 if problems else 0)
