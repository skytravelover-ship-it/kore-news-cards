// 2026-11-19 한국 뉴스 (ES만). 출처: 연합뉴스
//  - 261119-alarma: 11/19 '[수능] 전국에 10.5초간 울린 경보음…부정행위 방지 첫 위급재난문자' (AKR20261119024300530)
//    + 11/19 '[수능] 전국민 위급재난문자 경보음에 시민들 화들짝' (AKR20261119043200004)
//    + 11/19 06:00 '수능일 주식시장 1시간 늦게 개장…정규장 오전 10시~오후 4시30분' (AKR20261118119300008)
//    08:30 전국 위급재난문자 일제 발송, 최대 볼륨(최소 40dB 이상) 10.5초 경보음. 수능 부정행위 방지 목적 위급재난문자는 사상 처음.
//    위급재난문자는 수신 거부 불가 → 미제출 휴대전화 적발. 당초 1회 계획 → 불시 추가 발송 결정(전원 껐다 켜는 경우 대비). 추가 문자 문구: "놀라지 마시고 일상생활 유지".
//    시민 반응 엇갈림: "이미 다 알아서 의미 있나, 사회가 이렇게까지" vs "소리 나는데 부정행위 할 사람 있겠나". 지하철 안내방송 사전 반복.
//    증시: 유가증권·코스닥·코넥스 정규장 10:00~16:30(1시간씩 순연), 애프터마켓 17:00~20:00. 지원자 551,864명(11/18 기록). 정치인 이름은 쓰지 않음.
//  - 261119-mochi: 11/18 '[소셜+] K-디저트 겹겹이 찹쌀떡 원조 공방…표절 판가름 쟁점은?' (AKR20261118150200505)
//    얇은 찹쌀떡+초콜릿 가나슈 교대로 쌓음, 직사각형 블록, 초콜릿 코팅 후 코코아 분말, 손으로 쪼개 단면 보며 먹음. 원조 격 업체 '올기'.
//    11/13자 내용증명: 부정경쟁방지법 위반 주장, 판매·광고 중단, 게시물 삭제, 14일 이내 판매 기간·수량 회신 요구. 10/31 특허 출원·우선심사.
//    업주들: 판매 중단·형태 변경, "저희는 정사각형", "손발이 떨렸다". 누리꾼 엇갈림. 일본 도쿄 카페가 올해 2월 '모치 초콜릿' 소개(일본 원조설).
//    변호사(화우 강승욱): 쟁점은 레시피가 아니라 '모양'. 완성품 모양이 다르면 책임 면할 수 있음. 출시 전부터 널리 알려진 형태면 고유성 주장 어려움.
// 사진: Unsplash(Huy Q. Tran 지하철 승객 / jesni rawther 초콜릿 코팅 겹겹 디저트) → imagen ilustrativa.
// TR: @korede.bugun 은 11/10부터 인스타 API 게시 제한 상태(11/18 기록과 동일, ping 워크플로 실행은 권한 거부로 확인 못 함) → 오늘 TR 게시물 없음.
// 인사이트(11/19): ES 릴스 도달이 캐러셀의 10.4배 → 두 게시물 모두 릴스를 먼저, 캐러셀은 다음 슬롯에 배치(어제와 동일, 유지). 다른 변경 없음.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "19 KASIM 2026",
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
    date: "19 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "Las noticias de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261119-alarma",
        cat: "SOCIEDAD",
        photo: "alert.jpg",
        pos: "center 45%",
        source: "Agencia Yonhap",
        credit: "Foto: Huy Q. Tran / Unsplash · imagen ilustrativa",
        headline: "<em>10,5</em> segundos: la alarma que sonó en todos los celulares de Corea",
        sub: "A las 8:30 del jueves, el gobierno envió la primera alerta de emergencia de la historia pensada para frenar las trampas en el Suneung.",
        short: "La alarma del Suneung",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "A las <b>8:30</b> de la mañana, todos los celulares encendidos del país sonaron a máximo volumen, al menos <b>40</b> decibelios, durante <b>10,5</b> segundos. El mensaje: el examen de acceso a la universidad está por empezar.",
              "Es una alerta de emergencia, el tipo que nadie puede desactivar. Así, cualquier celular escondido en un aula suena y delata a quien no lo entregó. Nunca se había usado para un examen.",
              "El gobierno planeó una segunda alerta sin avisar la hora, por si alguien apagó el celular a las 8:30 y lo encendió después. En el metro de Seúl sonaron avisos para que nadie se asustara.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Corea entera se ajusta a este examen. La bolsa retrasó una hora su horario: abrió a las <b>10:00</b> y cerró a las <b>16:30</b>, para no cruzarse con la entrada de los <b>551.864</b> inscritos.",
              "Las opiniones se dividen. Unos dicen que una alarma anunciada no atrapa a nadie y que es llegar muy lejos por un examen. Otros creen que nadie se arriesga con un celular que puede sonar.",
              "Si vives en Corea, revisa los ajustes de alertas de tu celular: las de nivel máximo no se pueden apagar, pero las de nivel más bajo sí se pueden silenciar. Compara con las alertas de tu país.",
            ],
          },
        ],
        reelWhy: "Si vives en Corea, revisa los ajustes de alertas de tu celular: las de nivel máximo no se pueden apagar, pero las de nivel más bajo sí se pueden silenciar. Compara con las alertas de tu país.",
        word: { ko: "재난문자", rom: "jaenan munja", mean: "alerta de emergencia que llega como mensaje al celular", exKo: "오늘 아침 재난문자 소리에 깜짝 놀랐어요.", exTr: "Esta mañana me asustó el sonido de la alerta de emergencia." },
        question: "¿Aceptarías que todo el país reciba una alarma por un examen?",
      },
      {
        id: "261119-mochi",
        cat: "CONSUMO",
        photo: "mochi.jpg",
        pos: "center 40%",
        source: "Agencia Yonhap",
        credit: "Foto: jesni rawther / Unsplash · imagen ilustrativa",
        headline: "El postre viral de Corea acaba en los abogados: <em>14</em> días para parar",
        sub: "Una marca dice ser la creadora del mochi en capas con chocolate y exige a otras tiendas que paren.",
        short: "El mochi en capas",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "El dulce: capas finas de mochi, el pastel de arroz glutinoso, alternadas con ganache de chocolate, en bloque rectangular, bañado en chocolate y cubierto de cacao. Se parte con la mano y se mira el corte.",
              "La marca Olgi, que se presenta como la original, envió cartas notariales a tiendas con productos parecidos. Pide dejar de vender, borrar las publicaciones y responder en <b>14</b> días. Solicitó una patente el <b>31 de octubre</b>.",
              "Varias tiendas pequeñas ya pararon o cambiaron la forma. Una dueña explicó que su versión es cuadrada, no rectangular. Otra contó que la carta la dejó temblando.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Es el ciclo típico de los postres virales en Corea: una tienda lo inventa, en semanas se vende en todo el país y llegan las copias. Pasó con el chocolate de Dubái, el croffle y el tanghulu.",
              "Según un abogado consultado por Yonhap, la clave no es la receta sino la forma: si el producto final se ve distinto, no hay infracción. Y una cafetería de Tokio mostró un dulce parecido en <b>febrero</b>.",
              "Haz la prueba en casa: extiende mochi muy fino, alterna capas con ganache de chocolate, enfría, corta en bloques y espolvorea cacao. Si piensas venderlo, cambia la forma.",
            ],
          },
        ],
        reelWhy: "Haz la prueba en casa: extiende mochi muy fino, alterna capas con ganache de chocolate, enfría, corta en bloques y espolvorea cacao. Si piensas venderlo, cambia la forma.",
        word: { ko: "원조", rom: "wonjo", mean: "el original, el que lo hizo primero", exKo: "이 가게가 겹겹이 찹쌀떡의 원조예요.", exTr: "Esta tienda es la original del mochi en capas." },
        question: "¿Se puede ser dueño de la forma de un postre?",
      },
    ],
  },
};
