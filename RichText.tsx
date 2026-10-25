import Link from "next/link";
import { getResearch } from "@/data/research";
import type { Research } from "@/lib/types";

export function referenceLine(r: Research): string {
  const ids = [
    r.doi ? `DOI: ${r.doi}` : null,
    r.pmid ? `PMID: ${r.pmid}` : null,
    r.pmcid ? `PMCID: ${r.pmcid}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  return ids;
}

/** Нумерованный список литературы. Якоря #ref-N совпадают с номерами в тексте. */
export function References({ keys }: { keys: string[] }) {
  if (keys.length === 0) return null;
  return (
    <section aria-labelledby="refs-title" className="mt-14 border-t border-ink pt-6">
      <h2 id="refs-title" className="font-serif text-2xl font-semibold">
        Список литературы
      </h2>
      <ol className="mt-5 space-y-4 font-sans text-sm leading-relaxed">
        {keys.map((k, i) => {
          const r = getResearch(k);
          if (!r) throw new Error(`Неизвестный источник: ${k}`);
          return (
            <li key={k} id={`ref-${i + 1}`} className="scroll-mt-24 pl-1">
              <span className="font-semibold">[{i + 1}]</span> {r.authors.join(", ")}
              {r.authorsNote ? " и др." : ""} ({r.year}). {r.title}.{" "}
              <span lang="en" className="italic">
                {r.journal}
              </span>
              , {r.citation}. {referenceLine(r)}
              {r.verification.status === "partial" && (
                <span className="ml-1 font-semibold"> [реквизиты требуют проверки]</span>
              )}{" "}
              <a href={r.url} rel="noopener noreferrer" target="_blank">
                Читать оригинал
              </a>{" "}
              ·{" "}
              <Link href={`/research/${r.id}`}>карточка на сайте</Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
