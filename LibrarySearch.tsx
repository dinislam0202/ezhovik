import { disclaimer } from "@/data/site";

export function DisclaimerNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`border-l-2 border-forest pl-4 font-sans text-sm leading-relaxed text-muted ${className}`}
    >
      {disclaimer}
    </p>
  );
}
