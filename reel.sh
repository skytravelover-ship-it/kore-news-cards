#!/bin/bash
# 뉴스 1건 → 세로 릴스 mp4 (장면 PNG를 렌더링한 뒤 ffmpeg로 천천히 확대 + 장면 전환)
# 사용법: ./reel.sh            → 모든 게시물
#         ./reel.sh tr temple  → 하나만
# 결과: out/<lang>/<id>/reel.mp4, reel_cover.jpg  /  스토리: out/<lang>/story_digest.png
cd "$(dirname "$0")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SRC="$(pwd)/src"
FPS=30
shot() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1080,1920 --virtual-time-budget=4000 --allow-file-access-from-files \
  --screenshot="$1" "$2" >/dev/null 2>&1; }

# 장면 목록과 길이(초): 글자 수에 맞춰 읽을 시간을 준다
plan=$(node -e '
const fs=require("fs");global.window={};eval(fs.readFileSync("src/data.js","utf8"));
const w=(h)=>h.replace(/<[^>]+>/g,"").split(/\s+/).length;
const d=(n,min,max)=>Math.min(max,Math.max(min,n/3.6)).toFixed(1);
for(const [l,v] of Object.entries(window.NEWS)) for(const p of v.posts){
  // v3 (11/24): 시청 3~5초에서 이탈 → 12~16초짜리로. 훅 한 줄 → 짧은 사실 3개 → 질문
  const lines=p.reel||p.slides[0].items;
  const sc=[["hook",d(w(p.hook||p.headline),2.4,3)]];
  lines.slice(0,3).forEach((t,i)=>sc.push(["r"+(i+1),d(w(t),2.4,3.8)]));
  sc.push(["q","3.0"]);
  console.log(l,p.id,sc.map(s=>s.join(":")).join(","));
}')

echo "$plan" | while read lang id scenes; do
  [ -n "$1" ] && [ "$1" != "$lang" ] && continue
  [ -n "$2" ] && [ "$2" != "$id" ] && continue
  dir="out/$lang/$id/reel"; mkdir -p "$dir"
  inputs=(); filters=""; n=0; offset=0; prev=""
  IFS=',' read -ra arr <<< "$scenes"
  for sd in "${arr[@]}"; do
    s=${sd%%:*}; dur=${sd##*:}
    shot "$(pwd)/$dir/$s.png" "file://$SRC/reel.html?lang=$lang&id=$id&scene=$s"
    frames=$(node -e "console.log(Math.round(($dur+0.4)*$FPS))")
    zmax=$([ "$s" = hook ] && echo 1.12 || echo 1.035)
    inputs+=(-i "$dir/$s.png")
    filters+="[$n:v]scale=2160:3840,zoompan=z='1+($zmax-1)*on/$frames':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=$frames:s=1080x1920:fps=$FPS,setsar=1[v$n];"
    if [ $n -eq 0 ]; then prev="v0"; offset=$dur
    else
      filters+="[$prev][v$n]xfade=transition=slideleft:duration=0.4:offset=$offset[x$n];"
      prev="x$n"; offset=$(node -e "console.log(($offset+$dur).toFixed(2))")
    fi
    n=$((n+1))
  done
  total=$(node -e "console.log(($offset+0.4).toFixed(2))")
  ffmpeg -nostdin -y -loglevel error "${inputs[@]}" -f lavfi -t "$total" -i anullsrc=r=44100:cl=stereo \
    -filter_complex "${filters%;}" -map "[$prev]" -map "$n:a" \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -r $FPS -b:v 6M -c:a aac -b:a 128k -shortest -movflags +faststart \
    "out/$lang/$id/reel.mp4"
  # 프로필 격자용 표지는 기존 신문형 표지 그대로
  shot "$(pwd)/$dir/cover.png" "file://$SRC/reel.html?lang=$lang&id=$id&scene=cover"
  sips -s format jpeg "$dir/cover.png" --out "out/$lang/$id/reel_cover.jpg" >/dev/null
  echo "out/$lang/$id/reel.mp4 (${total}s)"
done

# 스토리: 오늘의 3줄 요약
for lang in tr es; do
  [ -n "$1" ] && [ "$1" != "$lang" ] && continue
  shot "$(pwd)/out/$lang/story_digest.png" "file://$SRC/story.html?lang=$lang&kind=digest"
  echo "out/$lang/story_digest.png"
done
