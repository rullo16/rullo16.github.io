/* Site interactions: theme toggle, mobile menu, project filters,
   chart reveal and the click-to-play WebGL game. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;
  var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  /* ── Theme toggle ─────────────────────────────────────────────────────── */
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set === 'light' || set === 'dark') return set;
    return darkQuery && darkQuery.matches ? 'dark' : 'light';
  }

  function syncThemeButtons() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    });
  }

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      syncThemeButtons();
    });
  });
  if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', syncThemeButtons);
  syncThemeButtons();

  /* ── Mobile menu ──────────────────────────────────────────────────────── */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    navToggle.addEventListener('click', function () {
      setOpen(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); navToggle.focus(); }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !navToggle.contains(e.target)) setOpen(false);
    });
  }

  /* ── Project filters ──────────────────────────────────────────────────── */
  var filter = document.querySelector('[data-filter]');
  var grid = document.querySelector('[data-filter-grid]');
  if (filter && grid) {
    var status = document.querySelector('[data-filter-status]');
    var cards = grid.querySelectorAll('[data-category]');
    filter.hidden = false;
    filter.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-filter-value]');
      if (!chip) return;
      var value = chip.getAttribute('data-filter-value');
      filter.querySelectorAll('[data-filter-value]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      var shown = 0;
      cards.forEach(function (card) {
        var match = value === 'all' || card.getAttribute('data-category') === value;
        card.hidden = !match;
        if (match) shown++;
      });
      if (status) status.textContent = 'Showing ' + shown + (shown === 1 ? ' project' : ' projects');
    });
  }

  /* ── Chart reveal: bars grow when the chart scrolls into view ─────────── */
  var charts = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.25 });
    charts.forEach(function (c) { io.observe(c); });
  } else {
    charts.forEach(function (c) { c.classList.add('is-visible'); });
  }

  /* ── Click-to-play game: the ~60 MB build loads only on request ───────── */
  document.querySelectorAll('[data-game]').forEach(function (game) {
    var stage = game.querySelector('[data-game-stage]');
    var start = game.querySelector('[data-game-start]');
    if (!stage || !start) return;
    var w = Number(game.getAttribute('data-game-width')) || 960;
    var h = Number(game.getAttribute('data-game-height')) || 600;

    start.addEventListener('click', function () {
      var loading = document.createElement('p');
      loading.className = 'game__loading';
      loading.textContent = 'Loading game…';

      var frame = document.createElement('iframe');
      frame.src = game.getAttribute('data-game-src');
      frame.title = game.getAttribute('data-game-title') || 'Game';
      frame.width = w;
      frame.height = h;
      frame.setAttribute('allow', 'fullscreen; autoplay; gamepad');
      frame.setAttribute('allowfullscreen', '');

      var fit = function () { frame.style.transform = 'scale(' + stage.clientWidth / w + ')'; };
      fit();
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage);
      else window.addEventListener('resize', fit);

      frame.addEventListener('load', function () {
        loading.remove();
        try { frame.focus(); } catch (e) { /* ignore */ }
      });

      stage.replaceChildren(frame, loading);
    });
  });
})();
