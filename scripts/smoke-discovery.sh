#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)";cd "$ROOT"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
[[ -n "$CHROME" ]] || { echo 'No Chromium-compatible browser found' >&2; exit 1; }
TMP="$(mktemp -d)";PID='';cleanup(){ [[ -z "$PID" ]] || kill "$PID" 2>/dev/null || true; rm -rf "$TMP"; };trap cleanup EXIT
python3 -m http.server 4173 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 & PID=$!
for _ in {1..30};do curl -fsS http://127.0.0.1:4173/ >/dev/null && break;sleep .2;done
render(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=4500 --dump-dom "http://127.0.0.1:4173/${hash}" >"$out"; }
shot(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=4500 --screenshot="$out" "http://127.0.0.1:4173/${hash}" >/dev/null 2>&1; }
for route in tools models courses practical resources learn;do render "#${route}" "$TMP/${route}.html" 1440 1400;shot "#${route}" "$ROOT/visual-smoke-${route}.png" 1440 1400;cp "$TMP/${route}.html" "$ROOT/visual-smoke-${route}.html";done
render '#courses' "$TMP/courses-mobile.html" 390 1200;shot '#courses' "$ROOT/visual-smoke-courses-mobile.png" 390 1200;cp "$TMP/courses-mobile.html" "$ROOT/visual-smoke-courses-mobile.html"
render '#home' "$TMP/home-mobile.html" 390 1200;shot '#home' "$ROOT/visual-smoke-discovery-home-mobile.png" 390 1200;cp "$TMP/home-mobile.html" "$ROOT/visual-smoke-discovery-home-mobile.html"
grep -q 'AI tools for real tasks' "$TMP/tools.html" || { echo 'Tools route did not render upgraded directory' >&2; exit 1; }
grep -q 'AI model families, explained' "$TMP/models.html" || { echo 'Models route did not render' >&2; exit 1; }
grep -q 'AI courses worth your time' "$TMP/courses.html" || { echo 'Courses route did not render' >&2; exit 1; }
grep -q 'Practical patterns you can use today' "$TMP/practical.html" || { echo 'Practical route did not render' >&2; exit 1; }
grep -q 'Resources for building and using AI' "$TMP/resources.html" || { echo 'Resources route did not render' >&2; exit 1; }
grep -q 'From first use to enterprise builder' "$TMP/learn.html" || { echo 'Learning lanes did not render' >&2; exit 1; }
grep -q 'AI Compass editorial score' "$TMP/courses-mobile.html" || { echo 'Course cards did not render on mobile' >&2; exit 1; }
grep -q 'Choose your route' "$TMP/home-mobile.html" || { echo 'Homepage entry points did not render on mobile' >&2; exit 1; }
[[ "$(grep -o 'class="course-card"' "$TMP/courses.html" | wc -l | tr -d ' ')" -ge 6 ]] || { echo 'Too few course cards rendered' >&2; exit 1; }
[[ "$(grep -o 'class="directory-card' "$TMP/tools.html" | wc -l | tr -d ' ')" -ge 6 ]] || { echo 'Too few tool cards rendered' >&2; exit 1; }
[[ "$(grep -o 'class="directory-card' "$TMP/models.html" | wc -l | tr -d ' ')" -ge 6 ]] || { echo 'Too few model cards rendered' >&2; exit 1; }
echo 'Discovery route smoke OK.'
