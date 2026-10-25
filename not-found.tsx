import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles } from "@/data/articles";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Статьи о ежовике гребенчатом",
  description:
    "Статьи о ежовике гребенчатом: нервная система, память, безопасность и то, как читать научные исследования. Со ссылками на первоисточники.",
  path: "/articles",
});

export default function ArticlesPage() {
  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs items={[{ name: "Статьи", path: "/articles" }]} />
      <h1 className="mt-8 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">Статьи</h1>
      <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
        Каждое утверждение в статьях снабжено ссылкой на публикацию, а в конце есть список
        литературы. Врезки отделяют то, что известно, от того, что не доказано.
      </p>
      <div className="mt-14 grid gap-12 md:grid-cols-2">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
