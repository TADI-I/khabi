// ═══ PAGE NAVIGATION ═══
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').classList.remove('open');
  window.scrollTo(0, 0);
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

// ═══ GALLERY FILTER ═══
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ═══ GALLERY LIGHTBOX ═══
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img || item.querySelector('.img-placeholder')) return;
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCaption = document.getElementById('lightboxCaption');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}