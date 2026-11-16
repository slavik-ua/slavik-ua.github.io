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
