"use client";

export function SearchBar({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div role="search">
      <label htmlFor={id} className="kicker text-forest">
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="min-h-12 w-full border border-ink bg-paper px-4 pr-12 font-sans text-base placeholder:text-muted"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Очистить поиск"
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-xl text-forest"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
