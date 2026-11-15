// 2026-11-15 한국 뉴스 (ES만). 출처: 연합뉴스
//  - 261115-tanuki: 11/15 07:17 '인천 송도 학교·공원·골프장서 온몸에 털빠진 너구리 발견' (AKR20261113042800065)
//    연수구 너구리 구조·포획 민원 1~11월(11/12 기준) 89건(개선충 38건) vs 2025년 49건(+82%). 인천 야생동물구조관리센터 구조 78마리 vs 47마리(+66%), 대부분 개선충.
//    10/30 송도 한 고교 교내 출현 → 야외활동 자제 안내. 원인(센터): 녹지·수로, 길고양이 급식소, 천적 없음 / 추위로 면역 저하, 햇볕 찾아 나와 눈에 띔. 사람 감염 시 가려움 정도, 며칠 내 회복 많음.
//    한국 '너구리' = 라쿤도그(Nyctereutes procyonoides), 북미 라쿤 아님 → perro mapache.
//  - 261115-careergap: 11/15 '성적 비슷해도 부모 학력·경제력 따라 희망 직업 달라진다' (AKR20261113118800530), 한국교육개발원(KEDI) 보고서, PISA 2018·2022 한국 학생.
//    상·하위 25% 기대 직업지위 격차 10.95(2018)/10.67(2022). 성적 비슷해도, 남녀 모두. PISA 2018 5,507명: 대입정보 검색 63.1% vs 40.8%, 교외 상담사 43.1 vs 27.4, 대학 방문 43.8 vs 29.4, 교내 상담 70.5 vs 58.8.
//    진로상담사 배치 여부는 차이 거의 없음. 진로교육 경험 반영 시 격차 약 7% 감소.
// 사진: Wikimedia Commons CC BY 2.5(너구리, 일본 촬영)·CC BY 4.0(학생), 모두 현장 사진 아님 → imagen ilustrativa.
// TR: @korede.bugun 이 11/10부터 인스타 API에서 "User access is restricted"(code 25 / 2207050)로 게시 실패 → 오늘 TR 게시물 없음.
// 인사이트 반영(11/15): ES·TR 저장률 0% → '¿POR QUÉ IMPORTA?' 마지막 항목을 '직접 해 볼 방법'으로 쓰고, 릴스 why 장면도 그 항목(reelWhy)으로 바꿈.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "15 KASIM 2026",
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
    date: "15 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "Las noticias de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261115-tanuki",
        cat: "NATURALEZA",
        photo: "tanuki.jpg",
        pos: "center 45%",
        source: "Agencia Yonhap",
        credit: "Foto: 663highland / Wikimedia (CC BY 2.5) · imagen ilustrativa",
        headline: "Perros mapache con sarna en Songdo: los avisos suben un <em>82%</em>",
        sub: "Vecinos de esta ciudad nueva de Incheon los ven sin pelo en escuelas, parques y un campo de golf.",
        short: "Perros mapache en Songdo",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "Entre enero y el <b>12 de noviembre</b>, el distrito de Yeonsu (Incheon), donde está Songdo, recibió <b>89</b> pedidos para rescatar o capturar perros mapache, <b>38</b> por sarna. En todo 2025 fueron <b>49</b>.",
              "El centro de rescate de fauna de Incheon salvó <b>78</b> en toda la ciudad este año, frente a <b>47</b> en 2025. Casi todos tenían sarna, causada por un ácaro que vive bajo la piel.",
              "Los vecinos los ven en un campo de golf, parques junto al agua y escuelas. El <b>30 de octubre</b>, una secundaria pidió a sus alumnos evitar actividades al aire libre tras ver uno en el patio.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "El neoguri coreano no es el mapache americano: es el perro mapache, un cánido de Asia oriental. Según el centro, Songdo le ofrece mucho verde, canales, comederos para gatos callejeros y ningún depredador.",
              "Con el frío bajan sus defensas y se contagian más. También salen a buscar sol, por eso se ven más. La sarna puede pasar a personas y mascotas, pero en humanos suele dar solo picazón y se cura en pocos días.",
              "Si ves uno: no lo toques ni le des comida, lleva a tu perro con correa y avisa al servicio local de fauna silvestre. Un animal sin pelo y lento no es manso: está enfermo.",
            ],
          },
        ],
        reelWhy: "Si ves uno: no lo toques ni le des comida, lleva a tu perro con correa y avisa al servicio local de fauna silvestre. Un animal sin pelo y lento no es manso: está enfermo.",
        word: { ko: "너구리", rom: "neoguri", mean: "perro mapache", exKo: "공원에서 너구리를 봤어요.", exTr: "Vi un perro mapache en el parque." },
        question: "¿Qué animales silvestres ves en tu ciudad?",
      },
      {
        id: "261115-careergap",
        cat: "EDUCACIÓN",
        photo: "careergap.jpg",
        pos: "center 50%",
        source: "Agencia Yonhap",
        credit: "Foto: 고려 / Wikimedia (CC BY 4.0) · imagen ilustrativa",
        headline: "Mismas notas, otro futuro: la familia pesa en el <em>trabajo soñado</em>",
        sub: "Un estudio coreano con datos de PISA encontró la brecha incluso entre alumnos con notas parecidas.",
        short: "Familia y trabajo soñado",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "El Instituto Coreano de Desarrollo Educativo (KEDI) comparó, con datos de PISA <b>2018</b> y <b>2022</b>, el nivel de estudios, el trabajo y los recursos de los padres con la profesión que desean los alumnos coreanos de 15 años.",
              "Los hijos del <b>25%</b> de familias con más recursos apuntan más a ciencia, ingeniería o salud. Los del 25% con menos eligen más empleos no profesionales o aún no deciden. Pasa incluso con notas parecidas.",
              "La brecha también está en la orientación: buscó en internet información sobre la universidad el <b>63,1%</b> del grupo alto y el <b>40,8%</b> del bajo. Habló con un orientador fuera de la escuela el <b>43,1%</b> frente al <b>27,4%</b>.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Tener orientador en la escuela casi no depende del origen familiar. La diferencia está en quién lo usa de verdad. Por eso los autores piden que cada alumno llegue a la información y la consejería, no solo ampliar la oferta.",
              "Al sumar la experiencia de orientación al análisis, la brecha bajó cerca de un <b>7%</b>. Visitar una universidad: <b>43,8%</b> en el grupo alto, <b>29,4%</b> en el bajo.",
              "Para probar en casa: busquen juntos el plan de estudios de 2 o 3 carreras, visiten una universidad en un día abierto y pidan una cita con el orientador. Son justo las actividades donde está la brecha.",
            ],
          },
        ],
        reelWhy: "Para probar en casa: busquen juntos el plan de estudios de 2 o 3 carreras, visiten una universidad en un día abierto y pidan una cita con el orientador. Son justo las actividades donde está la brecha.",
        word: { ko: "진로", rom: "jillo", mean: "camino profesional", exKo: "진로 상담을 받아 보세요.", exTr: "Pide orientación vocacional." },
        question: "¿Quién te ayudó a elegir tu carrera: tu familia, la escuela o nadie?",
      },
    ],
  },
};
