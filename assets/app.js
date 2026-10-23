(function () {
  'use strict';
  var W = window.WINES || [];
  var TRIED = ['ok', 'mid', 'bad'];
  var STAMP = {
    ok: ['★', 'Отлично'], mid: ['◐', 'Обычно'], bad: ['✕', 'Не зашло'],
    ord: ['✓', 'Заказано'], next: ['→', 'Попро&shy;бовать']
  };
  var LABEL = { ok: 'Отлично', mid: 'Обычно', bad: 'Не зашло', ord: 'Заказано', next: 'Попробовать' };
  // Цвет подложки = страна вина.
  var COUNTRY = {
    'Италия': '#d9e3c8', 'Россия': '#ecd6c6', 'Чили': '#cadcea', 'Франция': '#dcd5ea',
    'Грузия': '#f0d5b4', 'Австрия': '#cfe7d8', 'ЮАР': '#e8e0bd', 'Аргентина': '#c6dff0',
    'Новая Зеландия': '#c4e4de', 'Португалия': '#ecd0d9',
    'Япония': '#f2d4dc', 'Шотландия': '#d8cbbd', 'Ирландия': '#cfe3b8'
  };
  var AROMAS = ['персик', 'грейпфрут', 'крыжовник', 'маракуйя', 'белые цветы', 'смородиновый лист', 'абрикос', 'мандарин',
    'чайная роза', 'личи', 'груша', 'жасмин', 'мускат', 'зелёное яблоко', 'дыня', 'лайм', 'бергамот', 'горные травы'];
  // Категории в порядке на сайте; точка — цвет напитка в бокале.
  var CATS = [['Белое', '#f1e7a4'], ['Оранжевое', '#e9a95c'], ['Розовое', '#f2b8c0'], ['Красное', '#7d1f2c'],
    ['Игристое', '#f4ecc2'], ['Виски', '#c68a3e']];
  var SLUG = { 'Белое': 'beloe', 'Оранжевое': 'oranzhevoe', 'Розовое': 'rozovoe', 'Красное': 'krasnoe', 'Игристое': 'igristoe', 'Виски': 'viski' };
  // Поиск: русские и латинские названия сортов и напитков считаются одним словом.
  var SYN = [
    ['совиньон', 'sauvignon'], ['пино', 'pinot'], ['гевюрц', 'gewurz'], ['шардоне', 'chardonnay'], ['рислинг', 'riesling'],
    ['мускат', 'muscat', 'moscato', 'muskat'], ['вионье', 'viognier'], ['мальваз', 'malvasia'], ['шенен', 'chenin'],
    ['грюнер', 'gruner'], ['торронтес', 'torrontes'], ['просекко', 'prosecco'], ['креман', 'cremant'], ['франчакорт', 'franciacorta'],
    ['виски', 'whisky', 'whiskey'], ['игрист', 'sparkling', 'брют', 'brut'], ['оранж', 'orange'], ['хибики', 'hibiki'], ['никка', 'nikka']
  ];
  var LAT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
    р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' };
  var state = { tried: 'all', next: 'all', q: '', country: null, cat: null, sort: 'mark', max: 0 };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function country(w) { var c = w.region.split(',')[0].trim(); return c === 'Южная Африка' ? 'ЮАР' : c; }
  function tint(w) { return COUNTRY[country(w)] || '#e8e5d4'; }
  function type(w) { return w.type || 'вино'; }
  function color(w) { return type(w) === 'виски' ? null : w.color || (/оранж/.test(w.sugar) ? 'оранжевое' : 'белое'); }
  function cat(w) {
    if (type(w) === 'виски') return 'Виски';
    if (type(w) === 'игристое') return 'Игристое';
    var c = color(w); return c.charAt(0).toUpperCase() + c.slice(1);
  }
  // «белое сухое», «игристое брют», «виски, купажированный»; у оранжевых цвет уже в поле сахара.
  function kind(w) {
    if (type(w) === 'виски') return 'виски, ' + w.sugar;
    if (type(w) === 'игристое') return 'игристое ' + w.sugar;
    return /оранж/.test(w.sugar) ? w.sugar : color(w) + ' ' + w.sugar;
  }
  function plural(n, one, few, many) {
    var a = n % 10, b = n % 100;
    return a === 1 && b !== 11 ? one : a >= 2 && a <= 4 && (b < 12 || b > 14) ? few : many;
  }
  function rub(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
  // Цена для сортировки и фильтра: SimpleWine, иначе средняя по Москве.
  function cost(w) { return w.price || (w.msk && w.msk.avg) || 0; }
  function isTried(w) { return TRIED.indexOf(w.status) >= 0; }
  function dots(n) {
    var h = '';
    for (var i = 0; i < 5; i++) h += '<i' + (i < n ? ' class="on"' : '') + '></i>';
    return '<span class="dots" aria-label="Ароматичность ' + n + ' из 5">' + h + '</span>';
  }
  // Профиль вкуса по шкалам SimpleWine (1–5); у виски — шкалы, составленные по описанию.
  function profile(sw) {
    if (!sw || !sw.scales) return '';
    var keys = ['Сладость', 'Кислотность', 'Фрукты', 'Ароматичность', 'Пряность', 'Дым', 'Танины', 'Тело'].filter(function (k) { return sw.scales[k]; });
    if (!keys.length) return '';
    return '<div class="prof"><span class="who">Профиль вкуса' + (sw.scalesBy ? ' · по описанию' : '') + '</span>' + keys.map(function (k) {
      var n = sw.scales[k], seg = '';
      for (var i = 1; i <= 5; i++) seg += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
      return '<div class="prof__row"><span>' + k + '</span><span class="prof__bar" aria-label="' + n + ' из 5">' + seg + '</span><b>' + n + '</b></div>';
    }).join('') + '</div>';
  }
  // Что пишут покупатели: средняя оценка и частые слова из отзывов.
  function crowd(sw) {
    if (!sw || !sw.rating) return '';
    return '<div class="crowd"><span class="crowd__avg">★ ' + String(sw.rating.avg).replace('.', ',') + '</span>' +
      '<span class="crowd__n">' + sw.rating.n.toLocaleString('ru-RU') + ' ' + plural(sw.rating.n, 'оценка', 'оценки', 'оценок') + ' в SimpleWine</span>' +
      (sw.tags && sw.tags.length ? '<span class="crowd__tags">' + sw.tags.map(function (t) { return '<span>' + esc(t.toLowerCase()) + '</span>'; }).join('') + '</span>' : '') +
    '</div>';
  }
  // Где купить в Москве — для позиций не из SimpleWine.
  function where(msk) {
    if (!msk || !msk.where) return '';
    return '<div class="where"><span class="who">Где купить в Москве</span>' + msk.where.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" rel="noopener"><span>' + esc(s.name) + ' ↗</span><b>' + esc(s.price) + '</b></a>';
    }).join('') + '<small>Цены из карточек магазинов, наличие лучше уточнить.</small></div>';
  }
  function byId(id) { for (var i = 0; i < W.length; i++) if (W[i].id === id) return W[i]; }

  // ---- поиск ----
  function norm(s) { return String(s).toLowerCase().replace(/ё/g, 'е').normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function lat(s) { return s.replace(/[а-я]/g, function (c) { return LAT[c]; }); }
  var HAY = {};
  W.forEach(function (w) {
    var h = norm([w.name, w.producer, w.region, w.grape, w.note, w.sugar, kind(w), cat(w), type(w), w.tag].join(' '));
    HAY[w.id] = h + ' ' + lat(h);
  });
  // «до 3000» в строке поиска работает как фильтр по цене.
  function query(q) {
    var m = q.match(/до\s*(\d[\d\s]*)/), max = m ? +m[1].replace(/\s/g, '') : 0;
    var words = norm(q.replace(/до\s*\d[\d\s]*(₽|р\.?|руб\w*)?/, '')).split(/\s+/).filter(Boolean);
    return { max: max, words: words.map(function (t) {
      var alt = [t, lat(t)];
      SYN.forEach(function (g) { if (g.some(function (x) { return t.indexOf(x) === 0 || x.indexOf(t) === 0 && t.length > 2; })) alt = alt.concat(g); });
      return alt;
    }) };
  }
  var Q = { max: 0, words: [] };

  // ---- счётчики ----
  var counts = { tried: 0, plan: 0 };
  W.forEach(function (w) {
    counts[w.status] = (counts[w.status] || 0) + 1;
    counts[isTried(w) ? 'tried' : 'plan']++;
  });
  document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = counts[el.dataset.count] || 0; });

  // ---- плакат: три любимца ----
  document.getElementById('heroBottles').innerHTML = ['t01', 't08', 't09'].map(byId).filter(Boolean).map(function (w) {
    return '<button type="button" data-open="' + w.id + '" aria-label="' + esc(w.name) + '"><img src="' + w.img.bottle + '" alt=""></button>';
  }).join('');

  // ---- лента ароматов ----
  var line = AROMAS.map(function (a) { return '<span>' + a + '</span>'; }).join('');
  document.getElementById('ticker').innerHTML = line + line;

  // ---- категории: главная градация сайта ----
  var catBox = document.getElementById('cats');
  function drawCats() {
    var n = {}; W.forEach(function (w) { n[cat(w)] = (n[cat(w)] || 0) + 1; });
    catBox.innerHTML = [['Все', null]].concat(CATS.filter(function (c) { return n[c[0]]; })).map(function (c) {
      var on = (state.cat || 'Все') === c[0];
      return '<button type="button" data-cat="' + c[0] + '" aria-pressed="' + on + '">' +
        (c[1] ? '<i style="--c:' + c[1] + '"></i>' : '') + c[0] + '<sup>' + (c[1] ? n[c[0]] : W.length) + '</sup></button>';
    }).join('');
    edges();
  }
  // Тень у краёв ленты категорий, пока за краем что-то есть.
  function edges() {
    var bar = catBox.parentElement;
    bar.classList.toggle('more-l', catBox.scrollLeft > 4);
    bar.classList.toggle('more-r', catBox.scrollLeft + catBox.clientWidth < catBox.scrollWidth - 4);
  }
  catBox.addEventListener('scroll', edges, { passive: true });
  window.addEventListener('resize', edges);
  catBox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.cat = b.dataset.cat === 'Все' ? null : b.dataset.cat;
    try { history.replaceState(null, '', state.cat ? '#' + SLUG[state.cat] : location.pathname); } catch (x) {}
    drawCats(); drawCountries(); render();
    var act = catBox.querySelector('[aria-pressed="true"]');
    if (act && act.scrollIntoView) act.scrollIntoView({ inline: 'nearest', block: 'nearest' });
  });

  // ---- страны (цвет подложки) — внутри выбранной категории ----
  var cbox = document.getElementById('countries'), ctog = document.getElementById('countryToggle');
  function drawCountries() {
    var n = {};
    W.forEach(function (w) { if (!state.cat || cat(w) === state.cat) n[country(w)] = (n[country(w)] || 0) + 1; });
    if (state.country && !n[state.country]) state.country = null;
    cbox.innerHTML = '<span class="filter-label">Страна</span>' + Object.keys(n).sort(function (a, b) { return n[b] - n[a]; }).map(function (c) {
      return '<button type="button" data-c="' + esc(c) + '" aria-pressed="' + (c === state.country) + '" style="--c:' + (COUNTRY[c] || '#e8e5d4') + '"><i></i>' +
        esc(c) + ' <small>' + n[c] + '</small></button>';
    }).join('');
    document.getElementById('countryNow').textContent = state.country ? ': ' + state.country : '';
    ctog.classList.toggle('is-set', !!state.country);
  }
  cbox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.country = state.country === b.dataset.c ? null : b.dataset.c;
    drawCountries(); render();
  });
  // На телефоне страны свёрнуты под кнопку, чтобы вина были видны сразу.
  ctog.addEventListener('click', function () {
    var open = ctog.getAttribute('aria-expanded') !== 'true';
    ctog.setAttribute('aria-expanded', String(open));
    cbox.classList.toggle('is-open', open);
  });

  // ---- порядок и цена ----
  document.getElementById('sort').addEventListener('change', function (e) { state.sort = e.target.value; render(); });
  document.getElementById('price').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.max = +b.dataset.p;
    this.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    render();
  });
  // Ссылка вида …/#krasnoe сразу открывает категорию.
  Object.keys(SLUG).forEach(function (k) { if (location.hash === '#' + SLUG[k]) state.cat = k; });
  drawCats(); drawCountries();

  // ---- карточки ----
  function card(w) {
    var s = STAMP[w.status];
    var tag = w.tag ? '<span class="card__tag' + (w.tag === 'Рискованно' ? ' card__tag--risk' : w.offsite ? ' card__tag--off' : '') + '">' + esc(w.tag) + '</span>' : '';
    var price = w.price ? '<span class="price">' + rub(w.price) + '</span>'
      : w.msk ? '<span class="price">≈ ' + rub(w.msk.avg) + '</span><span class="offsite">средняя по Москве</span>'
      : '<span class="offsite">нет в SimpleWine · ' + esc(w.shop) + '</span>';
    var foot = price + (isTried(w) ? '<span class="sugar">' + esc(kind(w)) + '</span>' : w.aroma ? '<span class="aroma">аромат ' + dots(w.aroma) + '</span>' : '');
    return '<button type="button" class="card card--' + w.status + '" data-open="' + w.id + '">' +
      '<span class="card__plate" style="--c:' + tint(w) + '">' +
        '<span class="stamp stamp--' + w.status + '"><span><b>' + s[0] + '</b>' + s[1] + '</span></span>' +
        '<img class="card__bottle" src="' + w.img.bottle + '" alt="" loading="lazy">' +
        (w.img.glass ? '<img class="card__glass" src="' + w.img.glass + '" alt="" loading="lazy"><span class="peek">что в бокале</span>'
          : w.img.mood ? '<img class="card__glass card__glass--photo" src="' + w.img.mood + '" alt="" loading="lazy"><span class="peek">фото</span>' : '') +
      '</span>' +
      '<span class="card__body">' +
        '<span class="card__producer">' + esc(w.producer) + '</span>' +
        '<span class="card__name">' + esc(w.name) + '</span>' +
        '<span class="card__meta">' + esc(w.region) + (w.grape ? ' · ' + esc(w.grape) : '') + '</span>' +
        tag +
        '<span class="card__note">«' + esc(w.note) + '»</span>' +
        '<span class="card__foot">' + foot + '</span>' +
      '</span>' +
    '</button>';
  }

  function ok(w) {
    if (state.country && country(w) !== state.country) return false;
    if (state.cat && cat(w) !== state.cat) return false;
    var max = Q.max || state.max;
    if (max && !(cost(w) && cost(w) <= max)) return false;
    return Q.words.every(function (alt) {
      return alt.some(function (t) { return HAY[w.id].indexOf(t) >= 0; });
    });
  }

  // Порядок карточек; позиции без цены — в конце.
  var SORTS = {
    cheap: function (a, b) { return (cost(a) || 1e9) - (cost(b) || 1e9); },
    dear: function (a, b) { return cost(b) - cost(a); },
    crowd: function (a, b) { return ((b.sw && b.sw.rating && b.sw.rating.avg) || 0) - ((a.sw && a.sw.rating && a.sw.rating.avg) || 0); }
  };
  var order = [];
  function fill(id, groups, filter) {
    var h = '', n = 0;
    groups.forEach(function (g) {
      if (filter !== 'all' && filter !== g[0]) return;
      var list = W.filter(function (w) { return w.status === g[0] && ok(w); });
      var by = SORTS[state.sort] || g[2];
      if (by) list.sort(by);
      if (!list.length) return;
      n += list.length;
      list.forEach(function (w) { order.push(w.id); });
      if (filter === 'all') h += '<h3 class="wall__group">' + g[1] + ' <em>' + list.length + '</em></h3>';
      h += list.map(card).join('');
    });
    document.getElementById('wall-' + id).innerHTML = h;
    document.getElementById('none-' + id).hidden = n > 0;
  }
  function render() {
    order = [];
    fill('tried', [['ok', 'Отлично'], ['mid', 'Обычно'], ['bad', 'Не зашло']], state.tried);
    fill('next', [['ord', 'Заказано', SORTS.cheap], ['next', 'Ещё не пробовали', SORTS.cheap]], state.next);
    // Счётчики у заголовков разделов — с учётом категории, страны, цены и поиска.
    var inTried = W.filter(function (w) { return ok(w) && isTried(w); }).length;
    var inNext = W.filter(function (w) { return ok(w) && !isTried(w); }).length;
    document.querySelector('#h-tried sup').textContent = inTried;
    document.querySelector('#h-next sup').textContent = inNext;
  }

  // ---- заказанное ждёт оценки ----
  var waiting = W.filter(function (w) { return w.status === 'ord'; });
  document.getElementById('await').innerHTML = waiting.length ?
    '<p class="await__t"><b>' + waiting.length + '</b> заказано и ждут оценки. Как попробуете — пришлите отзыв, перенесу в «Попробовали».</p>' +
    '<div class="await__row">' + waiting.map(function (w) {
      return '<button type="button" data-open="' + w.id + '" title="' + esc(w.name) + '"><img src="' + w.img.bottle + '" alt="' + esc(w.name) + '" loading="lazy"><span>' + esc(w.name) + '</span></button>';
    }).join('') + '</div>' : '';

  document.querySelectorAll('.pills').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      state[box.dataset.for] = b.dataset.f;
      box.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      render();
    });
  });
  document.getElementById('q').addEventListener('input', function (e) {
    state.q = e.target.value.trim();
    Q = query(state.q);
    render();
  });

  // ---- тень у панели при прокрутке ----
  var bar = document.querySelector('.bar');
  window.addEventListener('scroll', function () { bar.classList.toggle('is-stuck', window.scrollY > 8); }, { passive: true });

  // ---- окно вина ----
  // У каждого вина своя ссылка …/#v-t01; «Назад» в браузере закрывает окно, а не уходит с сайта.
  var sheet = document.getElementById('sheet'), media = document.getElementById('sheetMedia');
  var main = document.getElementById('sheetImg'), mainBox = main.parentElement;
  var views = document.getElementById('sheetViews'), info = document.getElementById('sheetInfo');
  var prev = document.getElementById('sheetPrev'), next = document.getElementById('sheetNext'), pos = document.getElementById('sheetPos');
  var back = null, cur = null, pushed = false;

  function show(w) {
    cur = w;
    var v = [['Бутылка', w.img.bottle, false]];
    if (w.img.glass) v.push(['В бокале', w.img.glass, true]);
    if (w.img.mood) v.push(['Фото', w.img.mood, false, true]);
    if (w.img.label) v.push(['Этикетка', w.img.label, false]);
    media.style.setProperty('--c', tint(w));
    views.innerHTML = v.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + x[0] + '</button>'; }).join('');
    function pick(i) {
      main.src = v[i][1]; mainBox.classList.toggle('is-white', v[i][2]); mainBox.classList.toggle('is-photo', !!v[i][3]);
      views.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.i === i)); });
    }
    views.onclick = function (e) { var b = e.target.closest('button'); if (b) pick(+b.dataset.i); };
    pick(w.img.glass || w.img.mood ? 1 : 0);
    main.alt = w.name;

    var tried = isTried(w);
    var col = { ok: 'var(--ok)', mid: 'var(--mid)', bad: 'var(--bad)', ord: 'var(--bottle)', next: 'var(--bottle)' }[w.status];
    info.innerHTML =
      '<span class="chip" style="color:' + col + '">' + STAMP[w.status][0] + ' ' + LABEL[w.status] + '</span>' +
      '<div><div class="card__producer">' + esc(w.producer) + '</div><h2 id="sheetName">' + esc(w.name) + '</h2></div>' +
      (cost(w) ? '<p class="sheet__price">' + (w.price ? rub(w.price) + ' <small>на SimpleWine, 23.10</small>' : '≈ ' + rub(w.msk.avg) + ' <small>средняя по Москве</small>') + '</p>' : '') +
      '<p class="sheet__note"><span class="who">' + (tried ? 'Наш комментарий' : 'Почему стоит взять') + '</span>«' + esc(w.note) + '»</p>' +
      profile(w.sw) +
      (w.sw && w.sw.tasting ? '<div class="sw"><span class="who">' + (w.shop ? 'Описание · ' + esc(w.shop) : 'Как описывает SimpleWine') + '</span><p>' + esc(w.sw.tasting) + '</p></div>' : '') +
      (w.sw && w.sw.expert ? '<blockquote class="expert"><p>«' + esc(w.sw.expert.text) + '»</p><footer>' + esc(w.sw.expert.name) + ', ' + esc(w.sw.expert.role.toLowerCase()) + '</footer></blockquote>' : '') +
      crowd(w.sw) +
      '<dl class="facts">' +
        '<dt>Регион</dt><dd>' + esc(w.region) + '</dd>' +
        '<dt>Тип</dt><dd>' + esc(kind(w)) + '</dd>' +
        (w.grape ? '<dt>Виноград</dt><dd>' + esc(w.grape) + '</dd>' : '') +
        (w.sw && w.sw.serve ? '<dt>Подавать</dt><dd>' + esc(w.sw.serve) + '</dd>' : '') +
        (w.sw && w.sw.food ? '<dt>К столу</dt><dd>' + esc(w.sw.food) + '</dd>' : '') +
        (w.drank ? '<dt>Пробовали</dt><dd>' + esc(w.drank) + '</dd>' : '') +
        (w.paid ? '<dt>Брали за</dt><dd>' + rub(w.paid) + (w.price && w.price !== w.paid ? ' <span style="color:var(--ink-3);font-weight:500">сейчас ' + rub(w.price) + '</span>' : '') + '</dd>' : '') +
        (w.msk ? '<dt>В Москве</dt><dd>≈ ' + rub(w.msk.avg) + ' <span style="color:var(--ink-3);font-weight:500">' + w.msk.range + ' ₽, ' + w.msk.date + '</span></dd>' : '') +
      '</dl>' +
      (w.sw && w.sw.fact ? '<details class="fact"><summary>Это интересно</summary><p>' + esc(w.sw.fact) + '</p></details>' : '') +
      '<div class="sheet__acts">' +
        '<a class="btn" href="' + w.url + '" target="_blank" rel="noopener">' + (w.shop ? 'Открыть в ' + esc(w.shop) : 'Открыть в SimpleWine') + ' ↗</a>' +
        '<button type="button" class="btn btn--ghost" id="share">Поделиться</button>' +
      '</div>' +
      (w.offsite ? '<p class="offsite-note">Этого нет в ассортименте SimpleWine. Ссылка выше ведёт на страницу с фото и описанием' + (w.msk ? ', а купить можно в московских магазинах ниже.' : '.') + '</p>' : '') +
      where(w.msk);
    // Листать можно по видимому списку; если вино открыто с плаката или по ссылке и в списке его нет — стрелки скрыты.
    var i = order.indexOf(w.id);
    prev.parentElement.hidden = i < 0 || order.length < 2;
    prev.disabled = i <= 0; next.disabled = i < 0 || i >= order.length - 1;
    pos.textContent = i >= 0 ? (i + 1) + ' из ' + order.length : '';
    sheet.querySelector('.sheet__card').scrollTop = 0;
  }
  function open(w, how) {
    if (!w) return;
    if (sheet.hidden) {
      back = document.activeElement;
      sheet.hidden = false;
      document.body.style.overflow = 'hidden';
    }
    show(w);
    try {
      if (how === 'push') { history.pushState({ v: w.id }, '', '#v-' + w.id); pushed = true; }
      else if (how === 'swap') history.replaceState(history.state && history.state.v ? { v: w.id } : null, '', '#v-' + w.id);
    } catch (x) {}
    sheet.querySelector('.sheet__x').focus({ preventScroll: true });
  }
  function hide() {
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (back && document.contains(back)) back.focus({ preventScroll: true });
  }
  function close() {
    if (pushed && history.state && history.state.v) { history.back(); return; }  // popstate закроет
    try { history.replaceState(null, '', state.cat ? '#' + SLUG[state.cat] : location.pathname); } catch (x) {}
    hide();
  }
  window.addEventListener('popstate', function () {
    var m = location.hash.match(/^#v-(.+)$/);
    if (m && byId(m[1])) open(byId(m[1]));
    else if (!sheet.hidden) { pushed = false; hide(); }
  });
  function step(d) {
    var i = order.indexOf(cur && cur.id) + d;
    if (i >= 0 && i < order.length) open(byId(order[i]), 'swap');
  }
  prev.addEventListener('click', function () { step(-1); });
  next.addEventListener('click', function () { step(1); });
  // Свайп по фото влево-вправо листает вина.
  var tx = null, ty = 0;
  media.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  media.addEventListener('touchend', function (e) {
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty; tx = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  });
  function share(b) {
    var url = location.origin + location.pathname + '#v-' + cur.id;
    if (navigator.share) { navigator.share({ title: cur.name, url: url }).catch(function () {}); return; }
    var done = function () { b.textContent = 'Ссылка скопирована'; setTimeout(function () { b.textContent = 'Поделиться'; }, 2000); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Ссылка на вино', url); });
    else prompt('Ссылка на вино', url);
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (t) { open(byId(t.dataset.open), 'push'); return; }
    if (e.target.closest('#share')) { share(e.target.closest('#share')); return; }
    if (e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (sheet.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  render();
  // Ссылка вида …/#v-t01 сразу открывает вино.
  var deep = location.hash.match(/^#v-(.+)$/);
  if (deep && byId(deep[1])) open(byId(deep[1]));
})();
