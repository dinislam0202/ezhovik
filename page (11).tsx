import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { topics, topicBySlug } from "@/data/topics";
import { getArticle } from "@/data/articles";
import { glossaryBySlug } from "@/data/glossary";
import { getResearch } from "@/data/research";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { Figure } from "@/components/Figure";
import { References } from "@/components/References";
import { ResearchCard } from "@/components/ResearchCard";
import { RichText } from "@/components/RichText";
import { buildCiteIndex } from "@/lib/cites";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = topicBySlug.get(slug);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title}: ежовик гребенчатый`,
    description: t.description,
    path: `/topics/${t.slug}`,
  });
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = topicBySlug.get(slug);
  if (!t) notFound();

  const { keys, index } = buildCiteIndex(t.intro);
  const arts = t.articles.map(getArticle).filter((a) => a !== undefined);
  const studies = t.research.map(getResearch).filter((r) => r !== undefined);
  const terms = t.glossary.map((g) => glossaryBySlug.get(g)).filter((g) => g !== undefined);

  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs
        items={[{ name: t.title, path: `/topics/${t.slug}` }]}
      />
      <p className="kicker mt-10 text-forest">Тема</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">{t.title}</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="prose-ed">
          {t.intro.map((p) => (
            <p key={p}>
              <RichText text={p} cites={index} />
            </p>
          ))}
          {t.note && (
            <p className="mt-6 border-l-2 border-olive pl-4 font-sans text-sm text-muted">
              {t.note}
            </p>
          )}
        </div>
        <div>
          <Figure
            kind={t.illustration}
            alt={t.illustrationAlt}
            caption="Схематическая иллюстрация. Условный рисунок, не фотография и не микроскопический снимок."
          />
        </div>
      </div>

      {arts.length > 0 && (
        <section aria-labelledby="t-arts" className="mt-16">
          <h2 id="t-arts" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
            Статьи по теме
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {arts.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {studies.length > 0 && (
        <section aria-labelledby="t-res" className="mt-16">
          <h2 id="t-res" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
            Исследования по теме
          </h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studies.map((r) => (
              <li key={r.id}>
                <ResearchCard r={r} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {terms.length > 0 && (
        <section aria-labelledby="t-terms" className="mt-16">
          <h2 id="t-terms" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
            Термины
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2 font-sans text-sm">
            {terms.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/glossary/${g.slug}`}
                  className="inline-block border border-forest px-3 py-2 text-forest no-underline hover:bg-forest hover:text-paper"
                >
                  {g.term}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6 max-w-3xl">
        <References keys={keys} />
        <DisclaimerNote className="mt-12" />
      </div>
    </div>
  );
}
