/* Hero background: a small multi-agent navigation sim.
   Each drone steers towards its own goal, keeps its distance from the others,
   and avoids the no-fly zones, the text block and your cursor. When a drone
   reaches its goal it gets a new one and the counter ticks up.
   Pauses when off screen and renders a single still frame for reduced motion. */
(function () {
  'use strict';

  var canvas = document.querySelector('[data-swarm]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var hero = canvas.parentElement;
  var avoidEl = hero.querySelector('[data-swarm-avoid]');
  var counter = document.querySelector('[data-swarm-count]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');

  var COLORS = {
    agent: '#2dd4bf',
    trail: 'rgba(45, 212, 191, 0.2)',
    goal: 'rgba(251, 191, 36, 0.75)',
    pulse: '251, 191, 36',
    zoneFill: 'rgba(148, 163, 184, 0.05)',
    zoneStroke: 'rgba(148, 163, 184, 0.18)'
  };
  var MAX_SPEED = 72;   // px per second
  var MAX_FORCE = 140;  // px per second squared
  var TRAIL = 14;

  var W = 0, H = 0, lastWidth = -1;
  var agents = [], zones = [], pulses = [], textBox = null;
  var pointer = { x: 0, y: 0, active: false };
  var reached = 0, running = false, onScreen = true, rafId = 0, lastTime = 0;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function measureTextBox() {
    if (!avoidEl) { textBox = null; return; }
    var h = hero.getBoundingClientRect();
    var r = avoidEl.getBoundingClientRect();
    var pad = 18;
    textBox = { x0: r.left - h.left - pad, y0: r.top - h.top - pad, x1: r.right - h.left + pad, y1: r.bottom - h.top + pad };
  }

  function inTextBox(x, y, m) {
    return textBox && x > textBox.x0 - m && x < textBox.x1 + m && y > textBox.y0 - m && y < textBox.y1 + m;
  }

  // The stats card overlaps the bottom 48px of the hero, so keep goals above it.
  function freePoint(margin) {
    var yMax = H - 60;
    for (var i = 0; i < 40; i++) {
      var x = rand(24, W - 24), y = rand(16, yMax), ok = !inTextBox(x, y, margin);
      for (var j = 0; ok && j < zones.length; j++) {
        if (Math.hypot(x - zones[j].x, y - zones[j].y) < zones[j].r + margin) ok = false;
      }
      if (ok) return { x: x, y: y };
    }
    // On narrow screens the text fills most of the hero: use the strip below it.
    var below = textBox ? Math.min(textBox.y1 + margin, yMax) : 16;
    return { x: rand(24, W - 24), y: rand(below, yMax) };
  }

  // After the text block moves (fonts loading, resize), move any goal that
  // now sits under the text somewhere clear.
  function clearGoalsFromText() {
    for (var i = 0; i < agents.length; i++) {
      if (inTextBox(agents[i].gx, agents[i].gy, 14)) { var g = freePoint(14); agents[i].gx = g.x; agents[i].gy = g.y; }
    }
  }

  function setup() {
    measureTextBox();
    zones = [];
    var zoneCount = W < 640 ? 2 : 4;
    for (var z = 0, tries = 0; z < zoneCount && tries < 200; tries++) {
      var r = rand(22, W < 640 ? 34 : 56);
      var c = { x: rand(r + 10, W - r - 10), y: rand(r + 10, H - r - 10), r: r };
      var clear = !inTextBox(c.x, c.y, r + 12);
      for (var k = 0; clear && k < zones.length; k++) {
        if (Math.hypot(c.x - zones[k].x, c.y - zones[k].y) < c.r + zones[k].r + 40) clear = false;
      }
      if (clear) { zones.push(c); z++; }
    }

    var n = clamp(Math.round((W * H) / 20000), 10, 38);
    agents = [];
    for (var i = 0; i < n; i++) {
      var p = freePoint(8), g = freePoint(14), a = rand(0, Math.PI * 2);
      agents.push({ x: p.x, y: p.y, vx: Math.cos(a) * 20, vy: Math.sin(a) * 20, gx: g.x, gy: g.y, trail: [] });
    }
    pulses = [];
  }

  function resize() {
    var rect = hero.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (W !== lastWidth) { lastWidth = W; setup(); } else { measureTextBox(); clearGoalsFromText(); }
    if (!running) draw();
  }

  function step(dt) {
    for (var i = 0; i < agents.length; i++) {
      var a = agents[i], fx = 0, fy = 0;

      // Seek the goal, slowing down on arrival.
      var dx = a.gx - a.x, dy = a.gy - a.y, d = Math.hypot(dx, dy) || 1;
      var speed = MAX_SPEED * Math.min(1, d / 60);
      fx += (dx / d) * speed - a.vx;
      fy += (dy / d) * speed - a.vy;

      // Keep a safe distance from other drones.
      for (var j = 0; j < agents.length; j++) {
        if (i === j) continue;
        var b = agents[j], sx = a.x - b.x, sy = a.y - b.y, sd = Math.hypot(sx, sy);
        if (sd > 0 && sd < 24) { fx += (sx / sd) * (24 - sd) * 9; fy += (sy / sd) * (24 - sd) * 9; }
      }

      // Steer around no-fly zones.
      for (var k = 0; k < zones.length; k++) {
        var zc = zones[k], zx = a.x - zc.x, zy = a.y - zc.y, zd = Math.hypot(zx, zy) || 1, gap = zd - zc.r;
        if (gap < 34) { var s = (34 - gap) / 34; fx += (zx / zd) * s * MAX_FORCE * 2.2; fy += (zy / zd) * s * MAX_FORCE * 2.2; }
      }

      // Keep clear of the headline text.
      if (textBox) {
        var nx = clamp(a.x, textBox.x0, textBox.x1), ny = clamp(a.y, textBox.y0, textBox.y1);
        var tx = a.x - nx, ty = a.y - ny, td = Math.hypot(tx, ty);
        if (td === 0) {
          // Inside the box: head for the nearest vertical edge.
          fx += (a.x - (textBox.x0 + textBox.x1) / 2 < 0 ? -1 : 1) * MAX_FORCE * 2;
        } else if (td < 28) {
          var ts = (28 - td) / 28; fx += (tx / td) * ts * MAX_FORCE * 2; fy += (ty / td) * ts * MAX_FORCE * 2;
        }
      }

      // Your cursor is a moving obstacle.
      if (pointer.active) {
        var px = a.x - pointer.x, py = a.y - pointer.y, pd = Math.hypot(px, py);
        if (pd > 0 && pd < 110) { var ps = (110 - pd) / 110; fx += (px / pd) * ps * MAX_FORCE * 3.5; fy += (py / pd) * ps * MAX_FORCE * 3.5; }
      }

      var f = Math.hypot(fx, fy), fmax = MAX_FORCE * 3;
      if (f > fmax) { fx = (fx / f) * fmax; fy = (fy / f) * fmax; }
      a.vx += fx * dt; a.vy += fy * dt;
      var v = Math.hypot(a.vx, a.vy), vmax = pointer.active ? MAX_SPEED * 1.8 : MAX_SPEED * 1.3;
      if (v > vmax) { a.vx = (a.vx / v) * vmax; a.vy = (a.vy / v) * vmax; }
      a.x = clamp(a.x + a.vx * dt, 2, W - 2);
      a.y = clamp(a.y + a.vy * dt, 2, H - 2);

      a.trail.push(a.x, a.y);
      if (a.trail.length > TRAIL * 2) a.trail.splice(0, 2);

      if (Math.hypot(a.gx - a.x, a.gy - a.y) < 8) {
        pulses.push({ x: a.gx, y: a.gy, t: 0 });
        var g = freePoint(14); a.gx = g.x; a.gy = g.y;
        reached++;
        if (counter) counter.textContent = reached.toLocaleString('en-GB');
      }
    }
    for (var q = pulses.length - 1; q >= 0; q--) { pulses[q].t += dt; if (pulses[q].t > 0.7) pulses.splice(q, 1); }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    ctx.lineWidth = 1;
    for (var k = 0; k < zones.length; k++) {
      ctx.beginPath();
      ctx.arc(zones[k].x, zones[k].y, zones[k].r, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.zoneFill; ctx.fill();
      ctx.strokeStyle = COLORS.zoneStroke; ctx.stroke();
    }

    ctx.strokeStyle = COLORS.goal; ctx.lineWidth = 1.5;
    for (var i = 0; i < agents.length; i++) {
      ctx.beginPath(); ctx.arc(agents[i].gx, agents[i].gy, 3.5, 0, Math.PI * 2); ctx.stroke();
    }

    for (var p = 0; p < pulses.length; p++) {
      var t = pulses[p].t / 0.7;
      ctx.beginPath(); ctx.arc(pulses[p].x, pulses[p].y, 4 + t * 18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(' + COLORS.pulse + ',' + (0.6 * (1 - t)).toFixed(3) + ')'; ctx.stroke();
    }

    ctx.strokeStyle = COLORS.trail; ctx.lineWidth = 1.5; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var a = 0; a < agents.length; a++) {
      var tr = agents[a].trail;
      if (tr.length < 4) continue;
      ctx.beginPath(); ctx.moveTo(tr[0], tr[1]);
      for (var s = 2; s < tr.length; s += 2) ctx.lineTo(tr[s], tr[s + 1]);
      ctx.stroke();
    }

    ctx.fillStyle = COLORS.agent;
    for (var b = 0; b < agents.length; b++) {
      var ag = agents[b], ang = Math.atan2(ag.vy, ag.vx);
      ctx.save(); ctx.translate(ag.x, ag.y); ctx.rotate(ang);
      ctx.beginPath(); ctx.moveTo(6, 0); ctx.lineTo(-4, 3.6); ctx.lineTo(-2, 0); ctx.lineTo(-4, -3.6); ctx.closePath();
      ctx.fill(); ctx.restore();
    }
  }

  function frame(now) {
    var dt = Math.min((now - lastTime) / 1000, 1 / 20);
    lastTime = now;
    step(dt);
    draw();
    rafId = requestAnimationFrame(frame);
  }

  function shouldRun() { return onScreen && !document.hidden && !(reduceMotion && reduceMotion.matches); }

  function update() {
    if (shouldRun() && !running) {
      running = true; lastTime = performance.now(); rafId = requestAnimationFrame(frame);
    } else if (!shouldRun() && running) {
      running = false; cancelAnimationFrame(rafId); draw();
    }
  }

  function stillFrame() {
    // Advance the sim off screen so the still frame shows drones mid-flight.
    for (var i = 0; i < 180; i++) step(1 / 60);
    draw();
  }

  hero.addEventListener('pointermove', function (e) {
    var r = hero.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
  });
  hero.addEventListener('pointerleave', function () { pointer.active = false; });

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });
  document.addEventListener('visibilitychange', update);
  if (reduceMotion && reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () { update(); if (!running) stillFrame(); });
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { onScreen = entries[0].isIntersecting; update(); }).observe(hero);
  }
  // Web fonts can change the size of the text block once they load.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { measureTextBox(); clearGoalsFromText(); if (!running) draw(); });
  }

  resize();
  if (reduceMotion && reduceMotion.matches) stillFrame();
  update();
})();
