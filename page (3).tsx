import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { research, researchById } from "@/data/research";
import { articles } from "@/data/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { EvidenceLabel } from "@/components/EvidenceLabel";
import { RichText } from "@/components/RichText";
import { buildMetadata } from "@/lib/seo";
import { STUDY_TYPE_LABEL, TOPIC_LABEL } from "@/lib/evidence";
import { articleStrings, extractCites } from "@/lib/markup";
import { citeKeys } from "@/data/research";

export function generateStaticParams() {
  return research.map((r) => ({ id: r.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const r = researchById.get(id);
  if (!r) return {};
  return buildMetadata({
    title: `${r.titleRu} (${r.authors[0].split(" ")[0]}, ${r.year})`,
    description: `${STUDY_TYPE_LABEL[r.type]}, ${r.year}, ${r.journal}. Результаты и ограничения работы с проверяемыми реквизитами.`,
    path: `/research/${r.id}`,
  });
}

export default async function ResearchDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const r = researchById.get(id);
  if (!r) notFound();

  const key = Object.entries(citeKeys).find(([, v]) => v === r.id)?.[0];
  const cites = articles.filter((a) => key && extractCites(articleStrings(a)).includes(key));

  const rows: [string, React.ReactNode][] = [
    ["Тип исследования", STUDY_TYPE_LABEL[r.type]],
    ["Объект", r.subject],
    ...(r.sampleSize ? ([["Выборка", r.sampleSize]] as [string, string][]) : []),
    ["Журнал", <span key="j" lang="en" className="italic">{r.journal}, {r.citation}</span>],
    ["Тема", r.topics.map((t) => TOPIC_LABEL[t]).join(", ")],
    ...(r.registration ? ([["Регистрация", r.registration]] as [string, string][]) : []),
  ];

  const ids = [
    r.doi && { label: "DOI", value: r.doi, href: `https://doi.org/${r.doi}` },
    r.pmid && { label: "PMID", value: r.pmid, href: `https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/` },
    r.pmcid && { label: "PMCID", value: r.pmcid, href: `https://pmc.ncbi.nlm.nih.gov/articles/${r.pmcid}/` },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <article className="wrap py-12 md:py-16">
      <Breadcrumbs
        items={[
          { name: "Что говорят исследования?", path: "/research" },
          { name: `${r.authors[0].split(" ")[0]}, ${r.year}`, path: `/research/${r.id}` },
        ]}
      />
      <p className="kicker mt-10 text-forest">
        {STUDY_TYPE_LABEL[r.type]} · {r.year}
      </p>
      <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-tight md:text-5xl">
        {r.titleRu}
      </h1>
      <p lang="en" className="mt-4 max-w-4xl font-serif text-xl italic text-muted">
        {r.title}
      </p>
      <p className="mt-4 font-sans text-sm">
        {r.authors.join(", ")}
        {r.authorsNote && <span className="block text-muted">{r.authorsNote}</span>}
      </p>
      <div className="mt-5">
        <EvidenceLabel level={r.evidence} showHint />
      </div>

      {r.verification.status === "partial" && (
        <p className="mt-8 max-w-3xl border-l-4 border-ink bg-sand p-4 font-sans text-sm">
          <strong>Требует проверки.</strong> {r.verification.note}
        </p>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem]">
        <div className="max-w-3xl">
          <section aria-labelledby="results">
            <h2 id="results" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
              Основные результаты
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 font-serif text-lg leading-relaxed marker:text-forest">
              {r.results.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="limits" className="mt-12">
            <h2 id="limits" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
              Ограничения исследования
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 font-serif text-lg leading-relaxed marker:text-forest">
              {r.limitations.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="check" className="mt-12">
            <h2 id="check" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
              Как сверена карточка
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed">{r.verification.note}</p>
            <p className="mt-3 font-sans text-sm text-muted">
              Пересказ результатов — наш; он не заменяет чтения оригинала. Дозировки и режимы
              приёма на сайте намеренно не приводятся.
            </p>
          </section>

          {cites.length > 0 && (
            <section aria-labelledby="in-articles" className="mt-12">
              <h2 id="in-articles" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
                Где разобрана на сайте
              </h2>
              <ul className="mt-4 space-y-2 font-sans">
                {cites.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit border border-ink p-5 font-sans text-sm lg:sticky lg:top-24">
          <dl className="space-y-4">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="kicker text-forest">{k}</dt>
                <dd className="mt-1">{v}</dd>
              </div>
            ))}
            <div>
              <dt className="kicker text-forest">Идентификаторы</dt>
              <dd className="mt-1 space-y-1">
                {ids.map((i) => (
                  <div key={i.label}>
                    {i.label}:{" "}
                    <a href={i.href} rel="noopener noreferrer" target="_blank">
                      {i.value}
                    </a>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
          <a
            href={r.url}
            rel="noopener noreferrer"
            target="_blank"
            className="btn btn-solid mt-6 w-full no-underline"
          >
            Читать оригинал
          </a>
          <Link href="/research" className="mt-4 block text-center">
            ← Весь каталог
          </Link>
        </aside>
      </div>

      <DisclaimerNote className="mt-14 max-w-2xl" />
    </article>
  );
}
