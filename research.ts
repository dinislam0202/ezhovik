"use client";

import Link from "next/link";
import { useState } from "react";
import { mapNodes, mapEdges } from "@/data/map";
import { SourceList } from "./SourceList";

const W = 960;
const H = 560;
const NW = 170;
const NH = 62;

export function ScienceMap() {
  const [activeId, setActiveId] = useState<string>("mushroom");
  const active = mapNodes.find((n) => n.id === activeId)!;
  const byId = new Map(mapNodes.map((n) => [n.id, n]));

  return (
    <div className="font-sans">
      {/* Схема для широких экранов */}
      <div className="hidden overflow-hidden border border-line bg-paper md:block">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="group"
          aria-label="Научная карта ежовика: узлы и связи. Выберите узел, чтобы прочитать описание."
          className="block w-full"
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10z" fill="#284d3a" />
            </marker>
          </defs>
          {mapEdges.map((e) => {
            const a = byId.get(e.from)!;
            const b = byId.get(e.to)!;
            // Линия от края прямоугольника к краю
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const sx = Math.abs(dx) / (NW / 2) > Math.abs(dy) / (NH / 2) ? Math.sign(dx) * (NW / 2) : (dx / Math.abs(dy || 1)) * (NH / 2);
            const sy = Math.abs(dx) / (NW / 2) > Math.abs(dy) / (NH / 2) ? (dy / Math.abs(dx || 1)) * (NW / 2) : Math.sign(dy) * (NH / 2);
            const x1 = a.x + sx;
            const y1 = a.y + sy;
            const x2 = b.x - sx;
            const y2 = b.y - sy;
            return (
              <line
                key={`${e.from}-${e.to}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#284d3a"
                strokeWidth="2"
                strokeDasharray={e.uncertain ? "7 6" : undefined}
                markerEnd="url(#arrow)"
              />
            );
          })}
          {mapNodes.map((n) => {
            const on = n.id === activeId;
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={n.label}
                onClick={() => setActiveId(n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(n.id);
                  }
                }}
                className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[4]"
              >
                <rect
                  x={n.x - NW / 2}
                  y={n.y - NH / 2}
                  width={NW}
                  height={NH}
                  fill={on ? "#284d3a" : "#f5f2eb"}
                  stroke="#284d3a"
                  strokeWidth="2"
                />
                <text
                  x={n.x}
                  y={n.lines[1] ? n.y - 5 : n.y + 5}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="600"
                  fill={on ? "#f5f2eb" : "#20251f"}
                  fontFamily="Inter Variable, system-ui, sans-serif"
                >
                  {n.lines[0]}
                </text>
                {n.lines[1] && (
                  <text
                    x={n.x}
                    y={n.y + 15}
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="600"
                    fill={on ? "#f5f2eb" : "#20251f"}
                    fontFamily="Inter Variable, system-ui, sans-serif"
                  >
                    {n.lines[1]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <p className="border-t border-line px-4 py-2 text-xs text-muted">
          Сплошная линия — связь описана в литературе. Пунктир — переход, который не гарантирован:
          результаты лабораторных моделей не всегда подтверждаются у людей.
        </p>
      </div>

      {/* Список для узких экранов */}
      <div className="md:hidden">
        <label htmlFor="map-select" className="kicker text-forest">
          Элемент схемы
        </label>
        <select
          id="map-select"
          value={activeId}
          onChange={(e) => setActiveId(e.target.value)}
          className="mt-2 block min-h-12 w-full border border-forest bg-paper px-3"
        >
          {mapNodes.map((n) => (
            <option key={n.id} value={n.id}>
              {n.label}
            </option>
          ))}
        </select>
      </div>

      <div
        aria-live="polite"
        className="mt-4 border border-line bg-sand/60 p-5 md:p-7"
      >
        <h3 className="font-serif text-2xl font-semibold">{active.label}</h3>
        <p className="mt-3 max-w-3xl leading-relaxed">{active.summary}</p>
        {active.caution && (
          <p className="mt-4 max-w-3xl border-l-4 border-ink bg-paper p-3 text-sm">
            <strong>Осторожно.</strong> {active.caution}
          </p>
        )}
        <p className="kicker mt-5 text-forest">Публикации</p>
        <SourceList keys={active.sources} />
        {active.glossary && (
          <p className="mt-4 text-sm">
            <Link href={`/glossary/${active.glossary}`} className="text-forest">
              Что это значит: словарь →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
