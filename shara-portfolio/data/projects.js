// Schulprojekte aus den fünf HAK-Jahren (getrennt von der Diplomarbeit).
// Es werden ausschließlich Projekte aufgeführt, die durch vorhandene Dateien
// (Bilder, Dokumente) belegt sind.
//
// Bildpfade werden ohne Dateiendung angegeben (Basisname) – die Anzeige
// erzeugt daraus automatisch <picture>-Elemente mit WebP- und JPEG-Quelle.

export const PROJECTS = [
  {
    id: "designdealer",
    name: { de: "Übungsfirma „Design Dealer GmbH“", en: "Student Company „Design Dealer GmbH“" },
    period: { de: "HAK-Übungsfirma · Pernerstorfergasse 77, Wien", en: "HAK student company · Pernerstorfergasse 77, Vienna" },
    category: { de: "Marketing & Grafikdesign", en: "Marketing & Graphic Design" },
    tags: {
      de: ["Marketing", "Grafikdesign", "Wirtschaft"],
      en: ["Marketing", "Graphic Design", "Business"],
    },
    role: {
      de: "Konzeption und Gestaltung von Werbesujets für saisonale Verkaufsaktionen der Übungsfirma.",
      en: "Concept and design of advertising visuals for the student company's seasonal sales campaigns.",
    },
    description: {
      de: "Im Rahmen des Übungsfirmen-Unterrichts der HAK wurde die virtuelle Handelsfirma „Design Dealer GmbH“ betrieben – ein praxisnahes Planspiel, bei dem Schülerinnen und Schüler ein reales Unternehmen simulieren. Haskar gestaltete dabei mehrere Werbesujets für unterschiedliche Verkaufsaktionen.",
      en: "As part of the HAK's student-company program, the virtual trading company „Design Dealer GmbH“ was run – a hands-on simulation in which students operate a realistic business. Haskar designed several advertising visuals for various sales campaigns.",
    },
    tools: ["Adobe Photoshop"],
    image: "assets/images/designdealer/designdealer-wiedereroeffnung",
    imageSize: { width: 1209, height: 1301 },
    gallery: [
      {
        src: "assets/images/designdealer/designdealer-wiedereroeffnung",
        alt: {
          de: "Werbesujet „Wiedereröffnung“ der Übungsfirma Design Dealer GmbH mit Adobe-Softwarepaket und Angebotspreis",
          en: "„Re-opening“ advertising visual for the student company Design Dealer GmbH, featuring an Adobe software bundle and offer price",
        },
      },
      {
        src: "assets/images/designdealer/designdealer-blackmonth",
        alt: {
          de: "Werbesujet „Black Month – 20% auf alles“ der Übungsfirma Design Dealer GmbH mit QR-Code",
          en: "„Black Month – 20% off everything“ advertising visual for the student company Design Dealer GmbH, with QR code",
        },
      },
      {
        src: "assets/images/designdealer/designdealer-halloween",
        alt: {
          de: "Werbesujet „Halloween Angebot“ der Übungsfirma Design Dealer GmbH mit PS4-Aktionspreis",
          en: "„Halloween offer“ advertising visual for the student company Design Dealer GmbH, with PS4 promotional price",
        },
      },
    ],
  },
];
