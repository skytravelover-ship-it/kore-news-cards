// 뉴스 카드 렌더러 v2 (신문형). card.html?lang=tr&id=halloween&s=1
// 원칙: 남색·흰색 + 한국 빨강 한 가지 / 헤드라인 세리프, 본문 산세리프 / 장식 최소, 출처·날짜 항상 표시
(function () {
  const q = new URLSearchParams(location.search);
  const lang = q.get("lang") || "tr";
  const L = window.NEWS[lang];
  const P = L.posts.find((p) => p.id === q.get("id")) || L.posts[0];
  const s = Math.max(1, parseInt(q.get("s") || "1", 10));
  const total = 2 + P.slides.length;
  const loc = lang === "tr" ? "tr-TR" : "es-ES";
  const sentence = (t) => { const x = t.toLocaleLowerCase(loc); const i = x.search(/\p{L}/u); return x.slice(0, i) + x.charAt(i).toLocaleUpperCase(loc) + x.slice(i + 1); };

  const css = `
  @font-face{font-family:"SERIF";src:url("assets/fonts/SourceSerif4.ttf");font-weight:200 900}
  @font-face{font-family:"SANS";src:url("assets/fonts/Inter.ttf");font-weight:100 900}
  @font-face{font-family:"KR";src:url("assets/fonts/NotoSansKR.ttf");font-weight:100 900}
  :root{--navy:#0b1622;--red:#c8102e;--w:#fff;--mut:rgba(255,255,255,.62);--rule:rgba(255,255,255,.2)}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1350px;overflow:hidden;background:var(--navy);color:var(--w);font-family:"SANS","KR",sans-serif}
  .slide{position:absolute;inset:0;overflow:hidden}
  .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,22,34,.75) 0%,rgba(11,22,34,0) 15%,rgba(11,22,34,0) 38%,rgba(11,22,34,.88) 60%,var(--navy) 80%)}
  .mast{position:absolute;left:72px;right:72px;top:64px;display:flex;justify-content:space-between;align-items:center;z-index:5}
  .mast .n{display:flex;align-items:center;gap:16px;font-weight:800;font-size:24px;letter-spacing:.2em}
  .mast .n:before{content:"";width:30px;height:5px;background:var(--red)}
  .mast .d{font-weight:600;font-size:20px;letter-spacing:.14em;color:var(--mut)}
  .kick{font-weight:800;font-size:22px;letter-spacing:.22em;color:#ff4d5e;margin-bottom:22px}
  .block{position:absolute;left:72px;right:72px;bottom:170px}
  .hl{font-family:"SERIF";font-weight:700;font-size:74px;line-height:1.1;letter-spacing:-.01em}
  .hl em{font-style:normal}
  .sub{font-weight:400;font-size:31px;line-height:1.42;color:rgba(255,255,255,.82);margin-top:26px}
  .foot{position:absolute;left:72px;right:72px;bottom:56px;padding-top:20px;border-top:1px solid var(--rule);display:flex;justify-content:space-between;align-items:flex-end;gap:30px}
  .src{font-weight:500;font-size:18px;line-height:1.45;color:var(--mut)}
  .pg{font-weight:700;font-size:20px;letter-spacing:.12em;color:var(--mut);white-space:nowrap}
  .inner{position:absolute;left:72px;right:72px;top:170px;bottom:140px}
  .h2{font-family:"SERIF";font-weight:700;font-size:68px;line-height:1.1;margin-bottom:34px}
  .it{display:flex;gap:28px;padding:34px 0;border-top:1px solid var(--rule);font-weight:400;font-size:41px;line-height:1.45}
  .it .n{flex:0 0 46px;font-weight:700;font-size:22px;letter-spacing:.1em;color:#ff4d5e;padding-top:10px}
  .it b{font-weight:700}
  .wk{position:absolute;left:72px;right:72px;top:220px}
  .wk .ko{font-family:"KR";font-weight:700;font-size:250px;line-height:1.15;margin-top:10px}
  .wk .rom{font-weight:400;font-size:38px;color:var(--mut);margin-top:6px}
  .wk .mean{font-family:"SERIF";font-weight:700;font-size:66px;margin-top:26px}
  .wk .ex{margin-top:56px;padding-top:34px;border-top:1px solid var(--rule)}
  .wk .ex .k{font-family:"KR";font-weight:500;font-size:46px}
  .wk .ex .t{font-weight:400;font-size:36px;color:var(--mut);margin-top:12px}
  .cta{position:absolute;left:72px;right:72px;bottom:140px;font-weight:400;font-size:34px;line-height:1.4;color:rgba(255,255,255,.85)}
  .cta b{font-weight:700;color:var(--w)}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const mast = `<div class="mast"><div class="n">${L.brand}</div><div class="d">${L.date}</div></div>`;
  let html = "";

  if (s === 1) {
    html = `<div class="slide">
      <img class="bg" src="assets/photos/${P.photo}" style="object-position:${P.pos || "center"}">
      <div class="shade"></div>${mast}
      <div class="block" id="fit"><div class="kick">${P.cat}</div>
        <div class="hl">${P.headline}</div>${P.sub ? `<div class="sub">${P.sub}</div>` : ""}</div>
      <div class="foot"><div class="src">${L.srcLabel}: ${P.source}<br>${P.credit}</div><div class="pg">1/${total} →</div></div>
    </div>`;
  } else if (s <= 1 + P.slides.length) {
    const d = P.slides[s - 2];
    html = `<div class="slide">${mast}
      <div class="inner" id="fit"><div class="kick">${P.cat}</div><div class="h2">${sentence(d.label)}</div>
        ${d.items.map((t, i) => `<div class="it"><div class="n">0${i + 1}</div><div>${t}</div></div>`).join("")}
      </div>
      <div class="foot"><div class="src">${P.short}</div><div class="pg">${s}/${total}</div></div>
    </div>`;
  } else {
    const w = P.word;
    html = `<div class="slide">${mast}
      <div class="wk"><div class="kick">${L.wordLabel}</div><div class="ko">${w.ko}</div><div class="rom">${w.rom}</div>
        <div class="mean">${w.mean}</div><div class="ex"><div class="k">${w.exKo}</div><div class="t">${w.exTr}</div></div></div>
      <div class="cta">${L.ctaA}<br><b>@${L.handle}</b></div>
      <div class="foot"><div class="src">${P.short}</div><div class="pg">${total}/${total}</div></div>
    </div>`;
  }
  document.body.innerHTML = html;

  const fit = document.getElementById("fit");
  if (fit) document.fonts.ready.then(() => {
    if (s === 1) {
      const hl = fit.querySelector(".hl"); let f = 74;
      while (fit.getBoundingClientRect().top < 200 && f > 50) { f -= 2; hl.style.fontSize = f + "px"; }
    } else {
      const its = [...fit.querySelectorAll(".it")]; let f = 41;
      while (fit.scrollHeight > fit.clientHeight + 2 && f > 28) { f -= 1; its.forEach((e) => (e.style.fontSize = f + "px")); }
    }
  });
})();
