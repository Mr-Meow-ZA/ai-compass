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
    --window-size="${width},${height}" --virtual-time-budget=4200 --dump-dom \
    "http://127.0.0.1:4173/${hash}" > "$out"
}

render '#home' "$TMP/home.html" 1440 1000
render '#guides' "$TMP/guides.html" 1440 1000
render '#news' "$TMP/news.html" 1440 1000
render '#article/choose-your-first-ai-subscription' "$TMP/article.html" 1440 1000
render '#home' "$TMP/mobile.html" 390 844

cp "$TMP/home.html" "$ROOT/visual-smoke-home.html"
cp "$TMP/guides.html" "$ROOT/visual-smoke-guides.html"
cp "$TMP/news.html" "$ROOT/visual-smoke-news.html"
cp "$TMP/article.html" "$ROOT/visual-smoke-article.html"
cp "$TMP/mobile.html" "$ROOT/visual-smoke-mobile.html"

"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 \
  --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-home.png" http://127.0.0.1:4173/#home > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 \
  --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-guides.png" http://127.0.0.1:4173/#guides > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 \
  --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-news.png" http://127.0.0.1:4173/#news > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,844 \
  --virtual-time-budget=4200 --screenshot="$ROOT/visual-smoke-mobile.png" http://127.0.0.1:4173/#home > /dev/null 2>&1

count_photo(){ grep -o 'class="editorial-photo"' "$1" | wc -l | tr -d ' ' || true; }
count_token(){ grep -o "$1" "$2" | wc -l | tr -d ' ' || true; }
HOME_COUNT="$(count_photo "$TMP/home.html")"
GUIDE_COUNT="$(count_photo "$TMP/guides.html")"
NEWS_COUNT="$(count_photo "$TMP/news.html")"
ARTICLE_COUNT="$(count_photo "$TMP/article.html")"
MOBILE_COUNT="$(count_photo "$TMP/mobile.html")"
NEWS_CARDS="$(count_token 'class="news-item' "$TMP/news.html")"
NEWS_COVERAGE="$(count_token 'data-visual-coverage=' "$TMP/news.html")"
GUIDE_CREDITS="$(count_token 'AI-generated for AI Compass' "$TMP/guides.html")"
GUIDE_ASSETS="$(count_token 'src="assets/guides/' "$TMP/guides.html")"

echo "Rendered counts: home=$HOME_COUNT guides=$GUIDE_COUNT guide-assets=$GUIDE_ASSETS news-photo=$NEWS_COUNT article=$ARTICLE_COUNT mobile=$MOBILE_COUNT news-cards=$NEWS_CARDS news-coverage=$NEWS_COVERAGE guide-credits=$GUIDE_CREDITS"

[[ "$HOME_COUNT" -ge 4 ]] || { echo "Home rendered only $HOME_COUNT photographic visuals" >&2; exit 1; }
[[ "$GUIDE_COUNT" -ge 28 ]] || { echo "Guides rendered only $GUIDE_COUNT visuals" >&2; exit 1; }
[[ "$GUIDE_ASSETS" -ge 28 ]] || { echo "Only $GUIDE_ASSETS guide cards use committed first-party assets" >&2; exit 1; }
[[ "$NEWS_CARDS" -ge 15 ]] || { echo "News directory rendered only $NEWS_CARDS cards" >&2; exit 1; }
[[ "$NEWS_COVERAGE" -eq "$NEWS_CARDS" ]] || { echo "Only $NEWS_COVERAGE of $NEWS_CARDS news cards received a visual coverage decision" >&2; exit 1; }
[[ "$NEWS_COUNT" -ge 10 ]] || { echo "News rendered only $NEWS_COUNT photographic fallback visuals" >&2; exit 1; }
[[ "$ARTICLE_COUNT" -ge 1 ]] || { echo "Article route has no visual" >&2; exit 1; }
[[ "$MOBILE_COUNT" -ge 4 ]] || { echo "Mobile home rendered only $MOBILE_COUNT visuals" >&2; exit 1; }
[[ "$GUIDE_CREDITS" -ge 28 ]] || { echo "Guide AI-image provenance is incomplete" >&2; exit 1; }

grep 'visual-system.css' "$TMP/home.html" > /dev/null || { echo "visual-system.css is not loaded" >&2; exit 1; }
grep 'clean-design.css' "$TMP/guides.html" > /dev/null || { echo "clean-design.css is not loaded" >&2; exit 1; }
grep 'visual-system.js' "$TMP/home.html" > /dev/null || { echo "visual-system.js is not loaded" >&2; exit 1; }
grep 'guide-assets.js' "$TMP/guides.html" > /dev/null || { echo "guide-assets.js is not loaded" >&2; exit 1; }
grep 'visual-news-coverage.js' "$TMP/news.html" > /dev/null || { echo "visual-news-coverage.js is not loaded" >&2; exit 1; }
if grep -q 'class="editorial-svg"' "$TMP/guides.html"; then
  echo "Legacy vector artwork is still rendered on guide cards" >&2
  exit 1
fi

# External photographic sources remain for non-guide editorial/news fallbacks and should stay reachable.
mapfile -t PHOTO_BASES < <(grep -o "https://images.unsplash.com/photo-[^']*" visual-system.js | sort -u)
[[ "${#PHOTO_BASES[@]}" -ge 7 ]] || { echo "Expected at least seven distinct fallback photographic sources" >&2; exit 1; }
for base in "${PHOTO_BASES[@]}"; do
  curl --location --fail --silent --show-error --max-time 20 "${base}?auto=format&fit=crop&w=96&q=40" -o /dev/null || {
    echo "Photographic fallback source failed: $base" >&2
    exit 1
  }
done

echo "Rendered visual smoke OK: all guide cards use committed first-party assets."
