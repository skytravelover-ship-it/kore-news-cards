// 2026-11-14 한국 뉴스. 출처: 연합뉴스 2026-11-13 국토부 "구글, 고정밀지도 보안조건 이행" + 같은 날 해설 '구글 지도 한국서 달라진다' (영문 AEN20261113004251320)
//  - TR·ES 공통: 11/13 국토부 협의체, 구글 1:5,000 지도 국외반출 보안조건 이행 확인. 2025-02 신청, 2026-02-27 조건부 허가, 11/4 최종 보고서.
//  - 조건: 좌표 표시 제한, 보안시설 가림 영상으로 교체, 국내 서버 가공. 협력사 티맵. 서비스 강화는 '이르면 내년 초' 전망(확정 아님).
//  - 10월 MAU(모바일인덱스): 네이버지도 3,121만 / 티맵 1,511만 / 카카오맵 1,383만 / 구글 1,051만.
// 사진: Unsplash (Mika Baumeister) 휴대폰 지도 사진, 현장 사진 아님 → temsili görsel / imagen ilustrativa.
// 인사이트 반영(11/14): TR 릴스 24h 도달 평균 105 vs 캐러셀 0 (각 5개) → TR도 릴스를 첫 슬롯(12:00), 캐러셀은 17:00. ES는 어제처럼 릴스 20:00 / 캐러셀 02:00.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "14 KASIM 2026",
    srcLabel: "Kaynak",
    swipe: "KAYDIR",
    wordLabel: "GÜNÜN KORECESİ",
    ctaA: "Kore'den her gün haberler için takip et",
    digestTitle: "Bugün Kore'den bir haber",
    digestTap: "Dokun, oku",
    posts: [
      {
        id: "261114-googlemap",
        cat: "TEKNOLOJİ",
        photo: "googlemap.jpg",
        pos: "center 45%",
        source: "Yonhap Haber Ajansı",
        credit: "Fotoğraf: Mika Baumeister / Unsplash · temsili görsel",
        headline: "Google Haritalar'a Kore'de <em>yeşil ışık</em>: hassas harita kapısı açıldı",
        sub: "Kore hükümeti, Google'ın güvenlik şartlarını yerine getirdiğini açıkladı. Yeni hizmetler en erken gelecek yılın başında bekleniyor.",
        short: "Google Haritalar Kore'de",
        slides: [
          {
            label: "NE OLDU?",
            items: [
              "Kore Ulaştırma Bakanlığı <b>13 Kasım</b>'da açıkladı: Google, <b>1:5.000</b> ölçekli hassas Kore haritasını yurt dışında kullanma şartlarını yerine getirdi.",
              "Şartlar: koordinatlar gösterilmeyecek, askeri ve güvenlik tesisleri uydu görüntülerinde gizlenecek, veri Kore'deki sunucularda işlenecek.",
              "Google <b>2025</b> Şubat'ında başvurmuştu. Hükümet <b>27 Şubat 2026</b>'da şartlı izin verdi. Google'ın Kore'deki ortağı yerel navigasyon şirketi TMAP.",
            ],
          },
          {
            label: "NEDEN ÖNEMLİ?",
            items: [
              "Kore, güvenlik gerekçesiyle hassas harita verisinin yurt dışına çıkmasını yıllardır sınırlıyordu. Bu yüzden Google Haritalar Kore'de diğer ülkelerdeki kadar iyi çalışmıyordu.",
              "Kore'de lider Naver Map: Ekim'de aylık <b>31,2 milyon</b> kullanıcı. Google Haritalar <b>10,5 milyon</b> ile dördüncü. Turizm sektörü, yabancı turistlerin işinin kolaylaşmasını bekliyor.",
              "Seul'e gidersen: Şimdilik Naver Map'i indir, İngilizce menüsü var. Google Haritalar toplu taşımada işe yarıyor ama araç ve yürüyüş tarifi sınırlı.",
            ],
          },
        ],
        word: { ko: "지도", rom: "jido", mean: "harita", exKo: "지도 앱을 켜 보세요.", exTr: "Harita uygulamasını aç." },
        question: "Kore'ye gitsen hangi harita uygulamasını kullanırdın?",
      },
    ],
  },

  es: {
    brand: "HOY EN COREA",
    handle: "hoy.encorea",
    date: "14 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "La noticia de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261114-googlemap",
        cat: "TECNOLOGÍA",
        photo: "googlemap.jpg",
        pos: "center 45%",
        source: "Agencia Yonhap",
        credit: "Foto: Mika Baumeister / Unsplash · imagen ilustrativa",
        headline: "Google Maps recibe <em>luz verde</em> en Corea para usar mapas de alta precisión",
        sub: "El gobierno coreano confirmó que Google cumplió las condiciones de seguridad. Las mejoras llegarían a principios del próximo año.",
        short: "Google Maps en Corea",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "El Ministerio de Transporte de Corea anunció el <b>13 de noviembre</b> que Google cumplió las condiciones para usar fuera del país el mapa coreano de alta precisión, a escala <b>1:5.000</b>.",
              "Las condiciones: no mostrar coordenadas, ocultar instalaciones militares y de seguridad en las imágenes satelitales y procesar los datos en servidores dentro de Corea.",
              "Google lo pidió en febrero de <b>2025</b>. El gobierno dio un permiso condicional el <b>27 de febrero de 2026</b>. Su socio local es la empresa de navegación TMAP.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Por razones de seguridad, Corea limitó durante años la salida de sus datos de mapas precisos. Por eso Google Maps no funcionaba en Corea tan bien como en otros países.",
              "En Corea manda Naver Map: <b>31,2 millones</b> de usuarios al mes en octubre. Google Maps es cuarto con <b>10,5 millones</b>. El sector turístico espera que viajar sea más fácil para los extranjeros.",
              "Si vas a Seúl: por ahora descarga Naver Map, tiene menú en inglés. Google Maps sirve para el transporte público, pero las rutas en auto y a pie son limitadas.",
            ],
          },
        ],
        word: { ko: "지도", rom: "jido", mean: "mapa", exKo: "지도 앱을 켜 보세요.", exTr: "Abre la app de mapas." },
        question: "Si viajaras a Corea, ¿qué app de mapas usarías?",
      },
    ],
  },
};
