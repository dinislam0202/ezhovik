import Link from "next/link";
import type { Research } from "@/lib/types";
import { STUDY_TYPE_SHORT, TOPIC_LABEL } from "@/lib/evidence";
import { formatAuthors } from "@/data/research";
import { EvidenceLabel } from "./EvidenceLabel";

export function ResearchCard({ r }: { r: Research }) {
  return (
    <article className="flex h-full flex-col border border-line bg-paper p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-semibold uppercase tracking-wider text-forest">
        <span>{r.year}</span>
        <span aria-hidden="true">·</span>
        <span>{STUDY_TYPE_SHORT[r.type]}</span>
      </div>
      <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
        <Link href={`/research/${r.id}`} className="no-underline hover:underline">
          {r.titleRu}
        </Link>
      </h3>
      <p lang="en" className="mt-2 font-sans text-sm italic text-muted">
        {r.title}
      </p>
      <p className="mt-3 font-sans text-sm">
        {formatAuthors(r)} · <span className="italic">{r.journal}</span>
      </p>
      <p className="mt-3 font-sans text-sm text-muted">
        {r.subject.split(";")[0]}
        {r.sampleSize ? ` · ${r.sampleSize}` : ""}
      </p>
      <div className="mt-auto pt-5">
        <EvidenceLabel level={r.evidence} />
        <ul className="mt-3 flex flex-wrap gap-2 font-sans text-xs">
          {r.topics.map((t) => (
            <li key={t} className="bg-sand px-2 py-1">
              {TOPIC_LABEL[t]}
            </li>
          ))}
          {r.verification.status === "partial" && (
            <li className="border border-ink px-2 py-1 font-semibold">
              Требует проверки
            </li>
          )}
        </ul>
        <Link
          href={`/research/${r.id}`}
          className="mt-4 inline-block font-sans text-sm font-semibold text-forest"
        >
          Подробная карточка →
        </Link>
      </div>
    </article>
  );
}
