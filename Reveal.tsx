import { EVIDENCE_META } from "@/lib/evidence";
import type { EvidenceLevel } from "@/lib/types";

/**
 * Обозначение уровня доказательности: пятиступенчатая шкала
 * (химия → клетки → животные → люди → крупные независимые РКИ).
 * Обзоры показываются штриховкой: их надёжность зависит от включённых работ.
 */
export function EvidenceLabel({
  level,
  showHint = false,
}: {
  level: EvidenceLevel;
  showHint?: boolean;
}) {
  const meta = EVIDENCE_META[level];
  const isReview = level === "review";
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-semibold text-ink"
      title={meta.hint}
    >
      <span className="sr-only">Уровень доказательности: </span>
      <span aria-hidden="true" className="flex items-end gap-[3px]">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = !isReview && i <= meta.rank;
          return (
            <span
              key={i}
              className={
                "block w-[5px] border border-forest " +
                (filled ? "bg-forest" : isReview ? "bg-olive/50" : "bg-transparent")
              }
              style={{ height: 5 + i * 3 }}
            />
          );
        })}
      </span>
      <span>{meta.label}</span>
      {showHint && <span className="font-normal text-muted">· {meta.hint}</span>}
    </span>
  );
}
