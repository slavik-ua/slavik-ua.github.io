"use strict";

document.documentElement.classList.add("js");

const root = document.documentElement;
const themeButton = document.querySelector("#theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
let explicitTheme = null;
try {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved === "light" || saved === "dark") explicitTheme = saved;
} catch { /* Theme controls remain usable when storage is blocked. */ }

function applyTheme(theme) {
  root.dataset.theme = theme;
  const action = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  themeButton.setAttribute("aria-label", action);
  themeButton.title = action;
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#0A0A0C" : "#FDFCF9";
}

applyTheme(explicitTheme || (systemTheme.matches ? "dark" : "light"));
themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  explicitTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(explicitTheme);
  try { localStorage.setItem("portfolio-theme", explicitTheme); } catch { /* Use the choice for this visit. */ }
});
systemTheme.addEventListener("change", event => {
  if (!explicitTheme) applyTheme(event.matches ? "dark" : "light");
});
window.addEventListener("storage", event => {
  if (event.key === "portfolio-theme" || event.key === null) {
    explicitTheme = event.newValue === "light" || event.newValue === "dark" ? event.newValue : null;
    applyTheme(explicitTheme || (systemTheme.matches ? "dark" : "light"));
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  menuToggle.querySelector("use").setAttribute("href", "#i-menu");
}
menuToggle.addEventListener("click", () => {
  const opening = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(opening));
  navigation.classList.toggle("is-open", opening);
  menuToggle.querySelector("use").setAttribute("href", opening ? "#i-close" : "#i-menu");
});
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", event => {
  if (!event.target.closest(".header-inner")) closeMenu();
});
window.matchMedia("(min-width: 981px)").addEventListener("change", closeMenu);

const copyButton = document.querySelector("#copy-email");
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    try {
      await navigator.clipboard.writeText("detsykvyacheslav@gmail.com");
      status.textContent = "Email address copied.";
    } catch {
      status.textContent = "Select the email address to copy it.";
    }
  });
}

const profileButton = document.querySelector("#copy-profile");
if (navigator.clipboard && window.isSecureContext) {
  profileButton.hidden = false;
  profileButton.parentElement.hidden = false;
  const status = document.querySelector("#profile-status");
  let statusTimer;
  function dismissStatus() {
    clearTimeout(statusTimer);
    status.textContent = "";
  }
  function showStatus(message) {
    dismissStatus();
    status.textContent = message;
    statusTimer = setTimeout(dismissStatus, 3000);
  }
  document.addEventListener("click", event => {
    if (!event.target.closest(".header-profile")) dismissStatus();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") dismissStatus();
  });
  profileButton.addEventListener("click", async () => {
    profileButton.disabled = true;
    dismissStatus();
    try {
      const response = await fetch("llms.txt");
      if (!response.ok) throw new Error("Profile unavailable");
      await navigator.clipboard.writeText(await response.text());
      showStatus("Profile and source links copied.");
    } catch {
      showStatus("Couldn’t copy. You can open the plain-text profile instead.");
    } finally {
      profileButton.disabled = false;
    }
  });
}
document.querySelector("#year").textContent = new Date().getFullYear();
