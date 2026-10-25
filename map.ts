"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markup";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => e !== null);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Содержание статьи" className="font-sans text-sm">
      <p className="kicker text-forest">Содержание</p>
      <ol className="mt-3 space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={
                "-ml-px block border-l-2 py-1.5 pl-3 no-underline " +
                (active === i.id
                  ? "border-forest font-semibold text-forest"
                  : "border-transparent text-muted hover:text-ink")
              }
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
