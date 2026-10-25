import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles, getArticle } from "@/data/articles";
import { glossaryBySlug } from "@/data/glossary";
import { ArticleBody } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { JsonLd } from "@/components/JsonLd";
import { References } from "@/components/References";
import { RelatedArticles } from "@/components/RelatedArticles";
import { TableOfContents } from "@/components/TableOfContents";
import { buildCiteIndex } from "@/lib/cites";
import { articleJsonLd, buildMetadata } from "@/lib/seo";
import { articleStrings, articleToc, readingMinutes } from "@/lib/markup";
import { TOPIC_LABEL } from "@/lib/evidence";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seoTitle,
    description: a.description,
    path: `/articles/${a.slug}`,
    type: "article",
    published: a.published,
    modified: a.updated,
  });
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { keys, index } = buildCiteIndex(articleStrings(article));
  const toc = articleToc(article);
  const path = `/articles/${article.slug}`;
  const terms = article.glossary.map((g) => glossaryBySlug.get(g)).filter((g) => g !== undefined);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          headline: article.title,
          description: article.description,
          path,
          published: article.published,
          modified: article.updated,
        })}
      />
      <article>
        <header className="wrap pt-12 md:pt-16">
          <Breadcrumbs
            items={[
              { name: "Статьи", path: "/articles" },
              { name: article.seoTitle, path },
            ]}
          />
          <p className="kicker mt-10 text-forest">
            {article.topics.map((t) => TOPIC_LABEL[t]).join(" · ")}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-xl leading-relaxed text-muted md:text-2xl">
            {article.excerpt}
          </p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-y border-line py-4 font-sans text-sm">
            <div>
              <dt className="inline text-muted">Автор: </dt>
              <dd className="inline">{article.byline}</dd>
            </div>
            <div>
              <dt className="inline text-muted">Опубликовано: </dt>
              <dd className="inline">
                <time dateTime={article.published}>{fmt(article.published)}</time>
              </dd>
            </div>
            <div>
              <dt className="inline text-muted">Обновлено: </dt>
              <dd className="inline">
                <time dateTime={article.updated}>{fmt(article.updated)}</time>
              </dd>
            </div>
            <div>
              <dt className="inline text-muted">Время чтения: </dt>
              <dd className="inline">{readingMinutes(article)} мин</dd>
            </div>
          </dl>
        </header>

        <div className="wrap mt-10 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents items={toc} />
          </aside>
          <div className="min-w-0">
            <ArticleBody article={article} cites={index} />
            <div className="max-w-2xl">
              <DisclaimerNote className="mt-12" />
              <References keys={keys} />
              {terms.length > 0 && (
                <section aria-labelledby="terms-title" className="mt-12">
                  <h2 id="terms-title" className="font-serif text-2xl font-semibold">
                    Термины из статьи
                  </h2>
                  <ul className="mt-4 flex flex-wrap gap-2 font-sans text-sm">
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
            </div>
          </div>
        </div>
      </article>
      <RelatedArticles slugs={article.related} />
    </>
  );
}
