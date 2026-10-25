import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { glossary } from "@/data/glossary";
import { research } from "@/data/research";
import { absoluteUrl, site } from "@/data/site";
import { topics } from "@/data/topics";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = new Date(site.contentUpdated);
  const stat = ["/", "/research", "/articles", "/myths", "/safety", "/library", "/glossary", "/about"];
  return [
    ...stat.map((p) => ({
      url: absoluteUrl(p),
      lastModified: base,
      changeFrequency: "monthly" as const,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(`/articles/${a.slug}`),
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...topics.map((t) => ({
      url: absoluteUrl(`/topics/${t.slug}`),
      lastModified: base,
      priority: 0.7,
    })),
    ...research.map((r) => ({
      url: absoluteUrl(`/research/${r.id}`),
      lastModified: base,
      priority: 0.6,
    })),
    ...glossary.map((g) => ({
      url: absoluteUrl(`/glossary/${g.slug}`),
      lastModified: base,
      priority: 0.6,
    })),
  ];
}
