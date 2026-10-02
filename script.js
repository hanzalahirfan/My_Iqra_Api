/* ===== CONTENT (edit freely) ===== */
const DATA = {
  steps: ['Colleagues', 'Conversations', 'Trust', 'Guidance', 'Memories', 'Family'],
  cards: [
    ['🌿', 'Strength', "You taught me that strength isn't always loud. Sometimes it looks like quietly carrying responsibilities and still showing up every day."],
    ['🕯️', 'Consistency', "You keep moving even when life isn't easy. Your consistency is one of the things I admire most."],
    ['🏡', 'Responsibility', 'You care deeply about your family and keep doing so much for the people around you.'],
    ['📚', 'Professionalism', 'The way you handle your work, guide others, and carry yourself has always impressed me.'],
    ['🌙', 'Maturity', 'You have a maturity that makes people feel safe asking you for guidance.'],
    ['🌸', 'Courage', 'You have faced hurdles while continuing to move forward. That courage deserves to be recognized.'],
    ['☕', 'Care', 'You somehow care for other people while carrying your own responsibilities.'],
    ['🧸', 'Innocence', 'And despite all that strength, there is still a wonderfully innocent, cute side of you that makes you even more special.']
  ],
  chapters: [
    ['The First Meeting', 'We met at The Educators. Nothing extraordinary seemed to be happening yet.'],
    ['Getting to Know Each Other', 'Conversations slowly became familiar.'],
    ['The Guidance', 'You became one of the people I could learn from and ask for help.'],
    ['The Little Moments', 'Some memories were not big events. They were ordinary days that became special because you were there.'],
    ['Api', "Somewhere along the way, 'colleague' wasn't enough anymore."],
    ['Bhai-Bhehen', 'And the relationship became something much more meaningful.'],
    ['Even After Leaving', "I may not work at The Educators anymore, but leaving the workplace didn't erase the bond."]
  ],
  report: [
    ['Kindness', 100, '100%'], ['Strength', 100, '100%'], ['Professionalism', 100, '100%'], ['Cuteness', 100, '1000%'],
    ['Guidance', 100, 'Unlimited'], ['Patience', 70, 'Loading…'], ['Innocence', 95, 'Suspiciously high 😄'], ['Big Sister Energy', 100, 'MAXIMUM']
  ],
  duas: [
    'May Allah protect you wherever life takes you.',
    'May Allah put barakah in your time, work, health, family, and future.',
    'May Allah replace every difficult chapter with something more beautiful.',
    'May Allah give you success that brings peace, not just achievement.',
    'May Allah surround you with people who genuinely value you.',
    'May Allah bless your family because of the countless things you do for them.',
    'May Allah give you a spouse who understands your heart, respects your dreams, supports your responsibilities, and becomes a source of peace for you.',
    'May Allah grant you the things you have silently prayed for.',
    'And may He give you even more than you asked for.'
  ],
  thanks: ['Thank you for guiding me.', 'Thank you for believing in people.', 'Thank you for being strong.', 'Thank you for being kind.',
    'Thank you for being my Api.', 'Thank you for the memories.', 'Thank you for being someone I could look up to.', 'Thank you for simply being you.'],
  thanksEnd: 'I could keep going forever…'
};

/* ===== HELPERS ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');

/* ===== RENDER LISTS ===== */
$('#steps').innerHTML = DATA.steps.map((s, i) => `<li class="rv" style="--d:${i * .15}s">${s}</li>`).join('');
$('#cards').innerHTML = DATA.cards.map(([ic, t, p], i) => `<div class="card rv" style="--d:${(i % 4) * .1}s"><span class="ic" aria-hidden="true">${ic}</span><b>${t}</b><p>${p}</p></div>`).join('');
$('#tl').innerHTML = DATA.chapters.map(([t, p], i) => `<li class="rv"><small>Chapter 0${i + 1}</small><b>${t}</b>${p}<!-- OPTIONAL PHOTO HERE: add <img src="assets/photo${i + 1}.jpg" alt="..."> --></li>`).join('');
$('#report').innerHTML = DATA.report.map(([l, w, v]) => `<div class="m"><span>${l}</span><i style="--w:${w}%"></i><em>${v}</em></div>`).join('');
$('#duaList').innerHTML = DATA.duas.map((d, i) => `<div class="card rv" style="--d:${(i % 3) * .12}s">${d}</div>`).join('');

/* ===== PARTICLES (single canvas, no DOM spam) ===== */
const cv = $('#fx'), cx = cv.getContext('2d');
let P = [], running = false;
function fit() { const d = devicePixelRatio || 1; cv.width = innerWidth * d; cv.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); }
fit(); addEventListener('resize', fit);
const COLORS = ['#e9889a', '#c9a0dc', '#f9cdb0', '#c9a45c', '#fff3b0', '#f6d9d6'];
function burst(x, y, n, kind = 'confetti', opt = {}) {
  if (RM) n = Math.min(n, 6);
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, s = (opt.speed || 6) * (.3 + Math.random());
    P.push({ x, y, vx: opt.rain ? (Math.random() - .5) * 2 : Math.cos(a) * s, vy: opt.rain ? 2 + Math.random() * 3 : Math.sin(a) * s - (opt.up ? 3 : 0),
      g: opt.up ? -.02 : .12, life: 1, decay: .006 + Math.random() * .01, size: 8 + Math.random() * 10, kind, c: opt.color || COLORS[i % COLORS.length], r: Math.random() * 6, vr: (Math.random() - .5) * .3 });
  }
  if (!running) { running = true; requestAnimationFrame(tick); }
}
function tick() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  P = P.filter(p => p.life > 0 && p.y < innerHeight + 30);
  for (const p of P) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.life -= p.decay; p.r += p.vr;
    cx.globalAlpha = Math.max(p.life, 0); cx.fillStyle = p.c;
    if (p.kind === 'confetti') { cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r); cx.fillRect(-p.size / 4, -p.size / 2, p.size / 2, p.size); cx.restore(); }
    else if (p.kind === 'spark') { cx.beginPath(); cx.arc(p.x, p.y, 2.2, 0, 7); cx.fill(); }
    else { cx.font = p.size + 'px serif'; cx.fillText(p.kind === 'heart' ? '♥' : '✦', p.x, p.y); }
  }
  cx.globalAlpha = 1;
  if (P.length) requestAnimationFrame(tick); else { running = false; cx.clearRect(0, 0, innerWidth, innerHeight); }
}
const rise = (el, kind = 'heart', n = 5) => { const r = el.getBoundingClientRect(); burst(r.left + r.width / 2, r.top + r.height / 2, n, kind, { speed: 2, up: true }); };
const rain = () => burst(innerWidth / 2, -10, 120, 'confetti', { rain: true });

/* ===== LOADER → GIFT ===== */
const loader = $('#loader'), giftScreen = $('#giftScreen');
let loaded = false;
function endLoader() {
  if (loaded) return; loaded = true;
  giftScreen.hidden = false; loader.classList.add('gone');
  setTimeout(() => loader.remove(), 1100);
}
$('#skip').onclick = endLoader;
setTimeout(endLoader, RM ? 800 : 5200);

/* ===== GIFT OPENING ===== */
const gift = $('#gift');
function openGift() {
  if (gift.classList.contains('open')) return;
  gift.classList.add('open');
  const r = gift.getBoundingClientRect();
  setTimeout(() => { burst(r.left + r.width / 2, r.top + r.height / 2, 70, 'spark', { speed: 9, color: '#ffd36b' }); burst(r.left + r.width / 2, r.top + r.height / 2, 60, 'confetti', { speed: 9 }); }, 600);
  setTimeout(() => {
    giftScreen.classList.add('gone'); $('#main').hidden = false; $('#nav').hidden = false; $('#music').hidden = false;
    document.body.classList.remove('locked'); scrollTo(0, 0); observe(); rain();
    setTimeout(() => giftScreen.remove(), 1100);
  }, 1900);
}
gift.onclick = $('#openGift').onclick = openGift;

/* ===== REVEAL, NAV, PROGRESS, NIGHT SKY ===== */
function observe() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: .2 });
  $$('.rv, .report').forEach(el => io.observe(el));
  const links = $$('#nav a'), secs = links.map(a => $(a.getAttribute('href')));
  const nio = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => s && nio.observe(s));
  new IntersectionObserver(es => document.body.classList.toggle('night', es[0].isIntersecting), { threshold: .15 }).observe($('#final'));
}
addEventListener('scroll', () => {
  const h = document.documentElement; $('#bar').style.width = (scrollY / (h.scrollHeight - innerHeight || 1) * 100) + '%';
}, { passive: true });
$('#menu').onclick = () => { const n = $('#nav'); n.classList.toggle('open'); $('#menu').setAttribute('aria-expanded', n.classList.contains('open')); };
$$('#nav a').forEach(a => a.addEventListener('click', () => $('#nav').classList.remove('open')));

/* ===== MICRO-INTERACTIONS ===== */
$('#nameHover').addEventListener('mouseenter', e => rise(e.currentTarget, 'heart', 6));
$$('.card').forEach(c => {   // soft card tilt (mouse only)
  c.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || RM) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty('--ry', ((e.clientX - r.left) / r.width - .5) * 8 + 'deg');
    c.style.setProperty('--rx', (.5 - (e.clientY - r.top) / r.height) * 8 + 'deg');
  });
  c.addEventListener('pointerleave', () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); });
});
$$('.tl li').forEach(li => li.addEventListener('mouseenter', () => rise(li, 'star', 3)));
$('#amen').onclick = e => rise(e.currentTarget, 'star', 14);

/* ===== HEART ===== */
let hi = 0;
$('#heart').onclick = e => {
  const t = $('#thanks'); rise(e.currentTarget, 'heart', 6);
  t.textContent = hi < DATA.thanks.length ? DATA.thanks[hi] : DATA.thanksEnd; hi++;
  if (hi > DATA.thanks.length) hi = DATA.thanks.length;
};

/* ===== CAKE ===== */
let blown = 0;
$$('.candle').forEach(c => c.onclick = () => {
  if (c.classList.contains('out')) return;
  c.classList.add('out'); blown++;
  if (blown === 3) {
    const cake = $('#cake'); cake.classList.add('done');
    const r = cake.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, 60, 'star', { speed: 7, color: '#ffd36b' }); rain();
    $('#wishText').textContent = 'May every sincere wish in your heart find its way to you, InshaAllah.';
  }
});

/* ===== FINAL SURPRISE ===== */
let fw;
$('#surprise').onclick = () => {
  $('#party').hidden = false; cv.style.zIndex = 95; rain();
  const shoot = () => burst(innerWidth * (.15 + Math.random() * .7), innerHeight * (.15 + Math.random() * .4), 50, 'spark', { speed: 8, color: COLORS[Math.floor(Math.random() * COLORS.length)] });
  const float = () => burst(Math.random() * innerWidth, innerHeight + 10, 4, Math.random() > .5 ? 'heart' : 'star', { speed: 2, up: true });
  fw = setInterval(() => { shoot(); float(); }, 800);
  $('#closeParty').focus();
};
$('#closeParty').onclick = () => { clearInterval(fw); $('#party').hidden = true; cv.style.zIndex = 60; };
addEventListener('keydown', e => { if (e.key === 'Escape' && !$('#party').hidden) $('#closeParty').click(); });

/* ===== MUSIC (never autoplays; safe if file is missing) ===== */
const audio = $('#audio'), mBtn = $('#music');
audio.addEventListener('error', () => { mBtn.disabled = true; mBtn.title = 'Add assets/music.mp3 to enable music'; });
mBtn.onclick = () => {
  if (audio.paused) audio.play().then(() => mBtn.setAttribute('aria-pressed', 'true')).catch(() => { mBtn.disabled = true; });
  else { audio.pause(); mBtn.setAttribute('aria-pressed', 'false'); }
};

/* ===== EASTER EGG & FOOTER ===== */
let eg = 0;
$('#egg').onclick = e => {
  rise(e.currentTarget, 'heart', 3); eg++;
  if (eg === 5) $('#eggMsg').textContent = 'You found the secret message. Your Bhai really does appreciate you more than this website can explain.';
};
$('#year').textContent = new Date().getFullYear();

/* ===== CURSOR SPARKLE TRAIL (desktop, mouse only) ===== */
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !RM) {
  let last = 0;
  addEventListener('pointermove', e => { const n = performance.now(); if (n - last > 90) { last = n; burst(e.clientX, e.clientY, 1, 'spark', { speed: .8, color: '#e6c58a' }); } }, { passive: true });
}
