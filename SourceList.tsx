"use client";

import type { StudyType, Topic } from "@/lib/types";
import { STUDY_TYPE_LABEL, TOPIC_LABEL, STUDY_TYPES, TOPICS } from "@/lib/evidence";

export type SortOrder = "new" | "old";

export interface Filters {
  type: StudyType | "all";
  topic: Topic | "all";
  year: string; // "all" или год
  sort: SortOrder;
}

const selectCls =
  "mt-2 block min-h-12 w-full border border-ink bg-paper px-3 font-sans text-base";

export function FilterPanel({
  filters,
  years,
  onChange,
  onReset,
  dirty,
}: {
  filters: Filters;
  years: number[];
  onChange: (f: Filters) => void;
  onReset: () => void;
  dirty: boolean;
}) {
  return (
    <form
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Фильтры каталога"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label htmlFor="f-topic" className="kicker text-forest">
          Тема
        </label>
        <select
          id="f-topic"
          className={selectCls}
          value={filters.topic}
          onChange={(e) => onChange({ ...filters, topic: e.target.value as Filters["topic"] })}
        >
          <option value="all">Все темы</option>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {TOPIC_LABEL[t]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-type" className="kicker text-forest">
          Тип исследования
        </label>
        <select
          id="f-type"
          className={selectCls}
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as Filters["type"] })}
        >
          <option value="all">Все типы</option>
          {STUDY_TYPES.map((t) => (
            <option key={t} value={t}>
              {STUDY_TYPE_LABEL[t]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-year" className="kicker text-forest">
          Год публикации
        </label>
        <select
          id="f-year"
          className={selectCls}
          value={filters.year}
          onChange={(e) => onChange({ ...filters, year: e.target.value })}
        >
          <option value="all">Любой год</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="f-sort" className="kicker text-forest">
          Сортировка
        </label>
        <select
          id="f-sort"
          className={selectCls}
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOrder })}
        >
          <option value="new">Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </div>
      {dirty && (
        <div className="sm:col-span-2 lg:col-span-4">
          <button type="button" onClick={onReset} className="btn btn-line">
            Сбросить фильтры
          </button>
        </div>
      )}
    </form>
  );
}
