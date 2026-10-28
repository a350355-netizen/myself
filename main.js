/* ========================================
   蔡雨潔 Personal Website - main.js
   ======================================== */

// ── Particles ──────────────────────────────────────────────
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#a78bfa', '#60a5fa', '#34d399', '#f472b6', '#fbbf24'];
  const count = 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 15;

    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${left}%;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;
    container.appendChild(p);
  }
})();


// ── Navbar Scroll ──────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});


// ── Active Nav Highlight ────────────────────────────────────
const sections = ['hero', 'about', 'skills', 'interests', 'goals', 'contact'];

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(id => {
    const section = document.getElementById(id);
    const navLink = document.getElementById(`nav-${id}`);
    if (!section || !navLink) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}


// ── Hamburger Menu ──────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ── Typewriter Effect ───────────────────────────────────────
const phrases = [
  '數位商管跨領域學習者 📚',
  '電子商務愛好者 🛒',
  '智慧科技探索者 🤖',
  '南山中學優秀學生 🎓',
  '未來的全方位商管人才 🚀',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function type() {
  const el = document.getElementById('heroTypewriter');
  if (!el) return;

  const current = phrases[phraseIndex];

  if (isDeleting) {
    el.textContent = current.slice(0, charIndex--);
  } else {
    el.textContent = current.slice(0, charIndex++);
  }

  let delay = isDeleting ? 50 : 90;

  if (!isDeleting && charIndex === current.length + 1) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    charIndex = 0;
    delay = 400;
  }

  typeTimeout = setTimeout(type, delay);
}

// Start after hero animation
setTimeout(type, 1500);


// ── Scroll-triggered Animations (Intersection Observer) ────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delay || 0;
        setTimeout(() => {
          el.classList.add('in-view');
          // Animate skill bars
          const bar = el.querySelector('.skill-bar');
          if (bar) bar.classList.add('animated');
        }, delay);
        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Assign staggered delays and observe
document.querySelectorAll('.card-animate').forEach((el, i) => {
  el.dataset.delay = (i % 4) * 100;
  observer.observe(el);
});


// ── Contact Form ────────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const success = document.getElementById('formSuccess');

  // Loading state
  btnText.textContent = '⏳ 傳送中...';
  btn.disabled = true;

  setTimeout(() => {
    btnText.textContent = '✉️ 送出留言';
    btn.disabled = false;
    success.style.display = 'block';
    document.getElementById('contactForm').reset();

    setTimeout(() => {
      success.style.display = 'none';
    }, 5000);
  }, 1200);
}


// ── Smooth scroll for anchor links ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ── Tilt effect on hero avatar ──────────────────────────────
const heroAvatarWrap = document.querySelector('.hero-avatar-wrap');
if (heroAvatarWrap) {
  document.addEventListener('mousemove', (e) => {
    const rect = heroAvatarWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / 20;
    const dy = (e.clientY - cy) / 20;
    heroAvatarWrap.style.transform = `perspective(600px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    heroAvatarWrap.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
  });
}


// ── Easter Egg: Konami Code ─────────────────────────────────
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konami.length) {
      konamiIndex = 0;
      showEasterEgg();
    }
  } else {
    konamiIndex = 0;
  }
});

function showEasterEgg() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    color: white; font-size: 1.5rem; font-weight: 700;
    padding: 2rem 3rem; border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    z-index: 9999; text-align: center;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    font-family: 'Noto Sans TC', sans-serif;
  `;
  msg.innerHTML = '🎉 你找到彩蛋了！<br><small style="font-size:0.9rem;opacity:0.8">蔡雨潔 加油！未來可期✨</small>';
  document.body.appendChild(msg);
  requestAnimationFrame(() => { msg.style.transform = 'translate(-50%, -50%) scale(1)'; });
  setTimeout(() => {
    msg.style.transform = 'translate(-50%, -50%) scale(0)';
    setTimeout(() => msg.remove(), 400);
  }, 3500);
}


// ── Page Load ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Add initial animation to hero elements that are already visible
  updateActiveNav();
});

console.log('%c蔡雨潔的個人網站 ✦', 'color: #a78bfa; font-size: 18px; font-weight: bold;');
console.log('%c數位商管跨領域人才 | 南山中學', 'color: #60a5fa; font-size: 13px;');
console.log('%c試試 Konami Code: ↑↑↓↓←→←→BA', 'color: #34d399; font-size: 11px;');
