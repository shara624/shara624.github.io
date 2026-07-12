import { t } from "./i18n.js";

// Setzt href für konfigurierbare externe Links (config/links.js). Ist die URL
// noch nicht gesetzt, wird der Link sichtbar deaktiviert statt auf "#" zu verlinken.
export function wireExternalLink(el, url, fallbackKey = "diploma.linkFallback") {
  if (!el) return;
  if (url) {
    el.href = url;
    el.classList.remove("is-disabled");
    el.removeAttribute("aria-disabled");
    el.removeAttribute("title");
  } else {
    el.href = "#";
    el.classList.add("is-disabled");
    el.setAttribute("aria-disabled", "true");
    el.title = t(fallbackKey);
    el.addEventListener("click", (e) => e.preventDefault());
  }
}
