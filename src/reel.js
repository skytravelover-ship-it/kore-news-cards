// 세로 장면 렌더러 (1080×1920). 릴스 장면과 스토리에 같이 쓴다.
// reel.html?lang=tr&id=halloween&scene=cover|f1|f2|f3|why|word
// story.html 은 ?lang=tr&kind=digest (오늘의 3줄 요약)
(function () {
  const q = new URLSearchParams(location.search);
  const L = window.NEWS[q.get("lang") || "tr"];
  const kind = q.get("kind") || "scene";
  const P = L.posts.find((p) => p.id === q.get("id")) || L.posts[0];
  const scene = q.get("scene") || "cover";
  const loc = (q.get("lang") || "tr") === "tr" ? "tr-TR" : "es-ES";
  const sentence = (t) => { const x = t.toLocaleLowerCase(loc); const i = x.search(/\p{L}/u); return x.slice(0, i) + x.charAt(i).toLocaleUpperCase(loc) + x.slice(i + 1); };

  const css = `
  @font-face{font-family:"SERIF";src:url("assets/fonts/SourceSerif4.ttf");font-weight:200 900}
  @font-face{font-family:"SANS";src:url("assets/fonts/Inter.ttf");font-weight:100 900}
  @font-face{font-family:"KR";src:url("assets/fonts/NotoSansKR.ttf");font-weight:100 900}
  :root{--navy:#0b1622;--red:#c8102e;--mut:rgba(255,255,255,.62);--rule:rgba(255,255,255,.2)}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1920px;overflow:hidden;background:var(--navy);color:#fff;font-family:"SANS","KR",sans-serif}
  .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .blur{filter:blur(30px) brightness(.28);transform:scale(1.15)}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(11,22,34,.8) 0%,rgba(11,22,34,0) 18%,rgba(11,22,34,0) 38%,rgba(11,22,34,.9) 60%,var(--navy) 80%)}
  .brand{position:absolute;left:80px;right:80px;top:230px;display:flex;justify-content:space-between;align-items:center}
  .brand .n{display:flex;align-items:center;gap:18px;font-weight:800;font-size:30px;letter-spacing:.2em}
  .brand .n:before{content:"";width:36px;height:6px;background:var(--red)}
  .brand .d{font-weight:600;font-size:24px;letter-spacing:.14em;color:var(--mut)}
  .mid{position:absolute;left:80px;right:80px;top:50%;transform:translateY(-50%)}
  .low{position:absolute;left:80px;right:80px;bottom:430px}
  .kick{font-weight:800;font-size:28px;letter-spacing:.22em;color:#ff4d5e;margin-bottom:28px}
  .hl{font-family:"SERIF";font-weight:700;font-size:92px;line-height:1.08;letter-spacing:-.01em}
  .hl em{font-style:normal}
  .h2{font-family:"SERIF";font-weight:700;font-size:80px;line-height:1.1;margin-bottom:44px}
  .num{font-weight:700;font-size:30px;letter-spacing:.12em;color:#ff4d5e;padding-top:40px;border-top:1px solid var(--rule);margin-bottom:22px}
  .big{font-weight:400;font-size:60px;line-height:1.38}
  .big b{font-weight:700}
  .w-k{font-family:"KR";font-weight:700;font-size:300px;line-height:1.15}
  .w-r{font-weight:400;font-size:48px;color:var(--mut);margin-top:10px}
  .w-m{font-family:"SERIF";font-weight:700;font-size:84px;margin-top:30px}
  .w-c{margin-top:120px;padding-top:44px;border-top:1px solid var(--rule);font-size:42px;line-height:1.4;color:rgba(255,255,255,.85)}
  .w-c b{color:#fff}
  .dg{position:absolute;left:80px;right:80px;top:400px}
  .dg h1{font-family:"SERIF";font-weight:700;font-size:96px;line-height:1.05;margin-bottom:60px}
  .row{display:flex;gap:34px;align-items:center;padding:34px 0;border-top:1px solid var(--rule)}
  .row img{width:210px;height:210px;object-fit:cover;flex:0 0 210px}
  .row .c{font-weight:800;font-size:24px;letter-spacing:.2em;color:#ff4d5e;margin-bottom:12px}
  .row .t{font-family:"SERIF";font-weight:700;font-size:46px;line-height:1.15}
  .tap{position:absolute;left:80px;bottom:300px;font-weight:600;font-size:34px;color:var(--mut)}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const brand = `<div class="brand"><div class="n">${L.brand}</div><div class="d">${L.date}</div></div>`;
  const photo = (blur) => `<img class="bg ${blur ? "blur" : ""}" src="assets/photos/${P.photo}" style="object-position:${P.pos || "center"}">`;
  let html = "";

  if (kind === "digest") {
    const ps = L.posts.slice(0, 3);
    html = `<div class="bg" style="background:var(--ink)"></div>${brand}
      <div class="dg"><div class="kick">${L.date}</div><h1>${L.digestTitle}</h1>
      ${ps.map((p) => `<div class="row"><img src="assets/photos/${p.photo}" style="object-position:${p.pos || "center"}"><div><div class="c">${p.cat}</div><div class="t">${p.short}</div></div></div>`).join("")}
      </div><div class="tap">${L.digestTap}</div>`;
  } else if (scene === "cover") {
    html = `${photo(false)}<div class="shade"></div>${brand}
      <div class="low" id="fit"><div class="kick">${P.cat}</div><div class="hl">${P.headline}</div></div>`;
  } else if (/^f\d$/.test(scene) || scene === "why") {
    const i = scene === "why" ? 0 : +scene[1] - 1;
    const d = scene === "why" ? P.slides[1] : P.slides[0];
    const text = scene === "why" ? (P.reelWhy || d.items[0]) : d.items[i];
    html = `${photo(true)}${brand}
      <div class="mid" id="fit"><div class="kick">${P.cat}</div>
      ${scene === "why" ? `<div class="h2">${sentence(d.label)}</div>` : `<div class="num">0${i + 1}</div>`}
      <div class="big">${text}</div></div>`;
  } else {
    const w = P.word;
    html = `${brand}
      <div class="mid"><div class="kick">${L.wordLabel}</div><div class="w-k">${w.ko}</div>
      <div class="w-r">${w.rom}</div><div class="w-m">${w.mean}</div>
      <div class="w-c">${L.ctaA}<br><b>@${L.handle}</b></div></div>`;
  }
  document.body.innerHTML = html;

  const fit = document.getElementById("fit");
  if (fit) document.fonts.ready.then(() => {
    const t = fit.querySelector(".hl,.big");
    let f = parseInt(getComputedStyle(t).fontSize, 10);
    const limit = scene === "cover" ? 360 : 1500; // 표지는 로고 아래까지만, 본문은 화면 안
    while ((scene === "cover" ? fit.getBoundingClientRect().top < limit : fit.offsetHeight > 1100) && f > 44) { f -= 2; t.style.fontSize = f + "px"; }
  });
})();
