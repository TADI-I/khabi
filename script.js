// ═══ PAGE NAVIGATION ═══
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + name);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.classList.toggle('active-link', a.dataset.page === name);
  });
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').classList.remove('open');
  return false;
}

// ═══ MOBILE NAV TOGGLE ═══
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navToggle').classList.toggle('open');
});

// ═══ NAV SCROLL SHADOW ═══
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.boxShadow = window.scrollY > 10 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
});

// ═══ CONTACT FORM ═══
function submitForm() {
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  const note = document.getElementById('formNote');

  if (!name || !email || !message) {
    note.textContent = '⚠️ Please fill in your name, email, and message.';
    note.style.color = '#e05252';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    note.textContent = '⚠️ Please enter a valid email address.';
    note.style.color = '#e05252';
    return;
  }

  note.textContent = '✓ Thank you! Your enquiry has been received. We will be in touch shortly.';
  note.style.color = '#2a9d5c';

  ['fname','fcompany','femail','fphone','fservice','fmessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

// ═══ FADE-IN ON SCROLL ═══
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function initFadeObs() {
  document.querySelectorAll(
    '.service-card, .value-card, .csr-item, .market-card, .service-detail, ' +
    '.safety-pillar, .standard-card, .commitment-item, .accountability-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
initFadeObs();