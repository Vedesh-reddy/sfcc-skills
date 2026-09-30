#!/usr/bin/env bash
# Verify the skill against Salesforce's own artifacts.
#   scripts/verify.sh --fetch   # first run: download the pinned upstream sources into .cache/
#   scripts/verify.sh           # run every check
# Sources of truth (SalesforceCommerceCloud/b2c-developer-tooling @ UPSTREAM_SHA):
#   XSDs            packages/b2c-tooling-sdk/data/xsd
#   Script API      packages/b2c-script-types/types
#   b2c CLI         packages/b2c-cli/src
set -uo pipefail
ROOT=$(cd "$(dirname "$0")/.." && pwd)
UPSTREAM_SHA=fff7d3346ab5a78808a62ad1fa655539a6e8b22b
UP="$ROOT/.cache/b2c-developer-tooling"
SKILL="$ROOT/plugins"

if [ "${1:-}" = "--fetch" ] || [ ! -d "$UP/packages" ]; then
  rm -rf "$UP"; mkdir -p "$UP"
  git -C "$UP" init -q
  git -C "$UP" remote add origin https://github.com/SalesforceCommerceCloud/b2c-developer-tooling.git
  git -C "$UP" fetch -q --depth 1 origin "$UPSTREAM_SHA" && git -C "$UP" checkout -q FETCH_HEAD || { echo "fetch failed"; exit 1; }
fi

fail=0
step() { echo; echo "== $1"; shift; "$@" || fail=1; }
step "Links and anchors"        python3 "$ROOT/scripts/check_links.py" "$ROOT"
step "XML vs official XSDs"     python3 "$ROOT/scripts/validate_xml.py" "$UP/packages/b2c-tooling-sdk/data/xsd" "$SKILL"
step "dw.* API references"      python3 "$ROOT/scripts/check_dw_api.py" "$UP/packages/b2c-script-types/types" "$SKILL"
step "b2c CLI commands/flags"   python3 "$ROOT/scripts/check_cli.py" "$UP/packages/b2c-cli/src" "$SKILL"
step "steptypes.json"           python3 "$ROOT/scripts/check_steptypes.py" "$SKILL"
step "Skill structure"          python3 "$ROOT/scripts/check_structure.py" "$ROOT"
step "Example typecheck"        "$ROOT/scripts/typecheck/run.sh"
step "Example unit tests"       node --test "$ROOT"/plugins/sfcc-b2c-commerce/skills/sfcc-b2c-commerce/examples/test/examples.test.js
echo
[ $fail -eq 0 ] && echo "ALL CHECKS PASSED" || echo "SOME CHECKS FAILED"
exit $fail
