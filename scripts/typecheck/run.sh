#!/usr/bin/env bash
# Typecheck example cartridge code against the official Script API types.
# Needs: TypeScript (npx tsc) and ../../.cache/b2c-script-types (see scripts/verify.sh).
set -uo pipefail
cd "$(dirname "$0")"
out=$(npx --yes -p typescript@5 tsc -p tsconfig.json 2>&1)
# `module.superModule` is an SFCC runtime extension TypeScript can't model on the synthesized
# CommonJS `module` object; every other diagnostic fails the check.
errors=$(printf '%s\n' "$out" | grep 'error TS' | grep -v "Property 'superModule' does not exist")
if [ -n "$errors" ]; then printf '%s\n' "$errors"; echo "typecheck: FAILED"; exit 1; fi
echo "typecheck: OK"
