#!/usr/bin/env bash
# Run the eval tasks with Claude Code or Codex, then grade them.
#   evals/run.sh claude            # all tasks
#   evals/run.sh codex 02,03       # selected tasks
# Each task runs in a fresh work directory under evals/runs/<agent>-<timestamp>/.
# The agent CLIs must already have the skill installed (see repo README).
# CLI flags differ between versions; override with CLAUDE_CMD / CODEX_CMD if needed.
set -euo pipefail
AGENT=${1:?usage: evals/run.sh claude|codex [task-ids]}
ONLY=${2:-}
HERE=$(cd "$(dirname "$0")" && pwd)
RUN="$HERE/runs/$AGENT-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$RUN"
CLAUDE_CMD=${CLAUDE_CMD:-"claude -p --permission-mode acceptEdits"}
CODEX_CMD=${CODEX_CMD:-"codex exec --full-auto"}

python3 - "$HERE/tasks.json" "$ONLY" > "$RUN/prompts.tsv" <<'PY'
import json, sys
spec = json.load(open(sys.argv[1])); only = set(filter(None, sys.argv[2].split(",")))
for t in spec["tasks"]:
    if only and t["id"][:2] not in only: continue
    print(t["id"] + "\t" + (t["prompt"] + " " + spec["instructions_suffix"]).replace("\t", " ").replace("\n", " "))
PY

while IFS=$'\t' read -r id prompt; do
  work="$RUN/$id"; mkdir -p "$work/evals"
  cp -r "$HERE/fixtures" "$work/evals/"
  echo "== $AGENT: $id"
  ( cd "$work" && if [ "$AGENT" = claude ]; then $CLAUDE_CMD "$prompt"; else $CODEX_CMD "$prompt"; fi ) > "$work/transcript.txt" 2>&1 || echo "   (agent exited non-zero; see transcript)"
done < "$RUN/prompts.tsv"

# Merge each task's out/ into one tree for grading.
mkdir -p "$RUN/graded/out"
for d in "$RUN"/*/out; do [ -d "$d" ] && cp -r "$d"/. "$RUN/graded/out/"; done
python3 "$HERE/grade.py" --work "$RUN/graded" --tasks "$ONLY" | tee "$RUN/grade.txt" || true
echo "Results: $RUN/grade.txt"
