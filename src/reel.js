// 세로 장면 렌더러 (1080×1920). 릴스 장면과 스토리에 같이 쓴다.
// reel.html?lang=tr&id=halloween&scene=cover|f1|f2|f3|why|word
// story.html 은 ?lang=tr&kind=digest (오늘의 3줄 요약)
(function () {
  const q = new URLSearchParams(location.search);
  const L = window.NEWS[q.get("lang") || "tr"];
  const kind = q.get("kind") || "scene";
  const P = L.posts.find((p) => p.id === q.get("id")) || L.posts[0];
  const scene = q.get("scene") || "cover";

  const css = `
  @font-face{font-family:"M";src:url("assets/fonts/Montserrat.ttf");font-weight:100 900}
  @font-face{font-family:"KR";src:url("assets/fonts/NotoSansKR.ttf");font-weight:100 900}
  @font-face{font-family:"BH";src:url("assets/fonts/BlackHanSans.ttf")}
  :root{--ink:#0d1117;--red:#e5322d;--yel:#ffc531}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:1080px;height:1920px;overflow:hidden;background:var(--ink);color:#fff;font-family:"M","KR",sans-serif}
  .bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .blur{filter:blur(28px) brightness(.45);transform:scale(1.15)}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(13,17,23,.6) 0%,rgba(13,17,23,0) 16%,rgba(13,17,23,0) 36%,rgba(13,17,23,.85) 58%,#0d1117 80%)}
  .brand{position:absolute;left:64px;top:230px;display:flex;align-items:center;gap:20px}
  .logo{width:92px;height:92px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-family:"BH";font-size:36px}
  .bname{font-weight:900;font-size:32px;letter-spacing:.06em}
  .bhandle{font-weight:600;font-size:23px;opacity:.85;margin-top:6px}
  .mid{position:absolute;left:72px;right:72px;top:50%;transform:translateY(-50%)}
  .low{position:absolute;left:64px;right:64px;bottom:420px;padding-left:32px;border-left:12px solid var(--red)}
  .cat{display:inline-block;background:var(--red);font-weight:900;font-size:30px;letter-spacing:.12em;padding:10px 22px;border-radius:8px;margin-bottom:30px}
  .hl{font-weight:900;font-size:88px;line-height:1.06;letter-spacing:-.015em}
  .hl em{font-style:normal;color:var(--yel)}
  .label{display:flex;align-items:center;gap:20px;font-weight:900;font-size:40px;letter-spacing:.14em;color:var(--red);margin-bottom:46px}
  .label:before{content:"";width:56px;height:10px;background:var(--red)}
  .big{font-weight:700;font-size:64px;line-height:1.28}
  .big b{font-weight:900;color:var(--yel)}
  .num{display:inline-flex;width:84px;height:84px;border-radius:50%;background:var(--yel);color:var(--ink);font-weight:900;font-size:46px;align-items:center;justify-content:center;margin-bottom:34px}
  .word{background:var(--red)}
  .w-l{text-align:center;font-weight:900;font-size:40px;letter-spacing:.16em}
  .w-k{text-align:center;font-family:"BH";font-size:300px;line-height:1.15;margin-top:30px}
  .w-r{text-align:center;font-weight:800;font-size:54px;opacity:.92;margin-top:20px}
  .w-m{text-align:center;font-weight:900;font-size:70px;color:var(--yel);margin-top:14px}
  .w-c{text-align:center;margin-top:90px}
  .w-c span{display:inline-block;background:var(--ink);font-weight:900;font-size:50px;padding:22px 50px;border-radius:60px}
  .w-c div{font-weight:700;font-size:40px;margin-bottom:22px}
  .dg{position:absolute;left:64px;right:64px;top:400px}
  .dg h1{font-weight:900;font-size:82px;line-height:1.05;margin-bottom:12px}
  .dg h2{font-weight:800;font-size:34px;letter-spacing:.12em;color:var(--yel);margin-bottom:60px}
  .row{display:flex;gap:30px;align-items:center;margin-bottom:44px;background:rgba(255,255,255,.07);border-radius:28px;padding:22px}
  .row img{width:220px;height:220px;object-fit:cover;border-radius:20px;flex:0 0 220px}
  .row .c{font-weight:900;font-size:24px;letter-spacing:.12em;color:var(--red);margin-bottom:10px}
  .row .t{font-weight:800;font-size:40px;line-height:1.2}
  .row .t em{font-style:normal;color:var(--yel)}
  .tap{position:absolute;left:0;right:0;bottom:250px;text-align:center;font-weight:900;font-size:38px;color:var(--yel)}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const brand = `<div class="brand"><div class="logo">오늘</div><div><div class="bname">${L.brand}</div><div class="bhandle">@${L.handle}</div></div></div>`;
  const photo = (blur) => `<img class="bg ${blur ? "blur" : ""}" src="assets/photos/${P.photo}" style="object-position:${P.pos || "center"}">`;
  let html = "";

  if (kind === "digest") {
    const ps = L.posts.slice(0, 3);
    html = `<div class="bg" style="background:var(--ink)"></div>${brand}
      <div class="dg"><h1>${L.digestTitle}</h1><h2>${L.date}</h2>
      ${ps.map((p) => `<div class="row"><img src="assets/photos/${p.photo}" style="object-position:${p.pos || "center"}"><div><div class="c">${p.cat}</div><div class="t">${p.short}</div></div></div>`).join("")}
      </div><div class="tap">${L.digestTap}</div>`;
  } else if (scene === "cover") {
    html = `${photo(false)}<div class="shade"></div>${brand}
      <div class="low" id="fit"><div class="cat">${P.cat}</div><div class="hl">${P.headline}</div></div>`;
  } else if (/^f\d$/.test(scene) || scene === "why") {
    const i = scene === "why" ? 0 : +scene[1] - 1;
    const d = scene === "why" ? P.slides[1] : P.slides[0];
    const text = scene === "why" ? (P.reelWhy || d.items[0]) : d.items[i];
    html = `${photo(true)}${brand}
      <div class="mid" id="fit"><div class="label">${d.label}</div>
      ${scene === "why" ? "" : `<div class="num">${i + 1}</div>`}
      <div class="big">${text}</div></div>`;
  } else {
    const w = P.word;
    html = `<div class="bg word"></div>${brand}
      <div class="mid"><div class="w-l">${L.wordLabel}</div><div class="w-k">${w.ko}</div>
      <div class="w-r">[ ${w.rom} ]</div><div class="w-m">${w.mean}</div>
      <div class="w-c"><div>${L.ctaA}</div><span>@${L.handle}</span></div></div>`;
  }
  document.body.innerHTML = html;

  const fit = document.getElementById("fit");
  if (fit) document.fonts.ready.then(() => {
    const t = fit.querySelector(".hl,.big");
    let f = parseInt(getComputedStyle(t).fontSize, 10);
    const limit = scene === "cover" ? 380 : 1500; // 표지는 로고 아래까지만, 본문은 화면 안
    while ((scene === "cover" ? fit.getBoundingClientRect().top < limit : fit.offsetHeight > 1100) && f > 44) { f -= 2; t.style.fontSize = f + "px"; }
  });
})();
