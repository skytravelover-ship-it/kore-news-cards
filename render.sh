#!/bin/bash
# 사용법: ./render.sh            → data.js 의 모든 게시물을 out/<lang>/<id>/01.png… 로 렌더링
#         ./render.sh tr halloween → 하나만
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="$(pwd)/src/card.html"
list=$(node -e '
const fs=require("fs");global.window={};eval(fs.readFileSync("src/data.js","utf8"));
for(const [l,v] of Object.entries(window.NEWS)) for(const p of v.posts) console.log(l,p.id,2+p.slides.length);')
echo "$list" | while read lang id n; do
  [ -n "$1" ] && [ "$1" != "$lang" ] && continue
  [ -n "$2" ] && [ "$2" != "$id" ] && continue
  mkdir -p "out/$lang/$id"
  for s in $(seq 1 $n); do
    f="out/$lang/$id/$(printf %02d $s).png"
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
      --window-size=1080,1350 --virtual-time-budget=4000 --allow-file-access-from-files \
      --screenshot="$(pwd)/$f" "file://$SRC?lang=$lang&id=$id&s=$s" >/dev/null 2>&1
    echo "$f"
  done
done
