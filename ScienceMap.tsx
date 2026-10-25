"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { stages } from "@/data/stages";
import { EVIDENCE_LADDER } from "@/lib/evidence";
import { SourceList } from "./SourceList";

export function StagesDiagram() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];

  const onKey = (e: KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % stages.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + stages.length) % stages.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = stages.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="not-prose my-10 border border-line bg-sand/50 font-sans">
      <div role="tablist" aria-label="Этапы исследования" className="grid grid-cols-3 border-b border-line">
        {stages.map((s, i) => (
          <button
            key={s.n}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            id={`stage-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`stage-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={
              "min-h-16 border-r border-line px-3 py-3 text-left last:border-r-0 md:px-5 " +
              (active === i ? "bg-forest text-paper" : "hover:bg-sand")
            }
          >
            <span className="block text-xs font-semibold tracking-widest">{s.n}</span>
            <span className="block font-serif text-sm font-semibold leading-tight md:text-lg">
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`stage-panel-${active}`}
        aria-labelledby={`stage-tab-${active}`}
        className="p-5 md:p-8"
      >
        <h3 className="font-serif text-xl font-semibold md:text-2xl">{stage.question}</h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-forest">
          {stage.summary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <p className="mt-6 border-l-4 border-ink bg-paper p-4 text-sm leading-relaxed">
          <strong>Почему это ещё не вывод.</strong> {stage.caution}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="kicker text-forest">Уровень доказательности</p>
            <ol className="mt-3 space-y-1.5" aria-label="Шкала доказательности">
              {EVIDENCE_LADDER.map((l) => {
                const on =
                  l.level === "future"
                    ? false
                    : stage.evidenceLevels.includes(l.level) ||
                      (stage.evidenceLevels.includes("review") && l.level === "human_small");
                return (
                  <li
                    key={l.rank}
                    className={
                      "flex items-start gap-3 border px-3 py-2 text-sm " +
                      (on
                        ? "border-forest bg-forest text-paper"
                        : l.level === "future"
                          ? "border-dashed border-forest text-forest"
                          : "border-line text-muted")
                    }
                    aria-current={on ? "step" : undefined}
                  >
                    <span className="font-semibold">{l.rank}</span>
                    <span>
                      {l.label}
                      {on && <span className="sr-only"> (этот этап)</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-2 text-xs text-muted">
              Пунктиром показан уровень, которого в нашей подборке пока нет.
            </p>
          </div>
          <div>
            <p className="kicker text-forest">Что остаётся неизвестным</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-forest">
              {stage.unknown.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <p className="kicker mt-6 text-forest">Источники этапа</p>
            <SourceList keys={stage.sources} />
          </div>
        </div>
      </div>

      <p className="border-t border-line px-5 py-3 text-xs text-muted md:px-8">
        Результат этапа {stage.n} не гарантирует такого же результата на следующем: многие
        эффекты, замеченные в клетках и у животных, не подтверждаются у людей.
      </p>
    </div>
  );
}
