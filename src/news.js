// 뉴스 카드 렌더러. card.html?lang=tr&id=halloween&s=1  (s = 1부터 시작하는 장 번호)
// 데이터는 data.js 의 window.NEWS[lang].posts 에서 읽는다.
(function () {
  const q = new URLSearchParams(location.search);
  const L = window.NEWS[q.get("lang") || "tr"];
  const P = L.posts.find((p) => p.id === q.get("id")) || L.posts[0];
  const s = Math.max(1, parseInt(q.get("s") || "1", 10));
  const total = 2 + P.slides.length; // 표지 + 본문 + 단어장

  const css = `
  @font-face{font-family:"M";src:url("assets/fonts/Montserrat.ttf");font-weight:100 900}
  @font-face{font-family:"KR";src:url("assets/fonts/NotoSansKR.ttf");font-weight:100 900}
  @font-face{font-family:"BH";src:url("assets/fonts/BlackHanSans.ttf")}
  :root{--ink:#0d1117;--red:#e5322d;--yel:#ffc531;--w:#fff}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1350px;overflow:hidden;background:var(--ink);color:var(--w);font-family:"M","KR",sans-serif}
  .slide{position:absolute;inset:0;overflow:hidden}
  .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,17,23,.55) 0%,rgba(13,17,23,0) 18%,rgba(13,17,23,0) 34%,rgba(13,17,23,.78) 54%,#0d1117 74%)}
  .brand{position:absolute;left:60px;top:54px;display:flex;align-items:center;gap:18px;z-index:5}
  .logo{width:86px;height:86px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-family:"BH";font-size:34px;color:#fff;box-shadow:0 4px 18px rgba(0,0,0,.35)}
  .bname{font-weight:900;font-size:30px;letter-spacing:.06em;line-height:1}
  .bhandle{font-weight:600;font-size:21px;opacity:.85;margin-top:6px}
  .date{position:absolute;right:60px;top:74px;z-index:5;font-weight:800;font-size:22px;letter-spacing:.08em;background:rgba(13,17,23,.72);padding:10px 18px;border-radius:30px}
  .block{position:absolute;left:60px;right:60px;bottom:150px;padding-left:30px;border-left:10px solid var(--red)}
  .cat{display:inline-block;background:var(--red);font-weight:900;font-size:25px;letter-spacing:.12em;padding:8px 18px;border-radius:6px;margin-bottom:24px}
  .hl{font-weight:900;font-size:76px;line-height:1.07;letter-spacing:-.015em}
  .hl em{font-style:normal;color:var(--yel)}
  .sub{font-weight:600;font-size:34px;line-height:1.3;margin-top:22px;opacity:.88}
  .foot{position:absolute;left:60px;right:60px;bottom:52px;display:flex;justify-content:space-between;align-items:flex-end}
  .src{font-weight:600;font-size:20px;line-height:1.35;opacity:.6;max-width:720px}
  .swipe{font-weight:900;font-size:26px;letter-spacing:.1em;color:var(--yel)}
  .strip{position:absolute;left:0;right:0;top:0;height:380px;overflow:hidden}
  .strip img{width:100%;height:100%;object-fit:cover}
  .strip:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,17,23,.5),rgba(13,17,23,.2) 40%,#0d1117 100%)}
  .count{position:absolute;right:60px;top:74px;z-index:5;font-weight:900;font-size:24px;background:var(--red);padding:8px 18px;border-radius:30px}
  .inner{position:absolute;left:60px;right:60px;top:360px;bottom:120px}
  .label{display:flex;align-items:center;gap:18px;font-weight:900;font-size:32px;letter-spacing:.14em;color:var(--red);margin-bottom:34px}
  .label:before{content:"";width:46px;height:8px;background:var(--red)}
  .items{display:flex;flex-direction:column;gap:30px}
  .it{display:flex;gap:24px;font-weight:600;font-size:41px;line-height:1.36}
  .it .n{flex:0 0 52px;height:52px;border-radius:50%;background:var(--yel);color:var(--ink);font-weight:900;font-size:28px;display:flex;align-items:center;justify-content:center;margin-top:2px}
  .it b{font-weight:800;color:var(--yel)}
  .ttl{position:absolute;left:60px;right:60px;bottom:54px;font-weight:700;font-size:22px;opacity:.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .word{background:var(--red)}
  .word .lbl{position:absolute;left:0;right:0;top:200px;text-align:center;font-weight:900;font-size:32px;letter-spacing:.16em}
  .word .ko{position:absolute;left:0;right:0;top:270px;text-align:center;font-family:"BH";font-size:250px;line-height:1.1}
  .word .rom{position:absolute;left:0;right:0;top:570px;text-align:center;font-weight:800;font-size:44px;opacity:.92}
  .word .mean{position:absolute;left:0;right:0;top:640px;text-align:center;font-weight:900;font-size:58px;color:var(--yel)}
  .word .ex{position:absolute;left:90px;right:90px;top:780px;background:#fff;color:var(--ink);border-radius:26px;padding:34px 40px;text-align:center}
  .word .ex .k{font-family:"KR";font-weight:700;font-size:44px}
  .word .ex .t{font-weight:600;font-size:36px;margin-top:10px;opacity:.75}
  .word .cta{position:absolute;left:90px;right:90px;bottom:120px;text-align:center}
  .word .cta .a{font-weight:700;font-size:34px;opacity:.95}
  .word .cta .b{display:inline-block;margin-top:18px;background:var(--ink);color:#fff;font-weight:900;font-size:40px;padding:18px 40px;border-radius:50px}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  const brand = (small) => `<div class="brand"><div class="logo" style="${small ? "width:66px;height:66px;font-size:26px" : ""}">오늘</div><div><div class="bname" style="${small ? "font-size:24px" : ""}">${L.brand}</div><div class="bhandle">@${L.handle}</div></div></div>`;
  let html = "";

  if (s === 1) {
    html = `<div class="slide">
      <img class="bg" src="assets/photos/${P.photo}" style="object-position:${P.pos || "center"}">
      <div class="shade"></div>
      ${brand(false)}
      <div class="date">${L.date}</div>
      <div class="block" id="fit">
        <div class="cat">${P.cat}</div>
        <div class="hl">${P.headline}</div>
        ${P.sub ? `<div class="sub">${P.sub}</div>` : ""}
      </div>
      <div class="foot"><div class="src">${L.srcLabel}: ${P.source}<br>${P.credit}</div><div class="swipe">${L.swipe} →</div></div>
    </div>`;
  } else if (s <= 1 + P.slides.length) {
    const d = P.slides[s - 2];
    html = `<div class="slide">
      <div class="strip"><img src="assets/photos/${P.photo}" style="object-position:${P.pos || "center"}"></div>
      ${brand(true)}
      <div class="count">${s}/${total}</div>
      <div class="inner" id="fit">
        <div class="label">${d.label}</div>
        <div class="items">${d.items.map((t, i) => `<div class="it"><div class="n">${i + 1}</div><div>${t}</div></div>`).join("")}</div>
      </div>
      <div class="ttl">${P.short}</div>
    </div>`;
  } else {
    const w = P.word;
    html = `<div class="slide word">
      ${brand(true)}
      <div class="count" style="background:var(--ink)">${total}/${total}</div>
      <div class="lbl">${L.wordLabel}</div>
      <div class="ko">${w.ko}</div>
      <div class="rom">[ ${w.rom} ]</div>
      <div class="mean">${w.mean}</div>
      <div class="ex"><div class="k">${w.exKo}</div><div class="t">${w.exTr}</div></div>
      <div class="cta"><div class="a">${L.ctaA}</div><div class="b">@${L.handle}</div></div>
    </div>`;
  }
  document.body.innerHTML = html;

  // 글자가 넘치면 줄인다
  const fit = document.getElementById("fit");
  if (fit) {
    const shrink = () => {
      if (s === 1) {
        const hl = fit.querySelector(".hl");
        let f = 76;
        while (fit.getBoundingClientRect().top < 210 && f > 50) { f -= 2; hl.style.fontSize = f + "px"; }
      } else {
        const its = [...fit.querySelectorAll(".it")];
        let f = 41;
        while (fit.scrollHeight > fit.clientHeight + 2 && f > 30) { f -= 1; its.forEach((e) => (e.style.fontSize = f + "px")); }
      }
    };
    document.fonts.ready.then(shrink);
  }
})();
