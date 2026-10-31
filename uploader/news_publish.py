#!/usr/bin/env python3
"""뉴스 계정 2개(@koredebugun, @hoyencorea)용 업로더. 캐러셀·릴스·스토리를 예약 시각에 올린다.

  python3 news_publish.py --check          # 파일·일정 점검 (네트워크 없음)
  python3 news_publish.py --dry-run        # 지금 올라갈 것만 보여줌
  python3 news_publish.py                  # 시각이 된 항목 게시
  python3 news_publish.py --only tr/temple/carousel   # 하나만 지금 게시

queue.json 항목:  {"lang":"tr", "id":"temple", "type":"carousel|reel|story|threads", "at":"2026-11-02 12:00"}
  - story 는 id 에 파일 이름 (예: "story_digest.jpg")
  - at 은 계정별 시간대(accounts.json 의 utc_offset) 기준
  - 선택: "collaborators": ["다른계정"], "share_to_feed": true(릴스), "trial": true(시험 릴스)

환경 변수 (계정마다)
  IG_USER_ID_TR, IG_ACCESS_TOKEN_TR, IG_USER_ID_ES, IG_ACCESS_TOKEN_ES
  (선택) THREADS_USER_ID_TR, THREADS_TOKEN_TR, THREADS_USER_ID_ES, THREADS_TOKEN_ES
  MEDIA_BASE_URL   posts/ 가 공개되는 주소. 릴스 mp4 때문에 GitHub Pages 권장
                   (raw.githubusercontent.com 은 mp4를 octet-stream 으로 보내 릴스가 실패할 수 있음)
  IG_API_HOST      기본 graph.instagram.com (인스타 로그인 토큰). 시스템 사용자 토큰이면 graph.facebook.com,  IG_API_VERSION 기본 v23.0

state.json 에 기록해서 같은 항목을 두 번 올리지 않는다.
"""
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
POSTS = HERE.parent / "posts"
STATE = HERE / "state.json"
MAX_LATE_HOURS = 6


def jload(p, default=None):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def key(item):
    return f"{item['lang']}/{item['id']}/{item['type']}"


def when(item, accounts):
    off = accounts[item["lang"]]["utc_offset"]
    sign = 1 if off[0] == "+" else -1
    h, m = off[1:].split(":")
    t = datetime.strptime(item["at"], "%Y-%m-%d %H:%M")
    return t.replace(tzinfo=timezone(sign * timedelta(hours=int(h), minutes=int(m))))


def files_for(item):
    """Return (dict of media, caption, comment, problems)."""
    d = POSTS / item["lang"] / item["id"]
    probs, media = [], {}
    if item["type"] == "carousel":
        media["images"] = sorted(d.glob("[0-9][0-9].jpg"))
        if not 2 <= len(media["images"]) <= 20:
            probs.append(f"캐러셀 장수 {len(media['images'])} (2~20장)")
        cap = d / "caption.txt"
    elif item["type"] == "reel":
        media["video"], media["cover"] = d / "reel.mp4", d / "reel_cover.jpg"
        for f in media.values():
            if not f.exists():
                probs.append(f"{f.name} 없음")
        cap = d / "reel_caption.txt"
    elif item["type"] == "threads":
        media["images"] = sorted(d.glob("[0-9][0-9].jpg"))
        cap = d / "threads.txt"
    elif item["type"] == "story":
        media["image"] = POSTS / item["lang"] / item["id"]
        if not media["image"].exists():
            probs.append(f"{media['image'].name} 없음")
        cap = None
    else:
        probs.append(f"알 수 없는 type {item['type']}")
        cap = None
    caption = cap.read_text(encoding="utf-8").strip() if cap and cap.exists() else ""
    if cap and not caption:
        probs.append(f"{cap.name} 없음")
    if len(caption) > 2200:
        probs.append(f"캡션 {len(caption)}자 (최대 2,200)")
    if caption.count("#") > 5 and item["type"] != "threads":
        probs.append(f"해시태그 {caption.count('#')}개 (2025-12부터 최대 5개)")
    if item["type"] == "threads" and len(caption) > 500:
        probs.append(f"Threads 글 {len(caption)}자 (최대 500)")
    com = d / "comment.txt"
    comment = com.read_text(encoding="utf-8").strip() if item["type"] == "carousel" and com.exists() else ""
    for f in [*media.get("images", []), media.get("cover"), media.get("image")]:
        if f is not None and f.exists() and f.stat().st_size > 8 * 1024 * 1024:
            probs.append(f"{f.name} 8MB 초과")
    return media, caption, comment, probs


class Api:
    def __init__(self, lang):
        L = lang.upper()
        self.user = os.environ[f"IG_USER_ID_{L}"]
        self.token = os.environ[f"IG_ACCESS_TOKEN_{L}"]
        self.base = f"https://{os.environ.get('IG_API_HOST') or 'graph.instagram.com'}/{os.environ.get('IG_API_VERSION', 'v23.0')}"

    def call(self, method, path, **params):
        params["access_token"] = self.token
        data = urllib.parse.urlencode(params).encode()
        url = f"{self.base}/{path}"
        req = urllib.request.Request(f"{url}?{data.decode()}") if method == "GET" else urllib.request.Request(url, data=data, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            raise RuntimeError(f"{method} {path} → {e.code} {e.read().decode()[:500]}") from None

    def wait_ready(self, cid, tries=60):
        for _ in range(tries):
            st = self.call("GET", cid, fields="status_code").get("status_code")
            if st == "FINISHED":
                return
            if st in ("ERROR", "EXPIRED"):
                raise RuntimeError(f"컨테이너 {cid} 상태 {st}")
            time.sleep(5)
        raise RuntimeError(f"컨테이너 {cid} 준비 시간 초과")

    def quota_left(self):
        d = (self.call("GET", f"{self.user}/content_publishing_limit", fields="config,quota_usage").get("data") or [{}])[0]
        return d.get("config", {}).get("quota_total", 50) - d.get("quota_usage", 0)

    def publish(self, item, urls, caption):
        extra = {}
        if item.get("collaborators"):
            extra["collaborators"] = json.dumps(item["collaborators"])
        t = item["type"]
        if t == "carousel":
            kids = []
            alts = item.get("_alt") or []
            for i, u in enumerate(urls["images"]):
                p = dict(image_url=u, is_carousel_item="true")
                if i < len(alts):
                    p["alt_text"] = alts[i][:1000]
                c = self.call("POST", f"{self.user}/media", **p)["id"]
                self.wait_ready(c)
                kids.append(c)
            cid = self.call("POST", f"{self.user}/media", media_type="CAROUSEL", children=",".join(kids), caption=caption, **extra)["id"]
        elif t == "reel":
            p = dict(media_type="REELS", video_url=urls["video"], cover_url=urls["cover"], caption=caption,
                     share_to_feed="true" if item.get("share_to_feed", True) else "false", **extra)
            if item.get("trial"):
                p["trial_params"] = json.dumps({"graduation_strategy": "SS_PERFORMANCE"})
            cid = self.call("POST", f"{self.user}/media", **p)["id"]
        else:
            cid = self.call("POST", f"{self.user}/media", media_type="STORIES", image_url=urls["image"])["id"]
        self.wait_ready(cid, tries=120 if t == "reel" else 60)
        return self.call("POST", f"{self.user}/media_publish", creation_id=cid)["id"]

    def after(self, media, comment):
        cid = link = None
        try:
            if comment:
                cid = self.call("POST", f"{media}/comments", message=comment).get("id")
        except Exception as e:
            print(f"    ⚠ 첫 댓글 실패: {e}")
        try:
            link = self.call("GET", media, fields="permalink").get("permalink")
        except Exception as e:
            print(f"    ⚠ 링크 조회 실패: {e}")
        return cid, link


class Threads(Api):
    """Threads API (graph.threads.net). 같은 이미지로 캐러셀 글을 올린다. 토큰은 60일마다 갱신."""
    def __init__(self, lang):
        L = lang.upper()
        self.user = os.environ[f"THREADS_USER_ID_{L}"]
        self.token = os.environ[f"THREADS_TOKEN_{L}"]
        self.base = "https://graph.threads.net/v1.0"

    def quota_left(self):
        return 1  # Threads 한도는 하루 250건이라 따로 확인하지 않음

    def publish(self, item, urls, caption):
        kids = [self.call("POST", f"{self.user}/threads", media_type="IMAGE", image_url=u, is_carousel_item="true")["id"]
                for u in urls["images"]]
        time.sleep(15)
        cid = self.call("POST", f"{self.user}/threads", media_type="CAROUSEL", children=",".join(kids), text=caption)["id"]
        time.sleep(15)
        return self.call("POST", f"{self.user}/threads_publish", creation_id=cid)["id"]

    def after(self, media, comment):
        try:
            return None, self.call("GET", media, fields="permalink").get("permalink")
        except Exception as e:
            print(f"    ⚠ 링크 조회 실패: {e}")
            return None, None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--only")
    ap.add_argument("--ping", action="store_true", help="게시 없이 토큰·계정·한도만 확인")
    a = ap.parse_args()

    if a.ping:
        for lang in ("tr", "es"):
            if not os.environ.get(f"IG_ACCESS_TOKEN_{lang.upper()}"):
                print(f"[{lang}] 토큰 없음")
                continue
            try:
                api = Api(lang)
                me = api.call("GET", api.user, fields="username,account_type,media_count")
                print(f"[{lang}] 연결 OK: @{me.get('username')} ({me.get('account_type','?')}), 게시물 {me.get('media_count')}개, 오늘 남은 한도 {api.quota_left()}")
            except Exception as e:
                print(f"[{lang}] 연결 실패: {e}")
        return

    accounts = jload(HERE / "accounts.json")
    queue = jload(HERE / "queue.json", [])
    state = jload(STATE, {})
    now = datetime.now(timezone.utc)
    todo, bad = [], False
    for it in queue:
        k = key(it)
        media, caption, comment, probs = files_for(it)
        t = when(it, accounts)
        done = k in state
        tag = "게시됨" if done else ("대기" if t > now else "시각 지남")
        print(f"{k:32} {it['at']}  {tag}")
        for p in probs:
            print(f"    ⚠ {p}")
            bad = bad or not done
        if done:
            continue
        if a.only:
            if k == a.only:
                todo.append((it, media, caption, comment, probs))
        elif t <= now:
            if now - t > timedelta(hours=MAX_LATE_HOURS):
                print(f"    ⚠ {MAX_LATE_HOURS}시간 넘게 지나 자동 게시 안 함 (--only {k})")
            else:
                todo.append((it, media, caption, comment, probs))
    if a.check:
        sys.exit(1 if bad else 0)
    if not todo:
        print("지금 올릴 항목 없음")
        return

    base = os.environ.get("MEDIA_BASE_URL", "<MEDIA_BASE_URL>").rstrip("/")
    url = lambda f: f"{base}/{urllib.parse.quote(str(f.relative_to(POSTS)))}"
    apis = {}
    for it, media, caption, comment, probs in todo:
        k = key(it)
        if probs:
            print(f"[{k}] 문제가 있어 건너뜀")
            continue
        urls = {n: ([url(x) for x in v] if isinstance(v, list) else url(v)) for n, v in media.items()}
        if a.dry_run:
            print(f"[모의] {k}: 캡션 {len(caption)}자  {json.dumps(urls, ensure_ascii=False)[:160]}")
            continue
        if it["type"] == "carousel":
            altf = POSTS / it["lang"] / it["id"] / "alt.json"
            it["_alt"] = jload(altf, [])
        kind = "threads" if it["type"] == "threads" else "ig"
        if kind == "threads" and not os.environ.get(f"THREADS_TOKEN_{it['lang'].upper()}"):
            print(f"[{k}] Threads 토큰 없음, 건너뜀")
            continue
        if (it["lang"], kind) not in apis:
            apis[(it["lang"], kind)] = (Threads if kind == "threads" else Api)(it["lang"])
        api = apis[(it["lang"], kind)]
        if api.quota_left() < 1:
            print(f"[{k}] 오늘 게시 한도 소진, 건너뜀")
            continue
        try:
            mid = api.publish(it, urls, caption)
        except Exception as e:
            print(f"[{k}] 게시 실패: {e}")
            continue
        state[k] = {"media_id": mid, "published_at": datetime.now(timezone.utc).isoformat(timespec="seconds")}
        STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        cid, link = api.after(mid, comment)
        state[k].update(comment_id=cid, permalink=link)
        STATE.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"[{k}] 게시 완료 {link}")


if __name__ == "__main__":
    main()
