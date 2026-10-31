// 태극 문양 로고 (카드·릴스·프로필 공통). 한국을 한눈에 알아보게 하는 표시.
window.TAEGEUK = (size, ring = "#fff") => `<svg width="${size}" height="${size}" viewBox="-120 -120 240 240">
  <circle r="118" fill="${ring}"/>
  <g transform="rotate(-33.7)">
    <circle r="92" fill="#0047a0"/>
    <path d="M-92 0 A92 92 0 0 1 92 0 A46 46 0 0 1 0 0 A46 46 0 0 0 -92 0Z" fill="#cd2e3a"/>
  </g></svg>`;
