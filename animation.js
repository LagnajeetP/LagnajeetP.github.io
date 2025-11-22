const canvas = document.getElementById("matrix");
const ctx    = canvas.getContext("2d");

canvas.width  = innerWidth;
canvas.height = innerHeight;

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%";
const matrixChars = chars.split("");

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  drops.forEach((yPos, index) => {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    const x = index * fontSize;
    ctx.fillText(text, x, yPos * fontSize);

    if (yPos * fontSize > canvas.height && Math.random() > 0.975) {
      drops[index] = 0;
    }
    drops[index]++;
  });
}

setInterval(draw, 50);

window.addEventListener("resize", () => {
  canvas.width  = innerWidth;
  canvas.height = innerHeight;
  const newColumns = Math.floor(canvas.width / fontSize);
  if (newColumns !== columns) {
    drops.length = newColumns;
    drops.fill(1);
  }
});

// Smooth scrolling for all anchor links (navigation and buttons)
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupSmoothScrolling);
} else {
  setupSmoothScrolling();
}

// Update active navigation link on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}` || 
        (current === 'home' && (link.getAttribute('href') === '#' || link.getAttribute('href') === '#home'))) {
      link.classList.add('active');
    }
  });
}

// Wait for DOM to be ready before setting up scroll listeners
function setupScrollListeners() {
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav(); // Call once on load
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupScrollListeners);
} else {
  setupScrollListeners();
}

// Handle form submission
function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! (This is a demo form - functionality can be connected to a backend)');
      this.reset();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
  setupContactForm();
}
