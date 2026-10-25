import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { glossary, glossaryBySlug } from "@/data/glossary";
import { articles } from "@/data/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { References } from "@/components/References";
import { RichText } from "@/components/RichText";
import { buildCiteIndex } from "@/lib/cites";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return glossary.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = glossaryBySlug.get(slug);
  if (!g) return {};
  return buildMetadata({
    title: `${g.term}: что это такое`,
    description: g.description,
    path: `/glossary/${g.slug}`,
  });
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = glossaryBySlug.get(slug);
  if (!g) notFound();

  const { keys, index } = buildCiteIndex(g.body);
  const related = g.related.map((s) => glossaryBySlug.get(s)).filter((x) => x !== undefined);
  const inArticles = articles.filter((a) => a.glossary.includes(g.slug));

  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs
        items={[
          { name: "Словарь", path: "/glossary" },
          { name: g.term, path: `/glossary/${g.slug}` },
        ]}
      />
      <div className="mt-10 max-w-2xl">
        <p className="kicker text-forest">Термин</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-6xl">
          {g.term}
        </h1>
        {g.latin && (
          <p lang="en" className="mt-2 font-serif text-xl italic text-muted">
            {g.latin}
          </p>
        )}
        <p className="mt-6 border-l-4 border-forest pl-4 font-serif text-xl leading-relaxed">
          {g.short}
        </p>
        <div className="prose-ed">
          {g.body.map((p) => (
            <p key={p}>
              <RichText text={p} cites={index} />
            </p>
          ))}
        </div>

        <References keys={keys} />

        {related.length > 0 && (
          <section aria-labelledby="rel-t" className="mt-12">
            <h2 id="rel-t" className="font-serif text-2xl font-semibold">
              Связанные термины
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2 font-sans text-sm">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/glossary/${r.slug}`}
                    className="inline-block border border-forest px-3 py-2 text-forest no-underline hover:bg-forest hover:text-paper"
                  >
                    {r.term}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        {inArticles.length > 0 && (
          <section aria-labelledby="art-t" className="mt-10">
            <h2 id="art-t" className="font-serif text-2xl font-semibold">
              В статьях
            </h2>
            <ul className="mt-4 space-y-2 font-sans">
              {inArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        <DisclaimerNote className="mt-12" />
      </div>
    </div>
  );
}
