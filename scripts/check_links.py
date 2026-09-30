#!/usr/bin/env python3
"""Fail if any relative Markdown link (or #anchor) in the repo points to a missing file/heading.
Usage: python3 scripts/check_links.py [root]"""
import os, re, sys

root = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
_cache = {}

def slugs(path):
    if path not in _cache:
        s, fence, seen = set(), False, {}
        for line in open(path, encoding="utf-8"):
            if re.match(r"^\s*(```|~~~)", line): fence = not fence
            if fence: continue
            m = re.match(r"^#{1,6}\s+(.*?)\s*#*\s*$", line)
            if m:
                slug = re.sub(r"[^\w\- ]", "", re.sub(r"`", "", m.group(1)).lower()).replace(" ", "-")
                n = seen.get(slug, 0); seen[slug] = n + 1
                s.add(slug if n == 0 else f"{slug}-{n}")
            for a in re.findall(r'<a id="([^"]+)"', line): s.add(a)
        _cache[path] = s
    return _cache[path]

bad = 0
for dp, dirs, fs in os.walk(root):
    dirs[:] = [d for d in dirs if d not in (".git", "node_modules", ".cache", "runs")]
    for f in fs:
        if not f.endswith(".md"): continue
        p = os.path.join(dp, f); fence = False
        for i, line in enumerate(open(p, encoding="utf-8"), 1):
            if re.match(r"^\s*(```|~~~)", line): fence = not fence
            if fence: continue
            for link in re.findall(r"\]\(([^)\s]+)\)", line):
                if re.match(r"(https?:|mailto:)", link): continue
                path, _, anchor = link.partition("#")
                tgt = os.path.normpath(os.path.join(dp, path)) if path else p
                if not os.path.exists(tgt):
                    bad += 1; print(f"MISSING FILE  {os.path.relpath(p, root)}:{i} -> {link}"); continue
                if anchor and tgt.endswith(".md") and anchor.lower() not in slugs(tgt):
                    bad += 1; print(f"MISSING ANCHOR {os.path.relpath(p, root)}:{i} -> {link}")
print(f"broken links: {bad}")
sys.exit(1 if bad else 0)
