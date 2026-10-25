import Link from "next/link";
import type { Article } from "@/lib/types";
import { TOPIC_LABEL } from "@/lib/evidence";
import { readingMinutes } from "@/lib/markup";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const date = new Date(article.updated).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="flex h-full flex-col border-t-2 border-ink pt-4">
      <p className="font-sans text-xs font-semibold uppercase tracking-wider text-forest">
        {article.topics.map((t) => TOPIC_LABEL[t]).join(" · ")}
      </p>
      <h3
        className={
          "mt-3 font-serif font-semibold leading-tight " +
          (featured ? "text-3xl md:text-4xl" : "text-2xl")
        }
      >
        <Link href={`/articles/${article.slug}`} className="no-underline hover:underline">
          {article.title}
        </Link>
      </h3>
      <p className="mt-3 font-serif text-lg leading-relaxed text-muted">
        {article.excerpt}
      </p>
      <p className="mt-auto pt-4 font-sans text-sm text-muted">
        Обновлено {date} · {readingMinutes(article)} мин чтения
      </p>
    </article>
  );
}
