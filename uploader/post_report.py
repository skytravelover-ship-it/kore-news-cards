#!/usr/bin/env python3
"""게시 2시간 보고. 15분마다 게시 작업 뒤에 실행된다.

게시된 지 2시간이 지났고 아직 보고하지 않은 게시물마다
  1) 그 시점의 지표(도달·조회·좋아요·저장·공유·팔로우 등)를 읽고
  2) insights/post_reports/<lang>_<id>_<type>.md 에 한국어 보고서를 쓰고
  3) GitHub 이슈로 올린다 (저장소 주인에게 메일·앱 알림이 간다).
보고한 목록은 insights/post_reports/index.json 에 남긴다 (같은 게시물 두 번 보고 안 함).

  python3 post_report.py            # 실제 실행
  python3 post_report.py --dry-run  # 이슈를 만들지 않고 보고서만 출력
"""
import json
import os
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from insights import MEDIA_METRICS, get, metric_value  # noqa: E402

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
OUT = ROOT / "insights" / "post_reports"
INDEX = OUT / "index.json"
WAIT = timedelta(hours=2)
GIVE_UP = timedelta(hours=48)  # 그보다 오래된 게시물은 건너뜀 (늦게라도 한 번은 보고)

ACCOUNTS = {"tr": ("터키어", "korede.bugun", 3, "터키"), "es": ("스페인어", "hoy.encorea", 1, "마드리드")}
TYPE_KO = {"carousel": "캐러셀", "reel": "릴스", "story": "스토리"}
LABELS = [("reach", "도달(본 사람)"), ("views", "조회"), ("likes", "좋아요"), ("comments", "댓글"),
          ("saved", "저장"), ("shares", "공유"), ("follows", "팔로우"), ("profile_visits", "프로필 방문"),
          ("replies", "답장"), ("ig_reels_avg_watch_time", "평균 시청(초)")]


def score(m):
    r = m.get("reach") or 0
    if not r:
        return None
    s = (m.get("shares") or 0) * 4 + (m.get("saved") or 0) * 3 + (m.get("follows") or 0) * 5 \
        + (m.get("comments") or 0) * 2 + (m.get("likes") or 0)
    return round(s * 1000 / r, 1)


def title_of(lang, pid, kind):
    if kind == "story":
        return "오늘의 뉴스 요약 스토리"
    meta = ROOT / "posts" / lang / pid / "meta.json"
    if meta.exists():
        return json.loads(meta.read_text())["headline"]
    return pid


def judge(m, prev):
    """숫자만 보고 한두 줄 판단. 과장하지 않는다."""
    out = []
    r = m.get("reach") or 0
    if prev:
        avg = sum(prev) / len(prev)
        if avg:
            ratio = r / avg
            out.append(f"같은 계정 이전 {len(prev)}개 게시물의 2시간 평균 도달 {avg:.0f}명 대비 **{ratio:.1f}배**.")
    else:
        out.append("비교할 이전 2시간 기록이 아직 없습니다 (첫 기록).")
    if r < 30:
        out.append("도달이 아직 작습니다. 신규 계정은 첫 2주 동안 흔한 수준이라, 판단은 게시물이 5개 이상 쌓인 뒤에 합니다.")
    else:
        sh, sv = m.get("shares") or 0, m.get("saved") or 0
        if (sh + sv) / r >= 0.03:
            out.append("공유·저장 비율이 3% 이상입니다. 이 주제·형식은 다음에 한 번 더 시도할 만합니다.")
        elif (sh + sv) == 0:
            out.append("공유·저장이 아직 0입니다. 첫 장 제목이 '보내고 싶은' 내용인지 다음 게시물에서 점검합니다.")
    return out


def media_metrics(token, media_id, kind):
    product = {"reel": "REELS", "story": "STORY"}.get(kind, "FEED")
    m = {}
    for met in MEDIA_METRICS[product]:
        m[met] = metric_value(get(token, f"{media_id}/insights", metric=met))
    info = get(token, media_id, fields="like_count,comments_count,permalink")
    if m.get("likes") is None:
        m["likes"] = info.get("like_count")
    if m.get("comments") is None:
        m["comments"] = info.get("comments_count")
    return m, info.get("permalink")


def build(key, rec, now, index):
    lang, pid, kind = key.split("/")
    name, handle, off, city = ACCOUNTS[lang]
    L = lang.upper()
    token, user = os.environ.get(f"IG_ACCESS_TOKEN_{L}"), os.environ.get(f"IG_USER_ID_{L}")
    if not token:
        return None
    m, link = media_metrics(token, rec["media_id"], kind)
    if rec.get("comment_id") and m.get("comments"):
        m["comments"] -= 1  # 우리가 단 "오늘의 한국어" 댓글은 빼고 센다
    followers = get(token, user, fields="followers_count").get("followers_count") if user else None
    pub = datetime.fromisoformat(rec["published_at"])
    age = now - pub
    prev = [v["metrics"].get("reach") or 0 for k, v in index.items()
            if k.startswith(lang + "/") and k.endswith("/" + kind) and k != key]
    sc = score(m)

    kst = (pub + timedelta(hours=9)).strftime("%m/%d %H:%M")
    loc = (pub + timedelta(hours=off)).strftime("%H:%M")
    lines = [
        f"## {name} @{handle} · {TYPE_KO.get(kind, kind)}",
        f"**{title_of(lang, pid, kind)}**",
        "",
        f"- 게시: 한국 {kst} ({city} {loc})",
        f"- 링크: {link or rec.get('permalink') or '-'}",
        f"- 측정: 게시 후 {age.total_seconds() / 3600:.1f}시간 · 현재 팔로워 {followers if followers is not None else '-'}명",
        "",
        "| 지표 | 값 |", "|---|---|",
    ]
    for k, label in LABELS:
        if k in m and m[k] is not None:
            lines.append(f"| {label} | {m[k]} |")
    if sc is not None:
        lines.append(f"| 반응 점수(도달 1천 명당) | {sc} |")
    lines += ["", "**판단**"] + [f"- {x}" for x in judge(m, prev)]
    body = "\n".join(lines) + "\n"
    title = f"[2시간 보고] {L} {TYPE_KO.get(kind, kind)} · 도달 {m.get('reach') or 0} · 좋아요 {m.get('likes') or 0} · {pid}"
    return {"title": title, "body": body, "metrics": m, "at": now.isoformat(timespec="seconds")}


def main():
    dry = "--dry-run" in sys.argv
    state = json.loads((HERE / "state.json").read_text()) if (HERE / "state.json").exists() else {}
    OUT.mkdir(parents=True, exist_ok=True)
    index = json.loads(INDEX.read_text()) if INDEX.exists() else {}
    now = datetime.now(timezone.utc)
    done = 0
    for key, rec in sorted(state.items(), key=lambda kv: kv[1].get("published_at", "")):
        kind = key.split("/")[-1]
        if kind not in TYPE_KO or key in index or not rec.get("media_id"):
            continue
        age = now - datetime.fromisoformat(rec["published_at"])
        if age < WAIT:
            continue
        if age > GIVE_UP:
            index[key] = {"skipped": "too_old", "metrics": {}}
            continue
        rep = build(key, rec, now, index)
        if not rep:
            continue
        print(rep["title"]); print(rep["body"])
        if dry:
            continue
        fname = OUT / (key.replace("/", "_") + ".md")
        fname.write_text(f"# {rep['title']}\n\n{rep['body']}", encoding="utf-8")
        try:
            subprocess.run(["gh", "issue", "create", "--title", rep["title"], "--body", rep["body"]], check=True)
        except Exception as e:  # 이슈 실패해도 보고서 파일은 남긴다
            print("이슈 생성 실패:", e)
        index[key] = {"metrics": rep["metrics"], "at": rep["at"]}
        done += 1
    if not dry:
        INDEX.write_text(json.dumps(index, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"2시간 보고 {done}건")


if __name__ == "__main__":
    main()
