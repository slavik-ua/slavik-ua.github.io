'use strict';
const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
let explicitTheme;
try { explicitTheme = localStorage.getItem('portfolio-theme'); } catch {}
function applyTheme() {
  const theme = ['light', 'dark'].includes(explicitTheme) ? explicitTheme : systemTheme.matches ? 'dark' : 'light';
  root.dataset.theme = theme;
  themeButton.querySelector('use').setAttribute('href', theme === 'dark' ? '#i-sun' : '#i-moon');
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeButton.title = themeButton.getAttribute('aria-label');
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0a0a0c' : '#faf9f6';
}
applyTheme();
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  explicitTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', explicitTheme); } catch {}
  applyTheme();
});
systemTheme.addEventListener('change', applyTheme);
addEventListener('storage', event => { if (event.key === 'portfolio-theme' || event.key === null) { explicitTheme = event.newValue; applyTheme(); } });
function clipboard(buttonId, statusId, getText, message) {
  const button = document.querySelector(buttonId), status = document.querySelector(statusId);
  if (!navigator.clipboard || !isSecureContext) return;
  button.hidden = false;
  if (buttonId === '#copy-profile') button.parentElement.hidden = false;
  let timer;
  const dismiss = () => { clearTimeout(timer); status.textContent = ''; };
  button.addEventListener('click', async () => {
    dismiss(); button.disabled = true;
    try { await navigator.clipboard.writeText(await getText()); status.textContent = message; }
    catch { status.textContent = 'Copy unavailable. Use the text profile or email link.'; }
    finally { button.disabled = false; timer = setTimeout(dismiss, 3000); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') dismiss(); });
  document.addEventListener('click', e => { if (!button.parentElement.contains(e.target)) dismiss(); });
}
clipboard('#copy-profile', '#profile-status', async () => { const res = await fetch('llms.txt'); if (!res.ok) throw Error(); return res.text(); }, 'Profile and source links copied.');
clipboard('#copy-email', '#copy-status', async () => 'detsykvyacheslav@gmail.com', 'Email address copied.');
document.querySelector('#year').textContent = new Date().getFullYear();
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const timeouts = new Set();
function later(fn, delay) { const id = setTimeout(() => { timeouts.delete(id); fn(); }, delay); timeouts.add(id); return id; }
const typeLine = document.querySelector('#type-line');
const phrases = ['backend systems', 'network protocols', 'performance'];
let phrase = 0;
let profileVisible = false;
let profileInitialized = false;
function typeNext() {
  if (motion.matches || document.hidden || !profileVisible) return;
  phrase = (phrase + 1) % phrases.length;
  const text = phrases[phrase]; let at = 0;
  typeLine.textContent = '';
  const type = () => { typeLine.textContent = text.slice(0, ++at); if (at < text.length) later(type, 65); else later(typeNext, 4200); };
  type();
}
function resetMotion() { timeouts.forEach(clearTimeout); timeouts.clear(); typeLine.textContent = phrases[phrase]; document.querySelectorAll('.boot-entry').forEach(e => e.style.opacity = ''); if (!motion.matches && !document.hidden && profileVisible) later(typeNext, 4500); }
document.addEventListener('visibilitychange', resetMotion);
motion.addEventListener('change', resetMotion);
resetMotion();
new IntersectionObserver(entries => {
  profileVisible = entries[0].isIntersecting;
  resetMotion();
  if (profileVisible && !profileInitialized) {
    profileInitialized = true;
    if (!motion.matches) document.querySelectorAll('.boot-entry').forEach((line, i) => { line.style.opacity = '0'; later(() => { line.style.opacity = ''; }, 150 + i * 190); });
  }
}, { threshold: .15 }).observe(document.querySelector('.profile-scene'));
for (const element of document.querySelectorAll('[data-scramble]')) {
  const text = element.textContent;
  if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', text.replace(/[\[\]]/g, '').trim());
  const visual = document.createElement('span'); visual.setAttribute('aria-hidden', 'true'); visual.textContent = text; element.replaceChildren(visual);
  let running = false;
  const scramble = () => {
    if (motion.matches || running) return;
    running = true; let step = 0; const glyphs = '!<>-_[]{}=+*?#0123456789';
    const tick = () => {
      if (motion.matches || document.hidden) { visual.textContent = text; running = false; return; }
      visual.textContent = [...text].map((char, i) => i < step / 2 || char === ' ' || i === 0 || i === text.length - 1 ? char : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
      step++;
      if (step <= text.length * 2) setTimeout(tick, 24);
      else { visual.textContent = text; running = false; }
    }; tick();
  };
  element.addEventListener('pointerenter', scramble); element.addEventListener('focus', scramble);
}

const shortcutElements = [...document.querySelectorAll('[data-shortcut]')];
const shortcutLinks = new Map(shortcutElements.map(link => [link.dataset.shortcut, link]));
const shortcutToggle = document.querySelector('#shortcut-toggle');
const sections = [...document.querySelectorAll('main section[id]')];
let sectionDestination = null;
for (const event of ['wheel', 'touchstart', 'pointerdown', 'click', 'popstate']) {
  addEventListener(event, () => { sectionDestination = null; }, { passive: true });
}
let shortcutsEnabled = true;
try { shortcutsEnabled = localStorage.getItem('portfolio-shortcuts') !== 'off'; } catch {}
function applyShortcuts() {
  shortcutToggle.hidden = false;
  shortcutToggle.textContent = `Shortcuts: ${shortcutsEnabled ? 'on' : 'off'}`;
  shortcutToggle.setAttribute('aria-pressed', String(shortcutsEnabled));
  shortcutToggle.title = shortcutsEnabled ? 'Turn off keyboard navigation (letters and ↑/↓)' : 'Turn on keyboard navigation (letters and ↑/↓)';
  if (shortcutsEnabled) document.querySelector('main').setAttribute('aria-keyshortcuts', 'ArrowUp ArrowDown');
  else document.querySelector('main').removeAttribute('aria-keyshortcuts');
  document.querySelectorAll('.shortcut-key').forEach(key => { key.hidden = !shortcutsEnabled; });
  for (const link of shortcutElements) {
    const label = link.dataset.shortcutLabel;
    if (shortcutsEnabled) link.setAttribute('aria-keyshortcuts', link.dataset.shortcut.toUpperCase());
    else link.removeAttribute('aria-keyshortcuts');
    link.title = shortcutsEnabled ? `${label} (${link.dataset.shortcut.toUpperCase()})` : label;
  }
}
applyShortcuts();
shortcutToggle.addEventListener('click', () => {
  shortcutsEnabled = !shortcutsEnabled;
  try { localStorage.setItem('portfolio-shortcuts', shortcutsEnabled ? 'on' : 'off'); } catch {}
  applyShortcuts();
});
addEventListener('storage', event => {
  if (event.key === 'portfolio-shortcuts' || event.key === null) {
    shortcutsEnabled = event.newValue !== 'off';
    applyShortcuts();
  }
});
document.addEventListener('keydown', event => {
  if (['PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) sectionDestination = null;
  if (!shortcutsEnabled || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.repeat || event.isComposing || event.defaultPrevented) return;
  if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    if (event.target instanceof Element && event.target.closest('summary, [role="slider"], [role="combobox"], [role="spinbutton"]')) return;
    const current = sectionDestination || sections.reduce((active, section) => section.getBoundingClientRect().top <= innerHeight * .3 ? section : active, sections[0]);
    const index = sections.indexOf(current) + (event.key === 'ArrowDown' ? 1 : -1);
    const target = sections[Math.max(0, Math.min(sections.length - 1, index))];
    event.preventDefault();
    location.hash = target.id;
    target.scrollIntoView({ block: 'start' });
    target.focus({ preventScroll: true });
    sectionDestination = target;
    return;
  }
  const link = shortcutLinks.get(event.key.toLowerCase());
  if (!link) return;
  event.preventDefault();
  link.click();
  sectionDestination = document.querySelector(link.hash);
  sectionDestination?.focus({ preventScroll: true });
});
const ticker = document.querySelector('.availability-ticker');
if (ticker) {
  new IntersectionObserver(entries => { ticker.dataset.visible = String(entries[0].isIntersecting); }).observe(ticker);
  const updateVisibility = () => { document.documentElement.dataset.pageVisible = String(!document.hidden); };
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();
}
