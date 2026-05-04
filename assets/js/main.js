/* ─────────────────────────────────────────────
   Main — Nav, Typewriter, Scroll, Boot
   ───────────────────────────────────────────── */

/* ── Typewriter ─────────────────────────────── */
const ROLES = [
  'Machine Learning Engineer',
  'Robotics Researcher @ BAIR',
  'Full-Stack Software Engineer',
  'EECS @ UC Berkeley',
  'AI Systems Builder',
];

let rIdx = 0, cIdx = 0, deleting = false;
const typeEl = document.getElementById('typewriter-text');

function typewrite() {
  if (!typeEl) return;
  const word = ROLES[rIdx];
  typeEl.textContent = deleting ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);

  if (!deleting && cIdx === word.length) {
    deleting = true;
    setTimeout(typewrite, 1800);
    return;
  }
  if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % ROLES.length;
  }
  setTimeout(typewrite, deleting ? 38 : 68);
}

/* ── Scroll Reveal ──────────────────────────── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 90);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Navbar ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

function updateNav() {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(l =>
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`)
  );
}

window.addEventListener('scroll', updateNav, { passive: true });

/* ── Smooth Scroll ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    (target || document.body).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── Boot Sequence → start typewriter ───────── */
window.addEventListener('DOMContentLoaded', () => {
  updateNav();
  /* boot overlay fades at 3.2s via CSS; start typewriter just after */
  setTimeout(typewrite, 3600);
});
