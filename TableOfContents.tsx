import type { IllustrationKind } from "@/lib/types";

/**
 * Авторские схематические иллюстрации (SVG). Это условные рисунки,
 * а не фотографии и не микроскопические снимки. Подписи на сайте это прямо указывают.
 */
export function Illustration({
  kind,
  alt,
  className = "",
}: {
  kind: IllustrationKind;
  alt: string;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
    >
      {kind === "mushroom" && <Mushroom />}
      {kind === "hyphae" && <Hyphae />}
      {kind === "molecule" && <Molecule />}
      {kind === "neuron" && <Neuron />}
      {kind === "evidence" && <Evidence />}
    </svg>
  );
}

function Mushroom() {
  // Плодовое тело: «грива» из свисающих игл разной длины
  const spines = Array.from({ length: 46 }, (_, i) => {
    const t = i / 45;
    const x = 230 + t * 340;
    const edge = Math.sin(t * Math.PI);
    const len = 70 + edge * 150 + ((i * 37) % 23);
    const sway = Math.sin(i * 1.7) * 6;
    return { x, len, sway, w: 3.2 + ((i * 13) % 5) * 0.5 };
  });
  return (
    <>
      <rect width="800" height="600" fill="#16211a" />
      <defs>
        <radialGradient id="glow" cx="50%" cy="38%" r="55%">
          <stop offset="0" stopColor="#4d6b57" stopOpacity="0.55" />
          <stop offset="1" stopColor="#16211a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#glow)" />
      {/* бревно */}
      <path d="M0 150 Q400 90 800 140 L800 0 L0 0Z" fill="#0e1712" />
      <path d="M0 150 Q400 90 800 140" stroke="#2c3b2f" strokeWidth="2" fill="none" />
      {/* тело гриба */}
      <path
        d="M200 140 Q400 70 600 140 Q640 250 590 330 Q400 380 210 330 Q160 250 200 140Z"
        fill="#ece6d6"
      />
      <path
        d="M240 160 Q400 110 560 160 Q590 250 550 310 Q400 345 250 310 Q215 250 240 160Z"
        fill="#f5f2eb"
        opacity="0.8"
      />
      {/* иглы */}
      <g stroke="#f5f2eb" strokeLinecap="round" fill="none">
        {spines.map((s, i) => (
          <path
            key={i}
            d={`M${s.x} 300 Q${s.x + s.sway} ${300 + s.len / 2} ${s.x + s.sway * 1.6} ${300 + s.len}`}
            strokeWidth={s.w}
            opacity={0.55 + (i % 4) * 0.12}
          />
        ))}
      </g>
      {/* точки-споры на фоне */}
      <g fill="#a3ac8a" opacity="0.35">
        {Array.from({ length: 28 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 211) % 800}
            cy={380 + ((i * 97) % 200)}
            r={1.5 + (i % 3)}
          />
        ))}
      </g>
    </>
  );
}

function Hyphae() {
  const strands = Array.from({ length: 16 }, (_, i) => {
    const y = 60 + i * 34;
    const a = ((i * 53) % 90) - 45;
    const b = ((i * 29) % 80) - 40;
    return `M-20 ${y} C 200 ${y + a}, 420 ${y + b}, 820 ${y + a / 2}`;
  });
  const branches = Array.from({ length: 22 }, (_, i) => {
    const x = 40 + i * 35;
    const y = 80 + ((i * 71) % 440);
    const dx = 50 + ((i * 17) % 50);
    const dy = ((i * 41) % 120) - 60;
    return `M${x} ${y} q ${dx / 2} ${dy / 2} ${dx} ${dy}`;
  });
  return (
    <>
      <rect width="800" height="600" fill="#16211a" />
      <g stroke="#a3ac8a" fill="none" strokeLinecap="round">
        {strands.map((d, i) => (
          <path key={i} d={d} strokeWidth={1 + (i % 3) * 0.7} opacity={0.35 + (i % 4) * 0.12} />
        ))}
        {branches.map((d, i) => (
          <path key={`b${i}`} d={d} strokeWidth="1.2" opacity="0.5" />
        ))}
      </g>
      <g fill="#f5f2eb" opacity="0.8">
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={60 + ((i * 137) % 700)} cy={80 + ((i * 91) % 440)} r="3" />
        ))}
      </g>
    </>
  );
}

function Molecule() {
  const hex = (cx: number, cy: number, r: number) => {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    return pts.join(" ");
  };
  return (
    <>
      <rect width="800" height="600" fill="#e8e1d4" />
      <g fill="none" stroke="#284d3a" strokeWidth="3" strokeLinejoin="round">
        <polygon points={hex(260, 300, 70)} />
        <polygon points={hex(381, 370, 70)} />
        <polygon points={hex(502, 300, 70)} />
        <path d="M502 230 L502 150 L580 105" />
        <path d="M580 105 L660 150 L660 240" />
        <path d="M381 300 L381 210 L300 165" />
        <path d="M260 230 L200 170" />
      </g>
      <g fill="#284d3a">
        {[
          [502, 150],
          [580, 105],
          [660, 150],
          [381, 210],
          [300, 165],
          [200, 170],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" />
        ))}
      </g>
      <circle cx="660" cy="250" r="12" fill="#f5f2eb" stroke="#284d3a" strokeWidth="3" />
    </>
  );
}

function Neuron() {
  const dendrites = [
    "M330 270 C 270 230, 240 180, 190 140 M240 190 C 215 195, 195 190, 170 200",
    "M330 300 C 260 300, 200 280, 130 300 M200 288 C 175 270, 160 250, 120 250",
    "M340 330 C 290 380, 250 410, 200 470 M250 410 C 220 410, 190 420, 170 440",
    "M380 235 C 370 180, 380 130, 350 80 M368 150 C 395 135, 410 120, 420 90",
    "M410 345 C 400 400, 410 450, 380 510",
  ];
  return (
    <>
      <rect width="800" height="600" fill="#16211a" />
      <g stroke="#a3ac8a" strokeWidth="3.5" fill="none" strokeLinecap="round">
        {dendrites.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {/* аксон */}
        <path d="M430 300 C 520 300, 560 270, 640 285 S 740 320, 800 300" strokeWidth="5" />
      </g>
      <g stroke="#a3ac8a" strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M560 276 l 14 -34 M610 280 l 8 38 M690 300 l 10 -36" />
      </g>
      <ellipse cx="380" cy="300" rx="62" ry="58" fill="#4d6b57" stroke="#a3ac8a" strokeWidth="3" />
      <circle cx="372" cy="296" r="20" fill="#16211a" stroke="#a3ac8a" strokeWidth="2" />
      {/* миелин: условные сегменты */}
      <g fill="#ece6d6" opacity="0.9">
        {[500, 560, 620, 680].map((x, i) => (
          <rect key={i} x={x} y={282 + (i % 2 ? 2 : -2)} width="38" height="22" rx="11" />
        ))}
      </g>
    </>
  );
}

function Evidence() {
  const steps = [
    { label: "Химия", h: 70 },
    { label: "Клетки", h: 120 },
    { label: "Животные", h: 170 },
    { label: "Люди (малые выборки)", h: 220 },
    { label: "Крупные независимые РКИ", h: 270, empty: true },
  ];
  return (
    <>
      <rect width="800" height="600" fill="#e8e1d4" />
      {steps.map((s, i) => (
        <g key={s.label}>
          <rect
            x={50 + i * 142}
            y={480 - s.h}
            width="130"
            height={s.h}
            fill={s.empty ? "none" : "#284d3a"}
            stroke="#284d3a"
            strokeWidth="2.5"
            strokeDasharray={s.empty ? "8 6" : undefined}
          />
          <text
            x={115 + i * 142}
            y={470 - s.h / 2 + 6}
            textAnchor="middle"
            fontSize="20"
            fontFamily="Inter Variable, system-ui, sans-serif"
            fontWeight="600"
            fill={s.empty ? "#284d3a" : "#f5f2eb"}
          >
            {i + 1}
          </text>
          <text
            x={115 + i * 142}
            y="512"
            textAnchor="middle"
            fontSize="15"
            fontFamily="Inter Variable, system-ui, sans-serif"
            fill="#20251f"
          >
            {s.label.length > 14 ? s.label.slice(0, s.label.indexOf(" ", 8)) : s.label}
          </text>
          {s.label.length > 14 && (
            <text
              x={115 + i * 142}
              y="531"
              textAnchor="middle"
              fontSize="15"
              fontFamily="Inter Variable, system-ui, sans-serif"
              fill="#20251f"
            >
              {s.label.slice(s.label.indexOf(" ", 8) + 1)}
            </text>
          )}
        </g>
      ))}
      <text
        x="50"
        y="60"
        fontSize="18"
        fontFamily="Inter Variable, system-ui, sans-serif"
        fill="#566053"
      >
        Чем выше ступень, тем ближе к вопросу «поможет ли это человеку»
      </text>
    </>
  );
}
