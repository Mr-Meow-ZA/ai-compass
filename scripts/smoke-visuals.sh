#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
if [[ -z "$CHROME" ]]; then
  echo "No Chromium-compatible browser found on runner" >&2
  exit 1
fi

TMP="$(mktemp -d)"
SERVER_PID=""
cleanup(){
  if [[ -n "$SERVER_PID" ]]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  rm -rf "$TMP"
}
trap cleanup EXIT

python3 -m http.server 4173 --bind 127.0.0.1 >"$TMP/server.log" 2>&1 &
SERVER_PID=$!

for _ in {1..30}; do
  if curl --fail --silent --show-error http://127.0.0.1:4173/ > /dev/null; then break; fi
  sleep .2
done
curl --fail --silent --show-error http://127.0.0.1:4173/ > /dev/null

render(){
  local hash="$1" out="$2" width="$3" height="$4"
  "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --window-size="${width},${height}" --virtual-time-budget=2500 --dump-dom \
    "http://127.0.0.1:4173/${hash}" > "$out"
}

render '#home' "$TMP/home.html" 1440 1000
render '#guides' "$TMP/guides.html" 1440 1000
render '#news' "$TMP/news.html" 1440 1000
render '#article/choose-your-first-ai-subscription' "$TMP/article.html" 1440 1000
render '#home' "$TMP/mobile.html" 390 844

count_visuals(){ grep -c 'class="editorial-svg"' "$1" || true; }
HOME_COUNT="$(count_visuals "$TMP/home.html")"
GUIDE_COUNT="$(count_visuals "$TMP/guides.html")"
NEWS_COUNT="$(count_visuals "$TMP/news.html")"
ARTICLE_COUNT="$(count_visuals "$TMP/article.html")"
MOBILE_COUNT="$(count_visuals "$TMP/mobile.html")"

[[ "$HOME_COUNT" -ge 3 ]] || { echo "Home rendered only $HOME_COUNT editorial visuals" >&2; exit 1; }
[[ "$GUIDE_COUNT" -ge 20 ]] || { echo "Guides rendered only $GUIDE_COUNT editorial visuals" >&2; exit 1; }
[[ "$NEWS_COUNT" -ge 10 ]] || { echo "News rendered only $NEWS_COUNT editorial fallback visuals" >&2; exit 1; }
[[ "$ARTICLE_COUNT" -ge 1 ]] || { echo "Article route has no editorial visual" >&2; exit 1; }
[[ "$MOBILE_COUNT" -ge 3 ]] || { echo "Mobile home rendered only $MOBILE_COUNT editorial visuals" >&2; exit 1; }

grep 'visual-system.css' "$TMP/home.html" > /dev/null || { echo "visual-system.css is not loaded" >&2; exit 1; }
grep 'visual-system.js' "$TMP/home.html" > /dev/null || { echo "visual-system.js is not loaded" >&2; exit 1; }
grep 'AI Compass editorial illustration' "$TMP/news.html" > /dev/null || { echo "News fallback attribution missing" >&2; exit 1; }

# Rendered screenshots make visual regressions inspectable from CI when needed.
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 \
  --virtual-time-budget=2500 --screenshot="$ROOT/visual-smoke-home.png" http://127.0.0.1:4173/#home > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,844 \
  --virtual-time-budget=2500 --screenshot="$ROOT/visual-smoke-mobile.png" http://127.0.0.1:4173/#home > /dev/null 2>&1

echo "Rendered visual smoke OK: home=$HOME_COUNT guides=$GUIDE_COUNT news=$NEWS_COUNT article=$ARTICLE_COUNT mobile=$MOBILE_COUNT"
