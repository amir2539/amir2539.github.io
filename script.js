/* ================================================
   AMIR TORKAMAN — PORTFOLIO SCRIPT
   ================================================ */

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

(function animFollow() {
  fx += (mx - fx) * 0.11;
  fy += (my - fy) * 0.11;
  cursorFollower.style.left = fx + 'px';
  cursorFollower.style.top  = fy + 'px';
  requestAnimationFrame(animFollow);
})();

document.querySelectorAll('a, button, .resume-doc, .ac, .edu-card, .ti-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-active'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-active'));
});

// ===== NAVBAR =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== MOBILE MENU =====
const burger    = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ===== TYPING ANIMATION =====
const roles = [
  'Golang Back-End Developer',
  'Blockchain Engineer',
  'Stellar Network Developer',
  'API & Systems Architect',
  'Payment Systems Builder',
];
const typedEl = document.getElementById('typedRole');
let ri = 0, ci = 0, del = false;

function type() {
  const role = roles[ri];
  if (!del) {
    typedEl.textContent = role.slice(0, ci + 1);
    ci++;
    if (ci === role.length) { del = true; setTimeout(type, 2200); return; }
  } else {
    typedEl.textContent = role.slice(0, ci - 1);
    ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 42 : 78);
}
setTimeout(type, 700);


// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('vis');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

document.querySelectorAll('.r').forEach(el => revealObs.observe(el));

// ===== MODAL =====
const modal       = document.getElementById('modal');
const modalBg     = document.getElementById('modalBg');
const modalClose  = document.getElementById('modalClose');
const resumeFrame = document.getElementById('resumeFrame');
const previewBtn  = document.getElementById('previewBtn');
const resumeCard  = document.getElementById('resumeCard');
let frameLoaded   = false;

function openModal() {
  if (!frameLoaded) {
    // Load PDF lazily on first open; append params to suppress browser toolbar
    resumeFrame.src = 'Amir_Torkaman_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1';
    frameLoaded = true;
  }
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

if (previewBtn) previewBtn.addEventListener('click', e => { e.stopPropagation(); openModal(); });
if (resumeCard) resumeCard.addEventListener('click', openModal);
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalBg)    modalBg.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nl');

const activeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.style.color = '');
      const link = document.querySelector(`.nl[href="#${e.target.id}"]`);
      if (link && !link.classList.contains('nl--cta')) link.style.color = 'var(--t1)';
    }
  });
}, { rootMargin: '-38% 0px -38% 0px' });

sections.forEach(s => activeObs.observe(s));
