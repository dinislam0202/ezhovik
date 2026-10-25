"use client";

import { useMemo, useState } from "react";
import type { Research } from "@/lib/types";
import { searchDocs, type SearchDoc } from "@/lib/search";
import { sortKey, formatAuthors } from "@/data/research";
import { FilterPanel, type Filters } from "./FilterPanel";
import { SearchBar } from "./SearchBar";
import { ResearchCard } from "./ResearchCard";

const DEFAULT: Filters = { type: "all", topic: "all", year: "all", sort: "new" };

export function ResearchCatalog({ items }: { items: Research[] }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT);

  const years = useMemo(
    () => [...new Set(items.map((r) => r.year))].sort((a, b) => b - a),
    [items],
  );

  const docs = useMemo(
    () =>
      items.map(
        (r): SearchDoc & { r: Research } => ({
          r,
          id: r.id,
          kind: "research",
          title: `${r.titleRu} ${r.title}`,
          summary: r.subject,
          href: `/research/${r.id}`,
          keywords: r.keywords,
          text: [r.journal, formatAuthors(r, 30), r.results.join(" "), r.limitations.join(" ")].join(" "),
        }),
      ),
    [items],
  );

  const result = useMemo(() => {
    const found = searchDocs(docs, query).map((d) => d.r);
    const filtered = found.filter(
      (r) =>
        (filters.type === "all" || r.type === filters.type) &&
        (filters.topic === "all" || r.topics.includes(filters.topic)) &&
        (filters.year === "all" || r.year === Number(filters.year)),
    );
    // Поиск сохраняет порядок по релевантности, пока не выбрана сортировка вручную
    const sorted = [...filtered].sort((a, b) =>
      filters.sort === "new" ? sortKey(b) - sortKey(a) : sortKey(a) - sortKey(b),
    );
    return sorted;
  }, [docs, query, filters]);

  const dirty =
    query !== "" || filters.type !== "all" || filters.topic !== "all" || filters.year !== "all";

  const reset = () => {
    setQuery("");
    setFilters(DEFAULT);
  };

  return (
    <div>
      <div className="space-y-5 border-y border-ink py-6">
        <SearchBar
          id="research-search"
          label="Поиск по каталогу"
          value={query}
          onChange={setQuery}
          placeholder="Например: плацебо, гериценоны, мыши, Mori"
        />
        <FilterPanel
          filters={filters}
          years={years}
          onChange={setFilters}
          onReset={reset}
          dirty={dirty}
        />
      </div>

      <p className="mt-6 font-sans text-sm text-muted" role="status" aria-live="polite">
        {result.length === 0
          ? "Ничего не найдено"
          : `Найдено публикаций: ${result.length} из ${items.length}`}
      </p>

      {result.length === 0 ? (
        <div className="mt-6 border border-dashed border-ink p-8 text-center">
          <p className="font-serif text-xl">По этим условиям публикаций нет.</p>
          <p className="mt-2 font-sans text-sm text-muted">
            Каталог содержит только проверенные работы и пополняется постепенно.
            Попробуйте изменить запрос или снять фильтры.
          </p>
          <button type="button" onClick={reset} className="btn btn-solid mt-5">
            Сбросить поиск и фильтры
          </button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {result.map((r) => (
            <li key={r.id}>
              <ResearchCard r={r} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
