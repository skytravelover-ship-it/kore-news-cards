#!/usr/bin/env python3
"""게시 일정(queue.json) 만들기. 신규 계정 워밍업 규칙을 따른다.

  python3 make_queue.py --start 2026-11-03 --lang tr --ids halloween,temple,basicincome,altman
  python3 make_queue.py --start 2026-11-03 --lang es --ids halloween,temple,basicincome,roh --append

하루 구성 (리서치 03: 첫 2주는 하루 1~2건 + 스토리 [업계 통념])
  - 슬롯1: 캐러셀 1개 (+ Threads 같은 글)
  - 슬롯2: 그 뉴스의 릴스 1개
  - 첫날: 첫 캐러셀 30분 뒤 스토리 '오늘의 3줄'
3주차부터는 --per-day 2~3 으로 늘린다.
"""
import argparse
import json
import random
from datetime import datetime, timedelta
from pathlib import Path

HERE = Path(__file__).resolve().parent
SLOTS = {  # 현지 기준 시각
    "tr": ["12:00", "17:00", "21:00"],   # 터키
    "es": ["20:00", "02:00", "14:00"],   # 마드리드 = 멕시코시티 13:00 / 19:00 / 07:00
}


def jitter(hhmm):
    """매일 같은 분에 올리지 않도록 0~9분 늦춘다."""
    h, m = map(int, hhmm.split(":"))
    return f"{h:02d}:{m + random.randint(0, 9):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", required=True)
    ap.add_argument("--lang", required=True, choices=SLOTS)
    ap.add_argument("--ids", required=True)
    ap.add_argument("--per-day", type=int, default=1)
    ap.add_argument("--no-threads", action="store_true")
    ap.add_argument("--append", action="store_true")
    a = ap.parse_args()

    qf = HERE / "queue.json"
    queue = json.loads(qf.read_text(encoding="utf-8")) if a.append and qf.exists() else []
    day = datetime.strptime(a.start, "%Y-%m-%d")
    ids = a.ids.split(",")
    slots = SLOTS[a.lang]
    for n in range(0, len(ids), a.per_day):
        batch = ids[n:n + a.per_day]
        for i, pid in enumerate(batch):
            t = slots[i % len(slots)]
            # 02:00 슬롯은 다음 날짜로 넘어간다
            d = day + timedelta(days=1) if t < "06:00" else day
            at = f"{d:%Y-%m-%d} {jitter(t)}"
            queue.append({"lang": a.lang, "id": pid, "type": "carousel", "at": at})
            if not a.no_threads:
                queue.append({"lang": a.lang, "id": pid, "type": "threads", "at": at})
            r = slots[(i + 1) % len(slots)]
            rd = d + timedelta(days=1) if r < "06:00" and t >= "06:00" else d
            queue.append({"lang": a.lang, "id": pid, "type": "reel", "at": f"{rd:%Y-%m-%d} {jitter(r)}", "share_to_feed": True})
        if n == 0:  # 첫날만: 첫 캐러셀 30분 뒤에 스토리
            first = next(q for q in reversed(queue) if q["type"] == "carousel" and q["id"] == batch[0])
            t0 = datetime.strptime(first["at"], "%Y-%m-%d %H:%M") + timedelta(minutes=30)
            queue.append({"lang": a.lang, "id": "story_digest.jpg", "type": "story", "at": f"{t0:%Y-%m-%d %H:%M}"})
        day += timedelta(days=1)
    qf.write_text(json.dumps(queue, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"queue.json: {len(queue)}개 항목")


if __name__ == "__main__":
    main()
