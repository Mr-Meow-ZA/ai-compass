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
for route in tools models courses practical resources learn start build choose;do render "#${route}" "$TMP/${route}.html" 1440 1500;shot "#${route}" "$ROOT/visual-smoke-${route}.png" 1440 1500;cp "$TMP/${route}.html" "$ROOT/visual-smoke-${route}.html";done
render '#courses' "$TMP/courses-mobile.html" 390 1200;shot '#courses' "$ROOT/visual-smoke-courses-mobile.png" 390 1200;cp "$TMP/courses-mobile.html" "$ROOT/visual-smoke-courses-mobile.html"
render '#home' "$TMP/home-mobile.html" 390 1400;shot '#home' "$ROOT/visual-smoke-discovery-home-mobile.png" 390 1400;cp "$TMP/home-mobile.html" "$ROOT/visual-smoke-discovery-home-mobile.html"
for route in start build choose;do render "#${route}" "$TMP/${route}-mobile.html" 390 1500;shot "#${route}" "$ROOT/visual-smoke-${route}-mobile.png" 390 1500;cp "$TMP/${route}-mobile.html" "$ROOT/visual-smoke-${route}-mobile.html";done
grep -q 'AI tools for real tasks' "$TMP/tools.html" || { echo 'Tools route did not render upgraded directory' >&2; exit 1; }
grep -q 'AI model families, explained' "$TMP/models.html" || { echo 'Models route did not render' >&2; exit 1; }
grep -q 'AI courses worth your time' "$TMP/courses.html" || { echo 'Courses route did not render' >&2; exit 1; }
grep -q 'Practical patterns you can use today' "$TMP/practical.html" || { echo 'Practical route did not render' >&2; exit 1; }
grep -q 'Resources for building and using AI' "$TMP/resources.html" || { echo 'Resources route did not render' >&2; exit 1; }
grep -q 'From first use to enterprise builder' "$TMP/learn.html" || { echo 'Learning lanes did not render' >&2; exit 1; }
grep -q 'Choose your route' "$TMP/home-mobile.html" || { echo 'Homepage entry points did not render on mobile' >&2; exit 1; }
grep -q 'Tell us what kind of reader you are' "$TMP/home-mobile.html" || { echo 'Reader-start shortcut did not render on mobile home' >&2; exit 1; }
grep -q 'You should not need to understand our menu first' "$TMP/start.html" || { echo 'Start route did not render' >&2; exit 1; }
grep -q 'Build useful AI systems' "$TMP/build.html" || { echo 'Build hub did not render' >&2; exit 1; }
grep -q 'Choose tools, models and training with a reason' "$TMP/choose.html" || { echo 'Choose hub did not render' >&2; exit 1; }
grep -q 'I’m new to AI' "$TMP/start-mobile.html" || { echo 'Reader journey cards did not render on mobile' >&2; exit 1; }
grep -q 'Build and orchestrate agents' "$TMP/build-mobile.html" || { echo 'Build lanes did not render on mobile' >&2; exit 1; }
grep -q 'Choose a model family' "$TMP/choose-mobile.html" || { echo 'Choose decision cards did not render on mobile' >&2; exit 1; }
NAV_LINKS="$(grep -o 'id="primaryNav"[^<]*\|href="#start"\|href="#build"\|href="#choose"' "$TMP/start.html" | wc -l | tr -d ' ')"
[[ "$NAV_LINKS" -ge 3 ]] || { echo 'Reader-first top navigation did not expose Start/Build/Choose' >&2; exit 1; }
COURSE_DESKTOP="$(grep -o 'class="course-card"' "$TMP/courses.html" | wc -l | tr -d ' ')"
COURSE_MOBILE="$(grep -o 'class="course-card"' "$TMP/courses-mobile.html" | wc -l | tr -d ' ')"
TOOL_CARDS="$(grep -o 'class="directory-card' "$TMP/tools.html" | wc -l | tr -d ' ')"
MODEL_CARDS="$(grep -o 'class="directory-card' "$TMP/models.html" | wc -l | tr -d ' ')"
[[ "$COURSE_DESKTOP" -ge 6 ]] || { echo "Too few course cards rendered on desktop: $COURSE_DESKTOP" >&2; exit 1; }
[[ "$COURSE_MOBILE" -ge 6 ]] || { echo "Too few course cards rendered on mobile: $COURSE_MOBILE" >&2; exit 1; }
[[ "$TOOL_CARDS" -ge 6 ]] || { echo "Too few tool cards rendered: $TOOL_CARDS" >&2; exit 1; }
[[ "$MODEL_CARDS" -ge 6 ]] || { echo "Too few model cards rendered: $MODEL_CARDS" >&2; exit 1; }
echo "Reader navigation and discovery smoke OK: courses desktop=$COURSE_DESKTOP mobile=$COURSE_MOBILE tools=$TOOL_CARDS models=$MODEL_CARDS."
