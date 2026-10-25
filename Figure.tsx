"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const NAV = [
  { href: "/research", label: "Исследования" },
  { href: "/articles", label: "Статьи" },
  { href: "/myths", label: "Мифы и факты" },
  { href: "/safety", label: "Безопасность" },
  { href: "/library", label: "Библиотека" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-forest no-underline"
        >
          {site.name}
        </Link>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={
                    "no-underline hover:text-forest " +
                    (isActive(n.href)
                      ? "border-b-2 border-forest pb-1 font-semibold text-forest"
                      : "")
                  }
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 border border-forest px-4 text-sm font-semibold text-forest md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Мобильная навигация"
          className="border-t border-line bg-paper md:hidden"
        >
          <ul className="wrap py-2">
            {NAV.map((n) => (
              <li key={n.href} className="border-b border-line last:border-b-0">
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className="block py-4 font-serif text-xl no-underline"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
