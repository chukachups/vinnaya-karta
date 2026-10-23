(function () {
  'use strict';
  var W = window.WINES || [];
  var LABEL = { ok: 'Отлично', mid: 'Обычно', bad: 'Не зашло', ord: 'Заказано', next: 'Попробовать' };
  var TRIED = ['ok', 'mid', 'bad'];
  var state = { tried: 'all', next: 'all', q: '' };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function rub(n) { return n.toLocaleString('ru-RU') + ' ₽'; }
  function dots(n) {
    var h = '';
    for (var i = 0; i < 5; i++) h += '<i' + (i < n ? ' class="on"' : '') + '></i>';
    return '<span class="aroma" aria-label="Ароматичность ' + n + ' из 5">' + h + '</span>';
  }
  function byId(id) { for (var i = 0; i < W.length; i++) if (W[i].id === id) return W[i]; }

  // ---- счётчики ----
  var counts = { tried: 0, plan: 0 };
  W.forEach(function (w) {
    counts[w.status] = (counts[w.status] || 0) + 1;
    if (TRIED.indexOf(w.status) >= 0) counts.tried++; else counts.plan++;
  });
  document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = counts[el.dataset.count] || 0; });

  // ---- полка любимцев ----
  var fav = ['t01', 't08', 't09'].map(byId).filter(Boolean);
  document.getElementById('shelf').innerHTML = fav.map(function (w) {
    return '<img src="' + w.img.bottle + '" alt="' + esc(w.name) + '">';
  }).join('');
  document.getElementById('shelfNames').textContent = fav.map(function (w) { return w.name.replace(/ \d{4}$/, ''); }).join(', ');

  // ---- карточки ----
  function card(w) {
    var tried = TRIED.indexOf(w.status) >= 0;
    var tag = '';
    if (w.tag) tag = '<span class="tag' + (w.tag === 'Рискованно' ? ' tag--risk' : '') + '">' + esc(w.tag) + '</span>';
    var foot = tried
      ? '<span class="card__meta">' + esc(w.sugar) + '</span><span class="aroma-l">SimpleWine ↗</span>'
      : '<span class="price">' + rub(w.price) + '</span>' + (w.aroma ? '<span class="aroma-l">аромат ' + dots(w.aroma) + '</span>' : '');
    return '<button type="button" class="card card--' + w.status + '" data-id="' + w.id + '" data-s="' + w.status + '">' +
      '<span class="card__plate">' +
        '<span class="badge badge--' + w.status + '">' + LABEL[w.status] + '</span>' +
        '<img class="card__bottle" src="' + w.img.bottle + '" alt="" loading="lazy">' +
        (w.img.glass ? '<img class="card__glass" src="' + w.img.glass + '" alt="" loading="lazy"><span class="glass-hint">что в бокале</span>' : '') +
      '</span>' +
      '<span class="card__body">' +
        '<span class="card__producer">' + esc(w.producer) + '</span>' +
        '<span class="card__name">' + esc(w.name) + '</span>' +
        '<span class="card__meta">' + esc(w.region) + (w.grape ? ' · ' + esc(w.grape) : '') + '</span>' +
        tag +
        '<span class="card__note">' + esc(w.note) + '</span>' +
        '<span class="card__foot">' + foot + '</span>' +
      '</span>' +
    '</button>';
  }

  function matches(w) {
    if (!state.q) return true;
    var hay = [w.name, w.producer, w.region, w.grape, w.note, w.sugar].join(' ').toLowerCase();
    return hay.indexOf(state.q) >= 0;
  }

  function render() {
    // попробовали: группы по оценке
    var h = '', n = 0;
    TRIED.forEach(function (s) {
      if (state.tried !== 'all' && state.tried !== s) return;
      var list = W.filter(function (w) { return w.status === s && matches(w); });
      if (!list.length) return;
      n += list.length;
      if (state.tried === 'all') h += '<h3 class="group-title">' + LABEL[s] + ' · ' + list.length + '</h3>';
      h += list.map(card).join('');
    });
    document.getElementById('grid-tried').innerHTML = h;
    document.getElementById('none-tried').hidden = n > 0;

    // дальше: заказано, потом остальное, внутри по цене
    h = ''; n = 0;
    [['ord', 'Заказано'], ['next', 'Ещё не пробовали']].forEach(function (g) {
      if (state.next !== 'all' && state.next !== g[0]) return;
      var list = W.filter(function (w) { return w.status === g[0] && matches(w); })
        .sort(function (a, b) { return a.price - b.price; });
      if (!list.length) return;
      n += list.length;
      if (state.next === 'all') h += '<h3 class="group-title">' + g[1] + ' · ' + list.length + '</h3>';
      h += list.map(card).join('');
    });
    document.getElementById('grid-next').innerHTML = h;
    document.getElementById('none-next').hidden = n > 0;
  }

  document.querySelectorAll('.seg').forEach(function (seg) {
    seg.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      state[seg.dataset.for] = b.dataset.f;
      seg.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      render();
    });
  });
  document.getElementById('q').addEventListener('input', function (e) {
    state.q = e.target.value.trim().toLowerCase();
    render();
  });

  // ---- окно вина ----
  var sheet = document.getElementById('sheet'), main = document.getElementById('sheetImg');
  var mainBox = main.parentElement, thumbs = document.getElementById('sheetThumbs'), info = document.getElementById('sheetInfo');
  var lastFocus = null;

  function pick(src, white, btn) {
    main.src = src; mainBox.classList.toggle('is-white', white);
    thumbs.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === btn)); });
  }

  function open(w) {
    lastFocus = document.activeElement;
    var views = [['Бутылка', w.img.bottle, false]];
    if (w.img.glass) views.push(['В бокале', w.img.glass, true]);
    if (w.img.label) views.push(['Этикетка', w.img.label, false]);
    thumbs.innerHTML = views.map(function (v, i) {
      return '<button type="button" data-i="' + i + '"><img src="' + v[1] + '" alt="">' + v[0] + '</button>';
    }).join('');
    thumbs.querySelectorAll('button').forEach(function (b) {
      var v = views[+b.dataset.i];
      b.addEventListener('click', function () { pick(v[1], v[2], b); });
    });
    var first = w.img.glass ? 1 : 0;
    pick(views[first][1], views[first][2], thumbs.children[first]);
    main.alt = w.name;

    var tried = TRIED.indexOf(w.status) >= 0;
    info.innerHTML =
      '<span class="badge badge--' + w.status + '" style="position:static;justify-self:start">' + LABEL[w.status] + '</span>' +
      '<div><div class="card__producer">' + esc(w.producer) + '</div><h2 id="sheetName">' + esc(w.name) + '</h2></div>' +
      '<p class="sheet__note">«' + esc(w.note) + '»</p>' +
      '<dl class="facts">' +
        '<dt>Регион</dt><dd>' + esc(w.region) + '</dd>' +
        '<dt>Сахар</dt><dd>' + esc(w.sugar) + '</dd>' +
        (w.grape ? '<dt>Виноград</dt><dd>' + esc(w.grape) + '</dd>' : '') +
        (w.aroma ? '<dt>Аромат</dt><dd>' + dots(w.aroma) + ' ' + w.aroma + ' из 5</dd>' : '') +
        (!tried && w.price ? '<dt>Цена</dt><dd>' + rub(w.price) + ' <span style="color:var(--ink-3)">на 23.10</span></dd>' : '') +
      '</dl>' +
      '<a class="btn" href="' + w.url + '" target="_blank" rel="noopener">Открыть в SimpleWine ↗</a>';
    sheet.hidden = false;
    document.body.style.overflow = 'hidden';
    sheet.querySelector('.sheet__x').focus();
  }
  function close() {
    sheet.hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var c = e.target.closest('.card');
    if (c) { open(byId(c.dataset.id)); return; }
    if (e.target.closest('[data-close]')) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) close(); });

  render();
})();
