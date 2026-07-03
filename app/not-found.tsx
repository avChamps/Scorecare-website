import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-950">Page not found</h1>
      <p className="mt-3 max-w-md text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-[#123D79] px-5 py-3 text-sm font-semibold text-white"
      >
        Go home
      </Link>
    </main>
  );
}
