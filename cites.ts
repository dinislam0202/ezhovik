import type { ReactNode } from "react";

const META = {
  known: { title: "Что известно", bar: "bg-forest", bg: "bg-sand" },
  unproven: { title: "Что пока не доказано", bar: "bg-ink", bg: "bg-paper" },
  limits: { title: "Ограничения исследований", bar: "bg-olive", bg: "bg-sand/60" },
} as const;

export function Callout({
  variant,
  children,
}: {
  variant: keyof typeof META;
  children: ReactNode;
}) {
  const m = META[variant];
  return (
    <aside
      className={`not-prose mt-8 grid grid-cols-[6px_1fr] border border-line ${m.bg}`}
      aria-label={m.title}
    >
      <div className={m.bar} aria-hidden="true" />
      <div className="p-5 md:p-6">
        <p className="kicker text-forest">{m.title}</p>
        <div className="mt-3 font-sans text-base leading-relaxed">{children}</div>
      </div>
    </aside>
  );
}
