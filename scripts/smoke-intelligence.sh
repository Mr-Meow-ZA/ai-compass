#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)";cd "$ROOT"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
[[ -n "$CHROME" ]] || { echo 'No Chromium-compatible browser found' >&2; exit 1; }
TMP="$(mktemp -d)";PID='';cleanup(){ [[ -z "$PID" ]] || kill "$PID" 2>/dev/null || true; rm -rf "$TMP"; };trap cleanup EXIT
python3 -m http.server 4173 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 & PID=$!
for _ in {1..30};do curl -fsS http://127.0.0.1:4173/ >/dev/null && break;sleep .2;done
render(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=5200 --dump-dom "http://127.0.0.1:4173/${hash}" >"$out"; }
shot(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=5200 --screenshot="$out" "http://127.0.0.1:4173/${hash}" >/dev/null 2>&1; }
render '#news' "$TMP/news.html" 1440 1800;shot '#news' "$ROOT/visual-smoke-intelligence-news.png" 1440 1800;cp "$TMP/news.html" "$ROOT/visual-smoke-intelligence-news.html"
render '#article/xiaomi-ai-cube-local-ai-prototype' "$TMP/xiaomi.html" 1200 1800;shot '#article/xiaomi-ai-cube-local-ai-prototype' "$ROOT/visual-smoke-xiaomi-ai-cube.png" 1200 1800;cp "$TMP/xiaomi.html" "$ROOT/visual-smoke-xiaomi-ai-cube.html"
render '#learn' "$TMP/learn.html" 1440 1800;shot '#learn' "$ROOT/visual-smoke-intelligence-learn.png" 1440 1800;cp "$TMP/learn.html" "$ROOT/visual-smoke-intelligence-learn.html"
render '#learn/ai-power-user' "$TMP/power.html" 1200 1600;shot '#learn/ai-power-user' "$ROOT/visual-smoke-power-user-path.png" 1200 1600;cp "$TMP/power.html" "$ROOT/visual-smoke-power-user-path.html"
render '#learn/enterprise-ai-builder' "$TMP/enterprise.html" 1200 1600;cp "$TMP/enterprise.html" "$ROOT/visual-smoke-intelligence-enterprise.html"
render '#news' "$TMP/news-mobile.html" 390 1300;shot '#news' "$ROOT/visual-smoke-intelligence-news-mobile.png" 390 1300;cp "$TMP/news-mobile.html" "$ROOT/visual-smoke-intelligence-news-mobile.html"
render '#article/xiaomi-ai-cube-local-ai-prototype' "$TMP/xiaomi-mobile.html" 390 1500;shot '#article/xiaomi-ai-cube-local-ai-prototype' "$ROOT/visual-smoke-xiaomi-ai-cube-mobile.png" 390 1500;cp "$TMP/xiaomi-mobile.html" "$ROOT/visual-smoke-xiaomi-ai-cube-mobile.html"
render '#learn' "$TMP/learn-mobile.html" 390 1300;shot '#learn' "$ROOT/visual-smoke-intelligence-learn-mobile.png" 390 1300;cp "$TMP/learn-mobile.html" "$ROOT/visual-smoke-intelligence-learn-mobile.html"
grep -q 'AI news that tells you what changed' "$TMP/news.html" || { echo 'Intelligence news hero did not render' >&2; exit 1; }
grep -q 'Why AI Compass thinks it matters' "$TMP/news.html" || { echo 'Editorial analysis labelling did not render' >&2; exit 1; }
grep -q 'Xiaomi shows AI Cube prototype' "$TMP/news.html" || { echo 'Xiaomi AI Cube news signal did not render' >&2; exit 1; }
grep -q 'Engineering prototype' "$TMP/news.html" || { echo 'Xiaomi AI Cube prototype status did not render' >&2; exit 1; }
[[ "$(grep -o 'class="signal-card' "$TMP/news.html" | wc -l | tr -d ' ')" -ge 3 ]] || { echo 'Fewer than three top signal cards rendered' >&2; exit 1; }
[[ "$(grep -o 'class="intel-news-row' "$TMP/news.html" | wc -l | tr -d ' ')" -ge 21 ]] || { echo 'Full news briefing did not include the Xiaomi update' >&2; exit 1; }
grep -q 'Xiaomi AI Cube: why this unusual 150W local-AI prototype matters' "$TMP/xiaomi.html" || { echo 'Xiaomi AI Cube analysis article did not render' >&2; exit 1; }
grep -q 'What we still need before calling it a breakthrough product' "$TMP/xiaomi.html" || { echo 'Xiaomi AI Cube uncertainty section did not render' >&2; exit 1; }
grep -q 'Notebookcheck' "$TMP/xiaomi.html" || { echo 'Supplied Notebookcheck source is missing from the Xiaomi article' >&2; exit 1; }
grep -q 'Xiaomi AI Cube: why this unusual 150W local-AI prototype matters' "$TMP/xiaomi-mobile.html" || { echo 'Xiaomi AI Cube analysis did not render on mobile' >&2; exit 1; }
grep -q 'Learn in five levels' "$TMP/learn.html" || { echo 'Five-level curriculum did not render' >&2; exit 1; }
[[ "$(grep -o 'class="curriculum-level"' "$TMP/learn.html" | wc -l | tr -d ' ')" -eq 5 ]] || { echo 'Curriculum level count is not five' >&2; exit 1; }
grep -q 'Become an AI power user' "$TMP/power.html" || { echo 'AI Power User path did not render' >&2; exit 1; }
grep -q 'Level 3 of 5' "$TMP/power.html" || { echo 'AI Power User path context is missing' >&2; exit 1; }
grep -q 'Level 5 of 5' "$TMP/enterprise.html" || { echo 'Enterprise curriculum position is missing' >&2; exit 1; }
[[ "$(grep -o 'class="signal-card' "$TMP/news-mobile.html" | wc -l | tr -d ' ')" -ge 3 ]] || { echo 'Top signals did not render on mobile' >&2; exit 1; }
[[ "$(grep -o 'class="curriculum-level"' "$TMP/learn-mobile.html" | wc -l | tr -d ' ')" -eq 5 ]] || { echo 'Curriculum did not render on mobile' >&2; exit 1; }
echo 'Signal, Xiaomi AI Cube article and curriculum rendered smoke OK.'
