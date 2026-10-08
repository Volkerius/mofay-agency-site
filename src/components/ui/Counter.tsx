"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Marka gradyanı — globals.css'teki .text-gradient ile aynı.
 * Odometrenin dönen sütunu transform kullandığı için ayrı katmanda çiziliyor
 * ve üstteki kırpılmış arka plan oraya ulaşmıyor; gradyan rakamın kendisine
 * veriliyor. Her sütun ortak gradyanın kendi dilimini gösteriyor ki sayı
 * boyunca renk kesintisiz aksın.
 */
const GRADIENT =
  "linear-gradient(100deg, #7c5cff 0%, #5b6cff 35%, #22d3ee 70%, #f472b6 100%)";

function DigitColumn({
  digit,
  index,
  total,
  delay,
}: {
  digit: number;
  index: number;
  total: number;
  delay: number;
}) {
  // Framer Motion yerine CSS transition: monte olurken 0'da başla,
  // bir sonraki karede hedefe kaydır — geçiş animasyonu çalışır.
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setOffset(digit * 10)),
    );
    return () => cancelAnimationFrame(raf);
  }, [digit]);

  const paint = {
    backgroundImage: GRADIENT,
    backgroundSize: `${total * 100}% 100%`,
    backgroundPosition: total > 1 ? `${(index / (total - 1)) * 100}% 0` : "0 0",
    backgroundClip: "text" as const,
    WebkitBackgroundClip: "text" as const,
    color: "transparent",
  };

  return (
    <span className="inline-block h-[1em] overflow-hidden align-baseline">
      <span
        className="flex flex-col will-change-transform"
        style={{
          transform: `translateY(-${offset}%)`,
          transition: `transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span
            key={n}
            style={paint}
            className="flex h-[1em] items-center justify-center leading-none"
          >
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Görüş alanına girince odometre gibi dönerek yerine oturan rakam.
 * Rakamlar soldan sağa hafif gecikmeyle geliyor — mekanik sayaç hissi.
 * Hareket azaltma tercihinde dönüş olmaz, değer doğrudan yazılır.
 */
export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-60px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const digits = Array.from(String(value), Number);
  const rollable = inView && !reduced;

  return (
    <span ref={ref} className={className}>
      {/* Ekran okuyucu ve JS kapalıyken doğru değeri görsün */}
      <span className="sr-only">
        {value}
        {suffix}
      </span>

      <span aria-hidden className="inline-flex tabular-nums">
        {rollable ? (
          digits.map((d, i) => (
            <DigitColumn
              key={i}
              digit={d}
              index={i}
              total={digits.length}
              delay={i * 0.09}
            />
          ))
        ) : (
          <span>{value}</span>
        )}
        {/* whitespace-pre: " yıl" gibi baştaki boşluklu sonekler flex
            kabında yutuluyordu */}
        <span className="whitespace-pre">{suffix}</span>
      </span>
    </span>
  );
}
