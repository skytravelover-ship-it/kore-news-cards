// 2026-11-08 한국 뉴스. 출처: 연합뉴스 (2026-11-08 송고)
//  - TR: 부산불꽃축제 암표·자릿세 8명 적발 (AKR20261108026700051)
//  - ES: 삼성 라이온즈 12년 만에 한국시리즈 우승 (AKR20261108039651007)
// 사진: Unsplash 라이선스(무료·상업 사용 가능). 언론사 사진은 쓰지 않는다.
// TR은 터키 12:00 슬롯이 이미 지나 11/09에 올라가므로 date를 게시일로 둔다.
window.NEWS = {
  tr: {
    brand: "KORE'DE BUGÜN",
    handle: "korede.bugun",
    date: "9 KASIM 2026",
    srcLabel: "Kaynak",
    swipe: "KAYDIR",
    wordLabel: "GÜNÜN KORECESİ",
    ctaA: "Kore'den her gün haberler için takip et",
    digestTitle: "Bugün Kore'den bir haber",
    digestTap: "Dokun, oku",
    posts: [
      {
        id: "261108-fireworks",
        cat: "TOPLUM",
        photo: "fireworks.jpg",
        pos: "center 30%",
        source: "Yonhap",
        credit: "Fotoğraf: Sung Jin Cho / Unsplash · temsili görsel",
        headline: "Havai fişek gösterisinde kumsalda yer için <em>130.000 won</em> istediler",
        sub: "Busan'da 1,2 milyon kişinin geldiği festivalde polis, karaborsa bilet ve \"yer parası\" isteyen 8 kişiyi yakaladı.",
        short: "Kumsalda yer parası",
        slides: [
          {
            label: "NE OLDU?",
            items: [
              "21. Busan Havai Fişek Festivali 7 Kasım'da Gwangalli Plajı'nda yapıldı. Kalabalık <b>1,2 milyon</b> kişiydi. Bir saatte yaklaşık <b>80.000</b> fişek atıldı.",
              "Polis o gün <b>8 kişiyi</b> yakaladı. 30'lu yaşlarda bir erkek, toplam fiyatı <b>200.000 won</b> olan iki koltuk biletini <b>300.000 won</b>'a satmaya çalıştı.",
              "Bazıları kumsala erkenden hasır serdi ve yeri ikinci el uygulamasında sattı. İstenen fiyat <b>100.000–130.000 won</b>. Aynı şeyi yapan bir ortaokul öğrencisi uyarılıp bırakıldı.",
            ],
          },
          {
            label: "NEDEN ÖNEMLİ?",
            items: [
              "Plaj herkesin. Gösteriyi kumsaldan izlemek ücretsiz; bilet sadece resmi koltuk bölümleri için satılıyor. Kamusal alanı kapatıp parayla satmak bu yüzden yasa dışı.",
              "Yakalananlara Hafif Suçlar Kanunu'na göre <b>80.000–160.000 won</b> para cezası verildi. Polis, büyük konser ve festivallerde denetimin süreceğini söyledi.",
              "Kore'de bir etkinliğe gideceksen: Bileti sadece <b>resmi satış sitesinden</b> al. İkinci el uygulamada \"yer satıyorum\" ilanı görürsen ödeme yapma. Ücretsiz izlemek için plaja <b>birkaç saat önce</b> git.",
            ],
          },
        ],
        word: { ko: "암표", rom: "ampyo", mean: "karaborsa bilet", exKo: "암표는 사지 마세요.", exTr: "Karaborsa bilet almayın." },
        question: "Türkiye'de maç ya da konser biletini karaborsadan aldığın oldu mu? Ne kadar fazla ödedin?",
      },
    ],
  },

  es: {
    brand: "HOY EN COREA",
    handle: "hoy.encorea",
    date: "8 NOV 2026",
    srcLabel: "Fuente",
    swipe: "DESLIZA",
    wordLabel: "PALABRA DEL DÍA",
    ctaA: "Síguenos para noticias de Corea cada día",
    digestTitle: "La noticia de Corea hoy",
    digestTap: "Toca para leer",
    posts: [
      {
        id: "261108-kbofinal",
        cat: "DEPORTES",
        photo: "kbofinal.jpg",
        pos: "center 60%",
        source: "Yonhap",
        credit: "Foto: Seungyun Oh / Unsplash · imagen ilustrativa",
        headline: "Samsung Lions gana la Serie de Corea de béisbol tras <em>12 años</em>",
        sub: "Perdió el primer juego y ganó los cuatro siguientes. Daegu celebra su primer título desde 2014.",
        short: "Samsung, campeón",
        slides: [
          {
            label: "¿QUÉ PASÓ?",
            items: [
              "El 8 de noviembre, Samsung Lions venció <b>12-1</b> a kt wiz en el quinto juego de la Serie de Corea, al mejor de siete, en su estadio de Daegu.",
              "Perdió el primer juego y luego ganó <b>4 seguidos</b>. Es su primer título desde <b>2014</b> y el <b>noveno</b> de su historia.",
              "Koo Ja-wook fue elegido MVP de la serie, con un promedio de bateo de <b>.500</b>.",
            ],
          },
          {
            label: "¿POR QUÉ IMPORTA?",
            items: [
              "Samsung terminó <b>segundo</b> en la temporada regular. En la KBO, el primer lugar pasa directo a la final. Desde <b>2018</b> ningún equipo que no fue primero había ganado el título.",
              "La KBO tiene <b>10 equipos</b> y una temporada regular de <b>144 juegos</b>. Cada jugador tiene su propia canción, y la afición la canta en las gradas.",
              "Para verlo en vivo: la temporada regular suele empezar a finales de <b>marzo</b>. Cada equipo vende boletos en su sitio oficial. Daegu está a unas <b>2 horas</b> de Seúl en tren rápido.",
            ],
          },
        ],
        word: { ko: "우승", rom: "useung", mean: "campeonato, título", exKo: "삼성이 12년 만에 우승했다.", exTr: "Samsung ganó el título tras 12 años." },
        question: "¿Cuál es tu equipo de béisbol? ¿Sigues alguna liga de Asia?",
      },
    ],
  },
};
