"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MoveDown, Play } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { HeroCanvas } from "@/components/sections/HeroCanvas";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Motto sözcüğü döner: "İşi [yazılım] yapsın."
 *
 * Kelime ve peşindeki "yapsın." tek bir ızgara hücresinde duruyor ve hücre
 * EN GENİŞ kombinasyona göre sabitleniyor — dışarısı hiç yeniden dizilmiyor
 * (mobilde başlık zıplamasının ve 9.8sn'lik sahte LCP'nin çözümü buydu).
 * Artan boşluk satırın sonunda kaldığı için görünmüyor.
 *
 * Framer Motion yok: yeni kelime `key` değişince CSS animasyonuyla (word-in)
 * alttan girer. Çıkış animasyonundan vazgeçildi — kütüphanenin bedeli,
 * telefonda saniyelerce hidrasyon beklemekti.
 */
function RotatingWord({ words, trailing }: { words: string[]; trailing: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => (current + 1) % words.length);
    }, 2400);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="inline-grid align-bottom">
      {/* Ölçü şablonu: en geniş "[kelime] yapsın." hücreyi sabitler */}
      {words.map((word) => (
        <span
          key={word}
          aria-hidden
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {word} {trailing}
        </span>
      ))}

      <span className="col-start-1 row-start-1 flex items-baseline gap-x-[0.28em] whitespace-nowrap">
        <span className="relative inline-flex overflow-hidden pt-[0.06em] pb-[0.14em]">
          <span
            key={words[index]}
            className="word-in text-gradient whitespace-nowrap will-change-transform"
          >
            {words[index]}
          </span>
        </span>
        <span>{trailing}</span>
      </span>
    </span>
  );
}

export function Hero({ t }: { t: Dictionary }) {
  // Ekran okuyucular için sabit, tam cümle
  const srSentence = `${t.hero.line1Start} ${t.hero.rotating[0]} ${t.hero.line1End} ${t.hero.line2}`;

  return (
    <section className="hero-stage relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32">
      {/* --- Zemin katmanları --- */}
      <div aria-hidden className="absolute inset-0 bg-lines opacity-[0.55]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 30%, #050609 78%)",
        }}
      />

      {/* Aurora lekeleri — mobilde tek ve sabit (GPU maliyeti) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-40 h-[38rem] w-[38rem] rounded-full opacity-40 blur-[90px] sm:blur-[130px] max-sm:[animation:none] animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.75), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 hidden h-[34rem] w-[34rem] rounded-full opacity-35 blur-[130px] animate-aurora sm:block"
        style={{
          animationDelay: "-8s",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.6), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 hidden h-[26rem] w-[26rem] -translate-x-1/2 rounded-full opacity-20 blur-[120px] animate-aurora sm:block"
        style={{
          animationDelay: "-15s",
          background:
            "radial-gradient(circle, rgba(244,114,182,0.6), transparent 65%)",
        }}
      />

      <HeroCanvas />
      <div aria-hidden className="noise-overlay hidden sm:block" />

      {/* --- İçerik ---
          Giriş: CSS hero-stagger. Kaydırma parallax'ı: CSS hero-parallax
          (masaüstü + destekleyen tarayıcı). JS'e bağlı hiçbir görsel yok. */}
      <div className="hero-parallax container-page hero-stagger relative z-10">
        {/* Rozet */}
        <div className="w-fit">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.035] py-1.5 pr-4 pl-2 backdrop-blur-sm">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-brand-emerald animate-pulse-ring" />
              <span className="relative h-2 w-2 rounded-full bg-brand-emerald" />
            </span>
            <span className="text-[0.78rem] font-medium tracking-tight text-fg-muted">
              {t.hero.badge}
            </span>
          </span>
        </div>

        {/* Motto başlık */}
        <h1 className="mt-7 max-w-5xl font-display text-[2.35rem] leading-[1.06] font-extrabold tracking-[-0.03em] sm:text-6xl lg:text-[5.2rem]">
          <span className="sr-only">{srSentence}</span>

          <span aria-hidden className="flex flex-wrap items-baseline gap-x-[0.28em]">
            <span>{t.hero.line1Start}</span>
            <RotatingWord
              words={[...t.hero.rotating]}
              trailing={t.hero.line1End}
            />
          </span>

          <span aria-hidden className="mt-1 block text-fg-muted">
            {t.hero.line2}
          </span>
        </h1>

        {/* Açıklama */}
        <p className="mt-7 max-w-2xl text-[0.98rem] leading-relaxed text-fg-muted sm:text-lg">
          {t.hero.description}
        </p>

        {/* Butonlar */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            href="#iletisim"
            className="px-7 py-4 text-[0.95rem]"
            icon={<ArrowUpRight size={18} strokeWidth={2.2} />}
          >
            {t.hero.primaryCta}
          </Button>
          <Button
            href="#isler"
            variant="secondary"
            className="px-7 py-4 text-[0.95rem]"
            icon={<Play size={15} strokeWidth={2.4} />}
          >
            {t.hero.secondaryCta}
          </Button>
        </div>

        {/* Öne çıkanlar */}
        <dl className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/[0.07] pt-7">
          {t.hero.highlights.map((item) => (
            <div key={item.label} className="flex flex-col">
              <dt className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">
                {item.value}
              </dt>
              <dd className="mt-0.5 text-[0.8rem] text-fg-dim">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Kaydırma göstergesi */}
      <a
        href="#hizmetler"
        className="hero-parallax absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-dim transition-colors hover:text-fg md:flex"
        aria-label={t.hero.scroll}
      >
        <span className="font-mono text-[0.62rem] tracking-[0.22em] uppercase">
          {t.hero.scroll}
        </span>
        <span className="animate-nudge">
          <MoveDown size={15} />
        </span>
      </a>
    </section>
  );
}
