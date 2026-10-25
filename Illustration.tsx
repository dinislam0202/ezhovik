import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Callout } from "@/components/Callout";
import { RichText } from "@/components/RichText";
import { SourceList } from "@/components/SourceList";
import { buildCiteIndex } from "@/lib/cites";
import { buildMetadata } from "@/lib/seo";
import { disclaimer } from "@/data/site";

export const metadata = buildMetadata({
  title: "Безопасность и ограничения: ежовик гребенчатый",
  description:
    "Безопасность ежовика гребенчатого: возможные нежелательные реакции, непереносимость, взаимодействие с лекарствами, формы продуктов и ограниченность данных.",
  path: "/safety",
});

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "reactions",
    title: "Возможные нежелательные реакции",
    body: [
      "В годовом пилотном исследовании с мицелием четыре участника выбыли из-за нежелательных явлений: дискомфорт в животе, тошнота и сыпь в группе ежовика, тошнота в группе плацебо [[cite:li2020]].",
      "Систематический обзор 2025 года называет возможными побочными эффектами дискомфорт в желудке, головную боль и аллергические реакции, отмечая, что о них обычно сообщают редко [[cite:menon2025]].",
    ],
  },
  {
    id: "intolerance",
    title: "Индивидуальная непереносимость и аллергия",
    body: [
      "Как и другие грибы, ежовик может вызывать аллергические реакции [[cite:menon2025]]. Реакция возможна и на другие компоненты добавки: наполнители, оболочку капсулы.",
      "При сыпи, отёке, затруднённом дыхании или сильной боли в животе приём нужно прекратить и обратиться за медицинской помощью.",
    ],
  },
  {
    id: "drugs",
    title: "Возможные взаимодействия с лекарствами",
    body: [
      "В источниках, которые мы проверили, систематических данных о взаимодействии ежовика с лекарствами нет. Отсутствие данных не означает отсутствия взаимодействий.",
      "Если вы постоянно принимаете лекарства или у вас хроническое заболевание, обсудите добавки с врачом или фармацевтом до начала приёма.",
    ],
  },
  {
    id: "forms",
    title: "Гриб, порошок, мицелий и экстракты — разные продукты",
    body: [
      "Гериценоны выделены из плодовых тел, эринацины — из мицелия [[cite:ma2010]]. Поэтому продукты на основе плодовых тел, мицелия на зерне и концентрированных экстрактов различаются по составу.",
      "Данные о безопасности относятся к конкретным препаратам: порошку плодовых тел [[cite:mori2009]], мицелию, обогащённому эринацином A [[cite:li2020]], водному экстракту [[cite:lakshmanan2016]] и экстракту β-глюканов [[cite:chen2022]]. На другие продукты их переносить нельзя.",
    ],
  },
  {
    id: "longterm",
    title: "Ограниченность данных о долгом приёме",
    body: [
      "Самое длительное клиническое исследование в нашей подборке длилось 49 недель и включало 41 завершившего участника [[cite:li2020]]. В токсикологических работах на крысах приём длился 90 дней [[cite:lakshmanan2016]] [[cite:chen2022]].",
      "Отсутствие токсичности у животных не доказывает безопасности у человека. Данных о приёме в течение многих лет, при беременности, кормлении грудью и у детей в рассмотренных работах нет.",
    ],
  },
];

export default function SafetyPage() {
  const { index, keys } = buildCiteIndex(SECTIONS.flatMap((s) => s.body));
  return (
    <div className="wrap py-12 md:py-16">
      <Breadcrumbs items={[{ name: "Безопасность и ограничения", path: "/safety" }]} />
      <h1 className="mt-8 max-w-3xl font-serif text-5xl font-semibold leading-tight md:text-6xl">
        Безопасность и ограничения
      </h1>

      <p
        role="note"
        className="mt-8 max-w-3xl border-2 border-forest bg-sand p-5 font-sans text-[0.95rem] leading-relaxed"
      >
        <strong>Важно.</strong> {disclaimer} На сайте нет дозировок и рекомендаций заменять
        лечение добавками. При заболеваниях, приёме лекарств или появлении нежелательных
        реакций обратитесь к медицинскому специалисту.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
        <nav aria-label="Разделы страницы" className="font-sans text-sm lg:sticky lg:top-24 lg:self-start">
          <ol className="space-y-2 border-l border-line">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-muted no-underline hover:border-forest hover:text-ink">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-2xl font-serif text-lg leading-relaxed">
          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className="mb-12 scroll-mt-24">
              <h2 id={`${s.id}-t`} className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
                {s.title}
              </h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4">
                  <RichText text={p} cites={index} />
                </p>
              ))}
            </section>
          ))}

          <Callout variant="unproven">
            <ul className="list-disc space-y-2 pl-5 marker:text-forest">
              <li>Безопасность длительного приёма концентрированных экстрактов у людей.</li>
              <li>Безопасность при беременности, кормлении грудью и у детей.</li>
              <li>Взаимодействие с лекарствами.</li>
              <li>Соответствие состава готовых добавок заявленному.</li>
            </ul>
          </Callout>

          <section id="doctor" aria-labelledby="doctor-t" className="mt-12 scroll-mt-24">
            <h2 id="doctor-t" className="border-t border-ink pt-4 font-serif text-3xl font-semibold">
              Когда обратиться к врачу
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-forest">
              <li>Перед началом приёма добавок, если у вас хронические заболевания, вы беременны, кормите грудью или принимаете лекарства.</li>
              <li>Сразу, если появились сыпь, отёк, затруднённое дыхание, боль в животе или тошнота.</li>
              <li>Всегда, прежде чем заменять назначенное лечение добавками. Этого делать нельзя.</li>
            </ul>
          </section>

          <section aria-labelledby="src-t" className="mt-12 font-sans">
            <h2 id="src-t" className="border-t border-ink pt-4 font-serif text-2xl font-semibold">
              Источники
            </h2>
            <SourceList keys={keys} />
            <p className="mt-6 text-sm">
              Подробнее: <Link href="/articles/bezopasnost-ezhovika">статья о безопасности</Link>,{" "}
              <Link href="/myths">мифы и факты</Link>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
