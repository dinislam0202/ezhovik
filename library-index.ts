import Link from "next/link";
import { getResearch, shortCite } from "@/data/research";

/** Короткий список источников под блоком (схемы, мифы, карта) */
export function SourceList({ keys }: { keys: string[] }) {
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {keys.map((k) => {
        const r = getResearch(k);
        if (!r) throw new Error(`Неизвестный источник: ${k}`);
        return (
          <li key={k}>
            <Link href={`/research/${r.id}`} className="text-forest">
              {shortCite(r)}
            </Link>
            <span className="text-muted"> — {r.titleRu}</span>
          </li>
        );
      })}
    </ul>
  );
}
