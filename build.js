// 렌더링된 PNG → 업로드용 폴더(posts/<lang>/<id>/01.jpg…, caption.txt, comment.txt)
// 사용법: ./render.sh && node build.js
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
global.window = {};
eval(fs.readFileSync(path.join(__dirname, "src/data.js"), "utf8"));

const strip = (h) => h.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

const BASE_TAGS = {
  tr: ["#güneykore", "#kore", "#seul", "#korehaberleri", "#koredebugun", "#korece"],
  es: ["#coreadelsur", "#corea", "#seúl", "#noticiasdecorea", "#hoyencorea", "#coreano"],
};
const TOPIC_TAGS = {
  halloween: { tr: ["#cadılarbayramı", "#itaewon"], es: ["#halloween", "#itaewon"] },
  temple: { tr: ["#budizm", "#yapayzeka"], es: ["#budismo", "#inteligenciaartificial"] },
  basicincome: { tr: ["#temelgelir", "#köy"], es: ["#ingresobásico", "#despoblación"] },
  altman: { tr: ["#samaltman", "#samsung", "#openai"], es: ["#samaltman", "#samsung"] },
  roh: { tr: ["#beyzbol"], es: ["#béisbol", "#kbo", "#mlb"] },
};
// 인스타는 2025-12부터 해시태그 최대 5개: 계정 태그 1 + 국가 2 + 주제 2
const tags = (lang, id) => [BASE_TAGS[lang][4], BASE_TAGS[lang][0], BASE_TAGS[lang][3], ...((TOPIC_TAGS[id] || {})[lang] || []).slice(0, 2)].join(" ");
const T = {
  tr: { more: "Detaylar için kaydır 👉", src: "Kaynak", word: "Günün Korecesi" },
  es: { more: "Desliza para el contexto 👉", src: "Fuente", word: "Palabra del día" },
};

for (const [lang, L] of Object.entries(window.NEWS)) {
  for (const p of L.posts) {
    const pngDir = path.join(__dirname, "out", lang, p.id);
    const dst = path.join(__dirname, "posts", lang, p.id);
    fs.mkdirSync(dst, { recursive: true });
    for (const f of fs.readdirSync(dst)) if (f.endsWith(".jpg")) fs.unlinkSync(path.join(dst, f));
    const pngs = fs.readdirSync(pngDir).filter((f) => /^\d\d\.png$/.test(f)).sort();
    for (const f of pngs)
      execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "92", path.join(pngDir, f), "--out", path.join(dst, f.replace(".png", ".jpg"))], { stdio: "ignore" });

    const t = T[lang];
    const caption = [
      `🇰🇷 ${strip(p.headline)}`,
      "",
      ...p.slides[0].items.map((x) => `▪️ ${strip(x)}`),
      "",
      t.more,
      "",
      `💬 ${p.question}`,
      "",
      `${t.src}: ${p.source}`,
      `${p.credit}`,
      "",
      tags(lang, p.id),
    ].join("\n");
    const comment = `📌 ${t.word}: ${p.word.ko} (${p.word.rom}) = ${p.word.mean}\n${p.word.exKo}\n→ ${p.word.exTr}`;
    fs.writeFileSync(path.join(dst, "caption.txt"), caption + "\n");
    fs.writeFileSync(path.join(dst, "comment.txt"), comment + "\n");
    // 장별 대체텍스트 (시각장애인 접근성 + 검색 신호)
    const alt = [strip(p.headline), ...p.slides.map((d) => `${strip(d.label)} ${d.items.map(strip).join(" ")}`),
      `${p.word.ko} (${p.word.rom}) = ${p.word.mean}. ${p.word.exTr}`];
    fs.writeFileSync(path.join(dst, "alt.json"), JSON.stringify(alt, null, 1) + "\n");
    // Threads용 짧은 글 (500자 제한)
    fs.writeFileSync(path.join(dst, "threads.txt"), [`🇰🇷 ${strip(p.headline)}`, "", ...p.slides[1].items.slice(0, 2).map((x) => `▪️ ${strip(x)}`), "", `💬 ${p.question}`].join("\n").slice(0, 490) + "\n");

    // 릴스: 영상·표지 복사 + 짧은 캡션 (자세한 내용은 캐러셀로 보내기)
    let reel = "";
    if (fs.existsSync(path.join(pngDir, "reel.mp4"))) {
      fs.copyFileSync(path.join(pngDir, "reel.mp4"), path.join(dst, "reel.mp4"));
      fs.copyFileSync(path.join(pngDir, "reel_cover.jpg"), path.join(dst, "reel_cover.jpg"));
      const reelCap = [
        `🇰🇷 ${strip(p.headline)}`,
        "",
        `💬 ${p.question}`,
        "",
        `📌 ${t.word}: ${p.word.ko} (${p.word.rom}) = ${p.word.mean}`,
        `${t.src}: ${p.source} · ${p.credit}`,
        "",
        tags(lang, p.id),
      ].join("\n");
      fs.writeFileSync(path.join(dst, "reel_caption.txt"), reelCap + "\n");
      reel = ", 릴스 있음";
    }
    console.log(`${lang}/${p.id}: ${pngs.length}장, 캡션 ${caption.length}자${reel}`);
  }
  const story = path.join(__dirname, "out", lang, "story_digest.png");
  if (fs.existsSync(story))
    execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "92", story, "--out", path.join(__dirname, "posts", lang, "story_digest.jpg")], { stdio: "ignore" });
}
