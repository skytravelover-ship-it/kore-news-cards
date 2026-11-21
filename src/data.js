// 2026-11-21 한국 뉴스 (ES만). 출처: 연합뉴스
//  - 261121-iaexamen: 11/20 10:00 'AI가 세무사시험 풀었더니 만점…실제 고득점자도 33배 증가' (AKR20261120050300017)
//    2026.4.25 제63회 세무사 1차. 국회 과방위 의원실 실험: 클로드 오푸스 4.7(4.16 출시, 시험 9일 전)이 회계학개론 40문항 전부 정답=100점. 문제지 이미지만 제시, 산업인력공단 정답으로 채점.
//    작년 모델 소네트4.5 62.5 / 하이쿠4.5 25 / 오푸스4.5 75, 2026.2 오푸스4.6·소네트4.6 100. 실제 시험 회계학개론 90점 이상: 2024년 1명→2025년 2명→2026년 66명(33배), 만점 1명. 세법학개론 90점 이상은 만점자 1명뿐.
//    AI 성능과 고득점 증가의 연관성·부정행위는 확인 안 됨. 세법은 법령 원문 확인 허용 시 40/40. 2027 LEET: 페이블5 언어이해 30/30, 추리논증 39/40. 시험 후 출시 9개 모델 모두 90점 이상, 6개 만점. 페이블5.2 회계·세법 100, LEET 70문항 전부 정답, 40문항 약 1분30초.
//    의원: 고득점자 전수조사, 수능 관리·감독 방안을 모든 국가자격시험으로 확대 요구.
//  - 261121-silla: 11/20 11:58 '1천600년 전 신라 지배층 무덤 확인…최소 2명 이상 순장' (AKR20261120084300005)
//    국립경주문화유산연구소, 경주 인왕동 732-3 덧널무덤(4세기). 대릉원 일원(유네스코 경주역사유적지구) 인접, 황남대총·천마총(5~6세기)보다 앞선 시기.
//    으뜸 덧널 묘광 6.8m×3.8m, 딸린 덧널 5.0m×3.3m. 금동제 초미금구, 화살촉, 마노 다면옥·굽은옥. 철제 갑옷: 투구 추정 2, 갑옷 3, 목 가리개 2, 허리 가리개 2. 판갑+찰갑 온전한 형태 동시 출토는 경주 최초. 대상철기 온전 출토 최초.
//    10대 추정 순장자 치아·아래턱뼈(으뜸 덧널 서편), 딸린 덧널에도 순장 흔적 → 최소 2명. 훼기 흔적. 11/23 14:00 현장 설명회.
// 사진: Wikimedia Commons(Kok Leng Yeo, 경주 대릉원, CC BY 2.0) / Unsplash(Jakub Żerdzicki 계산기) → imagen ilustrativa.
// TR: @korede.bugun 은 11/10부터 인스타 API 게시 제한 상태(11/10 워크플로 로그 "User access is restricted", code 25, is_transient false; 11/20 insights 수집은 정상) → 오늘도 TR 게시물 없음.
// 인사이트(11/21): 표본이 충분한 제안은 'CONSUMO 비중 확대'와 '릴스 우선'(유지) 뿐. 오늘 뉴스 중 소비자 주제가 없어 기획안 우선순위대로 선정, 변경 없음.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "21 KASIM 2026",
    srcLabel: "Kaynak",
    swipe: "KAYDIR",
    wordLabel: "GÜNÜN KORECESİ",
    ctaA: "Kore'den her gün haberler için takip et",
    digestTitle: "Bugün Kore'den bir haber",
    digestTap: "Dokun, oku",
    posts: [],
  },

  es: {
    brand: "HOY EN COREA",
    handle: "hoy.encorea",
    date: "21 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "Las noticias de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261121-iaexamen",
        cat: "TECNOLOGÍA",
        photo: "aiexam.jpg",
        pos: "center 55%",
        source: "Agencia Yonhap",
        credit: "Foto: Jakub Żerdzicki / Unsplash · imagen ilustrativa",
        headline: "Una IA saca <em>100</em> en el examen de asesor fiscal y las notas altas pasan de 2 a <em>66</em>",
        sub: "Una prueba hecha después del examen muestra lo que ya resuelve la inteligencia artificial. Nadie ha confirmado trampas, pero las cifras abrieron el debate.",
        short: "IA y examen fiscal",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "El <b>25</b> de abril Corea celebró el examen nacional de asesor fiscal. Meses después, la oficina de una diputada hizo que un modelo de IA resolviera la parte de contabilidad solo con la foto del cuestionario: <b>40</b> aciertos de <b>40</b>.",
              "El modelo había salido <b>9</b> días antes del examen. Versiones del año anterior sacaban entre <b>25</b> y <b>75</b> puntos sobre 100. Las de febrero de este año ya llegaban al <b>100</b>.",
              "En el examen real, los aspirantes con <b>90</b> puntos o más en contabilidad pasaron de <b>2</b> en 2025 a <b>66</b> este año, <b>33</b> veces más. En la otra asignatura, derecho fiscal, solo uno superó esa nota.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Nadie ha demostrado que alguien usara IA. No se detectaron trampas y la relación entre los dos datos no está probada. Aun así, la diputada pide revisar una a una las notas altas de este año.",
              "Los modelos siguen mejorando. Uno lanzado este mes resolvió las <b>40</b> preguntas en minuto y medio y acertó todo también en derecho fiscal y en el examen de acceso a derecho. Corea estudia extender los controles del Suneung a todos los exámenes oficiales.",
              "Si preparas un examen oficial o de certificación, revisa las reglas sobre dispositivos de tu convocatoria. Cada vez más países los prohíben por completo y la lista de aparatos vetados cambia de un año a otro.",
            ],
          },
        ],
        reelWhy: "Si preparas un examen oficial o de certificación, revisa las reglas sobre dispositivos de tu convocatoria. Cada vez más países los prohíben por completo y la lista de aparatos vetados cambia de un año a otro.",
        word: { ko: "만점", rom: "manjeom", mean: "puntuación perfecta", exKo: "AI가 회계 시험에서 만점을 받았어요.", exTr: "La IA sacó la puntuación perfecta en el examen de contabilidad." },
        question: "¿Deberían cambiar de formato los exámenes ahora que la IA los resuelve?",
      },
      {
        id: "261121-silla",
        cat: "HISTORIA",
        photo: "silla.jpg",
        pos: "center 45%",
        source: "Agencia Yonhap",
        credit: "Foto: Kok Leng Yeo / Wikimedia Commons, CC BY 2.0 · imagen ilustrativa",
        headline: "Gyeongju: la tumba de un noble de hace <em>1.600</em> años con al menos <em>2</em> sacrificados",
        sub: "Armaduras de hierro, cuentas de ágata y los dientes de un adolescente: una ventana al reino de Silla antes de sus grandes túmulos.",
        short: "La tumba de Silla",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "Arqueólogos del Instituto Nacional de Patrimonio Cultural de Gyeongju excavaron una tumba del siglo IV junto al parque de túmulos de Daereungwon, Patrimonio Mundial de la UNESCO, en el sureste de Corea.",
              "Es una cámara de madera con una fosa principal de <b>6,8</b> por <b>3,8</b> metros. Dentro había <b>2</b> cascos, <b>3</b> corazas, protectores de cuello y cintura, puntas de flecha y adornos de espada en bronce dorado.",
              "En un lado aparecieron los dientes y la mandíbula de un adolescente. Por la disposición de los restos, el equipo cree que al menos <b>2</b> personas fueron enterradas junto al dueño de la tumba.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Silla fue uno de los tres reinos de la antigua Corea y unificó la península en el siglo VII. Esta tumba es anterior a los grandes túmulos de Gyeongju y muestra cómo enterraban a su élite antes de esa época.",
              "El entierro con acompañantes, llamado sunjang, se prohibió en Silla en el año <b>502</b>. Culturas de América, como la moche en Perú, tenían prácticas parecidas. Hallar juntas armaduras de placas y de láminas es una primicia en Gyeongju.",
              "Si viajas a Corea, Gyeongju está a unas <b>2</b> horas de Seúl en tren KTX. Daereungwon abre todos los días y en el túmulo Cheonmachong puedes entrar y ver cómo era una tumba por dentro.",
            ],
          },
        ],
        reelWhy: "Si viajas a Corea, Gyeongju está a unas <b>2</b> horas de Seúl en tren KTX. Daereungwon abre todos los días y en el túmulo Cheonmachong puedes entrar y ver cómo era una tumba por dentro.",
        word: { ko: "순장", rom: "sunjang", mean: "entierro con acompañantes", exKo: "신라는 502년에 순장을 금지했어요.", exTr: "Silla prohibió el sunjang en el año 502." },
        question: "¿Qué tumba o sitio antiguo de tu país te ha impresionado más?",
      },
    ],
  },
};
