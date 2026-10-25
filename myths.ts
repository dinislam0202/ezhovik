import Link from "next/link";
import { Fragment } from "react";
import { tokenize } from "@/lib/markup";
import { CitationLink } from "./CitationLink";

export type CiteIndex = Record<string, number>;

/** Рендерит строку с разметкой [[cite:..]], [[term:..|..]], [[link:..|..]], **жирный** */
export function RichText({
  text,
  cites,
}: {
  text: string;
  cites: CiteIndex;
}) {
  return (
    <>
      {tokenize(text).map((t, i) => {
        switch (t.kind) {
          case "text":
            return <Fragment key={i}>{t.text}</Fragment>;
          case "bold":
            return <strong key={i}>{t.text}</strong>;
          case "cite":
            return (
              <CitationLink key={i} citeKey={t.key} n={cites[t.key] ?? 0} />
            );
          case "term":
            return (
              <Link key={i} href={`/glossary/${t.slug}`} className="link-term">
                {t.label}
              </Link>
            );
          case "link":
            return (
              <Link key={i} href={t.href}>
                {t.label}
              </Link>
            );
        }
      })}
    </>
  );
}
