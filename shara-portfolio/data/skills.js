// Kompetenzen ohne erfundene Prozentwerte – Darstellung ausschließlich
// über Kategorien und Tags. Reine Eigennamen (z.B. "Adobe Photoshop", "SQL")
// bleiben in beiden Sprachen gleich und werden als einfaches Array geführt.

export const SKILL_CATEGORIES = [
  {
    id: "programming",
    title: { de: "Programmierung & Datenbanken", en: "Programming & Databases" },
    icon: "code",
    skills: ["C#", "Java", "JavaScript", "SQL", "VBA"],
  },
  {
    id: "webdev",
    title: { de: "Webentwicklung", en: "Web Development" },
    icon: "globe",
    skills: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
  {
    id: "adobe",
    title: { de: "Adobe Creative Cloud", en: "Adobe Creative Cloud" },
    icon: "palette",
    skills: [
      "Adobe Photoshop",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Adobe Animate",
      "Adobe Character Animator",
      "Adobe Audition",
    ],
  },
  {
    id: "office",
    title: { de: "Office & Wirtschaft", en: "Office & Business" },
    icon: "briefcase",
    skills: {
      de: [
        "Microsoft Word",
        "Microsoft Excel",
        "Microsoft PowerPoint",
        "Microsoft Outlook",
        "Projektmanagement",
        "Marketing",
        "Content Creation",
      ],
      en: [
        "Microsoft Word",
        "Microsoft Excel",
        "Microsoft PowerPoint",
        "Microsoft Outlook",
        "Project Management",
        "Marketing",
        "Content Creation",
      ],
    },
  },
  {
    id: "erp",
    title: { de: "ERP & Unternehmenssoftware", en: "ERP & Business Software" },
    icon: "database",
    skills: ["SAP", "BMD", "WinLine"],
  },
  {
    id: "further",
    title: { de: "Weitere Kompetenzen", en: "Additional Skills" },
    icon: "sparkles",
    skills: {
      de: [
        "Animation",
        "Motion Design",
        "Video Editing",
        "Storyboarding",
        "Marketingkonzeption",
        "Kundenbetreuung",
        "Mehrsprachige Kommunikation",
        "Präsentation",
        "Teamarbeit",
      ],
      en: [
        "Animation",
        "Motion Design",
        "Video Editing",
        "Storyboarding",
        "Marketing Conception",
        "Customer Support",
        "Multilingual Communication",
        "Presentation",
        "Teamwork",
      ],
    },
  },
];

// rank: diskrete Niveaustufe auf einer Skala von 1–5 (LANGUAGE_LEVEL_MAX).
// Bewusst KEINE erfundenen Prozentwerte, sondern echte, abgestufte Kompetenzstufen.
// Reihenfolge = Ranking (höchstes Niveau zuerst).
export const LANGUAGE_LEVEL_MAX = 5;

export const LANGUAGES = [
  { name: { de: "Deutsch", en: "German" }, level: { de: "Muttersprache", en: "Native language" }, rank: 5 },
  { name: { de: "Türkisch", en: "Turkish" }, level: { de: "Muttersprache", en: "Native language" }, rank: 5 },
  { name: { de: "Englisch", en: "English" }, level: { de: "Fließend", en: "Fluent" }, rank: 4 },
  { name: { de: "Französisch", en: "French" }, level: { de: "Grundkenntnisse", en: "Basic knowledge" }, rank: 2 },
];
