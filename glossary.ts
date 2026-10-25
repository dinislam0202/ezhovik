import type { Article, Block } from "@/lib/types";
import { Callout } from "./Callout";
import { Figure } from "./Figure";
import { RichText, type CiteIndex } from "./RichText";
import { StagesDiagram } from "./StagesDiagram";
import { ScienceMap } from "./ScienceMap";

export function ArticleBody({
  article,
  cites,
}: {
  article: Article;
  cites: CiteIndex;
}) {
  return (
    <div className="prose-ed">
      {article.blocks.map((b, i) => (
        <BlockView key={i} block={b} cites={cites} />
      ))}
    </div>
  );
}

function BlockView({ block, cites }: { block: Block; cites: CiteIndex }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} cites={cites} />
        </p>
      );
    case "h2":
      return <h2 id={block.id}>{block.text}</h2>;
    case "h3":
      return <h3 id={block.id}>{block.text}</h3>;
    case "list":
      return (
        <ul>
          {block.items.map((it, i) => (
            <li key={i}>
              <RichText text={it} cites={cites} />
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <Callout variant={block.variant}>
          <ul className="list-disc space-y-2 pl-5 marker:text-forest">
            {block.items.map((it, i) => (
              <li key={i}>
                <RichText text={it} cites={cites} />
              </li>
            ))}
          </ul>
        </Callout>
      );
    case "figure":
      return <Figure kind={block.kind} alt={block.alt} caption={block.caption} />;
    case "diagram":
      return block.id === "stages" ? (
        <StagesDiagram />
      ) : (
        <div className="not-prose my-10">
          <ScienceMap />
        </div>
      );
    case "table":
      return (
        <div className="not-prose my-10 overflow-x-auto font-sans text-sm">
          <table className="w-full min-w-[40rem] border-collapse text-left">
            <caption className="pb-3 text-left font-semibold">{block.caption}</caption>
            <thead>
              <tr className="border-y-2 border-ink">
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-line align-top">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-3">
                      <RichText text={cell} cites={cites} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}
