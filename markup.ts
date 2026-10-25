import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Главная", path: "/" }, ...items];
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-muted">
      <JsonLd data={breadcrumbJsonLd(all)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="hover:text-forest">
                  {c.name}
                </Link>
              )}
              {!last && (
                <span aria-hidden="true" className="text-olive">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
