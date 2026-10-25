import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { EvidenceLabel } from "@/components/EvidenceLabel";
import { ResearchCatalog } from "@/components/ResearchCatalog";
import { research } from "@/data/research";
import { EVIDENCE_LADDER } from "@/lib/evidence";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Что говорят исследования? Каталог научных публикаций о ежовике",
  description:
    "Каталог проверенных научных публикаций о ежовике гребенчатом: клинические исследования, работы на животных, обзоры. С DOI, PMID, результатами и ограничениями.",
  path: "/research",
});

export default function ResearchPage() {
  const partial = research.filter((r) => r.verification.status === "partial").length;
  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs items={[{ name: "Что говорят исследования?", path: "/research" }]} />
      <h1 className="mt-8 max-w-4xl font-serif text-5xl font-semibold leading-tight md:text-6xl">
        Что говорят исследования?
      </h1>
      <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
        Каталог содержит только публикации, реквизиты которых мы сверили с первичными
        страницами (PubMed, сайт издателя). Мы не добавляем работы «для объёма»: каталог
        пополняется по мере проверки.
        {partial > 0 &&
          ` У ${partial} записей реквизиты проверены не полностью, они помечены отдельно.`}
      </p>

      <details className="mt-8 max-w-3xl border border-line bg-sand/50 p-5 font-sans text-sm">
        <summary className="min-h-8 cursor-pointer font-semibold">
          Как читать шкалу доказательности
        </summary>
        <ul className="mt-4 space-y-3">
          {EVIDENCE_LADDER.filter((l) => l.level !== "future").map((l) => (
            <li key={l.rank}>
              {l.level !== "future" && <EvidenceLabel level={l.level} showHint />}
            </li>
          ))}
          <li className="text-muted">
            Пятой ступени (крупные независимые РКИ) в каталоге пока нет ни одной работы.
          </li>
          <li className="text-muted">
            У обзоров шкала показана штриховкой: их надёжность определяется качеством работ,
            которые в них вошли.
          </li>
        </ul>
      </details>

      <div className="mt-10">
        <ResearchCatalog items={research} />
      </div>

      <DisclaimerNote className="mt-14 max-w-2xl" />
    </div>
  );
}
