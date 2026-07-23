// Berufserfahrung, chronologisch absteigend (aktuellste Station zuerst).
// Der Status (laufend/bevorstehend/abgeschlossen) wird beim Rendern anhand
// des aktuellen Datums berechnet (siehe js/script.js), nicht hier hinterlegt.

export const EXPERIENCE = [
  {
    id: "oeamtc-notruf",
    role: { de: "Notrufzentrale", en: "Emergency Call Centre" },
    company: "ÖAMTC",
    location: { de: "Baumgasse 129, 1030 Wien", en: "Baumgasse 129, 1030 Vienna" },
    period: { de: "01.07.2026 – 31.08.2026", en: "07/01/2026 – 08/31/2026" },
    startDate: "2026-07-01",
    endDate: "2026-08-31",
    tasks: {
      de: [
        "Telefonische Kundenbetreuung",
        "Bearbeitung von Pannenmeldungen",
        "Datenerfassung",
        "Kommunikation auf Deutsch, Türkisch und Englisch",
        "Unterstützung der internationalen Pannenhilfe",
      ],
      en: [
        "Telephone customer support",
        "Processing breakdown reports",
        "Data entry",
        "Communication in German, Turkish and English",
        "Supporting international roadside assistance",
      ],
    },
  },
  {
    id: "action-praktikum",
    role: { de: "Pflichtpraktikum", en: "Mandatory Internship" },
    company: "Action",
    location: { de: "Ada-Christen-Gasse 12, 1100 Wien", en: "Ada-Christen-Gasse 12, 1100 Vienna" },
    period: { de: "23.09.2023 – 03.02.2024", en: "09/23/2023 – 02/03/2024" },
    startDate: "2023-09-23",
    endDate: "2024-02-03",
    tasks: {
      de: [
        "Kundenservice",
        "Kassiertätigkeiten",
        "Warenverräumung",
        "Regalpflege nach FIFO",
        "Preisauszeichnungen",
        "Warenpräsentation",
      ],
      en: [
        "Customer service",
        "Cashier duties",
        "Stocking merchandise",
        "Shelf maintenance following FIFO",
        "Price labelling",
        "Merchandise presentation",
      ],
    },
  },
  {
    id: "oeamtc-mitgliederservice",
    role: { de: "Verkaufsberaterin im Mitgliederservice", en: "Sales Advisor, Member Services" },
    company: "ÖAMTC",
    location: { de: "Grenzackerstraße 16, 1100 Wien", en: "Grenzackerstraße 16, 1100 Vienna" },
    period: { de: "01.08.2023 – 31.08.2023", en: "08/01/2023 – 08/31/2023" },
    startDate: "2023-08-01",
    endDate: "2023-08-31",
    tasks: {
      de: [
        "Kundenbetreuung auf Deutsch, Englisch und Türkisch",
        "Bearbeitung von Mitgliedschaften",
        "Internationale Führerscheine",
        "Schutzbriefe",
        "Terminverwaltung",
      ],
      en: [
        "Customer support in German, English and Turkish",
        "Processing memberships",
        "International driving permits",
        "Travel protection letters",
        "Appointment scheduling",
      ],
    },
  },
];

export const EDUCATION = [
  {
    id: "hak",
    name: {
      de: "Bundeshandelsakademie – Schwerpunkt Digital Business und IT",
      en: "Bundeshandelsakademie (Business College) – Digital Business & IT focus",
    },
    location: { de: "Pernerstorfergasse 77, 1100 Wien", en: "Pernerstorfergasse 77, 1100 Vienna" },
    period: { de: "2020 – 2025", en: "2020 – 2025" },
    highlight: { de: "HAK-Matura 2025", en: "HAK diploma (Matura) 2025" },
    description: {
      de: "Fünfjährige, wirtschaftliche Vollausbildung mit Schwerpunkt Digital Business – kombiniert kaufmännisches Grundwissen mit IT, Softwareentwicklung, Webentwicklung, Datenbanken, digitalen Medien und Projektmanagement.",
      en: "Five-year full-time business education with a Digital Business focus – combining core commercial knowledge with IT, software development, web development, databases, digital media and project management.",
    },
  },
  {
    id: "mims",
    name: {
      de: "Musik- und Informatikmittelschule – Schwerpunkt Informatik",
      en: "Music and Computer Science Middle School – Computer Science focus",
    },
    location: { de: "Wendstattgasse 5, 1100 Wien", en: "Wendstattgasse 5, 1100 Vienna" },
    period: { de: "2016 – 2020", en: "2016 – 2020" },
    description: {
      de: "Mittelschule mit informatischem Schwerpunkt als Grundlage für die spätere Ausbildung im Digital-Business-Zweig der HAK.",
      en: "Middle school with a computer-science focus, laying the foundation for the later education in the HAK's digital business track.",
    },
  },
];
