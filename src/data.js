// 2026-11-22 한국 뉴스 (TR·ES 공통 2건). 출처: 연합뉴스
//  - 261122-bungeoppang: 11/22 06:00 '[소셜＋] "여전히 4개에 1천원?"…SNS 타고 입소문 난 초저가 붕어빵집' (AKR20261119119600505)
//    종로 견지동 노점: 팥 4개 1천원, 슈크림 3개 1천원. 요즘 1개 1천원인 곳 많음. SNS 영상 보고 일산·의정부에서도 옴. 예전엔 1개 200원 시절.
//    회기동 상인(63, 7년째): 올해 1월 1천원당 5개→4개. 20kg LPG 7년 전 3만→6만원. 하루 이윤 10만→7~8만원. "비싸면 안 사간다".
//    청량리 상인(62, 23년째): 3년 전 5개→4개. 손님 70% 어르신. 이은희 교수: 연 매출 5천만원 미만 영세 상인 재료비·연료비 지원 검토 제안.
//  - 261122-ramyeon: 11/22 06:10 '중·미 넘어 유럽·중남미까지…K-라면 연간 수출 20억달러 육박' (AKR20261121023200030)
//    aT: 1~10월 라면 수출 15억8천510만달러(+26.3%). 작년 연간 15억2천만달러(역대 최대)를 10개월 만에 추월, 연간 20억달러 근접 전망. 2023년 9억5천200만달러. 2014년 이후 12년 연속 증가.
//    중국 3억9천550만(+23.9%), 미국 2억7천652만(+29.1%), 네덜란드 9천572만(+41.3%, 3위), 영국 6천39만(+41.9%), 독일 3천360만(+17.4%), 멕시코 5천194만(+190.4%).
//    농심 부산 녹산 수출공장 10월 말 가동, 국내 수출 공급력 연 7억→12억개. 삼양 중국 자싱 공장 내년 1월 가동, 베트남 2천186억원 투자. 삼양 1~3분기 해외매출 1조8천170억원(+36.6%), 농심 1조1천109억원(+14.7%). 오뚜기 구미 2029년까지 2천억원.
// 사진: Wikimedia Commons(Chae Ji-young, 시장 2.jpg, CC BY 4.0) / Unsplash(Zoshua Colah, 라면 진열대) → 둘 다 temsili görsel / imagen ilustrativa.
// TR: 11/10부터 인스타 API 게시 제한(code 25)으로 11/11~11/21 게시물 없음. 12일이 지나 오늘은 TR도 만들어 queue에 넣고, 실패하면 워크플로 로그로 확인.
// ES: 11/17부터 캐러셀 media_publish가 403(code 4, subcode 2207051 "행동이 차단되었습니다")을 돌려주지만 실제로는 게시됨(insights의 '?' 게시물 6건이 실패 시각과 일치). uploader가 이 경우를 게시됨으로 기록하도록 보완.
// 인사이트(11/22): 표본 충분한 제안 중 'CONSUMO 비중 확대'를 반영 → 오늘 2건 모두 소비자 주제(붕어빵 가격, 라면 수출). 릴스 우선 배치(ES)는 유지.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "22 KASIM 2026",
    srcLabel: "Kaynak",
    swipe: "KAYDIR",
    wordLabel: "GÜNÜN KORECESİ",
    ctaA: "Kore'den her gün haberler için takip et",
    digestTitle: "Bugün Kore'den haberler",
    digestTap: "Dokun, oku",
    posts: [
      {
        id: "261122-bungeoppang",
        cat: "TÜKETİCİ",
        photo: "bungeoppang.jpg",
        pos: "center 60%",
        source: "Yonhap Haber Ajansı",
        credit: "Foto: Chae Ji-young / Wikimedia Commons, CC BY 4.0 · temsili görsel",
        headline: "<em>1.000</em> wona <em>4</em> bungeoppang: Seul'ün en ucuz tezgâhları sosyal medyada",
        sub: "Kışın sokak tatlısı bungeoppang'ın fiyatı çoğu yerde tanesi 1.000 won. Hâlâ dörtlü satanlar var ve videoları izleyenler başka şehirlerden geliyor.",
        short: "Ucuz bungeoppang",
        slides: [
          {
            label: "NE OLDU?",
            items: [
              "Seul Jongno'daki bir tezgâhta <b>4</b> kırmızı fasulyeli bungeoppang <b>1.000</b> won, yani 1 dolardan az. Şehrin çoğu yerinde tanesi 1.000 won. 'En ucuz tezgâh' videoları yayılınca önünde kuyruk oluştu.",
              "Dongdaemun'daki bir satıcı <b>7</b> yıldır aynı köşede. Ocakta 1.000 wona verdiği sayıyı <b>5</b>'ten <b>4</b>'e indirdi: 20 kiloluk gaz tüpü 7 yılda 30.000 wondan 60.000 wona çıktı.",
              "Günlük kazancı 100.000 wondan 70-80.000 wona düştü ama fiyatı artırmıyor: 'Pahalı olursa kimse almaz.' 23 yıllık başka bir satıcı, müşterilerinin yüzde <b>70</b>'inin yaşlı olduğunu söylüyor.",
            ],
          },
          {
            label: "NEDEN ÖNEMLİ?",
            items: [
              "Bungeoppang 'sazan ekmeği' demek: balık kalıbında pişen, içi tatlı kırmızı fasulye ya da krema dolu bir kış tatlısı. Yüksek enflasyon döneminde ucuz kalan tezgâhlar gençler için keşif içeriğine dönüştü.",
              "Korecede yakınında tezgâh olan mahalleyi anlatan bir argo bile var: 'bungsegwon'. Uzmanlar, yıllık cirosu 50 milyon wonun altındaki küçük satıcılara malzeme ve yakıt desteği öneriyor.",
              "Kore'ye gidersen kasım-şubat arasında metro çıkışlarındaki tezgâhlara bak. Yanında bozuk para olsun. Kırmızı fasulye için 'pat', krema için 'syukeurim' de.",
            ],
          },
        ],
        reelWhy: "Kore'ye gidersen kasım-şubat arasında metro çıkışlarındaki tezgâhlara bak. Yanında bozuk para olsun. Kırmızı fasulye için 'pat', krema için 'syukeurim' de.",
        word: { ko: "붕어빵", rom: "bungeoppang", mean: "balık şeklinde çörek; mecazen 'birbirinin kopyası'", exKo: "아빠랑 아들이 붕어빵이에요.", exTr: "Baba ile oğul birbirinin kopyası." },
        question: "Senin şehrinde kışın en ucuz sokak lezzeti ne, kaça satılıyor?",
      },
      {
        id: "261122-ramyeon",
        cat: "TÜKETİCİ",
        photo: "ramyeonshelf.jpg",
        pos: "center 50%",
        source: "Yonhap Haber Ajansı",
        credit: "Foto: Zoshua Colah / Unsplash · temsili görsel",
        headline: "Kore ramyeon ihracatı 10 ayda <em>1,59</em> milyar dolar: Avrupa'da yüzde <em>40</em>'ı aşan artış",
        sub: "Ocak-ekim satışları 2025'in tamamını geride bıraktı. Yıl sonunda 2 milyar dolara yaklaşması bekleniyor; fabrikalar peş peşe açılıyor.",
        short: "Ramyeon ihracatı",
        slides: [
          {
            label: "NE OLDU?",
            items: [
              "Kore'nin ramyeon ihracatı ocak-ekim arasında <b>1,59</b> milyar dolara ulaştı; geçen yılın aynı dönemine göre yüzde <b>26,3</b> artış. 10 ayda 2025'in tamamı (1,52 milyar dolar) geride kaldı.",
              "En büyük pazar Çin (<b>396</b> milyon dolar), ikinci ABD (<b>277</b> milyon). Avrupa hızlı büyüyor: Hollanda yüzde 41,3 artışla üçüncü sırada, İngiltere yüzde 41,9, Almanya yüzde 17,4 arttı.",
              "Üreticiler kapasite kuruyor. Nongshim Busan'daki ihracat fabrikasını ekimde çalıştırdı; yıllık kapasite <b>700</b> milyondan <b>1,2</b> milyar pakete çıkıyor. Samyang ocakta Çin'de üretime başlıyor.",
            ],
          },
          {
            label: "NEDEN ÖNEMLİ?",
            items: [
              "2023'te ihracat 952 milyon dolardı; bu yıl 2 milyara yaklaşıyor, yani 3 yılda iki kat. Artış 2014'ten beri <b>12</b> yıldır kesintisiz: K-pop ve dizilerle başlayan merak mutfağa indi.",
              "Buldak'ın sahibi Samyang, yurt dışında fabrikası olmadan 9 ayda <b>1,8</b> trilyon won yurt dışı satış yaptı (yüzde 36,6 artış). Vietnam'a 218,6 milyar wonluk fabrika da planlıyor.",
              "Denemek istersen Asya marketlerinde Shin, Buldak ya da Jin paketlerine bak. Korelilerin tarifi: 550 ml su, 4,5 dakika kaynatma ve sonunda bir yumurta.",
            ],
          },
        ],
        reelWhy: "Denemek istersen Asya marketlerinde Shin, Buldak ya da Jin paketlerine bak. Korelilerin tarifi: 550 ml su, 4,5 dakika kaynatma ve sonunda bir yumurta.",
        word: { ko: "수출", rom: "suchul", mean: "ihracat", exKo: "한국 라면 수출이 12년 연속 늘었어요.", exTr: "Kore ramyeon ihracatı 12 yıldır üst üste arttı." },
        question: "Kore ramyeonu denedin mi? Hangisi favorin?",
      },
    ],
  },

  es: {
    brand: "HOY EN COREA",
    handle: "hoy.encorea",
    date: "22 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "Las noticias de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261122-bungeoppang",
        cat: "CONSUMO",
        photo: "bungeoppang.jpg",
        pos: "center 60%",
        source: "Agencia Yonhap",
        credit: "Foto: Chae Ji-young / Wikimedia Commons, CC BY 4.0 · imagen ilustrativa",
        headline: "<em>4</em> bungeoppang por <em>1.000</em> wones: los puestos más baratos de Seúl, virales en redes",
        sub: "El dulce callejero del invierno coreano ya cuesta 1.000 wones la pieza en muchas esquinas. Los puestos que aún dan cuatro atraen a clientes de otras ciudades.",
        short: "Bungeoppang a 1.000",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "En un puesto del centro de Seúl, <b>4</b> bungeoppang de judía roja cuestan <b>1.000</b> wones, menos de un dólar. En gran parte de la ciudad uno solo ya vale eso. Los videos de 'el puesto más barato' llenan las redes y las filas.",
              "Un vendedor con <b>7</b> años en la misma esquina bajó en enero de <b>5</b> a <b>4</b> piezas por 1.000 wones: el tanque de gas de 20 kilos pasó de 30.000 a 60.000 wones en siete años.",
              "Su ganancia diaria cayó de 100.000 a entre 70.000 y 80.000 wones, pero no sube el precio: 'Si es caro, nadie compra'. Otro vendedor, con 23 años en el oficio, dice que el <b>70</b> % de sus clientes son mayores.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Bungeoppang significa 'pan de carpa': una masa cocida en molde con forma de pez, rellena de judía roja dulce o crema. Con la inflación alta, los puestos baratos se volvieron contenido viral entre los jóvenes.",
              "Hay hasta una palabra para vivir cerca de un puesto: bungsegwon. Expertos piden al Gobierno ayudar con ingredientes y gas a los vendedores que facturan menos de 50 millones de wones al año.",
              "Si viajas a Corea entre noviembre y febrero, busca los puestos junto a las salidas del metro. Lleva monedas y billetes pequeños. Pide 'pat' si quieres judía roja o 'syukeurim' si prefieres crema.",
            ],
          },
        ],
        reelWhy: "Si viajas a Corea entre noviembre y febrero, busca los puestos junto a las salidas del metro. Lleva monedas y billetes pequeños. Pide 'pat' si quieres judía roja o 'syukeurim' si prefieres crema.",
        word: { ko: "붕어빵", rom: "bungeoppang", mean: "pastel con forma de pez; también 'dos gotas de agua'", exKo: "아빠랑 아들이 붕어빵이에요.", exTr: "Padre e hijo son como dos gotas de agua." },
        question: "¿Cuál es el antojo callejero de invierno más barato en tu ciudad?",
      },
      {
        id: "261122-ramyeon",
        cat: "CONSUMO",
        photo: "ramyeonshelf.jpg",
        pos: "center 50%",
        source: "Agencia Yonhap",
        credit: "Foto: Zoshua Colah / Unsplash · imagen ilustrativa",
        headline: "El ramyeon coreano exporta <em>1.585</em> millones de dólares en 10 meses y México crece un <em>190</em> %",
        sub: "Las ventas de enero a octubre ya superan todo 2025. El año cerrará cerca de los 2.000 millones y las fábricas se multiplican.",
        short: "Exportación de ramyeon",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "Corea exportó ramyeon por <b>1.585</b> millones de dólares entre enero y octubre, un <b>26,3</b> % más que un año antes. En 10 meses ya superó todo 2025, que fue récord con 1.520 millones.",
              "China es el mayor mercado (<b>396</b> millones) y Estados Unidos el segundo (<b>277</b>). México es el que más crece: <b>51,9</b> millones de dólares, un <b>190,4</b> % más. Países Bajos ya es el tercer destino.",
              "Las fábricas se amplían. Nongshim abrió en octubre una planta solo para exportar en Busan: de <b>700</b> a <b>1.200</b> millones de paquetes al año. Samyang arranca en enero su primera fábrica fuera de Corea, en China.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "En 2023 la exportación fue de 952 millones; este año roza los 2.000, el doble en tres años. Lleva <b>12</b> años seguidos subiendo desde 2014: lo que empezó con el K-pop y las series llegó a la cocina.",
              "Samyang, dueña de Buldak, vendió fuera de Corea <b>1,8</b> billones de wones en nueve meses (un 36,6 % más) sin tener aún fábricas en el extranjero. Ottogi invertirá 200.000 millones de wones en una planta hasta 2029.",
              "Si quieres probarlo, busca Shin, Buldak o Jin en tiendas asiáticas o grandes supermercados. La receta coreana: 550 ml de agua, 4 minutos y medio de hervor y un huevo al final.",
            ],
          },
        ],
        reelWhy: "Si quieres probarlo, busca Shin, Buldak o Jin en tiendas asiáticas o grandes supermercados. La receta coreana: 550 ml de agua, 4 minutos y medio de hervor y un huevo al final.",
        word: { ko: "수출", rom: "suchul", mean: "exportación", exKo: "한국 라면 수출이 12년 연속 늘었어요.", exTr: "Las exportaciones de ramyeon coreano llevan 12 años seguidos creciendo." },
        question: "¿Cuál es tu ramyeon coreano favorito y dónde lo compras?",
      },
    ],
  },
};
