/* ─────────────────────────────────────────────
   HUD Canvas — Particle Network + Hex Grid
   ───────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hud-canvas');
  const ctx    = canvas.getContext('2d');

  let W, H, particles, mouse = { x: null, y: null };

  const COUNT    = 70;
  const MAX_DIST = 160;
  const MOUSE_R  = 200;
  const HEX_SIZE = 55;
  const CYAN     = '0, 200, 255';

  /* ── Init ── */
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildParticles();
  }

  function buildParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r:  Math.random() * 1.4 + 0.4,
      a:  Math.random() * 0.35 + 0.08,
    }));
  }

  /* ── Hex grid ── */
  function drawHexGrid() {
    const hh = HEX_SIZE * Math.sqrt(3);
    ctx.strokeStyle = `rgba(${CYAN}, 0.028)`;
    ctx.lineWidth   = 0.5;
    const cols = Math.ceil(W / (HEX_SIZE * 1.5)) + 2;
    const rows = Math.ceil(H / hh) + 2;
    for (let c = -1; c < cols; c++) {
      for (let r = -1; r < rows; r++) {
        const cx = c * HEX_SIZE * 1.5;
        const cy = r * hh + (c % 2 === 0 ? 0 : hh / 2);
        hexPath(cx, cy, HEX_SIZE);
        ctx.stroke();
      }
    }
  }

  function hexPath(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      i === 0
        ? ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a))
        : ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
    ctx.closePath();
  }

  /* ── Render loop ── */
  function frame() {
    ctx.clearRect(0, 0, W, H);
    drawHexGrid();

    /* update + draw particles */
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      /* subtle mouse repel */
      if (mouse.x !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_R) {
          const f = (1 - d / MOUSE_R) * 0.015;
          p.vx += dx * f;
          p.vy += dy * f;
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 1.2) { p.vx /= speed / 1.2; p.vy /= speed / 1.2; }
        }
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CYAN}, ${p.a})`;
      ctx.fill();
    });

    /* connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.11;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CYAN}, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(frame);
  }

  /* ── Events ── */
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  resize();
  frame();
})();
