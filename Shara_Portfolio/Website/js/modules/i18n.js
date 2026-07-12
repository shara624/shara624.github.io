import { I18N, DEFAULT_LANG, SUPPORTED_LANGS } from "../../data/i18n.js";

const STORAGE_KEY = "hsb-lang";
const listeners = [];

let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
if (!SUPPORTED_LANGS.includes(currentLang)) currentLang = DEFAULT_LANG;

export function getLang() {
  return currentLang;
}

// Übersetzung für statische UI-Strings (data/i18n.js).
export function t(key) {
  return I18N[currentLang]?.[key] ?? I18N[DEFAULT_LANG][key] ?? key;
}

// Wählt aus einem bilingualen Datenfeld ({de,en}) den aktuellen Sprachwert.
// Unübersetzte Felder (Arrays, einfache Strings, Eigennamen) werden unverändert durchgereicht.
export function pick(field) {
  if (
    field &&
    typeof field === "object" &&
    !Array.isArray(field) &&
    (Object.prototype.hasOwnProperty.call(field, "de") || Object.prototype.hasOwnProperty.call(field, "en"))
  ) {
    return field[currentLang] ?? field[DEFAULT_LANG];
  }
  return field;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
  });
}

function updateToggleLabel() {
  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = currentLang === "de" ? "EN" : "DE";
}

export function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(STORAGE_KEY, lang);
  applyStaticTranslations();
  updateToggleLabel();
  listeners.forEach((cb) => cb(lang));
}

export function onLanguageChange(cb) {
  listeners.push(cb);
}

// Initialisiert Sprachumschaltung + wendet Übersetzungen einmalig an.
// Sollte nach dem Rendern aller [data-i18n]-Elemente aufgerufen werden.
export function initI18n() {
  applyStaticTranslations();
  updateToggleLabel();
  const btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", () => setLang(currentLang === "de" ? "en" : "de"));
  }
}
