#!/usr/bin/env python3
"""인사이트 분석 → insights/REPORT.md + insights/dashboard.html (GitHub Pages로 공개)

판단 원칙 (sns-content-playbook)
  - 많이 → 진단 → 승자 반복. 한 번에 하나만 고친다. 검증 80 / 실험 20.
  - 비교는 같은 조건끼리: 게시 후 24시간 시점 도달(reach_24h)로 비교해 오래된 글이 유리하지 않게.
  - 묶음당 3개 미만이면 결론 내지 않고 "표본 부족"으로 표시.
"""
import html
import json
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
INS = ROOT / "insights"
MIN_N = 3
TZ = {"tr": timezone(timedelta(hours=3)), "es": timezone(timedelta(hours=-6))}  # 터키 / 멕시코시티 (스페인어권 최대 시장)
CAT = {"TOPLUM": "사회", "SOCIEDAD": "사회", "YAŞAM": "생활·문화", "CULTURA": "생활·문화", "EKONOMİ": "경제",
       "ECONOMÍA": "경제", "TEKNOLOJİ": "테크", "TECNOLOGÍA": "테크", "DEPORTES": "스포츠", "SPOR": "스포츠"}
FORMAT = {"FEED": "캐러셀", "REELS": "릴스", "STORY": "스토리"}


def ts(s):
    return datetime.fromisoformat(s.replace("Z", "+00:00").replace("+0000", "+00:00"))


def load():
    snaps = []
    for f in sorted((INS / "snapshots").glob("*.json")):
        try:
            snaps.append(json.loads(f.read_text(encoding="utf-8")))
        except Exception:
            pass
    return snaps


def rows_from(snaps):
    """최신 스냅샷 기준 게시물 행 + 24시간 시점 도달 계산."""
    if not snaps:
        return [], {}
    latest = snaps[-1]
    now = ts(latest["collected_at"])
    hist = defaultdict(list)  # media id -> [(age_h, reach)]
    for s in snaps:
        t = ts(s["collected_at"])
        for lang, a in s["accounts"].items():
            for m in a["media"]:
                if m.get("timestamp") and m["metrics"].get("reach") is not None:
                    hist[m["id"]].append(((t - ts(m["timestamp"])).total_seconds() / 3600, m["metrics"]["reach"]))
    rows = []
    for lang, a in latest["accounts"].items():
        for m in a["media"]:
            key = m.get("key") or ""
            pid = key.split("/")[1] if key.count("/") >= 2 else None
            meta = {}
            if pid:
                mf = ROOT / "posts" / lang / pid / "meta.json"
                meta = json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else {}
            met = m["metrics"]
            reach = met.get("reach") or 0
            posted = ts(m["timestamp"]) if m.get("timestamp") else now
            after24 = [r for h, r in sorted(hist[m["id"]]) if h >= 24]
            rate = lambda v: (v or 0) / reach if reach else None
            rows.append({
                "lang": lang, "id": m["id"], "key": key, "title": meta.get("short") or key or m["id"],
                "cat": CAT.get(meta.get("cat", ""), meta.get("cat") or "?"), "format": FORMAT.get(m.get("product"), m.get("product")),
                "posted": posted, "hour": posted.astimezone(TZ[lang]).hour, "age_h": (now - posted).total_seconds() / 3600,
                "reach": reach, "reach_24h": after24[0] if after24 else None, "views": met.get("views"),
                "likes": met.get("likes", m.get("like_count")), "comments": met.get("comments", m.get("comments_count")),
                "saved": met.get("saved"), "shares": met.get("shares"), "follows": met.get("follows"),
                "profile_visits": met.get("profile_visits"), "avg_watch_ms": met.get("ig_reels_avg_watch_time"),
                "save_rate": rate(met.get("saved")), "share_rate": rate(met.get("shares")),
                "eng_rate": rate(met.get("total_interactions")), "link": m.get("permalink"),
            })
    for r in rows:  # 종합 점수: 공유·저장·팔로우에 가중치 (도달 1,000명당)
        r["score"] = None if not r["reach"] else round(1000 * ((r["shares"] or 0) * 4 + (r["saved"] or 0) * 3 + (r["follows"] or 0) * 5
                                                             + (r["comments"] or 0) * 2 + (r["likes"] or 0)) / r["reach"], 1)
    return rows, latest


def followers(snaps):
    out = defaultdict(list)
    for s in snaps:
        for lang, a in s["accounts"].items():
            out[lang].append((s["collected_at"][:16].replace("T", " "), a["account"].get("followers_count")))
    return out


def group(rows, field):
    g = defaultdict(list)
    for r in rows:
        if r["format"] != "스토리":
            g[(r["lang"], r[field])].append(r)
    res = []
    for (lang, k), rs in sorted(g.items()):
        reach = [x["reach_24h"] if x["reach_24h"] is not None else x["reach"] for x in rs]
        sc = [x["score"] for x in rs if x["score"] is not None]
        res.append({"lang": lang, "group": k, "n": len(rs), "reach": sum(reach) / len(reach), "score": sum(sc) / len(sc) if sc else None})
    return res


def advice(rows, fol):
    """규칙 기반 다음 행동 제안. 표본이 부족하면 단정하지 않는다."""
    out = []
    posts = [r for r in rows if r["format"] != "스토리"]
    if len(posts) < 2 * MIN_N:
        out.append(f"게시물 {len(posts)}개: 아직 표본이 적어 방향을 단정하지 않습니다. 계정당 최소 {MIN_N * 3}개가 쌓일 때까지 기획안대로 운영합니다.")
    for lang in ("tr", "es"):
        lr = [r for r in posts if r["lang"] == lang and r["reach"]]
        if not lr:
            continue
        best = max(lr, key=lambda r: r["score"] or 0)
        out.append(f"[{lang.upper()}] 반응 1위: '{best['title']}' ({best['format']}, {best['cat']}). 점수 {best['score']}, 공유 {best['shares'] or 0}, 저장 {best['saved'] or 0}. 같은 형식으로 주제만 바꿔 다음에 더 시험합니다(승자 반복).")
        car = [r["reach"] for r in lr if r["format"] == "캐러셀"]
        reel = [r["reach"] for r in lr if r["format"] == "릴스"]
        if len(car) >= MIN_N and len(reel) >= MIN_N:
            ca, re_ = sum(car) / len(car), sum(reel) / len(reel)
            if re_ > ca * 1.5:
                out.append(f"[{lang.upper()}] 릴스 평균 도달이 캐러셀의 {re_ / ca:.1f}배입니다. 새 사람을 데려오는 건 릴스이므로 릴스 비중을 늘립니다.")
            elif ca > re_ * 1.5:
                out.append(f"[{lang.upper()}] 캐러셀 도달이 릴스의 {ca / re_:.1f}배입니다. 릴스의 첫 3초(표지 장면)를 먼저 고칩니다.")
        sr = [r["save_rate"] for r in lr if r["save_rate"] is not None]
        if len(sr) >= MIN_N and sum(sr) / len(sr) < 0.01:
            out.append(f"[{lang.upper()}] 평균 저장률 {100 * sum(sr) / len(sr):.1f}%로 낮습니다. '왜 중요한가' 장을 더 실용적으로(숫자·비교·해 볼 방법) 바꿔 봅니다.")
        cats = [g for g in group(lr, "cat") if g["n"] >= MIN_N and g["score"] is not None]
        if len(cats) >= 2:
            lo = min(cats, key=lambda g: g["score"])
            hi = max(cats, key=lambda g: g["score"])
            out.append(f"[{lang.upper()}] 카테고리: '{hi['group']}' 점수 {hi['score']:.1f}가 가장 높고, '{lo['group']}'가 {lo['score']:.1f}로 가장 낮습니다. 낮은 쪽을 줄이고 높은 쪽 비중을 늘립니다.")
        f = [v for _, v in fol.get(lang, []) if v is not None]
        if len(f) >= 2:
            out.append(f"[{lang.upper()}] 팔로워 {f[0]} → {f[-1]} (수집 기간 중 {f[-1] - f[0]:+d}).")
    return out


def fmt(v, pct=False):
    if v is None:
        return "–"
    if pct:
        return f"{100 * v:.1f}%"
    return f"{v:,.0f}" if isinstance(v, (int, float)) and not isinstance(v, bool) else str(v)


def main():
    snaps = load()
    rows, latest = rows_from(snaps)
    fol = followers(snaps)
    adv = advice(rows, fol)
    when = latest.get("collected_at", "-") if latest else "-"
    rows.sort(key=lambda r: (r["lang"], -(r["score"] or 0)))

    # ---- Markdown (세션에서 읽기용)
    md = [f"# 인사이트 리포트", f"- 수집 시각: {when} (UTC)", "- 점수 = 도달 1,000명당 (공유×4 + 저장×3 + 팔로우×5 + 댓글×2 + 좋아요)", "", "## 다음 행동"]
    md += [f"- {a}" for a in adv] or ["- (데이터 없음)"]
    md += ["", "## 게시물별", "| 언어 | 제목 | 형식 | 카테고리 | 게시 후 | 도달 | 24h 도달 | 좋아요 | 댓글 | 저장 | 공유 | 팔로우 | 저장률 | 공유률 | 점수 |", "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        md.append(f"| {r['lang']} | [{r['title']}]({r['link']}) | {r['format']} | {r['cat']} | {r['age_h']:.0f}h | {fmt(r['reach'])} | {fmt(r['reach_24h'])} | {fmt(r['likes'])} | {fmt(r['comments'])} | {fmt(r['saved'])} | {fmt(r['shares'])} | {fmt(r['follows'])} | {fmt(r['save_rate'], 1)} | {fmt(r['share_rate'], 1)} | {fmt(r['score'])} |")
    for field, name in (("format", "형식별"), ("cat", "카테고리별"), ("hour", "게시 시각별(현지)")):
        md += ["", f"## {name}", "| 언어 | 묶음 | 개수 | 평균 도달(24h 우선) | 평균 점수 |", "|---|---|---|---|---|"]
        for g in group(rows, field):
            md.append(f"| {g['lang']} | {g['group']} | {g['n']}{'' if g['n'] >= MIN_N else ' (표본 부족)'} | {fmt(g['reach'])} | {fmt(g['score'])} |")
    md += ["", "## 팔로워 추이"] + [f"- {lang}: " + " → ".join(f"{v}" for _, v in pts if v is not None) for lang, pts in fol.items()]
    if latest:
        errs = [(l, e["where"]) for l, a in latest["accounts"].items() for e in a["errors"]]
        if errs:
            md += ["", "## 수집 안 된 지표", "새 계정은 팔로워 100명 전까지 일부 계정 지표가 막혀 있을 수 있습니다.", ""] + [f"- {l}: {w}" for l, w in errs]
    INS.mkdir(exist_ok=True)
    (INS / "REPORT.md").write_text("\n".join(md) + "\n", encoding="utf-8")

    # ---- HTML 대시보드 (휴대폰으로 보는 용도)
    e = html.escape
    def table(rs):
        mx = max([r["reach"] or 0 for r in rs] + [1])
        return "".join(f"""<tr><td><a href="{e(r['link'] or '#')}">{e(r['title'])}</a><div class=s>{r['format']} · {e(r['cat'])} · {r['age_h']:.0f}h</div>
          <div class=bar><i style="width:{100 * (r['reach'] or 0) / mx:.0f}%"></i></div></td>
          <td>{fmt(r['reach'])}</td><td>{fmt(r['shares'])}</td><td>{fmt(r['saved'])}</td><td>{fmt(r['follows'])}</td><td><b>{fmt(r['score'])}</b></td></tr>""" for r in rs)
    secs = ""
    for lang, label in (("tr", "Kore'de Bugün · 터키어"), ("es", "Hoy en Corea · 스페인어")):
        rs = [r for r in rows if r["lang"] == lang]
        f = [v for _, v in fol.get(lang, []) if v is not None]
        secs += f"""<section><h2>{label}</h2><div class=kpi><div><b>{f[-1] if f else '–'}</b>팔로워</div><div><b>{len([r for r in rs if r['format'] != '스토리'])}</b>게시물</div>
          <div><b>{fmt(sum(r['reach'] or 0 for r in rs))}</b>누적 도달</div><div><b>{fmt(sum(r['shares'] or 0 for r in rs))}</b>공유</div></div>
          <table><tr><th>게시물</th><th>도달</th><th>공유</th><th>저장</th><th>팔로우</th><th>점수</th></tr>{table(rs) or '<tr><td colspan=6>아직 데이터 없음</td></tr>'}</table></section>"""
    page = f"""<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>인사이트 · 한국 뉴스 계정</title><style>
body{{margin:0;background:#0b1622;color:#fff;font:15px/1.5 -apple-system,system-ui,sans-serif}}main{{max-width:880px;margin:auto;padding:24px 16px}}
h1{{font:700 26px Georgia,serif;margin:0}}.m{{color:#9aa7b4;font-size:13px;margin:4px 0 20px}}h2{{font:700 20px Georgia,serif;border-top:1px solid #2a3a4b;padding-top:18px}}
.adv{{background:#13243a;border-left:4px solid #c8102e;padding:12px 16px;margin:14px 0}}.adv li{{margin:6px 0}}
.kpi{{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:10px 0 14px}}.kpi div{{background:#13243a;padding:10px;font-size:12px;color:#9aa7b4}}.kpi b{{display:block;font-size:22px;color:#fff}}
table{{width:100%;border-collapse:collapse}}th,td{{text-align:right;padding:8px 4px;border-bottom:1px solid #1f3043;font-size:14px}}th:first-child,td:first-child{{text-align:left}}
a{{color:#fff}}.s{{color:#9aa7b4;font-size:12px}}.bar{{height:4px;background:#1f3043;margin-top:4px}}.bar i{{display:block;height:4px;background:#c8102e}}
</style></head><body><main><h1>인사이트</h1><div class=m>수집 {e(when)} UTC · 6시간마다 자동 갱신 · 점수 = 도달 1,000명당 (공유×4+저장×3+팔로우×5+댓글×2+좋아요)</div>
<div class=adv><b>다음 행동</b><ul>{''.join(f'<li>{e(a)}</li>' for a in adv) or '<li>데이터 없음</li>'}</ul></div>{secs}</main></body></html>"""
    (INS / "dashboard.html").write_text(page, encoding="utf-8")
    print(f"리포트: 게시물 {len(rows)}개, 제안 {len(adv)}개")


if __name__ == "__main__":
    main()
