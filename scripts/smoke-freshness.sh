#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)";cd "$ROOT"
CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
[[ -n "$CHROME" ]] || { echo 'No Chromium-compatible browser found' >&2; exit 1; }
TMP="$(mktemp -d)";PID='';cleanup(){ [[ -z "$PID" ]] || kill "$PID" 2>/dev/null || true; rm -rf "$TMP"; };trap cleanup EXIT
python3 -m http.server 4173 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 & PID=$!
for _ in {1..30};do curl -fsS http://127.0.0.1:4173/ >/dev/null && break;sleep .2;done
curl -fsS http://127.0.0.1:4173/content/manifest.json >/dev/null
curl -fsS http://127.0.0.1:4173/content/maintained/discovery.json >/dev/null
render(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=6500 --dump-dom "http://127.0.0.1:4173/${hash}" >"$out"; }
shot(){ local hash="$1" out="$2" w="$3" h="$4"; "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size="${w},${h}" --virtual-time-budget=6500 --screenshot="$out" "http://127.0.0.1:4173/${hash}" >/dev/null 2>&1; }

render '#guides' "$TMP/guides.html" 1440 1800;shot '#guides' "$ROOT/visual-smoke-freshness-guides.png" 1440 1800;cp "$TMP/guides.html" "$ROOT/visual-smoke-freshness-guides.html"
render '#article/choose-your-first-ai-subscription' "$TMP/article.html" 1200 1500;shot '#article/choose-your-first-ai-subscription' "$ROOT/visual-smoke-freshness-article.png" 1200 1500;cp "$TMP/article.html" "$ROOT/visual-smoke-freshness-article.html"
render '#tools' "$TMP/tools.html" 1440 1600;shot '#tools' "$ROOT/visual-smoke-freshness-tools.png" 1440 1600;cp "$TMP/tools.html" "$ROOT/visual-smoke-freshness-tools.html"
render '#models' "$TMP/models.html" 1440 1600;cp "$TMP/models.html" "$ROOT/visual-smoke-freshness-models.html"
render '#courses' "$TMP/courses.html" 1440 1800;shot '#courses' "$ROOT/visual-smoke-freshness-courses.png" 1440 1800;cp "$TMP/courses.html" "$ROOT/visual-smoke-freshness-courses.html"
render '#reference' "$TMP/reference.html" 1440 1800;cp "$TMP/reference.html" "$ROOT/visual-smoke-freshness-reference.html"
render '#learn' "$TMP/learn.html" 1440 1800;cp "$TMP/learn.html" "$ROOT/visual-smoke-freshness-learn.html"
render '#news' "$TMP/news.html" 1440 1900;shot '#news' "$ROOT/visual-smoke-freshness-news.png" 1440 1900;cp "$TMP/news.html" "$ROOT/visual-smoke-freshness-news.html"
render '#guides' "$TMP/guides-mobile.html" 390 1300;shot '#guides' "$ROOT/visual-smoke-freshness-guides-mobile.png" 390 1300;cp "$TMP/guides-mobile.html" "$ROOT/visual-smoke-freshness-guides-mobile.html"
render '#news' "$TMP/news-mobile.html" 390 1400;shot '#news' "$ROOT/visual-smoke-freshness-news-mobile.png" 390 1400;cp "$TMP/news-mobile.html" "$ROOT/visual-smoke-freshness-news-mobile.html"

count(){ grep -o "$1" "$2" | wc -l | tr -d ' ' || true; }
GUIDE_BADGES="$(count 'class="freshness-badge' "$TMP/guides.html")"
TOOL_BADGES="$(count 'class="freshness-badge' "$TMP/tools.html")"
MODEL_BADGES="$(count 'class="freshness-badge' "$TMP/models.html")"
COURSE_BADGES="$(count 'class="freshness-badge' "$TMP/courses.html")"
REFERENCE_BADGES="$(count 'class="freshness-badge' "$TMP/reference.html")"
NEWS_BADGES="$(count 'class="freshness-badge' "$TMP/news.html")"
MOBILE_GUIDE_BADGES="$(count 'class="freshness-badge' "$TMP/guides-mobile.html")"
MOBILE_NEWS_BADGES="$(count 'class="freshness-badge' "$TMP/news-mobile.html")"

echo "Freshness rendered counts: guides=$GUIDE_BADGES tools=$TOOL_BADGES models=$MODEL_BADGES courses=$COURSE_BADGES reference=$REFERENCE_BADGES news=$NEWS_BADGES mobile-guides=$MOBILE_GUIDE_BADGES mobile-news=$MOBILE_NEWS_BADGES"

for file in guides article tools models courses reference learn news guides-mobile news-mobile; do
  grep -q 'structured-content-loader.js' "$TMP/${file}.html" || { echo "Structured content loader missing on $file" >&2; exit 1; }
  grep -q 'freshness.css' "$TMP/${file}.html" || { echo "Freshness stylesheet missing on $file" >&2; exit 1; }
  if grep -q 'AI Compass could not load its maintained content' "$TMP/${file}.html"; then echo "Structured content failed on $file" >&2; exit 1; fi
  if grep -q 'Loading AI Compass' "$TMP/${file}.html"; then echo "Route remained in loading state: $file" >&2; exit 1; fi
done

for legacy in discovery-data.js curriculum-data.js news-intelligence-data.js; do
  if grep -q "$legacy" "$TMP/guides.html"; then echo "Legacy maintained module still loaded: $legacy" >&2; exit 1; fi
done

[[ "$GUIDE_BADGES" -ge 41 ]] || { echo "Expected freshness status on all 41 guide cards, found $GUIDE_BADGES" >&2; exit 1; }
grep -q 'class="article-freshness"' "$TMP/article.html" || { echo 'Article freshness status did not render' >&2; exit 1; }
grep -q 'Freshness class: volatile' "$TMP/article.html" || { echo 'Subscription guide is not visibly treated as volatile' >&2; exit 1; }
[[ "$TOOL_BADGES" -ge 7 ]] || { echo "Tool route freshness coverage incomplete: $TOOL_BADGES" >&2; exit 1; }
[[ "$MODEL_BADGES" -ge 7 ]] || { echo "Model route freshness coverage incomplete: $MODEL_BADGES" >&2; exit 1; }
[[ "$COURSE_BADGES" -ge 7 ]] || { echo "Course route freshness coverage incomplete: $COURSE_BADGES" >&2; exit 1; }
[[ "$REFERENCE_BADGES" -ge 20 ]] || { echo "Reference freshness coverage incomplete: $REFERENCE_BADGES" >&2; exit 1; }
[[ "$NEWS_BADGES" -ge 20 ]] || { echo "News freshness coverage incomplete: $NEWS_BADGES" >&2; exit 1; }
grep -q 'Learn in five levels' "$TMP/learn.html" || { echo 'Structured curriculum failed to render' >&2; exit 1; }
grep -q 'class="freshness-badge' "$TMP/learn.html" || { echo 'Curriculum freshness status did not render' >&2; exit 1; }
grep -q 'AI tools for real tasks' "$TMP/tools.html" || { echo 'Structured tool directory failed to render' >&2; exit 1; }
grep -q 'AI courses worth your time' "$TMP/courses.html" || { echo 'Structured courses failed to render' >&2; exit 1; }
grep -q 'AI news that tells you what changed' "$TMP/news.html" || { echo 'Structured news intelligence failed to render' >&2; exit 1; }
[[ "$MOBILE_GUIDE_BADGES" -ge 41 ]] || { echo "Mobile guides lost freshness statuses: $MOBILE_GUIDE_BADGES" >&2; exit 1; }
[[ "$MOBILE_NEWS_BADGES" -ge 20 ]] || { echo "Mobile news lost freshness statuses: $MOBILE_NEWS_BADGES" >&2; exit 1; }

echo 'Structured content and freshness rendered smoke OK.'
