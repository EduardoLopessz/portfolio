// =========================================================
// Ano no rodapé
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Menu mobile
// =========================================================
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

navToggle.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Nav ativa conforme scroll (IntersectionObserver)
// =========================================================
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('[data-nav]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(section => navObserver.observe(section));

// =========================================================
// HUD: status rotativo (estilo Discord "jogando / ouvindo / assistindo")
// =========================================================
const statuses = [
  'jogando Valorant',
  'jogando CS',
  'jogando Fortnite',
  'ouvindo Spotify',
  'assistindo One Piece',
  'assistindo Naruto',
  'codando um novo projeto'
];
let statusIndex = 0;
const hudStatus = document.getElementById('hudStatus');

if (hudStatus) {
  setInterval(() => {
    statusIndex = (statusIndex + 1) % statuses.length;
    hudStatus.style.opacity = 0;
    setTimeout(() => {
      hudStatus.textContent = statuses[statusIndex];
      hudStatus.style.opacity = 1;
    }, 250);
  }, 2600);
}

// =========================================================
// Skills: anima as barras quando entram na tela
// =========================================================
const skillFills = document.querySelectorAll('.skill__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-filled');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

skillFills.forEach(fill => skillObserver.observe(fill));
