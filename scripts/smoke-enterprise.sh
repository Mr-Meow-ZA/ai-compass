#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then echo "No Chromium-compatible browser found" >&2; exit 1; fi
TMP="$(mktemp -d)"; SERVER_PID=""
cleanup(){ [[ -n "$SERVER_PID" ]] && kill "$SERVER_PID" 2>/dev/null || true; rm -rf "$TMP"; }
trap cleanup EXIT
python3 -m http.server 4174 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 & SERVER_PID=$!
for _ in {1..30}; do curl --fail --silent http://127.0.0.1:4174/ >/dev/null && break || sleep .2; done
render(){ local hash="$1" out="$2" width="$3" height="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${width},${height}" --virtual-time-budget=4200 --dump-dom "http://127.0.0.1:4174/${hash}" > "$out"; }
render '#article/design-an-enterprise-ai-architecture' "$TMP/architecture.html" 1440 2200
render '#article/design-an-enterprise-ai-architecture' "$TMP/architecture-mobile.html" 390 1400
render '#learn/enterprise-ai-builder' "$TMP/path.html" 1440 1800
render '#learn/enterprise-ai-builder' "$TMP/path-mobile.html" 390 1200
cp "$TMP/architecture.html" visual-smoke-enterprise-architecture.html
cp "$TMP/architecture-mobile.html" visual-smoke-enterprise-architecture-mobile.html
cp "$TMP/path.html" visual-smoke-enterprise-path.html
cp "$TMP/path-mobile.html" visual-smoke-enterprise-path-mobile.html
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,2200 --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-enterprise-architecture.png" http://127.0.0.1:4174/#article/design-an-enterprise-ai-architecture >/dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,1400 --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-enterprise-architecture-mobile.png" http://127.0.0.1:4174/#article/design-an-enterprise-ai-architecture >/dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1800 --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-enterprise-path.png" http://127.0.0.1:4174/#learn/enterprise-ai-builder >/dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,1200 --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-enterprise-path-mobile.png" http://127.0.0.1:4174/#learn/enterprise-ai-builder >/dev/null 2>&1
count(){ grep -o "$1" "$2" | wc -l | tr -d ' ' || true; }
[[ "$(count 'class=\"article-header' "$TMP/architecture.html")" -ge 1 ]] || { echo "Enterprise architecture guide did not render" >&2; exit 1; }
[[ "$(count 'class=\"article-header' "$TMP/architecture-mobile.html")" -ge 1 ]] || { echo "Enterprise architecture guide did not render on mobile" >&2; exit 1; }
grep -F 'A practical enterprise AI stack' "$TMP/architecture.html" >/dev/null || { echo "Enterprise architecture visual missing" >&2; exit 1; }
grep -F 'Build AI systems at work' "$TMP/path.html" >/dev/null || { echo "Enterprise AI builder path did not render" >&2; exit 1; }
grep -F 'enterprise-ai-development-lifecycle' "$TMP/path.html" >/dev/null || { echo "Enterprise path final lifecycle step missing" >&2; exit 1; }
grep -F 'enterprise-ai-builder-guides.js' "$TMP/architecture.html" >/dev/null || { echo "Enterprise guide module not loaded" >&2; exit 1; }
grep -F 'enterprise-learning-path.js' "$TMP/path.html" >/dev/null || { echo "Enterprise path module not loaded" >&2; exit 1; }
grep -F 'design-an-enterprise-ai-architecture' editorial-photo-overrides.css >/dev/null || { echo "Enterprise architecture card photography missing" >&2; exit 1; }
echo "Enterprise builder rendered visual smoke OK."