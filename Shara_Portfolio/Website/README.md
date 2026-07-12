# Portfolio – Haskar Shara Bor

Statische Bewerbungs-Portfolio-Website (reines HTML/CSS/JavaScript, keine Build-Tools nötig).

## Lokal starten

Da die Seite ES-Module (`type="module"`) für die Datenhaltung verwendet, muss sie über einen
lokalen Server aufgerufen werden (nicht per Doppelklick/`file://`, da Browser dort ES-Module blockieren).

```bash
# Variante 1: Python (auf macOS vorinstalliert)
python3 -m http.server 5173

# Variante 2: Node.js
npx serve .
```

Anschließend im Browser `http://localhost:5173` öffnen.

## Projektstruktur

```
index.html            Hauptseite mit allen Sections
impressum.html         Platzhalter-Seite (vor Veröffentlichung ausfüllen)
datenschutz.html        Platzhalter-Seite (vor Veröffentlichung ausfüllen)
css/style.css          Design-System, Layout, responsive Regeln
js/script.js            Navigation, Galerien, Modals, PDF-Vorschau, Formular
data/                   Inhalte als Datenobjekte (Projekte, Erfahrung, Skills, Dokumente)
config/links.js         Zentrale externe Links (Diplomarbeit, Instagram, Kontaktformular)
assets/                 Bilder, Video, Lebenslauf-PDF
```

## Offene Konfiguration vor Veröffentlichung

In [`config/links.js`](config/links.js):

- `DIPLOMARBEIT_URL` – Link zur vollständigen Diplomarbeit
- `INSTAGRAM_URL` – Instagram-Profil/Projektseite zur Diplomarbeit
- `CONTACT_FORM_ENDPOINT` – Formular-Service (z. B. Formspree/EmailJS), sonst nutzt das
  Kontaktformular automatisch einen `mailto`-Fallback
- `LINKEDIN_URL` – optional, falls ein Profil vorhanden ist

Domain-Platzhalter (`haskarsharabor.at`) in `index.html`, `robots.txt` und `sitemap.xml`
anpassen, sobald eine echte Domain feststeht.

## Veröffentlichung

Die Seite ist rein statisch und kann z. B. kostenlos über GitHub Pages, Netlify oder Vercel
veröffentlicht werden: Repository verbinden bzw. Ordnerinhalt hochladen, Build-Schritt ist
nicht erforderlich.
