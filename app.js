// Gravionix Client Interaction Logic

// ── Header Scroll Effect ──
window.addEventListener('scroll', () => {
  const hdr = document.getElementById('hdr');
  if (window.scrollY > 30) {
    hdr?.classList.add('scrolled');
  } else {
    hdr?.classList.remove('scrolled');
  }
});

// ── Mobile Menu Toggle ──
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  burger?.classList.toggle('active');
  mobileMenu?.classList.toggle('open');
}

burger?.addEventListener('click', toggleMobileMenu);

// ── Toast Notification ──
function showToast(message) {
  const toast = document.getElementById('toastMsg');
  if (toast) {
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }
}

// ── Contact Form Submission ──
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  showToast(`Thank you, ${name}! Your message has been received. We'll reply to ${email} shortly.`);
  e.target.reset();
}

// ── Scroll Reveal Intersection Observer ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -30px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tier, .help-row, .eng-side').forEach(el => {
    el.classList.add('rv');
    revealObserver.observe(el);
  });
});
