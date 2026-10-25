"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { KIND_LABEL, searchDocs, type DocKind, type SearchDoc } from "@/lib/search";
import { SearchBar } from "./SearchBar";

const KINDS: (DocKind | "all")[] = ["all", "article", "research", "term", "topic"];

export function LibrarySearch({ docs }: { docs: SearchDoc[] }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<DocKind | "all">("all");

  // Поддержка ссылок вида /library?q=память (в том числе из SearchAction)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  const result = useMemo(() => {
    const found = searchDocs(docs, query);
    return kind === "all" ? found : found.filter((d) => d.kind === kind);
  }, [docs, query, kind]);

  const counts = useMemo(() => {
    const found = searchDocs(docs, query);
    const c: Record<string, number> = { all: found.length };
    for (const d of found) c[d.kind] = (c[d.kind] ?? 0) + 1;
    return c;
  }, [docs, query]);

  return (
    <div>
      <SearchBar
        id="library-search"
        label="Поиск по названиям, аннотациям и ключевым словам"
        value={query}
        onChange={setQuery}
        placeholder="Например: эринацин, плацебо, безопасность"
      />
      <div role="group" aria-label="Тип материала" className="mt-4 flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className={
              "min-h-11 border px-4 font-sans text-sm font-semibold " +
              (kind === k
                ? "border-forest bg-forest text-paper"
                : "border-ink hover:bg-sand")
            }
          >
            {k === "all" ? "Всё" : KIND_LABEL[k]}{" "}
            <span className="font-normal opacity-80">({counts[k] ?? 0})</span>
          </button>
        ))}
      </div>

      <p className="mt-6 font-sans text-sm text-muted" role="status" aria-live="polite">
        {result.length === 0 ? "Ничего не найдено" : `Найдено: ${result.length}`}
      </p>

      {result.length === 0 ? (
        <div className="mt-4 border border-dashed border-ink p-8 text-center">
          <p className="font-serif text-xl">По запросу «{query}» материалов нет.</p>
          <p className="mt-2 font-sans text-sm text-muted">
            Проверьте написание или попробуйте более общее слово.
          </p>
        </div>
      ) : (
        <ul className="mt-4 divide-y divide-line border-y border-ink">
          {result.map((d) => (
            <li key={d.id} className="py-5">
              <p className="font-sans text-xs font-semibold uppercase tracking-wider text-forest">
                {KIND_LABEL[d.kind]}
                {d.meta ? ` · ${d.meta}` : ""}
              </p>
              <h3 className="mt-1 font-serif text-xl font-semibold leading-snug">
                <Link href={d.href} className="no-underline hover:underline">
                  {d.title}
                </Link>
              </h3>
              <p className="mt-1 max-w-3xl font-sans text-sm text-muted">{d.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
