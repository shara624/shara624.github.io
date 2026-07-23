const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

// groupsProvider: () => { [groupName]: Array<{ src, caption }> }
// Wird als Funktion übergeben (nicht als fertiges Objekt), damit sich z.B.
// sprachabhängige Bildunterschriften bei jedem Öffnen aktuell auflösen.
// Bildquellen (data-lightbox-group/-index) werden per Klick auf Elemente mit
// [data-lightbox-group] aufgelöst.
export function initLightbox(groupsProvider) {
  const lightbox = $("#lightbox");
  if (!lightbox) return;
  const img = $("#lightboxImg");
  const caption = $("#lightboxCaption");
  let currentGroup = [];
  let currentIndex = 0;
  let lastFocused = null;

  function render() {
    const item = currentGroup[currentIndex];
    img.src = item.src;
    img.alt = item.caption;
    caption.textContent = item.caption;
  }

  function open(groupName, index) {
    currentGroup = groupsProvider()[groupName];
    currentIndex = index;
    if (!currentGroup) return;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $("#lightboxClose").focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + currentGroup.length) % currentGroup.length;
    render();
  }

  function bindTriggers() {
    $$("[data-lightbox-group]").forEach((el) => {
      if (el.dataset.lightboxBound) return;
      el.dataset.lightboxBound = "true";
      el.addEventListener("click", () => open(el.dataset.lightboxGroup, Number(el.dataset.lightboxIndex)));
    });
  }

  bindTriggers();
  // Erneut binden, falls Trigger-Elemente später dynamisch nachgerendert werden.
  new MutationObserver(bindTriggers).observe(document.body, { childList: true, subtree: true });

  $("#lightboxClose").addEventListener("click", close);
  $("#lightboxPrev").addEventListener("click", () => step(-1));
  $("#lightboxNext").addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}
