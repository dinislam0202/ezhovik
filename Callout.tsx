"use client";

import { useState, type ReactNode } from "react";

export interface FAQItem {
  id: string;
  title: string;
  /** Короткая метка рядом с заголовком (например, вердикт) */
  tag?: string;
  content: ReactNode;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="border-t border-ink">
      {items.map((it, i) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="border-b border-ink">
            <h3>
              <button
                type="button"
                id={`acc-btn-${it.id}`}
                aria-expanded={isOpen}
                aria-controls={`acc-panel-${it.id}`}
                onClick={() => setOpen(isOpen ? null : it.id)}
                className="flex min-h-16 w-full items-start gap-4 py-5 text-left md:gap-6"
              >
                <span className="font-sans text-sm font-semibold tabular-nums text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-xl font-semibold leading-snug md:text-2xl">
                    «{it.title}»
                  </span>
                  {it.tag && (
                    <span className="mt-2 inline-block bg-sand px-2 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-forest">
                      {it.tag}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-1 font-sans text-2xl leading-none text-forest"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={`acc-panel-${it.id}`}
              role="region"
              aria-labelledby={`acc-btn-${it.id}`}
              hidden={!isOpen}
              className="pb-8 pl-0 md:pl-12"
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
