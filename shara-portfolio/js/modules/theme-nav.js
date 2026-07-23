const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initTheme() {
  const root = document.documentElement;
  const toggle = $("#themeToggle");
  if (!toggle) return;
  const stored = localStorage.getItem("hsb-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  toggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("hsb-theme", next);
  });
}

export function initNav() {
  const nav = $("#nav");
  const burger = $("#navBurger");
  const links = $("#navLinks");
  if (!nav) return;
  const navLinks = $$(".nav__link");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (burger && links) {
    burger.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  const sections = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      return href && href.startsWith("#") ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }
}

export function initBackToTop() {
  const btn = $("#backToTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 600),
    { passive: true }
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

let revealObserver = null;

export function initReveal() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    observeReveals();
    return;
  }
  revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  observeReveals();
}

// Beobachtet alle noch nicht sichtbaren .reveal-Elemente. Muss nach dem
// dynamischen Nachrendern von Inhalten (z.B. Diplomarbeits-Steps) erneut
// aufgerufen werden, da initReveal() nur die beim Laden vorhandenen Elemente kennt.
export function observeReveals() {
  const items = $$(".reveal:not(.is-visible)");
  if (prefersReducedMotion || !("IntersectionObserver" in window) || !revealObserver) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  items.forEach((el) => revealObserver.observe(el));
}

export function initFooterYear() {
  const el = $("#footerYear");
  if (el) el.textContent = new Date().getFullYear();
}

// Initialisiert alle gemeinsam genutzten Chrome-Elemente (Theme, Nav, Reveal, Footer-Jahr, Back-to-top).
export function initChrome() {
  initTheme();
  initNav();
  initBackToTop();
  initReveal();
  initFooterYear();
}
