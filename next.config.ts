export interface MapNode {
  id: string;
  label: string;
  /** Подпись в две строки для SVG */
  lines: [string, string?];
  /** Позиция центра узла в viewBox 960x560 */
  x: number;
  y: number;
  summary: string;
  caution?: string;
  sources: string[];
  glossary?: string;
}

export interface MapEdge {
  from: string;
  to: string;
  /** Пунктир — связь не подтверждена на следующем уровне */
  uncertain?: boolean;
}

export const mapNodes: MapNode[] = [
  {
    id: "mushroom",
    label: "Ежовик гребенчатый",
    lines: ["Ежовик", "гребенчатый"],
    x: 130,
    y: 280,
    summary:
      "Hericium erinaceus — съедобный гриб, распространённый в Европе, Азии и Северной Америке. В Китае его называют Houtou или Shishigashira, в Японии — Yamabushitake.",
    sources: ["thongbai2015"],
    glossary: "hericium-erinaceus",
  },
  {
    id: "compounds",
    label: "Биологически активные соединения",
    lines: ["Активные", "соединения"],
    x: 340,
    y: 130,
    summary:
      "Гериценоны выделены из плодовых тел, эринацины — из мицелия. Это главный предмет интереса исследователей, но их эффекты изучены в основном в лаборатории.",
    caution:
      "Описание вещества не доказывает пользу при употреблении гриба.",
    sources: ["ma2010", "thongbai2015"],
    glossary: "hericenones",
  },
  {
    id: "neurotrophins",
    label: "Нейротрофические факторы",
    lines: ["Нейротрофические", "факторы"],
    x: 560,
    y: 130,
    summary:
      "Фактор роста нервов (NGF) и другие нейротрофины — белки, поддерживающие нервные клетки. В клеточных моделях экстракты ежовика усиливали экспрессию NGF, но очищенные гериценоны C, D и E в одной из работ этого не делали.",
    caution:
      "Это предполагаемый механизм, а не доказанный клинический эффект.",
    sources: ["mori2008", "ma2010"],
    glossary: "neurotrophic-factors",
  },
  {
    id: "models",
    label: "Клеточные и животные модели",
    lines: ["Клетки и", "животные"],
    x: 560,
    y: 280,
    summary:
      "Клетки астроцитомы и PC12, мыши и крысы: экстракты стимулировали NGF и рост отростков, у стареющих мышей отмечены маркеры нейрогенеза, а токсикологические исследования не выявили вреда.",
    caution:
      "Малые группы, предварительные данные, перенос на человека не гарантирован.",
    sources: ["mori2008", "ratto2019", "lakshmanan2016", "chen2022"],
    glossary: "in-vitro-in-vivo",
  },
  {
    id: "clinical",
    label: "Клинические исследования",
    lines: ["Клинические", "исследования"],
    x: 780,
    y: 280,
    summary:
      "Небольшие рандомизированные исследования при лёгком когнитивном нарушении, ранней болезни Альцгеймера и у здоровых людей, а также систематический обзор 2025 года.",
    caution:
      "Результаты разнородны; крупных независимых исследований нет.",
    sources: ["mori2009", "li2020", "nagano2010", "docherty2023", "menon2025"],
    glossary: "rct",
  },
  {
    id: "safety",
    label: "Вопросы безопасности",
    lines: ["Вопросы", "безопасности"],
    x: 560,
    y: 440,
    summary:
      "Возможны дискомфорт в животе, тошнота, головная боль и аллергические реакции. Токсикология на крысах благоприятна, но данные о долгом приёме у людей и о взаимодействиях отсутствуют.",
    sources: ["li2020", "menon2025", "lakshmanan2016", "chen2022"],
  },
  {
    id: "future",
    label: "Перспективы дальнейших исследований",
    lines: ["Перспективы", "исследований"],
    x: 820,
    y: 440,
    summary:
      "Нужны крупные независимые рандомизированные исследования с заранее зарегистрированными исходами, охарактеризованными препаратами и длительным наблюдением.",
    sources: ["menon2025", "li2020"],
  },
];

export const mapEdges: MapEdge[] = [
  { from: "mushroom", to: "compounds" },
  { from: "compounds", to: "neurotrophins" },
  { from: "neurotrophins", to: "models" },
  { from: "models", to: "clinical", uncertain: true },
  { from: "mushroom", to: "safety" },
  { from: "clinical", to: "future" },
  { from: "safety", to: "future" },
];
