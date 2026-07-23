// Erzeugt <picture>-Markup mit WebP-Quelle und JPEG-Fallback aus einem
// Basispfad ohne Dateiendung (z.B. "assets/images/foo" -> foo.webp/foo.jpg).
export function pictureHTML({ basePath, alt, width, height, loading = "lazy", className = "", extraAttrs = "" }) {
  const dims = `${width ? `width="${width}" ` : ""}${height ? `height="${height}" ` : ""}`;
  return `<picture>
    <source srcset="${basePath}.webp" type="image/webp" />
    <img src="${basePath}.jpg" alt="${alt}" ${dims}loading="${loading}" ${className ? `class="${className}" ` : ""}${extraAttrs} />
  </picture>`;
}
