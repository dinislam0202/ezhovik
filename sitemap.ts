import Link from "next/link";
import { Illustration } from "@/components/Illustration";
import { Reveal } from "@/components/Reveal";
import { StagesDiagram } from "@/components/StagesDiagram";
import { ScienceMap } from "@/components/ScienceMap";
import { ArticleCard } from "@/components/ArticleCard";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { RichText } from "@/components/RichText";
import { articles } from "@/data/articles";
import { topics } from "@/data/topics";
import { site } from "@/data/site";
import { buildCiteIndex } from "@/lib/cites";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ежовик гребенчатый: что на самом деле знает наука?",
  description:
    "Независимое научно-популярное издание о ежовике гребенчатом (Hericium erinaceus): биология, гериценоны и эринацины, исследования и их ограничения.",
  path: "/",
});

const WHY = [
  "Ежовик гребенчатый — вид гриба Hericium erinaceus. Его едят, а в Азии давно используют в традиционной медицине. Плодовое тело не имеет шляпки: оно похоже на белую «гриву» из свисающих игл.",
  "Научный интерес связан с вторичными метаболитами гриба: [[term:hericenones|гериценонами]] из плодовых тел и [[term:erinacines|эринацинами]] из мицелия. В клеточных моделях их связывают с синтезом [[term:neurotrophic-factors|нейротрофических факторов]] [[cite:ma2010]].",
  "Это гипотеза, а не вывод. Клинические исследования на людях пока небольшие, а их результаты неоднозначны [[cite:mori2009]] [[cite:li2020]]. Поэтому мы не утверждаем, что гриб улучшает память, лечит заболевания или восстанавливает нервные клетки.",
  "Наша задача — показать, где заканчиваются проверенные факты и начинаются гипотезы, и дать вам ссылки, чтобы проверить это самостоятельно.",
];

export default function HomePage() {
  const { index } = buildCiteIndex(WHY);
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <>
      {/* Первый экран */}
      <section className="on-dark relative isolate overflow-hidden bg-deep text-paper">
        <div className="absolute inset-0 -z-10 opacity-60 md:left-1/3 md:opacity-100 animate-fade">
          <Illustration
            kind="mushroom"
            alt="Схематический рисунок плодового тела ежовика гребенчатого с длинными свисающими иглами на тёмном фоне"
          />
          <div className="absolute inset-0 bg-linear-to-r from-deep via-deep/70 to-transparent md:via-deep/20" />
        </div>
        <div className="wrap flex min-h-[calc(100svh-4rem)] flex-col justify-center py-16 md:py-24">
          <p className="kicker animate-rise text-olive">Наука · Микология · Нейробиология</p>
          <h1
            className="mt-6 max-w-3xl animate-rise font-serif text-[2.6rem] font-semibold leading-[1.04] md:text-7xl"
            style={{ animationDelay: "0.1s" }}
          >
            Ежовик гребенчатый: что на самом деле знает наука?
          </h1>
          <p
            className="mt-7 max-w-xl animate-rise font-serif text-xl leading-relaxed text-paper/90 md:text-2xl"
            style={{ animationDelay: "0.25s" }}
          >
            Необычный гриб, биологически активные соединения и исследования, которые помогают
            понять его потенциальное значение для человека.
          </p>
          <div
            className="mt-10 flex animate-rise flex-wrap gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="#explore" className="btn btn-solid-on-dark">
              Исследовать гриб
            </a>
            <Link href="/research" className="btn btn-on-dark">
              Читать исследования
            </Link>
          </div>
          <p
            className="mt-14 max-w-md animate-rise border-l-2 border-olive pl-4 text-sm text-olive"
            style={{ animationDelay: "0.55s" }}
          >
            Разбираемся в фактах, гипотезах и научных доказательствах.
            <span className="mt-1 block text-xs opacity-80">
              Иллюстрация — условный рисунок, не фотография.
            </span>
          </p>
        </div>
      </section>

      {/* Что вы хотите узнать */}
      <section id="explore" aria-labelledby="explore-title" className="wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-forest">Навигация</p>
          <h2 id="explore-title" className="mt-3 max-w-2xl font-serif text-4xl font-semibold md:text-5xl">
            Что вы хотите узнать?
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-px border border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t, i) => (
            <li key={t.slug} className="bg-paper">
              <Link
                href={`/topics/${t.slug}`}
                className="group flex h-full flex-col no-underline"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-ink">
                  <Illustration
                    kind={t.illustration}
                    alt={t.illustrationAlt}
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-sans text-xs font-semibold tabular-nums text-forest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-semibold group-hover:underline">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{t.card}</p>
                  <span className="mt-auto pt-5 font-sans text-sm font-semibold text-forest">
                    Открыть раздел →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Почему изучают */}
      <section aria-labelledby="why-title" className="bg-sand py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <Reveal>
            <p className="kicker text-forest">Редакционный материал</p>
            <h2 id="why-title" className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              Почему этот гриб изучают?
            </h2>
            <figure className="mt-10">
              <div className="aspect-[4/5] overflow-hidden border border-ink">
                <Illustration
                  kind="hyphae"
                  alt="Схематическое изображение ветвящихся нитей мицелия"
                />
              </div>
              <figcaption className="mt-3 border-l-2 border-olive pl-3 text-sm text-muted">
                Схема ветвящихся нитей (гиф) мицелия. Условный рисунок, не микрофотография.
              </figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <div className="font-serif text-lg leading-relaxed md:columns-2 md:gap-10 md:text-[1.15rem]">
              {WHY.map((p, i) => (
                <p key={i} className={i === 0 ? "" : "mt-5"}>
                  <RichText text={p} cites={index} />
                </p>
              ))}
            </div>
            <p className="mt-8 font-sans text-sm">
              <Link href="/articles/ezhovik-i-nervnaya-sistema" className="font-semibold text-forest">
                Читать полный разбор →
              </Link>
            </p>
            <DisclaimerNote className="mt-8" />
          </Reveal>
        </div>
      </section>

      {/* От молекулы до человека */}
      <section aria-labelledby="stages-title" className="wrap py-20 md:py-28">
        <Reveal>
          <p className="kicker text-forest">Интерактивная схема</p>
          <h2 id="stages-title" className="mt-3 max-w-2xl font-serif text-4xl font-semibold md:text-5xl">
            От молекулы до человека
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
            Каждый следующий этап проверки может не подтвердить результат предыдущего.
            Переключайте этапы, чтобы увидеть, какие работы к ним относятся.
          </p>
        </Reveal>
        <StagesDiagram />
      </section>

      {/* Научная карта */}
      <section aria-labelledby="map-title" className="bg-sand py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <p className="kicker text-forest">Интерактивная схема</p>
            <h2 id="map-title" className="mt-3 max-w-2xl font-serif text-4xl font-semibold md:text-5xl">
              Научная карта ежовика
            </h2>
            <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
              Нажмите на элемент, чтобы прочитать описание и увидеть публикации. Предполагаемые
              механизмы показаны отдельно от клинических данных.
            </p>
          </Reveal>
          <div className="mt-10">
            <ScienceMap />
          </div>
        </div>
      </section>

      {/* Статьи */}
      <section aria-labelledby="articles-title" className="wrap py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="articles-title" className="font-serif text-4xl font-semibold md:text-5xl">
            Статьи
          </h2>
          <Link href="/articles" className="font-sans text-sm font-semibold text-forest">
            Все статьи →
          </Link>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <ArticleCard article={featured} featured />
          <div className="grid gap-10">
            {rest.slice(0, 2).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Мифы, безопасность, метод */}
      <section aria-label="Разделы" className="wrap grid gap-px border border-ink bg-ink md:grid-cols-3">
        {[
          {
            href: "/myths",
            title: "Мифы и факты",
            text: "Пять распространённых утверждений о ежовике и то, что на самом деле показали исследования.",
          },
          {
            href: "/safety",
            title: "Безопасность и ограничения",
            text: "Нежелательные реакции, лекарства, формы продуктов и то, чего мы пока не знаем.",
          },
          {
            href: "/about",
            title: `О проекте ${site.name}`,
            text: "Как мы отбираем источники, проверяем данные и помечаем непроверенное.",
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col bg-paper p-7 no-underline"
          >
            <h3 className="font-serif text-2xl font-semibold group-hover:underline">{c.title}</h3>
            <p className="mt-3 text-muted">{c.text}</p>
            <span className="mt-6 font-sans text-sm font-semibold text-forest">Перейти →</span>
          </Link>
        ))}
      </section>
    </>
  );
}
