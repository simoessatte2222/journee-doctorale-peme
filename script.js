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
    const statuses = document.querySelectorAll(`[data-status="${key}"]`);
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      for (const status of statuses) {
        status.textContent = key === "programmeUrl" ? "Programme disponible" : "Formulaire disponible";
        status.classList.add("status-open");
      }
    } else {
      link.href = key === "programmeUrl" ? "#programme" : "#participer";
      link.classList.add("is-unavailable");
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
    emailLink.id = "contact-value";
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

  const sectionLinks = [...document.querySelectorAll(".sidebar-links a")];
  const sections = sectionLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of sectionLinks) {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        }
      }
    }, { rootMargin: "-100px 0px -50% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }
})();
