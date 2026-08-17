#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)";cd "$ROOT"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
[[ -n "$CHROME" ]] || { echo 'No Chromium-compatible browser found' >&2; exit 1; }
TMP="$(mktemp -d)";PID='';cleanup(){ [[ -z "$PID" ]] || kill "$PID" 2>/dev/null || true; rm -rf "$TMP"; };trap cleanup EXIT
python3 -m http.server 4173 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 & PID=$!
for _ in {1..30};do curl -fsS http://127.0.0.1:4173/ >/dev/null && break;sleep .2;done
render(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=14000 --dump-dom "http://127.0.0.1:4173/${hash}" >"$out"; }
shot(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=14000 --screenshot="$out" "http://127.0.0.1:4173/${hash}" >/dev/null 2>&1; }

render '#community' "$TMP/community.html" 1440 2100;shot '#community' "$ROOT/visual-smoke-community.png" 1440 2100;cp "$TMP/community.html" "$ROOT/visual-smoke-community.html"
render '#community/profile' "$TMP/profile.html" 1200 1400;shot '#community/profile' "$ROOT/visual-smoke-community-profile.png" 1200 1400;cp "$TMP/profile.html" "$ROOT/visual-smoke-community-profile.html"
render '#community/category/agents-orchestration' "$TMP/category.html" 1440 1600;shot '#community/category/agents-orchestration' "$ROOT/visual-smoke-community-category.png" 1440 1600;cp "$TMP/category.html" "$ROOT/visual-smoke-community-category.html"
render '#community' "$TMP/mobile.html" 390 1900;shot '#community' "$ROOT/visual-smoke-community-mobile.png" 390 1900;cp "$TMP/mobile.html" "$ROOT/visual-smoke-community-mobile.html"
render '#my-compass' "$TMP/my.html" 1280 1600;shot '#my-compass' "$ROOT/visual-smoke-my-compass.png" 1280 1600;cp "$TMP/my.html" "$ROOT/visual-smoke-my-compass.html"
render '#article/build-agent-orchestration' "$TMP/guide.html" 1280 2400;shot '#article/build-agent-orchestration' "$ROOT/visual-smoke-community-guide.png" 1280 2400;cp "$TMP/guide.html" "$ROOT/visual-smoke-community-guide.html"
render '#learn/ai-power-user' "$TMP/learn.html" 1280 1900;shot '#learn/ai-power-user' "$ROOT/visual-smoke-community-learning.png" 1280 1900;cp "$TMP/learn.html" "$ROOT/visual-smoke-community-learning.html"

count(){ grep -o "$1" "$2" | wc -l | tr -d ' ' || true; }
CATEGORIES="$(count 'class="community-category-card' "$TMP/community.html")";MOBILE_CATEGORIES="$(count 'class="community-category-card' "$TMP/mobile.html")"
echo "Community rendered counts: categories=$CATEGORIES mobile-categories=$MOBILE_CATEGORIES"

for file in community profile category mobile my guide learn; do
  grep -q 'community.css' "$TMP/${file}.html" || { echo "Community stylesheet missing on $file" >&2; exit 1; }
  grep -q 'community-controls.css' "$TMP/${file}.html" || { echo "Community control styles missing on $file" >&2; exit 1; }
  grep -q 'my-compass.css' "$TMP/${file}.html" || { echo "My Compass stylesheet missing on $file" >&2; exit 1; }
  grep -q 'community-data.js' "$TMP/${file}.html" || { echo "Community data runtime missing on $file" >&2; exit 1; }
  grep -q 'my-compass-data.js' "$TMP/${file}.html" || { echo "My Compass data runtime missing on $file" >&2; exit 1; }
  grep -q 'community.js' "$TMP/${file}.html" || { echo "Community renderer missing on $file" >&2; exit 1; }
  grep -q 'my-compass.js' "$TMP/${file}.html" || { echo "My Compass renderer missing on $file" >&2; exit 1; }
  if grep -q 'Loading AI Compass' "$TMP/${file}.html"; then echo "Route remained in loading state: $file" >&2; exit 1; fi
  if grep -q 'Community is temporarily unavailable' "$TMP/${file}.html"; then echo "Live community backend/client failed on $file" >&2; exit 1; fi
done

[[ "$CATEGORIES" -eq 11 ]] || { echo "Expected all 11 live forum categories, found $CATEGORIES" >&2; exit 1; }
[[ "$MOBILE_CATEGORIES" -eq 11 ]] || { echo "Mobile Community did not render all 11 live categories: $MOBILE_CATEGORIES" >&2; exit 1; }
grep -q 'Learn with people using and building AI' "$TMP/community.html" || { echo 'Community home hero did not render' >&2; exit 1; }
grep -q 'Beginner help' "$TMP/community.html" || { echo 'Live Beginner help category did not render' >&2; exit 1; }
grep -q 'Enterprise AI' "$TMP/community.html" || { echo 'Live Enterprise AI category did not render' >&2; exit 1; }
grep -q 'What I built' "$TMP/community.html" || { echo 'Live showcase category did not render' >&2; exit 1; }
grep -q 'Create a free AI Compass profile' "$TMP/profile.html" || { echo 'Signed-out profile entry point did not render' >&2; exit 1; }
grep -q 'Email me a sign-in link' "$TMP/profile.html" || { echo 'Passwordless sign-in form did not render' >&2; exit 1; }
grep -q 'Agents &amp; orchestration' "$TMP/category.html" || { echo 'Forum category routing did not render the selected category' >&2; exit 1; }
grep -q 'Read freely. Sign in free to ask, reply and follow.' "$TMP/community.html" || { echo 'Anonymous-reader contract is not visible' >&2; exit 1; }
grep -q 'Your learning and AI interests, remembered.' "$TMP/my.html" || { echo 'Signed-out My Compass dashboard did not render' >&2; exit 1; }
grep -q 'One profile across learning and community.' "$TMP/my.html" || { echo 'My Compass sign-in value proposition missing' >&2; exit 1; }
grep -q 'Was this useful?' "$TMP/guide.html" || { echo 'Guide Like/Follow controls did not render' >&2; exit 1; }
grep -q 'Community discussion' "$TMP/guide.html" || { echo 'Guide-linked community discussion panel did not render' >&2; exit 1; }
grep -q 'Track this path across visits' "$TMP/learn.html" || { echo 'Learning progress signed-out state did not render' >&2; exit 1; }
grep -q 'Completion is private to your account\|Sign in free to mark lessons complete' "$TMP/learn.html" || { echo 'Learning progress privacy/sign-in context missing' >&2; exit 1; }

echo 'Community + My Compass public-reader rendered smoke OK.'
