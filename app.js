// Gravionix Interactive Engine Logic

// ── Theme Switcher ──
function setTheme(theme) {
  document.body.classList.remove('theme-cyan', 'theme-sunset');
  document.querySelectorAll('.theme-pill').forEach(pill => pill.classList.remove('active'));

  if (theme === 'cyan') {
    document.body.classList.add('theme-cyan');
    document.querySelector('.theme-pill.p-cyan')?.classList.add('active');
  } else if (theme === 'sunset') {
    document.body.classList.add('theme-sunset');
    document.querySelector('.theme-pill.p-sunset')?.classList.add('active');
  } else {
    document.querySelector('.theme-pill.p-violet')?.classList.add('active');
  }

  localStorage.setItem('gravionix_theme', theme);
}

// Check saved theme preference
const savedTheme = localStorage.getItem('gravionix_theme');
if (savedTheme) {
  setTheme(savedTheme);
}

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

// ── Interactive ROI Simulator ──
function calculateROI() {
  const revInput = document.getElementById('revInput');
  const liftInput = document.getElementById('liftInput');
  const revVal = document.getElementById('revVal');
  const liftVal = document.getElementById('liftVal');

  const projectedRev = document.getElementById('projectedRev');
  const annualPipeline = document.getElementById('annualPipeline');
  const paybackPeriod = document.getElementById('paybackPeriod');

  if (!revInput || !liftInput) return;

  const currentRev = parseFloat(revInput.value);
  const multiplier = parseFloat(liftInput.value);

  // Update slider labels
  revVal.textContent = '$' + currentRev.toLocaleString() + ' / mo';
  liftVal.textContent = multiplier.toFixed(1) + '× Growth';

  // Projected Monthly Rev
  const newMonthlyRev = currentRev * multiplier;
  projectedRev.textContent = '$' + Math.round(newMonthlyRev).toLocaleString();

  // Annual Net Pipeline Expansion
  const addedAnnualRev = (newMonthlyRev - currentRev) * 12;
  if (addedAnnualRev >= 1000000) {
    annualPipeline.textContent = '$' + (addedAnnualRev / 1000000).toFixed(2) + 'M';
  } else {
    annualPipeline.textContent = '$' + Math.round(addedAnnualRev).toLocaleString();
  }

  // Payback period estimate
  if (multiplier >= 4) {
    paybackPeriod.textContent = 'Under 12 Days';
  } else if (multiplier >= 2.5) {
    paybackPeriod.textContent = 'Under 21 Days';
  } else {
    paybackPeriod.textContent = 'Under 35 Days';
  }
}

// Initialize ROI Simulator on load
calculateROI();

// ── Modals Handling ──
function openBookingModal(serviceName) {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('open');
    if (serviceName) {
      const select = document.getElementById('mBudget');
      // If service provided, customize title or placeholder
    }
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal?.classList.remove('open');
}

function openVideoModal(clientName, role, caseBody) {
  const modal = document.getElementById('videoModal');
  const title = document.getElementById('videoModalTitle');
  const roleEl = document.getElementById('videoModalRole');
  const bodyEl = document.getElementById('videoModalBody');

  if (title) title.textContent = clientName;
  if (roleEl) roleEl.textContent = role;
  if (bodyEl) bodyEl.textContent = caseBody;

  modal?.classList.add('open');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  modal?.classList.remove('open');
}

// Close modal on click outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// Close modal on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeVideoModal();
    if (mobileMenu?.classList.contains('open')) {
      toggleMobileMenu();
    }
  }
});

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

// ── Form Submissions ──
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  showToast(`Thank you, ${name}! Your Gravionix Strategy Roadmap is reserved.`);
  e.target.reset();
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('mName').value;
  closeBookingModal();
  showToast(`Strategy Session booked for ${name}! Check your inbox for the calendar invite.`);
  e.target.reset();
}

// ── FAQ Accordion Toggle ──
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  const wasActive = item.classList.contains('active');

  // Close all other items
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

  // Toggle clicked
  if (!wasActive) {
    item.classList.add('active');
  }
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
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.rv, .tier, .vcard, .help-row').forEach(el => {
    el.classList.add('rv');
    revealObserver.observe(el);
  });
});
