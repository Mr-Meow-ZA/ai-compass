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
render '#article/create-professional-dashboards-with-ai' "$TMP/dashboard.html" 1440 2200
render '#article/create-professional-dashboards-with-ai' "$TMP/dashboard-mobile.html" 390 1200
render '#article/build-a-professional-infographic-with-ai' "$TMP/infographic.html" 1440 2200
render '#article/build-a-professional-infographic-with-ai' "$TMP/infographic-mobile.html" 390 1400
render '#home' "$TMP/mobile.html" 390 844

cp "$TMP/home.html" "$ROOT/visual-smoke-home.html"
cp "$TMP/guides.html" "$ROOT/visual-smoke-guides.html"
cp "$TMP/news.html" "$ROOT/visual-smoke-news.html"
cp "$TMP/article.html" "$ROOT/visual-smoke-article.html"
cp "$TMP/dashboard.html" "$ROOT/visual-smoke-dashboard.html"
cp "$TMP/dashboard-mobile.html" "$ROOT/visual-smoke-dashboard-mobile.html"
cp "$TMP/infographic.html" "$ROOT/visual-smoke-infographic.html"
cp "$TMP/infographic-mobile.html" "$ROOT/visual-smoke-infographic-mobile.html"
cp "$TMP/mobile.html" "$ROOT/visual-smoke-mobile.html"

"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-home.png" http://127.0.0.1:4173/#home > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-guides.png" http://127.0.0.1:4173/#guides > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,1000 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-news.png" http://127.0.0.1:4173/#news > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,844 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-mobile.png" http://127.0.0.1:4173/#home > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,2200 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-dashboard.png" http://127.0.0.1:4173/#article/create-professional-dashboards-with-ai > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,1200 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-dashboard-mobile.png" http://127.0.0.1:4173/#article/create-professional-dashboards-with-ai > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=1440,2200 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-infographic.png" http://127.0.0.1:4173/#article/build-a-professional-infographic-with-ai > /dev/null 2>&1
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars --window-size=390,1400 --virtual-time-budget=4200 \
  --screenshot="$ROOT/visual-smoke-infographic-mobile.png" http://127.0.0.1:4173/#article/build-a-professional-infographic-with-ai > /dev/null 2>&1

count_token(){ grep -o "$1" "$2" | wc -l | tr -d ' ' || true; }
HOME_GUIDES="$(count_token 'class="guide-card ' "$TMP/home.html")"
GUIDE_CARDS="$(count_token 'class="guide-card ' "$TMP/guides.html")"
NEWS_CARDS="$(count_token 'class="news-item' "$TMP/news.html")"
ARTICLE_HEADERS="$(count_token 'class="article-header' "$TMP/article.html")"
MOBILE_HERO="$(count_token 'class="hero' "$TMP/mobile.html")"
DASH_EXAMPLES="$(count_token 'class="dashboard-example' "$TMP/dashboard.html")"
DASH_QUALITY="$(count_token 'class="quality ' "$TMP/dashboard.html")"
DASH_PHONES="$(count_token 'class="phone-frame' "$TMP/dashboard-mobile.html")"
INFOGRAPHIC_VISUALS="$(count_token 'build-visual infographic' "$TMP/infographic.html")"
INFOGRAPHIC_MOBILE_HEADERS="$(count_token 'class="article-header' "$TMP/infographic-mobile.html")"

echo "Rendered counts: home-guides=$HOME_GUIDES guides=$GUIDE_CARDS news-cards=$NEWS_CARDS article-headers=$ARTICLE_HEADERS mobile-hero=$MOBILE_HERO dashboard-examples=$DASH_EXAMPLES dashboard-quality=$DASH_QUALITY dashboard-phones=$DASH_PHONES infographic-visuals=$INFOGRAPHIC_VISUALS infographic-mobile-headers=$INFOGRAPHIC_MOBILE_HEADERS"

[[ "$HOME_GUIDES" -ge 3 ]] || { echo "Home rendered only $HOME_GUIDES guide cards" >&2; exit 1; }
[[ "$GUIDE_CARDS" -ge 34 ]] || { echo "Guides rendered only $GUIDE_CARDS guide cards" >&2; exit 1; }
[[ "$NEWS_CARDS" -ge 15 ]] || { echo "News directory rendered only $NEWS_CARDS cards" >&2; exit 1; }
[[ "$ARTICLE_HEADERS" -ge 1 ]] || { echo "Article route did not render" >&2; exit 1; }
[[ "$MOBILE_HERO" -ge 1 ]] || { echo "Mobile home did not render" >&2; exit 1; }
[[ "$DASH_EXAMPLES" -eq 8 ]] || { echo "Dashboard guide rendered $DASH_EXAMPLES examples instead of 8" >&2; exit 1; }
[[ "$DASH_QUALITY" -eq 3 ]] || { echo "Dashboard quality ladder is incomplete" >&2; exit 1; }
[[ "$DASH_PHONES" -ge 2 ]] || { echo "Dashboard mobile comparison is incomplete" >&2; exit 1; }
[[ "$INFOGRAPHIC_VISUALS" -ge 1 ]] || { echo "Infographic guide visual workflow did not render" >&2; exit 1; }
[[ "$INFOGRAPHIC_MOBILE_HEADERS" -ge 1 ]] || { echo "Infographic guide did not render on mobile" >&2; exit 1; }

grep 'visual-system.css' "$TMP/home.html" > /dev/null || { echo "visual-system.css is not loaded" >&2; exit 1; }
grep 'dashboard-guide.css' "$TMP/dashboard.html" > /dev/null || { echo "dashboard-guide.css is not loaded" >&2; exit 1; }
grep 'dashboard-guide.js' "$TMP/dashboard.html" > /dev/null || { echo "dashboard-guide.js is not loaded" >&2; exit 1; }
grep 'infographic-build-guide.js' "$TMP/infographic.html" > /dev/null || { echo "infographic-build-guide.js is not loaded" >&2; exit 1; }
grep 'editorial-photo-overrides.css' "$TMP/guides.html" > /dev/null || { echo "editorial photo overrides are not loaded" >&2; exit 1; }
grep 'assets/dashboard-guide-hero.svg' "$TMP/dashboard.html" > /dev/null || { echo "Dashboard guide hero artwork is missing" >&2; exit 1; }
if grep -q 'visual-system.js' "$TMP/home.html"; then
  echo "Runtime visual-system.js is still loaded" >&2
  exit 1
fi
if grep -q 'visual-news-coverage.js' "$TMP/news.html"; then
  echo "Runtime visual-news-coverage.js is still loaded" >&2
  exit 1
fi
grep -F '.guide-card-link::before' visual-system.css > /dev/null || { echo "Static guide image contract is missing" >&2; exit 1; }
grep 'images.unsplash.com' visual-system.css > /dev/null || { echo "Static guide photography source is not present" >&2; exit 1; }
grep 'build-a-professional-infographic-with-ai' editorial-photo-overrides.css > /dev/null || { echo "Infographic guide card photography override is missing" >&2; exit 1; }
if grep -q 'class="editorial-svg"' "$TMP/guides.html"; then
  echo "Legacy vector artwork is still rendered on guide cards" >&2
  exit 1
fi

mapfile -t PHOTO_BASES < <(cat visual-system.css editorial-photo-overrides.css | grep -o "https://images.unsplash.com/photo-[^?'\"]*" | sort -u)
[[ "${#PHOTO_BASES[@]}" -ge 8 ]] || { echo "Expected at least eight distinct static photographic sources" >&2; exit 1; }
for base in "${PHOTO_BASES[@]}"; do
  curl --location --fail --silent --show-error --max-time 20 "${base}?auto=format&fit=crop&w=96&q=40" -o /dev/null || {
    echo "Photographic source failed: $base" >&2
    exit 1
  }
done

echo "Rendered static visual smoke OK."
