#!/usr/bin/env python3
"""Structural checks: frontmatter, router size, manifests, every referenced topic folder exists."""
import json, os, re, sys

root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
skill = os.path.join(root, "plugins", "sfcc-b2c-commerce", "skills", "sfcc-b2c-commerce")
problems = []
text = open(os.path.join(skill, "SKILL.md"), encoding="utf-8").read()
m = re.match(r"^---\nname: ([a-z0-9-]+)\ndescription: (.+?)\n---\n", text, re.S)
if not m: problems.append("SKILL.md: frontmatter must start with name and description")
else:
    if m.group(1) != "sfcc-b2c-commerce": problems.append("SKILL.md: name must match folder")
    if len(m.group(2)) > 1024: problems.append(f"SKILL.md: description is {len(m.group(2))} chars (max 1024)")
lines = text.count("\n")
if lines > 150: problems.append(f"SKILL.md: {lines} lines; keep the router under 150 and move detail to references/")
for d in sorted(os.listdir(os.path.join(skill, "references"))):
    if d != "core" and not os.path.exists(os.path.join(skill, "references", d, "index.md")):
        problems.append(f"references/{d}: missing index.md")
    if d not in text: problems.append(f"references/{d}: not reachable from the SKILL.md router")
for ex in sorted(os.listdir(os.path.join(skill, "examples"))):
    if ex != "test" and not os.path.exists(os.path.join(skill, "examples", ex, "README.md")):
        problems.append(f"examples/{ex}: missing README.md")
mk = json.load(open(os.path.join(root, ".claude-plugin", "marketplace.json")))
pl = json.load(open(os.path.join(root, "plugins", "sfcc-b2c-commerce", ".claude-plugin", "plugin.json")))
if mk["plugins"][0]["name"] != pl["name"]: problems.append("marketplace.json / plugin.json name mismatch")
changelog = open(os.path.join(root, "CHANGELOG.md"), encoding="utf-8").read()
if f"## {pl['version']}" not in changelog: problems.append(f"CHANGELOG.md has no entry for version {pl['version']}")
LOG_OK = re.compile(r"getLogger\(\s*'[a-z0-9]+(?:-[a-z0-9]+)*'\s*,\s*'[a-z0-9]+(?:-[a-z0-9]+)*'\s*\)")
for dp, _, fs in os.walk(os.path.join(skill, "examples")):
    for f in fs:
        if f.endswith((".js", ".scss", ".css", ".isml")):
            src = open(os.path.join(dp, f), encoding="utf-8").read()
            for call in re.findall(r"getLogger\([^)]*\)", src):
                if not LOG_OK.fullmatch(call): problems.append(f"{f}: logger not kebab-case prefix/category: {call}")
            if re.search(r"display:\s*grid|grid-template", src): problems.append(f"{f}: CSS Grid is prohibited by the directive")
if not os.path.exists(os.path.join(skill, "references", "core", "directive.md")): problems.append("directive.md missing")
elif "references/core/directive.md" not in text.split("## 1.")[0]: problems.append("SKILL.md must point to the directive before section 1")
for f in ("LICENSE", "NOTICE"):
    if not os.path.exists(os.path.join(root, f)): problems.append(f"{f} missing")
print("\n".join(problems)); print(f"structure problems: {len(problems)}")
sys.exit(1 if problems else 0)
