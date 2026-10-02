#!/usr/bin/env bash
# Sync WebGPU sample artifacts from a local vnerhi WASM build into public/wasm/.
#
# Usage:
#   ./scripts/sync-wasm.sh
#   ./scripts/sync-wasm.sh /path/to/vnerhi/build/wasm/static/Release/bin
#
# Defaults to ../vnerhi/build/wasm/static/Release/bin relative to this repo.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEFAULT_BIN="$(cd "$ROOT/.." && pwd)/vnerhi/build/wasm/static/Release/bin"
BIN="${1:-$DEFAULT_BIN}"
LIB="$(dirname "$BIN")/lib"
DEST="$ROOT/public/wasm"

if [[ ! -d "$BIN" ]]; then
  echo "error: sample output directory not found: $BIN" >&2
  echo "Build vnerhi WASM samples first, e.g.:" >&2
  echo "  cd ../vnerhi && ./scripts/build_wasm.sh" >&2
  exit 1
fi

HTML_COUNT=$(find "$BIN" -maxdepth 1 -name '??_*.html' | wc -l | tr -d ' ')
if [[ "$HTML_COUNT" -eq 0 ]]; then
  echo "error: no NN_*.html samples in $BIN" >&2
  exit 1
fi

echo "Source : $BIN"
echo "Dest   : $DEST"
echo "Samples: $HTML_COUNT"

mkdir -p "$DEST"
# Replace previous sample set so renamed/deleted samples disappear.
find "$DEST" -mindepth 1 -delete

# Sample payloads only — never copy static archives (.a).
find "$BIN" -maxdepth 1 -type f \( \
  -name '??_*.html' -o \
  -name '??_*.js' -o \
  -name '??_*.wasm' -o \
  -name '??_*.data' \
\) -exec cp -a {} "$DEST"/ \;

# Runtime side modules (MAIN_MODULE dlopen).
if [[ -d "$LIB" ]]; then
  find "$LIB" -maxdepth 1 -type f \( -name '*.so' -o -name '*.so.*' \) -exec cp -a {} "$DEST"/ \;
  find "$LIB" -maxdepth 1 -type l \( -name '*.so' -o -name '*.so.*' \) | while read -r link; do
    cp -aL "$link" "$DEST/$(basename "$link")"
  done
fi

node "$ROOT/scripts/inject-coi.mjs" "$DEST"

echo "Synced $(ls "$DEST"/??_*.html 2>/dev/null | wc -l | tr -d ' ') HTML samples into public/wasm/"
