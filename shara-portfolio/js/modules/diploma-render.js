import { DIPLOMA } from "../../data/diploma.js";
import { pick, t } from "./i18n.js";
import { pictureHTML } from "./picture.js";

const $ = (sel) => document.querySelector(sel);

function renderStep(step) {
  let inner = `<h3>${pick(step.title)}</h3>`;
  if (step.body) {
    inner += `<p>${pick(step.body)}</p>`;
  } else if (step.list) {
    inner += `<ul>${pick(step.list)
      .map((item) => `<li><svg class="icon"><use href="#icon-check"/></svg>${item}</li>`)
      .join("")}</ul>`;
  } else if (step.tools) {
    inner += `<div class="case-step__tools">${step.tools.map((tool) => `<span class="tag">${tool}</span>`).join("")}</div>`;
  }
  return `<article class="case-step card reveal"><div class="case-step__index">${step.n}</div><div>${inner}</div></article>`;
}

// Rendert die komplette Diplomarbeits-Case-Study in die auf der jeweiligen
// Seite vorhandenen Container. Wird initial und bei jedem Sprachwechsel aufgerufen.
export function renderDiploma() {
  const eyebrow = $("#diplomaEyebrow");
  if (eyebrow) eyebrow.textContent = pick(DIPLOMA.eyebrow);

  const title = $("#diplomaTitle");
  if (title) title.textContent = pick(DIPLOMA.title);

  const lead = $("#diplomaLead");
  if (lead) lead.textContent = pick(DIPLOMA.lead);

  const meta = $("#diplomaMeta");
  if (meta) {
    meta.innerHTML = DIPLOMA.metaTags
      .map((tag) => `<span class="tag"><svg class="icon" width="16" height="16"><use href="#icon-${tag.icon}"/></svg>${pick(tag)}</span>`)
      .join("");
  }

  const video = $("#diplomaVideo");
  if (video) {
    video.setAttribute("src", DIPLOMA.video.src);
    const fallback = $("#diplomaVideoFallback");
    if (fallback) fallback.innerHTML = pick(DIPLOMA.video.fallback);
  }
  const videoCaption = $("#diplomaVideoCaption");
  if (videoCaption) videoCaption.textContent = pick(DIPLOMA.video.caption);

  const steps = $("#diplomaSteps");
  if (steps) steps.innerHTML = DIPLOMA.steps.map(renderStep).join("");

  const galleryLabel = $("#diplomaGalleryLabel");
  if (galleryLabel) galleryLabel.textContent = pick(DIPLOMA.galleryLabel);

  const gallery = $("#diplomaGallery");
  if (gallery) {
    const items = DIPLOMA.gallery
      .map(
        (item, i) => `
      <button class="diploma__gallery-item" type="button" role="listitem" data-lightbox-group="diploma" data-lightbox-index="${i}">
        ${pictureHTML({ basePath: item.src, alt: pick(item.alt), width: item.width, height: item.height })}
      </button>`
      )
      .join("");

    // Stumme Mini-Animation als Loop-Kachel bei den Charakteren (kein vollständiges Video).
    const clip = DIPLOMA.characterClip;
    const clipTile = clip
      ? `
      <div class="diploma__gallery-item diploma__gallery-item--clip" role="listitem">
        <video
          class="diploma__gallery-clip"
          src="${clip.src}"
          poster="${clip.poster}"
          autoplay muted loop playsinline
          preload="metadata"
          aria-label="${pick(clip.label)}"
        ></video>
      </div>`
      : "";

    gallery.innerHTML = items + clipTile;
  }
}

// Baut die Lightbox-Gruppe für die Diplomarbeits-Galerie aus den aktuell
// gewählten Sprachtexten (für Bildunterschriften in der Lightbox).
export function getDiplomaLightboxGroup() {
  return DIPLOMA.gallery.map((item) => ({ src: `${item.src}.jpg`, caption: pick(item.alt) }));
}
