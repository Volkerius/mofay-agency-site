import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-lines opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(124,92,255,0.6), transparent 70%)",
        }}
      />

      <div className="container-page relative text-center">
        <p className="text-gradient font-display text-7xl font-extrabold tracking-tight sm:text-9xl">
          404
        </p>
        <h1 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Aradığınız sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[0.95rem] text-fg-muted">
          Bağlantı taşınmış ya da hiç var olmamış olabilir.
        </p>

        <Link
          href="/tr"
          className="surface-glass mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-fg transition-colors hover:border-white/25"
        >
          <ArrowLeft size={16} />
          Ana sayfaya dön
        </Link>
      </div>
    </section>
  );
}
