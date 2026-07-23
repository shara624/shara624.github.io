import { LINKS } from "../config/links.js";
import { initChrome, observeReveals } from "./modules/theme-nav.js";
import { initI18n, onLanguageChange, t } from "./modules/i18n.js";
import { initLightbox } from "./modules/lightbox.js";
import { wireExternalLink } from "./modules/links.js";
import { renderDiploma, getDiplomaLightboxGroup } from "./modules/diploma-render.js";

const $ = (sel) => document.querySelector(sel);

initChrome();

renderDiploma();
observeReveals(); // dynamisch erzeugte Case-Study-Karten für die Scroll-Animation registrieren
onLanguageChange(() => {
  renderDiploma();
  observeReveals();
});

initLightbox(() => ({ diploma: getDiplomaLightboxGroup() }));

function wireLinks() {
  wireExternalLink($("#linkWerbevideo"), LINKS.WERBEVIDEO_URL);
  wireExternalLink($("#linkInstagram"), LINKS.INSTAGRAM_URL);
  wireExternalLink($("#linkYoutube"), LINKS.YOUTUBE_URL);
  wireExternalLink($("#linkLinkedinFooter"), LINKS.LINKEDIN_URL);
}
wireLinks();
onLanguageChange(wireLinks);

initI18n();
