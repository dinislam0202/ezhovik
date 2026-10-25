import Link from "next/link";

export const metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="wrap py-24">
      <p className="kicker text-forest">Ошибка 404</p>
      <h1 className="mt-4 max-w-2xl font-serif text-5xl font-semibold">Такой страницы нет</h1>
      <p className="mt-5 max-w-xl font-serif text-xl text-muted">
        Возможно, адрес изменился. Попробуйте поиск по библиотеке или вернитесь на главную.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/library" className="btn btn-solid no-underline">
          Поиск по библиотеке
        </Link>
        <Link href="/" className="btn btn-line no-underline">
          На главную
        </Link>
      </div>
    </div>
  );
}
