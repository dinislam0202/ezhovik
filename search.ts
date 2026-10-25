import { getResearch, shortCite } from "@/data/research";

/**
 * Номер источника рядом с утверждением. Ведёт к записи в списке литературы
 * на этой же странице (якорь #ref-N).
 */
export function CitationLink({ citeKey, n }: { citeKey: string; n: number }) {
  const r = getResearch(citeKey);
  if (!r) {
    // Ловим опечатки на этапе сборки, а не показываем читателю битую ссылку
    throw new Error(`Неизвестный источник: ${citeKey}`);
  }
  return (
    <a
      href={`#ref-${n}`}
      className="cite"
      aria-label={`Источник ${n}: ${shortCite(r)}`}
      title={`${shortCite(r)} — ${r.titleRu}`}
    >
      [{n}]
    </a>
  );
}
