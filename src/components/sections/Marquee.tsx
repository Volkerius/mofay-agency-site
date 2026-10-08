import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Teknoloji şeridi — tamamen CSS animasyonu, sunucu bileşeni.
 *
 * Önceki sürümde masaüstünde kaydırma hızına tepki veren Framer Motion'lı
 * bir varyant vardı; kütüphaneyi bundle'dan tamamen çıkarma kararıyla
 * (telefonda saniyelerce hidrasyon bedeli) sade CSS şeride dönüldü.
 * Üzerine gelince durur, kesintisiz döner, sıfır JavaScript.
 */
function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Diziyi iki kez basıyoruz — animasyon %50'de başa dönünce dikiş görünmüyor
  const doubled = [...items, ...items];

  return (
    <div className="flex w-max shrink-0">
      <div
        className={`flex shrink-0 items-center gap-3 pr-3 will-change-transform hover:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-white/[0.02] px-5 py-2.5 font-mono text-[0.82rem] tracking-tight whitespace-nowrap text-fg-muted"
          >
            <span className="h-1 w-1 rounded-full bg-brand-violet/70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee({ t }: { t: Dictionary }) {
  const half = Math.ceil(t.marquee.items.length / 2);
  const first = t.marquee.items.slice(0, half);
  const second = t.marquee.items.slice(half);

  return (
    <section
      className="relative overflow-hidden border-y border-white/[0.06] bg-ink-900/60 py-12"
      aria-label={t.marquee.label}
    >
      <div className="container-page mb-7">
        <p className="text-center font-mono text-[0.66rem] tracking-[0.22em] text-fg-dim uppercase">
          {t.marquee.label}
        </p>
      </div>

      <div className="mask-fade-x flex flex-col gap-3">
        <Row items={first} />
        <Row items={second} reverse />
      </div>
    </section>
  );
}
