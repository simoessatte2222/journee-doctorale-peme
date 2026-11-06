(() => {
  "use strict";
  const config = window.PEME_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation");
  const toast = document.querySelector("#toast");
  let toastTimer;

  for (const element of document.querySelectorAll("[data-config]")) {
    const key = element.dataset.config;
    if (typeof config[key] === "string" && config[key].trim()) {
      element.textContent = config[key].trim();
    }
  }

  function validHttpUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value.trim());
      return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
    } catch { return null; }
  }

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add("toast-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.classList.remove("toast-visible");
      toast.hidden = true;
    }, 4600);
  }

  for (const link of document.querySelectorAll("[data-link]")) {
    const key = link.dataset.link;
    const url = validHttpUrl(config[key]);
    const status = document.querySelector(`[data-status="${key}"]`);
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      if (status) {
        status.textContent = "Formulaire disponible";
        status.classList.add("status-open");
      }
    } else {
      link.href = "#participer";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        notify(key === "programmeUrl" ? "Le programme définitif sera publié après validation par les organisateurs." : "Le formulaire n'est pas encore disponible. Le lien sera activé après validation par les organisateurs.");
      });
    }
  }

  const contactValue = document.querySelector("#contact-value");
  const contactEmail = (config.contactEmail || "").trim();
  if (contactValue && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    const emailLink = document.createElement("a");
    emailLink.href = `mailto:${contactEmail}`;
    emailLink.textContent = contactEmail;
    contactValue.replaceWith(emailLink);
  }
  const copyright = document.querySelector("#copyright-year");
  if (copyright) copyright.textContent = String(new Date().getFullYear());

  function closeMenu() {
    nav?.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Ouvrir le menu");
  }
  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("nav-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
  document.addEventListener("click", e => {
    if (nav && menuButton && !nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu();
  });
})();
