import { LINKS } from "../config/links.js";
import { PROJECTS } from "../data/projects.js";
import { EXPERIENCE, EDUCATION } from "../data/experience.js";
import { SKILL_CATEGORIES, LANGUAGES, LANGUAGE_LEVEL_MAX } from "../data/skills.js";
import { DOCUMENTS } from "../data/documents.js";
import { CERTIFICATES } from "../data/certificates.js";

import { initChrome, observeReveals } from "./modules/theme-nav.js";
import { initI18n, onLanguageChange, pick, t } from "./modules/i18n.js";
import { initLightbox } from "./modules/lightbox.js";
import { wireExternalLink } from "./modules/links.js";
import { pictureHTML } from "./modules/picture.js";
import { renderDiploma, getDiplomaLightboxGroup } from "./modules/diploma-render.js";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

initChrome();

/* =========================================================
   Diplomarbeit (gemeinsames Modul)
   ========================================================= */
renderDiploma();
observeReveals(); // dynamisch erzeugte Case-Study-Karten für die Scroll-Animation registrieren
onLanguageChange(() => {
  renderDiploma();
  observeReveals();
});

/* =========================================================
   Lightbox (Girls' Day & Diplomarbeit-Galerien)
   ========================================================= */
function getLightboxGroups() {
  const groups = {
    girlsday: [
      { src: "assets/images/girlsday/girlsday-vr-station.jpg", caption: t("about.galleryCaption1") },
      { src: "assets/images/girlsday/girlsday-collage.jpg", caption: t("about.galleryCaption2") },
    ],
    diploma: getDiplomaLightboxGroup(),
    certificates: CERTIFICATES.map((c) => ({ src: c.src, caption: pick(c.title) })),
  };
  // Pro Projekt eine Lightbox-Gruppe aus dessen Flyer-Galerie erzeugen.
  PROJECTS.forEach((p) => {
    groups[`project-${p.id}`] = p.gallery.map((g) => ({ src: `${g.src}.jpg`, caption: pick(g.alt) }));
  });
  return groups;
}
initLightbox(getLightboxGroups);

/* =========================================================
   Konfigurierbare externe Links
   ========================================================= */
function wireLinks() {
  wireExternalLink($("#linkDiplomarbeit"), LINKS.DIPLOMARBEIT_URL);
  wireExternalLink($("#linkWerbevideo"), LINKS.WERBEVIDEO_URL);
  wireExternalLink($("#linkInstagram"), LINKS.INSTAGRAM_URL);
  wireExternalLink($("#linkYoutube"), LINKS.YOUTUBE_URL);
  wireExternalLink($("#linkInstagramContact"), LINKS.INSTAGRAM_URL);
}
wireLinks();
onLanguageChange(wireLinks);

/* =========================================================
   Projects: Showcase (Flyer-Reihe + Text darunter)
   Jedes Projekt zeigt seine Galerie als Flyer-Reihe; ein Klick auf
   einen Flyer öffnet ihn in der Lightbox (Gruppen: siehe getLightboxGroups).
   ========================================================= */
(function initProjects() {
  const grid = $("#projectGrid");

  function render() {
    grid.innerHTML = PROJECTS.map((p) => {
      const flyers = p.gallery
        .map(
          (g, gi) => `
          <button class="project-showcase__flyer" type="button"
                  data-lightbox-group="project-${p.id}" data-lightbox-index="${gi}"
                  aria-label="${pick(g.alt)}">
            ${pictureHTML({ basePath: g.src, alt: pick(g.alt) })}
          </button>`
        )
        .join("");
      const tags = [...pick(p.tags), ...p.tools]
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");
      return `
      <article class="project-showcase card" aria-labelledby="proj-${p.id}-title">
        <div class="project-showcase__gallery">${flyers}</div>
        <div class="project-showcase__body">
          <span class="project-card__category">${pick(p.category)}</span>
          <h3 class="project-showcase__title" id="proj-${p.id}-title">${pick(p.name)}</h3>
          <p class="project-card__period">${pick(p.period)}</p>
          <p class="project-showcase__desc">${pick(p.description)}</p>
          <p class="project-showcase__role"><strong>${t("projects.modalRole")}:</strong> ${pick(p.role)}</p>
          <div class="project-card__tags">${tags}</div>
        </div>
      </article>`;
    }).join("");
  }
  render();
  onLanguageChange(render);
})();

/* =========================================================
   Experience timeline (status computed from current date)
   ========================================================= */
(function initExperience() {
  const container = $("#experienceTimeline");
  const today = new Date();

  function computeStatus(item) {
    const start = new Date(item.startDate);
    const end = new Date(item.endDate);
    if (today < start) return "upcoming";
    if (today >= start && today <= end) return "current";
    return "done";
  }

  function render() {
    container.innerHTML = EXPERIENCE.map((item) => {
      const status = computeStatus(item);
      const isCurrent = status === "current";
      const statusLabel = status === "current" ? t("experience.statusCurrent") : status === "upcoming" ? t("experience.statusUpcoming") : "";
      return `
      <div class="timeline-item ${isCurrent ? "is-current" : ""}">
        <div class="timeline-item__dot"><svg class="icon" width="22" height="22"><use href="#icon-briefcase"/></svg></div>
        <div class="timeline-item__card card">
          <div class="timeline-item__head">
            <span class="timeline-item__role">${pick(item.role)}</span>
            ${statusLabel ? `<span class="timeline-item__status" style="background:${status === "upcoming" ? "var(--color-gold)" : "var(--color-success)"}">${statusLabel}</span>` : ""}
          </div>
          <p class="timeline-item__company">${item.company} · ${pick(item.location)}</p>
          <p class="timeline-item__period"><svg class="icon" width="14" height="14" style="display:inline;vertical-align:-2px;margin-right:4px"><use href="#icon-calendar"/></svg>${pick(item.period)}</p>
          <ul class="timeline-item__tasks">${pick(item.tasks).map((task) => `<li>${task}</li>`).join("")}</ul>
        </div>
      </div>`;
    }).join("");
  }
  render();
  onLanguageChange(render);
})();

/* =========================================================
   Education
   ========================================================= */
(function initEducation() {
  const list = $("#educationList");
  function render() {
    list.innerHTML = EDUCATION.map(
      (e) => `
      <div class="edu-item card">
        <div class="edu-item__icon"><svg class="icon" width="24" height="24"><use href="#icon-graduation"/></svg></div>
        <div>
          <h3 class="edu-item__title">${pick(e.name)}</h3>
          <p class="edu-item__meta">${pick(e.period)} · ${pick(e.location)}${e.highlight ? ` · <strong>${pick(e.highlight)}</strong>` : ""}</p>
          <p class="edu-item__desc">${pick(e.description)}</p>
        </div>
      </div>`
    ).join("");
  }
  render();
  onLanguageChange(render);
})();

/* =========================================================
   Skills & Languages
   ========================================================= */
(function initSkills() {
  const grid = $("#skillsGrid");
  const langGrid = $("#languagesGrid");

  function render() {
    grid.innerHTML = SKILL_CATEGORIES.map(
      (cat) => `
      <div class="skill-card card">
        <div class="skill-card__head">
          <span class="skill-card__icon"><svg class="icon" width="20" height="20"><use href="#icon-${cat.icon}"/></svg></span>
          <span class="skill-card__title">${pick(cat.title)}</span>
        </div>
        <div class="skill-card__tags">${pick(cat.skills).map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      </div>`
    ).join("");

    langGrid.innerHTML = LANGUAGES.map((l) => {
      const segments = Array.from(
        { length: LANGUAGE_LEVEL_MAX },
        (_, i) => `<span class="lang-meter__seg${i < l.rank ? " is-filled" : ""}"></span>`
      ).join("");
      return `
      <div class="language-card card">
        <div class="language-card__head">
          <span class="language-card__name">${pick(l.name)}</span>
          <span class="language-card__level">${pick(l.level)}</span>
        </div>
        <div class="lang-meter" role="img" aria-label="${pick(l.name)}: ${pick(l.level)}">${segments}</div>
      </div>`;
    }).join("");
  }
  render();
  onLanguageChange(render);
})();

/* =========================================================
   PDF preview (pdf.js with graceful fallback) – muss vor der
   Documents-Section stehen, da renderThumb/openPdf dort verwendet werden.
   ========================================================= */
const pdfModal = $("#pdfModal");
const pdfPagesContainer = $("#pdfPages");
const pdfOpenNewTabLink = $("#pdfOpenNewTab");
const pdfDownloadLink = $("#pdfDownload");
const PDF_JS_VERSION = "3.11.174";
let pdfjsLibPromise = null;

function loadPdfJs() {
  if (pdfjsLibPromise) return pdfjsLibPromise;
  pdfjsLibPromise = new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.min.js`;
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDF_JS_VERSION}/pdf.worker.min.js`;
      resolve(window.pdfjsLib);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return pdfjsLibPromise;
}

async function renderPdf(url, container) {
  container.innerHTML = "";
  const pdfjsLib = await loadPdfJs();
  const pdf = await pdfjsLib.getDocument(url).promise;
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.4 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.appendChild(canvas);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  }
}

async function renderThumb(url, thumbEl) {
  try {
    const pdfjsLib = await loadPdfJs();
    const pdf = await pdfjsLib.getDocument(url).promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 0.6 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const fallback = thumbEl.querySelector("[data-pdf-fallback]");
    if (fallback) fallback.replaceWith(canvas);
  } catch (err) {
    console.warn("PDF-Thumbnail konnte nicht gerendert werden, Fallback wird verwendet.", err);
  }
}

function openPdf(doc) {
  $("#pdfModalTitle").textContent = pick(doc.title);
  pdfOpenNewTabLink.href = doc.file;
  pdfDownloadLink.href = doc.file;
  pdfDownloadLink.setAttribute("download", pick(doc.title) + ".pdf");
  pdfModal.classList.add("is-open");
  document.body.style.overflow = "hidden";
  $("#pdfModalClose").focus();

  pdfPagesContainer.innerHTML = `<p class="pdf-modal__fallback">${t("documents.loading")}</p>`;
  renderPdf(doc.file, pdfPagesContainer).catch((err) => {
    console.warn("PDF-Vorschau nicht verfügbar, zeige Fallback-Link.", err);
    pdfPagesContainer.innerHTML = `
      <div class="pdf-modal__fallback">
        <p>${t("documents.fallbackText")}</p>
        <a class="btn btn--primary" href="${doc.file}" target="_blank" rel="noopener noreferrer">
          ${t("documents.fallbackBtn")}
        </a>
      </div>`;
  });
}

function closePdfModal() {
  pdfModal.classList.remove("is-open");
  document.body.style.overflow = "";
}

$("#pdfModalClose").addEventListener("click", closePdfModal);
pdfModal.addEventListener("click", (e) => {
  if (e.target === pdfModal) closePdfModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pdfModal.classList.contains("is-open")) closePdfModal();
});

/* =========================================================
   Documents: PDF-Karten (Lebenslauf & Zertifikate)
   ========================================================= */
(function initDocuments() {
  const container = $("#documentCards");

  function render() {
    container.innerHTML = DOCUMENTS.map(
      (doc, i) => `
      <div class="doc-card card">
        <div class="doc-card__thumb" data-pdf-open="${i}" role="button" tabindex="0" aria-label="${t("documents.previewOpen")}: ${pick(doc.title)}">
          <div class="doc-card__thumb-fallback" data-pdf-fallback>
            <svg class="icon" width="40" height="40"><use href="#icon-file-text"/></svg>
            <span>${t("documents.pdfPreview")}</span>
          </div>
          <div class="doc-card__thumb-overlay"><svg class="icon" width="16" height="16" style="color:#fff"><use href="#icon-eye"/></svg>${t("documents.previewOpen")}</div>
        </div>
        <h3 class="doc-card__title">${pick(doc.title)}</h3>
        <p class="doc-card__desc">${pick(doc.description)}</p>
        <div class="doc-card__actions">
          <button class="btn btn--secondary btn--sm" type="button" data-pdf-open="${i}">
            <svg class="icon" width="16" height="16"><use href="#icon-eye"/></svg>${t("documents.view")}
          </button>
          <a class="btn btn--ghost btn--sm" href="${doc.file}" target="_blank" rel="noopener noreferrer">
            <svg class="icon" width="16" height="16"><use href="#icon-external"/></svg>${t("documents.newTab")}
          </a>
          <a class="btn btn--ghost btn--sm" href="${doc.file}" download>
            <svg class="icon" width="16" height="16"><use href="#icon-download"/></svg>${t("documents.download")}
          </a>
        </div>
      </div>`
    ).join("");

    bindPdfTriggers();
    $$(".doc-card__thumb").forEach((thumbEl, i) => renderThumb(DOCUMENTS[i].file, thumbEl));
  }
  render();
  onLanguageChange(render);

  function bindPdfTriggers() {
    $$("[data-pdf-open]").forEach((el) => {
      el.addEventListener("click", () => openPdf(DOCUMENTS[Number(el.dataset.pdfOpen)]));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPdf(DOCUMENTS[Number(el.dataset.pdfOpen)]);
        }
      });
    });
  }
})();

/* =========================================================
   Zertifikate-Slider (Scroll-Snap-Karussell, Klick öffnet Lightbox)
   ========================================================= */
(function initCertificateSlider() {
  const track = $("#certTrack");
  if (!track) return;

  // Im Slider werden komprimierte Thumbnails (600px, "-thumb.jpg") geladen;
  // die Lightbox nutzt weiterhin die großen 1000px-Originale (siehe getLightboxGroups).
  const thumbSrc = (src) => src.replace(/\.jpg$/, "-thumb.jpg");

  function render() {
    track.innerHTML = CERTIFICATES.map(
      (c, i) => `
      <button class="cert-slide" type="button" role="listitem"
              data-lightbox-group="certificates" data-lightbox-index="${i}"
              aria-label="${pick(c.title)}">
        <img src="${thumbSrc(c.src)}" alt="${pick(c.title)}" loading="lazy" width="600" height="849" />
        <span class="cert-slide__caption">${pick(c.title)}</span>
      </button>`
    ).join("");
  }
  render();
  onLanguageChange(render);

  // Pfeile blättern jeweils um die sichtbare Breite (fast eine "Seite").
  const scrollByPage = (dir) =>
    track.scrollBy({ left: dir * track.clientWidth * 0.9, behavior: "smooth" });
  $("#certPrev").addEventListener("click", () => scrollByPage(-1));
  $("#certNext").addEventListener("click", () => scrollByPage(1));
})();

/* =========================================================
   Contact form (client-side validation, honeypot, mailto fallback)
   ========================================================= */
(function initContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");

  function setError(field, message) {
    const el = form.querySelector(`[data-error-for="${field}"]`);
    if (el) el.textContent = message || "";
  }

  function validate() {
    let valid = true;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (name.length < 2) {
      setError("name", t("contact.errName"));
      valid = false;
    } else setError("name", "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("email", t("contact.errEmail"));
      valid = false;
    } else setError("email", "");

    if (subject.length < 3) {
      setError("subject", t("contact.errSubject"));
      valid = false;
    } else setError("subject", "");

    if (message.length < 10) {
      setError("message", t("contact.errMessage"));
      valid = false;
    } else setError("message", "");

    return valid;
  }

  function showStatus(type, message) {
    status.textContent = message;
    status.className = `form-status is-visible form-status--${type}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot: Wenn befüllt, handelt es sich vermutlich um einen Bot.
    if (form.company.value.trim() !== "") {
      showStatus("success", t("contact.statusSuccess"));
      form.reset();
      return;
    }

    if (!validate()) {
      showStatus("error", t("contact.statusInvalid"));
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
    };

    if (!LINKS.CONTACT_FORM_ENDPOINT) {
      const body = encodeURIComponent(`${data.message}\n\n– ${data.name} (${data.email})`);
      window.location.href = `mailto:${LINKS.CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
      showStatus("success", t("contact.statusMailto"));
      form.reset();
      return;
    }

    try {
      // Unterstützung für Web3Forms: wenn ein API-Key gesetzt ist, sende an
      // Web3Forms mit dem erwarteten Feld `access_key`.
      if (LINKS.WEB3FORMS_API_KEY && LINKS.CONTACT_FORM_ENDPOINT.includes("web3forms")) {
        const body = {
          access_key: LINKS.WEB3FORMS_API_KEY,
          subject: data.subject,
          name: data.name,
          email: data.email,
          message: data.message,
        };
        const response = await fetch(LINKS.CONTACT_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await response.json().catch(() => null);
        if (!response.ok) throw new Error(json?.message || "Serverfehler");
        showStatus("success", t("contact.statusSuccess"));
        form.reset();
        return;
      }

      // Standard-POST (z. B. Formspree) erwartet JSON body like { name, email, subject, message }
      const response = await fetch(LINKS.CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json().catch(() => null);
      if (!response.ok) throw new Error(json?.message || "Serverfehler");
      showStatus("success", t("contact.statusSuccess"));
      form.reset();
    } catch (err) {
      // Wenn der Formular-Service nicht erreichbar oder falsch konfiguriert ist,
      // auf den mailto-Fallback zurückgreifen.
      const body = encodeURIComponent(`${data.message}\n\n– ${data.name} (${data.email})`);
      window.location.href = `mailto:${LINKS.CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${body}`;
      showStatus("success", t("contact.statusMailto"));
      form.reset();
    }
  });
})();

/* =========================================================
   Sprachumschaltung zuletzt initialisieren, damit der initiale
   Zustand aller [data-i18n]-Elemente korrekt gesetzt wird.
   ========================================================= */
initI18n();
