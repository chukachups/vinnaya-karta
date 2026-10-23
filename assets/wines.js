// Данные винной карты. Статусы: ok — отлично, mid — обычно, bad — не зашло, ord — заказано, next — в планах.
// Цены и наличие сняты с simplewine.ru 23.10.2026.
window.WINES = [
 {
  "id": "t01",
  "status": "ok",
  "name": "Pfefferer Sun",
  "producer": "Colterenzio",
  "region": "Италия, Трентино-Альто Адидже",
  "sugar": "сухое",
  "grape": "шардоне, пино бьянко, совиньон блан",
  "note": "Супер аромат, супер вино",
  "url": "https://simplewine.ru/catalog/product/pfefferer_sun_2025_075_161229/",
  "img": {
   "bottle": "img/t01-bottle.webp",
   "label": "img/t01-label.webp",
   "glass": "img/t01-glass.webp"
  },
  "tint": "#e9dfc2",
  "deep": "#725b1c"
 },
 {
  "id": "t02",
  "status": "ok",
  "name": "Sollui",
  "producer": "La Scolca",
  "region": "Италия, Пьемонт",
  "sugar": "сухое",
  "grape": "совиньон блан",
  "note": "Супер аромат, отличное вино",
  "url": "https://simplewine.ru/catalog/product/sollui_2025_075_160945/",
  "img": {
   "bottle": "img/t02-bottle.webp",
   "label": "img/t02-label.webp",
   "glass": "img/t02-glass.webp"
  },
  "tint": "#e6ddc5",
  "deep": "#685726"
 },
 {
  "id": "t03",
  "status": "ok",
  "name": "Рислинг",
  "producer": "Сикоры",
  "region": "Россия, Кубань",
  "sugar": "сухое",
  "grape": "рислинг 100%",
  "note": "Кисленькое, Насте нравится",
  "url": "https://simplewine.ru/catalog/product/risling_2024_075_159699/",
  "img": {
   "bottle": "img/t03-bottle.webp",
   "label": "img/t03-label.webp",
   "glass": "img/t03-glass.webp"
  },
  "tint": "#e9ddc2",
  "deep": "#72571c"
 },
 {
  "id": "t04",
  "status": "ok",
  "name": "Sauvignon Blanc",
  "producer": "Viña Arboleda",
  "region": "Чили, Аконкагуа",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Супер аромат, отличное вино",
  "url": "https://simplewine.ru/catalog/product/sauvignon_blanc_2025_075_160434/",
  "img": {
   "bottle": "img/t04-bottle.webp",
   "label": "img/t04-label.webp",
   "glass": "img/t04-glass.webp"
  },
  "tint": "#e9e3c2",
  "deep": "#72651c"
 },
 {
  "id": "t05",
  "status": "ok",
  "name": "Loco Cimbali Orange",
  "producer": "Loco Cimbali",
  "region": "Россия, Крым",
  "sugar": "сухое оранжевое",
  "grape": "мускат, рислинг",
  "note": "Супер аромат, надо подышать",
  "url": "https://simplewine.ru/catalog/product/loco_cimbali_orange_2023_075_155938/",
  "img": {
   "bottle": "img/t05-bottle.webp",
   "label": "img/t05-label.webp",
   "glass": "img/t05-glass.webp"
  },
  "tint": "#e4d7c7",
  "deep": "#644b2a"
 },
 {
  "id": "t06",
  "status": "ok",
  "name": "Besini Qvevri White",
  "producer": "Besini",
  "region": "Грузия, Кахетия",
  "sugar": "сухое оранжевое",
  "grape": "ркацители",
  "note": "Необычное, поэтому в отличном",
  "url": "https://simplewine.ru/catalog/product/besini_qvevri_white_2025_075_162259/",
  "img": {
   "bottle": "img/t06-bottle.webp",
   "label": "img/t06-label.webp",
   "glass": "img/t06-glass.webp"
  },
  "tint": "#e7ddc3",
  "deep": "#6b5623"
 },
 {
  "id": "t07",
  "status": "ok",
  "name": "Петрикор Мальвазия",
  "producer": "Шумринка",
  "region": "Россия, Кубань",
  "sugar": "сухое",
  "grape": "мальвазия 100%",
  "note": "Супер аромат, понравилось папе, фрукты",
  "url": "https://simplewine.ru/catalog/product/petrikor_malvaziya_2025_075_163689/",
  "img": {
   "bottle": "img/t07-bottle.webp",
   "label": "img/t07-label.webp",
   "glass": "img/t07-glass.webp"
  },
  "tint": "#e9dfc2",
  "deep": "#725c1c"
 },
 {
  "id": "t08",
  "status": "ok",
  "name": "Gewürztraminer 2025",
  "producer": "Cantina Terlan",
  "region": "Италия, Трентино-Альто Адидже",
  "sugar": "сухое",
  "grape": "гевюрцтраминер 100%",
  "note": "Супер аромат, надо выпить, и раскрывается ароматика",
  "url": "https://simplewine.ru/catalog/product/gewurtztraminer_2025_075_160738/",
  "img": {
   "bottle": "img/t08-bottle.webp",
   "label": "img/t08-label.webp",
   "glass": "img/t08-glass.webp"
  },
  "tint": "#e9dcc2",
  "deep": "#6f541f"
 },
 {
  "id": "t09",
  "status": "ok",
  "name": "Coastal Vineyards Garuma Sauvignon Blanc 2024",
  "producer": "Leyda",
  "region": "Чили, Аконкагуа",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Необычное, поэтому в отличном: появляется нотка смородинового листа после глотка",
  "url": "https://simplewine.ru/catalog/product/coastal_vineyards_garuma_sauvignon_blanc_2024_075_156283/",
  "img": {
   "bottle": "img/t09-bottle.webp",
   "label": "img/t09-label.webp"
  },
  "tint": "#c2d7e9",
  "deep": "#1c4a72"
 },
 {
  "id": "t10",
  "status": "ok",
  "name": "Loco Cimbali Viognier",
  "producer": "Loco Cimbali",
  "region": "Россия, Крым",
  "sugar": "сухое",
  "grape": "вионье",
  "note": "Отличное, аромат не очень выраженный, но он есть, и во вкусе раскрывается",
  "url": "https://simplewine.ru/catalog/product/loco_cimbali_viognier_2024_075_157820/",
  "img": {
   "bottle": "img/t10-bottle.webp",
   "label": "img/t10-label.webp",
   "glass": "img/t10-glass.webp"
  },
  "tint": "#e4cfc7",
  "deep": "#643b2a"
 },
 {
  "id": "t11",
  "status": "ok",
  "name": "Lugana San Benedetto",
  "producer": "Zenato",
  "region": "Италия, Венето",
  "sugar": "полусухое",
  "grape": "треббьяно ди лугана 100%",
  "note": "Супер аромат, много вкуса",
  "url": "https://simplewine.ru/catalog/product/lugana_san_benedetto_2025_075_160426/",
  "img": {
   "bottle": "img/t11-bottle.webp",
   "label": "img/t11-label.webp",
   "glass": "img/t11-glass.webp"
  },
  "tint": "#e9e1c2",
  "deep": "#6f5f1e"
 },
 {
  "id": "t12",
  "status": "mid",
  "name": "Ballet Blanc",
  "producer": "Галицкий и Галицкий",
  "region": "Россия, Кубань",
  "sugar": "сухое",
  "grape": "шардоне, совиньон блан, рислинг",
  "note": "Кисленькое, похоже на Рислинг от Сикоры",
  "url": "https://simplewine.ru/catalog/product/ballet_blanc_krasnaya_gorka_2025_075_163110/",
  "img": {
   "bottle": "img/t12-bottle.webp",
   "label": "img/t12-label.webp",
   "glass": "img/t12-glass.webp"
  },
  "tint": "#e9d9c2",
  "deep": "#724f1c"
 },
 {
  "id": "t13",
  "status": "mid",
  "name": "Pure Sauvignon Blanc",
  "producer": "Trapiche",
  "region": "Аргентина, Мендоса",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Обычное",
  "url": "https://simplewine.ru/catalog/product/pure_sauvignon_blanc_2024_075_158654/",
  "img": {
   "bottle": "img/t13-bottle.webp",
   "label": "img/t13-label.webp",
   "glass": "img/t13-glass.webp"
  },
  "tint": "#e9dec2",
  "deep": "#70591e"
 },
 {
  "id": "t14",
  "status": "mid",
  "name": "Совиньон Блан Семейный Резерв",
  "producer": "Сикоры",
  "region": "Россия, Кубань",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Обычное",
  "url": "https://simplewine.ru/catalog/product/sovinon_blan_2025_075_163461/",
  "img": {
   "bottle": "img/t14-bottle.webp",
   "label": "img/t14-label.webp",
   "glass": "img/t14-glass.webp"
  },
  "tint": "#e9dcc2",
  "deep": "#71561d"
 },
 {
  "id": "t15",
  "status": "mid",
  "name": "Le Grand Noir Sauvignon Blanc",
  "producer": "Le Grand Noir",
  "region": "Франция, Лангедок-Руссильон",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Запах слабее, чем у Пфефферера, но он есть: слабенький личи",
  "url": "https://simplewine.ru/catalog/product/le_grand_noir_sauvignon_blanc_2025_075_161565/",
  "img": {
   "bottle": "img/t15-bottle.webp",
   "label": "img/t15-label.webp",
   "glass": "img/t15-glass.webp"
  },
  "tint": "#e1dcca",
  "deep": "#5e542f"
 },
 {
  "id": "t16",
  "status": "mid",
  "name": "Khikhvi Qvevri",
  "producer": "Giuaani",
  "region": "Грузия, Кахетия",
  "sugar": "сухое оранжевое",
  "grape": "хихви 100%",
  "note": "Крепкое, кисленькое, ароматное",
  "url": "https://simplewine.ru/catalog/product/giuaani_khikhvi_qvevri_2020_075_139817/",
  "img": {
   "bottle": "img/t16-bottle.webp",
   "label": "img/t16-label.webp",
   "glass": "img/t16-glass.webp"
  },
  "tint": "#e8d5c3",
  "deep": "#6c4722"
 },
 {
  "id": "t17",
  "status": "mid",
  "name": "Chenin Blanc",
  "producer": "Simonsig",
  "region": "ЮАР, Стелленбош",
  "sugar": "сухое",
  "grape": "шенен блан",
  "note": "Пфефферер на минималках",
  "url": "https://simplewine.ru/catalog/product/chenin_blanc_2026_075_161593/",
  "img": {
   "bottle": "img/t17-bottle.webp",
   "label": "img/t17-label.webp",
   "glass": "img/t17-glass.webp"
  },
  "tint": "#e0e9c2",
  "deep": "#5e721c"
 },
 {
  "id": "t18",
  "status": "mid",
  "name": "Le Grand Noir Winemaker's Selection Chardonnay",
  "producer": "Le Grand Noir",
  "region": "Франция, Лангедок-Руссильон",
  "sugar": "сухое",
  "grape": "шардоне 85%, вионье 15%",
  "note": "Хорошее, но не вау. Действительно где-то там есть ананасик",
  "url": "https://simplewine.ru/catalog/product/le_grand_noir_winemaker_s_selection_chardonnay_2025_075_160627/",
  "img": {
   "bottle": "img/t18-bottle.webp",
   "label": "img/t18-label.webp",
   "glass": "img/t18-glass.webp"
  },
  "tint": "#e9dbc2",
  "deep": "#70531e"
 },
 {
  "id": "t19",
  "status": "mid",
  "name": "Anthilia 2025",
  "producer": "Donnafugata",
  "region": "Италия, Сицилия",
  "sugar": "сухое",
  "grape": "катарратто",
  "note": "Хорошее, цветочное",
  "url": "https://simplewine.ru/catalog/product/anthilia_2025_075_160278/",
  "img": {
   "bottle": "img/t19-bottle.webp",
   "label": "img/t19-label.webp",
   "glass": "img/t19-glass.webp"
  },
  "tint": "#e9d8c2",
  "deep": "#724c1c"
 },
 {
  "id": "t20",
  "status": "mid",
  "name": "Maia Pinot Grigio 2025",
  "producer": "Cielo",
  "region": "Италия, Фриули-Венеция-Джулия",
  "sugar": "сухое",
  "grape": "пино гриджио 100%",
  "note": "Хорошее",
  "url": "https://simplewine.ru/catalog/product/maia_pinot_grigio_2025_075_159434/",
  "img": {
   "bottle": "img/t20-bottle.webp",
   "label": "img/t20-label.webp",
   "glass": "img/t20-glass.webp"
  },
  "tint": "#e9dcc2",
  "deep": "#72561c"
 },
 {
  "id": "t21",
  "status": "mid",
  "name": "Loco Cimbali Riesling 2025",
  "producer": "Loco Cimbali",
  "region": "Россия, Крым",
  "sugar": "сухое",
  "grape": "рислинг рейнский 100%",
  "note": "Кисленькое, похоже на Рислинг от Сикоры",
  "url": "https://simplewine.ru/catalog/product/loco_cimbali_riesling_2024_075_161377/",
  "img": {
   "bottle": "img/t21-bottle.webp",
   "label": "img/t21-label.webp",
   "glass": "img/t21-glass.webp"
  },
  "tint": "#e7d7c4",
  "deep": "#694a24"
 },
 {
  "id": "t22",
  "status": "mid",
  "name": "Sante Rive Soave 2025",
  "producer": "Cielo",
  "region": "Италия, Венето",
  "sugar": "сухое",
  "grape": "треббьяно, гарганега",
  "note": "Хорошее, ароматное, но не то, что мне нравится. Просто хорошее вино",
  "url": "https://simplewine.ru/catalog/product/sante_rive_soave_2025_075_159957/",
  "img": {
   "bottle": "img/t22-bottle.webp",
   "label": "img/t22-label.webp"
  },
  "tint": "#e6d4c5",
  "deep": "#684426"
 },
 {
  "id": "t23",
  "status": "mid",
  "name": "Grüner Veltliner Klassik",
  "producer": "Nastl",
  "region": "Австрия, Нижняя Австрия",
  "sugar": "полусухое",
  "grape": "грюнер вельтлинер 100%",
  "note": "Объёмное, слегка газированное",
  "url": "https://simplewine.ru/catalog/product/gruner_veltliner_klassik_2025_075_162227/",
  "img": {
   "bottle": "img/t23-bottle.webp",
   "label": "img/t23-label.webp",
   "glass": "img/t23-glass.webp"
  },
  "tint": "#e9d8c2",
  "deep": "#724d1c"
 },
 {
  "id": "t24",
  "status": "bad",
  "name": "Orange Gold",
  "producer": "Gérard Bertrand",
  "region": "Франция, Лангедок-Руссильон",
  "sugar": "сухое оранжевое",
  "grape": "мускат, мозак, шардоне, вионье, гренаш блан",
  "note": "Очень крепкое, тяжёлое, ароматика слабая и непонятная, как виски",
  "url": "https://simplewine.ru/catalog/product/orange_gold_2023_075_157019/",
  "img": {
   "bottle": "img/t24-bottle.webp",
   "label": "img/t24-label.webp",
   "glass": "img/t24-glass.webp"
  },
  "tint": "#e9dec2",
  "deep": "#725a1c"
 },
 {
  "id": "t25",
  "status": "bad",
  "name": "Южная Вертикаль Шардоне",
  "producer": "Chateau de Talu",
  "region": "Россия, Кубань",
  "sugar": "сухое",
  "grape": "шардоне, мускат",
  "note": "Не очень, вообще не поняли",
  "url": "https://simplewine.ru/catalog/product/yuzhnaya_vertikal_shardone_muskat_2023_075_158513/",
  "img": {
   "bottle": "img/t25-bottle.webp",
   "label": "img/t25-label.webp",
   "glass": "img/t25-glass.webp"
  },
  "tint": "#e8dfc3",
  "deep": "#6c5a22"
 },
 {
  "id": "t26",
  "status": "bad",
  "name": "Mare & Grill Vinho Verde 2025",
  "producer": "Quintas das Arcas",
  "region": "Португалия, Минью",
  "sugar": "полусухое",
  "grape": "трейшадура, лоурейро, аринту",
  "note": "Не вино, как будто газированный напиток с алкоголем",
  "url": "https://simplewine.ru/catalog/product/mare_grill_vinho_verde_2025_075_160216/",
  "img": {
   "bottle": "img/t26-bottle.webp",
   "label": "img/t26-label.webp",
   "glass": "img/t26-glass.webp"
  },
  "tint": "#c2e7e9",
  "deep": "#1c6d72"
 },
 {
  "id": "t27",
  "status": "bad",
  "name": "Ich Bin Riesling 2024",
  "producer": "Origin Wine Stellenbosch",
  "region": "ЮАР, Стелленбош",
  "sugar": "сухое",
  "grape": "рислинг",
  "note": "Норм, но после него заболела голова",
  "url": "https://simplewine.ru/catalog/product/ich_bin_riesling_2024_075_155911/",
  "img": {
   "bottle": "img/t27-bottle.webp",
   "label": "img/t27-label.webp",
   "glass": "img/t27-glass.webp"
  },
  "tint": "#e9cec2",
  "deep": "#72371c"
 },
 {
  "id": "r160429",
  "status": "ord",
  "name": "Paddle Creek Sauvignon Blanc 2025",
  "producer": "Lake Road",
  "region": "Новая Зеландия, Мальборо",
  "sugar": "сухое",
  "grape": "совиньон блан",
  "note": "Очень экспрессивный совиньон: зелёное яблоко, маракуйя, грейпфрут. 1686 оценок, средняя 4,8.",
  "price": 1603,
  "aroma": 4,
  "tag": null,
  "style": "sb",
  "url": "https://simplewine.ru/catalog/product/paddle_creek_sauvignon_blanc_2025_075_160429/",
  "img": {
   "bottle": "img/r160429-bottle.webp",
   "label": "img/r160429-label.webp",
   "glass": "img/r160429-glass.webp"
  },
  "tint": "#cadce0",
  "deep": "#31535d"
 },
 {
  "id": "r159552",
  "status": "ord",
  "name": "Pfefferer 2025",
  "producer": "Colterenzio",
  "region": "Италия, Альто-Адидже",
  "sugar": "сухое",
  "grape": "гольдмускатель, мюллер-тургау, гевюрцтраминер",
  "note": "Старший брат Pfefferer Sun от того же производителя: цитрус, мускат, белые цветы. 1370 оценок, средняя 4,8.",
  "price": 1943,
  "aroma": 5,
  "tag": null,
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/pfefferer_2025_075_159552/",
  "img": {
   "bottle": "img/r159552-bottle.webp",
   "label": "img/r159552-label.webp",
   "glass": "img/r159552-glass.webp"
  },
  "tint": "#dce1ca",
  "deep": "#555d30"
 },
 {
  "id": "r157333",
  "status": "ord",
  "name": "Torrontés La Linda 2025",
  "producer": "Luigi Bosca",
  "region": "Аргентина, Мендоса",
  "sugar": "сухое",
  "grape": "торронтес",
  "note": "Жасмин, роза, лаванда, грейпфрут. Сорт где-то между гевюрцтраминером и мускатом.",
  "price": 1990,
  "aroma": 4,
  "tag": null,
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/torrontes_la_linda_2025_075_157333/",
  "img": {
   "bottle": "img/r157333-bottle.webp",
   "label": "img/r157333-label.webp",
   "glass": "img/r157333-glass.webp"
  },
  "tint": "#e9dcc2",
  "deep": "#72561c"
 },
 {
  "id": "r161486",
  "status": "ord",
  "name": "Kokur 2025",
  "producer": "Loco Cimbali",
  "region": "Россия, Крым",
  "sugar": "сухое",
  "grape": "кокур",
  "note": "Медовая груша, горное разнотравье. Любимый производитель, новый для вас сорт.",
  "price": 2090,
  "aroma": 4,
  "tag": null,
  "style": "ru",
  "url": "https://simplewine.ru/catalog/product/loco_cimbali_kokur_2025_075_161486/",
  "img": {
   "bottle": "img/r161486-bottle.webp",
   "label": "img/r161486-label.webp"
  },
  "tint": "#e3dbc7",
  "deep": "#63522b"
 },
 {
  "id": "r161399",
  "status": "next",
  "name": "Вионье 2025",
  "producer": "Усадьба Мезыбь",
  "region": "Россия, Геленджик",
  "sugar": "сухое",
  "grape": "вионье",
  "note": "Персик, дыня, тропические фрукты. Интересно сравнить с Loco Cimbali Viognier.",
  "price": 2390,
  "aroma": 3,
  "tag": null,
  "style": "ru",
  "url": "https://simplewine.ru/catalog/product/usadba_mezyb_vione_2025_075_161399/",
  "img": {
   "bottle": "img/r161399-bottle.webp",
   "label": "img/r161399-label.webp",
   "glass": "img/r161399-glass.webp"
  },
  "tint": "#e9dbc2",
  "deep": "#71541d"
 },
 {
  "id": "r159978",
  "status": "next",
  "name": "Reserva Sauvignon Blanc 2025",
  "producer": "Leyda",
  "region": "Чили, долина Лейда",
  "sugar": "сухое",
  "grape": "совиньон блан",
  "note": "Младшая линейка Garuma: легче и кислее, грейпфрут, лайм, трава.",
  "price": 2640,
  "aroma": 4,
  "tag": null,
  "style": "sb",
  "url": "https://simplewine.ru/catalog/product/reserva_sauvignon_blanc_2025_075_159978/",
  "img": {
   "bottle": "img/r159978-bottle.webp",
   "label": "img/r159978-label.webp"
  },
  "tint": "#e9e1c2",
  "deep": "#705f1e"
 },
 {
  "id": "r160497",
  "status": "next",
  "name": "Gewürztraminer 2025",
  "producer": "Colterenzio",
  "region": "Италия, Альто-Адидже",
  "sugar": "полусухое",
  "grape": "гевюрцтраминер",
  "note": "Гевюрцтраминер от производителя Pfefferer Sun, дешевле Terlan.",
  "price": 2919,
  "aroma": 5,
  "tag": null,
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/gewurztraminer_2025_075_160497/",
  "img": {
   "bottle": "img/r160497-bottle.webp",
   "label": "img/r160497-label.webp",
   "glass": "img/r160497-glass.webp"
  },
  "tint": "#e9ddc2",
  "deep": "#72591c"
 },
 {
  "id": "r160681",
  "status": "next",
  "name": "Sobaja Sauvignon 2025",
  "producer": "Pradio",
  "region": "Италия, Фриули",
  "sugar": "сухое",
  "grape": "совиньон блан",
  "note": "Томатный лист, персик, грейпфрут. Ближе всего к ноте смородинового листа из Garuma.",
  "price": 2990,
  "aroma": 4,
  "tag": "Если понравился Garuma",
  "style": "sb",
  "url": "https://simplewine.ru/catalog/product/sobaja_sauvignon_2025_075_160681/",
  "img": {
   "bottle": "img/r160681-bottle.webp",
   "label": "img/r160681-label.webp",
   "glass": "img/r160681-glass.webp"
  },
  "tint": "#e9d5c2",
  "deep": "#72471c"
 },
 {
  "id": "r161232",
  "status": "next",
  "name": "Müller-Thurgau 2025",
  "producer": "Colterenzio",
  "region": "Италия, Доломиты",
  "sugar": "сухое",
  "grape": "мюллер-тургау",
  "note": "Цветы, персик, мускатные тона. Лёгкое, в духе Pfefferer.",
  "price": 3490,
  "aroma": 4,
  "tag": "Первым делом",
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/muller_thurgau_2025_075_161232/",
  "img": {
   "bottle": "img/r161232-bottle.webp",
   "label": "img/r161232-label.webp"
  },
  "tint": "#e9d9c2",
  "deep": "#724f1c"
 },
 {
  "id": "r161484",
  "status": "next",
  "name": "Muskateller 2025",
  "producer": "Nastl",
  "region": "Австрия, Нижняя Австрия",
  "sugar": "сухое",
  "grape": "мускат",
  "note": "Сухой мускат. Грюнер этого производителя был «обычно», но этот сорт гораздо ароматнее.",
  "price": 3990,
  "aroma": 5,
  "tag": "Первым делом",
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/muskateller_2025_075_161484/",
  "img": {
   "bottle": "img/r161484-bottle.webp",
   "label": "img/r161484-label.webp",
   "glass": "img/r161484-glass.webp"
  },
  "tint": "#e9ddc2",
  "deep": "#72581c"
 },
 {
  "id": "r161836",
  "status": "next",
  "name": "Шишка. Оранж 2024",
  "producer": "Мезыбь",
  "region": "Россия, Геленджик",
  "sugar": "сухое оранжевое",
  "grape": "выдержка в бочке",
  "note": "Имбирь, бергамот, апельсиновая цедра. Был в бочке, поэтому выбор рискованный.",
  "price": 4690,
  "aroma": 3,
  "tag": "Рискованно",
  "style": "ru",
  "url": "https://simplewine.ru/catalog/product/shishka_oranzh_2024_075_161836/",
  "img": {
   "bottle": "img/r161836-bottle.webp",
   "label": "img/r161836-label.webp",
   "glass": "img/r161836-glass.webp"
  },
  "tint": "#e9d5c2",
  "deep": "#72461c"
 },
 {
  "id": "r159607",
  "status": "next",
  "name": "Gewürztraminer 2022",
  "producer": "Trimbach",
  "region": "Франция, Эльзас",
  "sugar": "полусухое",
  "grape": "гевюрцтраминер",
  "note": "Эльзасская классика, James Suckling 92. Слаще ваших фаворитов.",
  "price": 4868,
  "aroma": 0,
  "tag": null,
  "style": "arom",
  "url": "https://simplewine.ru/catalog/product/gewurztraminer_2022_075_159607/",
  "img": {
   "bottle": "img/r159607-bottle.webp",
   "label": "img/r159607-label.webp",
   "glass": "img/r159607-glass.webp"
  },
  "tint": "#e9e0c2",
  "deep": "#725e1c"
 },
 {
  "id": "r160740",
  "status": "ord",
  "name": "Sauvignon Blanc Winkl 2025",
  "producer": "Cantina Terlan",
  "region": "Италия, Альто-Адидже",
  "sugar": "сухое",
  "grape": "совиньон блан 100%",
  "note": "Производитель вашего гевюрцтраминера. Абрикос, мандарин, маракуйя, частично в бочке. Vivino 4.2.",
  "price": 4869,
  "aroma": 5,
  "tag": null,
  "style": "sb",
  "url": "https://simplewine.ru/catalog/product/sauvignon_blanc_winkl_2025_075_160740/",
  "img": {
   "bottle": "img/r160740-bottle.webp",
   "label": "img/r160740-label.webp",
   "glass": "img/r160740-glass.webp"
  },
  "tint": "#e9d9c2",
  "deep": "#6f4f1e"
 }
];
