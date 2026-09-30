#!/usr/bin/env python3
"""Check every `b2c ...` command line in the skill against the b2c CLI source
(SalesforceCommerceCloud/b2c-developer-tooling packages/b2c-cli/src).

- the command path (e.g. `b2c job import`) must exist as a command file
- every `--flag` must be defined on that command or on a shared base class/util
Usage: python3 scripts/check_cli.py <path-to-packages/b2c-cli/src> [root]
"""
import os, re, sys, shlex

src = sys.argv[1]
root = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "plugins")
cmd_dir = os.path.join(src, "commands")
FLAG_RE = re.compile(r"""(?:'([a-z][\w-]*)'|\b([a-z][\w]*))\s*:\s*(?:(?:Flags|[A-Za-z]+Flags?)\.\w+\(|[a-z]\w*Flag\b|create\w*Flag\()""")
ALIAS_RE = re.compile(r"aliases:\s*\[([^\]]*)\]")
DYN_RE = re.compile(r"flags\[['\"]([a-z][\w-]*)['\"]\]\s*=")
def flag_names(text):
    names = {a or b for a, b in FLAG_RE.findall(text)} | set(DYN_RE.findall(text))
    for grp in ALIAS_RE.findall(text):
        names |= set(re.findall(r"['\"]([a-z][\w-]*)['\"]", grp))
    return names

commands = {}
for dp, _, fs in os.walk(cmd_dir):
    for f in fs:
        if f.endswith(".ts"):
            rel = os.path.relpath(os.path.join(dp, f), cmd_dir)[:-3].replace(os.sep, "/")
            rel = rel[:-6] if rel.endswith("/index") else rel
            text = open(os.path.join(dp, f), encoding="utf-8").read()
            commands[tuple(rel.split("/"))] = flag_names(text)

shared = set()
for dp, dirs, fs in os.walk(src):
    if os.path.abspath(dp).startswith(os.path.abspath(cmd_dir)): continue
    for f in fs:
        if f.endswith(".ts"):
            shared |= flag_names(open(os.path.join(dp, f), encoding="utf-8").read())
# flags provided by the tooling SDK base commands live outside the CLI package
sdk = os.path.join(src, "..", "..", "b2c-tooling-sdk", "src")
for dp, _, fs in os.walk(sdk):
    for f in fs:
        if f.endswith(".ts"):
            shared |= flag_names(open(os.path.join(dp, f), encoding="utf-8").read())
shared |= {"help", "json", "version"}
camel = lambda s: re.sub(r"-(\w)", lambda m: m.group(1).upper(), s)

problems, checked = [], 0
for dp, dirs, fs in os.walk(root):
    for f in sorted(fs):
        if not f.endswith(".md"): continue
        p = os.path.join(dp, f); rel = os.path.relpath(p, root)
        for block in re.findall(r"```(?:bash|sh|shell|console)?\n(.*?)```", open(p, encoding="utf-8").read(), re.S):
            for line in block.replace("\\\n", " ").splitlines():
                line = re.sub(r"^\s*\$\s*", "", line).split(" #")[0].strip()
                m = re.search(r"(?:^|&&|\|\||;|\$\(|npx\s+@salesforce/b2c-cli)\s*(?:b2c\s+)?", line)
                if not re.match(r"^(b2c|npx @salesforce/b2c-cli)\s", line): continue
                try: toks = shlex.split(line)
                except ValueError: toks = line.split()
                toks = toks[1:] if toks[0] == "b2c" else toks[2:]
                words = []
                for t in toks:
                    if t.startswith("-") or not re.fullmatch(r"[a-z][a-z0-9-]*", t): break
                    words.append(t)
                match = None
                for n in range(len(words), 0, -1):
                    if tuple(words[:n]) in commands: match = tuple(words[:n]); break
                if not words: continue
                checked += 1
                if not match:
                    problems.append(f"{rel}: unknown command `b2c {' '.join(words)}`"); continue
                allowed = commands[match] | shared
                for t in toks:
                    if t.startswith("--") and len(t) > 2:
                        name = t[2:].split("=")[0]
                        base = name[3:] if name.startswith("no-") else name
                        if not ({name, base, camel(name), camel(base)} & allowed):
                            problems.append(f"{rel}: `b2c {' '.join(match)}` has no flag --{name}")
print("\n".join(sorted(set(problems))))
print(f"command lines checked: {checked}  problems: {len(set(problems))}")
sys.exit(1 if problems else 0)
