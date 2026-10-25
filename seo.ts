import { Illustration } from "./Illustration";
import type { IllustrationKind } from "@/lib/types";

export function Figure({
  kind,
  alt,
  caption,
  ratio = "aspect-[4/3]",
}: {
  kind: IllustrationKind;
  alt: string;
  caption: string;
  ratio?: string;
}) {
  return (
    <figure className="not-prose my-10 max-w-3xl">
      <div className={`${ratio} overflow-hidden border border-line`}>
        <Illustration kind={kind} alt={alt} />
      </div>
      <figcaption className="mt-3 border-l-2 border-olive pl-3 font-sans text-sm leading-snug text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
