import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { glossary } from "@/data/glossary";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Словарь терминов: гериценоны, эринацины, РКИ и другие",
  description:
    "Словарь терминов о ежовике гребенчатом и научных исследованиях: гериценоны, эринацины, нейротрофические факторы, рандомизированное исследование, плацебо.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const items = [...glossary].sort((a, b) => a.term.localeCompare(b.term, "ru"));
  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs items={[{ name: "Словарь", path: "/glossary" }]} />
      <h1 className="mt-8 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">
        Словарь терминов
      </h1>
      <dl className="mt-12 max-w-3xl divide-y divide-line border-y border-ink">
        {items.map((g) => (
          <div key={g.slug} className="py-6">
            <dt className="font-serif text-2xl font-semibold">
              <Link href={`/glossary/${g.slug}`} className="no-underline hover:underline">
                {g.term}
              </Link>
              {g.latin && (
                <span lang="en" className="ml-3 font-sans text-sm font-normal italic text-muted">
                  {g.latin}
                </span>
              )}
            </dt>
            <dd className="mt-2 font-serif text-lg text-muted">{g.short}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
