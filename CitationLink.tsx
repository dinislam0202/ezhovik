import { getArticle } from "@/data/articles";
import { ArticleCard } from "./ArticleCard";

export function RelatedArticles({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getArticle).filter((a) => a !== undefined);
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="related-title" className="wrap mt-20">
      <h2 id="related-title" className="font-serif text-3xl font-semibold">
        Читайте также
      </h2>
      <div className="mt-8 grid gap-10 md:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
