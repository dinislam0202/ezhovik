import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { RichText } from "@/components/RichText";
import { SourceList } from "@/components/SourceList";
import { myths } from "@/data/myths";
import { buildCiteIndex } from "@/lib/cites";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Мифы и факты о ежовике гребенчатом",
  description:
    "Пять распространённых утверждений о ежовике гребенчатом: улучшает ли он память, лечит ли болезни, одинаков ли состав добавок. Что показали исследования.",
  path: "/myths",
});

export default function MythsPage() {
  const all = myths.flatMap((m) => [m.explanation, ...m.shown, ...m.missing]);
  const { index } = buildCiteIndex(all);

  const items: FAQItem[] = myths.map((m) => ({
    id: m.id,
    title: m.claim,
    tag: m.verdict,
    content: (
      <div className="max-w-3xl font-serif text-lg leading-relaxed">
        <p>
          <RichText text={m.explanation} cites={index} />
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="kicker font-sans text-forest">Что показали исследования</h4>
            <ul className="mt-3 list-disc space-y-3 pl-5 marker:text-forest">
              {m.shown.map((s) => (
                <li key={s}>
                  <RichText text={s} cites={index} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="kicker font-sans text-forest">Каких данных нет</h4>
            <ul className="mt-3 list-disc space-y-3 pl-5 marker:text-forest">
              {m.missing.map((s) => (
                <li key={s}>
                  <RichText text={s} cites={index} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <h4 className="kicker mt-6 font-sans text-forest">Источники</h4>
        <div className="font-sans">
          <SourceList keys={m.sources} />
        </div>
      </div>
    ),
  }));

  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs items={[{ name: "Мифы и факты", path: "/myths" }]} />
      <h1 className="mt-8 max-w-3xl font-serif text-5xl font-semibold md:text-6xl">
        Мифы и факты
      </h1>
      <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted">
        Мы не ставим категоричных вердиктов там, где данных недостаточно: различаем
        предварительные результаты и установленные факты. Нажмите на утверждение, чтобы
        увидеть разбор.
      </p>
      <div className="mt-12">
        <FAQAccordion items={items} />
      </div>
      <DisclaimerNote className="mt-12 max-w-2xl" />
    </div>
  );
}
