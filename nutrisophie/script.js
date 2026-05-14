// Nav scroll effect
const header = document.getElementById('header');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  scrollTop.classList.toggle('visible', window.scrollY > 400);

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(s => {
    const link = document.querySelector(`.nav__link[href="#${s.id}"]`);
    if (!link) return;
    const inView = scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.offsetHeight;
    link.classList.toggle('active', inView);
  });
});

// Fade-in observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Mobile menu
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Contact form
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.style.display = 'none';
    formSuccess.style.display = 'flex';
  });
}
