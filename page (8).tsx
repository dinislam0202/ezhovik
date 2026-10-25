"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="wrap py-24" role="alert">
      <h1 className="font-serif text-4xl font-semibold">Не удалось загрузить страницу</h1>
      <p className="mt-4 max-w-xl font-serif text-xl text-muted">
        Произошла ошибка. Попробуйте ещё раз; если она повторяется, вернитесь позже.
      </p>
      <button type="button" onClick={reset} className="btn btn-solid mt-8">
        Повторить
      </button>
    </div>
  );
}
