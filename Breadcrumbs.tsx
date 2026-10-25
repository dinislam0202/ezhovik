import Link from "next/link";
import { disclaimer, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-dark mt-24 bg-deep text-paper">
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-2xl font-semibold">{site.name}</p>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-olive">
            {site.tagline}. Независимое научно-популярное издание: мы не продаём
            добавки и не получаем денег от производителей.
          </p>
        </div>
        <nav aria-label="Разделы сайта">
          <p className="kicker text-olive">Разделы</p>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            <li><Link href="/research" className="hover:underline">Что говорят исследования?</Link></li>
            <li><Link href="/articles" className="hover:underline">Статьи</Link></li>
            <li><Link href="/myths" className="hover:underline">Мифы и факты</Link></li>
            <li><Link href="/safety" className="hover:underline">Безопасность и ограничения</Link></li>
          </ul>
        </nav>
        <nav aria-label="Справочные материалы">
          <p className="kicker text-olive">Справочник</p>
          <ul className="mt-4 space-y-2 text-[0.95rem]">
            <li><Link href="/library" className="hover:underline">Библиотека</Link></li>
            <li><Link href="/glossary" className="hover:underline">Словарь терминов</Link></li>
            <li><Link href="/about" className="hover:underline">О проекте и методе</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-paper/20">
        <p className="wrap py-6 text-sm leading-relaxed text-olive">
          {disclaimer}
        </p>
      </div>
    </footer>
  );
}
