#!/usr/bin/env python3
"""인사이트 수집기 (읽기 전용). 6시간마다 GitHub Actions가 실행해 insights/ 에 쌓는다.

  python3 insights.py            # 두 계정의 계정 지표 + 게시물별 지표를 수집
결과
  insights/snapshots/<UTC시각>.json   매 실행 스냅샷 (시간에 따른 변화 분석용)
  insights/latest.json                가장 최근 스냅샷
지표 하나가 실패해도(새 계정은 일부 지표가 막혀 있음) 나머지는 계속 수집하고 None 으로 둔다.
"""
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
OUT = ROOT / "insights"
HOST = os.environ.get("IG_API_HOST") or "graph.facebook.com"
BASE = f"https://{HOST}/{os.environ.get('IG_API_VERSION', 'v23.0')}"

MEDIA_METRICS = {
    "FEED": ["reach", "views", "saved", "shares", "likes", "comments", "total_interactions", "profile_visits", "follows"],
    "REELS": ["reach", "views", "saved", "shares", "likes", "comments", "total_interactions",
              "ig_reels_avg_watch_time", "ig_reels_video_view_total_time"],
    "STORY": ["reach", "views", "replies", "shares", "navigation"],
}
ACCOUNT_METRICS = ["reach", "views", "accounts_engaged", "total_interactions", "profile_views", "follows_and_unfollows"]


def get(token, path, **params):
    params["access_token"] = token
    try:
        with urllib.request.urlopen(f"{BASE}/{path}?{urllib.parse.urlencode(params)}", timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()[:300]}
    except Exception as e:  # 네트워크 오류도 기록만 하고 계속
        return {"error": str(e)[:300]}


def metric_value(resp):
    try:
        d = resp["data"][0]
        if "total_value" in d:
            return d["total_value"].get("value")
        return d["values"][-1]["value"]
    except (KeyError, IndexError, TypeError):
        return None


def collect(lang, state):
    L = lang.upper()
    token, user = os.environ.get(f"IG_ACCESS_TOKEN_{L}"), os.environ.get(f"IG_USER_ID_{L}")
    if not token or not user:
        return None
    acct = get(token, user, fields="username,followers_count,follows_count,media_count")
    out = {"account": {k: acct.get(k) for k in ("username", "followers_count", "follows_count", "media_count")},
           "account_day": {}, "media": [], "errors": []}
    if "error" in acct:
        out["errors"].append({"where": "account", "error": acct["error"]})
    for m in ACCOUNT_METRICS:
        r = get(token, f"{user}/insights", metric=m, period="day", metric_type="total_value")
        out["account_day"][m] = metric_value(r)
        if "error" in r:
            out["errors"].append({"where": f"account.{m}", "error": r["error"][:160]})

    # 우리 일정표의 이름(lang/id/type)과 연결
    by_media = {v["media_id"]: k for k, v in state.items() if k.startswith(lang + "/")}
    media = get(token, f"{user}/media", fields="id,media_type,media_product_type,timestamp,permalink,like_count,comments_count", limit=50)
    for m in media.get("data", []):
        kind = m.get("media_product_type") or "FEED"
        row = {"id": m["id"], "key": by_media.get(m["id"]), "type": m.get("media_type"), "product": kind,
               "timestamp": m.get("timestamp"), "permalink": m.get("permalink"),
               "like_count": m.get("like_count"), "comments_count": m.get("comments_count"), "metrics": {}}
        for met in MEDIA_METRICS.get(kind, MEDIA_METRICS["FEED"]):
            r = get(token, f"{m['id']}/insights", metric=met)
            row["metrics"][met] = metric_value(r)
        out["media"].append(row)
    if "error" in media:
        out["errors"].append({"where": "media", "error": media["error"]})
    return out


def main():
    state = json.loads((HERE / "state.json").read_text()) if (HERE / "state.json").exists() else {}
    now = datetime.now(timezone.utc)
    snap = {"collected_at": now.isoformat(timespec="seconds"), "accounts": {}}
    for lang in ("tr", "es"):
        r = collect(lang, state)
        if r:
            snap["accounts"][lang] = r
            a = r["account"]
            print(f"[{lang}] @{a.get('username')} 팔로워 {a.get('followers_count')} · 게시물 {len(r['media'])}개 · 오류 {len(r['errors'])}건")
    (OUT / "snapshots").mkdir(parents=True, exist_ok=True)
    txt = json.dumps(snap, ensure_ascii=False, indent=1)
    (OUT / "snapshots" / f"{now:%Y-%m-%dT%H%M}Z.json").write_text(txt + "\n", encoding="utf-8")
    (OUT / "latest.json").write_text(txt + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
