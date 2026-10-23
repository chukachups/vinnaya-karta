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
  // Точка у фильтра цвета — цвет самого вина в бокале.
  var WINE_COLOR = { 'белое': '#f1e7a4', 'оранжевое': '#e9a95c', 'красное': '#7d1f2c', 'розовое': '#f2b8c0' };
  var TYPE_COLOR = { 'вино': '#c9d8b0', 'игристое': '#f4ecc2', 'виски': '#c68a3e' };
  var state = { tried: 'all', next: 'all', q: '', country: null, color: null, type: null };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function country(w) { var c = w.region.split(',')[0].trim(); return c === 'Южная Африка' ? 'ЮАР' : c; }
  function tint(w) { return COUNTRY[country(w)] || '#e8e5d4'; }
  function type(w) { return w.type || 'вино'; }
  function color(w) { return type(w) === 'виски' ? null : w.color || (/оранж/.test(w.sugar) ? 'оранжевое' : 'белое'); }
  // «белое сухое», «игристое брют», «виски, купажированный»; у оранжевых цвет уже в поле сахара.
  function kind(w) {
    if (type(w) === 'виски') return 'виски, ' + w.sugar;
    if (type(w) === 'игристое') return 'игристое ' + w.sugar;
    return /оранж/.test(w.sugar) ? w.sugar : color(w) + ' ' + w.sugar;
  }
  function rub(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
  function dots(n) {
    var h = '';
    for (var i = 0; i < 5; i++) h += '<i' + (i < n ? ' class="on"' : '') + '></i>';
    return '<span class="dots" aria-label="Ароматичность ' + n + ' из 5">' + h + '</span>';
  }
  // Профиль вкуса по шкалам SimpleWine (1–5).
  function profile(sw) {
    if (!sw || !sw.scales) return '';
    var keys = ['Сладость', 'Кислотность', 'Ароматичность', 'Танины', 'Тело'].filter(function (k) { return sw.scales[k]; });
    if (!keys.length) return '';
    return '<div class="prof"><span class="who">Профиль вкуса</span>' + keys.map(function (k) {
      var n = sw.scales[k], seg = '';
      for (var i = 1; i <= 5; i++) seg += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
      return '<div class="prof__row"><span>' + k + '</span><span class="prof__bar" aria-label="' + n + ' из 5">' + seg + '</span><b>' + n + '</b></div>';
    }).join('') + '</div>';
  }
  // Что пишут покупатели: средняя оценка и частые слова из отзывов.
  function crowd(sw) {
    if (!sw || !sw.rating) return '';
    return '<div class="crowd"><span class="crowd__avg">★ ' + String(sw.rating.avg).replace('.', ',') + '</span>' +
      '<span class="crowd__n">' + sw.rating.n.toLocaleString('ru-RU') + ' оценок в SimpleWine</span>' +
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

  // ---- счётчики ----
  var counts = { tried: 0, plan: 0 };
  W.forEach(function (w) {
    counts[w.status] = (counts[w.status] || 0) + 1;
    counts[TRIED.indexOf(w.status) >= 0 ? 'tried' : 'plan']++;
  });
  document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = counts[el.dataset.count] || 0; });

  // ---- плакат: три любимца ----
  document.getElementById('heroBottles').innerHTML = ['t01', 't08', 't09'].map(byId).filter(Boolean).map(function (w) {
    return '<button type="button" data-open="' + w.id + '" aria-label="' + esc(w.name) + '"><img src="' + w.img.bottle + '" alt=""></button>';
  }).join('');

  // ---- лента ароматов ----
  var line = AROMAS.map(function (a) { return '<span>' + a + '</span>'; }).join('');
  document.getElementById('ticker').innerHTML = line + line;

  // ---- фильтры: цвет вина и страна (цвет подложки) ----
  function tally(fn) { var o = {}; W.forEach(function (w) { var k = fn(w); if (k) o[k] = (o[k] || 0) + 1; }); return o; }
  function chips(kind, counts, swatch) {
    return Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).map(function (c) {
      return '<button type="button" data-k="' + kind + '" data-c="' + esc(c) + '" aria-pressed="false" style="--c:' + swatch(c) + '"><i></i>' +
        esc(c.charAt(0).toUpperCase() + c.slice(1)) + ' <small>' + counts[c] + '</small></button>';
    }).join('');
  }
  var cbox = document.getElementById('countries');
  cbox.innerHTML =
    '<span class="filter-label">Тип</span>' + chips('type', tally(type), function (c) { return TYPE_COLOR[c] || '#eee'; }) +
    '<span class="filter-label">Цвет</span>' + chips('color', tally(color), function (c) { return WINE_COLOR[c] || '#eee'; }) +
    '<span class="filter-label">Страна</span>' + chips('country', tally(country), function (c) { return COUNTRY[c] || '#e8e5d4'; });
  cbox.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var k = b.dataset.k;
    state[k] = state[k] === b.dataset.c ? null : b.dataset.c;
    cbox.querySelectorAll('button[data-k="' + k + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.c === state[k])); });
    render();
  });

  // ---- карточки ----
  function card(w) {
    var tried = TRIED.indexOf(w.status) >= 0, s = STAMP[w.status];
    var tag = w.tag ? '<span class="card__tag' + (w.tag === 'Рискованно' ? ' card__tag--risk' : w.offsite ? ' card__tag--off' : '') + '">' + esc(w.tag) + '</span>' : '';
    var foot = tried
      ? '<span class="sugar">' + esc(kind(w)) + '</span><span class="go">SimpleWine ↗</span>'
      : (w.price ? '<span class="price">' + rub(w.price) + '</span>' : (w.msk ? '<span class="price">≈ ' + rub(w.msk.avg) + '</span><span class="offsite">средняя по Москве</span>' : '<span class="offsite">нет в SimpleWine · ' + esc(w.shop) + '</span>')) + (w.aroma ? '<span class="aroma">аромат ' + dots(w.aroma) + '</span>' : '');
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
    if (state.color && color(w) !== state.color) return false;
    if (state.type && type(w) !== state.type) return false;
    if (!state.q) return true;
    return [w.name, w.producer, w.region, w.grape, w.note, w.sugar].join(' ').toLowerCase().indexOf(state.q) >= 0;
  }

  function fill(id, groups, filter) {
    var h = '', n = 0;
    groups.forEach(function (g) {
      if (filter !== 'all' && filter !== g[0]) return;
      var list = W.filter(function (w) { return w.status === g[0] && ok(w); });
      if (g[2]) list.sort(g[2]);
      if (!list.length) return;
      n += list.length;
      if (filter === 'all') h += '<h3 class="wall__group">' + g[1] + ' <em>' + list.length + '</em></h3>';
      h += list.map(card).join('');
    });
    document.getElementById('wall-' + id).innerHTML = h;
    document.getElementById('none-' + id).hidden = n > 0;
  }
  // Позиции не из SimpleWine (без цены) — в конце списка.
  function byPrice(a, b) { return (a.price || 1e9) - (b.price || 1e9); }
  function render() {
    fill('tried', [['ok', 'Отлично'], ['mid', 'Обычно'], ['bad', 'Не зашло']], state.tried);
    fill('next', [['ord', 'Заказано', byPrice], ['next', 'Ещё не пробовали', byPrice]], state.next);
  }

  document.querySelectorAll('.pills').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      state[box.dataset.for] = b.dataset.f;
      box.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      render();
    });
  });
  document.getElementById('q').addEventListener('input', function (e) {
    state.q = e.target.value.trim().toLowerCase();
    render();
  });

  // ---- тень у панели при прокрутке ----
  var bar = document.querySelector('.bar');
  window.addEventListener('scroll', function () { bar.classList.toggle('is-stuck', window.scrollY > 8); }, { passive: true });

  // ---- окно вина ----
  var sheet = document.getElementById('sheet'), media = document.getElementById('sheetMedia');
  var main = document.getElementById('sheetImg'), mainBox = main.parentElement;
  var views = document.getElementById('sheetViews'), info = document.getElementById('sheetInfo');
  var back = null;

  function open(w) {
    back = document.activeElement;
    var v = [['Бутылка', w.img.bottle, false]];
    if (w.img.glass) v.push(['В бокале', w.img.glass, true]);
    if (w.img.mood) v.push(['Фото', w.img.mood, false, true]);
    if (w.img.label) v.push(['Этикетка', w.img.label, false]);
    media.style.setProperty('--c', tint(w));
    views.innerHTML = v.map(function (x, i) { return '<button type="button" data-i="' + i + '">' + x[0] + '</button>'; }).join('');
    function show(i) {
      main.src = v[i][1]; mainBox.classList.toggle('is-white', v[i][2]); mainBox.classList.toggle('is-photo', !!v[i][3]);
      views.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.i === i)); });
    }
    views.onclick = function (e) { var b = e.target.closest('button'); if (b) show(+b.dataset.i); };
    show(w.img.glass || w.img.mood ? 1 : 0);
    main.alt = w.name;

    var tried = TRIED.indexOf(w.status) >= 0;
    var col = { ok: 'var(--ok)', mid: 'var(--mid)', bad: 'var(--bad)', ord: 'var(--bottle)', next: 'var(--bottle)' }[w.status];
    info.innerHTML =
      '<span class="chip" style="color:' + col + '">' + STAMP[w.status][0] + ' ' + LABEL[w.status] + '</span>' +
      '<div><div class="card__producer">' + esc(w.producer) + '</div><h2 id="sheetName">' + esc(w.name) + '</h2></div>' +
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
        (w.msk ? '<dt>В Москве</dt><dd>≈ ' + rub(w.msk.avg) + ' <span style="color:var(--ink-3);font-weight:500">' + w.msk.range + ' ₽, ' + w.msk.date + '</span></dd>' : '') +
        (!tried && w.price ? '<dt>Цена</dt><dd>' + rub(w.price) + ' <span style="color:var(--ink-3);font-weight:500">на 23.10</span></dd>' : '') +
      '</dl>' +
      (w.sw && w.sw.fact ? '<details class="fact"><summary>Это интересно</summary><p>' + esc(w.sw.fact) + '</p></details>' : '') +
      '<a class="btn" href="' + w.url + '" target="_blank" rel="noopener">' + (w.shop ? 'Открыть в ' + esc(w.shop) : 'Открыть в SimpleWine') + ' ↗</a>' +
      (w.offsite ? '<p class="offsite-note">Этого нет в ассортименте SimpleWine. Ссылка выше ведёт на страницу с фото и описанием' + (w.msk ? ', а купить можно в московских магазинах ниже.' : '.') + '</p>' : '') +
      where(w.msk);
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
    sheet.querySelector('.sheet__x').focus();
  }
  function close() {
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (back) back.focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open]');
    if (t) { open(byId(t.dataset.open)); return; }
    if (e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) close(); });

  render();
})();
