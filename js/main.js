/* ==========================================================
   Portfolio Lilo — interactions
   ========================================================== */

// ----- Menu burger (mobile) -----
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ----- Apparition au scroll -----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ----- Accordéons des carnets (page SAÉ) -----
document.querySelectorAll('.carnet').forEach((carnet) => {
  const head = carnet.querySelector('.carnet-head');
  const body = carnet.querySelector('.carnet-body');
  if (!head || !body) return;

  const toggle = () => {
    const isOpen = carnet.classList.toggle('open');
    if (isOpen) {
      body.style.maxHeight = body.scrollHeight + 'px';
      body.addEventListener(
        'transitionend',
        () => { if (carnet.classList.contains('open')) body.style.maxHeight = 'none'; },
        { once: true }
      );
    } else {
      body.style.maxHeight = body.scrollHeight + 'px';
      void body.offsetHeight;
      body.style.maxHeight = '0px';
    }
  };

  head.addEventListener('click', toggle);
  head.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

// Ouvre automatiquement un carnet ciblé par l'URL (ex. sae.html#sae301)
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target && target.classList.contains('carnet')) {
    const body = target.querySelector('.carnet-body');
    target.classList.add('open');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 200);
  }
}

// ----- Carrousels médias -----
document.querySelectorAll('.carousel').forEach((car) => {
  const track = car.querySelector('.car-track');
  if (!track) return;
  const step = () => Math.max(track.clientWidth * 0.8, 260);
  const prev = car.querySelector('.car-btn.prev');
  const next = car.querySelector('.car-btn.next');
  if (prev) prev.addEventListener('click', (e) => {
    e.stopPropagation();
    track.scrollBy({ left: -step(), behavior: 'smooth' });
  });
  if (next) next.addEventListener('click', (e) => {
    e.stopPropagation();
    track.scrollBy({ left: step(), behavior: 'smooth' });
  });
});

// Met en pause les vidéos d'un carnet qu'on referme
document.querySelectorAll('.carnet').forEach((carnet) => {
  const head = carnet.querySelector('.carnet-head');
  if (!head) return;
  head.addEventListener('click', () => {
    if (!carnet.classList.contains('open')) {
      carnet.querySelectorAll('video').forEach((v) => v.pause());
    }
  });
});
